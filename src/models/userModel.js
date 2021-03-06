const mongoose = require("mongoose");


var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};



const userSchema = new mongoose.Schema({
     fname: { 
        type: String,
        require: true
    },
     lname: {
        type: String,
        required: true
     },
      title: {   
        required: true,
         type: String, enum: [ 'Mr' , 'Mrs', 'Miss']
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required',
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        password: {
            type: String,
            required: true
        } ,
        userType:{
            String,
            enum:['user','admin','guest']}
    },  { timestamps: true})


module.exports = mongoose.model('user', userSchema)



