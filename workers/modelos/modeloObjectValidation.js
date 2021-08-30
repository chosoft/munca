const Validator = require('schema-validator');

const schema = {
    nombre:{
        type: String,
        required: true,
        length: {
            min: 3,
            max: 40
        }
    },
    colegio:{
        type:String,
        required: true,
        length: {
            min:3,
            max: 40
        }
    },
    lideres:{
        type: Array,
        required: true,
        length: {
            min:1
        }
    },
    addBy:{
        type:String,
        required: true,
    },
    address:{
        type: Object,
        required: true,
    }
}

const schemaLider = {
    nombre:{
        required: true,
        type: String,
        length:{
            min: 3,
            max: 40
        }
    },
    email:{
        required: true,
        type: String,
        length: {
            min: 3,
            max: 40
        }
    },
    telephone:{
        required: true,
        type: String,
        length: {
            min:10,
            max:10
        }
    }
}

const schemaAddress = {
    lat:{
        type: String,
        required: true,
    },
    lon:{
        type: String,
        required: true,
    },
    display_name:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    }
}

const firstValidator = new Validator(schema)
const liderValidator = new Validator(schemaLider)
const addressValidator = new Validator(schemaAddress)

function validateObject(obj) {
    return new Promise(async (resolve, reject) => {
        try {
            const firstCheck = firstValidator.check(obj)
            if(firstCheck._error) {
                reject({expected:true, message: `${Object.keys(firstCheck)[1]}`})
            }else{
                const lideres = obj.lideres

                await lideres.forEach(async (lider) => {
                    const liderCheck = liderValidator.check(lider)
                    if(liderCheck._error) {
                        reject({expected:true, message: `${Object.keys(liderCheck)[1]}`})
                    }else{

                    }
                })

                const addressChecker = addressValidator.check(obj.address)

                if(addressChecker._error) {
                    reject({expected:true, message: `${Object.keys(addressChecker)[1]}`})
                }else{
                    resolve()
                }

            }

        } catch (e) {
            reject({expected:false, message:e.message})
        }
    })
}

module.exports = validateObject