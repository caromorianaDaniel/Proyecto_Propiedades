import { Propiedad } from "./propiedades";

export class Vivienda extends Propiedad{

    private _antiguedad: Date
    private _numHab: number
    private _numBa: number
    private _garage: boolean
    private _horno: boolean = false;
    private _microondas: boolean = false;
    private _lavavajillas: boolean = false;
    private _frigorifico: boolean = false;
    private _cocina: Array<boolean> = [
        this._horno,this._microondas,this._lavavajillas,this._frigorifico
    ]

    constructor(
        identificador:string,numero:string,calles: Array<string>,codpost:number,metrosc:number,preciom:number,
        precioBase:number,propietario:string,antiguedad:Date,numHab:number,numBa:number,garage:boolean,
        cocina:Array<boolean>,horno:boolean,microondas:boolean,lavavajillas:boolean,frigorifico:boolean
    ){
        super(identificador,numero,calles,codpost,metrosc,preciom,precioBase,propietario)
        this._antiguedad = antiguedad
        this._numHab = numHab
        this._numBa = numBa
        this._garage = garage
        this._horno = horno
        this._microondas = microondas
        this._lavavajillas = lavavajillas
        this._frigorifico = frigorifico
        this._cocina = cocina = [
            horno,microondas,lavavajillas,frigorifico
        ]
    }

    get antiguedad(){
        return this._antiguedad
    }
    get numHab(){
        return this._numHab
    }
    get numBa(){
        return this._numBa
    }
    get garage(){
        return this._garage
    }
    get horno(){
        return this._cocina[0]
    }
    get microondas(){
        return this._cocina[1]
    }
    get lavavajillas(){
        return this._cocina[2]
    }
    get frigorifico(){
        return this._cocina[3]
    }
    get cocina(){
        return this._cocina
    }

    precio(){
        let precio = this.precioBase
        if (this.antiguedad < new Date(12/12/1969)){
            let pantiguedad = this.precioBase * 0.5
            precio = precio - pantiguedad
        } else if (this.antiguedad < new Date(12/12/1979)){
            let pantiguedad = this.precioBase * 0.3
            precio = precio - pantiguedad
        } else if (this.antiguedad < new Date(12/12/1989)){
            let pantiguedad = this.precioBase * 0.2
            precio = precio - pantiguedad
        } else if (this.antiguedad < new Date(12/12/1999)){
            let pantiguedad = this.precioBase * 0.05
            precio = precio - pantiguedad
        } else if (this.antiguedad < new Date(12/12/2009)){
            let pantiguedad = this.precioBase * 0.1
            precio = precio + pantiguedad
        } else if (this.antiguedad < new Date(12/12/2019)){
            let pantiguedad = this.precioBase * 0.3
            precio = precio + pantiguedad
        }
        if (this.numHab >= 3){
            let pnumHab = this.precioBase * 0.2
            precio = precio + pnumHab
        }
        if (this.numBa >= 2){
            let pnumBa = this.precioBase * 0.3
            precio = precio + pnumBa
        }
        if (this.garage == true){
            let pgarage = this.precioBase * 0.15
            precio = precio + pgarage
        }
        if (this.cocina[0] == true){
            let pcocina = this.precioBase * 0.02
            precio = precio + pcocina
        } else if (this.cocina[1] == true){
            let pcocina = this.precioBase * 0.0015
            precio = precio + pcocina
        } else if (this.cocina[2] == true){
            let pcocina = this.precioBase * 0.02
            precio = precio + pcocina
        } else if (this.cocina[3] == true){
            let pcocina = this.precioBase * 0.02
            precio = precio + pcocina
        }
        return precio
    }

    imprimir():any{
        let imprimir:string
        imprimir = `${super.imprimir()},
        Fecha Construcción: ${this._antiguedad},
        Número de Habitaciones: ${this._numHab},
        Número de Baños: ${this._numBa},
        Tiene Garage: ${this._garage},
        Equipacion de la cocina:
        Horno: ${this._cocina[0]},
        Microondas: ${this._cocina[1]},
        Lavavajillas: ${this._cocina[2]},
        Frigorifico: ${this._cocina[3]}`
        return imprimir
    }
}