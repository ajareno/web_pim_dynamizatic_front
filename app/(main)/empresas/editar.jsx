"use client";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { getEmpresa, postEmpresa, patchEmpresa } from "@/app/api-endpoints/empresa";
import { editarArchivos, insertarArchivo, procesarArchivosNuevoRegistro, validarImagenes, crearListaArchivosAntiguos } from "@/app/utility/FileUtils"
import EditarDatosEmpresa from "./EditarDatosEmpresa";
import 'primeicons/primeicons.css';
import { getUsuarioSesion } from "@/app/utility/Utils";
import { useIntl } from 'react-intl';

const EditarEmpresa = ({ idEditar, setIdEditar, rowData, emptyRegistro, setRegistroResult, listaTipoArchivos, seccion, editable }) => {
    const intl = useIntl();
    const toast = useRef(null);
    const [empresa, setEmpresa] = useState(emptyRegistro || {
        codigo: "",
        nombre: "",
        descripcion: "",
        tiempoInactividad: null,
        activoSn: "S"
    });
    const [estadoGuardando, setEstadoGuardando] = useState(false);
    const [estadoGuardandoBoton, setEstadoGuardandoBoton] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [listaTipoArchivosAntiguos, setListaTipoArchivosAntiguos] = useState([]);

    useEffect(() => {
         //
        //Lo marcamos aquí como saync ya que useEffect no permite ser async porque espera que la función que le pases devueva undefined o una función para limpiar el efecto. 
        //Una función async devuelve una promesa, lo cual no es compatible con el comportamiento esperado de useEffect.
        //
        const fetchData = async () => {
            // Si el idEditar es diferente de nuevo, entonces se va a editar
            if (idEditar !== 0) {
                // Obtenemos el registro a editar
                const registro = rowData.find((element) => element.id === idEditar);
                setEmpresa(registro);
                
                //Guardamos los archivos para luego poder compararlos
                const _listaArchivosAntiguos = crearListaArchivosAntiguos(registro, listaTipoArchivos);
                setListaTipoArchivosAntiguos(_listaArchivosAntiguos);
            }
        };
        fetchData();
    }, [idEditar, rowData]);  

    const validacionesImagenes = () => {
        return validarImagenes(empresa, listaTipoArchivos);
    }

    const validaciones = async () => {
        // Valida que los campos obligatorios no estén vacíos
        const validaCodigo = empresa.codigo === undefined || empresa.codigo === "";
        const validaNombre = empresa.nombre === undefined || empresa.nombre === "";
        const validaImagenes = validacionesImagenes();

        if (validaImagenes) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'Las imagenes deben de tener el formato correcto' }),
                life: 3000,
            });
        }
        
        // Si existe algún campo obligatorio vacío, no se puede guardar
        return (!validaCodigo && !validaNombre);
    };

    const guardarEmpresa = async () => {
        setEstadoGuardando(true);
        setEstadoGuardandoBoton(true);
        
        if (await validaciones()) {
            // Obtenemos el registro actual
            let objGuardar = { ...empresa };
            const usuarioActual = getUsuarioSesion()?.id;

            // Si estoy insertando uno nuevo
            if (idEditar === 0) {
                // Elimino y añado los campos que no se necesitan
                delete objGuardar.id;
                delete objGuardar.imagen
                delete objGuardar.imagenId
                delete objGuardar.logo
                delete objGuardar.logoId

                objGuardar['usuarioCreacion'] = usuarioActual;
                objGuardar['tiempoInactividad'] = objGuardar.tiempoInactividad === null || objGuardar.tiempoInactividad === undefined || objGuardar.tiempoInactividad === "" ? 100 : objGuardar.tiempoInactividad;
                
                if (objGuardar.activoSn === '') {
                    objGuardar.activoSn = 'S';
                }
                
                // Hacemos el insert del registro
                const nuevoRegistro = await postEmpresa(objGuardar);

                // Si se crea el registro mostramos el toast
                if (nuevoRegistro?.id) {
                    //Sube las imagenes al servidor
                    await procesarArchivosNuevoRegistro(empresa, nuevoRegistro.id, listaTipoArchivos, seccion, usuarioActual);
                    // Usamos una variable que luego se cargará en el useEffect de la página principal para mostrar el toast
                    setRegistroResult("insertado");
                    setIdEditar(null);
                } else {
                    toast.current?.show({
                        severity: 'error',
                        summary: 'ERROR',
                        detail: intl.formatMessage({ id: 'Ha ocurrido un error creando el registro' }),
                        life: 3000,
                    });
                }
            } else {
                // Si se edita un registro existente, hacemos el patch del registro

                const empresaAeditar = {
                    id: objGuardar.id,
                    codigo: objGuardar.codigo,
                    nombre: objGuardar.nombre,
                    descripcion: objGuardar.descripcion,
                    tiempoInactividad: objGuardar.tiempoInactividad || 0,
                    activoSn: objGuardar.activoSn || 'N',
                    usuarioModificacion: usuarioActual,
                };
                
                await patchEmpresa(objGuardar.id, empresaAeditar);
                await editarArchivos(empresa, objGuardar.id, listaTipoArchivos, listaTipoArchivosAntiguos, seccion, usuarioActual);
                setIdEditar(null);
                setRegistroResult("editado");
            }
        } else {
            let errorMessage = intl.formatMessage({ id: 'Todos los campos obligatorios deben ser rellenados' });
                        
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: errorMessage,
                life: 3000,
            });
        }
        setEstadoGuardandoBoton(false);
        setEstadoGuardando(false);
    };

    const cancelarEdicion = () => {
        setIdEditar(null);
    };

    const header = idEditar > 0 ? (editable ? intl.formatMessage({ id: 'Editar' }) : intl.formatMessage({ id: 'Ver' })) : intl.formatMessage({ id: 'Nuevo' });

    return (
        <div>
            <div className="grid Empresa">
                <div className="col-12">
                    <div className="card">
                        <Toast ref={toast} position="top-right" />
                        <h2>{header} {(intl.formatMessage({ id: 'Empresa' })).toLowerCase()}</h2>
                        <EditarDatosEmpresa
                            empresa={empresa}
                            setEmpresa={setEmpresa}
                            listaTipoArchivos={listaTipoArchivos}
                            estadoGuardando={estadoGuardando}
                            isEdit={isEdit}
                        />
                        
                        <div className="flex justify-content-end mt-2">
                            {editable && (
                                <Button
                                    label={estadoGuardandoBoton ? `${intl.formatMessage({ id: 'Guardando' })}...` : intl.formatMessage({ id: 'Guardar' })} 
                                    icon={estadoGuardandoBoton ? "pi pi-spin pi-spinner" : null}
                                    onClick={guardarEmpresa}
                                    className="mr-2"
                                    disabled={estadoGuardandoBoton}
                                />
                            )}
                            <Button label={intl.formatMessage({ id: 'Cancelar' })} onClick={cancelarEdicion} className="p-button-secondary" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarEmpresa;