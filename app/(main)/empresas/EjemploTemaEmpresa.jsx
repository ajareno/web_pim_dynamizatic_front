// ============================================================================
// EJEMPLO DE USO DEL NUEVO SISTEMA DE TEMAS - EjemploTemaEmpresa.jsx
// ============================================================================

import React from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import { useTheme } from "@/app/providers/ThemeProvider";

const EjemploTemaEmpresa = () => {
    const { 
        themeConfig, 
        loading, 
        changeTheme, 
        changeColorScheme,
        updateMultipleConfigs 
    } = useTheme();

    // Opciones de temas disponibles
    const temasDisponibles = [
        { name: "indigo", color: "#6366F1", label: "Indigo" },
        { name: "blue", color: "#3B82F6", label: "Azul" },
        { name: "purple", color: "#8B5CF6", label: "Púrpura" },
        { name: "teal", color: "#14B8A6", label: "Teal" },
        { name: "cyan", color: "#06B6D4", label: "Cian" },
        { name: "green", color: "#10B981", label: "Verde" },
        { name: "orange", color: "#F59E0B", label: "Naranja" },
        { name: "pink", color: "#EC4899", label: "Rosa" },
        { name: "mitema", color: "#6366F1", label: "Mi Tema" }
    ];

    // Opciones de esquemas de color
    const esquemasColor = [
        { name: "light", label: "Claro" },
        { name: "dim", label: "Tenue" },
        { name: "dark", label: "Oscuro" }
    ];

    // Manejar cambio de tema
    const handleCambiarTema = async (tema) => {
        if (loading) return;
        
        try {
            await changeTheme(tema);
            console.log('✅ Tema cambiado exitosamente a:', tema);
        } catch (error) {
            console.error('❌ Error al cambiar tema:', error);
        }
    };

    // Manejar cambio de esquema
    const handleCambiarEsquema = async (esquema) => {
        if (loading) return;
        
        try {
            await changeColorScheme(esquema);
            console.log('✅ Esquema cambiado exitosamente a:', esquema);
        } catch (error) {
            console.error('❌ Error al cambiar esquema:', error);
        }
    };

    // Manejar cambio de múltiples configuraciones
    const handleCambioCompleto = async (configuracion) => {
        if (loading) return;
        
        try {
            await updateMultipleConfigs(configuracion);
            console.log('✅ Configuración actualizada:', configuracion);
        } catch (error) {
            console.error('❌ Error al actualizar configuración:', error);
        }
    };

    return (
        <div className="grid p-fluid">
            <div className="col-12">
                <div className="card">
                    <h5>🎨 Configuración de Tema de Empresa</h5>
                    <p>Esta configuración se aplica automáticamente en toda la aplicación</p>
                    
                    {loading && (
                        <div className="flex align-items-center mb-3">
                            <i className="pi pi-spin pi-spinner mr-2"></i>
                            <span>Actualizando configuración...</span>
                        </div>
                    )}

                    {/* Información actual */}
                    <div className="grid mb-4">
                        <div className="col-12 md:col-6">
                            <div className="surface-100 border-round p-3">
                                <h6 className="mt-0">📊 Configuración Actual</h6>
                                <div className="grid">
                                    <div className="col-6">
                                        <strong>Tema:</strong> {themeConfig.theme || 'mitema'}
                                    </div>
                                    <div className="col-6">
                                        <strong>Esquema:</strong> {themeConfig.colorScheme || 'light'}
                                    </div>
                                    <div className="col-6">
                                        <strong>Escala:</strong> {themeConfig.scale || 14}px
                                    </div>
                                    <div className="col-6">
                                        <strong>Ripple:</strong> {themeConfig.ripple ? 'Sí' : 'No'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Selector de tema */}
                    <div className="field">
                        <label className="font-bold mb-2">🎨 Tema Visual</label>
                        <div className="grid">
                            {temasDisponibles.map((tema) => (
                                <div key={tema.name} className="col-6 md:col-3">
                                    <Button
                                        className={`w-full ${themeConfig.theme === tema.name ? 'p-button-outlined' : ''}`}
                                        style={{ 
                                            backgroundColor: tema.color,
                                            borderColor: tema.color,
                                            color: 'white'
                                        }}
                                        onClick={() => handleCambiarTema(tema.name)}
                                        disabled={loading}
                                    >
                                        {themeConfig.theme === tema.name && <i className="pi pi-check mr-1" />}
                                        {tema.label}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Selector de esquema de color */}
                    <div className="field">
                        <label className="font-bold mb-2">🌙 Esquema de Color</label>
                        <div className="grid">
                            {esquemasColor.map((esquema) => (
                                <div key={esquema.name} className="col-12 md:col-4">
                                    <Button
                                        className={`w-full ${themeConfig.colorScheme === esquema.name ? 'p-button-outlined' : 'p-button-secondary'}`}
                                        onClick={() => handleCambiarEsquema(esquema.name)}
                                        disabled={loading}
                                    >
                                        {themeConfig.colorScheme === esquema.name && <i className="pi pi-check mr-1" />}
                                        {esquema.label}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Configuraciones rápidas */}
                    <div className="field">
                        <label className="font-bold mb-2">⚡ Configuraciones Rápidas</label>
                        <div className="grid">
                            <div className="col-12 md:col-6">
                                <Button
                                    className="w-full p-button-success"
                                    onClick={() => handleCambioCompleto({
                                        theme: 'green',
                                        colorScheme: 'light',
                                        ripple: true,
                                        scale: 14
                                    })}
                                    disabled={loading}
                                >
                                    🌿 Tema Verde Clásico
                                </Button>
                            </div>
                            <div className="col-12 md:col-6">
                                <Button
                                    className="w-full p-button-info"
                                    onClick={() => handleCambioCompleto({
                                        theme: 'blue',
                                        colorScheme: 'dark',
                                        ripple: false,
                                        scale: 15
                                    })}
                                    disabled={loading}
                                >
                                    🌙 Tema Azul Oscuro
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Opciones avanzadas */}
                    <div className="field">
                        <label className="font-bold mb-2">⚙️ Opciones Avanzadas</label>
                        <div className="grid">
                            <div className="col-12 md:col-6">
                                <div className="field-checkbox">
                                    <InputSwitch
                                        checked={themeConfig.ripple || false}
                                        onChange={(e) => handleCambioCompleto({ ripple: e.value })}
                                        disabled={loading}
                                    />
                                    <label className="ml-2">Efecto Ripple</label>
                                </div>
                            </div>
                            <div className="col-12 md:col-6">
                                <label className="block mb-1">Escala de Fuente</label>
                                <Dropdown
                                    value={themeConfig.scale || 14}
                                    options={[
                                        { label: '12px', value: 12 },
                                        { label: '13px', value: 13 },
                                        { label: '14px', value: 14 },
                                        { label: '15px', value: 15 },
                                        { label: '16px', value: 16 }
                                    ]}
                                    onChange={(e) => handleCambioCompleto({ scale: e.value })}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Vista previa */}
                    <div className="field">
                        <label className="font-bold mb-2">👀 Vista Previa</label>
                        <div className="surface-50 border-round p-4">
                            <p>Los cambios se aplican inmediatamente en toda la aplicación.</p>
                            <p><strong>Nota:</strong> Esta configuración se guarda automáticamente en la base de datos de la empresa.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EjemploTemaEmpresa;