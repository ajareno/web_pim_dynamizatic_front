# FileUtils - Utilidades para Gestión de Archivos

Este módulo proporciona funciones reutilizables para la gestión de archivos e imágenes en el sistema. Estas funciones fueron extraídas de los componentes individuales para eliminar la duplicación de código y facilitar el mantenimiento.

## Funciones Disponibles

### `editarArchivos(registro, id, listaTipoArchivos, listaTipoArchivosAntiguos, seccion, usuario)`

Gestiona la edición de archivos para un registro existente. Compara los archivos antiguos con los nuevos y actualiza según sea necesario.

**Parámetros:**
- `registro`: El objeto que contiene los archivos nuevos
- `id`: ID del registro al que pertenecen los archivos
- `listaTipoArchivos`: Array con los tipos de archivos permitidos
- `listaTipoArchivosAntiguos`: Objeto con los archivos antiguos para comparar cambios
- `seccion`: Información de la sección donde se suben los archivos
- `usuario`: ID del usuario que realiza la acción

### `insertarArchivo(registro, id, tipoArchivo, seccion, usuario)`

Inserta un archivo nuevo en el sistema, subiendo el archivo al servidor y registrándolo en la base de datos.

**Parámetros:**
- `registro`: El objeto que contiene el archivo a insertar
- `id`: ID del registro al que pertenece el archivo
- `tipoArchivo`: Información del tipo de archivo
- `seccion`: Información de la sección donde se sube el archivo
- `usuario`: ID del usuario que realiza la acción

### `procesarArchivosNuevoRegistro(registro, id, listaTipoArchivos, seccion, usuario)`

Procesa todos los archivos para un nuevo registro recién creado.

**Parámetros:**
- `registro`: El objeto que contiene los archivos
- `id`: ID del registro recién creado
- `listaTipoArchivos`: Array con los tipos de archivos permitidos
- `seccion`: Información de la sección
- `usuario`: ID del usuario que realiza la acción

### `validarImagenes(registro, listaTipoArchivos)`

Valida que todas las imágenes en el registro tengan un formato permitido.

**Parámetros:**
- `registro`: El objeto que contiene las imágenes a validar
- `listaTipoArchivos`: Array con los tipos de archivos permitidos

**Retorna:**
- `boolean`: `true` si hay errores de validación, `false` si todo está correcto

**Formatos de imagen permitidos:**
- image/jpeg
- image/png
- image/webp
- image/tiff
- image/avif

### `crearListaArchivosAntiguos(registro, listaTipoArchivos)`

Crea una copia de los archivos antiguos de un registro para poder compararlos después durante la edición.

**Parámetros:**
- `registro`: El registro original
- `listaTipoArchivos`: Array con los tipos de archivos

**Retorna:**
- `Object`: Objeto con los archivos antiguos indexados por nombre del tipo de archivo

## Uso

```javascript
import { 
    editarArchivos, 
    insertarArchivo, 
    procesarArchivosNuevoRegistro, 
    validarImagenes, 
    crearListaArchivosAntiguos 
} from "@/app/utility/FileUtils";

// Ejemplo de validación de imágenes
const hasErrors = validarImagenes(usuario, listaTipoArchivos);
if (hasErrors) {
    // Mostrar error
}

// Ejemplo para nuevo registro
await procesarArchivosNuevoRegistro(usuario, nuevoRegistro.id, listaTipoArchivos, seccion, usuarioActual);

// Ejemplo para edición
await editarArchivos(usuario, registroId, listaTipoArchivos, listaTipoArchivosAntiguos, seccion, usuarioActual);
```

## Archivos Refactorizados

Las siguientes pantallas ahora utilizan estas funciones centralizadas:
- `app/(main)/usuarios/editar.jsx`
- `app/(main)/empresas/editar.jsx`

## Dependencias

Este módulo depende de:
- `@/app/api-endpoints/ficheros` - Para funciones de subida de archivos
- `@/app/api-endpoints/archivo` - Para gestión de registros de archivos en la base de datos

## Beneficios

1. **Eliminación de duplicación**: Código común centralizado
2. **Mantenimiento más fácil**: Cambios en un solo lugar
3. **Consistencia**: Mismo comportamiento en todas las pantallas
4. **Reutilización**: Fácil de usar en nuevas pantallas que requieran gestión de archivos
5. **Testing**: Más fácil probar funciones aisladas