import {Schema, model} from 'mongoose'

export type tPropietario = {
    _DNI: string |  null,
    _nombre: string |  null,
    _apellidos: string |  null,
    _nacimento: Date |  null,
    _propiedades: Array<string> | null,
}

const propietarioSchema = new Schema({
    _DNI: String,
    _nombre: String,
    _apellidos: String,
    _nacimento: Date,
    _propiedades: Array,
})

export const Propts = model('propietarios', propietarioSchema)