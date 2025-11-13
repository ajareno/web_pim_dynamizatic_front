// ============================================================================
// PROVIDER DE TEMA SIMPLIFICADO - Intermediario entre el hook useEmpresaTheme y el resto de la aplicación. Proporciona acceso global a la funcionalidad de temas de empresa.
// ============================================================================

"use client";
import React, { createContext, useContext, ReactNode } from 'react';
import { useEmpresaTheme } from "@/app/hooks/useEmpresaTheme";

//
//Define la estructura de datos que se compartirá globalmente
//
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
//
//Utiliza el Hook "useEmpresaTheme" para obtener y gestionar la configuración del tema de la empresa
//
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    //
    //Extrameos las funciones y datos necesarios del hook
    //
    const {
        themeConfig,
        loading,
        changeTheme,
        changeColorScheme,
        updateMultipleConfigs
    } = useEmpresaTheme();
    //
    //Creamos el objeto ThemeContextType con los valores necesarios
    //
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