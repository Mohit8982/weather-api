const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    city_id : { type: String, unique: true, required: true },
    cityName: { type: String, unique: true, required: true },
    country: { type: String, required: true },
    current_weather: {
        type: Object,     //this can be done by redis also like storing current weather forcast to redis
        required: false
    },
    weather_timestamp : Number
},
{ versionKey: false });

module.exports = mongoose.model('cities', schema);