const mongoose = require('mongoose');
const connectionOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(process.env.MONGODB_URI, connectionOptions, (err, succ) => {
	if (err) {
		console.log(err);
	} else {
		console.log('DB Connected')
	}
});
mongoose.Promise = global.Promise;


module.exports = {
	city: require('../model/cities.model'),
	weather: require('../model/weather.model')
};