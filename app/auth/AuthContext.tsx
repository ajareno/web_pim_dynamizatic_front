"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { obtenerRolDashboard } from "@/app/api-endpoints/rol";
import Cookies from 'js-cookie';
import { emptyCache } from '../utility/Utils';
import jwt from "@/app/auth/jwt/useJwt";
import { getEmpresa } from "@/app/api-endpoints/empresa";
import { postLogUsuario } from "@/app/api-endpoints/log_usuario";
import { getIdioma } from "@/app/api-endpoints/idioma";
import { getVistaEmpresaRol } from "@/app/api-endpoints/rol";
import { getVistaTipoArchivoEmpresaSeccion } from "@/app/api-endpoints/tipo_archivo";
import { getVistaArchivoEmpresa } from "@/app/api-endpoints/archivo";
import { obtenerTodosLosPermisos } from "@/app/components/shared/componentes";
interface AuthContextProps {
  usuarioAutenticado: boolean;
  login: (token: string, rememberMe: boolean, data: any) => void;
  loginSinDashboard: (token: string, rememberMe: boolean, data: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const config = jwt.jwtConfig;

  useEffect(() => {
    const token = Cookies.get('authToken');
    //Si usuario esta autenticado o esta en la pagina de publica de autenticacion, se le permite el acceso
    if (token || pathname.includes('/auth/')) {
      setUsuarioAutenticado(true);
    } else {
      setUsuarioAutenticado(false);
      router.push('/auth/login');
    }
  }, [router]);

  const login = async (token: string, rememberMe: boolean, data: any) => {
    Cookies.set('authToken', token, { expires: rememberMe ? 7 : undefined });
    setUsuarioAutenticado(true);
    await almacenarLogin(data);
    router.push(await obtenerRolDashboard());
  };

  //Login que se usa cuando no queremos redirigir al usuario, util para cuando queremos entrar para hacer el registro del usuario
  const loginSinDashboard = async (token: string, rememberMe: boolean, data: any) => {
    Cookies.set('authToken', token, { expires: rememberMe ? 7 : undefined });
    await almacenarLogin(data);
    setUsuarioAutenticado(true);
    //router.push(await obtenerRolDashboard());
  };

  //Obtenemos el menu lateral a en base a los permisos del usuario
  const getMenuLateral = async () => {
    // Este objeto contiene las rutas y los iconos asociados a cada permiso
    const jsonRutas: Record<string, Record<string, { path: string; icon: string }>> = {
      "Tablas maestras": {
        
        "Categorias del planificador": {
          "path": "/tablas-maestras/planificador_categoria",
          "icon": "pi pi-fw pi-tags"
        },
        "Estados del planificador": {
          "path": "/tablas-maestras/planificador_estado",
          "icon": "pi pi-fw pi-flag"
        }        
      },
      "Tablas de sistema": {
        "Empresas": {
          "path": "/tablas-maestras/empresa",
          "icon": "pi pi-fw pi-building"
        },
        "Secciones": {
          "path": "/tablas-maestras/seccion",
          "icon": "pi pi-fw pi-table"
        },
        "Tipos de archivo": {
          "path": "/tablas-maestras/tipo_archivo",
          "icon": "pi pi-fw pi-file"
        },        
        "Archivos": {
          "path": "/tablas-maestras/archivo",
          "icon": "pi pi-fw pi-folder"
        },
        "Plantillas de correo": {
          "path": "/tablas-maestras/plantilla_email",
          "icon": "pi pi-fw pi-envelope"
        },
        "Roles": {
          "path": "/tablas-maestras/rol",
          "icon": "pi pi-fw pi-id-card"
        },
        "Log de usuarios": {
          "path": "/tablas-maestras/log_usuario",
          "icon": "pi pi-fw pi-history"
        },
        "Permisos": {
          "path": "/tablas-maestras/permiso",
          "icon": "pi pi-fw pi-key"
        }
      },
      "Traducciones": {
        "Idiomas": {
          "path": "/tablas-maestras/idioma",
          "icon": "pi pi-fw pi-language"
        },
        "Traducciones": {
          "path": "/tablas-maestras/traduccion",
          "icon": "pi pi-fw pi-refresh"
        }
      },
      "Otros": {
        "Usuarios": {
          "path": "/usuarios",
          "icon": "pi pi-fw pi-user-edit"
        }        
      }
    }

    // Obtener los permisos del usuario actual de "Acceder" a las rutas
    const permisos = await obtenerTodosLosPermisos('Acceder');
    // Declaramos el objeto que sera el menu final y le ponemos un titulo de menu
    const jsonPermisos: {
      label: string;
      icon: string;
      items: { label: string; icon: string; items: { label: string; icon: string; to: string; }[] }[];
    } = {
      label: "Menu",
      icon: "pi pi-fw pi-minus",
      items: []
    };

    // Recorremos las categorias y subcategorias del objeto jsonRutas
    for (const categoria in jsonRutas) {
      const categoriaItems = [];
      for (const subCategoria in jsonRutas[categoria] as Record<string, { path: string; icon: string }>) {
        if (Array.isArray(permisos)) {
          // Si existe un permiso en el array que tenga de nombre de controlador el nombre de la subcategoria,
          // Significa que el usuario tiene acceso a esa pantalla y por lo tanto la añadimos al menu
          if (permisos.some((permiso) => permiso.permiso_controlador === subCategoria)) {
            categoriaItems.push({
              label: `${subCategoria}`,
              icon: jsonRutas[categoria][subCategoria].icon,
              // command: () => {
              //     router.push(jsonRutas[categoria][subCategoria].path, { shallow: true });
              // },
              to: jsonRutas[categoria][subCategoria].path,
            });
          }
        }
      }
      //Construimos las categorias que tendran sus items
      const categoriaJson = {
        label: `${categoria}`,
        icon: "pi pi-fw pi-minus",
        items: categoriaItems
      }
      // Si la categoria no tiene items, no la añadimos al menu
      if (categoriaItems.length > 0) {
        jsonPermisos['items'].push(categoriaJson);
      }
    }
    localStorage.setItem('menuLateral', JSON.stringify([jsonPermisos]));
  }

  const almacenarLogin = async (data: any) => {
    localStorage.setItem(config.storageTokenKeyName, JSON.stringify(data.accessToken));
    localStorage.setItem('userDataNathalie', JSON.stringify({ ...data }));
    localStorage.setItem('empresa', data.empresaId);

    //Obtiene el idioma del usuario
    if (data && data.idiomaId) {
      const idioma = await getIdioma(data.idiomaId);
      localStorage.setItem('idioma', idioma.iso || '');
    }

    //Obtiene el timer de la empresa del usuario
    const empresa = await getEmpresa(data.empresaId);
    if (empresa?.tiempoInactividad && empresa?.tiempoInactividad > 0) {
      localStorage.setItem('tiempoDeEsperaInactividad', '' + empresa?.tiempoInactividad);
    }
    if (await compruebaRolUsuario({ ...data })) {
      //Si tiene que mostrar la empresa, obtenemos el logo
      localStorage.setItem('logoEmpresaUrl', await obtenerLogoEmpresa());
    }

    //Obtiene la ip del usuario usando la API de ipify, es de codigo abierto y tiene usos infinitos
    const response = await fetch('https://api.ipify.org?format=json');
    const ip = (await response.json()).ip;

    //Sube el log del login al servidor
    const objLogUsuario = {
      usuarioId: data.id,
      ip: ip,
      masDatos: 'login',
      usuCreacion: data.id,
      fechaRegistro: new Date(),
    }
    await postLogUsuario(objLogUsuario);
    await getMenuLateral();
  }

  const compruebaRolUsuario = async (usuario: any) => {
    const queryParamsRol = {
      where: {
        and: {
          id: usuario.rolId
        }
      },
    };
    const rol = await getVistaEmpresaRol(JSON.stringify(queryParamsRol));
    //setMuestraEmpresa(rol[0].muestraEmpresa === 'S')
    return Array.isArray(rol) && rol[0]?.muestraEmpresa === 'S';
  }

  const obtenerLogoEmpresa = async () => {
    //Obtiene los tipos de archivo de la seccion
    const queryParamsTiposArchivo = {
      where: {
        and: {
          nombreSeccion: 'Empresa',
          nombre: 'Logo'
        }

      },
      order: "orden ASC"
    };
    const registrosTipoArchivos = await getVistaTipoArchivoEmpresaSeccion(JSON.stringify(queryParamsTiposArchivo));

    const queryParamsArchivo = {
      where: {
        and: {
          tipoArchivoId: Array.isArray(registrosTipoArchivos) && registrosTipoArchivos.length > 0 ? registrosTipoArchivos[0].id : undefined,
          tablaId: Number(localStorage.getItem('empresa'))
        }
      }
    };
    const archivoLogo = await getVistaArchivoEmpresa(JSON.stringify(queryParamsArchivo))
    if (Array.isArray(archivoLogo) && archivoLogo.length > 0) {
      return archivoLogo[0].url.replace(/(\/[^\/]+\/)([^\/]+\.\w+)$/, '$11250x850_$2');
    }
    return null;
  }

  const logout = (mensaje?: string) => {
    //Vaciamos localStorage y cookies
    Cookies.remove('authToken');
    localStorage.clear();

    // Limio la caché y espero a que devuelva la respuesta para luego hacer el dispatch
    emptyCache().then(() => {
      //Marcamos el usuario como no logeado
      setUsuarioAutenticado(false);
      router.push('/auth/login');
      //En local esto no funciona porque el debugger esta roto y recarga la pagina siempre, en DEV si que funciona, paz y tranquilidad
      if (typeof mensaje === 'string' && mensaje) {
        localStorage.setItem('toastMensaje', mensaje);
      }
    }).catch((error) => {
      console.error("Error al vaciar el cache: ", error)
    })

  };

  return (
    <AuthContext.Provider value={{ usuarioAutenticado, login, logout, loginSinDashboard }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
