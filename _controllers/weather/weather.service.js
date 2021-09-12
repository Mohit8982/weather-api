const axios = require('axios');
const db = require('../../_helpers/db');


exports.get_old_weather = async (req, res) => {
    try {
        const { cityId } = req.body;
        if (!cityId) {
            return res.json({
                status: 2,
                msgType: 'error',
                message: 'Invalid City'
            })
        }

        const get_prev_data = await db.weather.find({ city_id: cityId }).sort({weather_timestamp : -1}); //here we can also implement paginated data to reduce the query load

        return res.json({
            status: 1,
            msgType: 'success',
            message: 'success',
            data : get_prev_data
        })

    } catch (error) {
        return res.json({
            status: 2,
            msgType: 'error',
            message: error.toString()
        });
    }
}

exports.get_weather_by_city_name = async (city) => {
    const config = {
        method: 'get',
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.Key}`,
        headers: { }
    };

    const weatherData = new Promise((resolve, reject) => {
        axios(config).then(function (response) {
            resolve(response.data)
        })
        .catch(function (error) {
            reject(error.data)
        });
    })
        
    return weatherData;
};