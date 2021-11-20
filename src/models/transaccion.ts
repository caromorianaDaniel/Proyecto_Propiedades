export class Transaccion{

    private _tipoTrans: string
    private _identidicador: string
    private _fecha: Date
    private _palzos: number
    private _precio: number
    private _pago: number

    constructor(identificador:string,fecha:Date,palzos:number,precio:number,pago:number,tipoTrans:string,){
        this._tipoTrans = tipoTrans
        this._identidicador = identificador
        this._fecha = fecha = new Date()
        this._palzos = palzos
        this._precio = precio
        this._pago = pago
    }

    get tipoTrans(){
        return this._tipoTrans
    }
    get identificador(){
        return this._identidicador
    }
    get fecha(){
        return this._fecha
    }
    get palzos(){
        return this._palzos
    }
    get precio(){
        return this._precio
    }
    get pago(){
        return this._pago
    }

    calculoPagoVenta(precio:number,plazos:number){
        let pago: number
        pago = precio/plazos
        return pago
    }
    calculoPagoAlq(precio:number,plazos:number){
        let pago: number
        pago = precio/(plazos*0.1)
        return pago
    }

}