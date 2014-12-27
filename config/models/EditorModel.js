// app/models/EditorModel.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our student model
var editorSchema = mongoose.Schema({

    local            : {
        fname        : String,
        lname     	 : String,
        pnumber	     : String,
        email		 : String,
        password     : String,
        notes		 : String,
        assignedStudents:[String],
        isActive	 : Boolean
        }

});

// methods ======================
// generating a hash
editorSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
editorSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for students and expose it to our app
module.exports = mongoose.model('Editor', editorSchema);

