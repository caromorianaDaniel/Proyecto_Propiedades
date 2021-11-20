import { leerTeclado } from './entradaTeclado'

export const menuserver = async () => {
    let n: number
    console.log('\n')
    console.log('1.- Nueva Propiedad')
    console.log('2.- Nuevo Propietario')
    console.log('3.- Nueva Transaccion')
    console.log('4.- Eliminar Objetos')
    console.log('5.- Buscador')
    console.log('0.- Salir')
    n = Number( await leerTeclado('Opción'))
    return n
}

export const menupropd = async () => {
    let n: number
    console.log('\n')
    console.log('1.- Solar')
    console.log('2.- Vivienda')
    //console.log('3.- Comercio')
    n = Number( await leerTeclado('Crear'))
    return n
}

export const menutrans = async () => {
    let n: number
    console.log('\n')
    console.log('1.- Venta')
    console.log('2.- Alquiler')
    n = Number( await leerTeclado('Crear'))
    return n
}

export const menupropt = async () => {
    let r: number
    console.log('\n')
    console.log('1.- Si')
    console.log('2.- No')
    r = Number(await leerTeclado('¿Tiene propiedades? '))
    return r
}

export const menueliminar = async () => {
    let n: number
    console.log('\n')
    console.log('1.- Propiedad')
    console.log('2.- Propietario')
    n = Number( await leerTeclado('Opción'))
    return n
}

export const menubuscador = async () => {
    let n: number
    console.log('\n')
    console.log('1.- Número')
    console.log('2.- Calle Principal')
    console.log('3.- Codigo Postal')
    console.log('4.- Superficie máxima')
    console.log('5.- Precio máximo del metro')
    console.log('0.- Salir')
    n = parseInt( await leerTeclado('Buscar por'))
    return n
}

export const menumodpropdsol = async () => {
    let n: number
    console.log('\n')
    console.log('1.- Precio del metro cuadrado')
    console.log('2.- Edificabilidad')
    console.log('3.- Acceso a luz')
    console.log('4.- Acceso a agua')
    console.log('0.- Salir')
    n = Number( await leerTeclado('Modificar'))
    return n
}

export const menumodpropdviv = async () => {
    let n: number
    console.log('\n')
    console.log('1.- Precio del metro cuadrado')
    console.log('2.- Numero de habitaciones')
    console.log('3.- Numero de baños')
    console.log('4.- Garage')
    console.log('5.- Cocina')
    console.log('0.- Salir')
    n = Number( await leerTeclado('Modificar'))
    return n
}

/*export const menulicencias = async () => {
    let n: number
    console.log('\n')
    console.log('1.- Solar')
    console.log('2.- Vivienda')
    console.log('3.- Comercio')
    n = Number( await leerTeclado('Crear'))
    return n
}*/