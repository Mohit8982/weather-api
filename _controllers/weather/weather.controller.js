const router = require('express').Router();
const weatherService = require('./weather.service');

router.post('/get-old-weather-details', weatherService.get_old_weather);

module.exports = router;