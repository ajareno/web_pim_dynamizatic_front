// ============================================================================
// HOOK PARA GESTIÓN DINÁMICA DE TEMAS DE EMPRESA - useEmpresaTheme.ts
// ============================================================================

import { useState, useEffect, useCallback } from 'react';
import { getEmpresa, patchEmpresa } from "@/app/api-endpoints/empresa";
import { getLayoutConfigFromEmpresa, prepareEmpresaWithLayoutConfig } from "@/app/utility/LayoutConfigService";
import { applyThemeConfig } from "@/app/utility/ThemeService";

interface ThemeConfig {
    colorScheme: string;
    theme: string;
    scale: number;
    ripple: boolean;
    inputStyle: string;
    menuMode: string;
    menuTheme: string;
}

interface UseEmpresaThemeReturn {
    themeConfig: ThemeConfig;
    loading: boolean;
    loadEmpresaThemeConfig: () => Promise<ThemeConfig | null>;
    updateEmpresaThemeConfig: (newConfig: Partial<ThemeConfig>) => Promise<ThemeConfig | null>;
    changeTheme: (newTheme: string) => Promise<ThemeConfig | null>;
    changeColorScheme: (newColorScheme: string) => Promise<ThemeConfig | null>;
    updateMultipleConfigs: (configs: Partial<ThemeConfig>) => Promise<ThemeConfig | null>;
    empresaData: any;
}

/**
 * Hook personalizado para gestionar la configuración de tema de la empresa
 * @returns {UseEmpresaThemeReturn} Objeto con configuración actual y funciones para actualizar
 */
export const useEmpresaTheme = (): UseEmpresaThemeReturn => {
    const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
        colorScheme: 'light',
        theme: 'mitema',
        scale: 14,
        ripple: false,
        inputStyle: 'outlined',
        menuMode: 'static',
        menuTheme: 'colorScheme'
    });
    
    const [loading, setLoading] = useState(false);
    const [empresaData, setEmpresaData] = useState<any>(null);

    // Función para cargar la configuración desde la empresa
    const loadEmpresaThemeConfig = useCallback(async (): Promise<ThemeConfig | null> => {
        try {
            setLoading(true);
            
            // Obtener el ID de la empresa desde localStorage
            let empresaId = localStorage.getItem('empresa');
            
            // Si no existe en localStorage, intentar obtenerlo desde userData
            if (!empresaId) {
                const userData = localStorage.getItem('userData');
                if (userData) {
                    try {
                        const user = JSON.parse(userData);
                        empresaId = user.empresaId?.toString();
                    } catch (err) {
                        console.error('Error parsing userData:', err);
                    }
                }
            }
            
            if (!empresaId) {
                console.log('ℹ️ useEmpresaTheme: No hay empresa en localStorage, usando configuración por defecto');
                // Configuración por defecto cuando no hay empresa
                const defaultConfig: ThemeConfig = {
                    colorScheme: 'light',
                    theme: 'mitema',
                    scale: 14,
                    ripple: false,
                    inputStyle: 'outlined',
                    menuMode: 'static',
                    menuTheme: 'colorScheme'
                };
                setThemeConfig(defaultConfig);
                return defaultConfig;
            }
            
            // Obtener los datos de la empresa
            const empresa = await getEmpresa(Number(empresaId));
            
            if (empresa) {
                setEmpresaData(empresa);
                
                // Usar el servicio para extraer la configuración
                const layoutConfig = getLayoutConfigFromEmpresa(empresa);
                
                setThemeConfig(layoutConfig);
                
                console.log('✅ Configuración del tema cargada desde empresa:', layoutConfig);
                return layoutConfig;
            }
            
            return null;
        } catch (error) {
            console.error('❌ Error al cargar la configuración del tema:', error);
            // En caso de error, usar configuración por defecto
            const defaultConfig: ThemeConfig = {
                colorScheme: 'light',
                theme: 'mitema',
                scale: 14,
                ripple: false,
                inputStyle: 'outlined',
                menuMode: 'static',
                menuTheme: 'colorScheme'
            };
            setThemeConfig(defaultConfig);
            return defaultConfig;
        } finally {
            setLoading(false);
        }
    }, []);

    // Función para actualizar la configuración de tema en la empresa
    const updateEmpresaThemeConfig = useCallback(async (newConfig: Partial<ThemeConfig>): Promise<ThemeConfig | null> => {
        try {
            setLoading(true);
            
            const empresaId = localStorage.getItem('empresa');
            if (!empresaId || !empresaData) {
                throw new Error('No se encontraron datos de empresa');
            }

            // Preparar los datos actualizados de la empresa
            const updatedEmpresaData = prepareEmpresaWithLayoutConfig(empresaData, {
                ...themeConfig,
                ...newConfig
            });

            // Actualizar en la base de datos
            const updatedEmpresa = await patchEmpresa(Number(empresaId), updatedEmpresaData);
            
            if (updatedEmpresa) {
                // Actualizar estado local
                setEmpresaData(updatedEmpresa);
                
                const newThemeConfig = {
                    ...themeConfig,
                    ...newConfig
                };
                
                setThemeConfig(newThemeConfig);
                
                console.log('✅ Configuración de tema actualizada en empresa:', newConfig);
                return newThemeConfig;
            }
            
            return null;
        } catch (error) {
            console.error('❌ Error al actualizar la configuración del tema:', error);
            return null;
        } finally {
            setLoading(false);
        }
    }, [themeConfig, empresaData]);

    // Función para cambiar solo el tema visual
    const changeTheme = useCallback(async (newTheme: string): Promise<ThemeConfig | null> => {
        const updatedConfig = await updateEmpresaThemeConfig({ theme: newTheme });
        
        if (updatedConfig) {
            // Aplicar tema inmediatamente
            applyThemeConfig({
                colorScheme: updatedConfig.colorScheme,
                theme: updatedConfig.theme
            }, () => {
                console.log('✅ Tema aplicado:', newTheme);
            });
        }
        
        return updatedConfig;
    }, [updateEmpresaThemeConfig]);

    // Función para cambiar solo el esquema de color
    const changeColorScheme = useCallback(async (newColorScheme: string): Promise<ThemeConfig | null> => {
        const updatedConfig = await updateEmpresaThemeConfig({ colorScheme: newColorScheme });
        
        if (updatedConfig) {
            // Aplicar tema inmediatamente
            applyThemeConfig({
                colorScheme: updatedConfig.colorScheme,
                theme: updatedConfig.theme
            }, () => {
                console.log('✅ Esquema de color aplicado:', newColorScheme);
            });
        }
        
        return updatedConfig;
    }, [updateEmpresaThemeConfig]);

    // Función para cambiar múltiples configuraciones
    const updateMultipleConfigs = useCallback(async (configs: Partial<ThemeConfig>): Promise<ThemeConfig | null> => {
        const updatedConfig = await updateEmpresaThemeConfig(configs);
        
        if (updatedConfig && (configs.colorScheme || configs.theme)) {
            // Aplicar tema si se cambió colorScheme o theme
            applyThemeConfig({
                colorScheme: updatedConfig.colorScheme,
                theme: updatedConfig.theme
            }, () => {
                console.log('✅ Configuración múltiple aplicada:', configs);
            });
        }
        
        return updatedConfig;
    }, [updateEmpresaThemeConfig]);

    // Cargar configuración inicial
    useEffect(() => {
        if (typeof window !== 'undefined') {
            console.log('🎨 useEmpresaTheme: Cargando configuración inicial');
            loadEmpresaThemeConfig();
            
            // También verificar después de un delay por si hay cambios async
            const timeoutId = setTimeout(() => {
                console.log('🎨 useEmpresaTheme: Verificación secundaria');
                loadEmpresaThemeConfig();
            }, 1000);
            
            return () => clearTimeout(timeoutId);
        }
    }, [loadEmpresaThemeConfig]);

    // Escuchar cambios en localStorage y eventos de autenticación
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if ((e.key === 'empresa' || e.key === 'userData') && e.newValue) {
                console.log('🎨 useEmpresaTheme: Cambio detectado en storage:', e.key);
                loadEmpresaThemeConfig();
            }
        };

        const handleLoginEvent = () => {
            console.log('🎨 useEmpresaTheme: Evento de login detectado');
            setTimeout(() => loadEmpresaThemeConfig(), 100);
        };

        const handleLogoutEvent = () => {
            console.log('🎨 useEmpresaTheme: Evento de logout detectado');
            // Restaurar configuración por defecto
            const defaultConfig: ThemeConfig = {
                colorScheme: 'light',
                theme: 'mitema',
                scale: 14,
                ripple: false,
                inputStyle: 'outlined',
                menuMode: 'static',
                menuTheme: 'colorScheme'
            };
            setThemeConfig(defaultConfig);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('storage', handleStorageChange);
            window.addEventListener('user-logged-in', handleLoginEvent);
            window.addEventListener('user-logged-out', handleLogoutEvent);
            
            return () => {
                window.removeEventListener('storage', handleStorageChange);
                window.removeEventListener('user-logged-in', handleLoginEvent);
                window.removeEventListener('user-logged-out', handleLogoutEvent);
            };
        }
    }, [loadEmpresaThemeConfig]);

    return {
        themeConfig,
        loading,
        loadEmpresaThemeConfig,
        updateEmpresaThemeConfig,
        changeTheme,
        changeColorScheme,
        updateMultipleConfigs,
        empresaData
    };
};