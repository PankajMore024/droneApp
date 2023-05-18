const mongoose = require ('mongoose');

const siteSchema = new mongoose.Schema({
    site_name:String,
    position:{
        latitude:Number,
        longitude:Number
    }
})

module.exports = mongoose.model("sites", siteSchema)