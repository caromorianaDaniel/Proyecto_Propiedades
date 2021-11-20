import { menuserver } from './view/menus'
import { Propiedad } from "./models/propiedades";
import { nuevaPropd,nuevoPropt,nuevaTrans } from './Acciones/crearObjetos'
import { /*modificar,*/eliminar,buscador } from './Acciones/alterarBD';
import { leerTeclado } from './view/entradaTeclado';

const main = async () => {
    let n: number
    do {
        n = await menuserver()
        switch(n){
            case 1:
                await nuevaPropd()
                break
            case 2:
                await nuevoPropt()
                break
            case 3:
                await nuevaTrans()
                break
            case 4:
                await eliminar()
                break
            case 5:
                await buscador()
                break
            case 0:
                console.log('\nAdios')
        }
    }while (n != 0)
}
main()