"use client";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { postLogAcceso, patchLogAcceso, getLogAccesos } from "@/app/api-endpoints/log_acceso";
import EditarDatosLogAcceso from "./EditarDatosLogAcceso";
import 'primeicons/primeicons.css';
import { getUsuarioSesion } from "@/app/utility/Utils";
import { useIntl } from 'react-intl';

const EditarLogAcceso = ({ idEditar, setIdEditar, rowData, emptyRegistro, setRegistroResult, editable }) => {
    const intl = useIntl();
    const toast = useRef(null);
    const [logAcceso, setLogAcceso] = useState(emptyRegistro);
    const [estadoGuardando, setEstadoGuardando] = useState(false);
    const [estadoGuardandoBoton, setEstadoGuardandoBoton] = useState(false);

    // Opciones para los dropdowns
    const opcionesResultado = [
        { label: intl.formatMessage({ id: 'Exitoso' }), value: 'exitoso' },
        { label: intl.formatMessage({ id: 'Fallido' }), value: 'fallido' },
        { label: intl.formatMessage({ id: 'Bloqueado' }), value: 'bloqueado' }
    ];

    useEffect(() => {
        const obtenerDatos = async () => {
            if (idEditar > 0) {
                // Si estamos editando un registro existente, obtenemos sus datos
                try {
                    const registroExistente = await getLogAccesos(JSON.stringify({ where: {and: { id: idEditar }} }));
                    setLogAcceso(registroExistente[0]);
                } catch (error) {
                    console.error('Error al obtener el registro:', error);
                    toast.current?.show({
                        severity: 'error',
                        summary: 'ERROR',
                        detail: intl.formatMessage({ id: 'Error al cargar el registro' }),
                        life: 3000,
                    });
                }
            } else {
                // Si estamos creando un nuevo registro, usamos el registro vacío
                setLogAcceso({
                    ...emptyRegistro,
                    resultado: 'exitoso', // Valor por defecto
                    fechaAcceso: new Date() // Fecha actual por defecto
                });
            }
        };

        obtenerDatos();
    }, [idEditar, emptyRegistro]);

    const validaciones = async () => {
        // Valida que los campos obligatorios no estén vacíos
        const validaEmpresaId = !logAcceso.empresaId || logAcceso.empresaId === "";
        const validaUsuarioId = !logAcceso.usuarioId || logAcceso.usuarioId === "";
        const validaResultado = !logAcceso.resultado || logAcceso.resultado === "";

        // Si existe algún campo obligatorio vacío entonces no se puede guardar
        return !validaEmpresaId && !validaUsuarioId && !validaResultado;
    }

    const guardarLogAcceso = async () => {
        setEstadoGuardando(true);
        setEstadoGuardandoBoton(true);
        
        if (await validaciones()) {
            let objGuardar = { ...logAcceso };
            const usuarioActual = getUsuarioSesion()?.id;

            try {
                if (idEditar === 0) {
                    // Insertando un nuevo registro
                    delete objGuardar.id;
                    
                    // Si no se especifica fecha de acceso, usar la actual
                    if (!objGuardar.fechaAcceso) {
                        objGuardar.fechaAcceso = new Date();
                    }

                    const nuevoRegistro = await postLogAcceso(objGuardar);

                    if (nuevoRegistro?.id) {
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
                    // Editando un registro existente
                    
                    const registroEditado = await patchLogAcceso(idEditar, objGuardar);

                    if (registroEditado?.id) {
                        setRegistroResult("editado");
                        setIdEditar(null);
                    } else {
                        toast.current?.show({
                            severity: 'error',
                            summary: 'ERROR',
                            detail: intl.formatMessage({ id: 'Ha ocurrido un error editando el registro' }),
                            life: 3000,
                        });
                    }
                }
            } catch (error) {
                console.error('Error al guardar:', error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'ERROR',
                    detail: intl.formatMessage({ id: 'Ha ocurrido un error al guardar el registro' }),
                    life: 3000,
                });
            }
        } else {
            toast.current?.show({
                severity: 'warn',
                summary: intl.formatMessage({ id: 'Atención' }),
                detail: intl.formatMessage({ id: 'Por favor, complete todos los campos obligatorios' }),
                life: 3000,
            });
        }
        
        setEstadoGuardando(false);
        setEstadoGuardandoBoton(false);
    };

    const cancelarEdicion = () => {
        setIdEditar(null);
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} position="top-right" />
                    
                    <EditarDatosLogAcceso
                        logAcceso={logAcceso}
                        setLogAcceso={setLogAcceso}
                        estadoGuardando={estadoGuardando}
                        opcionesResultado={opcionesResultado}
                        editable={editable}
                    />

                    <Divider />
                    
                    <div className="flex justify-content-end mt-2">
                        {editable && (
                            <Button
                                label={estadoGuardandoBoton ? `${intl.formatMessage({ id: 'Guardando' })}...` : intl.formatMessage({ id: 'Guardar' })} 
                                icon={estadoGuardandoBoton ? "pi pi-spin pi-spinner" : null}
                                loading={estadoGuardandoBoton}
                                onClick={guardarLogAcceso}
                                className="mr-2"
                            />
                        )}
                        <Button label={intl.formatMessage({ id: 'Cancelar' })} onClick={cancelarEdicion} className="p-button-secondary" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarLogAcceso;