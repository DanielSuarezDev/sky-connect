# ✈️ Sky Connect

Una aplicación moderna de búsqueda de vuelos construida con Next.js que ayuda a los usuarios a encontrar y comparar opciones de vuelo con una interfaz intuitiva y atractiva.

## 🚀 Mi Bonus para la prueba

- **Diseño Responsive**: Experiencia fluida en todos los dispositivos
- **Soporte de Temas**: Modo oscuro y claro para una visualización cómoda
- **Avión Personalizada**: Cree un avión personalizado llamado alfred - lo puedes ver en mapas

    <img src="./public/airplane-map.png" alt="Mi genial imagen" width=130 />

- **Arquitectura Moderna**: Aprovechando Next.js 15 con App Router
- **Optimización de Rendimiento**: Uso estratégico de Componentes Servidor y Cliente
- **Testing**: Cobertura completa de pruebas para garantizar la fiabilidad
- **UI/UX Mejorada**: 
  - Animaciones y transiciones suaves 🥳
  - Funcionalidad de historial de búsqueda 🥰
  - Implementación del diseño de Figma con mejoras consideradas 🫣
  - Interfaz de usuario intuitiva 💚

## 🏗️ Arquitectura

Este proyecto sigue los principios de 👀 Screaming Architecture 👀, aunque es un proyecto muy pequeño quice demostrar como se estructuraría un proyecto en la vida real con alto potencia de escalar ✊:

```
src/
├── app/                    # Páginas del App Router de Next.js
├── components/            # Componentes UI reutilizables Globales
│   ├── ui/               # Componentes UI básicos
│   ├── blocks/         # Componentes específicos de funcionalidades
├── hooks/                # Hooks personalizados de React reutilizables
├── lib/                  # Funciones y configuraciones de utilidad
├── services/            # Integraciones con APIs y servicios externos reutilizables
├── modules/              # Aqui van los modulos separados por features 👀.
    ├── airplane/               
    │   ├── pages/ 
    │   ├── components/               
    │   ├── pages/ 
    │   ├── services/               
    │   ├── hooks/
    │   ├── types/               
    │   ├── utils/  
    
```

## 💻 Organización del Código

Mantenemos una base de código limpia y modular con una clara separación de responsabilidades.


## 🛠️ Aspectos Técnicos Destacados

- **Renderizado del Lado del Servidor**: Optimizado para rendimiento y SEO
- **Componentes Cliente**: Uso estratégico para características interactivas
- **Seguridad de Tipos**: Implementación completa de TypeScript
- **Gestión de Estado**: Patrones eficientes de flujo de datos
- **Composición de Componentes**: Componentes UI reutilizables y mantenibles

## 🚀 Inicio Rápido

1. Clona el repositorio
2. Instala las dependencias:
```bash
yarn install
```

3. Configura las variables de entorno:
```bash
cp .env
```

4. Ejecuta el servidor de desarrollo:
```bash
yarn dev
```

5. Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación

## 🔐 Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# API Configuration
NEXT_PUBLIC_AVIATIONSTACK_API_KEY=tu_api_aviation_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_api_google_maps
```
Si no tienes las apis y quieres probarla puedes entrar aqui [https://sky-connect-eight.vercel.app/](https://sky-connect-eight.vercel.app/) para ver en producción el proyecto

## 🧪 Testing

Ejecuta la suite de pruebas:
```bash
yarn test
```

## 📱 Stack Tecnológico

- Next.js 15
- TypeScript
- Tailwind CSS
- Jest & React Testing Library
- Zustand

---

Construido con ❤️ usando tecnologías web modernas y mejores prácticas [https://danielsuarez.dev](https://danielsuarez.dev)
