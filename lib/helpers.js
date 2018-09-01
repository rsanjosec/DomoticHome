'use strict'

// exports.yell = function (msg) {
//     return msg.toUpperCase();
// }

exports.ifEquals = function(arg1, arg2, options){
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
}