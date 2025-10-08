"use client";
import { getUsuarioPasswordHistoricos, getUsuarioPasswordHistoricosCount } from "@/app/api-endpoints/usuario_password_historico";
import Crud from "../../components/shared/crud";
import { useIntl } from 'react-intl'

const PasswordHistorico = ({usuarioId}) => {
    const intl = useIntl()
    const columnas = [
        { campo: 'password', header: intl.formatMessage({ id: 'Contraseña' }), tipo: 'string' },
        { campo: 'fecha_creacion', header: intl.formatMessage({ id: 'Fecha' }), tipo: 'fechaHora' },
    ]



    return (
        <div>
            <Crud
                headerCrud={intl.formatMessage({ id: 'Historico de contraseñas' })}
                getRegistros={getUsuarioPasswordHistoricos}
                getRegistrosCount={getUsuarioPasswordHistoricosCount}
                botones={['descargarCSV']}
                filtradoBase={{ usuario_id:  usuarioId}}
                columnas={columnas}
                //deleteRegistro={deleteArchivo}
            />
        </div>
    );
};
export default PasswordHistorico;