import React, { useState } from "react";
import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import { useIntl } from 'react-intl'
import { InputNumber } from "primereact/inputnumber";
import { AutoComplete } from 'primereact/autocomplete';
import ArchivoInput from "../../components/shared/archivo_input";
import ArchivoMultipleInput from "../../components/shared/archivo_multiple_input";
import { MultiSelect } from 'primereact/multiselect';
import 'react-phone-input-2/lib/bootstrap.css'
import PhoneInput from 'react-phone-input-2'
import es from 'react-phone-input-2/lang/es.json'
import { getIdiomaDefecto } from "@/app/components/shared/componentes";
import { tieneUsuarioPermiso } from "@/app/components/shared/componentes";
import { useEffect } from "react";

const EditarDatosUsuario = ({ usuario, setUsuario, listaIdiomas, idiomaSeleccionado, setIdiomaSeleccionado, estadoGuardando,
    listaRoles, rolSeleccionado, setRolSeleccionado, listaTipoArchivos, tipoIvaSeleccionado, setTipoIvaSeleccionado,
    listaTiposIva, tiposSeleccionados, setTiposSeleccionados, tipos
}) => {
    const intl = useIntl()
    const [dropdownAbiertoIdioma, setDropdownAbiertoIdioma] = useState(false);
    const [dropdownAbiertoRol, setDropdownAbiertoRol] = useState(false);
    //Para que el dropdown muestre el registro seleccionado aunque no este en la lista
    const optionsIdioma = dropdownAbiertoIdioma ? listaIdiomas.map(registro => registro.nombre) : [idiomaSeleccionado || '', ...listaIdiomas.map(registro => registro.nombre)];
    const optionsRol = dropdownAbiertoRol ? listaRoles.map(registro => registro.nombre) : [rolSeleccionado || '', ...listaRoles.map(registro => registro.nombre)];


    const [permisoSeleccionarRoles, setPermisoSeleccionarRoles] = useState(false);
    const [permisoSeleccionarTipo, setPermisoSeleccionarTipo] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //Obtenemos permisos del usuario
                setPermisoSeleccionarRoles(await tieneUsuarioPermiso('Nathalie', 'Usuarios', 'SeleccionarRol'))
                setPermisoSeleccionarTipo(await tieneUsuarioPermiso('Nathalie', 'Usuarios', 'SeleccionarTipo'))
            } catch (error) {
                console.error("Error obteniendo los permisos del rol:", error);
            }
            
        };
        fetchData();
    }, []);


    //Crear inputs de archivos
    const inputsDinamicos = [];
    for (const tipoArchivo of listaTipoArchivos) {
        //Depende del tipo del input se genera multiple o no
        if (tipoArchivo.multiple === 'S') {
            inputsDinamicos.push(
                <div className="flex flex-column field gap-2 mt-2 col-12">
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
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-4">
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
        <Fieldset legend={intl.formatMessage({ id: 'Datos para el usuario' })}>
            <div className="formgrid grid">
                {/* <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-4">
                    <label htmlFor="examenIdioma">{intl.formatMessage({ id: 'Idioma' })}</label>
                    <Dropdown value={idiomaSeleccionado || ""}
                        onChange={(e) => setIdiomaSeleccionado(e.value)}
                        options={optionsIdioma}
                        onClick={() => setDropdownAbiertoIdioma(true)}
                        className={`p-column-filter ${(estadoGuardando && (idiomaSeleccionado == null || idiomaSeleccionado === "")) ? "p-invalid" : ""}`}
                        showClear
                        placeholder={intl.formatMessage({ id: 'Selecciona un idioma' })} />
                </div> */}
                {permisoSeleccionarRoles && (
                    <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-4">
                        <label htmlFor="usuRol"><b>{intl.formatMessage({ id: 'Rol' })}*</b> </label>
                        <Dropdown value={rolSeleccionado || ""}
                            onChange={(e) => setRolSeleccionado(e.value)}
                            options={optionsRol}
                            onClick={() => setDropdownAbiertoRol(true)}
                            className={`p-column-filter ${(estadoGuardando && (rolSeleccionado == null || rolSeleccionado === "")) ? "p-invalid" : ""}`}
                            showClear
                            placeholder={intl.formatMessage({ id: 'Selecciona un rol' })} />
                    </div>
                )}
                {permisoSeleccionarTipo && (
                    <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-4">
                        <label htmlFor="rol">{intl.formatMessage({ id: 'Tipos' })}</label>
                        <MultiSelect value={tiposSeleccionados} onChange={(e) => setTiposSeleccionados(e.value)} options={tipos} optionLabel="nombre" display="chip"
                            className={`p-column-filter ${(estadoGuardando && (rolSeleccionado == null || rolSeleccionado === "")) ? "p-invalid" : ""}`}
                            placeholder={intl.formatMessage({ id: 'Selecciona los tipos' })} />
                    </div>
                )}

                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-4">
                    <label htmlFor="examenIdioma"><b>{intl.formatMessage({ id: 'Idioma' })}*</b> </label>
                    <Dropdown value={idiomaSeleccionado || ""}
                        onChange={(e) => setIdiomaSeleccionado(e.value)}
                        options={optionsIdioma}
                        onClick={() => setDropdownAbiertoIdioma(true)}
                        className={`p-column-filter ${(estadoGuardando && (idiomaSeleccionado == null || idiomaSeleccionado === "")) ? "p-invalid" : ""}`}
                        showClear
                        placeholder={intl.formatMessage({ id: 'Selecciona un idioma' })} />
                </div>
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-4">
                    <label htmlFor="usuarioIdioma"> <b>{intl.formatMessage({ id: 'Tipo de iva' })}*</b></label>
                    <Dropdown value={tipoIvaSeleccionado || ""}
                        onChange={(e) => setTipoIvaSeleccionado(e.value)}
                        options={listaTiposIva.map(idioma => idioma.nombre)}
                        className={`p-column-filter ${(estadoGuardando && (tipoIvaSeleccionado == null || tipoIvaSeleccionado === "")) ? "p-invalid" : ""}`}
                        showClear
                        placeholder={intl.formatMessage({ id: 'Selecciona un tipo de iva' })} />
                </div>
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-4">
                    <label htmlFor="usuarioNombre"> <b>{intl.formatMessage({ id: 'Nombre' })}*</b> </label>
                    <InputText value={usuario.nombre}
                        placeholder={intl.formatMessage({ id: 'Nombre del usuario' })}
                        onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
                        className={`${(estadoGuardando && usuario.nombre === "") ? "p-invalid" : ""}`}
                        rows={5} cols={30} />
                </div>
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-4">
                    <label htmlFor="email"> <b>{intl.formatMessage({ id: 'Email' })}*</b> </label>
                    <InputText value={usuario.mail}
                        placeholder={intl.formatMessage({ id: 'Email del usuario' })}
                        onChange={(e) => setUsuario({ ...usuario, mail: e.target.value })}
                        maxLength={100}
                        className={`${(estadoGuardando && (usuario.mail === "" || usuario.mail === undefined)) ? "p-invalid" : ""}`}
                        rows={5} cols={30} />
                </div>
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-4">
                    <label htmlFor="telefono" className="block">{intl.formatMessage({ id: 'Telefono' })} </label>
                    <PhoneInput
                        country={getIdiomaDefecto() === 'es' ? 'es' : getIdiomaDefecto() === 'en' ? 'gb' : 'gb'}
                        id="telefono"
                        localization={getIdiomaDefecto() === 'es' ? es : getIdiomaDefecto() === 'en' ? 'en' : 'en'}
                        international
                        value={usuario.telefono || ""}
                        countryCallingCodeEditable={false}
                        onChange={(e) => setUsuario({ ...usuario, telefono: e })}
                        limitMaxLength={true}
                        inputClass='p-inputtext p-component p-filled w-full'
                        inputStyle={{ padding: '0.75rem 0px 0.75rem 60px' }}
                    //className={` ${(estadoGuardando && usuario.telefono === "") ? "p-invalid" : ""}`}
                    />
                </div>
                {
                    ...inputsDinamicos //Muestra los inputs generados
                }
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-4">
                    <label htmlFor="activoSN" className="font-bold block">{intl.formatMessage({ id: 'Activo' })}</label>
                    <InputSwitch
                        checked={usuario.activoSn === 'S'}
                        onChange={(e) => manejarCambioInputSwitch(e, "activoSn")}
                    />
                </div>
            </div>
        </Fieldset>
    );
};

export default EditarDatosUsuario;