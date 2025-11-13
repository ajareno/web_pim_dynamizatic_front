// ============================================================================
// COMPONENTE ACTUALIZADOR DE TEMA POST-LOGIN - Se ejecuta después del login para aplicar el tema de la empresa
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
        //
        //Obtensmos el ID de la empresa del localStorage
        //
        const empresaId = localStorage.getItem('empresa');
        //
        // Solo aplica el tema si:
        // 1. No está cargando
        // 2. Hay configuración disponible
        // 3. Hay datos de empresa en localStorage (usuario logueado)
        //
        if (!loading && themeConfig && empresaId) {
            //
            // Aplica el tema
            //
            applyThemeConfig({
                colorScheme: themeConfig.colorScheme,
                theme: themeConfig.theme
            }, () => {
                console.log('Tema de empresa aplicado exitosamente');
            });
            //
            // Aplica la escala si está definida
            //
            if (themeConfig.scale) {
                document.documentElement.style.fontSize = `${themeConfig.scale}px`;
            }
        } else if (!empresaId) {
            //
            //Si no existe la empresa es porque el usuario no está logueado y se mantiene el tema por defecto
            //
            console.log('Usuario no logueado, se mantiene el tema por defecto');
        }
    }, [themeConfig, loading]);

    //
    // Escuchamos los eventos de login/logout y cambios en localStorage
    //
    useEffect(() => {
        //
        // Manejamos el evento de login
        //
        const handleLogin = (event: CustomEvent) => {
            //
            // Forzamos la recarga de configuración después de un pequeño delay para asegurar que localStorage ya esté actualizado
            //
            setTimeout(() => {
                window.location.reload(); // Temporal: recargar para aplicar tema
            }, 100);
        };
        //
        // Manejamos el evento de logout
        //
        const handleLogout = () => {
            //
            // Restauramos el tema por defecto al hacer logout
            //
            applyThemeConfig({
                colorScheme: 'light',
                theme: 'mitema'
            }, () => {
                console.log('Tema por defecto restaurado tras logout');
            });
            //
            // Restauramos la escala por defecto al hacer logout
            //
            document.documentElement.style.fontSize = '14px';
        };
        //
        // Manejamos los cambios en localStorage (para detección en el mismo tab)
        //
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'empresa') {
                if (e.newValue) {
                    console.log('ThemeUpdater: Login detectado via localStorage, empresa:', e.newValue);
                    // La configuración se recargará automáticamente por el hook
                } else {
                    console.log('ThemeUpdater: Logout detectado via localStorage');
                    handleLogout();
                }
            }
        };

        //
        //Controlamos las funciones a las que hemos llamado y eliminamos cada listener al desmontar
        //
        window.addEventListener('user-logged-in', handleLogin as EventListener);
        window.addEventListener('user-logged-out', handleLogout);
        window.addEventListener('storage', handleStorageChange);
        //
        //Eliminamos los listeners al desmontar
        //
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