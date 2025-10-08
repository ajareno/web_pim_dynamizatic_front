"use client";
import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useIntl } from 'react-intl';

const EditarUsuario = ({ idEditar, setIdEditar }) => {
    const intl = useIntl();
    const toast = useRef(null);

    const [usuario, setUsuario] = useState({
        nombre: "",
        mail: "",
        activoSn: "N"
    });

    const [idiomaSeleccionado, setIdiomaSeleccionado] = useState(null);
    const [rolSeleccionado, setRolSeleccionado] = useState(null);

    const listaIdiomas = [
        { nombre: "Español", id: 1 },
        { nombre: "Inglés", id: 2 }
    ];

    const listaRoles = [
        { nombre: "Administrador", id: 1 },
        { nombre: "Usuario", id: 2 }
    ];

    const guardarUsuario = async () => {
        if (!usuario.nombre || !usuario.mail || !idiomaSeleccionado || !rolSeleccionado) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'Todos los campos deben de ser rellenados' }),
                life: 3000,
            });
            return;
        }

        // Aquí iría la lógica de guardado
        toast.current?.show({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Usuario guardado correctamente',
            life: 3000,
        });
    };

    const cancelarEdicion = () => {
        setIdEditar(null);
    };

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} position="top-right" />
                    <h2>{idEditar > 0 ? 'Editar' : 'Nuevo'} Usuario</h2>

                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="nombre">Nombre *</label>
                            <InputText
                                id="nombre"
                                value={usuario.nombre}
                                onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
                            />
                        </div>

                        <div className="field col-12 md:col-6">
                            <label htmlFor="mail">Email *</label>
                            <InputText
                                id="mail"
                                type="email"
                                value={usuario.mail}
                                onChange={(e) => setUsuario({ ...usuario, mail: e.target.value })}
                            />
                        </div>

                        <div className="field col-12 md:col-6">
                            <label htmlFor="idioma">Idioma *</label>
                            <Dropdown
                                id="idioma"
                                value={idiomaSeleccionado}
                                options={listaIdiomas}
                                onChange={(e) => setIdiomaSeleccionado(e.value)}
                                optionLabel="nombre"
                                placeholder="Seleccione un idioma"
                            />
                        </div>

                        <div className="field col-12 md:col-6">
                            <label htmlFor="rol">Rol *</label>
                            <Dropdown
                                id="rol"
                                value={rolSeleccionado}
                                options={listaRoles}
                                onChange={(e) => setRolSeleccionado(e.value)}
                                optionLabel="nombre"
                                placeholder="Seleccione un rol"
                            />
                        </div>
                    </div>

                    <div className="flex justify-content-end mt-4">
                        <Button
                            label="Guardar"
                            onClick={guardarUsuario}
                            className="mr-2"
                        />
                        <Button
                            label="Cancelar"
                            onClick={cancelarEdicion}
                            className="p-button-secondary"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarUsuario;
