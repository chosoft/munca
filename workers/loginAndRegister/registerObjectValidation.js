const Validator = require('schema-validator')
const schema = {
    username:{
        type: String,
        required: true,
        length:{
            min: 3,
            max:40
        }
    },
    password:{
        type: String,
        required: true,
        length:{
            min: 12,
        }
    },
    email:{
        type:String,
        required: true,
    },
    telephone:{
        type:String,
        required: true,
        length:{
            min: 10,
            max: 10
        }
    }
}

const validator = new Validator(schema);

function registerObjectValidation(obj){
    return new Promise(async (resolve,reject) => {
        try {
            const check = validator.check(obj)
            if(check._error) {
                reject({expected:true, message:`${Object.keys(check)[1]}`})
            }else{
                resolve(obj)
            }
        } catch (e) {
            reject({expected:false, message:e.message});
        }
    })
}
module.exports = registerObjectValidation