const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    city_id: {
        type: String,
        required: true
    },
    city_name: {
        type: String,
        required: true
    },
    country: { type: String, required: true },
    main_stats: {
        type: Object,
        required: true
    },
    weather_stats: {
        wind_speed: String,
        situation: String,
        description: String,
        visibility: String
    },
    weather_timestamp: { type: Number, required: true },
},
{  versionKey: false });

module.exports = mongoose.model('weather_stats', schema);

