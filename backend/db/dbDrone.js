const mongoose = require ('mongoose');

const droneSchema = new mongoose.Schema({
    drone_id:String,
    created_at:Date,
    created_by:String,
    deleted_by:String,
    deleted_on:Date,
    drone_type:String,
    make_name:String,
    name:String,
    updated_at:Date
});

module.exports = mongoose.model("drones", droneSchema);