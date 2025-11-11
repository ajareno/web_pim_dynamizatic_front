// ============================================================================
// MANAGER DE TEMA DINÁMICO - DynamicThemeManager.tsx
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

    // Función para cargar tema de empresa
    const loadEmpresaTheme = async (empresaId: string) => {
        try {
            console.log('🔄 DynamicThemeManager: Cargando tema para empresa:', empresaId);
            
            const empresa = await getEmpresa(Number(empresaId));
            if (empresa) {
                const themeConfig = getLayoutConfigFromEmpresa(empresa);
                setCurrentTheme(themeConfig);
                
                // Aplicar tema inmediatamente
                applyThemeConfig({
                    colorScheme: themeConfig.colorScheme,
                    theme: themeConfig.theme
                }, () => {
                    console.log('✅ Tema de empresa aplicado:', {
                        theme: themeConfig.theme,
                        colorScheme: themeConfig.colorScheme
                    });
                });

                // Aplicar escala
                if (themeConfig.scale) {
                    document.documentElement.style.fontSize = `${themeConfig.scale}px`;
                }

                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error('❌ Error al cargar tema de empresa:', error);
            loadDefaultTheme();
        }
    };

    // Función para cargar tema por defecto
    const loadDefaultTheme = () => {
        console.log('🔄 DynamicThemeManager: Aplicando tema por defecto');
        
        const defaultConfig: ThemeConfig = {
            colorScheme: 'light',
            theme: 'mitema',
            scale: 14,
            ripple: false,
            inputStyle: 'outlined',
            menuMode: 'static',
            menuTheme: 'colorScheme'
        };
        
        setCurrentTheme(defaultConfig);
        
        applyThemeConfig({
            colorScheme: defaultConfig.colorScheme,
            theme: defaultConfig.theme
        }, () => {
            console.log('✅ Tema por defecto aplicado');
        });

        // Aplicar escala por defecto
        document.documentElement.style.fontSize = '14px';
        setIsLoggedIn(false);
    };

    // Verificar estado inicial al montar el componente
    useEffect(() => {
        const checkAuthAndLoadTheme = () => {
            // Verificar localStorage
            const empresaId = localStorage.getItem('empresa');
            
            // Verificar sessionStorage (por si usa ambos)
            const sessionEmpresaId = sessionStorage.getItem('empresa');
            
            // También verificar si hay datos de usuario en localStorage
            const usuarioData = localStorage.getItem('userData');
            let userEmpresaId = null;
            
            if (usuarioData) {
                try {
                    const userData = JSON.parse(usuarioData);
                    userEmpresaId = userData.empresaId;
                } catch (err) {
                    console.error('Error parsing userData:', err);
                }
            }
            
            const finalEmpresaId = empresaId || sessionEmpresaId || userEmpresaId;
            
            if (finalEmpresaId) {
                console.log('ℹ️ DynamicThemeManager: Usuario ya logueado, cargando tema para empresa:', finalEmpresaId);
                loadEmpresaTheme(finalEmpresaId.toString());
            } else {
                console.log('ℹ️ DynamicThemeManager: Usuario no logueado, tema por defecto');
                loadDefaultTheme();
            }
        };

        // Verificar inmediatamente
        checkAuthAndLoadTheme();
        
        // También verificar después de múltiples delays por si los datos de sesión se cargan después
        const timeoutIds = [
            setTimeout(() => {
                console.log('🔄 DynamicThemeManager: Verificación secundaria (500ms)');
                checkAuthAndLoadTheme();
            }, 500),
            setTimeout(() => {
                console.log('🔄 DynamicThemeManager: Verificación terciaria (1000ms)');
                checkAuthAndLoadTheme();
            }, 1000),
            setTimeout(() => {
                console.log('🔄 DynamicThemeManager: Verificación final (2000ms)');
                checkAuthAndLoadTheme();
            }, 2000)
        ];
        
        return () => {
            timeoutIds.forEach(id => clearTimeout(id));
        };
    }, []);

    // Escuchar eventos de autenticación
    useEffect(() => {
        // Función para verificar sesión
        const recheckSession = () => {
            const empresaId = localStorage.getItem('empresa');
            const userData = localStorage.getItem('userData');
            
            if (empresaId || userData) {
                const finalEmpresaId = empresaId || (userData ? JSON.parse(userData).empresaId : null);
                if (finalEmpresaId && !isLoggedIn) {
                    console.log('🔄 DynamicThemeManager: Re-verificando sesión, aplicando tema');
                    loadEmpresaTheme(finalEmpresaId.toString());
                }
            }
        };

        // Evento personalizado de login
        const handleLogin = (event: CustomEvent) => {
            const empresaId = event.detail?.empresaId;
            if (empresaId) {
                console.log('👤 DynamicThemeManager: Login detectado via evento');
                loadEmpresaTheme(empresaId.toString());
            }
        };

        // Evento personalizado de logout
        const handleLogout = () => {
            console.log('🚪 DynamicThemeManager: Logout detectado via evento');
            loadDefaultTheme();
        };

        // Evento para forzar verificación de tema
        const handleForceThemeCheck = (event: CustomEvent) => {
            const empresaId = event.detail?.empresaId;
            console.log('🎯 DynamicThemeManager: Forzando verificación de tema para empresa:', empresaId);
            if (empresaId) {
                loadEmpresaTheme(empresaId.toString());
            } else {
                recheckSession();
            }
        };

        // Listener para cuando se carga completamente la página
        const handleDOMContentLoaded = () => {
            console.log('📄 DOMContentLoaded: Re-verificando tema');
            recheckSession();
        };

        // Cambios en localStorage y sessionStorage (para casos edge)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'empresa' || e.key === 'userData') {
                if (e.newValue) {
                    let empresaId = null;
                    
                    if (e.key === 'empresa') {
                        empresaId = e.newValue;
                    } else if (e.key === 'userData') {
                        try {
                            const userData = JSON.parse(e.newValue);
                            empresaId = userData.empresaId;
                        } catch (err) {
                            console.error('Error parsing userData from storage:', err);
                        }
                    }
                    
                    if (empresaId) {
                        console.log('👤 DynamicThemeManager: Login detectado via storage, empresa:', empresaId);
                        loadEmpresaTheme(empresaId.toString());
                    }
                } else {
                    console.log('🚪 DynamicThemeManager: Logout detectado via storage');
                    loadDefaultTheme();
                }
            }
        };

        // Registrar listeners
        window.addEventListener('user-logged-in', handleLogin as EventListener);
        window.addEventListener('user-logged-out', handleLogout);
        window.addEventListener('force-theme-check', handleForceThemeCheck as EventListener);
        window.addEventListener('storage', handleStorageChange);
        
        // Solo agregar DOMContentLoaded si no está ya cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
        } else {
            // Si ya está cargado, verificar inmediatamente
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