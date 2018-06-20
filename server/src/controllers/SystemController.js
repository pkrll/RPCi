// SystemController.js
const system = require('../models/System');
const logger = require('../shared/logger.js');

module.exports = {

  index: function (req, res) {
    system.index().then(function (response) {
      res.json(response);
    }).catch(function (error) {
      res.json({status: 0});
    });
  },

  checkForUpdate: function (req, res) {
    system.checkForUpdate().then(function (response) {
      res.json({status: 1, version: response})
    }).catch(function (error) {
      res.json({status: 0});
    })
  },

  loadConsoleHistory: function (req, res) {
    let response = logger.read("update");
    res.json({status: 1, history: response});
  },

  updateRaspy: function (req, res) {
    system.updateRaspy().then(function (response) {
      logger.write("update", "$ update");
      logger.write("update", response.data);
      res.json(response);
    }).catch(function (error) {
      console.log("======== Error: updateRaspy ========");
      console.log(error)
      res.json({status: 0, error: error});
    });
  },

  launchUpdater: function (req, res) {
    system.launchUpdater().then(function (response) {
      res.json(response);
    }).catch(function (error) {
      console.log("======== Error: launchUpdater ========");
      console.log(error)
      res.json({status: 0, error: error});
    });
  }

};
