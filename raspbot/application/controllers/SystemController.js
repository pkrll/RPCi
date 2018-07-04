const system = require('../models/System.js');

exports.checkForUpdate = (req, res) => {
	system.checkForUpdate().then(response => {
		res.json({success: true, result: response});
	}).catch(error => {
		res.status(500).json({success: false, error: error.message});
	});
};

exports.reboot = (req, res) => {
	console.log("Reboot requested.");
	system.reboot().then(response => {
		res.json({success: true});
	}).catch(error => {
		console.log(error);
		res.json({status: false, error: {message: error}});
	})
};

exports.shutdown = (req, res) => {
	console.log("Shutdown requested.");
	system.shutdown().then(response => {
		res.json({success: true});
	}).catch(error => {
		console.log(error);
		res.json({status: false, error: {message: error}});
	})
};
