"use client";
import React, { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import EditarDatosUsuario from "./EditarDatosUsuario";
import 'primeicons/primeicons.css';
import { patchUsuario, postUsuario, getUsuarioTiposUsuario, getVistaUsuarios, getVistaUsuariosCount, getVistaAcompanyantes, getVistaAcompanyantesCount } from "@/app/api-endpoints/usuario";
import { postUsuarioTipos, deleteUsuarioTipos, getUsuarioTipos } from "@/app/api-endpoints/usuario_tipos";
import { getRol } from "@/app/api-endpoints/rol";
import { useRouter } from 'next/navigation';
import { tieneUsuarioPermiso } from "@/app/components/shared/componentes";
import { getUsuarioSesion, formatearFechaLocal_a_toISOString } from "@/app/utility/Utils";
import { useAuth } from "@/app/auth/AuthContext";
import { useIntl } from 'react-intl'
import { obtenerArchivosSeccion } from "@/app/components/shared/componentes";
import { esUrlImagen } from "@/app/components/shared/componentes";
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import { TabView, TabPanel } from 'primereact/tabview';
import { getIdiomas } from "@/app/api-endpoints/idioma";
import { obtenerRolDashboard } from "@/app/api-endpoints/rol";
import { getEmpresas } from "@/app/api-endpoints/empresa";
import { getVistaTipoIvaPais } from "@/app/api-endpoints/tipo_iva";
import { borrarFichero, postSubirImagen, postSubirFichero, postSubirAvatar } from "@/app/api-endpoints/ficheros"
import { postArchivo, deleteArchivo } from "@/app/api-endpoints/archivo"
import { getCentrosEscolares, postCentroEscolar, patchCentroEscolar, deleteCentroEscolar } from "@/app/api-endpoints/centro_escolar";
import {
    getTutores, postTutor, patchTutor, deleteTutor, getTutorEnfermedades, getTutorAlergias,
    getTutorMascotas, getTutorHobbies, deleteTutorEnfermedad, deleteTutorAlergia, deleteTutorHobbie, deleteTutorMascota,
    postTutorAlergia, postTutorEnfermedad, postTutorHobbie, postTutorMascota
} from "@/app/api-endpoints/tutor";
import {
    getProfesores, postProfesor, patchProfesor, deleteProfesor, getProfesorAlergias, getProfesorEnfermedades, getProfesorHobbies, getProfesorMascotas,
    deleteProfesorAlergia, deleteProfesorEnfermedad, deleteProfesorHobbie, deleteProfesorMascota, postProfesorAlergia,
    postProfesorEnfermedad, postProfesorHobbie, postProfesorMascota
} from "@/app/api-endpoints/profesor";
import ArchivosUsuario from "./archivosUsuario";
import PasswordHistorico from "./passwordHistorico";
import CuentaBancariaUsuario from "./cuenta_bancaria/cuentaBancariaUsuario";
import DatosParaFacutras from "./datos_facturas/datosParaFacturas";
import TutorAlumnos from "./tutor_alumnos/tutorAlumnos";
import FacturasEmitidas from "./facturas_emitidas/facturaEmitida";
import ExamenesAlumno from "./alumno/ExamenesAlumno";
import TutoresAlumno from "./alumno/TutoresAlumno";
import EditarCentroEscolar from "./centro_escolar/EditarDatosCentroEscolar";
import EditarDatosTutor from "./tutor/EditarDatosTutor";
import EditarDatosProfesor from "./profesores/EditarDatosProfesor";
import EditarDatosAlumno from "./alumno/EditarDatosAlumno";
import EditarDatosAgente from "./agente/EditarDatosAgente";
import EditarDatosFamiliaAcogida from "./familia_acogida/EditarDatosFamiliaAcogida";
import EditarDatosAcompanyante from "./acompanyante/EditarDatosAcompanyante";
import AlumnosAcompanyante from "./acompanyante/AlumnosAcompanyante";
import Cobros from "./cobros/crudCobros";
import Incidencias from "./incidencias/incidenciasUsuario";
import { getCodigoPostal } from "@/app/api-endpoints/codigo_postal";
import { getVistaTipoDocumentoEmpresa } from "@/app/api-endpoints/tipo_documento";
import { getHobbies } from "@/app/api-endpoints/hobbie";
import { getEnfermedades } from "@/app/api-endpoints/enfermedad";
import { getAlumnoCompanyeros, postAlumnoCompanyero, deleteAlumnoCompanyero } from "@/app/api-endpoints/alumno_companyero";
import { getAlumnoTutores, postAlumnoTutor, deleteAlumnoTutor } from "@/app/api-endpoints/alumno_tutor";
import { getAlergias } from "@/app/api-endpoints/alergia";
import { getComerciales } from "@/app/api-endpoints/comercial";
import { getMascotas } from "@/app/api-endpoints/mascota";
import {
    getAlumnos, postAlumno, patchAlumno, deleteAlumno, getAlumnoAlergias, getAlumnoEnfermedades, getAlumnoHobbies, getAlumnoMascotas,
    deleteAlumnoAlergia, deleteAlumnoEnfermedad, deleteAlumnoHobbie, deleteAlumnoMascota, postAlumnoAlergia,
    postAlumnoEnfermedad, postAlumnoHobbie, postAlumnoMascota, getAlumnoNivelesIdioma, postAlumnoNivelIdioma, deleteAlumnoNivelIdioma
} from "@/app/api-endpoints/alumno";

import {
    getFamiliasAcogida, postFamiliaAcogida, patchFamiliaAcogida, deleteFamiliaAcogida, getFamiliaAcogidaAlergias, getFamiliaAcogidaEnfermedades, getFamiliaAcogidaHobbies, getFamiliaAcogidaMascotas,
    deleteFamiliaAcogidaAlergia, deleteFamiliaAcogidaEnfermedad, deleteFamiliaAcogidaHobbie, deleteFamiliaAcogidaMascota, postFamiliaAcogidaAlergia,
    postFamiliaAcogidaEnfermedad, postFamiliaAcogidaHobbie, postFamiliaAcogidaMascota,
    getFamiliaAcogidaBonuses
} from "@/app/api-endpoints/familia_acogida";

import {
    getAgentes, postAgente, patchAgente, deleteAgente,
} from "@/app/api-endpoints/agente";
import { getTallas } from "@/app/api-endpoints/talla";
import { validaDocumentoIdentidad } from "@/app/utility/Utils"
import { getNivelIdiomas } from "@/app/api-endpoints/nivel_idioma";
import { getTiposProfesores } from "@/app/api-endpoints/tipo_profesor";
import { getCursos } from "@/app/api-endpoints/curso";
import { getDietas } from "@/app/api-endpoints/dieta";
import { getAcompanyantes, postAcompanyante, patchAcompanyante, deleteAcompanyante, getVistaAcompanyanteAlumno } from "@/app/api-endpoints/acompanyante";
import { deleteAlumnoAcompanyante, getAlumnoAcompanyantes, postAlumnoAcompanyante } from "@/app/api-endpoints/alumno_acompanyante";

const EditarUsuario = ({ idEditar, setIdEditar, rowData, emptyRegistro, setRegistroResult, listaTipoArchivos, seccion,
    editable, setRegistroEditarFlag, tipo, rol, crudDerivado }) => {
    const intl = useIntl()
    const toast = useRef(null);
    const [usuario, setUsuario] = useState(emptyRegistro);
    const [estadoGuardando, setEstadoGuardando] = useState(false);
    const [sePuedeCancelar, setSePuedeCancelar] = useState(false);
    const [listaIdiomas, setListaIdiomas] = useState([]);
    const [idiomaSeleccionado, setIdiomaSeleccionado] = useState(null);
    const [tiposSeleccionados, setTiposSeleccionados] = useState([]);
    const [tiposSeleccionadosAntiguo, setTiposSeleccionadosAntiguo] = useState([]);
    const [listaTiposIva, setListaTiposIva] = useState([]);
    const [tipoIvaSeleccionado, setTipoIvaSeleccionado] = useState(null);
    const [estadoGuardandoBoton, setEstadoGuardandoBoton] = useState(false);
    const [listaEmpresas, setListaEmpresas] = useState([]);
    const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);
    const [listaRoles, setListaRoles] = useState([]);
    const [rolSeleccionado, setRolSeleccionado] = useState(null);
    const [listaTipoArchivosAntiguos, setListaTipoArchivosAntiguos] = useState([]);
    const [pestanyasTipoUsuario, setPestanyasTipoUsuario] = useState([]);
    const [pestanyasTipoUsuarioTab, setPestanyasTipoUsuarioTab] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [listaCentros, setListaCentros] = useState([]);
    const [listaDietas, setListaDietas] = useState([]);
    const [listaEnfermedades, setListaEnfermedades] = useState([]);
    const [listaAlergias, setListaAlergias] = useState([]);
    const [listaMascotas, setListaMascotas] = useState([]);
    const [listaHobbies, setListaHobbies] = useState([]);
    const [listaTiposDocumentosActivos, setListaTiposDocumentosActivos] = useState([]);
    const [listaTiposDocumentos, setListaTiposDocumentos] = useState([]);
    const [listaTutores, setListaTutores] = useState([]);
    const [listaAcompanyantes, setListaAcompanyantes] = useState([]);
    const [listaCompanyeros, setListaCompanyeros] = useState([]);
    const [listaNivelesIdioma, setListaNivelesIdioma] = useState([]);
    const [listaComerciales, setListaComerciales] = useState([]);
    const [listaBonus, setListaBonus] = useState([]);
    const [listaAgentes, setListaAgentes] = useState([]);
    const [listaTallas, setListaTallas] = useState([]);
    const [listaTiposProfesorNativo, setListaTiposProfesorNativo] = useState([]);
    const [listaTiposProfesor, setListaTiposProfesor] = useState([]);
    const [listaCursos, setListaCursos] = useState([]);
    const [idEditarDerivado, setIdEditarDerivado] = useState(idEditar);
    const router = useRouter();
    const { logout } = useAuth();

    //Parametros tutor
    const [codigoPostalSeleccionadoTutor, setCodigoPostalSeleccionadoTutor] = useState(null);
    const [tipoDocumentoSeleccionado, setTipoDocumentoSeleccionado] = useState(null);
    const [listaTipoArchivosTutor, setListaTipoArchivosTutor] = useState([]);
    const [listaTipoArchivosTutorAntiguos, setListaTipoArchivosTutorAntiguos] = useState([]);
    const [sexoTutorSeleccionado, setSexoTutorSeleccionado] = useState(null);
    const [agenteSeleccionado, setAgenteSeleccionado] = useState(null);
    const sexos = [
        { nombre: intl.formatMessage({ id: 'Femenino' }), valor: 'F' },
        { nombre: intl.formatMessage({ id: 'Masculino' }), valor: 'M' },
        { nombre: intl.formatMessage({ id: 'Otros' }), valor: 'O' },

    ];
    const [enfermedadesTutorSeleccionadas, setEnfermedadesTutorSeleccionadas] = useState([]);
    const [enfermedadesTutorSeleccionadasAntiguas, setEnfermedadesTutorSeleccionadasAntiguas] = useState([]);
    const [alergiasTutorSeleccionadas, setAlergiasTutorSeleccionadas] = useState([]);
    const [alergiasTutorSeleccionadasAntiguas, setAlergiasTutorSeleccionadasAntiguas] = useState([]);
    const [mascotasTutorSeleccionadas, setMascotasTutorSeleccionadas] = useState([]);
    const [mascotasTutorSeleccionadasAntiguas, setMascotasTutorSeleccionadasAntiguas] = useState([]);
    const [hobbiesTutorSeleccionados, setHobbiesTutorSeleccionados] = useState([]);
    const [hobbiesTutorSeleccionadosAntiguos, setHobbiesTutorSeleccionadosAntiguos] = useState([]);
    const [mostrarHijosTutor, setMostrarHijosTutor] = useState(false);


    //Parametros profesor
    const [codigoPostalSeleccionadoProfesor, setCodigoPostalSeleccionadoProfesor] = useState(null);
    const [tipoDocumentoSeleccionadoProfesor, setTipoDocumentoSeleccionadoProfesor] = useState(null);
    const [listaTipoArchivosProfesor, setListaTipoArchivosProfesor] = useState([]);
    const [listaTipoArchivosProfesorAntiguos, setListaTipoArchivosProfesorAntiguos] = useState([]);
    const [sexoProfesorSeleccionado, setSexoProfesorSeleccionado] = useState(null);
    const [centroProfesor, setCentroProfesor] = useState(null);

    const [enfermedadesProfesorSeleccionadas, setEnfermedadesProfesorSeleccionadas] = useState([]);
    const [enfermedadesProfesorSeleccionadasAntiguas, setEnfermedadesProfesorSeleccionadasAntiguas] = useState([]);
    const [alergiasProfesorSeleccionadas, setAlergiasProfesorSeleccionadas] = useState([]);
    const [alergiasProfesorSeleccionadasAntiguas, setAlergiasProfesorSeleccionadasAntiguas] = useState([]);
    const [mascotasProfesorSeleccionadas, setMascotasProfesorSeleccionadas] = useState([]);
    const [mascotasProfesorSeleccionadasAntiguas, setMascotasProfesorSeleccionadasAntiguas] = useState([]);
    const [hobbiesProfesorSeleccionados, setHobbiesProfesorSeleccionados] = useState([]);
    const [hobbiesProfesorSeleccionadosAntiguos, setHobbiesProfesorSeleccionadosAntiguos] = useState([]);

    //Parametros profesor nativo
    const [codigoPostalSeleccionadoProfesorNativo, setCodigoPostalSeleccionadoProfesorNativo] = useState(null);
    const [tipoDocumentoSeleccionadoProfesorNativo, setTipoDocumentoSeleccionadoProfesorNativo] = useState(null);
    const [listaTipoArchivosProfesorNativo, setListaTipoArchivosProfesorNativo] = useState([]);
    const [listaTipoArchivosProfesorNativoAntiguos, setListaTipoArchivosProfesorNativoAntiguos] = useState([]);
    const [sexoProfesorNativoSeleccionado, setSexoProfesorNativoSeleccionado] = useState(null);
    const [centroProfesorNativo, setCentroProfesorNativo] = useState(null);
    const [tipoProfesorNativo, setTipoProfesorNativo] = useState(null);

    const [enfermedadesProfesorNativoSeleccionadas, setEnfermedadesProfesorNativoSeleccionadas] = useState([]);
    const [enfermedadesProfesorNativoSeleccionadasAntiguas, setEnfermedadesProfesorNativoSeleccionadasAntiguas] = useState([]);
    const [alergiasProfesorNativoSeleccionadas, setAlergiasProfesorNativoSeleccionadas] = useState([]);
    const [alergiasProfesorNativoSeleccionadasAntiguas, setAlergiasProfesorNativoSeleccionadasAntiguas] = useState([]);
    const [mascotasProfesorNativoSeleccionadas, setMascotasProfesorNativoSeleccionadas] = useState([]);
    const [mascotasProfesorNativoSeleccionadasAntiguas, setMascotasProfesorNativoSeleccionadasAntiguas] = useState([]);
    const [hobbiesProfesorNativoSeleccionados, setHobbiesProfesorNativoSeleccionados] = useState([]);
    const [hobbiesProfesorNativoSeleccionadosAntiguos, setHobbiesProfesorNativoSeleccionadosAntiguos] = useState([]);

    //Parametros alumno
    const [codigoPostalSeleccionadoAlumno, setCodigoPostalSeleccionadoAlumno] = useState(null);
    const [tipoDocumentoSeleccionadoAlumno, setTipoDocumentoSeleccionadoAlumno] = useState(null);
    const [comercialAlumnoSeleccionado, setComercialAlumnoSeleccionado] = useState(null);
    const [dietaAlumnoSeleccionada, setDietaAlumnoSeleccionada] = useState(null);
    const [tallaAlumnoSeleccionada, setTallaAlumnoSeleccionada] = useState(null);
    const [cursoActualAlumnoSeleccionado, setCursoActualAlumnoSeleccionado] = useState(null);
    const [cursoRealizarAlumnoSeleccionado, setCursoRealizarAlumnoSeleccionado] = useState(null);
    const [nivelIdiomaAlumnoSelecionado, setNivelIdiomaAlumnoSelecionado] = useState(null);
    const [tutoresAlumnoSeleccionados, setTutoresAlumnoSeleccionados] = useState([]);
    const [tutoresAntiguosAlumnoSeleccionados, setTutoresAntiguosAlumnoSeleccionados] = useState([]);
    const [companyerosAlumnoSeleccionados, setCompanyerosAlumnoSeleccionados] = useState([]);
    const [companyerosAntiguosAlumnoSeleccionados, setCompanyerosAntiguosAlumnoSeleccionados] = useState([]);
    const [listaTipoArchivosAlumno, setListaTipoArchivosAlumno] = useState([]);
    const [listaTipoArchivosAlumnoAntiguos, setListaTipoArchivosAlumnoAntiguos] = useState([]);
    const [sexoAlumnoSeleccionado, setSexoAlumnoSeleccionado] = useState(null);
    const [centroAlumno, setCentroAlumno] = useState(null);
    const [nivelesIdiomaAlumnoSeleccionados, setNivelesIdiomaAlumnoSeleccionados] = useState([]);
    const [nivelesIdiomaAlumnoSeleccionadosAntiguos, setNivelesIdiomaAlumnoSeleccionadosAntiguos] = useState([]);
    const [acompanyanteAlumnoSeleccionados, setAcompanyantesAlumnoSeleccionados] = useState([]);
    const [acompanyanteAntiguosAlumnoSeleccionados, setAcompanyantesAntiguosAlumnoSeleccionados] = useState([]);


    const [enfermedadesAlumnoSeleccionadas, setEnfermedadesAlumnoSeleccionadas] = useState([]);
    const [enfermedadesAlumnoSeleccionadasAntiguas, setEnfermedadesAlumnoSeleccionadasAntiguas] = useState([]);
    const [alergiasAlumnoSeleccionadas, setAlergiasAlumnoSeleccionadas] = useState([]);
    const [alergiasAlumnoSeleccionadasAntiguas, setAlergiasAlumnoSeleccionadasAntiguas] = useState([]);
    const [mascotasAlumnoSeleccionadas, setMascotasAlumnoSeleccionadas] = useState([]);
    const [mascotasAlumnoSeleccionadasAntiguas, setMascotasAlumnoSeleccionadasAntiguas] = useState([]);
    const [hobbiesAlumnoSeleccionados, setHobbiesAlumnoSeleccionados] = useState([]);
    const [hobbiesAlumnoSeleccionadosAntiguos, setHobbiesAlumnoSeleccionadosAntiguos] = useState([]);

    //Parametros familia acogida
    const [bonusSeleccionado, setBonusSeleccionado] = useState(null);
    const [listaTipoArchivosFamiliaAcogida, setListaTipoArchivosFamiliaAcogida] = useState([]);
    const [listaTipoArchivosFamiliaAcogidaAntiguos, setListaTipoArchivosFamiliaAcogidaAntiguos] = useState([]);

    const [enfermedadesFamiliaAcogidaSeleccionadas, setEnfermedadesFamiliaAcogidaSeleccionadas] = useState([]);
    const [enfermedadesFamiliaAcogidaSeleccionadasAntiguas, setEnfermedadesFamiliaAcogidaSeleccionadasAntiguas] = useState([]);
    const [alergiasFamiliaAcogidaSeleccionadas, setAlergiasFamiliaAcogidaSeleccionadas] = useState([]);
    const [alergiasFamiliaAcogidaSeleccionadasAntiguas, setAlergiasFamiliaAcogidaSeleccionadasAntiguas] = useState([]);
    const [mascotasFamiliaAcogidaSeleccionadas, setMascotasFamiliaAcogidaSeleccionadas] = useState([]);
    const [mascotasFamiliaAcogidaSeleccionadasAntiguas, setMascotasFamiliaAcogidaSeleccionadasAntiguas] = useState([]);
    const [hobbiesFamiliaAcogidaSeleccionados, setHobbiesFamiliaAcogidaSeleccionados] = useState([]);
    const [hobbiesFamiliaAcogidaSeleccionadosAntiguos, setHobbiesFamiliaAcogidaSeleccionadosAntiguos] = useState([]);

    //Parametros agente
    const [codigoPostalSeleccionadoAgente, setCodigoPostalSeleccionadoAgente] = useState(null);
    const [tipoDocumentoSeleccionadoAgente, setTipoDocumentoSeleccionadoAgente] = useState(null);
    const [listaTipoArchivosAgente, setListaTipoArchivosAgente] = useState([]);
    const [listaTipoArchivosAgenteAntiguos, setListaTipoArchivosAgenteAntiguos] = useState([]);
    const [sexoAgenteSeleccionado, setSexoAgenteSeleccionado] = useState(null);

    //Parametros Acompañante
    const [codigoPostalSeleccionadoAcompanyante, setCodigoPostalSeleccionadoAcompanyante] = useState(null);
    const [tipoDocumentoSeleccionadoAcompanyante, setTipoDocumentoSeleccionadoAcompanyante] = useState(null);
    const [listaTipoArchivosAcompanyante, setListaTipoArchivosAcompanyante] = useState([]);
    const [listaTipoArchivosAcompanyanteAntiguos, setListaTipoArchivosAcompanyanteAntiguos] = useState([]);
    const [sexoAcompanyanteSeleccionado, setSexoAcompanyanteSeleccionado] = useState(null);
    const [mostrarAlumnosAcompanyante, setMostrarAlumnosAcompanyante] = useState(false);

    // **** REGISTROS VACIOS **** //
    const emptyRegistroCentro = {
        id: 0,
        nombre: "",
        horario: "",
        persona_contacto: "",
        //email_persona_contacto: "",
        activoSn: "N",
    }
    const emptyTutor = {
        id: 0,
        nombre: "",
        apellido1: "",
        apellido2: "",
        documento: "",
        //telefono: "",
        direccion: "",
        sexo: "",
        fecha_nacimiento: "",
        movil: "",
        se_reparte_factura_sn: "N",
        activo_sn: "N",
    }
    const emptyProfesor = {
        id: 0,
        nombre: "",
        apellido1: "",
        apellido2: "",
        documento: "",
        direccion: "",
        sexo: "",
        fechaNacimiento: "",
        movil: "",
        //email: "",
        dietaEspecial: "",
        enfermedades: "",
        alergias: "",
        otros: "",
        comunicacion_comercial_sn: "N",
        activo_sn: "N",
        acepta_aviso_legal_sn: "N",
        razon_social: "",
        horas_mensuales: 0,
        competencias: "",
        coste: 0,
        //telefono: "",
    }

    const emptyAlumno = {
        id: 0,
        nombre: "",
        apellido1: "",
        apellido2: "",
        direccion: "",
        sexo: "",
        fecha_nacimiento: "",
        movil: "",
        otros: "",
        activo_sn: "N",
        medicamentos: "",
    }

    const emptyFamiliaAcogida = {
        id: 0,
        numero_estudiantes: 0,
        direccion: "",
        activo_sn: "N",
        coche_sn: "N",
        permite_alumnos_con_enfermedad_sn: "N",
        permite_alumnos_con_dieta_especial_sn: "N",
        fumador_sn: "N",
    }

    const emptyAgente = {
        id: 0,
        nombre: "",
        apellido1: "",
        apellido2: "",
        direccion: "",
        sexo: "",
        fecha_nacimiento: "",
        movil: "",
        otros: "",
        activo_sn: "N",
    }

    const emptyAcompanyante = {
        id: 0,
        nombre: "",
        apellido1: "",
        apellido2: "",
        documento: "",
        movil: "", // Este campo no está en tu INSERT
        direccion: "",
        sexo: "",
        fecha_nacimiento: "",
        movil: "",
        activo_sn: "N",
    };

    //Tipos
    const [centroEscolar, setCentroEscolar] = useState(emptyRegistroCentro);
    const [tutor, setTutor] = useState(emptyTutor);
    const [profesor, setProfesor] = useState(emptyProfesor);
    const [profesorNativo, setProfesorNativo] = useState(emptyProfesor);
    const [alumno, setAlumno] = useState(emptyAlumno);
    const [familiaAcogida, setFamiliaAcogida] = useState(emptyFamiliaAcogida);
    const [agente, setAgente] = useState(emptyAgente);
    const [acompanyante, setAcompanyante] = useState(emptyAcompanyante);


    const tipos = [
        { nombre: intl.formatMessage({ id: 'Profesor' }), id: 1 },
        { nombre: intl.formatMessage({ id: 'Familia acogida' }), id: 2 },
        { nombre: intl.formatMessage({ id: 'Profesor nativo' }), id: 3 },
        { nombre: intl.formatMessage({ id: 'Acompañante' }), id: 4 },
        { nombre: intl.formatMessage({ id: 'Tutor' }), id: 5 },
        { nombre: intl.formatMessage({ id: 'Agente' }), id: 6 },
        { nombre: intl.formatMessage({ id: 'Centro escolar' }), id: 7 },
        { nombre: intl.formatMessage({ id: 'Alumno' }), id: 8 },
    ]

    useEffect(() => {
        //
        //Lo marcamos aquí como saync ya que useEffect no permite ser async porque espera que la función que le pases devueva undefined o una función para limpiar el efecto. 
        //Una función async devuelve una promesa, lo cual no es compatible con el comportamiento esperado de useEffect.
        //
        const fetchData = async () => {
            //Obtenemos el permiso de cancelar del usuario
            setSePuedeCancelar(await tieneUsuarioPermiso('Nathalie', 'Usuarios', 'cancelar'))
            // Obtenemos todos los idiomas
            const registrosIdiomas = await getIdiomas();
            const jsonIdiomas = registrosIdiomas.map(idioma => ({
                nombre: idioma.nombre,
                id: idioma.id,
                activoSn: idioma.activoSn
            })).sort((a, b) => a.nombre.localeCompare(b.nombre));
            //Quitamos los registros inactivos y ordenamos
            const jsonIdiomasActivos = jsonIdiomas
                .filter(registro => registro.activoSn === 'S')
                .sort((a, b) => a.nombre.localeCompare(b.nombre));
            setListaIdiomas(jsonIdiomasActivos);

            // Obtenemos todos los niveles de idioma
            const registrosNivelIdiomas = await getNivelIdiomas();
            const jsonNivelIdiomas = registrosNivelIdiomas.map(nivelIdioma => ({
                nombre: nivelIdioma.nombre,
                id: nivelIdioma.id,
                activoSn: nivelIdioma.activoSn
            })).sort((a, b) => a.nombre.localeCompare(b.nombre));
            //Quitamos los registros inactivos y ordenamos
            const jsonNivelesIdiomasActivos = jsonNivelIdiomas
                .filter(registro => registro.activoSn === 'S')
                .sort((a, b) => a.nombre.localeCompare(b.nombre));
            setListaNivelesIdioma(jsonNivelesIdiomasActivos);

            // Obtenemos todos los bonus de familia acogida
            const registrosBonus = await getFamiliaAcogidaBonuses();
            const jsonBonus = registrosBonus.map(bonus => ({
                nombre: bonus.nombre,
                id: bonus.id,
            })).sort((a, b) => a.nombre.localeCompare(b.nombre));
            setListaBonus(jsonBonus);

            // Obtenemos todos los hobbies
            const registrosHobbies = await getHobbies();
            const jsonHobbies = registrosHobbies.map(registro => ({
                nombre: registro.nombre,
                id: registro.id,
                activoSn: registro.activoSn
            }));
            //Quitamos los registros inactivos y ordenamos
            const jsonHobbiesActivos = jsonHobbies
                .filter(registro => registro.activoSn === 'S')
                .map(({ activoSn, ...rest }) => rest)
                .sort((a, b) => a.nombre.localeCompare(b.nombre));
            setListaHobbies(jsonHobbiesActivos);

            // Obtenemos todos los tipos de profesor
            const registrosTiposProfesor = await getTiposProfesores();
            const jsonTiposProfesor = registrosTiposProfesor.map(registro => ({
                nombre: registro.nombre,
                id: registro.id
            }));
            //Quitamos el profesor que no es nativo y ordenamos
            const jsonTiposProfesorActivo = jsonTiposProfesor
                .filter(registro => registro.nombre !== 'Normal')
                .map(({ activoSn, ...rest }) => rest)
                .sort((a, b) => a.nombre.localeCompare(b.nombre));
            setListaTiposProfesor(jsonTiposProfesor.sort((a, b) => a.nombre.localeCompare(b.nombre)));
            setListaTiposProfesorNativo(jsonTiposProfesorActivo);

            // Obtenemos todos los comerciales
            const registrosComerciales = await getComerciales();
            const jsonComerciales = registrosComerciales.map(registro => ({
                nombre: registro.nombre,
                id: registro.id
            })).sort((a, b) => a.nombre.localeCompare(b.nombre));
            setListaComerciales(jsonComerciales);

            // Obtenemos todas las dietas
            const registrosDietas = await getDietas();
            const jsonDietas = registrosDietas.map(registro => ({
                nombre: registro.nombre,
                id: registro.id,
                activoSn: registro.activoSn
            }));
            //Quitamos los registros inactivos y ordenamos
            const jsonDietasActivas = jsonDietas
                .filter(registro => registro.activoSn === 'S')
                .map(({ activoSn, ...rest }) => rest)
                .sort((a, b) => a.nombre.localeCompare(b.nombre));
            setListaDietas(jsonDietasActivas);

            // Obtenemos todas las tallas
            const registrosTallas = await getTallas();
            const jsonTallas = registrosTallas.map(registro => ({
                nombre: registro.nombre,
                id: registro.id,
                activoSn: registro.activoSn
            }));
            setListaTallas(jsonTallas);

            // Obtenemos todas las enfermedades
            const registrosEnfermedades = await getEnfermedades();
            const jsonEnfermedades = registrosEnfermedades.map(registro => ({
                nombre: registro.nombre,
                id: registro.id,
                activoSn: registro.activoSn
            }));
            //Quitamos los registros inactivos y ordenamos
            const jsonEnfermedadesActivas = jsonEnfermedades
                .filter(registro => registro.activoSn === 'S')
                .map(({ activoSn, ...rest }) => rest)
                .sort((a, b) => a.nombre.localeCompare(b.nombre));
            setListaEnfermedades(jsonEnfermedadesActivas);

            // Obtenemos todas las alergias
            const registrosAlergias = await getAlergias();
            const jsonAlergias = registrosAlergias.map(registro => ({
                nombre: registro.nombre,
                id: registro.id,
                activoSn: registro.activoSn
            }));
            //Quitamos los registros inactivos y ordenamos
            const jsonAlergiasActivas = jsonAlergias
                .filter(registro => registro.activoSn === 'S')
                .map(({ activoSn, ...rest }) => rest)
                .sort((a, b) => a.nombre.localeCompare(b.nombre));
            setListaAlergias(jsonAlergiasActivas);

            // Obtenemos todas las mascotas
            const registrosMascotas = await getMascotas();
            const jsonMascotas = registrosMascotas.map(registro => ({
                nombre: registro.nombre,
                id: registro.id,
                activoSn: registro.activoSn
            }));
            //Quitamos los registros inactivos y ordenamos
            const jsonMascotasActivas = jsonMascotas
                .filter(registro => registro.activoSn === 'S')
                .map(({ activoSn, ...rest }) => rest)
                .sort((a, b) => a.nombre.localeCompare(b.nombre));
            setListaMascotas(jsonMascotasActivas);

            // Obtenemos todas las empresas
            const registrosEmpresas = await getEmpresas();
            const jsonEmpresas = registrosEmpresas.map(empresa => ({
                nombre: empresa.nombre,
                id: empresa.id,
                activoSn: empresa.activoSn
            }));
            //Quitamos los registros inactivos y ordenamos
            const jsonEmpresasActivas = jsonEmpresas
                .filter(registro => registro.activoSn === 'S')
                .sort((a, b) => a.nombre.localeCompare(b.nombre));
            setListaEmpresas(jsonEmpresasActivas);

            // Obtenemos todos los roles
            const registrosRoles = await getRol();
            const jsonRoles = registrosRoles.map(rol => ({
                nombre: rol.nombre,
                id: rol.id,
                activoSn: rol.activoSn
            }));
            //Quitamos los registros inactivos y ordenamos
            const jsonRolesActivos = jsonRoles
                .filter(registro => registro.activoSn === 'S')
                .sort((a, b) => a.nombre.localeCompare(b.nombre));
            setListaRoles(jsonRolesActivos);

            //Si el rol ha sido preseleccionado, se selecciona
            const localRol = localStorage.getItem('rol');
            if (localRol) {
                const registroRol = jsonRoles.find((element) => element.nombre === localRol).nombre;
                setRolSeleccionado(registroRol);
            }
            else if (rol) {
                const registroRol = jsonRoles.find((element) => element.nombre === rol).nombre;
                setRolSeleccionado(registroRol);
            }
            const localTipo = localStorage.getItem('tipo');
            if (localTipo) {
                // Obtenemos el tipo de usuario
                const tipoRegistro = tipos.find((element) => element.nombre === intl.formatMessage({ id: localTipo }));
                setTiposSeleccionados([tipoRegistro]);
            }
            else if (tipo) {
                // Obtenemos el tipo de usuario
                const tipoRegistro = tipos.find((element) => element.nombre === intl.formatMessage({ id: tipo }));
                setTiposSeleccionados([tipoRegistro]);
                if (idEditar > 0) {
                    setTiposSeleccionadosAntiguo([tipoRegistro]);
                }

            }

            //Obtenemos todos los tutores
            const registrosTutores = await getTutores();
            const jsonTutores = registrosTutores.map(tutor => ({
                nombre: tutor.nombre,
                id: tutor.id,
            })).sort((a, b) => a.nombre.localeCompare(b.nombre));
            setListaTutores(jsonTutores);

            //Obtenemos todos los acompañantes
            const registrosAcompanyantes = await getAcompanyantes();
            const jsonAcompanyantes = registrosAcompanyantes.map(acompanyante => ({
                nombre: acompanyante.nombre+' '+acompanyante.apellido1+' '+acompanyante.apellido2,
                id: acompanyante.id,
            })).sort((a, b) => a.nombre.localeCompare(b.nombre));
            setListaAcompanyantes(jsonAcompanyantes);

            //Obtenemos todos los usuarios
            const registrosUsuarios = await getAlumnos();
            const jsonAlumnos = registrosUsuarios.map(usuario => ({
                nombre: `${usuario?.nombre} ${usuario?.apellido1} ${usuario?.apellido2}` || "",
                id: usuario.id,
                activoSn: usuario.activo_sn
            }));
            //Quitamos el alumno que es el usuario que se está editando si existe
            const jsonAlumnosActivosFiltrados = jsonAlumnos.filter(usuario => usuario.usuarioId !== idEditar);
            //Quitamos los registros inactivos y ordenamos
            const jsonAlumnosActivos = jsonAlumnosActivosFiltrados
                .filter(registro => registro.activoSn === 'S')
                .map(({ activoSn, ...rest }) => rest)
                .sort((a, b) => a.nombre.localeCompare(b.nombre));
            setListaCompanyeros(jsonAlumnosActivos);

            //Obtenemos todos los agentes
            const registrosAgentes = await getAgentes();
            const jsonAgentes = registrosAgentes.map(usuario => ({
                nombre: usuario.nombre,
                id: usuario.id,
                activoSn: usuario.activo_sn
            }));

            //Quitamos los registros inactivos y ordenamos
            const jsonAgentesActivos = jsonAgentes
                .filter(registro => registro.activoSn === 'S')
                .map(({ activoSn, ...rest }) => rest)
                .sort((a, b) => a.nombre.localeCompare(b.nombre));
            setListaAgentes(jsonAgentesActivos);

            //Obtenemos todos los cursos
            const registrosCursos = await getCursos();
            const jsonCursos = registrosCursos.map(curso => ({
                nombre: curso.nombre,
                id: curso.id,
                activoSn: curso.activoSn
            }));

            //Quitamos los registros inactivos y ordenamos
            const jsonCursosActivos = jsonCursos
                .filter(registro => registro.activoSn === 'S')
                .map(({ activoSn, ...rest }) => rest)
                .sort((a, b) => a.nombre.localeCompare(b.nombre));
            setListaCursos(jsonCursosActivos);

            // Obtenemos todos los tipos de iva
            const hoy = new Date();
            const ivaFiltro = JSON.stringify({
                where: {
                    and: {
                        fechaFin: { gt: hoy.toISOString() }
                    }
                }
            })
            const registroIvas = await getVistaTipoIvaPais(ivaFiltro);
            const jsonIvas = registroIvas.map(iva => ({
                nombre: iva.nombrePais,
                id: iva.id
            })).sort((a, b) => a.nombre.localeCompare(b.nombre));
            setListaTiposIva(jsonIvas);

            // Obtenemos los centros escolares
            const registrosCentrosEscolares = await getCentrosEscolares();
            const jsonCentrosEscolares = registrosCentrosEscolares.map(centro => ({
                nombre: centro.nombre,
                id: centro.id,
                activoSn: centro.activo_sn
            }));
            //Quitamos los registros inactivos y ordenamos
            const jsonCentrosEscolaresActivos = jsonCentrosEscolares
                .filter(registro => registro.activoSn === 'S')
                .sort((a, b) => a.nombre.localeCompare(b.nombre));
            setListaCentros(jsonCentrosEscolaresActivos);

            // Obtenemos todos los tipos de documento
            const registrosTiposDocumento = await getVistaTipoDocumentoEmpresa();
            const jsonTipoDocumento = registrosTiposDocumento.map(tipoDocumento => ({
                nombre: tipoDocumento.nombre,
                id: tipoDocumento.id,
                activoSn: tipoDocumento.activoSn
            }));

            //Quitamos los registros inactivos y ordenamos
            const jsonTipoDocumentoActivos = jsonTipoDocumento
                .filter(registro => registro.activoSn === 'S')
                .sort((a, b) => a.nombre.localeCompare(b.nombre));
            setListaTiposDocumentosActivos(jsonTipoDocumentoActivos);
            setListaTiposDocumentos(jsonTipoDocumento);

            // Si el idEditar es diferente de nuevo, entonces se va a editar
            if (idEditar !== 0 && rowData !== 0) {
                //Si usuarioId esta declarado significa que estamos accediendo a la pantalla desde otro crud, por ejemplo centros escolares, por lo que
                // el id de editar si tiene que cambiar para que se vea el del usuario y no el del registro del crud

                // Obtenemos el registro a editar
                let registro = rowData.find((element) => element.id === idEditarDerivado);
                //Es posible que accedamos a un usuario a traves del url, lo que significa que muy posiblemente no este dentro del rowData,
                // por lo que hay que llamar a la bbdd
                if (!registro) {
                    const filtroUsuario = JSON.stringify({
                        where: {
                            and: {
                                id: idEditarDerivado
                            }
                        }
                    })
                    let registro = await getVistaUsuarios(filtroUsuario);
                    registro = registro[0]
                }
                if (crudDerivado) {
                    const filtroUsuarioDerivado = JSON.stringify({
                        where: {
                            and: {
                                id: registro.usuario_id
                            }
                        }
                    })
                    registro = await getVistaUsuarios(filtroUsuarioDerivado);
                    registro = registro[0]
                    await obtenerArchivosSeccion(registro, 'Usuario')
                }

                //Modificamos el idEditar
                idEditar = registro.id;
                setIdEditar(idEditar);

                setUsuario(registro);
                // Obtenemos los tipos de usuario
                if (!tipo) {
                    const tiposFiltros = {
                        where: {
                            usuarioId: registro.id
                        }
                    }
                    const registrosTipos = await getUsuarioTiposUsuario(JSON.stringify(tiposFiltros));
                    const jsonTipos = registrosTipos.map(tipo => ({
                        nombre: intl.formatMessage({ id: tipo.nombre }),
                        id: tipo.id,
                    }));
                    setTiposSeleccionados(jsonTipos);
                    setTiposSeleccionadosAntiguo(registrosTipos);

                }

                //Guardamos los archivos para luego poder compararlos
                const _listaArchivosAntiguos = {}
                for (const tipoArchivo of listaTipoArchivos) {
                    _listaArchivosAntiguos[tipoArchivo['nombre']] = registro[(tipoArchivo.nombre).toLowerCase()]
                }
                setListaTipoArchivosAntiguos(_listaArchivosAntiguos);

                // Obtenemos el nombre de la empresa
                //const registroEmpresa = registrosEmpresas.find((element) => element.id === registro.empresaId).nombre;
                //setEmpresaSeleccionada(registroEmpresa);
                // Obtenemos el nombre del tipo de iva
                const iva = await getVistaTipoIvaPais(JSON.stringify({ where: { id: registro.tipo_iva_id } }));

                const registroIva = registroIvas.find((element) => element.nombrePais === iva[0].nombrePais).nombrePais;
                setTipoIvaSeleccionado(registroIva);
                // Obtenemos el nombre del idioma seleccionado
                const registroIdioma = registrosIdiomas.find((element) => element.id === registro.idiomaId).nombre;
                setIdiomaSeleccionado(registroIdioma);
                // Obtenemos el nombre del rol
                const registroRol = registrosRoles.find((element) => element.id === registro.rolId).nombre;
                setRolSeleccionado(registroRol);
                const filtro = JSON.stringify({
                    where: {
                        and: {
                            usuario_id: idEditar
                        }
                    }
                });
                // Obtenemos el centro escolar
                const registroCentroEscolar = registrosCentrosEscolares.find((element) => element.usuario_id === idEditar);
                if (registroCentroEscolar) {

                    setCentroEscolar(registroCentroEscolar);
                }
                // Obtenemos el tutor
                const registroTutor = await getTutores(filtro);
                if (registroTutor.length > 0) {
                    setMostrarHijosTutor(true);
                    //Formatea la fecha 
                    if (registroTutor[0].fecha_nacimiento) {
                        registroTutor[0].fecha_nacimiento = new Date(registroTutor[0].fecha_nacimiento)
                    }
                    //Obtiene el sexo
                    const sexoTutor = (sexos.find(cod => cod.valor === registroTutor[0].sexo));
                    if (sexoTutor) {
                        setSexoTutorSeleccionado(sexoTutor.nombre)
                    }
                    setTutor(registroTutor[0]);
                    // Obtenemos el nombre del codigo postal
                    const registroCodigoPostal = await getCodigoPostal(registroTutor[0].codigo_postal_id);
                    const codigoPostalJson = { value: registroCodigoPostal.id, label: registroCodigoPostal.nombre };
                    setCodigoPostalSeleccionadoTutor(codigoPostalJson);

                    // Obtenemos el nombre del tipo de documento
                    const registroTipoDocumento = registrosTiposDocumento.find((element) => element.id === registroTutor[0].tipo_documento_id);
                    if (registroTipoDocumento) {
                        setTipoDocumentoSeleccionado(registroTipoDocumento.nombre);
                    }

                    // Obtenemos el nombre del agente
                    const registroAgente = registrosAgentes.find((element) => element.id === registroTutor[0].agente_id);
                    if (registroAgente) {
                        setAgenteSeleccionado(registroAgente.nombre);
                    }


                    // Obtenemos los tipos de archivo de tutor
                    const listaTipoArchivoTutor = await obtenerArchivosSeccion(registroTutor[0], 'Tutor')
                    setListaTipoArchivosTutor(listaTipoArchivoTutor);
                    //Guardamos los archivos para luego poder compararlos
                    const _listaArchivosAntiguos = {}
                    for (const tipoArchivo of listaTipoArchivoTutor) {
                        _listaArchivosAntiguos[tipoArchivo['nombre']] = registroTutor[0][(tipoArchivo.nombre).toLowerCase()]
                    }
                    setListaTipoArchivosTutorAntiguos(_listaArchivosAntiguos);

                    //Obtenemos las enfermedades del tutor
                    const filtroEnfermedades = JSON.stringify({
                        where: {
                            tutorId: registroTutor[0].id
                        }
                    });
                    const registroEnfermedadesTutor = await getTutorEnfermedades(filtroEnfermedades);
                    const jsonEnfermedadesTutor = registroEnfermedadesTutor.map(enfermedad => {
                        const enfermedadCompleta = jsonEnfermedades.find(e => e.id === enfermedad.enfermedadId);
                        return {
                            nombre: enfermedadCompleta?.nombre || "",
                            id: enfermedadCompleta.id
                        };
                    });
                    setEnfermedadesTutorSeleccionadas(jsonEnfermedadesTutor);
                    setEnfermedadesTutorSeleccionadasAntiguas(jsonEnfermedadesTutor);
                    //Obtenemos las alergias del tutor
                    const registroAlergiasTutor = await getTutorAlergias(filtroEnfermedades);
                    const jsonAlergiasTutor = registroAlergiasTutor.map(registro => {
                        const registroCompleto = jsonAlergias.find(e => e.id === registro.alergiaId);
                        return {
                            nombre: registroCompleto?.nombre || "",
                            id: registroCompleto.id
                        };
                    });
                    setAlergiasTutorSeleccionadas(jsonAlergiasTutor);
                    setAlergiasTutorSeleccionadasAntiguas(jsonAlergiasTutor);
                    //Obtenemos las mascotas del tutor
                    const registroMascotasTutor = await getTutorMascotas(filtroEnfermedades);
                    const jsonMascotasTutor = registroMascotasTutor.map(registro => {
                        const registroCompleto = jsonMascotas.find(e => e.id === registro.mascotaId);
                        return {
                            nombre: registroCompleto?.nombre || "",
                            id: registroCompleto.id
                        };
                    });
                    setMascotasTutorSeleccionadas(jsonMascotasTutor);
                    setMascotasTutorSeleccionadasAntiguas(jsonMascotasTutor);
                    //Obtenemos los hobbies del tutor
                    const registroHobbiesTutor = await getTutorHobbies(filtroEnfermedades);
                    const jsonHobbiesTutor = registroHobbiesTutor.map(registro => {
                        const registroCompleto = jsonHobbies.find(e => e.id === registro.hobbieId);
                        return {
                            nombre: registroCompleto?.nombre || "",
                            id: registroCompleto.id
                        };
                    });
                    setHobbiesTutorSeleccionados(jsonHobbiesTutor);
                    setHobbiesTutorSeleccionadosAntiguos(jsonHobbiesTutor);

                }
                const filtroProfesor = JSON.stringify({
                    where: {
                        and: {
                            usuario_id: idEditar,
                            tipo_profesor_id: 1
                        }
                    }
                });
                //Obtenemos el profesor
                const registroProfesor = await getProfesores(filtroProfesor);
                if (registroProfesor.length > 0) {
                    //Formatea la fecha 
                    if (registroProfesor[0].fechaNacimiento) {
                        registroProfesor[0].fechaNacimiento = new Date(registroProfesor[0].fechaNacimiento)
                    }
                    //Obtiene el sexo
                    const sexoProfesor = (sexos.find(cod => cod.valor === registroProfesor[0].sexo));
                    if (sexoProfesor) {
                        setSexoProfesorSeleccionado(sexoProfesor.nombre)
                    }
                    setProfesor(registroProfesor[0]);
                    // Obtenemos el nombre del codigo postal
                    const registroCodigoPostal = await getCodigoPostal(registroProfesor[0].codigo_postal_id);
                    const codigoPostalJson = { value: registroCodigoPostal.id, label: registroCodigoPostal.nombre };
                    setCodigoPostalSeleccionadoProfesor(codigoPostalJson);

                    // Obtenemos el nombre del tipo de documento
                    const registroTipoDocumento = registrosTiposDocumento.find((element) => element.id === registroProfesor[0].tipo_documento_id);
                    if (registroTipoDocumento) {
                        setTipoDocumentoSeleccionadoProfesor(registroTipoDocumento.nombre);
                    }

                    // Obtiene el centro escolar
                    const registroCentroEscolar = jsonCentrosEscolares.find((element) => element.id === registroProfesor[0].centro_escolar_id);
                    if (registroCentroEscolar) {
                        setCentroProfesor(registroCentroEscolar.nombre);
                    }

                    // Obtenemos los tipos de archivo de profesor
                    const listaTipoArchivoTutor = await obtenerArchivosSeccion(registroProfesor[0], 'Profesor')
                    setListaTipoArchivosProfesor(listaTipoArchivoTutor);
                    //Guardamos los archivos para luego poder compararlos
                    const _listaArchivosAntiguos = {}
                    for (const tipoArchivo of listaTipoArchivoTutor) {
                        _listaArchivosAntiguos[tipoArchivo['nombre']] = registroProfesor[0][(tipoArchivo.nombre).toLowerCase()]
                    }
                    setListaTipoArchivosProfesorAntiguos(_listaArchivosAntiguos);

                    //Obtenemos las enfermedades del tutor
                    const filtroEnfermedades = JSON.stringify({
                        where: {
                            profesorId: registroProfesor[0].id
                        }
                    });
                    const registroEnfermedadesProfesor = await getProfesorEnfermedades(filtroEnfermedades);
                    const jsonEnfermedadesProfesor = registroEnfermedadesProfesor.map(enfermedad => {
                        const enfermedadCompleta = jsonEnfermedades.find(e => e.id === enfermedad.enfermedadId);
                        return {
                            nombre: enfermedadCompleta?.nombre || "",
                            id: enfermedadCompleta.id
                        };
                    });
                    setEnfermedadesProfesorSeleccionadas(jsonEnfermedadesProfesor);
                    setEnfermedadesProfesorSeleccionadasAntiguas(jsonEnfermedadesProfesor);
                    //Obtenemos las alergias del profesor
                    const registroAlergiasProfesor = await getProfesorAlergias(filtroEnfermedades);
                    const jsonAlergiasProfesor = registroAlergiasProfesor.map(registro => {
                        const registroCompleto = jsonAlergias.find(e => e.id === registro.alergiaId);
                        return {
                            nombre: registroCompleto?.nombre || "",
                            id: registroCompleto.id
                        };
                    });
                    setAlergiasProfesorSeleccionadas(jsonAlergiasProfesor);
                    setAlergiasProfesorSeleccionadasAntiguas(jsonAlergiasProfesor);
                    //Obtenemos las mascotas del profesor
                    const registroMascotasProfesor = await getProfesorMascotas(filtroEnfermedades);
                    const jsonMascotasProfesor = registroMascotasProfesor.map(registro => {
                        const registroCompleto = jsonMascotas.find(e => e.id === registro.mascotaId);
                        return {
                            nombre: registroCompleto?.nombre || "",
                            id: registroCompleto.id
                        };
                    });
                    setMascotasProfesorSeleccionadas(jsonMascotasProfesor);
                    setMascotasProfesorSeleccionadasAntiguas(jsonMascotasProfesor);
                    //Obtenemos los hobbies del profesor
                    const registroHobbiesProfesor = await getProfesorHobbies(filtroEnfermedades);
                    const jsonHobbiesProfesor = registroHobbiesProfesor.map(registro => {
                        const registroCompleto = jsonHobbies.find(e => e.id === registro.hobbieId);
                        return {
                            nombre: registroCompleto?.nombre || "",
                            id: registroCompleto.id
                        };
                    });
                    setHobbiesProfesorSeleccionados(jsonHobbiesProfesor);
                    setHobbiesProfesorSeleccionadosAntiguos(jsonHobbiesProfesor);

                }

                const filtroProfesorNativo = JSON.stringify({
                    where: {
                        and: {
                            usuario_id: idEditar,
                        }
                    }
                });
                //Obtenemos el profesor nativo
                let registroProfesorNativo = await getProfesores(filtroProfesorNativo);
                registroProfesorNativo = registroProfesorNativo.filter(profesor => profesor.tipo_profesor_id !== 1);

                if (registroProfesorNativo.length > 0) {
                    //Formatea la fecha 
                    if (registroProfesorNativo[0].fechaNacimiento) {
                        registroProfesorNativo[0].fechaNacimiento = new Date(registroProfesorNativo[0].fechaNacimiento)
                    }
                    //Obtiene el sexo
                    const sexoProfesorNativo = (sexos.find(cod => cod.valor === registroProfesorNativo[0].sexo));
                    if (sexoProfesorNativo) {
                        setSexoProfesorNativoSeleccionado(sexoProfesorNativo.nombre)
                    }
                    setProfesorNativo(registroProfesorNativo[0]);
                    // Obtenemos el nombre del codigo postal
                    const registroCodigoPostal = await getCodigoPostal(registroProfesorNativo[0].codigo_postal_id);
                    const codigoPostalJson = { value: registroCodigoPostal.id, label: registroCodigoPostal.nombre };
                    setCodigoPostalSeleccionadoProfesorNativo(codigoPostalJson);

                    // Obtenemos el nombre del tipo de documento
                    const registroTipoDocumento = registrosTiposDocumento.find((element) => element.id === registroProfesorNativo[0].tipo_documento_id);
                    if (registroTipoDocumento) {
                        setTipoDocumentoSeleccionadoProfesorNativo(registroTipoDocumento.nombre);
                    }

                    // Obtenemos el nombre del tipo de documento
                    const registroTipoProfesorNativo = registrosTiposProfesor.find((element) => element.id === registroProfesorNativo[0].tipo_profesor_id);
                    if (registroTipoProfesorNativo) {
                        setTipoProfesorNativo(registroTipoProfesorNativo.nombre);
                    }

                    // Obtiene el centro escolar
                    const registroCentroEscolar = jsonCentrosEscolares.find((element) => element.id === registroProfesorNativo[0].centro_escolar_id);
                    if (registroCentroEscolar) {
                        setCentroProfesorNativo(registroCentroEscolar.nombre);
                    }

                    // Obtenemos los tipos de archivo de profesor nativo
                    const listaTipoArchivoTutor = await obtenerArchivosSeccion(registroProfesorNativo[0], 'Profesor nativo')
                    setListaTipoArchivosProfesorNativo(listaTipoArchivoTutor);
                    //Guardamos los archivos para luego poder compararlos
                    const _listaArchivosAntiguos = {}
                    for (const tipoArchivo of listaTipoArchivoTutor) {
                        _listaArchivosAntiguos[tipoArchivo['nombre']] = registroProfesorNativo[0][(tipoArchivo.nombre).toLowerCase()]
                    }
                    setListaTipoArchivosProfesorNativoAntiguos(_listaArchivosAntiguos);

                    //Obtenemos las enfermedades del profesor nativo
                    const filtroEnfermedades = JSON.stringify({
                        where: {
                            profesorId: registroProfesorNativo[0].id
                        }
                    });
                    const registroEnfermedadesProfesorNativo = await getProfesorEnfermedades(filtroEnfermedades);
                    const jsonEnfermedadesProfesorNativo = registroEnfermedadesProfesorNativo.map(enfermedad => {
                        const enfermedadCompleta = jsonEnfermedades.find(e => e.id === enfermedad.enfermedadId);
                        return {
                            nombre: enfermedadCompleta?.nombre || "",
                            id: enfermedadCompleta.id
                        };
                    });
                    setEnfermedadesProfesorNativoSeleccionadas(jsonEnfermedadesProfesorNativo);
                    setEnfermedadesProfesorNativoSeleccionadasAntiguas(jsonEnfermedadesProfesorNativo);
                    //Obtenemos las alergias del profesor nativo
                    const registroAlergiasProfesorNativo = await getProfesorAlergias(filtroEnfermedades);
                    const jsonAlergiasProfesorNativo = registroAlergiasProfesorNativo.map(registro => {
                        const registroCompleto = jsonAlergias.find(e => e.id === registro.alergiaId);
                        return {
                            nombre: registroCompleto?.nombre || "",
                            id: registroCompleto.id
                        };
                    });
                    setAlergiasProfesorNativoSeleccionadas(jsonAlergiasProfesorNativo);
                    setAlergiasProfesorNativoSeleccionadasAntiguas(jsonAlergiasProfesorNativo);
                    //Obtenemos las mascotas del profesor nativo
                    const registroMascotasProfesorNativo = await getProfesorMascotas(filtroEnfermedades);
                    const jsonMascotasProfesorNativo = registroMascotasProfesorNativo.map(registro => {
                        const registroCompleto = jsonMascotas.find(e => e.id === registro.mascotaId);
                        return {
                            nombre: registroCompleto?.nombre || "",
                            id: registroCompleto.id
                        };
                    });
                    setMascotasProfesorNativoSeleccionadas(jsonMascotasProfesorNativo);
                    setMascotasProfesorNativoSeleccionadasAntiguas(jsonMascotasProfesorNativo);
                    //Obtenemos los hobbies del profesor nativo
                    const registroHobbiesProfesorNativo = await getProfesorHobbies(filtroEnfermedades);
                    const jsonHobbiesProfesorNativo = registroHobbiesProfesorNativo.map(registro => {
                        const registroCompleto = jsonHobbies.find(e => e.id === registro.hobbieId);
                        return {
                            nombre: registroCompleto?.nombre || "",
                            id: registroCompleto.id
                        };
                    });
                    setHobbiesProfesorNativoSeleccionados(jsonHobbiesProfesorNativo);
                    setHobbiesProfesorNativoSeleccionadosAntiguos(jsonHobbiesProfesorNativo);

                }

                //Obtenemos el alumno
                const registroAlumno = await getAlumnos(filtro);
                if (registroAlumno.length > 0) {
                    //Formatea la fecha 
                    if (registroAlumno[0].fecha_nacimiento) {
                        registroAlumno[0].fecha_nacimiento = new Date(registroAlumno[0].fecha_nacimiento)
                    }
                    //Obtiene el sexo
                    const sexoAlumno = (sexos.find(cod => cod.valor === registroAlumno[0].sexo));
                    if (sexoAlumno) {
                        setSexoAlumnoSeleccionado(sexoAlumno.nombre)
                    }
                    setAlumno(registroAlumno[0]);
                    // Obtenemos el nombre del codigo postal
                    if (registroAlumno[0].codigo_postal) {
                        const registroCodigoPostal = await getCodigoPostal(registroAlumno[0].codigo_postal);
                        const codigoPostalJson = { value: registroCodigoPostal.id, label: registroCodigoPostal.nombre };
                        setCodigoPostalSeleccionadoAlumno(codigoPostalJson);
                    }


                    // Obtenemos el nombre del tipo de documento
                    const registroTipoDocumento = registrosTiposDocumento.find((element) => element.id === registroAlumno[0].tipo_documento_id);
                    if (registroTipoDocumento) {
                        setTipoDocumentoSeleccionadoAlumno(registroTipoDocumento.nombre);
                    }

                    // Obtenemos el nombre del comercial
                    const registroComercial = registrosComerciales.find((element) => element.id === registroAlumno[0].comercial_id);
                    if (registroComercial) {
                        setComercialAlumnoSeleccionado(registroComercial.nombre);
                    }

                    // Obtenemos el nombre de la dieta
                    const registroDieta = jsonDietasActivas.find((element) => element.id === registroAlumno[0].dieta_id);
                    if (registroDieta) {
                        setDietaAlumnoSeleccionada(registroDieta.nombre);
                    }

                    // Obtenemos el nombre de la talla
                    const registroTalla = jsonTallas.find((element) => element.id === registroAlumno[0].talla_id);
                    if (registroTalla) {
                        setTallaAlumnoSeleccionada(registroTalla.nombre);
                    }

                    // Obtenemos el nombre del curso actual
                    const registroCursoActual = registrosCursos.find((element) => element.id === registroAlumno[0].curso_actual_id);
                    if (registroCursoActual) {
                        setCursoActualAlumnoSeleccionado(registroCursoActual.nombre);
                    }

                    // Obtenemos el nombre del curso a realizar
                    const registroCursoRealizar = registrosCursos.find((element) => element.id === registroAlumno[0].curso_realizar_id);
                    if (registroCursoRealizar) {
                        setCursoRealizarAlumnoSeleccionado(registroCursoRealizar.nombre);
                    }

                    // Obtenemos el nombre del nivel de idioma
                    const registroNivelIdioma = registrosNivelIdiomas.find((element) => element.id === registroAlumno[0].nivel_idioma_id);
                    if (registroNivelIdioma) {
                        setNivelIdiomaAlumnoSelecionado(registroNivelIdioma.nombre);
                    }

                    //Obtenemos los compañeros del alumno
                    const filtroCompanyeros = JSON.stringify({
                        where: {
                            alumnoId: registroAlumno[0].id
                        }
                    });
                    const registroCompanyerosAlumno = await getAlumnoCompanyeros(filtroCompanyeros);
                    const jsonCompanyerosAlumno = registroCompanyerosAlumno.map(companyero => {
                        const companyeroCompleto = jsonAlumnos.find(e => e.id === companyero.companyeroId);
                        return {
                            nombre: companyeroCompleto?.nombre || "",
                            id: companyeroCompleto.id
                        };
                    });
                    setCompanyerosAlumnoSeleccionados(jsonCompanyerosAlumno);
                    setCompanyerosAntiguosAlumnoSeleccionados(jsonCompanyerosAlumno);


                    //Obtenemos los tutores del alumno
                    const filtroTutores = JSON.stringify({
                        where: {
                            alumnoId: registroAlumno[0].id
                        }
                    });
                    const registroTutoresAlumno = await getAlumnoTutores(filtroTutores);
                    const jsonTutoresAlumno = registroTutoresAlumno.map(tutor => {
                        const tutorCompleto = jsonTutores.find(e => e.id === tutor.tutorId);
                        return {
                            nombre: tutorCompleto?.nombre || "",
                            id: tutorCompleto.id
                        };
                    });
                    setTutoresAlumnoSeleccionados(jsonTutoresAlumno);
                    setTutoresAntiguosAlumnoSeleccionados(jsonTutoresAlumno);

                    //Obtenemos los acompanyantes del alumno
                    const filtroAcompanyantes = JSON.stringify({
                        where: {
                            alumnoId: registroAlumno[0].id
                        }
                    });
                    const registroAcompanyanteAlumno = await getAlumnoAcompanyantes(filtroAcompanyantes);
                    const jsonAcompanyantesAlumno = registroAcompanyanteAlumno.map(acompanyante => {
                        const acompanyanteCompleto = jsonAcompanyantes.find(e => e.id === acompanyante.acompanyanteId);
                        return {
                            nombre: acompanyanteCompleto?.nombre || "",
                            id: acompanyanteCompleto.id
                        };
                    });
                    setAcompanyantesAlumnoSeleccionados(jsonAcompanyantesAlumno);
                    setAcompanyantesAntiguosAlumnoSeleccionados(jsonAcompanyantesAlumno);

                    // Obtiene el centro escolar
                    const registroCentroEscolar = jsonCentrosEscolares.find((element) => element.id === registroAlumno[0].centro_escolar_id);
                    if (registroCentroEscolar) {
                        setCentroAlumno(registroCentroEscolar.nombre);
                    }

                    // Obtenemos los tipos de archivo de alumno
                    const listaTipoArchivoAlumno = await obtenerArchivosSeccion(registroAlumno[0], 'Alumno')
                    setListaTipoArchivosAlumno(listaTipoArchivoAlumno);
                    //Guardamos los archivos para luego poder compararlos
                    const _listaArchivosAntiguos = {}
                    for (const tipoArchivo of listaTipoArchivoAlumno) {
                        _listaArchivosAntiguos[tipoArchivo['nombre']] = registroAlumno[0][(tipoArchivo.nombre).toLowerCase()]
                    }
                    setListaTipoArchivosAlumnoAntiguos(_listaArchivosAntiguos);

                    //Obtenemos las enfermedades del alumno
                    const filtroEnfermedades = JSON.stringify({
                        where: {
                            alumnoId: registroAlumno[0].id
                        }
                    });
                    const registroEnfermedadesAlumno = await getAlumnoEnfermedades(filtroEnfermedades);
                    const jsonEnfermedadesAlumno = registroEnfermedadesAlumno.map(enfermedad => {
                        const enfermedadCompleta = jsonEnfermedades.find(e => e.id === enfermedad.enfermedadId);
                        return {
                            nombre: enfermedadCompleta?.nombre || "",
                            id: enfermedadCompleta.id
                        };
                    });
                    setEnfermedadesAlumnoSeleccionadas(jsonEnfermedadesAlumno);
                    setEnfermedadesAlumnoSeleccionadasAntiguas(jsonEnfermedadesAlumno);
                    //Obtenemos las alergias del alumno
                    const registroAlergiasAlumno = await getAlumnoAlergias(filtroEnfermedades);
                    const jsonAlergiasAlumno = registroAlergiasAlumno.map(registro => {
                        const registroCompleto = jsonAlergias.find(e => e.id === registro.alergiaId);
                        return {
                            nombre: registroCompleto?.nombre || "",
                            id: registroCompleto.id
                        };
                    });
                    setAlergiasAlumnoSeleccionadas(jsonAlergiasAlumno);
                    setAlergiasAlumnoSeleccionadasAntiguas(jsonAlergiasAlumno);
                    //Obtenemos las mascotas del alumno
                    const registroMascotasAlumno = await getAlumnoMascotas(filtroEnfermedades);
                    const jsonMascotasAlumno = registroMascotasAlumno.map(registro => {
                        const registroCompleto = jsonMascotas.find(e => e.id === registro.mascotaId);
                        return {
                            nombre: registroCompleto?.nombre || "",
                            id: registroCompleto.id
                        };
                    });
                    setMascotasAlumnoSeleccionadas(jsonMascotasAlumno);
                    setMascotasAlumnoSeleccionadasAntiguas(jsonMascotasAlumno);
                    //Obtenemos los hobbies del alumno
                    const registroHobbiesAlumno = await getAlumnoHobbies(filtroEnfermedades);
                    const jsonHobbiesAlumno = registroHobbiesAlumno.map(registro => {
                        const registroCompleto = jsonHobbies.find(e => e.id === registro.hobbieId);
                        return {
                            nombre: registroCompleto?.nombre || "",
                            id: registroCompleto.id
                        };
                    });
                    setHobbiesAlumnoSeleccionados(jsonHobbiesAlumno);
                    setHobbiesAlumnoSeleccionadosAntiguos(jsonHobbiesAlumno);
                    //Obtenemos los niveles de idioma del alumno
                    const filtroNivelesIdioma = JSON.stringify({
                        where: {
                            alumnoId: registroAlumno[0].id
                        }
                    });
                    const registroNivelesIdiomaAlumno = await getAlumnoNivelesIdioma(filtroNivelesIdioma);
                    const jsonNivelesIdiomaAlumno = registroNivelesIdiomaAlumno.map(nivelIdioma => {
                        const nivelIdiomaCompleto = jsonNivelIdiomas.find(e => e.id === nivelIdioma.nivelIdiomaId);
                        return {
                            nombre: nivelIdiomaCompleto?.nombre || "",
                            id: nivelIdiomaCompleto.id,
                            activoSn: nivelIdiomaCompleto.activoSn
                        };
                    });
                    setNivelesIdiomaAlumnoSeleccionados(jsonNivelesIdiomaAlumno);
                    setNivelesIdiomaAlumnoSeleccionadosAntiguos(jsonNivelesIdiomaAlumno);
                }

                //Obtenemos la familia acogida
                const registroFamiliaAcogida = await getFamiliasAcogida(filtro);
                if (registroFamiliaAcogida.length > 0) {
                    setFamiliaAcogida(registroFamiliaAcogida[0]);

                    // Obtenemos el nombre del bonus
                    const registroBonus = registrosBonus.find((element) => element.id === registroFamiliaAcogida[0].bonus_id);
                    if (registroBonus) {
                        setBonusSeleccionado(registroBonus.nombre);
                    }

                    // Obtenemos los tipos de archivo de familia acogida
                    const listaTipoArchivoFamiliaAcogida = await obtenerArchivosSeccion(registroFamiliaAcogida[0], 'Familia acogida');
                    setListaTipoArchivosFamiliaAcogida(listaTipoArchivoFamiliaAcogida);
                    //Guardamos los archivos para luego poder compararlos
                    const _listaArchivosAntiguos = {};
                    for (const tipoArchivo of listaTipoArchivoFamiliaAcogida) {
                        _listaArchivosAntiguos[tipoArchivo['nombre']] = registroFamiliaAcogida[0][(tipoArchivo.nombre).toLowerCase()];
                    }
                    setListaTipoArchivosFamiliaAcogidaAntiguos(_listaArchivosAntiguos);

                    //Obtenemos las enfermedades de la familia acogida
                    const filtroEnfermedades = JSON.stringify({
                        where: {
                            familiaAcogidaId: registroFamiliaAcogida[0].id
                        }
                    });
                    const registroEnfermedadesFamiliaAcogida = await getFamiliaAcogidaEnfermedades(filtroEnfermedades);
                    const jsonEnfermedadesFamiliaAcogida = registroEnfermedadesFamiliaAcogida.map(enfermedad => {
                        const enfermedadCompleta = jsonEnfermedades.find(e => e.id === enfermedad.enfermedadId);
                        return {
                            nombre: enfermedadCompleta?.nombre || "",
                            id: enfermedadCompleta.id
                        };
                    });
                    setEnfermedadesFamiliaAcogidaSeleccionadas(jsonEnfermedadesFamiliaAcogida);
                    setEnfermedadesFamiliaAcogidaSeleccionadasAntiguas(jsonEnfermedadesFamiliaAcogida);

                    //Obtenemos las alergias de la familia acogida
                    const filtroAlergias = JSON.stringify({
                        where: {
                            idFamiliaAcogidaId: registroFamiliaAcogida[0].id
                        }
                    });
                    const registroAlergiasFamiliaAcogida = await getFamiliaAcogidaAlergias(filtroAlergias);
                    const jsonAlergiasFamiliaAcogida = registroAlergiasFamiliaAcogida.map(registro => {
                        const registroCompleto = jsonAlergias.find(e => e.id === registro.idAlergiaId);
                        return {
                            nombre: registroCompleto?.nombre || "",
                            id: registroCompleto.id
                        };
                    });
                    setAlergiasFamiliaAcogidaSeleccionadas(jsonAlergiasFamiliaAcogida);
                    setAlergiasFamiliaAcogidaSeleccionadasAntiguas(jsonAlergiasFamiliaAcogida);

                    //Obtenemos las mascotas de la familia acogida
                    const registroMascotasFamiliaAcogida = await getFamiliaAcogidaMascotas(filtroEnfermedades);
                    const jsonMascotasFamiliaAcogida = registroMascotasFamiliaAcogida.map(registro => {
                        const registroCompleto = jsonMascotas.find(e => e.id === registro.mascotaId);
                        return {
                            nombre: registroCompleto?.nombre || "",
                            id: registroCompleto.id
                        };
                    });
                    setMascotasFamiliaAcogidaSeleccionadas(jsonMascotasFamiliaAcogida);
                    setMascotasFamiliaAcogidaSeleccionadasAntiguas(jsonMascotasFamiliaAcogida);

                    //Obtenemos los hobbies de la familia acogida
                    const registroHobbiesFamiliaAcogida = await getFamiliaAcogidaHobbies(filtroEnfermedades);
                    const jsonHobbiesFamiliaAcogida = registroHobbiesFamiliaAcogida.map(registro => {
                        const registroCompleto = jsonHobbies.find(e => e.id === registro.hobbieId);
                        return {
                            nombre: registroCompleto?.nombre || "",
                            id: registroCompleto.id
                        };
                    });
                    setHobbiesFamiliaAcogidaSeleccionados(jsonHobbiesFamiliaAcogida);
                    setHobbiesFamiliaAcogidaSeleccionadosAntiguos(jsonHobbiesFamiliaAcogida);
                }

                //Obtenemos el agente
                const registroAgente = await getAgentes(filtro);
                if (registroAgente.length > 0) {
                    //Formatea la fecha 
                    if (registroAgente[0].fecha_nacimiento) {
                        registroAgente[0].fecha_nacimiento = new Date(registroAgente[0].fecha_nacimiento)
                    }
                    //Obtiene el sexo
                    const sexoAgente = (sexos.find(cod => cod.valor === registroAgente[0].sexo));
                    if (sexoAgente) {
                        setSexoAgenteSeleccionado(sexoAgente.nombre)
                    }
                    setAgente(registroAgente[0]);
                    // Obtenemos el nombre del codigo postal
                    if (registroAgente[0].codigo_postal_id) {
                        const registroCodigoPostal = await getCodigoPostal(registroAgente[0].codigo_postal_id);
                        const codigoPostalJson = { value: registroCodigoPostal.id, label: registroCodigoPostal.nombre };
                        setCodigoPostalSeleccionadoAgente(codigoPostalJson);
                    }

                    // Obtenemos el nombre del tipo de documento
                    const registroTipoDocumento = registrosTiposDocumento.find((element) => element.id === registroAgente[0].tipo_documento_id);
                    if (registroTipoDocumento) {
                        setTipoDocumentoSeleccionadoAgente(registroTipoDocumento.nombre);
                    }

                    // Obtenemos los tipos de archivo de agente
                    const listaTipoArchivoAgente = await obtenerArchivosSeccion(registroAgente[0], 'Agente')
                    setListaTipoArchivosAgente(listaTipoArchivoAgente);
                    //Guardamos los archivos para luego poder compararlos
                    const _listaArchivosAntiguos = {}
                    for (const tipoArchivo of listaTipoArchivoAgente) {
                        _listaArchivosAntiguos[tipoArchivo['nombre']] = registroAgente[0][(tipoArchivo.nombre).toLowerCase()]
                    }
                    setListaTipoArchivosAgenteAntiguos(_listaArchivosAntiguos);

                }

                //Obtenemos el acompañante
                const registroAcompanante = await getAcompanyantes(filtro);
                if (registroAcompanante.length > 0) {
                    setMostrarAlumnosAcompanyante(true);
                    //Formatea la fecha 
                    if (registroAcompanante[0].fecha_nacimiento) {
                        registroAcompanante[0].fecha_nacimiento = new Date(registroAcompanante[0].fecha_nacimiento)
                    }
                    //Obtiene el sexo
                    const sexoAcompanante = (sexos.find(cod => cod.valor === registroAcompanante[0].sexo));
                    if (sexoAcompanante) {
                        setSexoAcompanyanteSeleccionado(sexoAcompanante.nombre)
                    }
                    setAcompanyante(registroAcompanante[0]);
                    // Obtenemos el nombre del codigo postal
                    if (registroAcompanante[0].codigo_postal_id) {
                        const registroCodigoPostal = await getCodigoPostal(registroAcompanante[0].codigo_postal_id);
                        const codigoPostalJson = { value: registroCodigoPostal.id, label: registroCodigoPostal.nombre };
                        setCodigoPostalSeleccionadoAcompanyante(codigoPostalJson);
                    }

                    // Obtenemos el nombre del tipo de documento
                    const registroTipoDocumento = registrosTiposDocumento.find((element) => element.id === registroAcompanante[0].tipo_documento_id);
                    if (registroTipoDocumento) {
                        setTipoDocumentoSeleccionadoAcompanyante(registroTipoDocumento.nombre);
                    }

                    // Obtenemos los tipos de archivo de acompañante
                    const listaTipoArchivosAcompanyante = await obtenerArchivosSeccion(registroAcompanante[0], 'Acompañante')
                    setListaTipoArchivosAcompanyante(listaTipoArchivosAcompanyante);
                    //Guardamos los archivos para luego poder compararlos
                    const _listaArchivosAntiguos = {}
                    for (const tipoArchivo of listaTipoArchivosAcompanyante) {
                        _listaArchivosAntiguos[tipoArchivo['nombre']] = registroAcompanante[0][(tipoArchivo.nombre).toLowerCase()]
                    }
                    setListaTipoArchivosAcompanyanteAntiguos(_listaArchivosAntiguos);

                }

            }
        };
        fetchData();
    }, [idEditar, rowData]);


    useEffect(() => {
        const fetchData = async () => {
            //Obtenemos la pestaña de centro escolar
            const _pestanyas = [...pestanyasTipoUsuario]
            const centroEscolarPestanya = _pestanyas.find(tipo => tipo.title === intl.formatMessage({ id: 'Centro escolar' }));
            if (centroEscolarPestanya) {
                //Actualizamos los contenidos de la pestaña
                const centroEscolarPestanyaNuevo = {
                    title: intl.formatMessage({ id: 'Centro escolar' }),
                    content: <EditarCentroEscolar
                        usuarioId={idEditar}
                        centroEscolar={centroEscolar}
                        setCentroEscolar={setCentroEscolar}
                        estadoGuardando={estadoGuardando}
                    />,
                }
                //Reemplaza el centroEscolar
                const index = _pestanyas.indexOf(centroEscolarPestanya);
                _pestanyas[index] = centroEscolarPestanyaNuevo;
                setPestanyasTipoUsuario(_pestanyas);
            }
        };
        fetchData();
    }, [centroEscolar, estadoGuardando]);

    useEffect(() => {
        const fetchData = async () => {
            //Obtenemos la pestaña de tutor
            const _pestanyas = [...pestanyasTipoUsuario]
            const tutorPestanya = _pestanyas.find(tipo => tipo.title === intl.formatMessage({ id: 'Tutor' }));
            if (tutorPestanya) {
                //Actualizamos los contenidos de la pestaña
                const tutorPestanyaNuevo = {
                    title: intl.formatMessage({ id: 'Tutor' }),
                    content: <EditarDatosTutor
                        usuarioId={idEditar}
                        tutor={tutor}
                        setTutor={setTutor}
                        codigoPostalSeleccionadoTutor={codigoPostalSeleccionadoTutor}
                        setCodigoPostalSeleccionadoTutor={setCodigoPostalSeleccionadoTutor}
                        listaTiposDocumentos={listaTiposDocumentosActivos}
                        tipoDocumentoSeleccionado={tipoDocumentoSeleccionado}
                        setTipoDocumentoSeleccionado={setTipoDocumentoSeleccionado}
                        sexos={sexos}
                        estadoGuardando={estadoGuardando}
                        sexoTutorSeleccionado={sexoTutorSeleccionado}
                        setSexoTutorSeleccionado={setSexoTutorSeleccionado}
                        listaTipoArchivosTutor={listaTipoArchivosTutor}
                        enfermedadesTutorSeleccionadas={enfermedadesTutorSeleccionadas}
                        setEnfermedadesTutorSeleccionadas={setEnfermedadesTutorSeleccionadas}
                        enfermedadesTutor={listaEnfermedades}
                        alergiasTutorSeleccionadas={alergiasTutorSeleccionadas}
                        setAlergiasTutorSeleccionadas={setAlergiasTutorSeleccionadas}
                        alergiasTutor={listaAlergias}
                        mascotasTutorSeleccionadas={mascotasTutorSeleccionadas}
                        setMascotasTutorSeleccionadas={setMascotasTutorSeleccionadas}
                        mascotasTutor={listaMascotas}
                        hobbiesTutorSeleccionados={hobbiesTutorSeleccionados}
                        setHobbiesTutorSeleccionados={setHobbiesTutorSeleccionados}
                        hobbiesTutor={listaHobbies}
                        listaAgentes={listaAgentes}
                        agenteSeleccionado={agenteSeleccionado}
                        setAgenteSeleccionado={setAgenteSeleccionado}

                    />,
                }
                //Reemplaza el centroEscolar
                const index = _pestanyas.indexOf(tutorPestanya);
                _pestanyas[index] = tutorPestanyaNuevo;
                setPestanyasTipoUsuario(_pestanyas);
            }
        };
        fetchData();
    }, [tutor, codigoPostalSeleccionadoTutor, listaTiposDocumentosActivos, tipoDocumentoSeleccionado, sexoTutorSeleccionado, agenteSeleccionado,
        enfermedadesTutorSeleccionadas, alergiasTutorSeleccionadas, mascotasTutorSeleccionadas, hobbiesTutorSeleccionados, estadoGuardando]);

    useEffect(() => {
        const fetchData = async () => {
            //Obtenemos la pestaña de profesor
            const _pestanyas = [...pestanyasTipoUsuario]
            const profesorPestanya = _pestanyas.find(tipo => tipo.title === intl.formatMessage({ id: 'Profesor' }));
            if (profesorPestanya) {
                //Actualizamos los contenidos de la pestaña
                const profesorPestanyaNuevo = {
                    title: intl.formatMessage({ id: 'Profesor' }),
                    content: <EditarDatosProfesor
                        profesor={profesor}
                        setProfesor={setProfesor}
                        codigoPostalSeleccionadoProfesor={codigoPostalSeleccionadoProfesor}
                        setCodigoPostalSeleccionadoProfesor={setCodigoPostalSeleccionadoProfesor}
                        listaTiposDocumentos={listaTiposDocumentosActivos}
                        tipoDocumentoSeleccionado={tipoDocumentoSeleccionadoProfesor}
                        setTipoDocumentoSeleccionado={setTipoDocumentoSeleccionadoProfesor}
                        listaCentrosEscolares={listaCentros}
                        centroEscolarSeleccionado={centroProfesor}
                        setCentroEscolarSeleccionado={setCentroProfesor}
                        sexos={sexos}
                        sexoProfesorSeleccionado={sexoProfesorSeleccionado}
                        setSexoProfesorSeleccionado={setSexoProfesorSeleccionado}
                        estadoGuardando={estadoGuardando}
                        listaTipoArchivosProfesor={listaTipoArchivosProfesor}
                        enfermedadesProfesorSeleccionadas={enfermedadesProfesorSeleccionadas}
                        setEnfermedadesProfesorSeleccionadas={setEnfermedadesProfesorSeleccionadas}
                        enfermedadesProfesor={listaEnfermedades}
                        alergiasProfesorSeleccionadas={alergiasProfesorSeleccionadas}
                        setAlergiasProfesorSeleccionadas={setAlergiasProfesorSeleccionadas}
                        alergiasProfesor={listaAlergias}
                        mascotasProfesorSeleccionadas={mascotasProfesorSeleccionadas}
                        setMascotasProfesorSeleccionadas={setMascotasProfesorSeleccionadas}
                        mascotasProfesor={listaMascotas}
                        hobbiesProfesorSeleccionados={hobbiesProfesorSeleccionados}
                        setHobbiesProfesorSeleccionados={setHobbiesProfesorSeleccionados}
                        hobbiesProfesor={listaHobbies}
                    />,
                }
                //Reemplaza el centroEscolar
                const index = _pestanyas.indexOf(profesorPestanya);
                _pestanyas[index] = profesorPestanyaNuevo;
                setPestanyasTipoUsuario(_pestanyas);
            }
        };
        fetchData();
    }, [profesor, codigoPostalSeleccionadoProfesor, tipoDocumentoSeleccionadoProfesor, sexoProfesorSeleccionado, centroProfesor,
        enfermedadesProfesorSeleccionadas, alergiasProfesorSeleccionadas, mascotasProfesorSeleccionadas, hobbiesProfesorSeleccionados, estadoGuardando]);

    useEffect(() => {
        const fetchData = async () => {
            //Obtenemos la pestaña de alumno
            const _pestanyas = [...pestanyasTipoUsuario]
            const alumnoPestanya = _pestanyas.find(tipo => tipo.title === intl.formatMessage({ id: 'Alumno' }));
            let _listaTipoArchivosAlumno = listaTipoArchivosAlumno
            if (alumno.certificados === undefined) {
                _listaTipoArchivosAlumno = await obtenerArchivosSeccion(alumno, 'Alumno')
            }

            if (alumnoPestanya) {
                //Actualizamos los contenidos de la pestaña
                const alumnoPestanyaNuevo = {
                    title: intl.formatMessage({ id: 'Alumno' }),
                    content: <EditarDatosAlumno
                        //key={alumno.id || 'nuevo'}
                        alumno={alumno}
                        setAlumno={setAlumno}
                        codigoPostalSeleccionadoAlumno={codigoPostalSeleccionadoAlumno}
                        setCodigoPostalSeleccionadoAlumno={setCodigoPostalSeleccionadoAlumno}
                        listaTiposDocumentos={listaTiposDocumentosActivos}
                        tipoDocumentoSeleccionado={tipoDocumentoSeleccionadoAlumno}
                        setTipoDocumentoSeleccionado={setTipoDocumentoSeleccionadoAlumno}
                        listaCentrosEscolares={listaCentros}
                        centroEscolarSeleccionado={centroAlumno}
                        setCentroEscolarSeleccionado={setCentroAlumno}
                        listaComerciales={listaComerciales}
                        comercialAlumnoSeleccionado={comercialAlumnoSeleccionado}
                        setComercialAlumnoSeleccionado={setComercialAlumnoSeleccionado}
                        listaTallas={listaTallas}
                        tallaAlumnoSeleccionada={tallaAlumnoSeleccionada}
                        setTallaAlumnoSeleccionada={setTallaAlumnoSeleccionada}
                        listaDietas={listaDietas}
                        dietaAlumnoSeleccionada={dietaAlumnoSeleccionada}
                        setDietaAlumnoSeleccionada={setDietaAlumnoSeleccionada}
                        listaCursos={listaCursos}
                        cursoActualAlumnoSeleccionado={cursoActualAlumnoSeleccionado}
                        setCursoActualAlumnoSeleccionado={setCursoActualAlumnoSeleccionado}
                        cursoRealizarAlumnoSeleccionado={cursoRealizarAlumnoSeleccionado}
                        setCursoRealizarAlumnoSeleccionado={setCursoRealizarAlumnoSeleccionado}
                        nivelIdiomaSeleccionado={nivelIdiomaAlumnoSelecionado}
                        setNivelIdiomaSeleccionado={setNivelIdiomaAlumnoSelecionado}
                        listaTutoresAlumno={listaTutores}
                        tutoresAlumnoSeleccionados={tutoresAlumnoSeleccionados}
                        setTutoresAlumnoSeleccionados={setTutoresAlumnoSeleccionados}
                        listaCompanyeros={listaCompanyeros}
                        companyerosSeleccionado={companyerosAlumnoSeleccionados}
                        setCompanyerosSeleccionado={setCompanyerosAlumnoSeleccionados}
                        sexos={sexos}
                        sexoAlumnoSeleccionado={sexoAlumnoSeleccionado}
                        setSexoAlumnoSeleccionado={setSexoAlumnoSeleccionado}
                        estadoGuardando={estadoGuardando}
                        listaTipoArchivosAlumno={_listaTipoArchivosAlumno}
                        enfermedadesAlumnoSeleccionadas={enfermedadesAlumnoSeleccionadas}
                        setEnfermedadesAlumnoSeleccionadas={setEnfermedadesAlumnoSeleccionadas}
                        nivelesIdiomaAlumnoSeleccionados={nivelesIdiomaAlumnoSeleccionados}
                        setNivelesIdiomaAlumnoSeleccionados={setNivelesIdiomaAlumnoSeleccionados}
                        listaNivelesIdioma={listaNivelesIdioma}
                        enfermedadesAlumno={listaEnfermedades}
                        alergiasAlumnoSeleccionadas={alergiasAlumnoSeleccionadas}
                        setAlergiasAlumnoSeleccionadas={setAlergiasAlumnoSeleccionadas}
                        alergiasAlumno={listaAlergias}
                        mascotasAlumnoSeleccionadas={mascotasAlumnoSeleccionadas}
                        setMascotasAlumnoSeleccionadas={setMascotasAlumnoSeleccionadas}
                        mascotasAlumno={listaMascotas}
                        hobbiesAlumnoSeleccionados={hobbiesAlumnoSeleccionados}
                        setHobbiesAlumnoSeleccionados={setHobbiesAlumnoSeleccionados}
                        hobbiesAlumno={listaHobbies}
                        listaAcompanyantesAlumno={listaAcompanyantes}
                        acompanyanteAlumnoSeleccionados={acompanyanteAlumnoSeleccionados}
                        setAcompanyantesAlumnoSeleccionados={setAcompanyantesAlumnoSeleccionados}
                    />,
                }
                //Reemplaza el alumno
                const index = _pestanyas.indexOf(alumnoPestanya);
                _pestanyas[index] = alumnoPestanyaNuevo;
                setPestanyasTipoUsuario(_pestanyas);
            }
        };
        fetchData();
    }, [estadoGuardando, alumno, codigoPostalSeleccionadoAlumno, tipoDocumentoSeleccionadoAlumno, sexoAlumnoSeleccionado, centroAlumno, listaTipoArchivosAlumno,
        enfermedadesAlumnoSeleccionadas, alergiasAlumnoSeleccionadas, mascotasAlumnoSeleccionadas, hobbiesAlumnoSeleccionados, nivelesIdiomaAlumnoSeleccionados,
        comercialAlumnoSeleccionado, dietaAlumnoSeleccionada, tallaAlumnoSeleccionada, cursoActualAlumnoSeleccionado, cursoRealizarAlumnoSeleccionado, companyerosAlumnoSeleccionados, tutoresAlumnoSeleccionados, acompanyanteAlumnoSeleccionados]);

    useEffect(() => {
        const fetchData = async () => {
            //Obtenemos la pestaña de familia
            const _pestanyas = [...pestanyasTipoUsuario]
            const familiaPestanya = _pestanyas.find(tipo => tipo.title === intl.formatMessage({ id: 'Familia acogida' }));
            if (familiaPestanya) {
                //Actualizamos los contenidos de la pestaña
                const familiaPestanyaNuevo = {
                    title: intl.formatMessage({ id: 'Familia acogida' }),
                    content: <EditarDatosFamiliaAcogida
                        familiaAcogida={familiaAcogida}
                        setFamiliaAcogida={setFamiliaAcogida}
                        listaBonus={listaBonus}
                        bonusSeleccionado={bonusSeleccionado}
                        setBonusSeleccionado={setBonusSeleccionado}
                        estadoGuardando={estadoGuardando}
                        listaTipoArchivosFamiliaAcogida={listaTipoArchivosFamiliaAcogida}
                        enfermedadesFamiliaAcogidaSeleccionadas={enfermedadesFamiliaAcogidaSeleccionadas}
                        setEnfermedadesFamiliaAcogidaSeleccionadas={setEnfermedadesFamiliaAcogidaSeleccionadas}
                        enfermedadesFamiliaAcogida={listaEnfermedades}
                        alergiasFamiliaAcogidaSeleccionadas={alergiasFamiliaAcogidaSeleccionadas}
                        setAlergiasFamiliaAcogidaSeleccionadas={setAlergiasFamiliaAcogidaSeleccionadas}
                        alergiasFamiliaAcogida={listaAlergias}
                        mascotasFamiliaAcogidaSeleccionadas={mascotasFamiliaAcogidaSeleccionadas}
                        setMascotasFamiliaAcogidaSeleccionadas={setMascotasFamiliaAcogidaSeleccionadas}
                        mascotasFamiliaAcogida={listaMascotas}
                        hobbiesFamiliaAcogidaSeleccionados={hobbiesFamiliaAcogidaSeleccionados}
                        setHobbiesFamiliaAcogidaSeleccionados={setHobbiesFamiliaAcogidaSeleccionados}
                        hobbiesFamiliaAcogida={listaHobbies}
                    />,
                };
                //Reemplaza la familia
                const index = _pestanyas.indexOf(familiaPestanya);
                _pestanyas[index] = familiaPestanyaNuevo;
                setPestanyasTipoUsuario(_pestanyas);
            }
        };
        fetchData();
    }, [estadoGuardando, familiaAcogida, bonusSeleccionado, enfermedadesFamiliaAcogidaSeleccionadas, alergiasFamiliaAcogidaSeleccionadas,
        mascotasFamiliaAcogidaSeleccionadas, hobbiesFamiliaAcogidaSeleccionados]);    
    useEffect(() => {
        const fetchData = async () => {
            //Obtenemos la pestaña de agente
            const _pestanyas = [...pestanyasTipoUsuario]
            const agentePestanya = _pestanyas.find(tipo => tipo.title === intl.formatMessage({ id: 'Agente' }));
            if (agentePestanya) {
                //Actualizamos los contenidos de la pestaña
                const agentePestanyaNuevo = {
                    title: intl.formatMessage({ id: 'Agente' }),
                    content: <EditarDatosAgente
                        agente={agente}
                        setAgente={setAgente}
                        codigoPostalSeleccionadoAgente={codigoPostalSeleccionadoAgente}
                        setCodigoPostalSeleccionadoAgente={setCodigoPostalSeleccionadoAgente}
                        listaTiposDocumentos={listaTiposDocumentosActivos}
                        tipoDocumentoSeleccionado={tipoDocumentoSeleccionadoAgente}
                        setTipoDocumentoSeleccionado={setTipoDocumentoSeleccionadoAgente}
                        sexos={sexos}
                        sexoAgenteSeleccionado={sexoAgenteSeleccionado}
                        setSexoAgenteSeleccionado={setSexoAgenteSeleccionado}
                        estadoGuardando={estadoGuardando}
                        listaTipoArchivosAgente={listaTipoArchivosAgente}
                    />,
                }
                //Reemplaza el agente
                const index = _pestanyas.indexOf(agentePestanya);
                _pestanyas[index] = agentePestanyaNuevo;
                setPestanyasTipoUsuario(_pestanyas);
            }
        };
        fetchData();
    }, [estadoGuardando, agente, codigoPostalSeleccionadoAgente, tipoDocumentoSeleccionadoAgente, sexoAgenteSeleccionado]);

    useEffect(() => {
        const fetchData = async () => {
            //Obtenemos la pestaña de profesor nativo
            const _pestanyas = [...pestanyasTipoUsuario]
            const profesorNativoPestanya = _pestanyas.find(tipo => tipo.title === intl.formatMessage({ id: 'Profesor nativo' }));
            if (profesorNativoPestanya) {
                //Actualizamos los contenidos de la pestaña
                const profesorNativoPestanyaNuevo = {
                    title: intl.formatMessage({ id: 'Profesor nativo' }),
                    content: <EditarDatosProfesor
                        profesor={profesorNativo}
                        setProfesor={setProfesorNativo}
                        codigoPostalSeleccionadoProfesor={codigoPostalSeleccionadoProfesorNativo}
                        setCodigoPostalSeleccionadoProfesor={setCodigoPostalSeleccionadoProfesorNativo}
                        listaTiposDocumentos={listaTiposDocumentosActivos}
                        tipoDocumentoSeleccionado={tipoDocumentoSeleccionadoProfesorNativo}
                        setTipoDocumentoSeleccionado={setTipoDocumentoSeleccionadoProfesorNativo}
                        listaCentrosEscolares={listaCentros}
                        centroEscolarSeleccionado={centroProfesorNativo}
                        setCentroEscolarSeleccionado={setCentroProfesorNativo}
                        sexos={sexos}
                        sexoProfesorSeleccionado={sexoProfesorNativoSeleccionado}
                        setSexoProfesorSeleccionado={setSexoProfesorNativoSeleccionado}
                        estadoGuardando={estadoGuardando}
                        listaTipoArchivosProfesor={listaTipoArchivosProfesorNativo}
                        enfermedadesProfesorSeleccionadas={enfermedadesProfesorNativoSeleccionadas}
                        setEnfermedadesProfesorSeleccionadas={setEnfermedadesProfesorNativoSeleccionadas}
                        enfermedadesProfesor={listaEnfermedades}
                        alergiasProfesorSeleccionadas={alergiasProfesorNativoSeleccionadas}
                        setAlergiasProfesorSeleccionadas={setAlergiasProfesorNativoSeleccionadas}
                        alergiasProfesor={listaAlergias}
                        mascotasProfesorSeleccionadas={mascotasProfesorNativoSeleccionadas}
                        setMascotasProfesorSeleccionadas={setMascotasProfesorNativoSeleccionadas}
                        mascotasProfesor={listaMascotas}
                        hobbiesProfesorSeleccionados={hobbiesProfesorNativoSeleccionados}
                        setHobbiesProfesorSeleccionados={setHobbiesProfesorNativoSeleccionados}
                        hobbiesProfesor={listaHobbies}
                        listaTiposProfesorNativo={listaTiposProfesorNativo}
                        tipoProfesorNativo={tipoProfesorNativo}
                        setTipoProfesorNativo={setTipoProfesorNativo}
                    />,
                }
                //Reemplaza el profesorNativo
                const index = _pestanyas.indexOf(profesorNativoPestanya);
                _pestanyas[index] = profesorNativoPestanyaNuevo;
                setPestanyasTipoUsuario(_pestanyas);
            }
        };
        fetchData();
    }, [profesorNativo, codigoPostalSeleccionadoProfesorNativo, tipoDocumentoSeleccionadoProfesorNativo, sexoProfesorNativoSeleccionado, centroProfesorNativo,
        enfermedadesProfesorNativoSeleccionadas, alergiasProfesorNativoSeleccionadas, mascotasProfesorNativoSeleccionadas, hobbiesProfesorNativoSeleccionados, estadoGuardando,
        tipoProfesorNativo]);


    useEffect(() => {
        const fetchData = async () => {
            //Obtenemos la pestaña de acompañante
            const _pestanyas = [...pestanyasTipoUsuario]
            const acompanyantePestanya = _pestanyas.find(tipo => tipo.title === intl.formatMessage({ id: 'Acompañante' }));
            if (acompanyantePestanya) {
                //Actualizamos los contenidos de la pestaña
                const acompanyantePestanyaNuevo = {
                    title: intl.formatMessage({ id: 'Acompañante' }),
                    content: <EditarDatosAcompanyante
                            acompanyante={acompanyante}
                            setAcompanyante={setAcompanyante}
                            codigoPostalSeleccionadoAcompanyante={codigoPostalSeleccionadoAcompanyante}
                            setCodigoPostalSeleccionadoAcompanyante={setCodigoPostalSeleccionadoAcompanyante}
                            listaTiposDocumentos={listaTiposDocumentosActivos}
                            tipoDocumentoSeleccionado={tipoDocumentoSeleccionadoAcompanyante}
                            setTipoDocumentoSeleccionado={setTipoDocumentoSeleccionadoAcompanyante}
                            sexos={sexos}
                            sexoAcompanyanteSeleccionado={sexoAcompanyanteSeleccionado}
                            setSexoAcompanyanteSeleccionado={setSexoAcompanyanteSeleccionado}
                            estadoGuardando={estadoGuardando}
                            listaTipoArchivosAcompanyante={listaTipoArchivosAcompanyante}
                    />,
                }
                //Reemplaza el acompañante
                const index = _pestanyas.indexOf(acompanyantePestanya);
                _pestanyas[index] = acompanyantePestanyaNuevo;
                setPestanyasTipoUsuario(_pestanyas);
            }
        };
        fetchData();
    }, [estadoGuardando, acompanyante, codigoPostalSeleccionadoAcompanyante, tipoDocumentoSeleccionadoAcompanyante, sexoAcompanyanteSeleccionado]);

    //UseEffect para actualizar los tipos de usuario
    useEffect(() => {
        const fetchData = async () => {

            //Generamos las pestañas
            const pestanyasTipos = [];
            for (const tipo of tiposSeleccionados) {
                console.log(tipo)
                if (tipo.nombre === intl.formatMessage({ id: 'Centro escolar' })) {
                    pestanyasTipos.push({
                        title: intl.formatMessage({ id: tipo.nombre }),
                        content: <EditarCentroEscolar
                            usuarioId={idEditar}
                            centroEscolar={centroEscolar}
                            setCentroEscolar={setCentroEscolar}
                            estadoGuardando={estadoGuardando}

                        />,
                    });
                }
                else if (tipo.nombre === intl.formatMessage({ id: 'Tutor' })) {
                    // Obtenemos los tipos de archivo de tutor
                    const listaTipoArchivosTutor = await obtenerArchivosSeccion(null, 'Tutor')
                    setListaTipoArchivosTutor(listaTipoArchivosTutor);
                    pestanyasTipos.push({
                        title: intl.formatMessage({ id: tipo.nombre }),
                        content: <EditarDatosTutor
                            usuarioId={idEditar}
                            tutor={tutor}
                            setTutor={setTutor}
                            codigoPostalSeleccionadoTutor={codigoPostalSeleccionadoTutor}
                            setCodigoPostalSeleccionadoTutor={setCodigoPostalSeleccionadoTutor}
                            listaTiposDocumentos={listaTiposDocumentosActivos}
                            tipoDocumentoSeleccionado={tipoDocumentoSeleccionado}
                            setTipoDocumentoSeleccionado={setTipoDocumentoSeleccionado}
                            sexos={sexos}
                            estadoGuardando={estadoGuardando}
                            sexoTutorSeleccionado={sexoTutorSeleccionado}
                            setSexoTutorSeleccionado={setSexoTutorSeleccionado}
                            listaTipoArchivosTutor={listaTipoArchivosTutor}
                            enfermedadesTutorSeleccionadas={enfermedadesTutorSeleccionadas}
                            setEnfermedadesTutorSeleccionadas={setEnfermedadesTutorSeleccionadas}
                            enfermedadesTutor={listaEnfermedades}
                            alergiasTutorSeleccionadas={alergiasTutorSeleccionadas}
                            setAlergiasTutorSeleccionadas={setAlergiasTutorSeleccionadas}
                            alergiasTutor={listaAlergias}
                            mascotasTutorSeleccionadas={mascotasTutorSeleccionadas}
                            setMascotasTutorSeleccionadas={setMascotasTutorSeleccionadas}
                            mascotasTutor={listaMascotas}
                            hobbiesTutorSeleccionados={hobbiesTutorSeleccionados}
                            setHobbiesTutorSeleccionados={setHobbiesTutorSeleccionados}
                            hobbiesTutor={listaHobbies}
                            listaAgentes={listaAgentes}
                            agenteSeleccionado={agenteSeleccionado}
                            setAgenteSeleccionado={setAgenteSeleccionado}
                        />,
                    });
                }
                else if (tipo.nombre === intl.formatMessage({ id: 'Profesor' })) {
                    const listaTipoArchivosProfesor = await obtenerArchivosSeccion(null, 'Profesor')
                    setListaTipoArchivosProfesor(listaTipoArchivosProfesor);
                    pestanyasTipos.push({
                        title: intl.formatMessage({ id: tipo.nombre }),
                        content: <EditarDatosProfesor
                            profesor={profesor}
                            setProfesor={setProfesor}
                            codigoPostalSeleccionadoProfesor={codigoPostalSeleccionadoProfesor}
                            setCodigoPostalSeleccionadoProfesor={setCodigoPostalSeleccionadoProfesor}
                            listaTiposDocumentos={listaTiposDocumentosActivos}
                            tipoDocumentoSeleccionado={tipoDocumentoSeleccionadoProfesor}
                            setTipoDocumentoSeleccionado={setTipoDocumentoSeleccionadoProfesor}
                            listaCentrosEscolares={listaCentros}
                            centroEscolarSeleccionado={centroProfesor}
                            setCentroEscolarSeleccionado={setCentroProfesor}
                            sexos={sexos}
                            sexoProfesorSeleccionado={sexoProfesorSeleccionado}
                            setSexoProfesorSeleccionado={setSexoProfesorSeleccionado}
                            estadoGuardando={estadoGuardando}
                            listaTipoArchivosProfesor={listaTipoArchivosProfesor}
                            enfermedadesProfesorSeleccionadas={enfermedadesProfesorSeleccionadas}
                            setEnfermedadesProfesorSeleccionadas={setEnfermedadesProfesorSeleccionadas}
                            enfermedadesProfesor={listaEnfermedades}
                            alergiasProfesorSeleccionadas={alergiasProfesorSeleccionadas}
                            setAlergiasProfesorSeleccionadas={setAlergiasProfesorSeleccionadas}
                            alergiasProfesor={listaAlergias}
                            mascotasProfesorSeleccionadas={mascotasProfesorSeleccionadas}
                            setMascotasProfesorSeleccionadas={setMascotasProfesorSeleccionadas}
                            mascotasProfesor={listaMascotas}
                            hobbiesProfesorSeleccionados={hobbiesProfesorSeleccionados}
                            setHobbiesProfesorSeleccionados={setHobbiesProfesorSeleccionados}
                            hobbiesProfesor={listaHobbies}
                        />,
                    });
                }
                else if (tipo.nombre === intl.formatMessage({ id: 'Profesor nativo' })) {
                    const listaTipoArchivos = await obtenerArchivosSeccion(null, 'Profesor nativo')
                    setListaTipoArchivosProfesorNativo(listaTipoArchivos);
                    pestanyasTipos.push({
                        title: intl.formatMessage({ id: tipo.nombre }),
                        content: <EditarDatosProfesor
                            profesor={profesorNativo}
                            setProfesor={setProfesorNativo}
                            codigoPostalSeleccionadoProfesor={codigoPostalSeleccionadoProfesorNativo}
                            setCodigoPostalSeleccionadoProfesor={setCodigoPostalSeleccionadoProfesorNativo}
                            listaTiposDocumentos={listaTiposDocumentosActivos}
                            tipoDocumentoSeleccionado={tipoDocumentoSeleccionadoProfesorNativo}
                            setTipoDocumentoSeleccionado={setTipoDocumentoSeleccionadoProfesorNativo}
                            listaCentrosEscolares={listaCentros}
                            centroEscolarSeleccionado={centroProfesorNativo}
                            setCentroEscolarSeleccionado={setCentroProfesorNativo}
                            sexos={sexos}
                            sexoProfesorSeleccionado={sexoProfesorNativoSeleccionado}
                            setSexoProfesorSeleccionado={setSexoProfesorNativoSeleccionado}
                            estadoGuardando={estadoGuardando}
                            listaTipoArchivosProfesor={listaTipoArchivos}
                            enfermedadesProfesorSeleccionadas={enfermedadesProfesorNativoSeleccionadas}
                            setEnfermedadesProfesorSeleccionadas={setEnfermedadesProfesorNativoSeleccionadas}
                            enfermedadesProfesor={listaEnfermedades}
                            alergiasProfesorSeleccionadas={alergiasProfesorNativoSeleccionadas}
                            setAlergiasProfesorSeleccionadas={setAlergiasProfesorNativoSeleccionadas}
                            alergiasProfesor={listaAlergias}
                            mascotasProfesorSeleccionadas={mascotasProfesorNativoSeleccionadas}
                            setMascotasProfesorSeleccionadas={setMascotasProfesorNativoSeleccionadas}
                            mascotasProfesor={listaMascotas}
                            hobbiesProfesorSeleccionados={hobbiesProfesorNativoSeleccionados}
                            setHobbiesProfesorSeleccionados={setHobbiesProfesorNativoSeleccionados}
                            hobbiesProfesor={listaHobbies}
                            listaTiposProfesorNativo={listaTiposProfesorNativo}
                            tipoProfesorNativo={tipoProfesorNativo}
                            setTipoProfesorNativo={setTipoProfesorNativo}
                        />,
                    });
                }
                else if (tipo.nombre === intl.formatMessage({ id: 'Alumno' })) {
                    const listaTipoArchivos = await obtenerArchivosSeccion(null, 'Alumno')
                    setListaTipoArchivosAlumno(listaTipoArchivos);
                    pestanyasTipos.push({
                        title: intl.formatMessage({ id: tipo.nombre }),
                        content: <EditarDatosAlumno
                            //key={alumno.id || 'nuevo'}
                            alumno={alumno}
                            setAlumno={setAlumno}
                            codigoPostalSeleccionadoAlumno={codigoPostalSeleccionadoAlumno}
                            setCodigoPostalSeleccionadoAlumno={setCodigoPostalSeleccionadoAlumno}
                            listaTiposDocumentos={listaTiposDocumentosActivos}
                            tipoDocumentoSeleccionado={tipoDocumentoSeleccionadoAlumno}
                            setTipoDocumentoSeleccionado={setTipoDocumentoSeleccionadoAlumno}
                            listaCentrosEscolares={listaCentros}
                            centroEscolarSeleccionado={centroAlumno}
                            setCentroEscolarSeleccionado={setCentroAlumno}
                            listaComerciales={listaComerciales}
                            comercialAlumnoSeleccionado={comercialAlumnoSeleccionado}
                            setComercialAlumnoSeleccionado={setComercialAlumnoSeleccionado}
                            listaTallas={listaTallas}
                            tallaAlumnoSeleccionada={tallaAlumnoSeleccionada}
                            setTallaAlumnoSeleccionada={setTallaAlumnoSeleccionada}
                            listaDietas={listaDietas}
                            dietaAlumnoSeleccionada={dietaAlumnoSeleccionada}
                            setDietaAlumnoSeleccionada={setDietaAlumnoSeleccionada}
                            listaCursos={listaCursos}
                            cursoActualAlumnoSeleccionado={cursoActualAlumnoSeleccionado}
                            setCursoActualAlumnoSeleccionado={setCursoActualAlumnoSeleccionado}
                            cursoRealizarAlumnoSeleccionado={cursoRealizarAlumnoSeleccionado}
                            setCursoRealizarAlumnoSeleccionado={setCursoRealizarAlumnoSeleccionado}
                            listaNivelesIdioma={listaNivelesIdioma}
                            nivelIdiomaSeleccionado={nivelIdiomaAlumnoSelecionado}
                            setNivelIdiomaSeleccionado={setNivelIdiomaAlumnoSelecionado}
                            listaTutoresAlumno={listaTutores}
                            tutoresAlumnoSeleccionados={tutoresAlumnoSeleccionados}
                            setTutoresAlumnoSeleccionados={setTutoresAlumnoSeleccionados}
                            listaCompanyeros={listaCompanyeros}
                            companyerosSeleccionado={companyerosAlumnoSeleccionados}
                            setCompanyerosSeleccionado={setCompanyerosAlumnoSeleccionados}
                            sexos={sexos}
                            sexoAlumnoSeleccionado={sexoAlumnoSeleccionado}
                            setSexoAlumnoSeleccionado={setSexoAlumnoSeleccionado}
                            estadoGuardando={estadoGuardando}
                            listaTipoArchivosAlumno={listaTipoArchivos}
                            enfermedadesAlumnoSeleccionadas={enfermedadesAlumnoSeleccionadas}
                            setEnfermedadesAlumnoSeleccionadas={setEnfermedadesAlumnoSeleccionadas}
                            enfermedadesAlumno={listaEnfermedades}
                            alergiasAlumnoSeleccionadas={alergiasAlumnoSeleccionadas}
                            setAlergiasAlumnoSeleccionadas={setAlergiasAlumnoSeleccionadas}
                            alergiasAlumno={listaAlergias}
                            nivelesIdiomaAlumnoSeleccionados={nivelesIdiomaAlumnoSeleccionados}
                            setNivelesIdiomaAlumnoSeleccionados={setNivelesIdiomaAlumnoSeleccionados}
                            mascotasAlumnoSeleccionadas={mascotasAlumnoSeleccionadas}
                            setMascotasAlumnoSeleccionadas={setMascotasAlumnoSeleccionadas}
                            mascotasAlumno={listaMascotas}
                            hobbiesAlumnoSeleccionados={hobbiesAlumnoSeleccionados}
                            setHobbiesAlumnoSeleccionados={setHobbiesAlumnoSeleccionados}
                            hobbiesAlumno={listaHobbies}
                            listaAcompanyantesAlumno={listaAcompanyantes}
                            acompanyanteAlumnoSeleccionados={acompanyanteAlumnoSeleccionados}
                            setAcompanyantesAlumnoSeleccionados={setAcompanyantesAlumnoSeleccionados}
                        />,
                    });
                }
                else if (tipo.nombre === intl.formatMessage({ id: 'Familia acogida' })) {
                    const listaTipoArchivos = await obtenerArchivosSeccion(null, 'Familia acogida')
                    setListaTipoArchivosFamiliaAcogida(listaTipoArchivos);
                    pestanyasTipos.push({
                        title: intl.formatMessage({ id: tipo.nombre }),
                        content: <EditarDatosFamiliaAcogida
                            familiaAcogida={familiaAcogida}
                            setFamiliaAcogida={setFamiliaAcogida}
                            listaBonus={listaBonus}
                            bonusSeleccionado={bonusSeleccionado}
                            setBonusSeleccionado={setBonusSeleccionado}
                            estadoGuardando={estadoGuardando}
                            listaTipoArchivosFamiliaAcogida={listaTipoArchivosFamiliaAcogida}
                            enfermedadesFamiliaAcogidaSeleccionadas={enfermedadesFamiliaAcogidaSeleccionadas}
                            setEnfermedadesFamiliaAcogidaSeleccionadas={setEnfermedadesFamiliaAcogidaSeleccionadas}
                            enfermedadesFamiliaAcogida={listaEnfermedades}
                            alergiasFamiliaAcogidaSeleccionadas={alergiasFamiliaAcogidaSeleccionadas}
                            setAlergiasFamiliaAcogidaSeleccionadas={setAlergiasFamiliaAcogidaSeleccionadas}
                            alergiasFamiliaAcogida={listaAlergias}
                            mascotasFamiliaAcogidaSeleccionadas={mascotasFamiliaAcogidaSeleccionadas}
                            setMascotasFamiliaAcogidaSeleccionadas={setMascotasFamiliaAcogidaSeleccionadas}
                            mascotasFamiliaAcogida={listaMascotas}
                            hobbiesFamiliaAcogidaSeleccionados={hobbiesFamiliaAcogidaSeleccionados}
                            setHobbiesFamiliaAcogidaSeleccionados={setHobbiesFamiliaAcogidaSeleccionados}
                            hobbiesFamiliaAcogida={listaHobbies}
                        />,
                    });
                }
                else if (tipo.nombre === intl.formatMessage({ id: 'Agente' })) {
                    const listaTipoArchivos = await obtenerArchivosSeccion(null, 'Agente');
                    setListaTipoArchivosAgente(listaTipoArchivos);
                    pestanyasTipos.push({
                        title: intl.formatMessage({ id: tipo.nombre }),
                        content: <EditarDatosAgente
                            agente={agente}
                            setAgente={setAgente}
                            codigoPostalSeleccionadoAgente={codigoPostalSeleccionadoAgente}
                            setCodigoPostalSeleccionadoAgente={setCodigoPostalSeleccionadoAgente}
                            listaTiposDocumentos={listaTiposDocumentosActivos}
                            tipoDocumentoSeleccionado={tipoDocumentoSeleccionadoAgente}
                            setTipoDocumentoSeleccionado={setTipoDocumentoSeleccionadoAgente}
                            sexos={sexos}
                            sexoAgenteSeleccionado={sexoAgenteSeleccionado}
                            setSexoAgenteSeleccionado={setSexoAgenteSeleccionado}
                            estadoGuardando={estadoGuardando}
                            listaTipoArchivosAgente={listaTipoArchivos}
                        />,
                    });
                }
                else if (tipo.nombre === intl.formatMessage({ id: 'Acompañante' })) {
                    const listaTipoArchivos = await obtenerArchivosSeccion(null, 'Acompañante');
                    setListaTipoArchivosAcompanyante(listaTipoArchivos);
                    pestanyasTipos.push({
                        title: intl.formatMessage({ id: tipo.nombre }),
                        content: <EditarDatosAcompanyante
                            acompanyante={acompanyante}
                            setAcompanyante={setAcompanyante}
                            codigoPostalSeleccionadoAcompanyante={codigoPostalSeleccionadoAcompanyante}
                            setCodigoPostalSeleccionadoAcompanyante={setCodigoPostalSeleccionadoAcompanyante}
                            listaTiposDocumentos={listaTiposDocumentosActivos}
                            tipoDocumentoSeleccionado={tipoDocumentoSeleccionadoAcompanyante}
                            setTipoDocumentoSeleccionado={setTipoDocumentoSeleccionadoAcompanyante}
                            sexos={sexos}
                            sexoAcompanyanteSeleccionado={sexoAcompanyanteSeleccionado}
                            setSexoAcompanyanteSeleccionado={setSexoAcompanyanteSeleccionado}
                            estadoGuardando={estadoGuardando}
                            listaTipoArchivosAcompanyante={listaTipoArchivosAcompanyante}
                        />,
                    });
                }
                else {
                    pestanyasTipos.push({
                        title: intl.formatMessage({ id: tipo.nombre }),
                        content: 'contenido',
                    });
                }

            }
            setPestanyasTipoUsuario([...pestanyasTipos]);
        };
        fetchData();
    }, [tiposSeleccionados]);

    const validacionesImagenes = () => {
        for (const tipoArchivo of listaTipoArchivos) {
            //Comprueba si el tipo de archivo es una imagen para validar su extension
            if ((tipoArchivo.tipo).toLowerCase() === 'imagen') {
                //Comprueba que el input haya sido modificado
                if (usuario[(tipoArchivo.nombre).toLowerCase()]?.type !== undefined) {
                    //Comprueba que la imagen es del tipo valido
                    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/tiff", "image/avif"];
                    if (!(allowedTypes.includes(usuario[(tipoArchivo.nombre).toLowerCase()].type))) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    const validaciones = async () => {
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        //Valida que los campos no esten vacios
        const validaNombre = usuario.nombre === undefined || usuario.nombre === "";
        //Procesamos el telefono para que tenga el formato correcto
        if (usuario.telefono && usuario.telefono.length > 0 && !usuario.telefono.includes('+')) {
            usuario.telefono = '+' + usuario.telefono;
        }
        const validaTelefono = (usuario.telefono != null && (usuario.telefono.length > 0 && !isPossiblePhoneNumber(usuario.telefono)));

        const validaTipoIva = tipoIvaSeleccionado == null || tipoIvaSeleccionado.codigo === "";
        //const validaEmpresa = empresaSeleccionada == null || empresaSeleccionada.codigo === "";
        const validaIdioma = idiomaSeleccionado == null || idiomaSeleccionado.codigo === "";
        const validaRol = rolSeleccionado == null || rolSeleccionado.codigo === "";
        const validaImagenes = validacionesImagenes();
        const validaEmail = usuario.mail === undefined || usuario.mail === "";

        //Validaciones centro escolar
        if (tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Centro escolar' }))) {
            if (!validacionesCentroEscolar()) {
                return false
            }
        }

        //Validaciones tutor
        if (tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Tutor' }))) {
            if (!validacionesTutor()) {
                return false
            }
        }
        //Validaciones profesor
        if (tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Profesor' }))) {
            if (!validacionesProfesor()) {
                return false
            }
        }

        //Validaciones profesor nativo
        if (tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Profesor nativo' }))) {
            if (!validacionesProfesorNativo()) {
                return false
            }
        }

        //Validaciones alumno
        if (tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Alumno' }))) {
            if (!validacionesAlumno()) {
                return false
            }
        }

        //Validaciones agente
        if (tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Agente' }))) {
            if (!validacionesAgente()) {
                return false
            }
        }

        //Validaciones familia
        if (tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Familia acogida' }))) {
            if (!validacionesFamiliaAcogida()) {
                return false
            }
        }
        
        //Validaciones acompañante
        if (tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Acompañante' }))) {
            if (!validacionesAcompanyante()) {
                return false
            }
        }

        //Valida los telefonos en caso de que esten rellenados
        if (validaTelefono) {

            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'El numero de telefono debe de tener el formato correcto' }),
                life: 3000,
            });
        }
        if (validaNombre || validaTelefono /* || validaEmpresa */ || validaIdioma || validaRol || validaEmail || validaTipoIva) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'Todos los campos deben de ser rellenados' }),
                life: 3000,
            });
        }
        if (validaImagenes) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'Las imagenes deben de tener el formato correcto' }),
                life: 3000,
            });
        }
        if (!regexEmail.test(usuario.mail)) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'El email debe de tener el formato correcto' }),
                life: 3000,
            });
        }
        //Validar que el mail es unico
        const filtroUsuario = JSON.stringify({
            where: {
                and: {
                    mail: usuario.mail,
                }
            }

        })
        const usuarioExistente = await getVistaUsuarios(filtroUsuario);
        let limite = 0
        let condicion = true
        //Si el usuario se esta editando, no contamos su propio email
        if (idEditar !== undefined && idEditar !== null && idEditar !== "" && idEditar > 0) {
            limite++;
            if (usuarioExistente.length > 0) {
                condicion = usuarioExistente[0].id !== idEditar
            }
        }
        if (usuarioExistente.length > 0 && condicion) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'El email debe de ser no estar registrado en el sistema.' }),
                life: 3000,
            });
            return false
        }
        //
        //Si existe algún bloque vacio entonces no se puede guardar
        //
        return (!validaNombre && !validaImagenes && !validaTelefono // && !validaEmpresa 
            && !validaIdioma && !validaRol && !validaEmail && regexEmail.test(usuario.mail) && !validaTipoIva);
    }

    const validacionesCentroEscolar = () => {
        const validaNombre = centroEscolar.nombre === undefined || centroEscolar.nombre === "";
        //const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        //Procesamos el telefono para que tenga el formato correcto
        if (centroEscolar.telefono && centroEscolar.telefono.length > 0 && !centroEscolar.telefono.includes('+')) {
            centroEscolar.telefono = '+' + centroEscolar.telefono;
        }
        const validaTelefono = centroEscolar.telefono != null && (centroEscolar.telefono.length > 0 && !isPossiblePhoneNumber(centroEscolar.telefono));
        //const validaEmail = centroEscolar.email_persona_contacto.length > 0 && !regexEmail.test(centroEscolar.email_persona_contacto);
        //const validaPersonaContacto = centroEscolar.persona_contacto === undefined || centroEscolar.persona_contacto === "";
        //const validaEmailContacto = centroEscolar.email_persona_contacto === undefined || centroEscolar.email_persona_contacto === "";
        //const validaHorario = centroEscolar.horario === undefined || centroEscolar.horario === "";
        // if (validaEmail) {
        //     toast.current?.show({
        //         severity: 'error',
        //         summary: 'ERROR',
        //         detail: intl.formatMessage({ id: 'El email debe de tener el formato correcto' }),
        //         life: 3000,
        //     });

        //     const centroEscolarPestanya = pestanyasTipoUsuario.find(tipo => tipo.title === 'Centro escolar');
        //     const index = pestanyasTipoUsuario.indexOf(centroEscolarPestanya);
        //     setActiveIndex(index);
        //     return false;
        // }
        if (validaNombre //|| validaTelefono || validaPersonaContacto || validaEmailContacto || validaHorario
        ) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'Todos los campos deben de ser rellenados' }),
                life: 3000,
            });
            //Mueve la pestaña
            muevePestanya('Centro escolar')
            return false;
        }

        if (validaTelefono) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'El numero de telefono debe de tener el formato correcto' }),
                life: 3000,
            });
            //Mueve la pestaña
            muevePestanya('Centro escolar')
            return false;
        }
        return true;
    }

    const validacionesTutor = () => {
        const validaNombre = tutor.nombre === undefined || tutor.nombre === "";
        const validaApellido1 = tutor.apellido1 == undefined || tutor.apellido1 === "";
        const validaApellido2 = tutor.apellido2 == undefined || tutor.apellido2 === "";
        const validaDireccion = tutor.direccion === undefined || tutor.direccion === "";
        const validaSexo = sexoTutorSeleccionado == undefined || sexoTutorSeleccionado.valor === "";
        const validaFechaNacimiento = tutor.fecha_nacimiento == undefined || tutor.fecha_nacimiento === "";
        const validaCodigoPostal = codigoPostalSeleccionadoTutor == null || codigoPostalSeleccionadoTutor.id === "";
        const validaTipoDocumento = tipoDocumentoSeleccionado == null || tipoDocumentoSeleccionado.id === "";
        //Procesamos el telefono para que tenga el formato correcto
        // if (tutor.telefono && tutor.telefono.length > 0 && !tutor.telefono.includes('+')) {
        //     tutor.telefono = '+' + tutor.telefono;
        // }

        if (tutor.movil && tutor.movil.length > 0 && !tutor.movil.includes('+')) {
            tutor.movil = '+' + tutor.movil;
        }
        //Valida los telefonos en caso de que esten rellenados
        if ((tutor.movil && tutor.movil.length > 0 && !isPossiblePhoneNumber(tutor.movil))) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'El numero de telefono debe de tener el formato correcto' }),
                life: 3000,
            });
            //Mueve la pestaña
            muevePestanya('Tutor')
            return false;
        }

        if (validaNombre || validaApellido1 || validaApellido2 || validaCodigoPostal || validaTipoDocumento || validaSexo /*|| validaDocumento || validaTelefono || validaDireccion  || validaFechaNacimiento || validaMovil */) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'Todos los campos deben de ser rellenados' }),
                life: 3000,
            });
            //Mueve la pestaña
            muevePestanya('Tutor')
            return false;
        }
        if (!validaDocumento(tutor.documento, tipoDocumentoSeleccionado)) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'El documento de identidad tiene que ser válido' }),
                life: 3000,
            });
            //Mueve la pestaña
            muevePestanya('Tutor')
            return false;
        }
        return true;
    }

    const validacionesProfesor = () => {
        //const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const validaNombre = profesor.nombre === undefined || profesor.nombre === "";
        const validaApellido1 = profesor.apellido1 == undefined || profesor.apellido1 === "";
        const validaApellido2 = profesor.apellido2 == undefined || profesor.apellido2 === "";
        const validaCodigoPostal = codigoPostalSeleccionadoProfesor == null || codigoPostalSeleccionadoProfesor.id === "";
        const validaTipoDocumento = tipoDocumentoSeleccionadoProfesor == null || tipoDocumentoSeleccionadoProfesor.id === "";
        const validaSexo = sexoProfesorSeleccionado == undefined || sexoProfesorSeleccionado.valor === "";

        if (profesor.movil && profesor.movil.length > 0 && !profesor.movil.includes('+')) {
            profesor.movil = '+' + profesor.movil;
        }
        //Valida los telefonos en caso de que esten rellenados
        if ((profesor.movil && profesor.movil.length > 0 && !isPossiblePhoneNumber(profesor.movil))) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'El numero de telefono debe de tener el formato correcto' }),
                life: 3000,
            });
            //Mueve la pestaña
            muevePestanya('Profesor')
            return false;
        }

        if (validaNombre || validaApellido1 || validaApellido2 || validaCodigoPostal || validaTipoDocumento || validaSexo /*|| validaDocumento || validaTelefono || validaDireccion || validaSexo || validaFechaNacimiento || validaMovil */) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'Todos los campos deben de ser rellenados' }),
                life: 3000,
            });
            //Mueve la pestaña
            muevePestanya('Profesor')
            return false;
        }
        if (!validaDocumento(profesor.documento, tipoDocumentoSeleccionadoProfesor)) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'El documento de identidad tiene que ser válido' }),
                life: 3000,
            });
            //Mueve la pestaña
            muevePestanya('Profesor')
            return false;
        }
        return true;
    }

    const validacionesFamiliaAcogida = () => {
        const validaBonus = bonusSeleccionado == null || bonusSeleccionado.id === "";

        if (validaBonus) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'Todos los campos deben de ser rellenados' }),
                life: 3000,
            });
            //Mueve la pestaña
            muevePestanya('Familia acogida')
            return false;
        }
        return true;
    }

    const validacionesProfesorNativo = () => {
        //const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const validaNombre = profesorNativo.nombre === undefined || profesorNativo.nombre === "";
        const validaApellido1 = profesorNativo.apellido1 == undefined || profesorNativo.apellido1 === "";
        const validaApellido2 = profesorNativo.apellido2 == undefined || profesorNativo.apellido2 === "";
        const validaCodigoPostal = codigoPostalSeleccionadoProfesorNativo == null || codigoPostalSeleccionadoProfesorNativo.id === "";
        const validaTipoDocumento = tipoDocumentoSeleccionadoProfesorNativo == null || tipoDocumentoSeleccionadoProfesorNativo.id === "";
        const validaSexo = sexoProfesorNativoSeleccionado == undefined || sexoProfesorNativoSeleccionado.valor === "";
        const validaTipoProfesor = tipoProfesorNativo == null || tipoProfesorNativo.id === "";

        if (profesorNativo.movil && profesorNativo.movil.length > 0 && !profesorNativo.movil.includes('+')) {
            profesorNativo.movil = '+' + profesorNativo.movil;
        }
        //Valida los telefonos en caso de que esten rellenados
        if ((profesorNativo.movil && profesorNativo.movil.length > 0 && !isPossiblePhoneNumber(profesorNativo.movil))) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'El numero de telefono debe de tener el formato correcto' }),
                life: 3000,
            });
            //Mueve la pestaña
            muevePestanya('Profesor nativo')
            return false;
        }

        if (validaNombre || validaApellido1 || validaApellido2 || validaCodigoPostal || validaTipoDocumento || validaTipoProfesor || validaSexo /*|| validaDocumento || validaTelefono || validaDireccion || validaSexo || validaFechaNacimiento || validaMovil */) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'Todos los campos deben de ser rellenados' }),
                life: 3000,
            });
            //Mueve la pestaña
            muevePestanya('Profesor nativo')
            return false;
        }
        if (!validaDocumento(profesorNativo.documento, tipoDocumentoSeleccionadoProfesorNativo)) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'El documento de identidad tiene que ser válido' }),
                life: 3000,
            });
            //Mueve la pestaña
            muevePestanya('Profesor nativo')
            return false;
        }
        return true;
    }

    const validacionesAlumno = () => {
        const validaNombre = alumno.nombre === undefined || alumno.nombre === "";
        const validaApellido1 = alumno.apellido1 == undefined || alumno.apellido1 === "";
        const validaApellido2 = alumno.apellido2 == undefined || alumno.apellido2 === "";
        const validaCodigoPostal = codigoPostalSeleccionadoAlumno == null || codigoPostalSeleccionadoAlumno.id === "";
        const validaTipoDocumento = tipoDocumentoSeleccionadoAlumno == null || tipoDocumentoSeleccionadoAlumno.id === "";
        //const validaCurso = cursoActualAlumnoSeleccionado == null || cursoActualAlumnoSeleccionado.id === "";
        const validaCentro = centroAlumno == null || centroAlumno.id === "";
        //const validaTalla = tallaAlumnoSeleccionada == null || tallaAlumnoSeleccionada.id === "";
        //const validaDieta = dietaAlumnoSeleccionada == null || dietaAlumnoSeleccionada.id === "";
        //const validaNivelIdioma = nivelIdiomaAlumnoSelecionado == null || nivelIdiomaAlumnoSelecionado.id === "";
        //const validaComercial = comercialAlumnoSeleccionado == null || comercialAlumnoSeleccionado.id === "";
        const validaSexo = sexoAlumnoSeleccionado == undefined || sexoAlumnoSeleccionado.valor === "";

        if (alumno.movil && alumno.movil.length > 0 && !alumno.movil.includes('+')) {
            alumno.movil = '+' + alumno.movil;
        }
        //Valida los telefonos en caso de que esten rellenados
        if ((alumno.movil && alumno.movil.length > 0 && !isPossiblePhoneNumber(alumno.movil))) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'El numero de telefono debe de tener el formato correcto' }),
                life: 3000,
            });
            //Mueve la pestaña
            muevePestanya('Alumno')
            return false;
        }

        if (validaCentro || validaNombre || validaApellido1 || validaApellido2 || validaCodigoPostal || validaTipoDocumento || validaSexo  /* || validaComercial || validaDocumento || validaTelefono || validaDireccion || validaSexo || validaFechaNacimiento || validaMovil */) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'Todos los campos deben de ser rellenados' }),
                life: 3000,
            });
            //Mueve la pestaña
            muevePestanya('Alumno')
            return false;
        }
        if (!validaDocumento(alumno.documento, tipoDocumentoSeleccionadoAlumno)) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'El documento de identidad tiene que ser válido' }),
                life: 3000,
            });
            //Mueve la pestaña
            muevePestanya('Alumno')
            return false;
        }
        return true;
    }

    const validacionesAgente = () => {
        const validaNombre = agente.nombre === undefined || agente.nombre === "";
        const validaCodigoPostal = codigoPostalSeleccionadoAgente == null || codigoPostalSeleccionadoAgente.id === "";
        const validaTipoDocumento = tipoDocumentoSeleccionadoAgente == null || tipoDocumentoSeleccionadoAgente.id === "";
        const validaSexo = sexoAgenteSeleccionado == undefined || sexoAgenteSeleccionado.valor === "";

        if (agente.movil && agente.movil.length > 0 && !agente.movil.includes('+')) {
            agente.movil = '+' + agente.movil;
        }
        //Valida los telefonos en caso de que esten rellenados
        if ((agente.movil && agente.movil.length > 0 && !isPossiblePhoneNumber(agente.movil))) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'El numero de telefono debe de tener el formato correcto' }),
                life: 3000,
            });
            //Mueve la pestaña
            muevePestanya('Agente')
            return false;
        }

        if (validaNombre || validaCodigoPostal || validaTipoDocumento || validaSexo) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'Todos los campos deben de ser rellenados' }),
                life: 3000,
            });
            //Mueve la pestaña
            muevePestanya('Agente')
            return false;
        }
        if (!validaDocumento(agente.documento, tipoDocumentoSeleccionadoAgente)) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'El documento de identidad tiene que ser válido' }),
                life: 3000,
            });
            //Mueve la pestaña
            muevePestanya('Agente')
            return false;
        }
        return true;
    }

    const validacionesAcompanyante = () => {
        const validaNombre = acompanyante.nombre === undefined || acompanyante.nombre === "";
        const validaCodigoPostal = codigoPostalSeleccionadoAcompanyante == null || codigoPostalSeleccionadoAcompanyante.id === "";
        const validaTipoDocumento = tipoDocumentoSeleccionadoAcompanyante == null || tipoDocumentoSeleccionadoAcompanyante.id === "";
        const validaSexo = sexoAcompanyanteSeleccionado == undefined || sexoAcompanyanteSeleccionado.valor === "";

        if (acompanyante.movil && acompanyante.movil.length > 0 && !acompanyante.movil.includes('+')) {
            acompanyante.movil = '+' + acompanyante.movil;
        }
        //Valida los telefonos en caso de que esten rellenados
        if ((acompanyante.movil && acompanyante.movil.length > 0 && !isPossiblePhoneNumber(acompanyante.movil))) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'El numero de telefono debe de tener el formato correcto' }),
                life: 3000,
            });
            //Mueve la pestaña
            muevePestanya('Acompañante')
            return false;
        }

        if (validaNombre || validaCodigoPostal || validaTipoDocumento || validaSexo) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'Todos los campos deben de ser rellenados' }),
                life: 3000,
            });
            //Mueve la pestaña
            muevePestanya('Acompañante')
            return false;
        }
        if (!validaDocumento(acompanyante.documento, tipoDocumentoSeleccionadoAcompanyante)) {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'El documento de identidad tiene que ser válido' }),
                life: 3000,
            });
            //Mueve la pestaña
            muevePestanya('Acompañante')
            return false;
        }
        return true;
    }

    const guardarUsuario = async () => {
        setEstadoGuardando(true);
        setEstadoGuardandoBoton(true);
        if (await validaciones()) {
            // Obtenemos el examen actual y solo entramos si tiene nombre y contenido
            let objGuardar = { ...usuario };
            if (objGuardar.nombre && objGuardar) {
                const usuarioCreacion = getUsuarioSesion()?.id;
                const usuarioGuardar = {
                    tipoIvaId: listaTiposIva.find(iva => iva.nombre === tipoIvaSeleccionado).id,
                    //datosFacturarId: null,
                    nombre: objGuardar.nombre,
                    mail: objGuardar.mail,
                    //telefono: objGuardar.telefono,
                    activoSn: objGuardar.activoSn,
                    //rolId: listaRoles.find(rol => rol.nombre === rolSeleccionado).id,
                    //idiomaId: listaIdiomas.find(idioma => idioma.nombre === idiomaSeleccionado).id,
                    empresaId: getUsuarioSesion()?.empresaId,


                }
                // Si estoy insertando uno nuevo
                if (idEditar === 0) {
                    usuarioGuardar['usuCreacion'] = usuarioCreacion;

                    if (idiomaSeleccionado) {
                        usuarioGuardar['idiomaId'] = listaIdiomas.find(idioma => idioma.nombre === idiomaSeleccionado)?.id;
                    }
                    if (tipoIvaSeleccionado) {
                        usuarioGuardar['tipoIvaId'] = listaTiposIva.find(iva => iva.nombre === tipoIvaSeleccionado)?.id;
                    }
                    if (rolSeleccionado) {
                        usuarioGuardar['rolId'] = listaRoles.find(rol => rol.nombre === rolSeleccionado)?.id;
                    }

                    if (objGuardar.telefono && objGuardar.telefono.length > 0) {
                        if (!objGuardar.telefono.includes('+')) {
                            usuarioGuardar.telefono = '+' + objGuardar.telefono;
                        }
                        else {
                            usuarioGuardar.telefono = objGuardar.telefono;
                        }
                    }
                    else {
                        usuarioGuardar.telefono = null;
                    }
                    if (objGuardar.activoSn == '') {
                        usuarioGuardar.activoSn = 'N';
                    }

                    // Hacemos el insert del usuario
                    const nuevoRegistro = await postUsuario(usuarioGuardar);

                    if (nuevoRegistro?.id) {

                        //Sube las imagenes al servidor
                        for (const tipoArchivo of listaTipoArchivos) {
                            //Comprueba que el input haya sido modificado
                            if (usuario[(tipoArchivo.nombre).toLowerCase()]?.type !== undefined) {
                                await insertarArchivo(usuario[(tipoArchivo.nombre).toLowerCase()], nuevoRegistro.id, tipoArchivo, seccion, usuarioCreacion)
                            }
                        }

                        //Asigna los tipos del usuario
                        for (const tipo of tiposSeleccionados) {
                            await postUsuarioTipos({ usuarioId: nuevoRegistro.id, tipoUsuarioId: tipo.id });
                        }

                        //Guarda el centro escolar
                        if (tiposSeleccionados.some(tipo => tipo.nombre === intl.formatMessage({ id: 'Centro escolar' }))) {
                            await guardarCentroEscolar(nuevoRegistro.id);
                        }
                        //Guarda el tutor
                        if (tiposSeleccionados.some(tipo => tipo.nombre === intl.formatMessage({ id: 'Tutor' }))) {
                            await guardarTutor(nuevoRegistro.id);
                        }

                        //Guarda el profesor
                        if (tiposSeleccionados.some(tipo => tipo.nombre === intl.formatMessage({ id: 'Profesor' }))) {
                            const documentoSeleccionado = listaTiposDocumentos.find(tipo => tipo.nombre === tipoDocumentoSeleccionadoProfesor)
                            const registroCentroProfe = listaCentros.find(centro => centro.nombre === centroProfesor)
                            await guardarProfesor(
                                nuevoRegistro.id,
                                { ...profesor },
                                documentoSeleccionado,
                                registroCentroProfe,
                                listaTipoArchivosProfesor,
                                listaTipoArchivosProfesorAntiguos,
                                alergiasProfesorSeleccionadas,
                                alergiasProfesorSeleccionadasAntiguas,
                                enfermedadesProfesorSeleccionadas,
                                enfermedadesProfesorSeleccionadasAntiguas,
                                mascotasProfesorSeleccionadas,
                                mascotasProfesorSeleccionadasAntiguas,
                                hobbiesProfesorSeleccionados,
                                hobbiesProfesorSeleccionadosAntiguos,
                                'Profesor',
                                "",
                                codigoPostalSeleccionadoProfesor
                            );
                        }


                        //Guarda el profesor nativo
                        if (tiposSeleccionados.some(tipo => tipo.nombre === intl.formatMessage({ id: 'Profesor nativo' }))) {
                            const documentoSeleccionado = listaTiposDocumentos.find(tipo => tipo.nombre === tipoDocumentoSeleccionadoProfesorNativo)
                            const registroCentroProfe = listaCentros.find(centro => centro.nombre === centroProfesorNativo)
                            await guardarProfesor(
                                nuevoRegistro.id,
                                { ...profesorNativo },
                                documentoSeleccionado,
                                registroCentroProfe,
                                listaTipoArchivosProfesorNativo,
                                listaTipoArchivosProfesorNativoAntiguos,
                                alergiasProfesorNativoSeleccionadas,
                                alergiasProfesorNativoSeleccionadasAntiguas,
                                enfermedadesProfesorNativoSeleccionadas,
                                enfermedadesProfesorNativoSeleccionadasAntiguas,
                                mascotasProfesorNativoSeleccionadas,
                                mascotasProfesorNativoSeleccionadasAntiguas,
                                hobbiesProfesorNativoSeleccionados,
                                hobbiesProfesorNativoSeleccionadosAntiguos,
                                'Profesor nativo',
                                tipoProfesorNativo,
                                codigoPostalSeleccionadoProfesorNativo
                            );
                        }

                        //Guarda el alumno
                        if (tiposSeleccionados.some(tipo => tipo.nombre === intl.formatMessage({ id: 'Alumno' }))) {
                            await guardarAlumno(nuevoRegistro.id);
                        }

                        //Guarda el agente
                        if (tiposSeleccionados.some(tipo => tipo.nombre === intl.formatMessage({ id: 'Agente' }))) {
                            await guardarAgente(nuevoRegistro.id);
                        }

                        //Guarda la familia acogida
                        if (tiposSeleccionados.some(tipo => tipo.nombre === intl.formatMessage({ id: 'Familia acogida' }))) {
                            await guardarFamiliaAcogida(nuevoRegistro.id);
                        }

                        //Guarda el acompañante
                        if (tiposSeleccionados.some(tipo => tipo.nombre === intl.formatMessage({ id: 'Acompañante' }))) {
                            await guardarAcompanyante(nuevoRegistro.id);
                        }

                        //Si no tiene permisos para acceder al crud, le devuelve a la pagina de inicio del usuario
                        const sePuedeAcceder = await tieneUsuarioPermiso('Nathalie', 'Usuarios', 'acceder')
                        if (!sePuedeAcceder) {
                            //Si se ha entrado a la pagina a traves del url de registro
                            const localRol = localStorage.getItem('rol');
                            const localTipo = localStorage.getItem('tipo');
                            if (localTipo && localRol) {
                                logout(intl.formatMessage({ id: 'Usuario creado correctamente' }))
                                //localStorage.setItem('toastMensaje', intl.formatMessage({ id: 'Usuario creado correctamente' }));
                            }
                            else {
                                router.push(await obtenerRolDashboard());
                            }

                        }
                        else {
                            //Usamos una variable que luego se cargara en el useEffect de la pagina principal para mostrar el toast
                            setRegistroResult("insertado");
                            //setAccion("consulta");
                            setIdEditar(null);
                            if (setRegistroEditarFlag) {
                                setRegistroEditarFlag(false);
                            }
                        }


                    } else {
                        toast.current?.show({
                            severity: 'error',
                            summary: 'ERROR',
                            detail: intl.formatMessage({ id: 'Ha ocurrido un error creando el registro' }),
                            life: 3000,
                        });
                    }
                } else {
                    //Si se edita un examen existente Hacemos el patch del examen
                    usuarioGuardar['usuModificacion'] = usuarioCreacion;
                    if (idiomaSeleccionado) {
                        usuarioGuardar['idiomaId'] = listaIdiomas.find(idioma => idioma.nombre === idiomaSeleccionado)?.id;
                    }
                    if (tipoIvaSeleccionado) {
                        usuarioGuardar['tipoIvaId'] = listaTiposIva.find(iva => iva.nombre === tipoIvaSeleccionado)?.id;
                    }
                    if (rolSeleccionado) {
                        usuarioGuardar['rolId'] = listaRoles.find(rol => rol.nombre === rolSeleccionado)?.id;
                    }
                    usuarioGuardar.id = objGuardar.id;

                    usuarioGuardar['empresaId'] = getUsuarioSesion()?.empresaId;

                    if (objGuardar.telefono && objGuardar.telefono.length > 0) {
                        if (!objGuardar.telefono.includes('+')) {
                            usuarioGuardar.telefono = '+' + objGuardar.telefono;
                        }
                        else {
                            usuarioGuardar.telefono = objGuardar.telefono;
                        }
                    }
                    else {
                        usuarioGuardar.telefono = null;
                    }
                    if (objGuardar.activoSn === '' || objGuardar.activoSn == null) {
                        usuarioGuardar.activoSn = 'N';
                    }

                    await patchUsuario(objGuardar.id, usuarioGuardar);
                    //Compara los archivos existentes con los de la subida para borrar o añadir en caso de que sea necesario
                    await editarArchivos(usuario, objGuardar.id, seccion, usuarioCreacion, listaTipoArchivos, listaTipoArchivosAntiguos)
                    //Limpia los tipos del usuario
                    for (const tipo of tiposSeleccionadosAntiguo) {
                        const filtro = {
                            where: {
                                usuarioId: objGuardar.id,
                                tipoId: tipo.id
                            }
                        }
                        const tipoRegistro = await getUsuarioTipos(JSON.stringify(filtro))
                        await deleteUsuarioTipos(tipoRegistro[0].id);
                    }
                    //Asigna los tipos del usuario
                    for (const tipo of tiposSeleccionados) {
                        await postUsuarioTipos({ usuarioId: objGuardar.id, tipoUsuarioId: tipo.id });
                    }
                    //Guarda el centro escolar
                    if (tiposSeleccionados.some(tipo => tipo.nombre === intl.formatMessage({ id: 'Centro escolar' })) || tiposSeleccionadosAntiguo.some(tipo => tipo.nombre === intl.formatMessage({ id: 'Centro escolar' }))) {
                        await guardarCentroEscolar(objGuardar.id);
                    }
                    //Guarda el tutor
                    if (tiposSeleccionados.some(tipo => tipo.nombre === intl.formatMessage({ id: 'Tutor' })) || tiposSeleccionadosAntiguo.some(tipo => tipo.nombre === intl.formatMessage({ id: 'Tutor' }))) {
                        await guardarTutor(objGuardar.id);
                    }

                    //Guarda el profesor
                    if (tiposSeleccionados.some(tipo => tipo.nombre === intl.formatMessage({ id: 'Profesor' })) || tiposSeleccionadosAntiguo.some(tipo => tipo.nombre === intl.formatMessage({ id: 'Profesor' }))) {
                        const documentoSeleccionado = listaTiposDocumentos.find(tipo => tipo.nombre === tipoDocumentoSeleccionadoProfesor)
                        const registroCentroProfe = listaCentros.find(centro => centro.nombre === centroProfesor)
                        await guardarProfesor(
                            objGuardar.id,
                            { ...profesor },
                            documentoSeleccionado,
                            registroCentroProfe,
                            listaTipoArchivosProfesor,
                            listaTipoArchivosProfesorAntiguos,
                            alergiasProfesorSeleccionadas,
                            alergiasProfesorSeleccionadasAntiguas,
                            enfermedadesProfesorSeleccionadas,
                            enfermedadesProfesorSeleccionadasAntiguas,
                            mascotasProfesorSeleccionadas,
                            mascotasProfesorSeleccionadasAntiguas,
                            hobbiesProfesorSeleccionados,
                            hobbiesProfesorSeleccionadosAntiguos,
                            'Profesor',
                            "",
                            codigoPostalSeleccionadoProfesor
                        );
                    }

                    //Guarda el profesor nativo
                    if (tiposSeleccionados.some(tipo => tipo.nombre === intl.formatMessage({ id: 'Profesor nativo' })) || tiposSeleccionadosAntiguo.some(tipo => tipo.nombre === intl.formatMessage({ id: 'Profesor nativo' }))) {
                        const documentoSeleccionado = listaTiposDocumentos.find(tipo => tipo.nombre === tipoDocumentoSeleccionadoProfesorNativo)
                        const registroCentroProfe = listaCentros.find(centro => centro.nombre === centroProfesorNativo)
                        await guardarProfesor(
                            objGuardar.id,
                            { ...profesorNativo },
                            documentoSeleccionado,
                            registroCentroProfe,
                            listaTipoArchivosProfesorNativo,
                            listaTipoArchivosProfesorNativoAntiguos,
                            alergiasProfesorNativoSeleccionadas,
                            alergiasProfesorNativoSeleccionadasAntiguas,
                            enfermedadesProfesorNativoSeleccionadas,
                            enfermedadesProfesorNativoSeleccionadasAntiguas,
                            mascotasProfesorNativoSeleccionadas,
                            mascotasProfesorNativoSeleccionadasAntiguas,
                            hobbiesProfesorNativoSeleccionados,
                            hobbiesProfesorNativoSeleccionadosAntiguos,
                            'Profesor nativo',
                            tipoProfesorNativo,
                            codigoPostalSeleccionadoProfesorNativo
                        );
                    }

                    //Guarda el alumno
                    if (tiposSeleccionados.some(tipo => tipo.nombre === intl.formatMessage({ id: 'Alumno' })) || tiposSeleccionadosAntiguo.some(tipo => tipo.nombre === intl.formatMessage({ id: 'Alumno' }))) {
                        await guardarAlumno(objGuardar.id);
                    }


                    //Guarda el agente
                    if (tiposSeleccionados.some(tipo => tipo.nombre === intl.formatMessage({ id: 'Agente' })) || tiposSeleccionadosAntiguo.some(tipo => tipo.nombre === intl.formatMessage({ id: 'Agente' }))) {
                        await guardarAgente(objGuardar.id);
                    }

                    //Guarda la familia acogida
                    if (tiposSeleccionados.some(tipo => tipo.nombre === intl.formatMessage({ id: 'Familia acogida' })) || tiposSeleccionadosAntiguo.some(tipo => tipo.nombre === intl.formatMessage({ id: 'Familia acogida' }))) {
                        await guardarFamiliaAcogida(objGuardar.id);
                    }

                    //Guarda el acompañante
                    if (tiposSeleccionados.some(tipo => tipo.nombre === intl.formatMessage({ id: 'Acompañante' })) || tiposSeleccionadosAntiguo.some(tipo => tipo.nombre === intl.formatMessage({ id: 'Acompañante' }))) {
                        await guardarAcompanyante(objGuardar.id);
                    }

                    //Si no tiene permisos para acceder al crud, le devuelve a la pagina de inicio del usuario
                    const sePuedeAcceder = await tieneUsuarioPermiso('Nathalie', 'Usuarios', 'acceder')
                    if (!sePuedeAcceder) {
                        //Si se ha entrado a la pagina a traves del url de registro
                        const localRol = localStorage.getItem('rol');
                        const localTipo = localStorage.getItem('tipo');
                        if (localTipo && localRol) {
                            logout()
                        }
                        else {
                            router.push(await obtenerRolDashboard());
                        }

                    }
                    else {
                        //setAccion("consulta");
                        setIdEditar(null)
                        if (setRegistroEditarFlag) {
                            setRegistroEditarFlag(false);
                        }
                        setRegistroResult("editado");
                    }



                }
            }
        }
        else {
            toast.current?.show({
                severity: 'error',
                summary: 'ERROR',
                detail: intl.formatMessage({ id: 'Ha ocurrido un error creando el registro' }),
                life: 3000,
            });
        }
        setEstadoGuardandoBoton(false);
    };

    const guardarCentroEscolar = async (usuarioId) => {
        let objGuardar = { ...centroEscolar };
        const centroEscolarGuardar = {
            usuarioId: usuarioId,
            nombre: objGuardar.nombre,
            horario: objGuardar.horario,
            personaContacto: objGuardar.persona_contacto,
            //emailPersonaContacto: objGuardar.email_persona_contacto,
            activoSn: objGuardar.activo_sn || 'N',

        }
        // if (objGuardar.telefono && objGuardar.telefono.length > 0) {
        //     if (!objGuardar.telefono.includes('+')) {
        //         centroEscolarGuardar.telefono = '+' + objGuardar.telefono;
        //     }
        //     else {
        //         centroEscolarGuardar.telefono = objGuardar.telefono;
        //     }
        // }
        // else {
        //     centroEscolarGuardar.telefono = null;
        // }
        //Si existe el centro escolar y esta recien creado, lo inserta
        if (tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Centro escolar' })) && !tiposSeleccionadosAntiguo.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Centro escolar' }))) {
            centroEscolarGuardar['usuCreacion'] = getUsuarioSesion()?.id;
            await postCentroEscolar(centroEscolarGuardar);
        }
        //Si existia antes se edita
        else if (tiposSeleccionadosAntiguo.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Centro escolar' })) && tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Centro escolar' }))) {
            centroEscolarGuardar['usuModificacion'] = getUsuarioSesion()?.id;
            centroEscolarGuardar['id'] = objGuardar.id
            await patchCentroEscolar(centroEscolarGuardar.id, centroEscolarGuardar);
        }
        //Si existia antes y se ha eliminado, lo borra
        else if (
            tiposSeleccionadosAntiguo.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Centro escolar' })) &&
            !tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Centro escolar' }))
        ) {
            await deleteCentroEscolar(objGuardar.id);
        }
    }

    const guardarTutor = async (usuarioId) => {
        let objGuardar = { ...tutor };
        const tutorGuardar = {
            usuarioId: usuarioId,
            nombre: objGuardar.nombre,
            apellido1: objGuardar.apellido1,
            apellido2: objGuardar.apellido2,
            documento: objGuardar.documento,
            //telefono: objGuardar.telefono,
            direccion: objGuardar.direccion,
            //sexo: objGuardar.sexo,
            fechaNacimiento: objGuardar.fecha_nacimiento === "" ? null : objGuardar.fecha_nacimiento,
            //movil: objGuardar.movil,
            codigoPostalId: codigoPostalSeleccionadoTutor.value,
            seReparteFacturaSn: objGuardar.se_reparte_factura_sn,
            activoSn: objGuardar.activo_sn || 'N',
        }
        //Telefono y movil
        // if (objGuardar.telefono && objGuardar.telefono.length > 0) {
        //     if (!objGuardar.telefono.includes('+')) {
        //         tutorGuardar.telefono = '+' + objGuardar.telefono;
        //     }
        //     else {
        //         tutorGuardar.telefono = objGuardar.telefono;
        //     }
        // }
        // else {
        //     tutorGuardar.telefono = null;
        // }
        if (objGuardar.movil && objGuardar.movil.length > 0) {
            if (!objGuardar.movil.includes('+')) {
                tutorGuardar.movil = '+' + objGuardar.movil;
            }
            else {
                tutorGuardar.movil = objGuardar.movil;
            }
        }
        else {
            tutorGuardar.movil = null;
        }
        // Tipo de documento
        const registroSeleccionado = listaTiposDocumentos.find(tipo => tipo.nombre === tipoDocumentoSeleccionado)
        if (registroSeleccionado) {
            tutorGuardar['tipoDocumento'] = registroSeleccionado.id;
        }

        // Tipo de documento
        const registroAgente = listaAgentes.find(tipo => tipo.nombre === agenteSeleccionado)
        if (registroAgente) {
            tutorGuardar['agenteId'] = registroAgente.id;
        }

        //Sexo
        if (sexoTutorSeleccionado) {
            tutorGuardar['sexo'] = sexos.find(sexo => sexo.nombre === sexoTutorSeleccionado).valor;
        }

        //Limpiamos las relaciones
        if (objGuardar.id) {
            for (const enfermedadAntigua of enfermedadesTutorSeleccionadasAntiguas) {
                if (!enfermedadesTutorSeleccionadas.some(registro => registro.id === enfermedadAntigua.id)) {
                    const filtro = {
                        where: {
                            tutorId: objGuardar.id,
                            enfermedadId: enfermedadAntigua.id
                        }
                    }
                    const enfermedad = await getTutorEnfermedades(JSON.stringify(filtro));
                    await deleteTutorEnfermedad(enfermedad[0].id);
                }
            }
            for (const alergiaAntigua of alergiasTutorSeleccionadasAntiguas) {
                if (!alergiasTutorSeleccionadas.some(registro => registro.id === alergiaAntigua.id)) {
                    const filtro = {
                        where: {
                            tutorId: objGuardar.id,
                            alergiaId: alergiaAntigua.id
                        }
                    }
                    const alergia = await getTutorAlergias(JSON.stringify(filtro));
                    await deleteTutorAlergia(alergia[0].id);
                }

            }
            for (const mascotaAntigua of mascotasTutorSeleccionadasAntiguas) {
                if (!mascotasTutorSeleccionadas.some(registro => registro.id === mascotaAntigua.id)) {
                    const filtro = {
                        where: {
                            tutorId: objGuardar.id,
                            mascotaId: mascotaAntigua.id
                        }
                    }
                    const mascota = await getTutorMascotas(JSON.stringify(filtro));
                    await deleteTutorMascota(mascota[0].id);
                }

            }
            for (const hobbieAntiguo of hobbiesTutorSeleccionadosAntiguos) {
                if (!hobbiesTutorSeleccionados.some(registro => registro.id === hobbieAntiguo.id)) {
                    const filtro = {
                        where: {
                            tutorId: objGuardar.id,
                            hobbieId: hobbieAntiguo.id
                        }
                    }
                    const hobbie = await getTutorHobbies(JSON.stringify(filtro));
                    await deleteTutorHobbie(hobbie[0].id);
                }

            }
        }


        //Si existe el tutor y esta recien creado, lo inserta
        if (tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Tutor' })) && !tiposSeleccionadosAntiguo.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Tutor' }))) {
            tutorGuardar['usuCreacion'] = getUsuarioSesion()?.id;
            const nuevoRegistro = await postTutor(tutorGuardar);
            objGuardar.id = nuevoRegistro.id
            await editarArchivos(tutor, objGuardar.id, 'Tutor', usuarioId, listaTipoArchivosTutor, listaTipoArchivosTutorAntiguos)
        }
        //Si existia antes se edita
        else if (tiposSeleccionadosAntiguo.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Tutor' })) && tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Tutor' }))) {
            tutorGuardar['usuModificacion'] = getUsuarioSesion()?.id;
            tutorGuardar['id'] = objGuardar.id
            await patchTutor(tutorGuardar.id, tutorGuardar);
            await editarArchivos(tutor, objGuardar.id, 'Tutor', usuarioId, listaTipoArchivosTutor, listaTipoArchivosTutorAntiguos)
        }
        //Si existia antes y se ha eliminado, lo borra
        else if (
            tiposSeleccionadosAntiguo.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Tutor' })) &&
            !tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Tutor' }))
        ) {
            //borra el archivo
            tutor.documento = null;
            await deleteTutor(objGuardar.id);
            await editarArchivos(tutor, objGuardar.id, 'Tutor', usuarioId, listaTipoArchivosTutor, listaTipoArchivosTutorAntiguos)
            return
        }

        //Guardamos las relaciones de tutor
        for (const enfermedad of enfermedadesTutorSeleccionadas) {
            if (!enfermedadesTutorSeleccionadasAntiguas.some(registro => registro.id === enfermedad.id)) {
                await postTutorEnfermedad({ tutorId: objGuardar.id, enfermedadId: enfermedad.id });
            }
        }
        for (const alergia of alergiasTutorSeleccionadas) {
            if (!alergiasTutorSeleccionadasAntiguas.some(registro => registro.id === alergia.id)) {
                await postTutorAlergia({ tutorId: objGuardar.id, alergiaId: alergia.id });
            }

        }
        for (const mascota of mascotasTutorSeleccionadas) {
            if (!mascotasTutorSeleccionadasAntiguas.some(registro => registro.id === mascota.id)) {
                await postTutorMascota({ tutorId: objGuardar.id, mascotaId: mascota.id });
            }

        }
        for (const hobbie of hobbiesTutorSeleccionados) {
            if (!hobbiesTutorSeleccionadosAntiguos.some(registro => registro.id === hobbie.id)) {
                await postTutorHobbie({ tutorId: objGuardar.id, hobbieId: hobbie.id });
            }

        }

    }

    const guardarProfesor = async (usuarioId, objGuardar, documentoSeleccionado, registroCentroProfe,
        listaTipoArchivosProfesor, listaTipoArchivosProfesorAntiguos, alergiasProfesorSeleccionadas, alergiasProfesorSeleccionadasAntiguas,
        enfermedadesProfesorSeleccionadas, enfermedadesProfesorSeleccionadasAntiguas, mascotasProfesorSeleccionadas, mascotasProfesorSeleccionadasAntiguas,
        hobbiesProfesorSeleccionados, hobbiesProfesorSeleccionadosAntiguos, tabla, tipoProfesorNativo, codigoPostalSeleccionadoProfesor) => {
        const profeGuardar = {
            usuarioId: usuarioId,
            nombre: objGuardar.nombre,
            apellido1: objGuardar.apellido1,
            apellido2: objGuardar.apellido2,
            //tipoProfesorId: tipoProfe === 'Nativo' ? 2 : 1,
            documento: objGuardar.documento,
            //telefono: objGuardar.telefono,
            direccion: objGuardar.direccion,
            //email: objGuardar.email,
            //sexo: objGuardar.sexo,
            fechaNacimiento: objGuardar.fechaNacimiento === "" ? null : objGuardar.fechaNacimiento,
            //movil: objGuardar.movil,
            codigoPostalId: codigoPostalSeleccionadoProfesor.value,
            comunicacionComercialSn: objGuardar.comunicacion_comercial_sn,
            aceptaAvisoLegalSn: objGuardar.acepta_aviso_legal_sn,
            activoSn: objGuardar.activo_sn || 'N',
            dietaEspecial: objGuardar.dietaEspecial,
            competencias: objGuardar.competencias,
            //horasMensuales: objGuardar.horas_mensuales,
            otros: objGuardar.otros,
            razonSocial: objGuardar.razon_social,
            //coste: objGuardar.coste,

        }
        if (objGuardar.coste === '') {
            profeGuardar.coste = 0;
        }
        else {
            profeGuardar.coste = parseFloat(objGuardar.coste);
        }

        if (objGuardar.horas_mensuales === '') {
            profeGuardar.horasMensuales = 0;
        }
        else {
            profeGuardar.horasMensuales = parseFloat(objGuardar.horas_mensuales);
        }


        //Telefono y movil
        // if (objGuardar.telefono && objGuardar.telefono.length > 0) {
        //     if (!objGuardar.telefono.includes('+')) {
        //         profeGuardar.telefono = '+' + objGuardar.telefono;
        //     }
        //     else {
        //         profeGuardar.telefono = objGuardar.telefono;
        //     }
        // }
        // else {
        //     profeGuardar.telefono = null;
        // }
        if (objGuardar.movil && objGuardar.movil.length > 0) {
            if (!objGuardar.movil.includes('+')) {
                profeGuardar.movil = '+' + objGuardar.movil;
            }
            else {
                profeGuardar.movil = objGuardar.movil;
            }
        }
        else {
            profeGuardar.movil = null;
        }
        // Tipo de documento
        //const documentoSeleccionado = listaTiposDocumentos.find(tipo => tipo.nombre === tipoDocumentoSeleccionado)
        if (documentoSeleccionado) {
            profeGuardar['tipoDocumento'] = documentoSeleccionado.id;
        }

        //Sexo
        if (sexoProfesorNativoSeleccionado) {
            profeGuardar['sexo'] = sexos.find(sexo => sexo.nombre === sexoProfesorNativoSeleccionado).valor;
        }

        //Centro escolar
        //const registroCentroProfe = listaCentros.find(centro => centro.nombre === centroProfesor)
        if (registroCentroProfe) {
            profeGuardar['centroEscolarId'] = registroCentroProfe.id;
        }

        //Tipo profesor
        const registroTipoProfesor = listaTiposProfesorNativo.find(profesorTipo => profesorTipo.nombre === tipoProfesorNativo)
        if (registroTipoProfesor) {
            profeGuardar['tipoProfesorId'] = registroTipoProfesor.id;
        }
        else {
            profeGuardar['tipoProfesorId'] = listaTiposProfesor.find(profesorTipo => profesorTipo.nombre === 'Normal').id;
        }

        //Limpiamos las relaciones
        if (objGuardar.id) {
            for (const enfermedadAntigua of enfermedadesProfesorSeleccionadasAntiguas) {
                if (!enfermedadesProfesorSeleccionadas.some(registro => registro.id === enfermedadAntigua.id)) {
                    const filtro = {
                        where: {
                            profesorId: objGuardar.id,
                            enfermedadId: enfermedadAntigua.id
                        }
                    }
                    const enfermedad = await getProfesorEnfermedades(JSON.stringify(filtro));
                    await deleteProfesorEnfermedad(enfermedad[0].id);
                }
            }
            for (const alergiaAntigua of alergiasProfesorSeleccionadasAntiguas) {
                if (!alergiasProfesorSeleccionadas.some(registro => registro.id === alergiaAntigua.id)) {
                    const filtro = {
                        where: {
                            profesorId: objGuardar.id,
                            alergiaId: alergiaAntigua.id
                        }
                    }
                    const alergia = await getProfesorAlergias(JSON.stringify(filtro));
                    await deleteProfesorAlergia(alergia[0].id);
                }

            }
            for (const mascotaAntigua of mascotasProfesorSeleccionadasAntiguas) {
                if (!mascotasProfesorSeleccionadas.some(registro => registro.id === mascotaAntigua.id)) {
                    const filtro = {
                        where: {
                            profesorId: objGuardar.id,
                            mascotaId: mascotaAntigua.id
                        }
                    }
                    const mascota = await getProfesorMascotas(JSON.stringify(filtro));
                    await deleteProfesorMascota(mascota[0].id);
                }

            }
            for (const hobbieAntiguo of hobbiesProfesorSeleccionadosAntiguos) {
                if (!hobbiesProfesorSeleccionados.some(registro => registro.id === hobbieAntiguo.id)) {
                    const filtro = {
                        where: {
                            profesorId: objGuardar.id,
                            hobbieId: hobbieAntiguo.id
                        }
                    }
                    const hobbie = await getProfesorHobbies(JSON.stringify(filtro));
                    await deleteProfesorHobbie(hobbie[0].id);
                }

            }
        }


        //Si existe el profesor y esta recien creado, lo inserta
        if (tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: tabla })) && !tiposSeleccionadosAntiguo.find(tipo => tipo.nombre === intl.formatMessage({ id: tabla }))) {
            profeGuardar['usuCreacion'] = getUsuarioSesion()?.id;
            const nuevoRegistro = await postProfesor(profeGuardar);
            objGuardar.id = nuevoRegistro.id
            await editarArchivos(objGuardar, objGuardar.id, tabla, usuarioId, listaTipoArchivosProfesor, listaTipoArchivosProfesorAntiguos)
        }
        //Si existia antes se edita
        else if (tiposSeleccionadosAntiguo.find(tipo => tipo.nombre === intl.formatMessage({ id: tabla })) && tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: tabla }))) {
            profeGuardar['usuModificacion'] = getUsuarioSesion()?.id;
            profeGuardar['id'] = objGuardar.id
            await patchProfesor(profeGuardar.id, profeGuardar);
            await editarArchivos(objGuardar, objGuardar.id, tabla, usuarioId, listaTipoArchivosProfesor, listaTipoArchivosProfesorAntiguos)
        }
        //Si existia antes y se ha eliminado, lo borra
        else if (
            tiposSeleccionadosAntiguo.find(tipo => tipo.nombre === intl.formatMessage({ id: tabla })) &&
            !tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: tabla }))
        ) {
            //borra el archivo
            objGuardar.documento = null
            await deleteProfesor(objGuardar.id);
            await editarArchivos(objGuardar, objGuardar.id, tabla, usuarioId, listaTipoArchivosProfesor, listaTipoArchivosProfesorAntiguos)
            return
        }

        //Guardamos las relaciones de profesor
        for (const enfermedad of enfermedadesProfesorSeleccionadas) {
            if (!enfermedadesProfesorSeleccionadasAntiguas.some(registro => registro.id === enfermedad.id)) {
                await postProfesorEnfermedad({ profesorId: objGuardar.id, enfermedadId: enfermedad.id });
            }
        }
        for (const alergia of alergiasProfesorSeleccionadas) {
            if (!alergiasProfesorSeleccionadasAntiguas.some(registro => registro.id === alergia.id)) {
                await postProfesorAlergia({ profesorId: objGuardar.id, alergiaId: alergia.id });
            }

        }
        for (const mascota of mascotasProfesorSeleccionadas) {
            if (!mascotasProfesorSeleccionadasAntiguas.some(registro => registro.id === mascota.id)) {
                await postProfesorMascota({ profesorId: objGuardar.id, mascotaId: mascota.id });
            }

        }
        for (const hobbie of hobbiesProfesorSeleccionados) {
            if (!hobbiesProfesorSeleccionadosAntiguos.some(registro => registro.id === hobbie.id)) {
                await postProfesorHobbie({ profesorId: objGuardar.id, hobbieId: hobbie.id });
            }

        }

    }

    const guardarAlumno = async (usuarioId) => {
        let objGuardar = { ...alumno };
        const alumnoGuardar = {
            usuarioId: usuarioId,
            nombre: objGuardar.nombre,
            apellido1: objGuardar.apellido1,
            apellido2: objGuardar.apellido2,
            documento: objGuardar.documento,
            direccion: objGuardar.direccion,
            fechaNacimiento: objGuardar.fecha_nacimiento === "" ? null : objGuardar.fecha_nacimiento,
            codigoPostal: codigoPostalSeleccionadoAlumno?.value,
            medicamentos: objGuardar.medicamentos,
            otros: objGuardar.otros,
            activoSn: objGuardar.activo_sn || 'N',
            soloSn: objGuardar.solo_sn || 'N',
            comunicacionesSn: objGuardar.comunicaciones_sn || 'N',
            seguroCancelacionSn: objGuardar.seguro_cancelacion_sn || 'N',
            seguroParticularCancelacionSn: objGuardar.seguro_particular_cancelacion_sn || 'N',
        }
        if (objGuardar.movil && objGuardar.movil.length > 0) {
            if (!objGuardar.movil.includes('+')) {
                alumnoGuardar.movil = '+' + objGuardar.movil;
            }
            else {
                alumnoGuardar.movil = objGuardar.movil;
            }
        }
        else {
            alumnoGuardar.movil = null;
        }
        // Tipo de documento
        const registroSeleccionado = listaTiposDocumentos.find(tipo => tipo.nombre === tipoDocumentoSeleccionadoAlumno)
        if (registroSeleccionado) {
            alumnoGuardar['tipoDocumento'] = registroSeleccionado.id;
        }

        // Comercial
        const registroComercial = listaComerciales.find(comercial => comercial.nombre === comercialAlumnoSeleccionado)
        if (registroComercial) {
            alumnoGuardar['comercialId'] = registroComercial.id;
        }

        // Dieta
        const registroDieta = listaDietas.find(dieta => dieta.nombre === dietaAlumnoSeleccionada)
        if (registroDieta) {
            alumnoGuardar['dietaId'] = registroDieta.id;
        }

        // Talla
        const registroTalla = listaTallas.find(talla => talla.nombre === tallaAlumnoSeleccionada)
        if (registroTalla) {
            alumnoGuardar['tallaId'] = registroTalla.id;
        }

        // Curso actual
        const registroCursoActual = listaCursos.find(curso => curso.nombre === cursoActualAlumnoSeleccionado)
        if (registroCursoActual) {
            alumnoGuardar['cursoActualId'] = registroCursoActual.id;
        }

        // Curso realizar
        const registroCursoRealizar = listaCursos.find(curso => curso.nombre === cursoRealizarAlumnoSeleccionado)
        if (registroCursoRealizar) {
            alumnoGuardar['cursoRealizarId'] = registroCursoRealizar.id;
        }

        // Nivel de idioma
        const registroNivelIdioma = listaNivelesIdioma.find(nivel => nivel.nombre === nivelIdiomaAlumnoSelecionado)
        if (registroNivelIdioma) {
            alumnoGuardar['nivelIdiomaId'] = registroNivelIdioma.id;
        }

        // Tutor
        // const registroSeleccionadoTutor = listaTutores.find(tipo => tipo.nombre === tutorAlumnoSeleccionado)
        // if (registroSeleccionadoTutor) {
        //     alumnoGuardar['tutorId'] = registroSeleccionadoTutor.id;
        // }

        // Compañero
        // const registroCompanyero = listaCompanyeros.find(tipo => tipo.nombre === companyerosAlumnoSeleccionados)
        // if (registroCompanyero) {
        //     alumnoGuardar['companyeroId'] = registroCompanyero.id;
        // }

        //Centro escolar
        const registroCentroAlumno = listaCentros.find(centro => centro.nombre === centroAlumno)
        if (registroCentroAlumno) {
            alumnoGuardar['centroEscolarId'] = registroCentroAlumno.id;
        }

        //Sexo
        if (sexoAlumnoSeleccionado) {
            alumnoGuardar['sexo'] = sexos.find(sexo => sexo.nombre === sexoAlumnoSeleccionado).valor;
        }

        //Limpiamos las relaciones
        if (objGuardar.id) {
            for (const nivelIdiomaAntiguo of nivelesIdiomaAlumnoSeleccionadosAntiguos) {
                if (!nivelesIdiomaAlumnoSeleccionados.some(registro => registro.id === nivelIdiomaAntiguo.id)) {
                    const filtro = {
                        where: {
                            alumnoId: objGuardar.id,
                            nivelIdiomaId: nivelIdiomaAntiguo.id
                        }
                    }
                    const nivelIdioma = await getAlumnoNivelesIdioma(JSON.stringify(filtro));
                    await deleteAlumnoNivelIdioma(nivelIdioma[0].id);
                }
            }
            for (const enfermedadAntigua of enfermedadesAlumnoSeleccionadasAntiguas) {
                if (!enfermedadesAlumnoSeleccionadas.some(registro => registro.id === enfermedadAntigua.id)) {
                    const filtro = {
                        where: {
                            alumnoId: objGuardar.id,
                            enfermedadId: enfermedadAntigua.id
                        }
                    }
                    const enfermedad = await getAlumnoEnfermedades(JSON.stringify(filtro));
                    await deleteAlumnoEnfermedad(enfermedad[0].id);
                }
            }
            for (const companyeroAntiguo of companyerosAntiguosAlumnoSeleccionados) {
                if (!companyerosAlumnoSeleccionados.some(registro => registro.id === companyeroAntiguo.id)) {
                    const filtro = {
                        where: {
                            alumnoId: objGuardar.id,
                            companyeroId: companyeroAntiguo.id
                        }
                    }
                    const companyero = await getAlumnoCompanyeros(JSON.stringify(filtro));
                    await deleteAlumnoCompanyero(companyero[0].id);
                }
            }
            for (const tutorAntiguo of tutoresAntiguosAlumnoSeleccionados) {
                if (!tutoresAlumnoSeleccionados.some(registro => registro.id === tutorAntiguo.id)) {
                    const filtro = {
                        where: {
                            alumnoId: objGuardar.id,
                            tutorId: tutorAntiguo.id
                        }
                    }
                    const tutor = await getAlumnoTutores(JSON.stringify(filtro));
                    await deleteAlumnoTutor(tutor[0].id);
                }
            }
            for (const alergiaAntigua of alergiasAlumnoSeleccionadasAntiguas) {
                if (!alergiasAlumnoSeleccionadas.some(registro => registro.id === alergiaAntigua.id)) {
                    const filtro = {
                        where: {
                            alumnoId: objGuardar.id,
                            alergiaId: alergiaAntigua.id
                        }
                    }
                    const alergia = await getAlumnoAlergias(JSON.stringify(filtro));
                    await deleteAlumnoAlergia(alergia[0].id);
                }

            }
            for (const mascotaAntigua of mascotasAlumnoSeleccionadasAntiguas) {
                if (!mascotasAlumnoSeleccionadas.some(registro => registro.id === mascotaAntigua.id)) {
                    const filtro = {
                        where: {
                            alumnoId: objGuardar.id,
                            mascotaId: mascotaAntigua.id
                        }
                    }
                    const mascota = await getAlumnoMascotas(JSON.stringify(filtro));
                    await deleteAlumnoMascota(mascota[0].id);
                }

            }
            for (const hobbieAntiguo of hobbiesAlumnoSeleccionadosAntiguos) {
                if (!hobbiesAlumnoSeleccionados.some(registro => registro.id === hobbieAntiguo.id)) {
                    const filtro = {
                        where: {
                            alumnoId: objGuardar.id,
                            hobbieId: hobbieAntiguo.id
                        }
                    }
                    const hobbie = await getAlumnoHobbies(JSON.stringify(filtro));
                    await deleteAlumnoHobbie(hobbie[0].id);
                }

            }
            for (const acompanyanteAntiguo of acompanyanteAntiguosAlumnoSeleccionados) {
                if (!acompanyanteAlumnoSeleccionados.some(registro => registro.id === acompanyanteAntiguo.id)) {
                    const filtro = {
                        where: {
                            alumnoId: objGuardar.id,
                            acompanyanteId: acompanyanteAntiguo.id
                        }
                    }
                    const acompanyante = await getAlumnoAcompanyantes(JSON.stringify(filtro));
                    await deleteAlumnoAcompanyante(acompanyante[0].id);
                }
            }
        }


        //Si existe el alumno y esta recien creado, lo inserta
        if (tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Alumno' })) && !tiposSeleccionadosAntiguo.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Alumno' }))) {
            alumnoGuardar['usuCreacion'] = getUsuarioSesion()?.id;
            const nuevoRegistro = await postAlumno(alumnoGuardar);
            objGuardar.id = nuevoRegistro.id
            await editarArchivos(alumno, objGuardar.id, 'Alumno', usuarioId, listaTipoArchivosAlumno, listaTipoArchivosAlumnoAntiguos)
        }
        //Si existia antes se edita
        else if (tiposSeleccionadosAntiguo.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Alumno' })) && tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Alumno' }))) {
            alumnoGuardar['usuModificacion'] = getUsuarioSesion()?.id;
            alumnoGuardar['id'] = objGuardar.id
            await patchAlumno(alumnoGuardar.id, alumnoGuardar);
            await editarArchivos(alumno, objGuardar.id, 'Alumno', usuarioId, listaTipoArchivosAlumno, listaTipoArchivosAlumnoAntiguos)
        }
        //Si existia antes y se ha eliminado, lo borra
        else if (
            tiposSeleccionadosAntiguo.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Alumno' })) &&
            !tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Alumno' }))
        ) {
            //borra el archivo
            alumno.documento = null;
            await deleteAlumno(objGuardar.id);
            await editarArchivos(alumno, objGuardar.id, 'Alumno', usuarioId, listaTipoArchivosAlumno, listaTipoArchivosAlumnoAntiguos)
            return
        }

        //Guardamos las relaciones de alumno
        for (const nivelIdioma of nivelesIdiomaAlumnoSeleccionados) {
            if (!nivelesIdiomaAlumnoSeleccionadosAntiguos.some(registro => registro.id === nivelIdioma.id)) {
                await postAlumnoNivelIdioma({ alumnoId: objGuardar.id, nivelIdiomaId: nivelIdioma.id });
            }
        }
        for (const enfermedad of enfermedadesAlumnoSeleccionadas) {
            if (!enfermedadesAlumnoSeleccionadasAntiguas.some(registro => registro.id === enfermedad.id)) {
                await postAlumnoEnfermedad({ alumnoId: objGuardar.id, enfermedadId: enfermedad.id });
            }
        }
        for (const companyero of companyerosAlumnoSeleccionados) {
            if (!companyerosAntiguosAlumnoSeleccionados.some(registro => registro.id === companyero.id)) {
                await postAlumnoCompanyero({ alumnoId: objGuardar.id, companyeroId: companyero.id });
            }
        }
        for (const tutor of tutoresAlumnoSeleccionados) {
            if (!tutoresAntiguosAlumnoSeleccionados.some(registro => registro.id === tutor.id)) {
                await postAlumnoTutor({ alumnoId: objGuardar.id, tutorId: tutor.id });
            }
        }
        for (const alergia of alergiasAlumnoSeleccionadas) {
            if (!alergiasAlumnoSeleccionadasAntiguas.some(registro => registro.id === alergia.id)) {
                await postAlumnoAlergia({ alumnoId: objGuardar.id, alergiaId: alergia.id });
            }

        }
        for (const mascota of mascotasAlumnoSeleccionadas) {
            if (!mascotasAlumnoSeleccionadasAntiguas.some(registro => registro.id === mascota.id)) {
                await postAlumnoMascota({ alumnoId: objGuardar.id, mascotaId: mascota.id });
            }

        }
        for (const hobbie of hobbiesAlumnoSeleccionados) {
            if (!hobbiesAlumnoSeleccionadosAntiguos.some(registro => registro.id === hobbie.id)) {
                await postAlumnoHobbie({ alumnoId: objGuardar.id, hobbieId: hobbie.id });
            }

        }
        for (const acompanyante of acompanyanteAlumnoSeleccionados) {
            if (!acompanyanteAntiguosAlumnoSeleccionados.some(registro => registro.id === acompanyante.id)) {
                await postAlumnoAcompanyante({ alumnoId: objGuardar.id, acompanyanteId: acompanyante.id });
            }
        }
    }
    const guardarAgente = async (usuarioId) => {
        let objGuardar = { ...agente };
        const agenteGuardar = {
            usuarioId: usuarioId,
            nombre: objGuardar.nombre,
            apellido1: objGuardar.apellido1,
            apellido2: objGuardar.apellido2,
            direccion: objGuardar.direccion,
            documento: objGuardar.documento,
            fechaNacimiento: objGuardar.fecha_nacimiento === "" ? null : objGuardar.fecha_nacimiento,
            codigoPostalId: codigoPostalSeleccionadoAgente?.value,
            activoSn: objGuardar.activo_sn || 'N',
            empresaId: getUsuarioSesion()?.empresaId,
        }
        if (objGuardar.movil && objGuardar.movil.length > 0) {
            if (!objGuardar.movil.includes('+')) {
                agenteGuardar.movil = '+' + objGuardar.movil;
            }
            else {
                agenteGuardar.movil = objGuardar.movil;
            }
        }
        else {
            agenteGuardar.movil = null;
        }
        // Tipo de documento
        const registroSeleccionado = listaTiposDocumentos.find(tipo => tipo.nombre === tipoDocumentoSeleccionadoAgente)
        if (registroSeleccionado) {
            agenteGuardar['tipoDocumentoId'] = registroSeleccionado.id;
        }

        //Sexo
        if (sexoAgenteSeleccionado) {
            agenteGuardar['sexo'] = sexos.find(sexo => sexo.nombre === sexoAgenteSeleccionado).valor;
        }

        //Si existe el agente y esta recien creado, lo inserta
        if (tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Agente' })) && !tiposSeleccionadosAntiguo.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Agente' }))) {
            agenteGuardar['usuCreacion'] = getUsuarioSesion()?.id;
            const nuevoRegistro = await postAgente(agenteGuardar);
            objGuardar.id = nuevoRegistro.id
            await editarArchivos(agente, objGuardar.id, 'Agente', usuarioId, listaTipoArchivosAgente, listaTipoArchivosAgenteAntiguos)
        }
        //Si existia antes se edita
        else if (tiposSeleccionadosAntiguo.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Agente' })) && tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Agente' }))) {
            agenteGuardar['usuModificacion'] = getUsuarioSesion()?.id;
            agenteGuardar['id'] = objGuardar.id
            await patchAgente(agenteGuardar.id, agenteGuardar);
            await editarArchivos(agente, objGuardar.id, 'Agente', usuarioId, listaTipoArchivosAgente, listaTipoArchivosAgenteAntiguos)
        }
        //Si existia antes y se ha eliminado, lo borra
        else if (
            tiposSeleccionadosAntiguo.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Agente' })) &&
            !tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Agente' }))
        ) {
            //borra el archivo
            agente.documento = null;
            await deleteAgente(objGuardar.id);
            await editarArchivos(agente, objGuardar.id, 'Agente', usuarioId, listaTipoArchivosAgente, listaTipoArchivosAgenteAntiguos)
            return
        }
    }

    const guardarFamiliaAcogida = async (usuarioId) => {
        let objGuardar = { ...familiaAcogida };
        const familiaGuardar = {
            usuarioId: usuarioId,
            direccion: objGuardar.direccion,
            activoSn: objGuardar.activo_sn || 'N',
            cocheSn: objGuardar.coche_sn || 'N',
            permiteAlumnosConDietaEspecialSn: objGuardar.permite_alumnos_con_dieta_especial_sn || 'N',
            permiteAlumnosConEnfermedadSn: objGuardar.permite_alumnos_con_enfermedad_sn || 'N',
            fumadorSn: objGuardar.fumador_sn || 'N',
        }
        if (objGuardar.numero_estudiantes === '') {
            familiaGuardar.numeroEstudiantes = 0;
        }
        else {
            familiaGuardar.numeroEstudiantes = parseInt(objGuardar.numero_estudiantes);
        }
        // Bonus
        const registroSeleccionado = listaBonus.find(bonus => bonus.nombre === bonusSeleccionado)
        if (registroSeleccionado) {
            familiaGuardar['bonusId'] = registroSeleccionado.id;
        }

        //Limpiamos las relaciones
        if (objGuardar.id) {
            for (const enfermedadAntigua of enfermedadesFamiliaAcogidaSeleccionadasAntiguas) {
                if (!enfermedadesFamiliaAcogidaSeleccionadas.some(registro => registro.id === enfermedadAntigua.id)) {
                    const filtro = {
                        where: {
                            familiaAcogidaId: objGuardar.id,
                            enfermedadId: enfermedadAntigua.id
                        }
                    }
                    const enfermedad = await getFamiliaAcogidaEnfermedades(JSON.stringify(filtro));
                    await deleteFamiliaAcogidaEnfermedad(enfermedad[0].id);
                }
            }
            for (const alergiaAntigua of alergiasFamiliaAcogidaSeleccionadasAntiguas) {
                if (!alergiasFamiliaAcogidaSeleccionadas.some(registro => registro.id === alergiaAntigua.id)) {
                    const filtro = {
                        where: {
                            familiaAcogidaId: objGuardar.id,
                            alergiaId: alergiaAntigua.id
                        }
                    }
                    const alergia = await getFamiliaAcogidaAlergias(JSON.stringify(filtro));
                    await deleteFamiliaAcogidaAlergia(alergia[0].id);
                }

            }
            for (const mascotaAntigua of mascotasFamiliaAcogidaSeleccionadasAntiguas) {
                if (!mascotasFamiliaAcogidaSeleccionadas.some(registro => registro.id === mascotaAntigua.id)) {
                    const filtro = {
                        where: {
                            familiaAcogidaId: objGuardar.id,
                            mascotaId: mascotaAntigua.id
                        }
                    }
                    const mascota = await getFamiliaAcogidaMascotas(JSON.stringify(filtro));
                    await deleteFamiliaAcogidaMascota(mascota[0].id);
                }

            }
            for (const hobbieAntiguo of hobbiesFamiliaAcogidaSeleccionadosAntiguos) {
                if (!hobbiesFamiliaAcogidaSeleccionados.some(registro => registro.id === hobbieAntiguo.id)) {
                    const filtro = {
                        where: {
                            familiaAcogidaId: objGuardar.id,
                            hobbieId: hobbieAntiguo.id
                        }
                    }
                    const hobbie = await getFamiliaAcogidaHobbies(JSON.stringify(filtro));
                    await deleteFamiliaAcogidaHobbie(hobbie[0].id);
                }

            }
        }

        //Si existe la familia acogida y está recién ceada, lo inserta
        if (tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Familia acogida' })) && !tiposSeleccionadosAntiguo.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Familia acogida' }))) {
            familiaGuardar['usuCreacion'] = getUsuarioSesion()?.id;
            const nuevoRegistro = await postFamiliaAcogida(familiaGuardar);
            objGuardar.id = nuevoRegistro.id
            await editarArchivos(familiaAcogida, objGuardar.id, 'Familia acogida', usuarioId, listaTipoArchivosFamiliaAcogida, listaTipoArchivosFamiliaAcogidaAntiguos)
        }
        //Si existía antes se edita
        else if (tiposSeleccionadosAntiguo.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Familia acogida' })) && tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Familia acogida' }))) {
            familiaGuardar['usuModificacion'] = getUsuarioSesion()?.id;
            familiaGuardar['id'] = objGuardar.id
            await patchFamiliaAcogida(familiaGuardar.id, familiaGuardar);
            await editarArchivos(familiaAcogida, objGuardar.id, 'Familia acogida', usuarioId, listaTipoArchivosFamiliaAcogida, listaTipoArchivosFamiliaAcogidaAntiguos)
        }
        //Si existía antes y se ha eliminado, lo borra
        else if (
            tiposSeleccionadosAntiguo.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Familia acogida' })) &&
            !tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Familia acogida' }))
        ) {
            //borra el archivo
            familiaAcogida.documento = null;
            await deleteFamiliaAcogida(objGuardar.id);
            await editarArchivos(familiaAcogida, objGuardar.id, 'Familia acogida', usuarioId, listaTipoArchivosFamiliaAcogida, listaTipoArchivosFamiliaAcogidaAntiguos)
            return
        }

        //Guardamos las relaciones de familia acogida
        for (const enfermedad of enfermedadesFamiliaAcogidaSeleccionadas) {
            if (!enfermedadesFamiliaAcogidaSeleccionadasAntiguas.some(registro => registro.id === enfermedad.id)) {
                await postFamiliaAcogidaEnfermedad({ familiaAcogidaId: objGuardar.id, enfermedadId: enfermedad.id });
            }
        }
        for (const alergia of alergiasFamiliaAcogidaSeleccionadas) {
            if (!alergiasFamiliaAcogidaSeleccionadasAntiguas.some(registro => registro.id === alergia.id)) {
                await postFamiliaAcogidaAlergia({ idFamiliaAcogidaId: objGuardar.id, idAlergiaId: alergia.id });
            }

        }
        for (const mascota of mascotasFamiliaAcogidaSeleccionadas) {
            if (!mascotasFamiliaAcogidaSeleccionadasAntiguas.some(registro => registro.id === mascota.id)) {
                await postFamiliaAcogidaMascota({ familiaAcogidaId: objGuardar.id, mascotaId: mascota.id });
            }

        }
        for (const hobbie of hobbiesFamiliaAcogidaSeleccionados) {
            if (!hobbiesFamiliaAcogidaSeleccionadosAntiguos.some(registro => registro.id === hobbie.id)) {
                await postFamiliaAcogidaHobbie({ familiaAcogidaId: objGuardar.id, hobbieId: hobbie.id });
            }

        }

    }

    const guardarAcompanyante = async (usuarioId) => {
        let objGuardar = { ...acompanyante };
        const acompanyanteGuardar = {
            usuarioId: usuarioId,
            nombre: objGuardar.nombre,
            apellido1: objGuardar.apellido1,
            apellido2: objGuardar.apellido2,
            direccion: objGuardar.direccion,
            documento: objGuardar.documento,
            movil: objGuardar.movil,
            sexo: objGuardar.sexo,
            fechaNacimiento: objGuardar.fecha_nacimiento === "" ? null : objGuardar.fecha_nacimiento,
            codigoPostalId: codigoPostalSeleccionadoAcompanyante?.value,
            activoSn: objGuardar.activo_sn || 'N',
            empresaId: getUsuarioSesion()?.empresaId,
        }

        if (objGuardar.movil && objGuardar.movil.length > 0) {
            if (!objGuardar.movil.includes('+')) {
                acompanyanteGuardar.movil = '+' + objGuardar.movil;
            }
            else {
                acompanyanteGuardar.movil = objGuardar.movil;
            }
        }
        else {
            acompanyanteGuardar.movil = null;
        }
        // Tipo de documento
        const registroSeleccionado = listaTiposDocumentos.find(tipo => tipo.nombre === tipoDocumentoSeleccionadoAcompanyante)
        if (registroSeleccionado) {
            acompanyanteGuardar['tipoDocumentoId'] = registroSeleccionado.id;
        }

        //Sexo
        if (sexoAcompanyanteSeleccionado) {
            acompanyanteGuardar['sexo'] = sexos.find(sexo => sexo.nombre === sexoAcompanyanteSeleccionado).valor;
        }

        //Si existe el acompanyante y esta recien creado, lo inserta
        if (tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Acompañante' })) && !tiposSeleccionadosAntiguo.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Acompañante' }))) {
            acompanyanteGuardar['usuCreacion'] = getUsuarioSesion()?.id;
            const nuevoRegistro = await postAcompanyante(acompanyanteGuardar);
            objGuardar.id = nuevoRegistro.id
            await editarArchivos(acompanyante, objGuardar.id, 'Acompañante', usuarioId, listaTipoArchivosAcompanyante, listaTipoArchivosAcompanyanteAntiguos)
        }
        //Si existia antes se edita
        else if (tiposSeleccionadosAntiguo.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Acompañante' })) && tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Acompañante' }))) {
            acompanyanteGuardar['usuModificacion'] = getUsuarioSesion()?.id;
            acompanyanteGuardar['id'] = objGuardar.id
            await patchAcompanyante(acompanyanteGuardar.id, acompanyanteGuardar);
            await editarArchivos(acompanyante, objGuardar.id, 'Acompañante', usuarioId, listaTipoArchivosAcompanyante, listaTipoArchivosAcompanyanteAntiguos)
        }
        //Si existia antes y se ha eliminado, lo borra
        else if (
            tiposSeleccionadosAntiguo.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Acompañante' })) &&
            !tiposSeleccionados.find(tipo => tipo.nombre === intl.formatMessage({ id: 'Acompañante' }))
        ) {
            //borra el archivo
            acompanyante.documento = null;
            await deleteAcompanyante(objGuardar.id);
            await editarArchivos(acompanyante, objGuardar.id, 'Acompañante', usuarioId, listaTipoArchivosAcompanyante, listaTipoArchivosAcompanyanteAntiguos)
            return
        }
    }

    //Compara los archivos del registro antes de ser editado para actualizar los archivos
    const editarArchivos = async (registro, id, seccion, usuario, listaTipoArchivos, listaTipoArchivosAntiguos) => {
        for (const tipoArchivo of listaTipoArchivos) {
            if (Array.isArray(registro[(tipoArchivo.nombre).toLowerCase()])) {
                await editarArchivosMultiples(registro, id, seccion, listaTipoArchivos, listaTipoArchivosAntiguos, usuario);
                return
            }
            //Comprueba que si ha añadido una imagen
            if (registro[(tipoArchivo.nombre).toLowerCase()]?.type !== undefined) {
                //Si ya existia antes una imagen, hay que eliminarla junto a su version redimensionada
                if (listaTipoArchivosAntiguos[tipoArchivo['nombre']] != null) {
                    await borrarFichero(listaTipoArchivosAntiguos[tipoArchivo['nombre']]);
                    await deleteArchivo(registro[`${(tipoArchivo.nombre).toLowerCase()}Id`]);
                    //Tambien borra la version sin redimensionar
                    if ((tipoArchivo.tipo).toLowerCase() === 'imagen') {
                        let url = (listaTipoArchivosAntiguos[tipoArchivo['nombre']]).replace(/(\/[^\/]+\/)1250x850_([^\/]+\.\w+)$/, '$1$2');
                        await borrarFichero(url);

                        //Borra el avatar
                        url = url.replace(/(\/[^\/]+\/)([^\/]+\.\w+)$/, '$132x32_$2');
                        await borrarFichero(url);
                    }

                }
                //Se inserta la imagen modificada
                await insertarArchivo(registro[(tipoArchivo.nombre).toLowerCase()], id, tipoArchivo, seccion, usuario)
            }
            else {
                //Si ya existia antes una imagen y se ha borrado, hay que eliminarla junto a su version redimensionada
                if (listaTipoArchivosAntiguos[tipoArchivo['nombre']] !== null && registro[(tipoArchivo.nombre).toLowerCase()] === null) {
                    await borrarFichero(listaTipoArchivosAntiguos[tipoArchivo['nombre']]);
                    await deleteArchivo(registro[`${(tipoArchivo.nombre).toLowerCase()}Id`]);
                    //Tambien borra la version sin redimensionar
                    if ((tipoArchivo.tipo).toLowerCase() === 'imagen') {
                        let url = (listaTipoArchivosAntiguos[tipoArchivo['nombre']]).replace(/(\/[^\/]+\/)1250x850_([^\/]+\.\w+)$/, '$1$2');
                        await borrarFichero(url);

                        //Borra el avatar
                        url = url.replace(/(\/[^\/]+\/)([^\/]+\.\w+)$/, '$132x32_$2');
                        await borrarFichero(url);
                    }
                }
            }
        }
    };

    //Compara los archivos del registro antes de ser editado para actualizar los archivos
    const editarArchivosMultiples = async (registro, id, seccion, listaTipoArchivos, listaTipoArchivosAlumnoAntiguos, usuario) => {
        for (const tipoArchivo of listaTipoArchivos) {
            if (listaTipoArchivosAlumnoAntiguos[tipoArchivo.nombre]) {
                //Recorre los archivos antiguos para eliminarlos en caso de que sea necesario
                for (const archivoAntiguo of listaTipoArchivosAlumnoAntiguos[tipoArchivo.nombre]) {
                    //Obtiene el nombre del archivo para compararlo
                    const archivoAntiguoNombre = archivoAntiguo.url.split('/').pop();
                    //Comprueba si el archivo antiguo existe en el registro
                    const archivoExisteEnRegistro = registro[(tipoArchivo.nombre).toLowerCase()].find(item => item.name === archivoAntiguoNombre || item.url === archivoAntiguo.url);

                    //Si es undefined, significa que no existe en el array de registro por lo que se ha eliminado
                    if (archivoExisteEnRegistro === undefined) {
                        await borrarFichero(archivoAntiguo.url);
                        await deleteArchivo(archivoAntiguo.id);
                        //Tambien borra la version sin redimensionar
                        //Funcion provisional porque no tengo manera de saber si x archivo de x tipo de input es imagen o no solo con el url
                        if (esUrlImagen(archivoAntiguo.url)) {
                            const url = (archivoAntiguo.url).replace(/(\/[^\/]+\/)1250x850_([^\/]+\.\w+)$/, '$1$2');
                            await borrarFichero(url);
                        }
                    }
                }
            }
            if (registro[(tipoArchivo.nombre).toLowerCase()]) {
                for (const archivoNuevo of registro[(tipoArchivo.nombre).toLowerCase()]) {
                    //Comprueba si el archivo antiguo existe en el registro
                    if (listaTipoArchivosAlumnoAntiguos[tipoArchivo.nombre]) {
                        const archivoExisteEnArchivosAntiguos = listaTipoArchivosAlumnoAntiguos[tipoArchivo.nombre].find(item => item.url.split('/').pop() === archivoNuevo.name || item.url === archivoNuevo.url);
                        //Si es undefined, significa que no existe en el array de los archivos antiguos por lo que se ha insertado
                        if (archivoExisteEnArchivosAntiguos === undefined) {
                            await insertarArchivo(archivoNuevo, id, tipoArchivo, seccion, usuario);
                        }
                    }
                    else {
                        //Si antes no existia ni un solo archivo, no nos molestamos en comprobar si existe o no en el registro
                        await insertarArchivo(archivoNuevo, id, tipoArchivo, seccion, usuario);
                    }
                }
            }
        }
    };

    const muevePestanya = async (pestanya) => {
        const centroEscolarPestanya = pestanyasTipoUsuario.find(tipo => tipo.title === intl.formatMessage({ id: pestanya }));
        const index = pestanyasTipoUsuario.indexOf(centroEscolarPestanya);
        setActiveIndex(index);
    }

    const insertarArchivo = async (archivo, id, tipoArchivo, seccion, usuario) => {
        //Comprueba que el input haya sido modificado
        if (archivo?.type !== undefined) {
            //Comprueba si el tipo de archivo es una imagen para la subida
            let response = null;
            if ((tipoArchivo.tipo).toLowerCase() === 'imagen') {
                if (seccion === 'Usuario') {
                    response = await postSubirAvatar(seccion, archivo.name, archivo);
                }
                response = await postSubirImagen(seccion, archivo.name, archivo);
            }
            else {
                response = await postSubirFichero(seccion, archivo.name, archivo);
            }
            //Hace el insert en la tabla de archivos
            const objArchivo = {}
            objArchivo['usuCreacion'] = usuario;
            objArchivo['empresaId'] = Number(localStorage.getItem('empresa'));
            objArchivo['tipoArchivoId'] = tipoArchivo.id;
            objArchivo['url'] = response.originalUrl;
            objArchivo['idTabla'] = id;
            objArchivo['tabla'] = seccion.toLowerCase();
            await postArchivo(objArchivo);
        }
    }


    const cancelarEdicion = () => {
        setIdEditar(null)
    };

    const header = idEditar > 0 ? (editable ? intl.formatMessage({ id: 'Editar' }) : intl.formatMessage({ id: 'Ver' })) : intl.formatMessage({ id: 'Nuevo' });

    const onTabChange = async (e) => {
        setActiveIndex(e.index);
    };

    const validaDocumento = (documento, tipoDocumento) => {
        if (documento && tipoDocumento) {
            //Tipos de documento españoles
            if (tipoDocumento === 'Documento Nacional de Identidad' ||
                tipoDocumento === 'Número de Identidad de Extranjero') {
                return validaDocumentoIdentidad(documento, 'ES')
            }
            //Tipos de documento franceses
            else if (tipoDocumento === `Carte Nationale d'Identité`) {
                return validaDocumentoIdentidad(documento, 'FR')
            }
            //Tipos de documento alemanes
            else if (tipoDocumento === 'Personalausweis') {
                return validaDocumentoIdentidad(documento, 'DE')
            }
            //Tipos de documento portugueses
            else if (tipoDocumento === 'Cartão de Cidadão ') {
                return validaDocumentoIdentidad(documento, 'PT')
            }
            //Tipos de documento anglosajones
            else if (tipoDocumento === 'British passport') {
                return validaDocumentoIdentidad(documento, 'GB')
            }
            return false
        }
        else {
            return false;
        }
    }

    // === Visibilidad pestañas Exámenes/Tutores para Alumno ===
    const labelAlumno = intl.formatMessage({ id: 'Alumno' });

    // Fuente de verdad: lo que está seleccionado en la UI ahora mismo.
    // (si no hay tiposSeleccionados, probamos con rowData.tipos del registro cargado)
    const tiposUI = Array.isArray(tiposSeleccionados)
        ? tiposSeleccionados
        : (Array.isArray(rowData?.tipos) ? rowData.tipos : []);

    const nombreTipo = (t) =>
        (t?.nombre ?? t?.label ?? t?.value ?? '').toString().toLowerCase();

    // Mostrar SOLO si el multiselect contiene Alumno
    const mostrarTabsAlumno = tiposUI.some(
        (t) =>
            nombreTipo(t) === 'alumno' ||
            nombreTipo(t) === labelAlumno.toLowerCase() ||
            (t?.codigo?.toString?.().toUpperCase?.() === 'ALUMNO')
    );

    return (
        <div>
            <div className="grid Empresa">
                <div className="col-12">
                    <div className="card">
                        <Toast ref={toast} position="top-right" />
                        <h2>{header} {(intl.formatMessage({ id: 'Usuario' })).toLowerCase()}</h2>
                        <EditarDatosUsuario
                            usuario={usuario}
                            setUsuario={setUsuario}
                            listaEmpresas={listaEmpresas}
                            empresaSeleccionada={empresaSeleccionada}
                            setEmpresaSeleccionada={setEmpresaSeleccionada}
                            tipoIvaSeleccionado={tipoIvaSeleccionado}
                            setTipoIvaSeleccionado={setTipoIvaSeleccionado}
                            listaTiposIva={listaTiposIva}
                            listaRoles={listaRoles}
                            rolSeleccionado={rolSeleccionado}
                            setRolSeleccionado={setRolSeleccionado}
                            listaIdiomas={listaIdiomas}
                            idiomaSeleccionado={idiomaSeleccionado}
                            setIdiomaSeleccionado={setIdiomaSeleccionado}
                            estadoGuardando={estadoGuardando}
                            listaTipoArchivos={listaTipoArchivos}
                            tiposSeleccionados={tiposSeleccionados}
                            setTiposSeleccionados={setTiposSeleccionados}
                            tipos={tipos}

                        />
                        <Divider type="solid" />
                        <TabView scrollable>
                            {pestanyasTipoUsuario.length > 0 && (
                                <TabPanel header={intl.formatMessage({ id: 'Informacion' })}>
                                    <TabView activeIndex={activeIndex} scrollable onTabChange={onTabChange}>
                                        {pestanyasTipoUsuario.map((tab) => (
                                            <TabPanel key={tab.title} header={tab.title}>
                                                {tab.content}
                                            </TabPanel>
                                        ))}
                                    </TabView>
                                </TabPanel>
                            )}



                                {mostrarTabsAlumno && (
                                <TabPanel header={intl.formatMessage({ id: 'Examenes' })}>
                                    <ExamenesAlumno usuarioId={idEditar} />
                                </TabPanel>
                            )}


                                {mostrarTabsAlumno && (
                                <TabPanel header={intl.formatMessage({ id: 'Tutores' })}>
                                    <TutoresAlumno usuarioId={idEditar} />
                                </TabPanel>
                            )}


                            {mostrarHijosTutor == true && (
                                <TabPanel header={intl.formatMessage({ id: 'Hijos' })}>

                                    <TutorAlumnos usuarioId={idEditar} />
                                </TabPanel>
                            )}


                            {mostrarAlumnosAcompanyante == true && (
                                <TabPanel header={intl.formatMessage({ id: 'Alumnos' })}>

                                    <AlumnosAcompanyante usuarioId={idEditar} />
                                </TabPanel>
                            )}

                            <TabPanel header={intl.formatMessage({ id: 'Datos para facturas' })}>
                                <DatosParaFacutras usuarioId={idEditar} />
                            </TabPanel>
                            <TabPanel header={intl.formatMessage({ id: 'Facturas emitidas' })}>

                                <FacturasEmitidas usuarioId={idEditar} />
                            </TabPanel>
                            <TabPanel header={intl.formatMessage({ id: 'Mensajes' })}>

                            </TabPanel>
                            <TabPanel header={intl.formatMessage({ id: 'Cuenta bancaria' })}>
                                <CuentaBancariaUsuario usuarioId={idEditar} />
                            </TabPanel>
                            <TabPanel header={intl.formatMessage({ id: 'Incidencias' })}>
                                <Incidencias usuarioId={idEditar} />
                            </TabPanel>
                            <TabPanel header={intl.formatMessage({ id: 'Cobros' })}>
                                <Cobros usuarioId={idEditar} />
                            </TabPanel>
                            <TabPanel header={intl.formatMessage({ id: 'Historico de contraseñas' })}>
                                <PasswordHistorico
                                    usuarioId={idEditar}
                                />
                            </TabPanel>
                            <TabPanel header={intl.formatMessage({ id: 'Archivos' })}>
                                <ArchivosUsuario
                                    usuCreacion={idEditar}
                                />
                            </TabPanel>

                        </TabView>
                        <div className="flex justify-content-end mt-2">
                            {editable && (
                                <Button
                                    label={estadoGuardandoBoton ? `${intl.formatMessage({ id: 'Guardando' })}...` : intl.formatMessage({ id: 'Guardar' })}
                                    icon={estadoGuardandoBoton ? "pi pi-spin pi-spinner" : null}
                                    onClick={guardarUsuario}
                                    className="mr-2"
                                    disabled={estadoGuardandoBoton}
                                />
                            )}
                            {sePuedeCancelar && (
                                <Button label={intl.formatMessage({ id: 'Cancelar' })} onClick={cancelarEdicion} className="p-button-secondary" />
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditarUsuario;