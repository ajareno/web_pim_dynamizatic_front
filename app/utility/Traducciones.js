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

    return (
        <IntlProvider locale={locale} messages={messages}>
            {children}
        </IntlProvider>
    );
};

export default IntlProviderWrapper;