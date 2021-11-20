export class Propiedad{

    protected _identificador: string
    protected _numero: string
    protected _calles: Array<string>
    protected _codpost: number
    protected _metrosc: number
    protected _preciom: number
    protected _precioBase: number
    protected _propietario: string

    constructor(identificador:string, numero:string, calles:Array<string>,codpost:number, metrosc:number,
        preciom:number, precioBase:number, propietario: string){
        this._identificador = identificador
        this._numero = numero
        this._calles = calles
        this._codpost = codpost
        this._metrosc = metrosc
        this._preciom = preciom
        this._precioBase = precioBase
        this._propietario = propietario
    }
    
    get identificador(){
        return this._identificador
    }
    get numero(){
        return this._numero
    }
    get calles(){
        return this._calles
    }
    get codpost(){
        return this._codpost
    }
    get metrosc(){
        return this._metrosc
    }
    get preciom(){
        return this._preciom
    }
    get precioBase() {
        return this._precioBase
    }
    get propietario() {
        return this._propietario
    }

    cprecioBase(){
        let precioBase = this._metrosc * this._preciom
        return precioBase
    }

    precio(){
        let precio = this._precioBase
        return precio
    }

    imprimir():any{
        let imprimir:string
        imprimir = `Identificador: ${this._identificador},
        Otras Calles:
        ${this.calles[1]},
        ${this.calles[2]},
        ${this.calles[3]},
        Metros Cuadrados: ${this._metrosc},
        Precio del Metro: ${this._preciom}`
        return imprimir
    }
}