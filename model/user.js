'use strict'
/**
 * Es
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
    email:{type:String, unique:true, lowercase:true},
    name: String,
    surname: String,
    // select:false no retorna la password en una consulta
    password : {type:String, select:false },
    dateRegister: {type:Date, default:Date.now()},
    lastLogin: Date
});

/**
 * pre-> antes de que se guarde en el esquuema, se ejecutará la función
 * Callback con next continua al siguiente middleware
*/

UserSchema.pre('save', (next) => {
    let user = this;
    bcrypt.genSalt(10, (err, salt) => {
        //si se produce un error retornamos una excepción
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);
            //se asigna el hash generado al usuario    
            user.password = hash
            next();
        });
    });
});

module.exports = mongoose.model('User', UserSchema);
