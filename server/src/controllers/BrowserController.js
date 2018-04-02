// BrowserController.js
const path = require('path');
const browser = require('../models/Browser');

exports.index = function(req, res) {
  res.json({error: 'NOT IMPLEMENTED!'});
};

exports.browse = function (req, res) {
  let request = path.join('/', req.params.path, req.params[0]);
  browser.getFolder(request, function (err, response) {
    if (err) {
      res.json({error: 'File not found!', message: err});
    } else {
      res.json(response);
    }
  });
};
