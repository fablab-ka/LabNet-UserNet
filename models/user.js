var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    name: String,
    roles: [String],
    email: String,
    machinePermissions: [String],
    digitalKeys: [String]
});

module.exports = mongoose.model('User', UserSchema);