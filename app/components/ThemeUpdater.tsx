// ============================================================================
// COMPONENTE ACTUALIZADOR DE TEMA POST-LOGIN - ThemeUpdater.tsx
// ============================================================================

"use client";
import { useEffect } from 'react';
import { useEmpresaTheme } from "@/app/hooks/useEmpresaTheme";
import { applyThemeConfig } from "@/app/utility/ThemeService";

/**
 * Componente que se ejecuta después del login para aplicar el tema de la empresa
 * Este componente solo se renderiza cuando el usuario está autenticado
 */
const ThemeUpdater = () => {
    const { themeConfig, loading } = useEmpresaTheme();

    useEffect(() => {
        // Solo aplicar el tema si:
        // 1. No está cargando
        // 2. Hay configuración disponible
        // 3. Hay datos de empresa en localStorage (usuario logueado)
        const empresaId = localStorage.getItem('empresa');
        
        if (!loading && themeConfig && empresaId) {
            console.log('🎨 ThemeUpdater: Aplicando tema de empresa:', {
                empresa: empresaId,
                tema: themeConfig.theme,
                esquema: themeConfig.colorScheme
            });

            // Aplicar el tema inmediatamente
            applyThemeConfig({
                colorScheme: themeConfig.colorScheme,
                theme: themeConfig.theme
            }, () => {
                console.log('✅ Tema de empresa aplicado exitosamente');
            });

            // Aplicar escala si está definida
            if (themeConfig.scale) {
                document.documentElement.style.fontSize = `${themeConfig.scale}px`;
                console.log(`📏 Escala aplicada: ${themeConfig.scale}px`);
            }
        } else if (!empresaId) {
            console.log('ℹ️ ThemeUpdater: Usuario no logueado, manteniendo tema por defecto');
        }
    }, [themeConfig, loading]);

    // Escuchar eventos de login/logout y cambios en localStorage
    useEffect(() => {
        // Manejar evento de login
        const handleLogin = (event: CustomEvent) => {
            console.log('👤 ThemeUpdater: Login detectado via evento, empresa:', event.detail?.empresaId);
            // Forzar recarga de configuración después de un pequeño delay
            // para asegurar que localStorage ya esté actualizado
            setTimeout(() => {
                window.location.reload(); // Temporal: recargar para aplicar tema
            }, 100);
        };

        // Manejar evento de logout
        const handleLogout = () => {
            console.log('🚪 ThemeUpdater: Logout detectado via evento');
            // Restaurar tema por defecto inmediatamente
            applyThemeConfig({
                colorScheme: 'light',
                theme: 'mitema'
            }, () => {
                console.log('🔄 Tema por defecto restaurado tras logout');
            });
            // Restaurar escala por defecto
            document.documentElement.style.fontSize = '14px';
        };

        // Manejar cambios en localStorage (para detección en el mismo tab)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'empresa') {
                if (e.newValue) {
                    console.log('👤 ThemeUpdater: Login detectado via localStorage, empresa:', e.newValue);
                    // La configuración se recargará automáticamente por el hook
                } else {
                    console.log('🚪 ThemeUpdater: Logout detectado via localStorage');
                    handleLogout();
                }
            }
        };

        // Registrar event listeners
        window.addEventListener('user-logged-in', handleLogin as EventListener);
        window.addEventListener('user-logged-out', handleLogout);
        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('user-logged-in', handleLogin as EventListener);
            window.removeEventListener('user-logged-out', handleLogout);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Este componente no renderiza nada, solo maneja efectos
    return null;
};

export default ThemeUpdater;