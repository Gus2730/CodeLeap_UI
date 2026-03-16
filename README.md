# 📱 CodeLeap UI

Una aplicación web de red social moderna desarrollada con **Next.js 16** y **React 19**, que permite a los usuarios crear, editar y compartir posts.

## 🎯 Descripción del Proyecto

CodeLeap UI es una plataforma interactiva donde los usuarios pueden:
- 📝 Crear nuevos posts con título y contenido
- ✏️ Editar sus posts existentes
- 🗑️ Eliminar posts
- 👤 Registrarse con un nombre de usuario
- 📜 Ver un feed con todos los posts de la comunidad

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js** 16.1.6 - Framework React con SSR y routing
- **React** 19.2.4 - Librería de UI
- **React DOM** 19.2.4 - Renderizado en el DOM
- **TypeScript** 5.7.3 - Tipado estático
- **TailwindCSS** 4.2.0 - Estilos CSS utilities
- **Tailwind Merge** 3.3.1 - Gestión de clases Tailwind
- **Radix UI** - Componentes accesibles sin estilos
- **React Icons** 5.6.0 - Iconografía

### Utilidades
- **SWR** 2.4.1 - Data fetching y caching
- **date-fns** 4.1.0 - Manipulación de fechas
- **class-variance-authority** 0.7.1 - CV-based component styling
- **clsx** 2.1.1 - Utilidad para nombres de clases condicionales

### Desarrollo
- **ESLint** 9.39.4 - Linting de código
- **PostCSS** 8.5 - Procesamiento de estilos
- **@tailwindcss/postcss** 4.2.0 - Plugin de Tailwind para PostCSS

## 📁 Estructura del Proyecto

```
CodeLeap_UI/
├── app/                          # Directorio de la aplicación Next.js
│   ├── globals.css              # Estilos globales
│   ├── layout.tsx               # Layout raíz
│   └── page.tsx                 # Página principal (Home)
│
├── components/                   # Componentes reutilizables
│   ├── ui/                      # Componentes base
│   │   ├── button.tsx           # Componente botón
│   │   ├── input.tsx            # Campo de entrada
│   │   ├── spinner.tsx          # Indicador de carga
│   │   └── textarea.tsx         # Área de texto
│   │
│   ├── create-post-form.tsx     # Formulario para crear posts
│   ├── post-card.tsx            # Tarjeta individual de post
│   ├── posts-list.tsx           # Lista de posts
│   ├── edit-modal.tsx           # Modal para editar posts
│   ├── delete-modal.tsx         # Modal de confirmación de eliminación
│   ├── signup-modal.tsx         # Modal de registro
│   └── main-screen.tsx          # Pantalla principal después del login
│
├── lib/                          # Funciones y utilidades
│   ├── api.ts                   # Llamadas a la API REST
│   ├── user-store.ts            # Gestión de estado del usuario
│   └── utils.ts                 # Funciones auxiliares
│
├── styles/                       # Estilos adicionales
│   └── globals.css              # Estilos globales
│
├── public/                       # Archivos estáticos
│
├── hooks/                        # Custom React hooks (vacío)
│
├── package.json                  # Dependencias del proyecto
├── tsconfig.json                 # Configuración de TypeScript
├── next.config.mjs               # Configuración de Next.js
├── postcss.config.mjs            # Configuración de PostCSS
├── tailwind.config.js            # Configuración de TailwindCSS
├── components.json               # Configuración de componentes
├── global.d.ts                   # Declaraciones de tipos globales
├── next-env.d.ts                 # Tipos de Next.js
└── README.md                     # Este archivo
```

## 🚀 Instalación y Configuración

### Requisitos Previos
- **Node.js** 18+ o superior
- **npm** 9+ o **yarn**

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <repositorio-url>
cd CodeLeap_UI
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar el servidor de desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## 📋 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con hot-reload |
| `npm run build` | Compila la aplicación para producción |
| `npm start` | Inicia el servidor de producción |
| `npm run lint` | Ejecuta ESLint para validar el código |

## 🔌 Integración con API

La aplicación se conecta a una API REST en:
```
https://dev.codeleap.co.uk/careers/
```

### Endpoints Principales
- **GET** `/?limit=10&offset=0` - Obtener posts con paginación
- **POST** `/` - Crear nuevo post
- **PATCH** `/{id}/` - Actualizar un post
- **DELETE** `/{id}/` - Eliminar un post

### Modelos de Datos

**Post**
```typescript
{
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
}
```

**PostsResponse**
```typescript
{
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}
```

## 🧩 Componentes Principales

### SignupModal
Modal de registro que solicita el nombre de usuario before accessing the feed.

### MainScreen
Pantalla principal con:
- Formulario de creación de posts
- Lista de posts del feed
- Opciones para editar y eliminar

### CreatePostForm
Formulario para crear nuevos posts con validación.

### PostCard
Componente que muestra cada post con:
- Nombre del autor
- Fecha de creación
- Título y contenido
- Botones de edición y eliminación

### EditModal / DeleteModal
Modales para confirmar acciones de editar y eliminar posts.

## 💾 Gestión de Estado

El proyecto utiliza **Zustand** (a través de `user-store.ts`) para:
- Almacenar el nombre de usuario
- Mantener la sesión del usuario
- Persistencia local del usuario

## 🎨 Estilos

- **TailwindCSS** para utilidades CSS
- **Radix UI** para componentes accesibles
- **Lucide React** para iconos
- Tema oscuro/claro (configurable)

## ⚙️ Configuraciones Importantes

### TypeScript
- Configuración strict activada
- Soporte para path aliases `@/`

### Next.js
- Modo Turbopack habilitado
- Soporte para componentes del cliente con `"use client"`

### Tailwind CSS v4
- Configuración moderna con PostCSS
- Animaciones personalizadas con `tw-animate-css`

## 🐛 Solución de Problemas

### Error: "Unable to acquire lock"
```bash
# Limpiar la carpeta .next y reintentar
rm -r .next
npm run dev
```

### Puerto 3000 en uso
La aplicación utilizará automáticamente el puerto 3001 si el 3000 está ocupado.

### Dependencias no instaladas
```bash
npm install
```

## 📦 Versiones de Dependencias Clave

| Paquete | Versión |
|---------|---------|
| Next.js | 16.1.6 |
| React | 19.2.4 |
| TypeScript | 5.7.3 |
| TailwindCSS | 4.2.0 |
| SWR | 2.4.1 |

## 📧 Contacto y Documentación

- **API Base**: https://dev.codeleap.co.uk/careers/
- **Framework**: [Next.js Documentation](https://nextjs.org)
- **Estilos**: [TailwindCSS Documentation](https://tailwindcss.com)

## 📄 Licencia

Proyecto privado de CodeLeap.

---

**Última actualización**: Marzo 2026
