import {Schema, model} from 'mongoose'

export type tTransaccion = {
    _tipoTrans:string | null,
    _identificador:string  | null,
    _fecha: Date | null,
    _palzos: number | null,
    _precio:number | null,
    _pago:number | null,
}

const transaccionSchema = new Schema({
    _tipoTrans: String,
    _identificador:{
        type: String,
        unique: true,
    },
    _fecha: Date,
    _palzos: Number,
    _precio: Number,
    _pago: Number,
})

export const Trans = model('transacciones', transaccionSchema)