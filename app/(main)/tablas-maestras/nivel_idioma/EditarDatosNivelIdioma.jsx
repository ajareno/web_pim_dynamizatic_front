import React, { useState } from "react";
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import { useIntl } from 'react-intl';

const EditarDatosNivelIdioma = ({ nivelIdioma, setNivelIdioma, listaIdiomas, idiomaSeleccionado, setIdiomaSeleccionado, estadoGuardando }) => {
    const intl = useIntl();

    const [dropdownAbierto, setDropdownAbierto] = useState(false);
    //Para que el dropdown muestre el registro seleccionado aunque no este en la lista
    const options = dropdownAbierto ? listaIdiomas.map(registro => registro.nombre) : [idiomaSeleccionado || '', ...listaIdiomas.map(registro => registro.nombre)];

    const manejarCambioInputSwitch = (e, nombreInputSwitch) => {
        const valor = (e.target && e.target.value) || "";
        let _nivelIdioma = { ...nivelIdioma };
        const esTrue = valor === true ? 'S' : 'N';
        _nivelIdioma[`${nombreInputSwitch}`] = esTrue;
        setNivelIdioma(_nivelIdioma);
    };
    return (
        <Fieldset legend={intl.formatMessage({ id: 'Datos para el nivel de idioma' })}>
            <div className="formgrid grid">
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-4">
                    <label htmlFor="nivelIdiomaNombre"> <b>{intl.formatMessage({ id: 'Nombre' })}*</b></label>
                    <InputText value={nivelIdioma.nombre}
                        placeholder={intl.formatMessage({ id: 'Nombre del nivel de idioma' })}
                        onChange={(e) => setNivelIdioma({ ...nivelIdioma, nombre: e.target.value })}
                        className={`${(estadoGuardando && nivelIdioma.nombre === "") ? "p-invalid" : ""}`}
                        maxLength={50}
                        rows={5} cols={30} />
                </div>
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-4">
                    <label htmlFor="nivelIdiomaEmpresa"><b>{intl.formatMessage({ id: 'Idioma' })}*</b></label>
                    <Dropdown value={idiomaSeleccionado || ""}
                        onChange={(e) => setIdiomaSeleccionado(e.value)}
                        options={options}
                        onClick={() => setDropdownAbierto(true)}
                        className={`p-column-filter ${(estadoGuardando && (idiomaSeleccionado == null || idiomaSeleccionado === "")) ? "p-invalid" : ""}`}
                        showClear maxLength={50}
                        placeholder={intl.formatMessage({ id: 'Selecciona un idioma' })} />
                </div>
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-4">
                    <label htmlFor="nivelIdiomaCodigo">{intl.formatMessage({ id: 'Codigo' })}</label>
                    <InputText value={nivelIdioma.codigo}
                        placeholder={intl.formatMessage({ id: 'Codigo del nivel idioma' })}
                        onChange={(e) => setNivelIdioma({ ...nivelIdioma, codigo: e.target.value })}
                        //className={`${(estadoGuardando && nivelIdioma.codigo === "") ? "p-invalid" : ""}`}
                        rows={5} cols={30} maxLength={20} />
                </div>
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-4">
                    <label htmlFor="activoSN" className="font-bold block">{intl.formatMessage({ id: 'Activo' })}</label>
                    <InputSwitch
                        checked={nivelIdioma.activoSn === 'S'}
                        onChange={(e) => manejarCambioInputSwitch(e, "activoSn")}
                    />
                </div>
            </div>

        </Fieldset>
    );
};

export default EditarDatosNivelIdioma;