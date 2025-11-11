"use client";

import React, { useEffect } from 'react';
import { LayoutProvider } from "../layout/context/layoutcontext";
import { AuthProvider } from "./auth/AuthContext";
import { AbilityProvider } from '@/app/utility/Can'; // Importa AbilityProvider

import { PrimeReactProvider, locale, addLocale } from "primereact/api";
import { MenuProvider } from "../layout/context/menucontext";
import LayoutContainer from "@/layout/layoutContainer";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "../styles/demo/Demos.scss";
import "../styles/layout/layout.scss";
import IntlProviderWrapper from '@/app/utility/Traducciones.js'; //-> Archivo con la configuración de las traducciones

import locales from "@/app/utility/locales.json"; //-> Archivo Json con la configuración de PrimeReact de palabras traducidas al español
import AutoLogout from './global';
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import DynamicThemeManager from '@/app/components/DynamicThemeManager';

interface RootLayoutProps {
    children: React.ReactNode;
}

//-> Añadimos el AbilityProvider en el Layout Principal, este archivo es el principal de la aplicación, por lo que se envuelve con AbilityProvider
export default function RootLayout({ children }: RootLayoutProps) {
    useEffect(() => {
        addLocale("es", locales["es"]); // -> Añadimos lenguaje español
        locale("es"); //-> Configuramos por defecto el lenguaje añadido
        
        // Verificación adicional para aplicar tema después de la carga inicial
        const checkAndApplyTheme = () => {
            const empresaId = localStorage.getItem('empresa');
            if (empresaId) {
                console.log('🎯 Layout: Detectada empresa en localStorage al cargar:', empresaId);
                // Disparar evento personalizado para que el DynamicThemeManager reaccione
                const event = new CustomEvent('force-theme-check', { detail: { empresaId } });
                window.dispatchEvent(event);
            }
        };
        
        // Verificar inmediatamente y después de un breve delay
        checkAndApplyTheme();
        const timeoutId = setTimeout(checkAndApplyTheme, 100);
        
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Tema dinámico basado en empresa en localStorage */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        (function() {
                            try {
                                const empresaId = localStorage.getItem('empresa');
                                let themeHref = '/theme/theme-light/mitema/theme.css'; // Tema por defecto
                                
                                if (empresaId) {
                                    console.log('🎯 Head Script: Empresa detectada:', empresaId);
                                    
                                    // Intentar obtener configuración de tema almacenada
                                    const empresaThemeConfig = localStorage.getItem('empresaThemeConfig');
                                    
                                    if (empresaThemeConfig) {
                                        try {
                                            const themeConfig = JSON.parse(empresaThemeConfig);
                                            const colorScheme = themeConfig.esquemaColor || 'light';
                                            const theme = themeConfig.tema || 'indigo';
                                            
                                            themeHref = '/theme/theme-' + colorScheme + '/' + theme + '/theme.css';
                                            console.log('✅ Head Script: Configuración de tema cargada:', themeConfig);
                                            console.log('✅ Head Script: Aplicando tema de empresa:', themeHref);
                                        } catch (configErr) {
                                            console.error('❌ Error parsing empresaThemeConfig:', configErr);
                                            // Fallback: tema por defecto para empresas
                                            themeHref = '/theme/theme-light/indigo/theme.css';
                                        }
                                    } else {
                                        console.log('⚠️ Head Script: Sin configuración de tema almacenada, usando tema por defecto para empresa');
                                        // Tema por defecto para empresas (mejor que mitema)
                                        themeHref = '/theme/theme-light/indigo/theme.css';
                                    }
                                } else {
                                    console.log('🎯 Head Script: Sin empresa, tema por defecto');
                                    themeHref = '/theme/theme-light/mitema/theme.css';
                                }
                                
                                // Escribir el link del tema
                                document.write('<link id="theme-link" href="' + themeHref + '" rel="stylesheet">');
                                console.log('✅ Head Script: Tema aplicado:', themeHref);
                                
                            } catch (err) {
                                console.error('❌ Error en script de tema:', err);
                                // Fallback en caso de error
                                document.write('<link id="theme-link" href="/theme/theme-light/mitema/theme.css" rel="stylesheet">');
                            }
                        })();
                        `
                    }}
                />
                {/* Helper de emergencia para desarrollo */}
                {process.env.NODE_ENV === 'development' && (
                    <script src="/theme-emergency.js"></script>
                )}
            </head>
            <body>
                <IntlProviderWrapper>
                    <PrimeReactProvider>
                        <ThemeProvider>
                            {/* Componente que actualiza el tema dinámicamente basado en login/logout */}
                            <DynamicThemeManager />
                            {/* Envolvemos el Layout Principal con <AuthProvider> para comprobar que el usuario se encuentre atenticado */}
                            <AuthProvider>
                                <AutoLogout /> {/* Llama al componente AutoLogout al cargar la aplicación */}
                                <AbilityProvider> {/* Envolvemos con AbilityProvider */}
                                    <MenuProvider>
                                        <LayoutProvider>
                                            <LayoutContainer>
                                                {children}
                                            </LayoutContainer>
                                        </LayoutProvider>
                                    </MenuProvider>
                                </AbilityProvider>
                            </AuthProvider>
                        </ThemeProvider>
                    </PrimeReactProvider>
                </IntlProviderWrapper>
            </body>
        </html>
    );
}
