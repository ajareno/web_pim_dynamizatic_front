import React from "react";
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import { useIntl } from 'react-intl';
import ArchivoInput from "../../components/shared/archivo_input";
import ArchivoMultipleInput from "../../components/shared/archivo_multiple_input";
import 'react-phone-input-2/lib/bootstrap.css';
import PhoneInput from 'react-phone-input-2';
import es from 'react-phone-input-2/lang/es.json';

const EditarDatosUsuario = ({ usuario, setUsuario, listaRoles, listaIdiomas, listaTipoArchivos, estadoGuardando, isEdit }) => {
    const intl = useIntl();

    //Crear inputs de archivos
    const inputsDinamicos = [];
    for (const tipoArchivo of listaTipoArchivos || []) {
        //Depende del tipo del input se genera multiple o no
        if (tipoArchivo.multiple === 'S') {
            inputsDinamicos.push(
                <div className="flex flex-column field gap-2 mt-2 col-12" key={tipoArchivo.id}>
                    <label>{tipoArchivo.nombre}</label>
                    <ArchivoMultipleInput
                        registro={usuario}
                        setRegistro={setUsuario}
                        archivoTipo={tipoArchivo.tipo}
                        campoNombre={(tipoArchivo.nombre).toLowerCase()}
                    />
                </div>
            );
        }
        else {
            inputsDinamicos.push(
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-4" key={tipoArchivo.id}>
                    <ArchivoInput
                        registro={usuario}
                        setRegistro={setUsuario}
                        archivoTipo={tipoArchivo.tipo}
                        archivoHeader={tipoArchivo.nombre}
                        campoNombre={(tipoArchivo.nombre).toLowerCase()}
                    />
                </div>
            );
        }
    }

    const manejarCambioInputSwitch = (e, nombreInputSwitch) => {
        const valor = (e.target && e.target.value) || "";
        let _usuario = { ...usuario };
        const esTrue = valor === true ? 'S' : 'N';
        _usuario[`${nombreInputSwitch}`] = esTrue;
        setUsuario(_usuario);
    };

    return (
        <Fieldset legend={intl.formatMessage({ id: 'Datos del usuario' })}>
            <div className="formgrid grid">
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-6">
                    <label htmlFor="nombre"><b>{intl.formatMessage({ id: 'Nombre' })}*</b></label>
                    <InputText 
                        id="nombre"
                        value={usuario.nombre || ""}
                        placeholder={intl.formatMessage({ id: 'Nombre del usuario' })}
                        onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
                        className={`${(estadoGuardando && (usuario.nombre === "" || usuario.nombre === undefined)) ? "p-invalid" : ""}`}
                        maxLength={50}
                        disabled={estadoGuardando}
                    />
                </div>

                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-6">
                    <label htmlFor="mail"><b>{intl.formatMessage({ id: 'Email' })}*</b></label>
                    <InputText 
                        id="mail"
                        type="email"
                        value={usuario.mail || ""}
                        placeholder={intl.formatMessage({ id: 'Email del usuario' })}
                        onChange={(e) => setUsuario({ ...usuario, mail: e.target.value })}
                        className={`${(estadoGuardando && (usuario.mail === "" || usuario.mail === undefined)) ? "p-invalid" : ""}`}
                        maxLength={100}
                        disabled={estadoGuardando}
                    />
                </div>

                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-6">
                    <label htmlFor="telefono">{intl.formatMessage({ id: 'Teléfono' })}</label>
                    <PhoneInput
                        country={'es'}
                        value={usuario.telefono || ""}
                        onChange={(phone) => setUsuario({ ...usuario, telefono: phone })}
                        localization={es}
                        disabled={estadoGuardando}
                        inputStyle={{
                            width: '100%',
                            height: '3rem',
                            fontSize: '1rem',
                            border: '1px solid #ced4da',
                            borderRadius: '6px'
                        }}
                    />
                </div>

                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-6">
                    <label htmlFor="rol"><b>{intl.formatMessage({ id: 'Rol' })}*</b></label>
                    <Dropdown
                        id="rol"
                        value={usuario.rolId}
                        options={listaRoles || []}
                        onChange={(e) => setUsuario({ ...usuario, rolId: e.value })}
                        optionLabel="nombre"
                        optionValue="id"
                        placeholder={intl.formatMessage({ id: 'Seleccione un rol' })}
                        className={`${(estadoGuardando && (usuario.rolId === null || usuario.rolId === undefined)) ? "p-invalid" : ""}`}
                        disabled={estadoGuardando}
                    />
                </div>

                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-6">
                    <label htmlFor="idioma"><b>{intl.formatMessage({ id: 'Idioma' })}*</b></label>
                    <Dropdown
                        id="idioma"
                        value={usuario.idiomaId}
                        options={listaIdiomas || []}
                        onChange={(e) => setUsuario({ ...usuario, idiomaId: e.value })}
                        optionLabel="nombre"
                        optionValue="id"
                        placeholder={intl.formatMessage({ id: 'Seleccione un idioma' })}
                        className={`${(estadoGuardando && (usuario.idiomaId === null || usuario.idiomaId === undefined)) ? "p-invalid" : ""}`}
                        disabled={estadoGuardando}
                    />
                </div>

                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-6">
                    <label htmlFor="activo" className="font-bold block">{intl.formatMessage({ id: 'Activo' })}</label>
                    <InputSwitch
                        id="activo"
                        checked={usuario.activoSn === 'S'}
                        onChange={(e) => manejarCambioInputSwitch(e, "activoSn")}
                        disabled={estadoGuardando}
                    />
                </div>
                {
                    ...inputsDinamicos
                }
            </div>
        </Fieldset>
    );
};

export default EditarDatosUsuario;