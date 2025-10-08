"use client";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import EditarDatosProvincia from "./EditarDatosTipoDocumento";
import 'primeicons/primeicons.css';
import { getUsuarioSesion } from "@/app/utility/Utils";
import { useIntl } from 'react-intl'
import { postTipoDocumento, patchTipoDocumento } from "@/app/api-endpoints/tipo_documento";
import { getEmpresas } from "@/app/api-endpoints/empresa";

const EditarTipoDocumento = ({ idEditar, setIdEditar, rowData, emptyRegistro, setRegistroResult, listaTipoArchivos, seccion, editable }) => {
    const toast = useRef(null);
    const [tipoDocumento, setTipoDocumento] = useState(emptyRegistro);
    const [estadoGuardando, setEstadoGuardando] = useState(false);
    const [estadoGuardandoBoton, setEstadoGuardandoBoton] = useState(false);
    const intl = useIntl();
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
                setTipoDocumento(registro);
            }
        };
        fetchData();
    }, [idEditar, rowData]);

    const validaciones = async () => {
        //Valida que los campos no esten vacios
        const validaNombre = tipoDocumento.nombre === undefined || tipoDocumento.nombre === "";
        // const validaCodigo = tipoDocumento.codigo === undefined || tipoDocumento.codigo === "";

        if ( validaNombre /*|| validaCodigo*/) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'Todos los campos deben de ser rellenados' }),
                life: 3000,
            });
        }

        //
        //Si existe algún bloque vacio entonces no se puede guardar
        //
        return !validaNombre // ( !validaNombre && !validaCodigo)
    }

    const guardarEmpresa = async () => {
        setEstadoGuardando(true);
        setEstadoGuardandoBoton(true);
        if (await validaciones()) {
            // Obtenemos el registro actual y solo entramos si tiene nombre y contenido
            let objGuardar = { ...tipoDocumento };
            const usuarioActual = getUsuarioSesion()?.id;

            // Si estoy insertando uno nuevo
            if (idEditar === 0) {
                // Elimino y añado los campos que no se necesitan
                delete objGuardar.id;
                delete objGuardar.nombreEmpresa;
                objGuardar['usuCreacion'] = usuarioActual;
                objGuardar['empresaId'] = getUsuarioSesion()?.empresaId;
                if(objGuardar.activoSn === ''){
                    objGuardar.activoSn = 'N';
                }
                // Hacemos el insert del registro
                const nuevoRegistro = await postTipoDocumento(objGuardar);

                //Si se crea el registro mostramos el toast
                if (nuevoRegistro?.id) {
                    //Usamos una variable que luego se cargara en el useEffect de la pagina principal para mostrar el toast
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
                //Si se edita un registro existente Hacemos el patch del registro
                const tipoDocumentoAeditar = {
                    id: objGuardar.id,
                    empresaId: getUsuarioSesion()?.empresaId,
                    nombre: objGuardar.nombre,
                    codigo: objGuardar.codigo,
                    activoSn: objGuardar.activoSn,
                };

                await patchTipoDocumento(objGuardar.id, tipoDocumentoAeditar);
                setIdEditar(null)
                setRegistroResult("editado");
            }
        }
        setEstadoGuardandoBoton(false);
    };

    const cancelarEdicion = () => {
        setIdEditar(null)
    };

    const header = idEditar > 0 ? (editable ? intl.formatMessage({ id: 'Editar' }) : intl.formatMessage({ id: 'Ver' })) : intl.formatMessage({ id: 'Nuevo' });

    return (
        <div>
            <div className="grid Empresa">
                <div className="col-12">
                    <div className="card">
                        <Toast ref={toast} position="top-right" />
                        <h2>{header} {(intl.formatMessage({ id: 'Tipo de documento' })).toLowerCase()}</h2>
                        <EditarDatosProvincia
                            tipoDocumento={tipoDocumento}
                            setTipoDocumento={setTipoDocumento}
                        
                            estadoGuardando={estadoGuardando}
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

export default EditarTipoDocumento;