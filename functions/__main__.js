
const swig = require('swig');
const tmplpath = __dirname + '/../index.html';

/**
* Landing page
* @returns {buffer}
*/
module.exports = (context, callback) => {

  return swig.renderFile(tmplpath, {}, (err, output) => {
  	callback(err, new Buffer(output || ''), {'Content-Type': 'text/html'})
  });

};
