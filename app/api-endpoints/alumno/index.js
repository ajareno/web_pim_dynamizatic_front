import {
    AlumnoAlergiaControllerApi,
    AlumnoControllerApi,
    AlumnoEnfermedadControllerApi,
    AlumnoHobbieControllerApi,
    AlumnoMascotaControllerApi,
    AlumnoNivelIdiomaControllerApi,
    AlumnoTutorControllerApi,
    TutorControllerApi,
    settings
} from "@/app/api-nathalie";
const apiAlumno = new AlumnoControllerApi(settings)

const apiAlumnoAlergia = new AlumnoAlergiaControllerApi(settings)
const apiAlumnoMascota = new AlumnoMascotaControllerApi(settings)
const apiAlumnoEnfermedad = new AlumnoEnfermedadControllerApi(settings)
const apiAlumnoHobbie = new AlumnoHobbieControllerApi(settings)
const apiAlumnoNivelIdioma = new AlumnoNivelIdiomaControllerApi(settings)
const apiAlumnoTutor = new AlumnoTutorControllerApi(settings);
const apiTutor = new TutorControllerApi(settings);

export const getAlumnos = async (filtro) => {
    const { data: dataAlumnos } = await apiAlumno.alumnoControllerFind(filtro)
    return dataAlumnos
}

//Funcion que juega con los endpoints de alumnos y tutores para obtener los alumnos de un agente
export const getAlumnosAgente = async (filtro) => {
    const { data: dataTutores } = await apiTutor.tutorControllerFind(filtro)
    const filtroTutorAlumnos = {
        where: {
            tutorId: { inq: dataTutores.map(tutor => tutor.id) }
        }
    }
    const { data: dataAlumnoTutores } = await apiAlumnoTutor.alumnoTutorControllerFind(JSON.stringify(filtroTutorAlumnos));
    const alumnos = []
    for (const alumnoTutor of dataAlumnoTutores) {
        const filtroAlumno = {
            where: {
                and: {
                    id: alumnoTutor.alumnoId,
                }
            }
        }
        //Aqui no usamos el find by id porque nos devuelve el objeto con las propiedades del modelo
        const { data: dataAlumnos } = await apiAlumno.alumnoControllerFind(JSON.stringify(filtroAlumno))
        alumnos.push(dataAlumnos[0])
    }

    return alumnos
}

export const getAlumnosCount = async (filtro) => {
    const { data: dataAlumnos } = await apiAlumno.alumnoControllerCount(filtro)
    return dataAlumnos
}

export const postAlumno = async (objAlumno) => {
    const { data: dataAlumno } = await apiAlumno.alumnoControllerCreate(objAlumno)
    return dataAlumno
}

export const patchAlumno = async (idAlumno, objAlumno) => {
    const { data: dataAlumno } = await apiAlumno.alumnoControllerUpdateById(idAlumno, objAlumno)
    return dataAlumno
}

export const deleteAlumno = async (idAlumno) => {
    const { data: dataAlumno } = await apiAlumno.alumnoControllerDeleteById(idAlumno)
    return dataAlumno
}

export const getAlumnoAlergias = async (filtro) => {
    const { data: dataCentrosEscolares } = await apiAlumnoAlergia.alumnoAlergiaControllerFind(filtro)
    return dataCentrosEscolares
}

export const getAlumnoMascotas = async (filtro) => {
    const { data: dataCentrosEscolares } = await apiAlumnoMascota.alumnoMascotaControllerFind(filtro)
    return dataCentrosEscolares
}

export const getAlumnoHobbies = async (filtro) => {
    const { data: dataCentrosEscolares } = await apiAlumnoHobbie.alumnoHobbieControllerFind(filtro)
    return dataCentrosEscolares
}

export const getAlumnoEnfermedades = async (filtro) => {
    const { data: dataCentrosEscolares } = await apiAlumnoEnfermedad.alumnoEnfermedadControllerFind(filtro)
    return dataCentrosEscolares
}

export const postAlumnoAlergia = async (objAlumnoAlergia) => {
    const { data: dataAlumnoAlergia } = await apiAlumnoAlergia.alumnoAlergiaControllerCreate(objAlumnoAlergia)
    return dataAlumnoAlergia
}

export const postAlumnoMascota = async (objAlumnoMascota) => {
    const { data: dataAlumnoMascota } = await apiAlumnoMascota.alumnoMascotaControllerCreate(objAlumnoMascota)
    return dataAlumnoMascota
}

export const postAlumnoHobbie = async (objAlumnoHobbie) => {
    const { data: dataAlumnoHobbie } = await apiAlumnoHobbie.alumnoHobbieControllerCreate(objAlumnoHobbie)
    return dataAlumnoHobbie
}

export const postAlumnoEnfermedad = async (objAlumnoEnfermedad) => {
    const { data: dataAlumnoEnfermedad } = await apiAlumnoEnfermedad.alumnoEnfermedadControllerCreate(objAlumnoEnfermedad)
    return dataAlumnoEnfermedad
}

export const patchAlumnoAlergia = async (idAlumnoAlergia, objAlumnoAlergia) => {
    const { data: dataAlumnoAlergia } = await apiAlumnoAlergia.alumnoAlergiaControllerUpdateById(idAlumnoAlergia, objAlumnoAlergia)
    return dataAlumnoAlergia
}

export const patchAlumnoMascota = async (idAlumnoMascota, objAlumnoMascota) => {
    const { data: dataAlumnoMascota } = await apiAlumnoMascota.alumnoMascotaControllerUpdateById(idAlumnoMascota, objAlumnoMascota)
    return dataAlumnoMascota
}

export const patchAlumnoHobbie = async (idAlumnoHobbie, objAlumnoHobbie) => {
    const { data: dataAlumnoHobbie } = await apiAlumnoHobbie.alumnoHobbieControllerUpdateById(idAlumnoHobbie, objAlumnoHobbie)
    return dataAlumnoHobbie
}

export const patchAlumnoEnfermedad = async (idAlumnoEnfermedad, objAlumnoEnfermedad) => {
    const { data: dataAlumnoEnfermedad } = await apiAlumnoEnfermedad.alumnoEnfermedadControllerUpdateById(idAlumnoEnfermedad, objAlumnoEnfermedad)
    return dataAlumnoEnfermedad
}

export const deleteAlumnoAlergia = async (idAlumnoAlergia) => {
    const { data: dataAlumnoAlergia } = await apiAlumnoAlergia.alumnoAlergiaControllerDeleteById(idAlumnoAlergia)
    return dataAlumnoAlergia
}

export const deleteAlumnoMascota = async (idAlumnoMascota) => {
    const { data: dataAlumnoMascota } = await apiAlumnoMascota.alumnoMascotaControllerDeleteById(idAlumnoMascota)
    return dataAlumnoMascota
}

export const deleteAlumnoHobbie = async (idAlumnoHobbie) => {
    const { data: dataAlumnoHobbie } = await apiAlumnoHobbie.alumnoHobbieControllerDeleteById(idAlumnoHobbie)
    return dataAlumnoHobbie
}

export const deleteAlumnoEnfermedad = async (idAlumnoEnfermedad) => {
    const { data: dataAlumnoEnfermedad } = await apiAlumnoEnfermedad.alumnoEnfermedadControllerDeleteById(idAlumnoEnfermedad)
    return dataAlumnoEnfermedad
}

export const getAlumnoNivelesIdioma = async (filtro) => {
    const { data: dataNivelIdiomas } = await apiAlumnoNivelIdioma.alumnoNivelIdiomaControllerFind(filtro)
    return dataNivelIdiomas
}

export const postAlumnoNivelIdioma = async (objAlumnoNivelIdioma) => {
    const { data: dataAlumnoNivelIdioma } = await apiAlumnoNivelIdioma.alumnoNivelIdiomaControllerCreate(objAlumnoNivelIdioma)
    return dataAlumnoNivelIdioma
}

export const patchAlumnoNivelIdioma = async (idAlumnoNivelIdioma, objAlumnoNivelIdioma) => {
    const { data: dataAlumnoNivelIdioma } = await apiAlumnoNivelIdioma.alumnoNivelIdiomaControllerUpdateById(idAlumnoNivelIdioma, objAlumnoNivelIdioma)
    return dataAlumnoNivelIdioma
}

export const deleteAlumnoNivelIdioma = async (idAlumnoNivelIdioma) => {
    const { data: dataAlumnoNivelIdioma } = await apiAlumnoNivelIdioma.alumnoNivelIdiomaControllerDeleteById(idAlumnoNivelIdioma)
    return dataAlumnoNivelIdioma
}

export const getVistaAlumnoTutores = async (filtro) => {
  const { data: dataVistaAlumnoTutores } = await apiAlumno.alumnoControllerVistaAlumnoTutores(filtro);
  return dataVistaAlumnoTutores;
}

export const getVistaAlumnoTutoresCount = async (filtro) => {
  const { data: dataVistaAlumnoTutores } =  await apiAlumno.alumnoControllerCountVistaAlumnoTutores(filtro);
  return dataVistaAlumnoTutores;
}

export const getVistaAlumnoExamenes = async (filtro) => {
  const { data: dataVistaAlumnoTutores } = await apiAlumno.alumnoControllerVistaAlumnoExamen(filtro);
  return dataVistaAlumnoTutores;
}

export const getVistaAlumnoExamenesCount = async (filtro) => {
  const { data: dataVistaAlumnoTutores } =  await apiAlumno.alumnoControllerVistaAlumnoExamenCount(filtro);
  return dataVistaAlumnoTutores;
}
