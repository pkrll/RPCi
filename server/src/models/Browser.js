const fs = require('fs');
const pt = require('path');
module.exports = {

  getFolder: function (path, callback) {
    try {
      let result = {
        directories: [],
        files: []
      };

      fs.readdirSync(path).forEach(file => {
        let fullPath = pt.join(path, file);
        let stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          result.directories.push({
            name: file,
            path: fullPath
          });
        } else {
          result.files.push({
            name: file,
            path: fullPath
          });
        }
      });

      callback(null, result);
    } catch (err) {
      console.log(err);
      callback(err);
    }
  },

  getFile: function (path, callback) {
    try {
      let result = {
        filename: pt.basename(path),
        metadata: {
          size: 0,
          accessed: 0,
          created: 0,
          modified: 0
        }
      };

      let stats = fs.statSync(path);
      result.metadata.size = stats.size;
      result.metadata.accessed = stats.atimeMs;
      result.metadata.created = stats.birthtimeMs;
      result.metadata.modified = stats.mtimeMs;

      callback(null, result);
    } catch (err) {
      console.log(err);
      callback(err);
    }
  }
}
