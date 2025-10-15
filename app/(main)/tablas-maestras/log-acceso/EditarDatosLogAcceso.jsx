import React, { useState, useEffect } from "react";
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { useIntl } from 'react-intl';
import { getEmpresasActivas, getUsuariosActivos } from "@/app/api-endpoints/log_acceso";

const EditarDatosLogAcceso = ({ logAcceso, setLogAcceso, estadoGuardando, opcionesResultado, editable }) => {
    const intl = useIntl();
    const [empresas, setEmpresas] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const [empresasData, usuariosData] = await Promise.all([
                    getEmpresasActivas(),
                    getUsuariosActivos()
                ]);
                setEmpresas(empresasData);
                setUsuarios(usuariosData);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            }
        };

        cargarDatos();
    }, []);

    const manejarCambio = (campo, valor) => {
        setLogAcceso({ ...logAcceso, [campo]: valor });
    };

    return (
        <Fieldset legend={intl.formatMessage({ id: 'Datos del Log de Acceso' })}>
            <div className="formgrid grid">
                
                {/* Usuario */}
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-6">
                    <label htmlFor="usuarioId">{intl.formatMessage({ id: 'Usuario' })}</label>
                    <InputText
                        id="Nombre"
                        value={logAcceso.nombre || ''}
                        placeholder={intl.formatMessage({ id: 'Ej: 192.168.1.1' })}
                        onChange={(e) => manejarCambio('nombre', e.target.value)}
                        maxLength={45}
                        disabled={!editable}
                    />
                </div>

                {/* Dirección IP */}
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-6">
                    <label htmlFor="ipAddress">{intl.formatMessage({ id: 'Dirección IP' })}</label>
                    <InputText
                        id="ipAddress"
                        value={logAcceso.ipAddress || ''}
                        placeholder={intl.formatMessage({ id: 'Ej: 192.168.1.1' })}
                        onChange={(e) => manejarCambio('ipAddress', e.target.value)}
                        maxLength={45}
                        disabled={!editable}
                    />
                </div>

                {/* Navegador */}
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-6">
                    <label htmlFor="navegador">{intl.formatMessage({ id: 'Navegador' })}</label>
                    <InputText
                        id="navegador"
                        value={logAcceso.navegador || ''}
                        placeholder={intl.formatMessage({ id: 'Ej: Chrome, Firefox, Safari' })}
                        onChange={(e) => manejarCambio('navegador', e.target.value)}
                        maxLength={100}
                        disabled={!editable}
                    />
                </div>

                {/* Sistema Operativo */}
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-6">
                    <label htmlFor="sistemaOperativo">{intl.formatMessage({ id: 'Sistema Operativo' })}</label>
                    <InputText
                        id="sistemaOperativo"
                        value={logAcceso.sistemaOperativo || ''}
                        placeholder={intl.formatMessage({ id: 'Ej: Windows, macOS, Linux' })}
                        onChange={(e) => manejarCambio('sistemaOperativo', e.target.value)}
                        maxLength={100}
                        disabled={!editable}
                    />
                </div>

                {/* Dispositivo */}
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-6">
                    <label htmlFor="dispositivo">{intl.formatMessage({ id: 'Dispositivo' })}</label>
                    <InputText
                        id="dispositivo"
                        value={logAcceso.dispositivo || ''}
                        placeholder={intl.formatMessage({ id: 'Ej: Desktop, Mobile, Tablet' })}
                        onChange={(e) => manejarCambio('dispositivo', e.target.value)}
                        maxLength={100}
                        disabled={!editable}
                    />
                </div>

                {/* Resultado */}
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-6">
                    <label htmlFor="resultado">{intl.formatMessage({ id: 'Resultado' })}</label>
                    <Dropdown
                        id="resultado"
                        value={logAcceso.resultado}
                        options={opcionesResultado}
                        placeholder={intl.formatMessage({ id: 'Seleccione un resultado' })}
                        onChange={(e) => manejarCambio('resultado', e.value)}
                        className={`${(estadoGuardando && !logAcceso.resultado) ? "p-invalid" : ""}`}
                        disabled={!editable}
                    />
                </div>

                {/* Fecha de Acceso */}
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-6">
                    <label htmlFor="fechaAcceso">{intl.formatMessage({ id: 'Fecha de Acceso' })}</label>
                    <Calendar
                        id="fechaAcceso"
                        value={logAcceso.fechaAcceso ? new Date(logAcceso.fechaAcceso) : null}
                        onChange={(e) => manejarCambio('fechaAcceso', e.value)}
                        showTime
                        hourFormat="24"
                        dateFormat="dd/mm/yy"
                        placeholder={intl.formatMessage({ id: 'Seleccione fecha y hora' })}
                        disabled={!editable}
                    />
                </div>

                {/* User Agent */}
                <div className="flex flex-column field gap-2 mt-2 col-12">
                    <label htmlFor="userAgent">{intl.formatMessage({ id: 'User Agent' })}</label>
                    <InputTextarea
                        id="userAgent"
                        value={logAcceso.userAgent || ''}
                        placeholder={intl.formatMessage({ id: 'Información del navegador y sistema' })}
                        onChange={(e) => manejarCambio('userAgent', e.target.value)}
                        rows={3}
                        maxLength={500}
                        disabled={!editable}
                        autoResize
                    />
                </div>

                {/* Motivo de Fallo - Solo visible si el resultado es 'fallido' o 'bloqueado' */}
                {(logAcceso.resultado === 'fallido' || logAcceso.resultado === 'bloqueado') && (
                    <div className="flex flex-column field gap-2 mt-2 col-12">
                        <label htmlFor="motivoFallo">{intl.formatMessage({ id: 'Motivo del Fallo' })}</label>
                        <InputTextarea
                            id="motivoFallo"
                            value={logAcceso.motivoFallo || ''}
                            placeholder={intl.formatMessage({ id: 'Descripción del motivo del fallo o bloqueo' })}
                            onChange={(e) => manejarCambio('motivoFallo', e.target.value)}
                            rows={2}
                            maxLength={200}
                            disabled={!editable}
                            autoResize
                        />
                    </div>
                )}
            </div>
        </Fieldset>
    );
};

export default EditarDatosLogAcceso;