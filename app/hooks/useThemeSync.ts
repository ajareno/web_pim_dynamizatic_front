// ============================================================================
// HOOK DE SINCRONIZACIÓN DE TEMA - useThemeSync.ts
// ============================================================================

import { useEffect, useCallback } from 'react';
import { getUsuarioSesion } from '@/app/utility/Utils';

interface UseThemeSyncProps {
    onThemeChange: (empresaId: string | null) => void;
}

/**
 * Hook para sincronizar el tema con el estado de autenticación
 * Escucha cambios en localStorage y verifica el estado de la sesión
 */
export const useThemeSync = ({ onThemeChange }: UseThemeSyncProps) => {
    
    // Función para verificar el estado actual de la sesión
    const checkCurrentSession = useCallback(() => {
        const empresaId = localStorage.getItem('empresa');
        const userData = getUsuarioSesion();
        
        const finalEmpresaId = empresaId || userData?.empresaId;
        
        if (finalEmpresaId) {
            console.log('🎨 useThemeSync: Sesión activa detectada, empresa:', finalEmpresaId);
            onThemeChange(finalEmpresaId.toString());
        } else {
            console.log('🎨 useThemeSync: No hay sesión activa');
            onThemeChange(null);
        }
    }, [onThemeChange]);

    useEffect(() => {
        // Verificar inmediatamente al montar
        checkCurrentSession();
        
        // Verificar después de un delay por si hay cambios async
        const timeoutId = setTimeout(checkCurrentSession, 500);
        
        // Listener para cambios en localStorage
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'empresa' || e.key === 'userData') {
                console.log('🎨 useThemeSync: Cambio detectado en storage:', e.key);
                checkCurrentSession();
            }
        };

        // Listener para eventos personalizados
        const handleLoginEvent = () => {
            console.log('🎨 useThemeSync: Evento de login detectado');
            setTimeout(checkCurrentSession, 100); // Pequeño delay para asegurar que localStorage se actualice
        };

        const handleLogoutEvent = () => {
            console.log('🎨 useThemeSync: Evento de logout detectado');
            onThemeChange(null);
        };

        // Registrar listeners
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('user-logged-in', handleLoginEvent);
        window.addEventListener('user-logged-out', handleLogoutEvent);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('user-logged-in', handleLoginEvent);
            window.removeEventListener('user-logged-out', handleLogoutEvent);
        };
    }, [checkCurrentSession, onThemeChange]);

    return {
        checkCurrentSession
    };
};