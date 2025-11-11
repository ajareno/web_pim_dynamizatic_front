// ============================================================================
// SERVICIO PARA GESTIÓN DINÁMICA DE TEMAS - ThemeService.js
// ============================================================================

/**
 * Función para cambiar dinámicamente el tema en tiempo de ejecución
 * @param {string} currentTheme - Tema actual (puede ser colorScheme o theme)
 * @param {string} newTheme - Nuevo tema a aplicar
 * @param {string} linkElementId - ID del elemento link del tema (por defecto 'theme-link')
 * @param {Function} callback - Función callback a ejecutar después del cambio
 */
export const changeTheme = (currentTheme, newTheme, linkElementId = 'theme-link', callback) => {
    const linkElement = document.getElementById(linkElementId);
    
    if (!linkElement) {
        console.error(`No se encontró el elemento link con ID: ${linkElementId}`);
        return;
    }

    const currentHref = linkElement.getAttribute('href');
    let newHref;

    // Determinar si estamos cambiando colorScheme o theme
    if (['light', 'dim', 'dark'].includes(newTheme)) {
        // Cambio de esquema de color (light/dim/dark)
        newHref = currentHref.replace(/theme-(light|dim|dark)/, `theme-${newTheme}`);
    } else {
        // Cambio de tema (indigo/blue/purple/etc.)
        const pathParts = currentHref.split('/');
        if (pathParts.length >= 4) {
            pathParts[pathParts.length - 2] = newTheme; // Reemplazar el nombre del tema
            newHref = pathParts.join('/');
        } else {
            console.error('Formato de href no válido para cambio de tema:', currentHref);
            return;
        }
    }

    // Verificar que el nuevo href sea diferente
    if (currentHref === newHref) {
        console.log('El tema ya está aplicado:', newTheme);
        if (callback) callback();
        return;
    }

    console.log(`Cambiando tema de ${currentHref} a ${newHref}`);

    // Aplicar el nuevo tema
    linkElement.setAttribute('href', newHref);
    
    // Ejecutar callback si se proporciona
    if (callback && typeof callback === 'function') {
        // Pequeño delay para asegurar que el CSS se cargue
        setTimeout(callback, 100);
    }
};

/**
 * Función para obtener la configuración actual del tema desde el DOM
 * @returns {Object} Objeto con colorScheme y theme actuales
 */
export const getCurrentThemeConfig = () => {
    const linkElement = document.getElementById('theme-link');
    
    if (!linkElement) {
        return {
            colorScheme: 'light',
            theme: 'mitema'
        };
    }

    const href = linkElement.getAttribute('href') || '';
    
    // Extraer colorScheme y theme del href
    const colorSchemeMatch = href.match(/theme-(light|dim|dark)/);
    const themeMatch = href.match(/theme-(?:light|dim|dark)\/([^\/]+)\/theme\.css/);
    
    return {
        colorScheme: colorSchemeMatch ? colorSchemeMatch[1] : 'light',
        theme: themeMatch ? themeMatch[1] : 'mitema'
    };
};

/**
 * Función para construir la URL del tema basada en colorScheme y theme
 * @param {string} colorScheme - Esquema de color (light/dim/dark)
 * @param {string} theme - Nombre del tema (indigo/blue/purple/etc.)
 * @returns {string} URL completa del tema
 */
export const buildThemeUrl = (colorScheme = 'light', theme = 'mitema') => {
    return `/theme/theme-${colorScheme}/${theme}/theme.css`;
};

/**
 * Función para aplicar configuración completa de tema
 * @param {Object} themeConfig - Configuración del tema
 * @param {string} themeConfig.colorScheme - Esquema de color
 * @param {string} themeConfig.theme - Nombre del tema
 * @param {Function} callback - Función callback
 */
export const applyThemeConfig = (themeConfig, callback) => {
    const { colorScheme, theme } = themeConfig;
    const newHref = buildThemeUrl(colorScheme, theme);
    
    console.log(`🎨 ThemeService: Aplicando tema ${theme} con esquema ${colorScheme}`);
    
    const linkElement = document.getElementById('theme-link');
    if (linkElement) {
        const currentHref = linkElement.getAttribute('href');
        
        if (currentHref !== newHref) {
            console.log(`🔄 Cambiando de ${currentHref} a ${newHref}`);
            
            // Forzar la recarga del CSS
            linkElement.setAttribute('href', newHref + '?t=' + Date.now());
            
            // Esperar a que se cargue el nuevo CSS
            linkElement.onload = () => {
                console.log('✅ Tema aplicado correctamente');
                if (callback && typeof callback === 'function') {
                    callback();
                }
            };
            
            // Fallback en caso de que onload no se dispare
            setTimeout(() => {
                if (callback && typeof callback === 'function') {
                    callback();
                }
            }, 200);
            
        } else {
            console.log('ℹ️ La configuración de tema ya está aplicada');
            if (callback) callback();
        }
    } else {
        console.error('❌ No se encontró el elemento theme-link');
        if (callback) callback();
    }
};