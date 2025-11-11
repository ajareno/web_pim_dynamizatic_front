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
import { useEmpresaTheme } from "@/app/hooks/useEmpresaTheme";
import { ThemeProvider } from "@/app/providers/ThemeProvider";

interface RootLayoutProps {
    children: React.ReactNode;
}

//-> Añadimos el AbilityProvider en el Layout Principal, este archivo es el principal de la aplicación, por lo que se envuelve con AbilityProvider
export default function RootLayout({ children }: RootLayoutProps) {
    const { themeConfig } = useEmpresaTheme();

    useEffect(() => {
        addLocale("es", locales["es"]); // -> Añadimos lenguaje español
        locale("es"); //-> Configuramos por defecto el lenguaje añadido
    }, []);

    // Actualizar el link del tema cuando cambien las configuraciones
    useEffect(() => {
        const themeLink = document.getElementById('theme-link') as HTMLLinkElement;
        if (themeLink && themeConfig) {
            const newHref = `/theme/theme-${themeConfig.colorScheme}/${themeConfig.theme}/theme.css`;
            if (themeLink.href !== `${window.location.origin}${newHref}`) {
                themeLink.href = newHref;
                console.log('🎨 Tema del layout principal actualizado:', newHref);
            }
        }
    }, [themeConfig]);

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link
                    id="theme-link"
                    href={`/theme/theme-${themeConfig.colorScheme}/${themeConfig.theme}/theme.css`}
                    rel="stylesheet"
                ></link>
            </head>
            <body>
                <IntlProviderWrapper>
                    <PrimeReactProvider>
                        <ThemeProvider>
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
