const weatherService = require('../weather/weather.service');
const db = require('../../_helpers/db');
const moment = require('moment');


exports.add_city = async (req, res) => {
    try {
        const city_name = (req.body.city_name).toLowerCase();

        if (!city_name) {
            return res.json({
                status: 2,
                msgType: 'error',
                message: 'Please Enter City Name To Get Weather details',
            })
        }

        const check_city_existence = await get_city(city_name);

        if (check_city_existence.status == '1') {
            return res.json(check_city_existence)
        } else {
            const weatherStats = await weatherService.get_weather_by_city_name(city_name);
            const { code = '', city = '', list ='' } = weatherStats;

            if (code) {
                return res.json({
                    status: 1,
                    msgType: 'error',
                    message: weatherStats.message
                })
            }

            let current_obj = {};
            let five_day_obj = [];
            const { name, country, id } = city;
            let today_ts = '';

            for (const key in list) {
                const { dt, main, weather, wind, visibility, dt_txt } = list[key];
                console.log(dt_txt);
                if (key == 0) {
                    today_ts = dt;
                    current_obj = {
                        main_stats : main,
                        weather_stats: {
                            wind_speed: wind.speed,
                            situation: (weather[0]) ? weather[0].main : "",
                            description: (weather[0]) ? weather[0].description : "",
                            visibility: visibility,
                            weater_date_time: dt_txt
                        },
                    }
                }

                const object_his = {
                    city_id: id,
                    city_name : name.toLowerCase(),
                    country: country,
                    main_stats: '',
                    weather_stats: {
                        wind_speed: wind.speed,
                        situation: (weather[0]) ? weather[0].main : "",
                        description: (weather[0]) ? weather[0].description : "",
                        visibility: visibility,
                        weater_date_time: dt_txt
                    },
                    weather_timestamp: dt,
                }
                five_day_obj.push(object_his);
            }

            const create_city = new db.city({
                city_id: id,
                cityName: name.toLowerCase(),
                country: country,
                current_weather: current_obj,
                weather_timestamp: today_ts
            });

            

            const insertData = await Promise.all([
                create_city.save(),
                db.weather.insertMany(five_day_obj)
            ]);

            return res.json({
                status: 1,
                msgType: 'success',
                message: 'Current Forecast',
                data: insertData[0]
            })
        }

    } catch (error) {
        return res.json({
            status: 2,
            msgType: 'error',
            message: error.toString()
        });
    }
};

const get_city = async (name) => {

    const find_city = await db.city.findOne({ cityName: name.trim() });
    let weather_obj = { status: 2, msgType: 'error', message: 'City Not Found' }

    if(find_city) {
        const current_date = moment().format('YYYY-MM-DD');
        const today_ts = moment(current_date, 'YYYY-MM-DD').unix();
        const dbTs = find_city.weather_timestamp;

        let disp_msg = 'Older Forecast';
        if (dbTs >= today_ts) {
            disp_msg = 'Current Forecast'
        }

        weather_obj = {
            status: 1,
            msgType: 'success',
            message: disp_msg,
            data: find_city
        }
    }
        
    return weather_obj;
}