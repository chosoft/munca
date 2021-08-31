const mongoose = require('mongoose'); 
const { Schema,model,Types } = mongoose

const modeloSchema = new Schema({
    nombre:{type:String, required:true},
    colegio: {type:String, required:true},
    lideres:{type:Array,required:true},
    address:{type:Object,required: true},
    addBy:{type:String, required:true},
    timestamp:{type:Date, default: Date.now},
})

const Modelo = new model('modelo',modeloSchema)

function getModelos(){
    return new Promise(async (resolve, reject) =>{
        try {
            const allModelos = await Modelo.find()
            resolve(allModelos)
        } catch (e) {
            reject({expected:false, message:e.message})
        }
    })
}

function getModelo(nombre){
    return new Promise(async (resolve,reject) => {
        try {
            const modelo = await Modelo.findOne({nombre})
            resolve(modelo)
        } catch (e) {
            reject({expected:false,message:e.message})
        }
    })
}

function saveModelo(obj){
    return new Promise(async (resolve,reject) => {
        try {
            const searchModel = await Modelo.findOne({nombre: obj.nombre})
            if(searchModel){
                reject({expected:true,message:'modelNameTaken'})
            }else{
                const modelo = new Modelo(obj)
                await modelo.save()
                resolve()
            }
        } catch (e) {
            reject({expected:false,message:e.message})
        }
    })
}
function deleteModelo(modeloNombre){
    return new Promise(async (resolve, reject) => {
        try {
            const searchModel = await Modelo.findOne({nombre:modeloNombre})
            if(searchModel){
                await Modelo.findOneAndDelete({nombre:modeloNombre})
                resolve()
            }else{
                reject({expected:true,message:`inexistModelo`})
            }
        } catch (e) {
            reject({expected:false,message:e.message})
        }
    })
}

module.exports = {
    getModelos,
    getModelo,
    saveModelo,
    deleteModelo
}