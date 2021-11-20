import { Propiedad } from "./propiedades";

export class Comercio extends Propiedad{

    private _antiguedad: Date
    private _tipo: string
    private _licencia: string = ""
    private _caducada: boolean = true
    private _licencias: Array<Object> = [{"licencia":this._licencia,"caducada":this._caducada}]

    constructor(id:string,numero:string,calles: Array<string>,codpost:number,metrosc:number,preciom:number,
        precioBase:number,propietario:string,antiguedad:Date,tipo:string,licencia:string,caducada: boolean,licencias:Array<Object>
    ){
        super(id,numero,calles,codpost,metrosc,preciom,precioBase,propietario)
        this._antiguedad = antiguedad
        this._tipo = tipo
        this._licencia = licencia
        this._caducada = caducada
        this._licencias = licencias = [{"licencia":licencia,"caducada":caducada}]
    }

    get antiguedad(){
        return this._antiguedad
    }
    get tipo(){
        return this._tipo
    }
    get licencias(){
        return this._licencias
    }

}