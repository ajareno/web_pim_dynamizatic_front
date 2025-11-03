// AutoLogout.js
import React, { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import Swal from 'sweetalert2';
import { useAuth } from "@/app/auth/AuthContext";

const AutoLogout = () => {
  const { logout } = useAuth();
  const timeoutId = useRef(null);
  const intl = useIntl();

  useEffect(() => {
    //
    // Validar si el token de la sesión sigue siendo válido sino cierra la sesión
    //
    const validarSesion = () => {
      const userData = localStorage.getItem('userData');
      //
      //Si por algún motivo no existe la información del usuario en localStorage entonces la sesión no es válida y se cerrará
      //
      if (!userData) {
        return false;
      }
      try {
        //
        //Obtenemos el token de la sesión
        //
        const user = JSON.parse(userData);
        const accessToken = user.accessToken;
        //
        // Decodificar el JWT (solo el payload para saber la fecha de expiración)
        //
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        const ahora = Math.floor(Date.now() / 1000); // Timestamp actual
        //
        //Si la fecha de expiración es menor al tiempo actual entonces la sesión ha expirado
        //
        if (payload.exp < ahora) {
          //
          // Si el token ha expirado mostramos una alerta y cerramos sesión
          //
          Swal.fire({
            title: intl.formatMessage({ id: 'Sesión cerrada por inactividad' }),
            text: intl.formatMessage({ id: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.' }),
            icon: 'info',
            showConfirmButton: false,
            timer: 5000, // Opcional: Cierra automáticamente el swal después de 5 segundos
            allowOutsideClick: false // Opcional: No permite cerrar el swal haciendo clic fuera de él
          }).then(() => {
            logout()
          });
          return false;
        }
        //
        //Si llega hasta aquí indica que el token sigue siendo válido
        //
        return true;
        
      } catch (error) {
        // Error al parsear, token inválido - cerrar sesión silenciosamente
        logout();
        return false;
      }
    };

    const resetearTiempo = () => {
      //
      //Si el usuario NO esta logeado entonces NO se ejecuta el temporizador (evita bucle infinito)
      //
      if (!localStorage.getItem('userData')) {
        return; // Sale inmediatamente si no hay sesión - EVITA BUCLE INFINITO
      }
      //
      // Validar si la sesión sigue siendo válida
      //
      if (!validarSesion()) {
        return; // Sale si la sesión no es válida
      }
      //
      // Calcular la fecha futura de logout por inactividad
      //
      let minutosInactividad = 5; // Por defecto 5 minutos
      const tiempoEsperaMinutos = localStorage.getItem('tiempoDeEsperaInactividad')
      if (localStorage.getItem('tiempoDeEsperaInactividad')) {
        minutosInactividad = parseInt(tiempoEsperaMinutos); // Convertir a número
      }
      
      // Calcular fecha futura de logout (fecha actual + minutos de inactividad)
      const fechaLogout = new Date();
      fechaLogout.setMinutes(fechaLogout.getMinutes() + minutosInactividad);
      
      // Calcular cuántos milisegundos faltan hasta esa fecha
      const milisegundosHastaLogout = fechaLogout.getTime() - Date.now();
      //
      // Limpia el temporizador existente
      //
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      //
      // Inicia un nuevo temporizador basado en fecha futura
      //
      timeoutId.current = setTimeout(() => {
        //
        // Cierra la sesión automáticamente después de inactividad
        // Muestra el swal antes de cerrar sesión
        //
        Swal.fire({
          title: intl.formatMessage({ id: 'Sesión cerrada por inactividad' }),
          text: intl.formatMessage({ id: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.' }),
          icon: 'info',
          showConfirmButton: false,
          timer: 5000, // Opcional: Cierra automáticamente el swal después de 5 segundos
          allowOutsideClick: false // Opcional: No permite cerrar el swal haciendo clic fuera de él
        }).then(() => {
          logout()
        });
      }, milisegundosHastaLogout);

    };
    //
    // Eventos que reinician el temporizador
    //
    const eventos = ['mousemove', 'keydown', 'scroll', 'click'];
    eventos.forEach((event) => {
      window.addEventListener(event, resetearTiempo);
    });
    //
    // Inicia el temporizador por primera vez
    //
    resetearTiempo();

    return () => {
      //
      // Limpia el temporizador y los listeners al desmontar el componente      
      //
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
      eventos.forEach((event) => {
        window.removeEventListener(event, resetearTiempo);
      });
    };
  }, []);

  return null; // No renderiza nada, ya que es un componente de inicialización
};

export default AutoLogout;
