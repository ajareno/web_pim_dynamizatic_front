import React from "react";
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Password } from 'primereact/password';
import { InputSwitch } from 'primereact/inputswitch';
import { useIntl } from 'react-intl';

const EditarDatosEmpresa = ({ empresa, setEmpresa, estadoGuardando, isEdit }) => {
    const intl = useIntl();

    const manejarCambioInputSwitch = (e, nombreInputSwitch) => {
        const valor = (e.target && e.target.value) || "";
        let _empresa = { ...empresa };
        const esTrue = valor === true ? 'S' : 'N';
        _empresa[`${nombreInputSwitch}`] = esTrue;
        setEmpresa(_empresa);
    };

    return (
        <Fieldset legend={intl.formatMessage({ id: 'Datos de la empresa' })}>
            <div className="formgrid grid">
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-6">
                    <label htmlFor="codigo"><b>{intl.formatMessage({ id: 'Código' })}*</b></label>
                    <InputText 
                        id="codigo"
                        value={empresa.codigo}
                        placeholder={intl.formatMessage({ id: 'Código de la empresa' })}
                        onChange={(e) => setEmpresa({ ...empresa, codigo: e.target.value })}
                        className={`${(estadoGuardando && empresa.codigo === "") ? "p-invalid" : ""}`}
                        maxLength={20}
                        disabled={estadoGuardando}
                    />
                </div>

                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-6">
                    <label htmlFor="nombre"><b>{intl.formatMessage({ id: 'Nombre' })}*</b></label>
                    <InputText 
                        id="nombre"
                        value={empresa.nombre}
                        placeholder={intl.formatMessage({ id: 'Nombre de la empresa' })}
                        onChange={(e) => setEmpresa({ ...empresa, nombre: e.target.value })}
                        className={`${(estadoGuardando && empresa.nombre === "") ? "p-invalid" : ""}`}
                        maxLength={50}
                        disabled={estadoGuardando}
                    />
                </div>

                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-6">
                    <label htmlFor="tiempoInactividad">{intl.formatMessage({ id: 'Tiempo de Inactividad' })} ({intl.formatMessage({ id: 'minutos' })})</label>
                    <InputNumber 
                        id="tiempoInactividad"
                        value={empresa.tiempoInactividad === undefined || empresa.tiempoInactividad === null || empresa.tiempoInactividad === "" ? 100 : empresa.tiempoInactividad}
                        placeholder={intl.formatMessage({ id: 'Tiempo en minutos' })}
                        onValueChange={(e) => setEmpresa({ ...empresa, tiempoInactividad: e.value === null ? 100 : e.value })}
                        disabled={estadoGuardando}
                        min={100}
                        inputStyle={{ textAlign: 'right' }}
                    />
                    <span style={{ fontWeight: 'bold', color: '#6c757d', fontStyle: 'italic' }}><small className="text-muted">{intl.formatMessage({ id: 'El valor mínimo es 100' })}</small></span>
                </div>

                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-6">
                    <label htmlFor="activo" className="font-bold block">{intl.formatMessage({ id: 'Activo' })}</label>
                    <InputSwitch
                        id="activo"
                        checked={empresa.activoSn === 'S'}
                        onChange={(e) => manejarCambioInputSwitch(e, "activoSn")}
                        disabled={estadoGuardando}
                    />
                </div>
                
                <div className="flex flex-column field gap-2 mt-2 col-12">
                    <label htmlFor="descripcion">{intl.formatMessage({ id: 'Descripción' })}</label>
                    <InputTextarea 
                        id="descripcion"
                        value={empresa.descripcion}
                        placeholder={intl.formatMessage({ id: 'Descripción de la empresa' })}
                        onChange={(e) => setEmpresa({ ...empresa, descripcion: e.target.value })}
                        rows={3}
                        maxLength={500}
                        disabled={estadoGuardando}
                    />
                </div>
            </div>
        </Fieldset>
    );
};

export default EditarDatosEmpresa;