// ============================================================================
// FUNCIONES PARA CONFIGURACIÓN DE LAYOUT - layoutConfigService.js
// ============================================================================

/**
 * Obtener la configuración por defecto de layout
 */
export const getDefaultLayoutConfig = () => {
  return {
    temaRipple: false,
    estiloInput: 'outlined',
    modoMenu: 'static',
    temaMenu: 'colorScheme',
    esquemaColor: 'light',
    tema: 'mitema',
    escala: 14
  };
};

/**
 * Obtener configuración de layout desde una empresa
 * Si la empresa no tiene los nuevos campos, devuelve configuración por defecto
 */
export const getLayoutConfigFromEmpresa = (empresa) => {
  if (!empresa) {
    console.log('getLayoutConfigFromEmpresa: No hay empresa, usando configuración por defecto');
    return {
      ripple: false,
      inputStyle: 'outlined',
      menuMode: 'static',
      menuTheme: 'colorScheme',
      colorScheme: 'light',
      theme: 'mitema',
      scale: 14
    };
  }
  
  const config = {
    ripple: empresa.temaRipple ?? false,
    inputStyle: empresa.estiloInput ?? 'outlined',
    menuMode: empresa.modoMenu ?? 'static',
    menuTheme: empresa.temaMenu ?? 'colorScheme',
    colorScheme: empresa.esquemaColor ?? 'light',
    theme: empresa.tema ?? 'mitema',
    scale: empresa.escala ?? 14
  };
  
  return config;
};

/**
 * Preparar objeto empresa con configuración de layout para enviar al backend
 */
export const prepareEmpresaWithLayoutConfig = (empresaData, layoutConfig) => {
  return {
    ...empresaData,
    temaRipple: layoutConfig.ripple,
    estiloInput: layoutConfig.inputStyle,
    modoMenu: layoutConfig.menuMode,
    temaMenu: layoutConfig.menuTheme,
    esquemaColor: layoutConfig.colorScheme,
    tema: layoutConfig.theme,
    escala: layoutConfig.scale
  };
};

/**
 * Validar configuración de layout
 */
export const validateLayoutConfig = (config) => {
  const errors = [];
  
  const validInputStyles = ['outlined', 'filled'];
  const validMenuModes = ['static', 'overlay', 'slim', 'slim-plus', 'drawer', 'horizontal'];
  const validMenuThemes = ['colorScheme', 'primaryColor', 'transparent'];
  const validColorSchemes = ['light', 'dim', 'dark'];
  const validThemes = ['indigo', 'blue', 'purple', 'teal', 'cyan', 'green', 'orange', 'pink', 'mitema'];
  const validScales = [12, 13, 14, 15, 16];
  
  if (!validInputStyles.includes(config.inputStyle)) {
    errors.push(`Estilo de input inválido: ${config.inputStyle}`);
  }
  
  if (!validMenuModes.includes(config.menuMode)) {
    errors.push(`Modo de menú inválido: ${config.menuMode}`);
  }
  
  if (!validMenuThemes.includes(config.menuTheme)) {
    errors.push(`Tema de menú inválido: ${config.menuTheme}`);
  }
  
  if (!validColorSchemes.includes(config.colorScheme)) {
    errors.push(`Esquema de color inválido: ${config.colorScheme}`);
  }
  
  if (!validThemes.includes(config.theme)) {
    errors.push(`Tema inválido: ${config.theme}`);
  }
  
  if (!validScales.includes(config.scale)) {
    errors.push(`Escala inválida: ${config.scale}`);
  }
  
  return errors;
};