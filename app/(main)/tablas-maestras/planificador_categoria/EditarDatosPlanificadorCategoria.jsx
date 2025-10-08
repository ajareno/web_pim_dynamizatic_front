import React, { useState } from "react";
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { useIntl } from 'react-intl';
import { InputTextarea } from 'primereact/inputtextarea';

const EditarDatosPlanificadorCategoria = ({ planificadorCategoria, setPlanificadorCategoria, estadoGuardando }) => {
    const intl = useIntl();
    return (
        <Fieldset legend={intl.formatMessage({ id: 'Datos para la categoria del planificador' })}>
            <div className="formgrid grid">
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-4">
                    <label htmlFor="planificador de categoríaNombre"><b>{intl.formatMessage({ id: 'Nombre' })}*</b></label>
                    <InputText value={planificadorCategoria.nombre}
                        placeholder={intl.formatMessage({ id: 'Nombre de la categoria del planificador' })}
                        onChange={(e) => setPlanificadorCategoria({ ...planificadorCategoria, nombre: e.target.value })}
                        className={`${(estadoGuardando && planificadorCategoria.nombre === "") ? "p-invalid" : ""}`}
                        rows={5} cols={30} maxLength={50}/>
                </div>
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-12">
                    <label htmlFor="descripcion">{intl.formatMessage({ id: 'Descripcion' })}</label>
                    <InputTextarea value={planificadorCategoria.descripcion} autoResize 
                        placeholder={intl.formatMessage({ id: 'Descipcion de la categoria del planificador' })}
                        onChange={(e) => setPlanificadorCategoria({ ...planificadorCategoria, descripcion: e.target.value })}
                        //className={`${(estadoGuardando && planificadorCategoria.descripcion === "") ? "p-invalid" : ""}`}
                        rows={5} cols={30} maxLength={250} />
                </div>
            </div>
        </Fieldset>
    );
};

export default EditarDatosPlanificadorCategoria;