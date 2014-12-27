// app/models/EditorModel.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our student model
var ACFSchema = mongoose.Schema({

    local            : {
        acfId     : String,
        email	    : String,
        pnumber     : String
        }

});

// methods ======================
// generating a hash
ACFSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
ACFSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for students and expose it to our app
module.exports = mongoose.model('ACF', ACFSchema);

