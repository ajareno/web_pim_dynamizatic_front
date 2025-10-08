import React, { useState } from "react";
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from 'primereact/inputswitch';
import { useIntl } from 'react-intl';
const EditarDatosPlanificadorEstado = ({ planificadorEstado, setPlanificadorEstado, estadoGuardando }) => {
    const intl = useIntl();
    const manejarCambioInputSwitch = (e, nombreInputSwitch) => {
        const valor = (e.target && e.target.value) || "";
        let _planificadorEstado = { ...planificadorEstado };
        const esTrue = valor === true ? 'S' : 'N';
        _planificadorEstado[`${nombreInputSwitch}`] = esTrue;
        setPlanificadorEstado(_planificadorEstado);
    };

    return (
        <Fieldset legend={intl.formatMessage({ id: 'Datos para el estado del planificador' })}>
            <div className="formgrid grid">
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-4">
                    <label htmlFor="nombre"><b>{intl.formatMessage({ id: 'Nombre' })}*</b></label>
                    <InputText value={planificadorEstado.nombre}
                        placeholder={intl.formatMessage({ id: 'Nombre del estado del planificador' })}
                        onChange={(e) => setPlanificadorEstado({ ...planificadorEstado, nombre: e.target.value })}
                        className={`${(estadoGuardando && planificadorEstado.nombre === "") ? "p-invalid" : ""}`}
                        rows={5} cols={30} maxLength={50} />
                </div>
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-4">
                    <label htmlFor="activoSN" className="font-bold block">{intl.formatMessage({ id: 'Activo' })}</label>
                    <InputSwitch
                        checked={planificadorEstado.activoSn === 'S'}
                        onChange={(e) => manejarCambioInputSwitch(e, "activoSn")}
                    />
                </div>
            </div>

        </Fieldset>
    );
};

export default EditarDatosPlanificadorEstado;