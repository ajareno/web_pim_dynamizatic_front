"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { obtenerRolDashboard } from "@/app/api-endpoints/rol";
import Cookies from 'js-cookie';
import { emptyCache } from '../utility/Utils';
import jwt from "@/app/auth/jwt/useJwt";
import { getEmpresa } from "@/app/api-endpoints/empresa";
import { getIdioma } from "@/app/api-endpoints/idioma";
import { getVistaEmpresaRol } from "@/app/api-endpoints/rol";
import { registrarLoginExitoso, registrarLoginFallido, registrarAccesoBloqueado, registrarLogout } from "@/app/utility/LogAccesoUtils";
// import { getVistaArchivoEmpresa } from "@/app/api-endpoints/archivo";
import { obtenerTodosLosPermisos } from "@/app/components/shared/componentes";

interface AuthContextProps {
  usuarioAutenticado: boolean;
  login: (token: string, rememberMe: boolean, data: any) => void;
  loginSinDashboard: (token: string, rememberMe: boolean, data: any) => void;
  logout: () => void;
  registrarAccesoFallido: (empresaId: number, usuarioId: number, motivoFallo: string) => Promise<void>;
  registrarAccesoBloqueado: (empresaId: number, usuarioId: number, motivoFallo: string) => Promise<void>;
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
        },
        {
          label: "Empresas",
          icon: "pi pi-fw pi-user-edit",
          to: "/empresas"
        }
      ]
      },
      {
        label: "Tablas maestras",
        icon: "pi pi-fw pi-cog",
        items: [{
          label: "Archivos",
          icon: "pi pi-fw pi-user-edit",
          to: "/tablas-maestras/archivo"
          },
        {
          label: "Enviar email",
          icon: "pi pi-fw pi-user-edit",
          to: "/tablas-maestras/enviar-email"
        },
        {
          label: "Idiomas",
          icon: "pi pi-fw pi-user-edit",
          to: "/tablas-maestras/idioma"
        },
        {
          label: "Logs de acceso",
          icon: "pi pi-fw pi-user-edit",
          to: "/tablas-maestras/log-acceso"
        },
        {
          label: "Permisos",
          icon: "pi pi-fw pi-user-edit",
          to: "/tablas-maestras/permiso"
        },
        {
          label: "Planificador de categorias",
          icon: "pi pi-fw pi-user-edit",
          to: "/tablas-maestras/planificador-categorias"
        },
        {
          label: "Planificador de estados",
          icon: "pi pi-fw pi-user-edit",
          to: "/tablas-maestras/planificador-estados"
        },
        {
          label: "Plantillas de email",
          icon: "pi pi-fw pi-user-edit",
          to: "/tablas-maestras/plantillas-email"
        },
        {
          label: "Roles",
          icon: "pi pi-fw pi-user-edit",
          to: "/tablas-maestras/rol"
        },
        {
          label: "Sección",
          icon: "pi pi-fw pi-user-edit",
          to: "/tablas-maestras/seccion"
        },
        {
          label: "Tipos de archivo",
          icon: "pi pi-fw pi-file",
          to: "/tablas-maestras/tipo_archivo"
        },
        {
          label: "Traducción",
          icon: "pi pi-fw pi-user-edit",
          to: "/tablas-maestras/traduccion"
        }]
      }]
    }];

    localStorage.setItem('menuLateral', JSON.stringify(menuSimple));
  }

  const almacenarLogin = async (data: any) => {
    localStorage.setItem(config.storageTokenKeyName, JSON.stringify(data.accessToken));
    localStorage.setItem('userData', JSON.stringify({ ...data }));
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
    //if (await compruebaRolUsuario({ ...data })) {
      //Si tiene que mostrar la empresa, obtenemos el logo
      //localStorage.setItem('logoEmpresaUrl', await obtenerLogoEmpresa());
    //}

    //Obtiene la ip del usuario usando la API de ipify, es de codigo abierto y tiene usos infinitos
    const response = await fetch('https://api.ipify.org?format=json');
    const ip = (await response.json()).ip;

    //Registra el login exitoso usando las nuevas utilidades
    try {
      await registrarLoginExitoso(data.empresaId, data.id, ip);
    } catch (error) {
      console.error('Error al registrar el log de acceso:', error);
      // No bloquear el login si falla el log
    }
    
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
    // Registrar el logout antes de limpiar los datos
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        // Usar la nueva utilidad para registrar logout
        registrarLogout(user.empresaId, user.id).catch(error => {
          console.error('Error al registrar logout:', error);
        });
      } catch (error) {
        console.error('Error al parsear datos del usuario para logout:', error);
      }
    }

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

  // Función para registrar accesos fallidos
  const registrarAccesoFallido = async (empresaId: number, usuarioId: number, motivoFallo: string) => {
    try {
      await registrarLoginFallido(empresaId, usuarioId, motivoFallo);
    } catch (error) {
      console.error('Error al registrar el acceso fallido:', error);
    }
  };

  // Función para registrar accesos bloqueados
  const registrarAccesoBloqueado = async (empresaId: number, usuarioId: number, motivoFallo: string) => {
    try {
      await registrarAccesoBloqueado(empresaId, usuarioId, motivoFallo);
    } catch (error) {
      console.error('Error al registrar el acceso bloqueado:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ usuarioAutenticado, login, logout, loginSinDashboard, registrarAccesoFallido, registrarAccesoBloqueado }}>
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