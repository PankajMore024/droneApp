const express = require("express");
const cors = require("cors");
require('./db/config');
const User = require('./db/dbUser');
const Drone = require('./db/dbDrone');
const app = express();
const Jwt = require('jsonwebtoken');
const JwtKey = 'flytbase'; // generally stored in .env

app.use(express.json());
app.use(cors());


// Signup API
app.post("/register", async (req, res) => {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        return res.json({ message: "Already Exists" });
    }
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    Jwt.sign({ result }, JwtKey, (err, token) => {
        if (err) {
            res.json({ message: "JWT Token Issue" })
        } else {
            res.send({ result, auth: token })
        }
    })
});

// Login API
app.post("/login", async (req, res) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, JwtKey, (err, token) => {
                if (err) {
                    res.json({ message: "JWT Token Issue" })
                } else {
                    res.send({ user, auth: token })
                }
            })
        } else {
            res.json({ message: "No User Found !" })
        }
    } else {
        res.json({ message: "Details Missing" })
    }

});

// Drones API
app.post("/drones", verifyToken, async (req, res) => {
    if (!req.body.drone_type || !req.body.make_name || !req.body.name) {
        res.json({ message: 'Missing' })
    } else {
        let drone = new Drone(req.body)
        let result = await drone.save();
        res.send(result);
    }
})
app.delete('/drones/:id', verifyToken, async (req, res) => {
    const droneId = req.params.id;
    // Perform the deletion operation on the drone with the specified ID
    await Drone.findByIdAndDelete(droneId);
    res.status(200).json({ message: 'Drone deleted successfully' });
});
// API endpoint to fetch user-specific drones
app.get('/dronesData', verifyToken, async (req, res) => {
    let createdBy = req.query.created_by
    let drones = await Drone.find({ created_by: createdBy });
    if (drones.length > 0) {
        res.send(drones);
    } else {
        res.json({ message: "NULL" })
    }
});



// const connectDB = async ()=>{
//     // using address instead of localhost >> stackoverflow
//     mongoose.connect('mongodb://127.0.0.1:27017/e-commerce');
//     const usersSchema = new mongoose.Schema({});
//     const users = mongoose.model('users', usersSchema);
//     const data = await users.find();
//     console.warn(data);
// }
// connectDB();



// test route
app.get("/", (req, res) => {
    res.send("App is Working on node.js !");
});

// app.get("/home",(req,res)=>{
//     res.send("Welcome to the homepage !!");
// });

// app.get("/about",(req,res)=>{
//     res.send("You want to know about me? Pay first !")
// })


function verifyToken(req, res, next) {
    let token = req.headers['authorization'];
    if (token) {
        Jwt.verify(token, JwtKey, (err, valid) => {
            if (err) {
                res.status(401).json({ message: "Invalid Token" });
            } else {
                next();
            }
        })
    } else {
        res.status(403).json({ message: "No Token" })
    }
}

// Server Prod Assets
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join("frontend/build")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    });
}

app.listen(5000);