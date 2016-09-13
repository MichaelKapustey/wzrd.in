var zlib = require('zlib')
var = require('tar-fs');

//
// Unpack a tarball stream
//
module.exports = function unpack(env, stream, cb) {
  stream
        .pipe(zlib.createGunzip())
        .on('error', cb)
        .pipe(tar.extract(env.dirPath), {
            map: function (header) {
                header.name = header.name.replace(/^package\//, '');
                return header;
            }
        })
        .on('finish', function(code) {
            if (code) {
                return cb(new Error('tar exited with code '+ code));
            }
            cb();
        })
        .on('error', cb);
};
