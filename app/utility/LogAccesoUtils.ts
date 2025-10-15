import { postLogAcceso } from "@/app/api-endpoints/log_acceso";
//
// Tipos de resultado de acceso
//
export type ResultadoAcceso = 'exitoso' | 'fallido' | 'bloqueado';
//
// Detectamos el navegador
//
const getBrowserName = (userAgent: string): string => {
  if (userAgent.includes('Chrome') && !userAgent.includes('Edge')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  if (userAgent.includes('Opera') || userAgent.includes('OPR')) return 'Opera';
  if (userAgent.includes('MSIE') || userAgent.includes('Trident')) return 'Internet Explorer';
  return 'Desconocido';
};
//
// Detectamos el sistema operativo
//
const getOSName = (userAgent: string): string => {
  if (userAgent.includes('Windows NT 10.0')) return 'Windows 10';
  if (userAgent.includes('Windows NT 6.3')) return 'Windows 8.1';
  if (userAgent.includes('Windows NT 6.2')) return 'Windows 8';
  if (userAgent.includes('Windows NT 6.1')) return 'Windows 7';
  if (userAgent.includes('Windows NT 6.0')) return 'Windows Vista';
  if (userAgent.includes('Windows NT 5.1')) return 'Windows XP';
  if (userAgent.includes('Windows')) return 'Windows';
  if (userAgent.includes('Mac OS X')) return 'macOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
  return 'Desconocido';
};
//
// Detectamos el tipo de dispositivo
//
const getDeviceType = (userAgent: string): string => {
  if (userAgent.includes('Mobile') || userAgent.includes('Android') || userAgent.includes('iPhone')) return 'Móvil';
  if (userAgent.includes('Tablet') || userAgent.includes('iPad')) return 'Tablet';
  return 'Escritorio';
};
//
// Registramos accesos
//
export const registrarAcceso = async (
  empresaId: number,
  usuarioId: number,
  resultado: ResultadoAcceso,
  motivoFallo?: string,
  ipAddress?: string
): Promise<void> => {
  try {
    //
    // Obtenemos información del navegador y sistema
    //
    const userAgent = navigator.userAgent;
    const navegador = getBrowserName(userAgent);
    const sistemaOperativo = getOSName(userAgent);
    const dispositivo = getDeviceType(userAgent);
    //
    // Obtenemos IP del usuario si no se proporciona
    //
    let ip = ipAddress;
    if (!ip) {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        ip = (await response.json()).ip;
      } catch (error) {
        console.warn('No se pudo obtener la IP del usuario:', error);
        ip = 'Desconocida';
      }
    }

    const objLogAcceso = {
      empresaId: empresaId,
      usuarioId: usuarioId,
      ipAddress: ip,
      userAgent: userAgent,
      navegador: navegador,
      sistemaOperativo: sistemaOperativo,
      dispositivo: dispositivo,
      resultado: resultado,
      motivoFallo: motivoFallo || null,
      fechaAcceso: new Date(),
    };

    await postLogAcceso(objLogAcceso);
  } catch (error) {
    console.error('Error al registrar el acceso:', error);
    // No relanzar el error para no interrumpir el flujo principal de la aplicación
  }
};
//
// Registramos login exitoso
//
export const registrarLoginExitoso = async (empresaId: number, usuarioId: number, ipAddress?: string): Promise<void> => {
  return registrarAcceso(empresaId, usuarioId, 'exitoso', undefined, ipAddress);
};
//
// Registramos login fallido
//
export const registrarLoginFallido = async (empresaId: number, usuarioId: number, motivoFallo: string, ipAddress?: string): Promise<void> => {
  return registrarAcceso(empresaId, usuarioId, 'fallido', motivoFallo, ipAddress);
};
//
// Registramos acceso bloqueado
//
export const registrarAccesoBloqueado = async (empresaId: number, usuarioId: number, motivoFallo: string, ipAddress?: string): Promise<void> => {
  return registrarAcceso(empresaId, usuarioId, 'bloqueado', motivoFallo, ipAddress);
};
//
// Registramos logout (como acceso exitoso con motivo específico)
//
export const registrarLogout = async (empresaId: number, usuarioId: number, ipAddress?: string): Promise<void> => {
  return registrarAcceso(empresaId, usuarioId, 'exitoso', 'Logout del usuario', ipAddress);
};
//
// Registramos eventos de seguridad específicos
//
export const registrarEventoSeguridad = async (
  empresaId: number,
  usuarioId: number,
  tipoEvento: string,
  ipAddress?: string
): Promise<void> => {
  return registrarAcceso(empresaId, usuarioId, 'fallido', `Evento de seguridad: ${tipoEvento}`, ipAddress);
};