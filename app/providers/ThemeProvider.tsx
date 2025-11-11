// ============================================================================
// PROVIDER DE TEMA DINÁMICO - ThemeProvider.tsx
// ============================================================================

"use client";
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useEmpresaTheme } from "@/app/hooks/useEmpresaTheme";
import { applyThemeConfig } from "@/app/utility/ThemeService";

interface ThemeContextType {
    themeConfig: any;
    loading: boolean;
    changeTheme: (newTheme: string) => Promise<any>;
    changeColorScheme: (newColorScheme: string) => Promise<any>;
    updateMultipleConfigs: (configs: any) => Promise<any>;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const {
        themeConfig,
        loading,
        changeTheme,
        changeColorScheme,
        updateMultipleConfigs
    } = useEmpresaTheme();

    // Aplicar tema inicial cuando se carga la configuración
    useEffect(() => {
        if (themeConfig && !loading) {
            // Aplicar tema inmediatamente al cargar
            applyThemeConfig({
                colorScheme: themeConfig.colorScheme,
                theme: themeConfig.theme
            }, () => {
                console.log('🎨 Tema inicial aplicado desde ThemeProvider:', themeConfig);
            });
        }
    }, [themeConfig, loading]);

    const value: ThemeContextType = {
        themeConfig,
        loading,
        changeTheme,
        changeColorScheme,
        updateMultipleConfigs
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};