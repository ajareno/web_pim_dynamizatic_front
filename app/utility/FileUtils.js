import { borrarFichero, postSubirImagen, postSubirFichero } from "@/app/api-endpoints/ficheros";
import { postArchivo, deleteArchivo } from "@/app/api-endpoints/archivo";

/**
 * Gestiona la edición de archivos para un registro
 * @param {Object} registro - El registro que contiene los archivos
 * @param {number} id - ID del registro
 * @param {Array} listaTipoArchivos - Lista de tipos de archivos permitidos
 * @param {Object} listaTipoArchivosAntiguos - Lista de archivos antiguos para comparar cambios
 * @param {Object} seccion - Información de la sección
 * @param {number} usuario - ID del usuario que realiza la acción
 */
export const editarArchivos = async (registro, id, listaTipoArchivos, listaTipoArchivosAntiguos, seccion, usuario) => {
    if (!listaTipoArchivos) return;
    
    for (const tipoArchivo of listaTipoArchivos) {
        //Comprueba que si ha añadido una imagen
        if (registro[(tipoArchivo.nombre).toLowerCase()]?.type !== undefined) {
            //Si ya existia antes una imagen, hay que eliminarla junto a su version redimensionada
            if (listaTipoArchivosAntiguos[tipoArchivo['nombre']] !== null) {
                await borrarFichero(listaTipoArchivosAntiguos[tipoArchivo['nombre']]);
                await deleteArchivo(registro[`${(tipoArchivo.nombre).toLowerCase()}Id`]);
                //Tambien borra la version sin redimensionar
                if ((tipoArchivo.tipo).toLowerCase() === 'imagen') {
                    const url = (listaTipoArchivosAntiguos[tipoArchivo['nombre']]).replace(/(\/[^\/]+\/)1250x850_([^\/]+\.\w+)$/, '$1$2');
                    await borrarFichero(url);
                }
            }
            //Se inserta la imagen modificada
            await insertarArchivo(registro, id, tipoArchivo, seccion, usuario)
        }
        else {
            //Si ya existia antes una imagen, hay que eliminarla junto a su version redimensionada
            if (listaTipoArchivosAntiguos[tipoArchivo['nombre']] !== null && registro[(tipoArchivo.nombre).toLowerCase()] === null) {
                await borrarFichero(listaTipoArchivosAntiguos[tipoArchivo['nombre']]);
                await deleteArchivo(registro[`${(tipoArchivo.nombre).toLowerCase()}Id`]);
                //Tambien borra la version sin redimensionar
                if ((tipoArchivo.tipo).toLowerCase() === 'imagen') {
                    const url = (listaTipoArchivosAntiguos[tipoArchivo['nombre']]).replace(/(\/[^\/]+\/)1250x850_([^\/]+\.\w+)$/, '$1$2');
                    await borrarFichero(url);
                }
            }
        }
    }
};

/**
 * Inserta un archivo nuevo en el sistema
 * @param {Object} registro - El registro que contiene el archivo
 * @param {number} id - ID del registro al que pertenece el archivo
 * @param {Object} tipoArchivo - Información del tipo de archivo
 * @param {Object} seccion - Información de la sección
 * @param {number} usuario - ID del usuario que realiza la acción
 */
export const insertarArchivo = async (registro, id, tipoArchivo, seccion, usuario) => {
    //Comprueba que el input haya sido modificado
    if (registro[(tipoArchivo.nombre).toLowerCase()]?.type !== undefined) {
        //Comprueba si el tipo de archivo es una imagen para la subida
        let response = null;
        if ((tipoArchivo.tipo).toLowerCase() === 'imagen') {
            response = await postSubirImagen(seccion, registro[(tipoArchivo.nombre).toLowerCase()].name, registro[(tipoArchivo.nombre).toLowerCase()]);
        }
        else {
            response = await postSubirFichero(seccion, registro[(tipoArchivo.nombre).toLowerCase()].name, registro[(tipoArchivo.nombre).toLowerCase()]);
        }
        //Hace el insert en la tabla de archivos
        const objArchivo = {}
        objArchivo['usuarioCreacion'] = usuario;
        objArchivo['empresaId'] = Number(localStorage.getItem('empresa'));
        objArchivo['tipoArchivoId'] = tipoArchivo.id;
        objArchivo['url'] = response.originalUrl;
        objArchivo['idTabla'] = id;
        objArchivo['tabla'] = seccion.toLowerCase();
        await postArchivo(objArchivo);
    }
};

/**
 * Procesa los archivos para un nuevo registro
 * @param {Object} registro - El registro que contiene los archivos
 * @param {number} id - ID del registro
 * @param {Array} listaTipoArchivos - Lista de tipos de archivos permitidos
 * @param {Object} seccion - Información de la sección
 * @param {number} usuario - ID del usuario que realiza la acción
 */
export const procesarArchivosNuevoRegistro = async (registro, id, listaTipoArchivos, seccion, usuario) => {
    if (!listaTipoArchivos) return;
    
    for (const tipoArchivo of listaTipoArchivos) {
        //Comprueba que el input haya sido modificado
        if (registro[(tipoArchivo.nombre).toLowerCase()]?.type !== undefined) {
            await insertarArchivo(registro, id, tipoArchivo, seccion, usuario);
        }
    }
};

/**
 * Valida que las imágenes tengan el formato correcto
 * @param {Object} registro - El registro que contiene las imágenes
 * @param {Array} listaTipoArchivos - Lista de tipos de archivos permitidos
 * @returns {boolean} true si hay errores de validación, false si todo está correcto
 */
export const validarImagenes = (registro, listaTipoArchivos) => {
    if (!listaTipoArchivos) return false;
    
    for (const tipoArchivo of listaTipoArchivos) {
        //Comprueba si el tipo de archivo es una imagen para validar su extension
        if ((tipoArchivo.tipo).toLowerCase() === 'imagen') {
            //Comprueba que el input haya sido modificado
            if (registro[(tipoArchivo.nombre).toLowerCase()]?.type !== undefined) {
                //Comprueba que la imagen es del tipo valido
                const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/tiff", "image/avif"];
                if (!(allowedTypes.includes(registro[(tipoArchivo.nombre).toLowerCase()].type))) {
                    return true;
                }
            }
        }
    }
    return false;
};

/**
 * Crea una copia de los archivos antiguos para poder compararlos después
 * @param {Object} registro - El registro original
 * @param {Array} listaTipoArchivos - Lista de tipos de archivos
 * @returns {Object} Objeto con los archivos antiguos
 */
export const crearListaArchivosAntiguos = (registro, listaTipoArchivos) => {
    const listaArchivosAntiguos = {};
    if (listaTipoArchivos) {
        for (const tipoArchivo of listaTipoArchivos) {
            listaArchivosAntiguos[tipoArchivo['nombre']] = registro[(tipoArchivo.nombre).toLowerCase()];
        }
    }
    return listaArchivosAntiguos;
};