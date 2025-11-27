# Phantom Shield - Versión Estática (GitHub Pages)

Esta carpeta contiene la versión estática de **Phantom Shield**, lista para ser alojada en cualquier servidor web estático como GitHub Pages, Netlify o Vercel.

## 🚀 Cómo subir a GitHub Pages

1.  **Crear un repositorio en GitHub:**
    *   Ve a [GitHub.com](https://github.com) y crea un nuevo repositorio (público o privado).
    *   Dale un nombre, por ejemplo: `phantom-shield`.

2.  **Subir los archivos:**
    *   Puedes subir el contenido de esta carpeta (`phantom_shield_static`) directamente a través de la interfaz web de GitHub (botón "Upload files").
    *   O usar Git desde tu terminal:
        ```bash
        cd phantom_shield_static
        git init
        git add .
        git commit -m "Initial commit"
        git branch -M main
        git remote add origin https://github.com/TU_USUARIO/phantom-shield.git
        git push -u origin main
        ```

3.  **Activar GitHub Pages:**
    *   En tu repositorio en GitHub, ve a **Settings** > **Pages**.
    *   En "Source", selecciona **Deploy from a branch**.
    *   En "Branch", selecciona `main` y la carpeta `/ (root)`.
    *   Haz clic en **Save**.

4.  **¡Listo!**
    *   GitHub te dará una URL (ej. `https://tu-usuario.github.io/phantom-shield/`) donde tu sitio estará visible en unos minutos.

## 📁 Contenido

*   `index.html`: Página principal.
*   `security_levels.html`: Niveles de seguridad.
*   `implementation.html`: Plan de implementación.
*   `services.html`: Servicios adicionales.
*   `threat_model.html`: Modelo de amenazas.
*   `contact.html`: Página de contacto.
*   `static/`: Carpeta con estilos (CSS), scripts (JS) e imágenes.

## ⚠️ Nota

Esta versión no requiere Python ni bases de datos. Es puramente HTML, CSS y JavaScript, lo que la hace extremadamente rápida y segura.
