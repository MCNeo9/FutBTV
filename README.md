

# FutBTV

FutBTV es una plataforma diseñada para transmitir partidos de fútbol en vivo y otros deportes, proporcionando una experiencia sencilla y accesible para los usuarios.

## 🚀 Características

- **Transmisión en vivo:** Acceso a eventos deportivos en tiempo real.
- **Interfaz moderna:** Diseño intuitivo y fácil de usar.
- **SEO optimizado:** Mejor posicionamiento en motores de búsqueda.
- **Tokens de acceso:** Seguridad mediante tokens únicos para la protección de enlaces.

## 🛠️ Requisitos

- **Node.js**: >=16.x
- **Vercel**: Para el despliegue en producción.
- **Variables de entorno**: Asegúrate de configurar las siguientes variables en tu entorno:

  ```
  JWT_SECRET=your_super_secret_key
  API_EVENTS_URL=tu_api_de_eventos
  NEXT_PUBLIC_BASE_URL=https://yourdomain.com
  ```

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/ManuelC09/futbtv.git
   cd futbtv
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:
   ```env
   JWT_SECRET=your_super_secret_key
   API_EVENTS_URL=tu_api_de_eventos
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Abre tu navegador en [http://localhost:3000](http://localhost:3000).



## 📂 Estructura del Proyecto

```
src/
├── app/
│   ├── api/          # Endpoints API
│   ├── components/   # Componentes compartidos (Navbar, Footer)
│   ├── channel/      # Página para mostrar canales
│   ├── utils/        # Utilidades (tokens, JWT, configuración)
│   ├── globals.css   # Estilos globales
│   ├── layout.tsx    # Diseño principal del proyecto
│   └── page.tsx      # Página principal
├── public/           # Archivos públicos (favicon, imágenes)
├── .env.local        # Variables de entorno locales
├── package.json      # Configuración de dependencias y scripts
```
## 📘 Propósito Educacional y Descargo de Responsabilidad

Este proyecto ha sido desarrollado únicamente con fines educacionales y de aprendizaje. No se pretende infringir ningún derecho de autor ni promover el uso indebido de enlaces externos.

**Descargo de Responsabilidad**:  
El autor de este proyecto no se hace responsable del uso que los usuarios puedan dar a este software. El contenido y los enlaces externos presentados en esta aplicación son gestionados por servicios externos, y no se almacena ningún contenido protegido por derechos de autor en este repositorio ni en los servidores utilizados para desplegarlo. Es responsabilidad del usuario garantizar el cumplimiento de las leyes y regulaciones locales relacionadas con los derechos de autor y el uso de contenido en línea.


