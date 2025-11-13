// ============================================================================
// HELPER DE EMERGENCIA PARA TEMA - ThemeEmergencyHelper.js
// ============================================================================

window.fixTheme = () => {
    console.log('🆘 Ejecutando reparación de emergencia del tema...');
    
    const empresaId = localStorage.getItem('empresa');
    const userData = localStorage.getItem('userData');
    const empresaThemeConfig = localStorage.getItem('empresaThemeConfig');
    
    if (!empresaId && userData) {
        try {
            const userObj = JSON.parse(userData);
            if (userObj.empresaId) {
                localStorage.setItem('empresa', userObj.empresaId);
                console.log('✅ EmpresaId restaurado desde userData:', userObj.empresaId);
            }
        } catch (err) {
            console.error('❌ Error parsing userData:', err);
        }
    }
    
    // Aplicar tema desde configuración almacenada
    if (empresaThemeConfig) {
        try {
            const themeConfig = JSON.parse(empresaThemeConfig);
            const newHref = `/theme/theme-${themeConfig.esquemaColor || 'light'}/${themeConfig.tema || 'indigo'}/theme.css`;
            const linkElement = document.getElementById('theme-link');
            
            if (linkElement) {
                linkElement.setAttribute('href', newHref + '?t=' + Date.now());
                console.log('✅ Tema aplicado desde configuración almacenada:', newHref);
            }
        } catch (err) {
            console.error('❌ Error aplicando tema almacenado:', err);
        }
    }
    
    // Forzar aplicación del tema via evento
    const event = new CustomEvent('force-theme-check', { 
        detail: { empresaId: empresaId || JSON.parse(userData || '{}').empresaId } 
    });
    window.dispatchEvent(event);
    
    console.log('✅ Reparación de emergencia completada');
};

window.debugTheme = () => {
    console.log('🔍 Información de debug del tema:');
    console.log('localStorage.empresa:', localStorage.getItem('empresa'));
    console.log('localStorage.userData:', localStorage.getItem('userData'));
    console.log('localStorage.empresaThemeConfig:', localStorage.getItem('empresaThemeConfig'));
    console.log('CSS Link actual:', document.getElementById('theme-link')?.getAttribute('href'));
    console.log('Font Scale:', document.documentElement.style.fontSize);
};

window.resetTheme = () => {
    console.log('🔄 Reseteando tema a valores por defecto...');
    const linkElement = document.getElementById('theme-link');
    if (linkElement) {
        linkElement.setAttribute('href', '/theme/theme-light/mitema/theme.css?t=' + Date.now());
        console.log('✅ Tema reseteado a por defecto');
    }
};

console.log('🛠️ Helpers de tema cargados:');
console.log('- window.fixTheme() - Reparar tema');
console.log('- window.debugTheme() - Ver información de debug');
console.log('- window.resetTheme() - Resetear a tema por defecto');