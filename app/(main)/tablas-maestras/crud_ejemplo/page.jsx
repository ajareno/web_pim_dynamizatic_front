"use client";
import { deleteExamen, getExamenesIdiomas, getExamenesCountFiltro } from "@/app/api-endpoints/examen";
import Crud from "../../../components/shared/crud";
import Editarexamen from "../../examenes/editar";

const CrudEjemplo = () => {

    /************************************** INICIO EXPLICACIÓN ******************************************************* */
    //
    // Las propiedades del componente CRUD y sus funcionalidades son las siguientes:
    //
    // headerCrud: El titulo que tendra la pantalla del crud Ej: "Examenes"
    //
    // getRegistros: La funcion de la api que obtiene los registros de la tabla de la base de datos, 
    // la funcion tendra que ser importada desde el archivo index.js correspondiente 
    //
    // getRegistrosCount: La funcion de la api que obtiene el numero total los registros de la tabla de la base de datos, 
    // la funcion tendra que ser importada desde el archivo index.js correspondiente
    //
    // botones: Array de los botones que se muestran en el crud Ej: ['nuevo', 'ver', 'editar', 'eliminar', 'descargarCSV']
    //
    // filtradoBase: Objeto que se le pasa a la funcion getRegistros para filtrar los registros de la tabla, estos filtrados siempre estaran
    // activos y tendran prioridad por encima de los que el usuario escriba, es decir
    // en la consulta apareceran con la condicion AND para que no entren en conflicto con los filtrado Ej: { empresaId: Number(localStorage.getItem('empresa')) }
    //
    // editarComponente: Sera el componente que tendremos que crear para mostrar la pantalla de editar y crear un registro en la tabla
    // es muy importante que el componente de editar use los parametros que necesita para crear nuevas con los siguientes nombres:
    // (idEditar, setIdEditar, rowData, emptyRegistro, setRegistroResult) Ej: <Editarexamen />
    //
    // columnas: Para hacer que el componente CRUD funcione, necesitara un array de columnas, donde se le indique el nombre del campo de la base de datos MySQL
    // y el header que quieres que el Datatable muestre y si el campo es un booleano indicarlo con la propiedad: "booleano: true" 
    // Ej: { campo: 'idiomaNombre', header: intl.formatMessage({ id: 'Idioma' }), tipo: 'string' },
    //    { campo: 'nombre', header: intl.formatMessage({ id: 'Nombre' }), tipo: 'string' },
    //    { campo: 'imagen', header: intl.formatMessage({ id: 'Imagen' }), tipo: 'imagen' },
    //    { campo: 'activoSn', header: intl.formatMessage({ id: 'Activo' }), tipo: 'booleano' },
    //      { campo: 'numero', header: intl.formatMessage({ id: 'numero' }), tipo: 'numero' },
    //  { campo: 'porcentaje', header: intl.formatMessage({ id: 'Porcentaje' }), tipo: 'porcentaje' },
    //   { campo: 'fecha', header: intl.formatMessage({ id: 'Fecha' }), tipo: 'fecha' },
    //
    // deleteRegistro: La funcion de la api que borra el registro de la base de datos, 
    // la funcion tendra que ser importada desde el archivo index.js correspondiente
    //
    // parametrosEliminar: Si se han asignado parametros customizados para eliminar, se elimina a partir de esos campos 
    // PARA QUE FUNCIONE ESTOS TIENEN QUE SER IDS, ESTO ES SOLO PARA CASOS DONDE EL CRUD TRATA DE UNA VISTA CON VARIOS IDS
    //
    // mensajeEliminar: Mensaje que se le mostrara al usuario cuando pulse el boton de eliminar
    // Ej: mensajeEliminar={'Se eliminarán los todos tipos de iva relacionados con el país.'}
    //
    // registroEditar: En el caso de que queramos que al entrar en la pantalla de editar sin pasar por el crud, le pasamos el id.
    // Ej: registroEditar={5}
    //
    // procesarDatosParaCSV: Es una funcion opcional que sirve para indicar que columnas se quieren mostrar cuando se descarguen los registros
    // en formato CSV, se pueden indicar columnas y sus headers, omitir columnas existentes y mostrar columnas nuevas con valores calculados.
    // Ej: const procesarDatosParaCSV = (registros) => {
    //     return registros.map(registro => {
    //         return {
    //             [intl.formatMessage({ id: 'Nombre' })]: registro.nombre,
    //             Idioma: registro.idiomaNombre,
    //             'Activo': registro.activoSn,
    //             'Valor Calculado': `${registro.nombre}-${registro.idiomaNombre}` // Ejemplo de una nueva columna creada
    //         };
    //     });
    // };
    //
    // seccion: Si el crud representa una tabla que tenga algun archivo relacionado, tendremos que indicar la seccion 
    // que este relacionada con los tipos de archivo de la tabla Ej: "Alergia"
    //
    // parametrosEliminar: En el caso de que estemos usando una vista en el crud, que junta dos tablas y queremos que al eliminar el registro
    // se borren ambos registros de las tablas, tendremos que indicar los parametros que se necesitan para borrar ambos registros Ej: ['id', 'inglesId']

    /************************************** FIN EXPLICACIÓN ******************************************************* */

    const columnas = [
        { campo: 'idiomaNombre', header: intl.formatMessage({ id: 'Idioma' }), tipo: 'string' },
        { campo: 'nombre', header: intl.formatMessage({ id: 'Nombre' }), tipo: 'string' },
        { campo: 'imagen', header: intl.formatMessage({ id: 'Imagen' }), tipo: 'imagen' },
        { campo: 'activoSn', header: intl.formatMessage({ id: 'Activo' }), tipo: 'booleano' },
    ]

    // Esta función transforma los registros para su exportación en formato CSV,
    // Permite asignar nombres personalizados a las columnas existentes y agregar nuevas columnas calculadas según las necesidades.
    const procesarDatosParaCSV = (registros) => {
        return registros.map(registro => {
            return {
                [intl.formatMessage({ id: 'Nombre' })]: registro.nombre,
                Idioma: registro.idiomaNombre,
                'Activo': registro.activoSn,
                'Valor Calculado': `${registro.nombre}-${registro.idiomaNombre}` // Ejemplo de una nueva columna creada
            };
        });
    };

    return (
        <div>
            <Crud
                headerCrud={"Examenes"}
                seccion={null}
                getRegistros={getExamenesIdiomas}
                getRegistrosCount={getExamenesCountFiltro}
                botones={['nuevo', 'ver', 'editar', 'eliminar', 'descargarCSV']}
                filtradoBase={{
                    empresaId: Number(localStorage.getItem('empresa'))
                }}
                editarComponente={<Editarexamen />}
                columnas={columnas}
                deleteRegistro={deleteExamen}
                procesarDatosParaCSV={procesarDatosParaCSV}
            />
        </div>
    );
};
export default CrudEjemplo;