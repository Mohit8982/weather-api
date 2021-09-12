const initializeEndPoints = (app) => {
    app.use('/cities', require('./cities/cities.controller'));
    app.use('/weather', require('./weather/weather.controller'));
}

module.exports = initializeEndPoints;