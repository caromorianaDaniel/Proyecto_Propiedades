import {Schema, model} from 'mongoose'

export type tPropiedad = {
    _identificador: string
    _tipoObjeto: string
    _numero: string
    _calles: Array<string>
    _codpost: number
    _metrosc: number
    _preciom: number
    _precioBase: number
    _propietario: string
    _edificable: boolean
    _agua: boolean
    _luz: boolean
    _lejania: number
    _antiguedad: Date
    _numHab: number
    _numBa: number
    _garage: boolean
    _horno: boolean
    _microondas: boolean
    _lavavajillas: boolean
    _frigorifico: boolean
    _cocina: Array<boolean>

}
const propiedadSchema = new Schema({
    _identificador:{
        type: String,
        unique: true,
    },
    _tipoObjeto: String,
    _numero: String,
    _calles: Array,
    _copost: Number,
    _metrosc: Number,
    _preciom: Number,
    _precioBase: Number,
    _propietario: String,
    _edificable: Boolean,
    _agua: Boolean,
    _luz: Boolean,
    _lejania: Number,
    _antiguedad: Date,
    _numHab: Number,
    _numBa: Number,
    _garage: Boolean,
    _cocina: Array
})

export type tSolar = {
    _tipoObjeto: string | null,
    _identificador: string | null
    _numero: string | null
    _calles: Array<string> | null
    _codpost: number | null
    _metrosc: number | null
    _preciom: number | null
    _precioBase: number | null
    _propietario: string | null
    _edificable: boolean | null
    _agua: boolean | null
    _luz: boolean | null
    _lejania: number | null
}

export type tVivienda = {
    _tipoObjeto: string | null,
    _identificador: string | null
    _numero: string | null
    _calles: Array<string> | null
    _codpost: number | null
    _metrosc: number | null
    _preciom: number | null
    _precioBase: number | null
    _propietario: string | null
    _antiguedad: Date | null
    _numHab: number | null
    _numBa: number | null
    _garage: boolean | null
    _cocina: Array<boolean> | null
}

/*export type tComercio = {
    _tipoObjeto: string | null,
    _identificador: string | null
    _numero: string | null
    _calles: Array<string> | null
    _codpost: number | null
    _metrosc: number | null
    _preciom: number | null
    _precioBase: number | null
    _propietario: string | null
    _antiguedad: Date | null
    _tipo: string | null
    _licencias: Array<Object> | null

}*/

export const Propiedades = model('propiedades', propiedadSchema)