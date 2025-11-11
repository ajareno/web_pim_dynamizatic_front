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
        const empresaId = localStorage.getItem('empresa');
        
        if (empresaId) {
            console.log('ℹ️ DynamicThemeManager: Usuario ya logueado, cargando tema');
            loadEmpresaTheme(empresaId);
        } else {
            console.log('ℹ️ DynamicThemeManager: Usuario no logueado, tema por defecto');
            loadDefaultTheme();
        }
    }, []);

    // Escuchar eventos de autenticación
    useEffect(() => {
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

        // Cambios en localStorage (para casos edge)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'empresa') {
                if (e.newValue) {
                    console.log('👤 DynamicThemeManager: Login detectado via storage');
                    loadEmpresaTheme(e.newValue);
                } else {
                    console.log('🚪 DynamicThemeManager: Logout detectado via storage');
                    loadDefaultTheme();
                }
            }
        };

        // Registrar listeners
        window.addEventListener('user-logged-in', handleLogin as EventListener);
        window.addEventListener('user-logged-out', handleLogout);
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('user-logged-in', handleLogin as EventListener);
            window.removeEventListener('user-logged-out', handleLogout);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Este componente no renderiza nada visible
    return null;
};

export default DynamicThemeManager;