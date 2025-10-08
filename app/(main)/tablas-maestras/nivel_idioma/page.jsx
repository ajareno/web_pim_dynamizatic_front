"use client";
import { getVistaNivelIdiomaIdioma, getVistaNivelIdiomaIdiomaCount, deleteNivelIdioma } from "@/app/api-endpoints/nivel_idioma";
import EditarNivelIdioma from "./editar";
import Crud from "../../../components/shared/crud";
import { useIntl } from 'react-intl'
const NivelIdioma = () => {
    const intl = useIntl();
    const columnas = [
        { campo: 'nombre', header: intl.formatMessage({ id: 'Nombre' }), tipo: 'string' },
        { campo: 'nombreIdioma', header: intl.formatMessage({ id: 'Idioma' }), tipo: 'string' },
        { campo: 'codigo', header: intl.formatMessage({ id: 'Codigo' }), tipo: 'string' },
        { campo: 'activoSn', header: intl.formatMessage({ id: 'Activo' }), tipo: 'booleano' },
    ]

    return (
        <div>
            <Crud
                headerCrud={intl.formatMessage({ id: 'Niveles de idioma' })}
                getRegistros={getVistaNivelIdiomaIdioma}
                getRegistrosCount={getVistaNivelIdiomaIdiomaCount}
                botones={['nuevo','ver', 'editar', 'eliminar', 'descargarCSV']}
                controlador={"Niveles de idioma"}
                empresaId={null}
                editarComponente={<EditarNivelIdioma />}
                columnas={columnas}
                deleteRegistro={deleteNivelIdioma}
            />
        </div>
    );
};
export default NivelIdioma;