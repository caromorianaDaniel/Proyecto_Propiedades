import { Propiedad } from "../models/propiedades";
import { Solar } from "../models/solares";
//import { Comercio } from "../models/comercios"
import { Vivienda } from "../models/viviendas";
import { Propietario } from "../models/propietarios";
import { leerTeclado } from "../view/entradaTeclado";
import { tPropiedad,Propiedades } from "../Schemas/PropdSchemas";
import { db } from '../database/database'
import { menubuscador,menueliminar,menumodpropdsol,menumodpropdviv} from "../view/menus";

/*export const modificar = async () =>  {
    let n: number
    let calle:string, codpost:number, numero:string, identificador:string
    numero = await leerTeclado('Numero de la propiedad (Completo)')
    calle = await leerTeclado('Primera calle')
    codpost = Number(await leerTeclado('Codigo postal de la localidad'))
    identificador = `C/ ${calle} Nº ${numero}, ${codpost}`
    await db.conectarBD()
    Propiedades.find({_identificador: identificador})
    .then(async (doc: any) => { 
        if (doc == null){
            console.log(`No existe ninguna propiedad con el identificador ${identificador}`)
            await db.desconectarBD()
        } else {
            let dschema:tPropiedad = doc
            if (dschema._tipoObjeto == "Solar"){
                n = await menumodpropdsol()
                    do {
                        switch (n) {
                            case 1:
                                let preciom:number = Number(await leerTeclado('Precio del Metro'))
                                await Propiedades.findOneAndUpdate({_identificador: identificador},{_preciom: preciom})
                                await db.desconectarBD()
                                crearObjetoPropd(dschema)
                                break;
                            case 2:
                                let edificable:boolean = Boolean(await leerTeclado('El solar es edificable(true o false)'))
                                await Propiedades.findOneAndUpdate({_identificador: identificador},{_edificable: edificable})
                                await db.desconectarBD()
                                crearObjetoPropd(dschema)
                                break;
                            case 3:
                                let agua:boolean = Boolean(await leerTeclado('El solar tiene acceso a agua(true o false)'));
                                await Propiedades.findOneAndUpdate({_identificador: identificador},{_agua: agua})
                                await db.desconectarBD()
                                crearObjetoPropd(dschema)
                                break;
                            case 4:
                                let luz:boolean = Boolean(await leerTeclado('El solar tiene acceso a luz(true o false)'));
                                await Propiedades.findOneAndUpdate({_identificador: identificador},{_luz: luz})
                                await db.desconectarBD()
                                crearObjetoPropd(dschema)
                                break;
                            case 0:
                                break;    
                        }
                    } while (n != 0)
            } else if(dschema._tipoObjeto == "Vivienda") {
                n = await menumodpropdviv()
                do {
                    switch (n) {
                        case 1:
                            let preciom:number = Number(await leerTeclado('Precio del Metro'))
                            await Propiedades.findOneAndUpdate({_identificador: identificador},{_preciom: preciom})
                            await db.desconectarBD()
                            crearObjetoPropd(dschema)
                            break;
                        case 2:
                            let numHab:number = Number(await leerTeclado('Número de Habitaciones'));
                            await Propiedades.findOneAndUpdate({_identificador: identificador},{_numHab: numHab})
                            await db.desconectarBD()
                            crearObjetoPropd(dschema)
                            break;
                        case 3:
                            let numBa:number = Number(await leerTeclado('Número de Baños'))
                            await Propiedades.findOneAndUpdate({_identificador: identificador},{_numBa: numBa})
                            await db.desconectarBD()
                            crearObjetoPropd(dschema)
                            break;
                        case 4:
                            let garage:boolean = Boolean(await leerTeclado('¿Tiene Garage?(true o false)'));
                            await Propiedades.findOneAndUpdate({_identificador: identificador},{_garage: garage})
                            await db.desconectarBD()
                            crearObjetoPropd(dschema)
                            break;
                        case 4:
                            let cocina: Array<boolean>=new Array<boolean>()
                            cocina[0] = Boolean(await leerTeclado('¿Su cocina tiene Horno?(true o false)'));
                            cocina[1] = Boolean(await leerTeclado('¿Su cocina tiene Microondas?(true o false)'));
                            cocina[2] = Boolean(await leerTeclado('¿Su cocina tiene Lavavajillas?(true o false)'));
                            cocina[3] = Boolean(await leerTeclado('¿Su cocina tiene Frigorífico?(true o false)'));
                            await Propiedades.findOneAndUpdate({_identificador: identificador},{_cocina: cocina})
                            await db.desconectarBD()
                            crearObjetoPropd(dschema)
                            break;
                        case 0:
                            break;    
                    }
                } while (n != 0)
            } else {
                await db.desconectarBD()
                console.log('\nNo se ha encontrado la propiedad')
            }
        }
    })
    .catch((err: any) => console.log('Error: '+err))
}*/

export const eliminar = async () =>  {
    let n: number
    n = await menueliminar()
    switch(n){
        case 1:
            let calle:string, codpost:number, numero:string, identificador:string
            numero = await leerTeclado('Numero de la propiedad (Completo)')
            calle = await leerTeclado('Primera calle')
            codpost = Number(await leerTeclado('Codigo postal de la localidad'))
            identificador = `C/ ${calle} Nº ${numero}, ${codpost}`
            await db.conectarBD()
            await Propiedades.deleteOne({_identificador: {$eq: identificador}})
            .then((doc: any) => { 
                if (doc == null) console.log('No existe')
                else {
                    console.log('Borrado Correctamente')
                }
            })
            .catch( (err: any) => console.log('Error: '+err))
            await db.desconectarBD()
            break;
        case 2:
            let DNI:string
            DNI = await leerTeclado('DNI (Completo)')
            await db.conectarBD()
            await Propiedades.deleteOne({_DNI: {$eq: DNI}})
            .then((doc: any) => { 
                if (doc == null) console.log('No existe')
                else {
                    console.log('Borrado Correctamente')
                }
            })
            .catch( (err: any) => console.log('Error: '+err))
            await db.desconectarBD()
            break;
    }
}

export const buscador = async () =>  {
    let numero:string, n:number,
    calles: Array<string> = new Array, codpost:number, metrosc:number,preciom:number
    n = await menubuscador()
    switch(n){
        case 1:
            numero = await leerTeclado('Numero (Completo)');
            await db.conectarBD()
            await Propiedades.find({_numero: {$eq: numero}})
            .then(async (doc: any) => {
                if (doc == null) console.log('No existe')
                else {
                    console.log('Existe: ')
                    crearObjetoPropd(doc)
                }
            })
            .catch( (err: any) => console.log('Error: '+err))
            await db.desconectarBD()
            break
        case 2:
            calles[0] = await leerTeclado('Calle');
            await db.conectarBD()
            await Propiedades.find({_calles: {$eq: calles[0]}})
            .then((doc: any) => {
                if (doc == null) console.log('No existe')
                else {
                    console.log('Existe: ')
                    crearObjetoPropd(doc)
                }
            })
            .catch( (err: any) => console.log('Error: '+err))
            await db.desconectarBD()
            break
        case 3:
            codpost = Number(await leerTeclado('Codigo Postal'));
            await db.conectarBD()
            await Propiedades.find({_codpost: {$eq: codpost}})
            .then((doc: any) => {
                if (doc == null) console.log('No existe')
                else {
                    console.log('Existe: ')
                    crearObjetoPropd(doc)
                }
            })
            .catch( (err: any) => console.log('Error: '+err))
            await db.desconectarBD()
            break
        case 4:
            metrosc = Number(await leerTeclado('Metros Cuadrados'));
            await db.conectarBD()
            await Propiedades.find({_metrosc: {$lte: metrosc}})
            .then((doc: any) => {
                if (doc == null) console.log('No existe')
                else {
                    console.log('Existe: ')
                    crearObjetoPropd(doc)
                }
            })
            .catch( (err: any) => console.log('Error: '+err))
            await db.desconectarBD()
            break
        case 5:
            preciom = Number(await leerTeclado('Precio del Metro'));
            await db.conectarBD()
            await Propiedades.find({_preciom: {$lte: preciom}})
            .then((doc: any) => {
                if (doc == null) console.log('No existe')
                else {
                    console.log('Existe: ')
                    crearObjetoPropd(doc)
                }
            })
            .catch( (err: any) => console.log('Error: '+err))
            await db.desconectarBD()
            break
    }
}


export const crearObjetoPropd = async (doc:any) =>{
    let tmpPropd: Propiedad
    let dPropd: tPropiedad
    for (dPropd of doc) { 
        if (dPropd._tipoObjeto == "Solar"){           
            tmpPropd = new Solar(
                dPropd._identificador,dPropd._numero,dPropd._calles,dPropd._codpost,dPropd._metrosc,
                dPropd._preciom,dPropd._precioBase,dPropd._propietario,
                dPropd._edificable,dPropd._agua,dPropd._luz,dPropd._lejania
            )
            console.log(tmpPropd.imprimir())
            console.log(`Precio: ${tmpPropd.precio()}`)
        }else if (dPropd._tipoObjeto == "Vivienda"){
            tmpPropd = new Vivienda(
                dPropd._identificador,dPropd._numero,dPropd._calles,dPropd._codpost,dPropd._metrosc,
                dPropd._preciom,dPropd._precioBase,dPropd._propietario,
                dPropd._antiguedad,dPropd._numHab,dPropd._numBa,dPropd._garage,dPropd._cocina,
                dPropd._horno,dPropd._microondas,dPropd._lavavajillas,dPropd._frigorifico
            )
            console.log(tmpPropd.imprimir())
            console.log(`Precio: ${tmpPropd.precio()}`)
        }
    }
}
