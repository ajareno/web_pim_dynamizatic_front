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
// import { getVistaArchivoEmpresa } from "@/app/api-endpoints/archivo";
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

  //Obtenemos el menu lateral simplificado solo con Usuarios
  const getMenuLateral = async () => {
    // Menú simplificado solo con usuarios
    const menuSimple = [{
      label: "Menu",
      icon: "pi pi-fw pi-minus",
      items: [{
        label: "Gestión",
        icon: "pi pi-fw pi-cog",
        items: [{
          label: "Usuarios",
          icon: "pi pi-fw pi-user-edit",
          to: "/usuarios"
        }]
      }]
    }];

    localStorage.setItem('menuLateral', JSON.stringify(menuSimple));
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
    // const empresa = await getEmpresa(data.empresaId);
    // if (empresa?.tiempoInactividad && empresa?.tiempoInactividad > 0) {
    //   localStorage.setItem('tiempoDeEsperaInactividad', '' + empresa?.tiempoInactividad);
    // }
    // if (await compruebaRolUsuario({ ...data })) {
    //   //Si tiene que mostrar la empresa, obtenemos el logo
    //   // localStorage.setItem('logoEmpresaUrl', await obtenerLogoEmpresa());
    // }

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
    //await postLogUsuario(objLogUsuario);
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

  // const obtenerLogoEmpresa = async () => {
  //   //Obtiene los tipos de archivo de la seccion
  //   const queryParamsTiposArchivo = {
  //     where: {
  //       and: {
  //         nombreSeccion: 'Empresa',
  //         nombre: 'Logo'
  //       }

  //     },
  //     order: "orden ASC"
  //   };
  //   const registrosTipoArchivos = await getVistaTipoArchivoEmpresaSeccion(JSON.stringify(queryParamsTiposArchivo));

  //   const queryParamsArchivo = {
  //     where: {
  //       and: {
  //         tipoArchivoId: Array.isArray(registrosTipoArchivos) && registrosTipoArchivos.length > 0 ? registrosTipoArchivos[0].id : undefined,
  //         tablaId: Number(localStorage.getItem('empresa'))
  //       }
  //     }
  //   };
  //   const archivoLogo = await getVistaArchivoEmpresa(JSON.stringify(queryParamsArchivo))
  //   if (Array.isArray(archivoLogo) && archivoLogo.length > 0) {
  //     return archivoLogo[0].url.replace(/(\/[^\/]+\/)([^\/]+\.\w+)$/, '$11250x850_$2');
  //   }
  //   return null;
  // }

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
