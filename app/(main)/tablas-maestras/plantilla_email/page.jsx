"use client";
import { getVistaPlantillaEmailIdioma, getVistaPlantillaEmailIdiomaCount, deletePlantillaEmail } from "@/app/api-endpoints/plantilla_email";
import EditarCorreoPlantilla from "./editar";
import Crud from "../../../components/shared/crud";
import { useIntl } from 'react-intl'
const CorreoPlantilla = () => {
    const intl = useIntl();
    const columnas = [
        { campo: 'nombrePlantilla', header: intl.formatMessage({ id: 'Nombre' }), tipo: 'string' },
    ]
 
    return (
        <div>
            <Crud
                headerCrud={intl.formatMessage({ id: 'Plantillas de correo' })}
                seccion={"Correo plantilla"}
                getRegistros={getVistaPlantillaEmailIdioma}
                getRegistrosCount={getVistaPlantillaEmailIdiomaCount}
                filtradoBase={{
                    empresaId: Number(localStorage.getItem('empresa'))
                }}
                botones={['nuevo','ver', 'editar', 'descargarCSV']}
                controlador={"Plantillas de correo"}
                editarComponente={<EditarCorreoPlantilla />}
                columnas={columnas}
                deleteRegistro={deletePlantillaEmail}
            />
        </div>
    );
};
export default CorreoPlantilla;