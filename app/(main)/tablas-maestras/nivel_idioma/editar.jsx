"use client";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { getIdiomas } from "@/app/api-endpoints/idioma";
import { postNivelIdioma, patchNivelIdioma } from "@/app/api-endpoints/nivel_idioma";
import EditarDatosNivelIdioma from "./EditarDatosNivelIdioma";
import 'primeicons/primeicons.css';
import { getUsuarioSesion } from "@/app/utility/Utils";
import { useIntl } from 'react-intl';

const EditarNivelIdioma = ({ idEditar, setIdEditar, rowData, emptyRegistro, setRegistroResult, listaTipoArchivos, seccion, editable }) => {
    const intl = useIntl();
    const toast = useRef(null);
    const [nivelIdioma, setNivelIdioma] = useState(emptyRegistro);
    const [listaIdiomas, setListaIdiomas] = useState([]);
    const [idiomaSeleccionado, setIdiomaSeleccionado] = useState(null);
    const [estadoGuardando, setEstadoGuardando] = useState(false);
    const [estadoGuardandoBoton, setEstadoGuardandoBoton] = useState(false);

    useEffect(() => {
        //
        //Lo marcamos aquí como saync ya que useEffect no permite ser async porque espera que la función que le pases devueva undefined o una función para limpiar el efecto. 
        //Una función async devuelve una promesa, lo cual no es compatible con el comportamiento esperado de useEffect.
        //
        const fetchData = async () => {
            // Obtenemos todos los idiomas
            const registrosIdiomas = await getIdiomas();
            const jsonIdiomas = registrosIdiomas.map(idioma => ({
                nombre: idioma.nombre,
                id: idioma.id,
                activoSn: idioma.activoSn
            })).sort((a, b) => a.nombre.localeCompare(b.nombre));;

            //Quitamos los registros inactivos
            const jsonIdiomasActivos = jsonIdiomas.filter(registro => registro.activoSn === 'S');
            setListaIdiomas(jsonIdiomasActivos);

            // Si el idEditar es diferente de nuevo, entonces se va a editar
            if (idEditar !== 0) {
                // Obtenemos el registro a editar
                const registro = rowData.find((element) => element.id === idEditar);
                setNivelIdioma(registro);
                // Obtenemos el nombre del idioma seleccionado
                const registroIdioma = registrosIdiomas.find((element) => element.id === registro.idiomaId).nombre;
                setIdiomaSeleccionado(registroIdioma);

            }
        };
        fetchData();
    }, [idEditar, rowData]);

    const validaciones = async () => {
        //Valida el bloque de nivel idioma
        const validaNombre = nivelIdioma.nombre === undefined || nivelIdioma.nombre === "";
        const validaIdioma = idiomaSeleccionado == null || idiomaSeleccionado.id === "";
        //const validaCodigo = nivelIdioma.codigo === undefined || nivelIdioma.codigo === "";

        //
        //Si existe algún bloque vacio entonces no se puede guardar
        //
        //return (!validaCodigo && !validaNombre && !validaIdioma)
        return (!validaNombre && !validaIdioma)
    }

    const guardarCodigoPostal = async () => {
        setEstadoGuardando(true);
        setEstadoGuardandoBoton(true);
        if (await validaciones()) {
            // Obtenemos el registro actual y solo entramos si tiene nombre y contenido
            let objGuardar = { ...nivelIdioma };
            const usuarioActual = getUsuarioSesion()?.id;

            // Si estoy insertando uno nuevo
            if (idEditar === 0) {
                // Elimino y añado los campos que no se necesitan
                delete objGuardar.id;
                delete objGuardar.nombreIdioma;
                objGuardar['usuCreacion'] = usuarioActual;
                objGuardar['idiomaId'] = listaIdiomas.find(idioma => idioma.nombre === idiomaSeleccionado).id;
                if (objGuardar.activoSn === '') {
                    objGuardar.activoSn = 'N';
                }

                // Hacemos el insert del registro
                const nuevoRegistro = await postNivelIdioma(objGuardar);

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
                const registroSeleccionado = listaIdiomas.find(idioma => idioma.nombre === idiomaSeleccionado)
                if (registroSeleccionado) {
                    objGuardar['idiomaId'] = registroSeleccionado.id;
                }
                objGuardar['usuModificacion'] = getUsuarioSesion()?.id
                delete objGuardar.nombreIdioma;

                await patchNivelIdioma(objGuardar.id, objGuardar);
                setIdEditar(null)
                setRegistroResult("editado");
            }
        }
        else {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'Todos los campos deben de ser rellenados' }),
                life: 3000,
            });
        }
        setEstadoGuardandoBoton(false);
        //setAccion("consulta");
        //setIdEditar(null);
    };

    const cancelarEdicion = () => {
        setIdEditar(null)
        //setAccion("consulta");
    };

    const header = idEditar > 0 ? (editable ? intl.formatMessage({ id: 'Editar' }) : intl.formatMessage({ id: 'Ver' })) : intl.formatMessage({ id: 'Nuevo' });

    return (
        <div>
            <div className="grid idioma">
                <div className="col-12">
                    <div className="card">
                        <Toast ref={toast} position="top-right" />
                        <h2>{header} {(intl.formatMessage({ id: 'Nivel de idioma' })).toLowerCase()}</h2>
                        <EditarDatosNivelIdioma
                            nivelIdioma={nivelIdioma}
                            setNivelIdioma={setNivelIdioma}
                            listaIdiomas={listaIdiomas}
                            idiomaSeleccionado={idiomaSeleccionado}
                            setIdiomaSeleccionado={setIdiomaSeleccionado}
                            estadoGuardando={estadoGuardando}
                        />

                        <div className="flex justify-content-end mt-2">
                            {editable && (
                                <Button
                                    label={estadoGuardandoBoton ? `${intl.formatMessage({ id: 'Guardando' })}...` : intl.formatMessage({ id: 'Guardar' })}
                                    icon={estadoGuardandoBoton ? "pi pi-spin pi-spinner" : null}
                                    onClick={guardarCodigoPostal}
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

export default EditarNivelIdioma;