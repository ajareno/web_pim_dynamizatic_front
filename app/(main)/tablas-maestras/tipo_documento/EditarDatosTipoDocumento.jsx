import { Fieldset } from 'primereact/fieldset';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { useIntl } from 'react-intl'
import { InputSwitch } from 'primereact/inputswitch'

const EditarDatosTipoDocumento = ({ tipoDocumento, setTipoDocumento, estadoGuardando }) => {
    const intl = useIntl();

    const manejarCambioInputSwitch = (e, nombreInputSwitch) => {
        const valor = (e.target && e.target.value) || "";
        let _tipoDocumento = { ...tipoDocumento };
        const esTrue = valor === true ? 'S' : 'N';
        _tipoDocumento[`${nombreInputSwitch}`] = esTrue;
        setTipoDocumento(_tipoDocumento);
    };
    return (
        <Fieldset legend={intl.formatMessage({ id: 'Datos para el tipo de documento' })}>
            <div className="formgrid grid">
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-4">
                    <label htmlFor="tipoDocumentoCodigo"><b>{intl.formatMessage({ id: 'Nombre' })}*</b></label>
                    <InputText value={tipoDocumento.nombre}
                        placeholder={intl.formatMessage({ id: 'Nombre del tipo de documento' })}
                        onChange={(e) => setTipoDocumento({ ...tipoDocumento, nombre: e.target.value })}
                        className={`${(estadoGuardando && tipoDocumento.nombre === "") ? "p-invalid" : ""}`}
                        rows={5} cols={30} maxLength={50} />
                </div>
                {/* <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-4">
                    <label htmlFor="tipoDocumentoCodigo">{intl.formatMessage({ id: 'Codigo' })}</label>
                    <InputText value={tipoDocumento.codigo}
                        placeholder={intl.formatMessage({ id: 'Codigo del tipo de documento' })}
                        onChange={(e) => setTipoDocumento({ ...tipoDocumento, codigo: e.target.value })}
                        //className={`${(estadoGuardando && tipoDocumento.codigo === "") ? "p-invalid" : ""}`}
                        rows={5} cols={30} maxLength={50}/>
                </div> */}
                <div className="flex flex-column field gap-2 mt-2 col-12 lg:col-4">
                    <label htmlFor="activoSN" className="font-bold block">{intl.formatMessage({ id: 'Activo' })}</label>
                    <InputSwitch
                        checked={tipoDocumento.activoSn === 'S'}
                        onChange={(e) => manejarCambioInputSwitch(e, "activoSn")}
                    />

                </div>
            </div>

        </Fieldset>
    );
};

export default EditarDatosTipoDocumento;