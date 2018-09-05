'use strict'
/**
 * Es
 */
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

const UserSchema = schema({ 
    user_email:{type:String, unique:true, lowercase:true},    
    user_name: String,
    user_surname: String,
    // select:false no retorna la password en una consulta
    //user_password : {type:String, select:false },
    user_password : {type:String},
    dateRegister: {type:Date, default:Date.now()},
    lastLogin: {type:Date, default:Date.now()},
});

/**
 * pre-> antes de que se guarde en el esquuema, se ejecutará la función
 * Callback con next continua al siguiente middleware
*/

UserSchema.pre('save', (next) => {
    console.log("entra en UserSchema.pre para la generación del hash");
    let user = this;
    bcrypt.genSalt(10, (err, salt) => {
        //si se produce un error retornamos una excepción
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err);
            //se asigna el hash generado al usuario    
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('Users', UserSchema);

