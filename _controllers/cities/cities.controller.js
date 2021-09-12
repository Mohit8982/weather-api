const router = require('express').Router();
const city_Service = require('./cities.service');


router.post("/add-city", city_Service.add_city);

module.exports = router;