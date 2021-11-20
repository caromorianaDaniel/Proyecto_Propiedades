import { Propiedad } from "./propiedades";
import {Schema, model} from 'mongoose'

export class Solar extends Propiedad{

    private _edificable: boolean
    private _agua: boolean
    private _luz: boolean
    private _lejania: number
    
    constructor(
        identificador:string,numero:string,calles: Array<string>,codpost:number,metrosc:number,preciom:number,
        precioBase:number,propietario:string,edificable:boolean,agua:boolean,luz:boolean,lejania:number
    ){
        super(identificador,numero,calles,codpost,metrosc,preciom,precioBase,propietario)
        this._edificable = edificable
        this._agua = agua
        this._luz = luz
        this._lejania = lejania
    }

    get edificable(){
        return this._edificable
    }
    get agua(){
        return this._agua
    }
    get luz(){
        return this._luz
    }
    get lejania(){
        return this._lejania
    }

    precio(){
        let precio = this.precioBase
        if (this.edificable == true){
            let pedificable = this.precioBase * 0.3
            precio = precio + pedificable
        }
        if (this.agua == true){
            let pagua = this.precioBase * 0.1
            precio = precio + pagua
        }
        if (this.luz == true){
            let pluz = this.precioBase * 0.1
            precio = precio + pluz
        }
        if (this.lejania < 100){
            let plejania = this.precioBase * 0.5
            precio = precio + plejania
        } else if (this.lejania < 250){
            let plejania = this.precioBase * 0.4
            precio = precio + plejania
        } else if (this.lejania < 500){
            let plejania = this.precioBase * 0.3
            precio = precio + plejania
        } else if (this.lejania < 1000){
            let plejania = this.precioBase * 0.3
            precio = precio + plejania
        }
        return precio
    }

    imprimir():any{
        let imprimir: string
        imprimir = `${super.imprimir()},
        Edificable: ${this._edificable},
        Agua: ${this._agua},
        Luz: ${this._luz},
        Lejania: ${this._lejania}`
        return imprimir
    }
}