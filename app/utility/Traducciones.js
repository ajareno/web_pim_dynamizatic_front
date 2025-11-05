import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { buscaTraduccionLiteral } from "@/app/api-endpoints/traduccion";
import { getIdiomaDefecto } from '../components/shared/componentes';

const IntlProviderWrapper = ({ children }) => {
    const [messages, setMessages] = useState(null);

    const locale = getIdiomaDefecto();

    useEffect(() => {
        const fetchTranslations = async () => {
            const traducciones = await buscaTraduccionLiteral(locale);
            setMessages(traducciones);
        };

        fetchTranslations();
    }, [locale]);

    // Función para manejar mensajes faltantes sin mostrar advertencias
    const onError = (error) => {
        // Silencia las advertencias de traducciones faltantes
        // Solo logea a la consola si realmente es necesario para debugging
        if (process.env.NODE_ENV === 'development') {
            console.warn('Traducción faltante:', error);
        }
    };

    return (
        <IntlProvider 
            locale={locale} 
            messages={messages}
            onError={onError}
            defaultRichTextElements={{}}
        >
            {children}
        </IntlProvider>
    );
};

export default IntlProviderWrapper;