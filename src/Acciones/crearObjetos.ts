import { Propiedad } from "../models/propiedades";
import { Solar } from "../models/solares";
//import { Comercio } from "../models/comercios"
import { Vivienda } from "../models/viviendas";
import { Propietario } from "../models/propietarios";
import { Transaccion } from "../models/transaccion";
import { leerTeclado } from "../view/entradaTeclado";
import { menupropd,/*menulicencias,*/ menutrans, menupropt } from "../view/menus";
import { tVivienda,tSolar,tPropiedad,Propiedades } from "../Schemas/PropdSchemas";
import { db } from '../database/database'
import { tPropietario,Propts } from "../Schemas/ProptSchema";
import { Trans, tTransaccion } from "../Schemas/TransSchema";

export const nuevaPropd = async () =>  {
    let n:number = await menupropd()
    let propiedad:any, numero:string, identificador:string, precioBase:number,
    calles: Array<string> = new Array, codpost:number, metrosc:number, preciom:number
    numero = await leerTeclado('Numero (Completo)')
        calles[0] = await leerTeclado('Primera calle')
        calles[1] = await leerTeclado('Segunda calle')
        calles[2] = await leerTeclado('Tercera calle')
        calles[3] = await leerTeclado('Cuarta calle')
    codpost = Number(await leerTeclado('Codigo Postal'))
    identificador = `C/ ${calles[0]} Nº ${numero}, ${codpost}`;
    metrosc = Number(await leerTeclado('Metros Cuadrados'))
    preciom = Number(await leerTeclado('Precio del Metro'))
    propiedad = new Propiedad(identificador,numero,calles,codpost,metrosc,preciom,0,"0")
    precioBase = propiedad.cprecioBase();

    switch(n){
        case 1:
            let edificable:boolean, agua:boolean, luz:boolean, lejania:number
            edificable = Boolean(await leerTeclado('El solar es edificable(true o false)'))
            agua = Boolean(await leerTeclado('El solar tiene acceso a agua(true o false)'));
            luz = Boolean(await leerTeclado('El solar tiene acceso a luz(true o false)'));
            lejania = Number(await leerTeclado('Lejania con el centro urbano(m)'));
            propiedad = new Solar(
                identificador,numero,calles,codpost,metrosc,preciom,precioBase,"0",edificable,agua,luz,lejania
            );
            console.log(propiedad.imprimir(),`Precio: ${propiedad.precio()}`)
            break
        case 2:
            let antiguedad:Date, numHab:number, numBa:number, garage:boolean,
            cocina:Array<boolean>=new Array<boolean>(),
            horno:boolean, microondas:boolean, lavavajillas:boolean, frigorifico:boolean
            antiguedad = new Date(await leerTeclado('Fecha de construcción (MM/DD/AAAA)'));
            numHab = Number(await leerTeclado('Número de Habitaciones'));
            numBa = Number(await leerTeclado('Número de Baños'));
            garage = Boolean(await leerTeclado('¿Tiene Garage?(true o false)'));
            cocina[0] = horno = Boolean(await leerTeclado('¿Su cocina tiene Horno?(true o false)'));
            cocina[1] = microondas = Boolean(await leerTeclado('¿Su cocina tiene Microondas?(true o false)'));
            cocina[2] = lavavajillas = Boolean(await leerTeclado('¿Su cocina tiene Lavavajillas?(true o false)'));
            cocina[3] = frigorifico = Boolean(await leerTeclado('¿Su cocina tiene Frigorífico?(true o false)'));
            propiedad = new Vivienda (
                identificador,numero,calles,codpost,metrosc,preciom,precioBase,"0",antiguedad,numHab,numBa,
                garage,cocina,horno,microondas,lavavajillas,frigorifico
            );
            console.log(propiedad.imprimir(),`Precio: ${propiedad.precio()}`)
            break
    }
    let salvar = async () =>{
        let oSchema: any
        let dShemaSolr: tSolar = {
            _tipoObjeto: null,
            _identificador: null,
            _numero: null,
            _calles: null,
            _codpost: null,
            _metrosc: null,
            _preciom: null,
            _precioBase: null,
            _propietario: null,
            _edificable: null,
            _agua: null,
            _luz: null,
            _lejania: null
        }
        let dShemaViv: tVivienda = {
            _tipoObjeto: null,
            _identificador: null,
            _numero: null,
            _calles: null,
            _codpost: null,
            _metrosc: null,
            _preciom: null,
            _precioBase: null,
            _propietario: null,
            _antiguedad: null,
            _numHab: null,
            _numBa: null,
            _garage: null,
            _cocina: null,
        }
        await db.conectarBD()
        if (propiedad instanceof Solar){
            dShemaSolr._tipoObjeto = "Solar"
            dShemaSolr._identificador = propiedad.identificador
            dShemaSolr._numero = propiedad.numero
            dShemaSolr._calles = propiedad.calles
            dShemaSolr._codpost = propiedad.codpost
            dShemaSolr._metrosc = propiedad.metrosc
            dShemaSolr._preciom = propiedad.preciom
            dShemaSolr._precioBase = propiedad.precioBase
            dShemaSolr._propietario = propiedad.propietario
            dShemaSolr._edificable = propiedad.edificable
            dShemaSolr._agua = propiedad.agua
            dShemaSolr._luz = propiedad.luz
            dShemaSolr._lejania = propiedad.lejania
            oSchema = new Propiedades(dShemaSolr)
        }else if (propiedad instanceof Vivienda) {
            dShemaViv._tipoObjeto = "Vivienda"
            dShemaViv._identificador = propiedad.identificador
            dShemaViv._numero = propiedad.numero
            dShemaViv._calles = propiedad.calles
            dShemaViv._codpost = propiedad.codpost
            dShemaViv._metrosc = propiedad.metrosc
            dShemaViv._preciom = propiedad.preciom
            dShemaViv._precioBase = propiedad.precioBase
            dShemaViv._propietario = propiedad.propietario
            dShemaViv._antiguedad = propiedad.antiguedad
            dShemaViv._numHab = propiedad.numHab
            dShemaViv._numBa = propiedad.numBa
            dShemaViv._garage = propiedad.garage
            dShemaViv._cocina = propiedad.cocina
            oSchema = new Propiedades(dShemaViv)
        }//else if (propiedad instanceof Comercio) {
        await oSchema.save()
        await db.desconectarBD()
    }
    salvar()
}

export const nuevoPropt = async () =>  {
    let propt:Propietario, DNI:string, nombre:string, apellidos:string, nacimiento:Date,
    apellido1: string, apellido2:string, numero:string, identificador:string,
    calle:string, codpost:number, propiedades: Array<string> = new Array
    DNI = await leerTeclado('DNI (Completo)')
    nombre = await leerTeclado('Nombre')
    apellido1 = await leerTeclado('Primer apellido')
    apellido2 = await leerTeclado('Segundo apellido')
    apellidos = `${apellido1} ${apellido2}`
    nacimiento = new Date(await leerTeclado('Fecha de nacimiento (MM/DD/AAAA)'))
    let r:number = await menupropt()
    switch (r) {
        case 1:
            numero = await leerTeclado('Numero (Completo)')
            calle = await leerTeclado('Primera calle')
            codpost = Number(await leerTeclado('Codigo Postal'))
            identificador = `C/ ${calle} Nº ${numero}, ${codpost}`;
            await db.conectarBD()
            await Propiedades.findOneAndUpdate({_identificador: {$eq: identificador}},{$set: {"_propietario": `${DNI}`}})
            .then( async (doc: any) => { 
                if (doc == null){ 
                    console.log('No existe esa propiedad')
                    await db.desconectarBD()
                } else {
                    console.log('La propiedad existe')
                    propiedades.push(identificador)
                    propt = new Propietario(DNI,nombre,apellidos,nacimiento,propiedades)
                    console.log(propt.imprimir())
                    let salvar = async () =>{
                        let oSchema: any
                        let dSchemaPropt: tPropietario = {
                            _DNI: null,
                            _nombre: null,
                            _apellidos: null,
                            _nacimento: null,
                            _propiedades: null,
                        }
                        dSchemaPropt._DNI = propt.DNI,
                        dSchemaPropt._nombre = propt.nombre,
                        dSchemaPropt._apellidos = propt.apellidos,
                        dSchemaPropt._nacimento = propt.nacimiento,
                        dSchemaPropt._propiedades = propt.propiedades,
                        oSchema = new Propts(dSchemaPropt)
                        await oSchema.save()
                        await db.desconectarBD()
                    }
                    salvar()
                }
            })
            .catch( (err: any) => console.log('Error: '+err))
            break;
        case 2:
            if (propiedades[0] == null){
                console.log('Debe de tener alguna propiedad')
            }
            break;
    }
}

export const nuevaTrans = async () =>  {
    let trans:Transaccion, DNIpropt:string,DNIproptN:string,idpropd:string, fecha:Date, precio: number,
    numero:string, calle:string, codpost:number,pago:number, plazos:number,
    tipoTrans:string, identificador: string, calles: Array<string> = new Array
    let n:number = await menutrans()
    do {
        if (n == 1){tipoTrans = "Venta"}
        else if(n == 2){tipoTrans = "Alquiler"}        
    }while (n != 1 && n != 2)
    DNIpropt = await leerTeclado('DNI del propietario (Completo)')
    await db.conectarBD()
    await Propts.findOne({_DNI: DNIpropt})
    .then(async (doc: any) => {
        if (doc == null) {
            console.log('No existen propietarios con ese DNI')
            await db.desconectarBD()
        } else {
            numero = await leerTeclado('Numero de la propiedad (Completo)')
            calles[0] = calle = await leerTeclado('Primera calle')
            codpost = Number(await leerTeclado('Codigo postal de la localidad'))
            idpropd = `C/ ${calle} Nº ${numero}, ${codpost}`
            await Propts.find({_DNI: DNIpropt,_propiedades: idpropd})
            .then(async (doc: any) => {
                if (doc == null) {
                    console.log('No existe la propiedad que ha especificado')
                    await db.desconectarBD()
                } else {
                    let tmpPropd: Propiedad
                    let dPropd: tPropiedad
                    for (dPropd of doc) { 
                        if (dPropd._tipoObjeto == "Solar"){           
                            tmpPropd = new Solar(
                                dPropd._identificador,dPropd._numero,dPropd._calles,dPropd._codpost,dPropd._metrosc,
                                dPropd._preciom,dPropd._precioBase,dPropd._propietario,
                                dPropd._edificable,dPropd._agua,dPropd._luz,dPropd._lejania
                            )
                            precio = tmpPropd.precio();
                        }else if (dPropd._tipoObjeto == "Vivienda"){
                            tmpPropd = new Vivienda(
                                dPropd._identificador,dPropd._numero,dPropd._calles,dPropd._codpost,dPropd._metrosc,
                                dPropd._preciom,dPropd._precioBase,dPropd._propietario,
                                dPropd._antiguedad,dPropd._numHab,dPropd._numBa,dPropd._garage,dPropd._cocina,
                                dPropd._horno,dPropd._microondas,dPropd._lavavajillas,dPropd._frigorifico
                            )
                            precio = tmpPropd.precio();
                        }
                    } 
                    fecha = new Date()
                    plazos = Number(await leerTeclado('Meses en los que se dividirá el pago(Max 12)'))
                    DNIproptN = await leerTeclado('DNI del nuevo propietario (Completo)')
                    identificador = `V: ${DNIpropt}, C: ${DNIproptN}, Prop: ${idpropd}.`
                    await Propts.findOne({_DNI: DNIproptN})
                    .then(async (doc: any) => {
                        if (doc == null) {
                            let propt:Propietario, nombre:string, apellidos:string, nacimiento:Date,
                            apellido1: string, apellido2:string, propiedades: Array<string> = new Array
                            nombre = await leerTeclado('Nombre')
                            apellido1 = await leerTeclado('Primer apellido')
                            apellido2 = await leerTeclado('Segundo apellido')
                            apellidos = `${apellido1} ${apellido2}`
                            nacimiento = new Date(await leerTeclado('Fecha de nacimiento (MM/DD/AAAA)'))
                            propiedades.push(identificador)
                            propt = new Propietario(DNIproptN,nombre,apellidos,nacimiento,propiedades)
                            let salvarpropt = async () =>{
                                await db.conectarBD()
                                let oSchema: any
                                let dSchemaPropt: tPropietario = {
                                    _DNI: null,
                                    _nombre: null,
                                    _apellidos: null,
                                    _nacimento: null,
                                    _propiedades: null,
                                }
                                dSchemaPropt._DNI = propt.DNI,
                                dSchemaPropt._nombre = propt.nombre,
                                dSchemaPropt._apellidos = propt.apellidos,
                                dSchemaPropt._nacimento = propt.nacimiento,
                                dSchemaPropt._propiedades = propt.propiedades,
                                oSchema = new Propts(dSchemaPropt)
                                await oSchema.save()
                                await db.desconectarBD()
                            }
                            salvarpropt()
                        }
                    })
                    .catch( (err: any) => console.log('Error: '+err))
                    await Propts.findOneAndUpdate({_DNI: DNIpropt},{$pull:{_propiedades: idpropd}})
                    await Propts.findOneAndUpdate({_DNI: DNIproptN},{$push:{_propiedades: idpropd}})
                    await Propiedades.findOneAndUpdate({_identificador: idpropd},{_propietario: DNIproptN})
                    trans = new Transaccion("",new Date(),0,0,0,"")                           
                    if (tipoTrans == "Venta"){
                        pago = trans.calculoPagoVenta(precio,plazos);
                    } else if(tipoTrans == "Alquiler"){
                        pago = trans.calculoPagoAlq(precio,plazos);
                    }
                    trans = new Transaccion(identificador,fecha,plazos,precio,pago,tipoTrans)
                    console.log(trans)
                    let salvar = async () =>{
                        await db.conectarBD()
                        let oSchema: any
                        let dSchemaTrans: tTransaccion = {
                            _tipoTrans: null,
                            _identificador: null,
                            _fecha: null,
                            _palzos: null,
                            _precio: null,
                            _pago: null,
                        }
                        dSchemaTrans._tipoTrans = trans.tipoTrans,
                        dSchemaTrans._identificador = trans.identificador,
                        dSchemaTrans._fecha = trans.fecha,
                        dSchemaTrans._palzos = trans.palzos,
                        dSchemaTrans._precio = trans.precio,
                        dSchemaTrans._pago = trans.pago,
                        oSchema = new Trans(dSchemaTrans)
                        await oSchema.save()
                        await db.desconectarBD()                            
                    }
                    salvar()
                }
            })
            .catch( (err: any) => console.log('Error: '+err))
        }
    })
    .catch( (err: any) => console.log('Error: '+err))
}

/*export const nuevoCom = async (propiedades: Propiedad) =>  {                                 
    let com: Comercio,numero:string,identificador:string,
    calles: Array<string> = new Array, calle1:string, calle2:string, calle3:string, calle4: string,
    codpost: number, metrosc:number,preciom:number, antiguedad:Date,tipo:string,
    licencia: string = "", caducada: boolean = false,licencias:Array<Object> = [{"licencia":licencia,"caducada":caducada}]
    numero = await leerTeclado('Numero Completo)')
    //do {
        calles[0] = calle1 = await leerTeclado('Primera calle')
        calles[0] = calle2 = await leerTeclado('Segunda calle')
        calles[0] = calle3 = await leerTeclado('Tercera calle')
        calles[0] = calle4 = await leerTeclado('Cuarta calle')
    //} while(calle2 != null || calle3 != null || calle4 != null);
    codpost = Number(await leerTeclado('Codigo Postal'))
    identificador = `${calle1} Nº ${numero}, ${codpost}`;
    metrosc = Number( await leerTeclado('Metros Cuadrados'))
    preciom = Number( await leerTeclado('Precio del Metro'))
    antiguedad = new Date(await leerTeclado('Fecha de construcción'))
    tipo = await leerTeclado('¿Que tipo de Comercio es?')
    let pregunta = await leerTeclado('¿Tiene licencias?(s o n)')
    let n = 0
    if (pregunta == "s"){
        do{
        menulicencias()
        licencia = await leerTeclado('¿Que tipo de licencia tiene?')
        caducada = Boolean(await leerTeclado('¿Que tipo de licencia tiene?'))
        licencias[n]= {licencia,}
        } while()
    }
    com = new Comercio(identificador,numero,calles,codpost,metrosc,preciom,antiguedad,tipo,licencias,licencia,caducada);
}*/