export class Propietario{

    private _DNI: string
    private _nombre: string
    private _apellidos: string
    private _nacimento: Date
    private _propiedades: Array<string>

    constructor(DNI:string,nombre:string,apellidos:string,nacimiento:Date,propiedades: Array<string>){
        this._DNI = DNI
        this._nombre = nombre
        this._apellidos = apellidos
        this._nacimento = nacimiento
        this._propiedades = propiedades
    }

    get DNI(){
        return this._DNI
    }
    get nombre(){
        return this._nombre
    }
    get apellidos(){
        return this._apellidos
    }
    get nacimiento(){
        return this._nacimento
    }
    get propiedades(){
        return this._propiedades
    }

    imprimir(){
        return this._DNI,
        this._nombre,
        this._apellidos,
        this._nacimento
    }
}