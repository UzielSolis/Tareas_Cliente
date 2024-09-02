# Mi CV Personal

Este proyecto es una página web personal que muestra el currículum de Uziel Solis, incluyendo información sobre su educación, habilidades, proyectos y una sección de contacto. La página se construye usando HTML, CSS (SASS), TypeScript, y se incluye un modal para el formulario de contacto.

## Contenido

- **`index.html`**: Archivo principal HTML que define la estructura de la página.
- **`styles.scss`**: Archivo SASS para el estilo de la página.
- **`scripts.ts`**: Archivo TypeScript para la funcionalidad del modal y validación del formulario.
- **`data.json`**: Archivo JSON que contiene los datos del currículum.

## Instalación

Para instalar las dependencias y configurar el proyecto, sigue estos pasos:

1. **Clona el repositorio:**

    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    cd tu-repositorio
    ```

2. **Instala las dependencias:**

    Si usas **npm**:

    ```bash
    npm install
    ```

    O si usas **yarn**:

    ```bash
    yarn install
    ```

## Funcionamiento

### Modal de contacto

El modal se abre al hacer clic en el botón "Contacto" y se cierra al hacer clic en el botón de cierre o fuera del modal. El formulario dentro del modal se valida para asegurar que todos los campos estén correctamente completados antes de enviarlo.

### Formulario de contacto

Los datos del formulario se envían a la dirección de correo electrónico definida en el archivo JSON. El atributo action del formulario se actualiza dinámicamente basado en los datos del JSON.

### Cambiar el correo electronico del contacto

Para cambiar la dirección de correo electrónico a la que se enviarán los formularios de contacto, modifica el archivo data.json. Busca la propiedad "contactEmail" y actualízala con la nueva dirección de correo electrónico. Aquí tienes un ejemplo de cómo debe lucir:

```bash
json
{
    "contactEmail": "nuevo-email@dominio.com"
}
```