// ============================================================================
// MANAGER DE TEMA DINÁMICO - Se usa para aplicar temas basados en login/logout
// ============================================================================

"use client";
import { useEffect, useState } from 'react';
import { applyThemeConfig } from "@/app/utility/ThemeService";
import { getEmpresa } from "@/app/api-endpoints/empresa";
import { getLayoutConfigFromEmpresa } from "@/app/utility/LayoutConfigService";

interface ThemeConfig {
    colorScheme: string;
    theme: string;
    scale: number;
    ripple: boolean;
    inputStyle: string;
    menuMode: string;
    menuTheme: string;
}

/**
 * Componente que maneja dinámicamente el tema basado en eventos de login/logout
 * No depende de hooks complejos y maneja mejor los estados de autenticación
 */
const DynamicThemeManager = () => {
    const [currentTheme, setCurrentTheme] = useState<ThemeConfig | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //
    //Cargamos los tema de empresa
    //
    const loadEmpresaTheme = async (empresaId: string) => {
        try {
            //
            // Cargamos la información de la empresa y si existe esta aplicamos sus estilos
            //      
            const empresa = await getEmpresa(Number(empresaId));
            if (empresa) {
                //
                // Obtenemos la configuración de tema de la empresa 
                //
                const themeConfig = getLayoutConfigFromEmpresa(empresa);
                setCurrentTheme(themeConfig);
                //
                //Aplicamos el tema inmediatamente
                //
                applyThemeConfig({
                    colorScheme: themeConfig.colorScheme,
                    theme: themeConfig.theme
                }, () => {
                    console.log('Tema de empresa aplicado:', {
                        theme: themeConfig.theme,
                        colorScheme: themeConfig.colorScheme
                    });
                });
                //
                //Si había escala la aplicamos
                //
                if (themeConfig.scale) {
                    document.documentElement.style.fontSize = `${themeConfig.scale}px`;
                }
                //
                //Especificamos que el usuario está logueado
                //
                setIsLoggedIn(true);
            }
        } catch (error) {
            //
            //Si ha habido algún error lo mostramos por consola y cargando el tema defecto
            //
            console.error('Error al cargar tema de empresa:', error);
            loadDefaultTheme();
        }
    };
    //
    // Función para cargar tema por defecto
    //
    const loadDefaultTheme = () => {
        //
        //Especificamos la configuración por defecto
        //  
        const defaultConfig: ThemeConfig = {
            colorScheme: 'light',
            theme: 'mitema',
            scale: 14,
            ripple: false,
            inputStyle: 'outlined',
            menuMode: 'static',
            menuTheme: 'colorScheme'
        };
        //
        // Aplicamos la configuración por defecto
        //
        setCurrentTheme(defaultConfig);
        
        applyThemeConfig({
            colorScheme: defaultConfig.colorScheme,
            theme: defaultConfig.theme
        }, () => {
            console.log('Tema por defecto aplicado');
        });
        //
        // Aplicamos escala por defecto
        //
        document.documentElement.style.fontSize = '14px';
        setIsLoggedIn(false);
    };
    //
    // Verificamos el estado inicial al montar el componente
    //
    useEffect(() => {
        const checkAuthAndLoadTheme = () => {
            //
            //Obtenemos la empresaId de localStorage o sessionStorage por si usamos ambos
            //
            const empresaId = localStorage.getItem('empresa');
            const sessionEmpresaId = sessionStorage.getItem('empresa');
            //
            //Verificamos los datos datos del usuario en localStorage
            //
            const usuarioData = localStorage.getItem('userData');
            let userEmpresaId = null;
            //
            //Si existe el usuario obtenemos su empresaId 
            //
            if (usuarioData) {
                try {
                    const userData = JSON.parse(usuarioData);
                    userEmpresaId = userData.empresaId;
                } catch (err) {
                    console.error('Error parsing userData:', err);
                }
            }
            //
            //Aquí debemos haber obtenido al menos un id de empresa ya sea por el localStorage, por la SessionStorage o por los datos del usuario
            //
            const finalEmpresaId = empresaId || sessionEmpresaId || userEmpresaId;
            //
            //Si tenemos empresaId cargamos su tema, sino cargamos el tema por defecto
            //
            if (finalEmpresaId) {
                loadEmpresaTheme(finalEmpresaId.toString());
            } else {
                loadDefaultTheme();
            }
        };
        //
        //Comprobamos que está logueado y cargamos el tema
        //
        checkAuthAndLoadTheme();
        //
        //Verificamos múltiples delays por si los datos de sesión se cargan después
        //
        const timeoutIds = [
            setTimeout(() => {
                checkAuthAndLoadTheme();
            }, 500),
            setTimeout(() => {
                checkAuthAndLoadTheme();
            }, 1000),
            setTimeout(() => {
                checkAuthAndLoadTheme();
            }, 2000)
        ];
        
        return () => {
            timeoutIds.forEach(id => clearTimeout(id));
        };
    }, []);

    //
    // Escuchar eventos de autenticación
    //
    useEffect(() => {
        //
        // Verificamos que estemos logueados para sacar la empresa y aplicar el tema
        //
        const recheckSession = () => {
            //
            //Obtenemos la empresaId de localStorage y los datos del usuario
            //
            const empresaId = localStorage.getItem('empresa');
            const userData = localStorage.getItem('userData');
            //
            //Si tenemos los datos de alguno de los dos entramos para crear el tema
            //
            if (empresaId || userData) {
                //
                //Con los datos que tenemos debemos ser capaces de obtener la empresaId
                //
                const finalEmpresaId = empresaId || (userData ? JSON.parse(userData).empresaId : null);
                if (finalEmpresaId && !isLoggedIn) {
                    //
                    //Si tenemos la empresaId cargamos la configuración de tema
                    //
                    loadEmpresaTheme(finalEmpresaId.toString());
                }
            }
        };

        //
        //Controlamos el login para obtener el tema de la empresa a partir de empresaId
        //
        const handleLogin = (event: CustomEvent) => {
            const empresaId = event.detail?.empresaId;
            if (empresaId) {
                //
                //Hemos detectado el evento del login por lo que le pasamos la empresaId para cargar su tema
                //
                loadEmpresaTheme(empresaId.toString());
            }
        };

        //
        //Controlamos el logout para cargar el tema por defecto
        //
        const handleLogout = () => {
            loadDefaultTheme();
        };
        //
        // Función que fuerza la verificación de tema
        //
        const handleForceThemeCheck = (event: CustomEvent) => {
            //
            //Recupero la empresa y si existe pongo el tema que tenga, sino recomprueba la sesión y si no hay empresa carga el tema por defecto
            //
            const empresaId = event.detail?.empresaId;
            if (empresaId) {
                loadEmpresaTheme(empresaId.toString());
            } else {
                recheckSession();
            }
        };
        //
        // Listener para cuando se carga completamente la página recomprobar la sesión y si no hay empresa cargar el tema por defecto
        //
        const handleDOMContentLoaded = () => {
            recheckSession();
        };

        //
        // Cambios en localStorage y sessionStorage para casos poco comunes como:
        // - El usuario inicia/cierra sesión en otra pestaña/ventana y el cambio se refleja mediante eventos de almacenamiento.
        // - Los datos de sesión se modifican fuera del flujo normal de la aplicación.
        // - Hay sincronización entre varias pestañas o ventanas abiertas.
        // Estos listeners ayudan a detectar y reaccionar ante esos cambios inesperados para mantener el tema actualizado.
        //
        const handleStorageChange = (e: StorageEvent) => {
            //
            //Si la clave modificada es 'empresa' o 'userData' reaccionamos 
            //
            if (e.key === 'empresa' || e.key === 'userData') {
                //
                //Si hay un nuevo valor cargamos el tema correspondiente
                //
                if (e.newValue) {
                    let empresaId = null;
                    //
                    //Obtenemos el nuevo valor de empresa si ha cambiado
                    //
                    if (e.key === 'empresa') {
                        empresaId = e.newValue;
                    } else {
                        //
                        //Si lo que ha cambiado son los datos del usuario obtenemos la empresaId de ahí
                        //
                        if (e.key === 'userData') {
                            try {
                                const userData = JSON.parse(e.newValue);
                                empresaId = userData.empresaId;
                            } catch (err) {
                                console.error('Error parsing userData from storage:', err);
                            }
                        }
                    }
                    //
                    //Si detectamos que se ha loguea a traves del Storage cargamos su tema
                    //
                    if (empresaId) {
                        loadEmpresaTheme(empresaId.toString());
                    }
                } else {
                    //
                    //Si se ha eliminado la empresaId o los datos del usuario cargamos el tema por defecto
                    //
                    loadDefaultTheme();
                }
            }
        };
        //
        //Controlamos las funciones a las que hemos llamado y eliminamos cada listener al desmontar
        //
        window.addEventListener('user-logged-in', handleLogin as EventListener);
        window.addEventListener('user-logged-out', handleLogout);
        window.addEventListener('force-theme-check', handleForceThemeCheck as EventListener);
        window.addEventListener('storage', handleStorageChange);
        //
        // Si la página aún se está cargando, esperamos al evento DOMContentLoaded
        //
        if (document.readyState === 'loading') {
            //
            // Si la página aún se está cargando, esperamos al evento DOMContentLoaded que llama a su vez a recheckSession para cargar el tema correspondiente de la empresa
            //
            document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
        } else {
            // Si ya está cargado, recomprobamos la sesión inmediatamente
            recheckSession();
        }

        return () => {
            window.removeEventListener('user-logged-in', handleLogin as EventListener);
            window.removeEventListener('user-logged-out', handleLogout);
            window.removeEventListener('force-theme-check', handleForceThemeCheck as EventListener);
            window.removeEventListener('storage', handleStorageChange);
            document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
        };
    }, [isLoggedIn]);

    // Este componente no renderiza nada visible
    return null;
};

export default DynamicThemeManager;