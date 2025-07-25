# fraseandtisert (FRONTEND)

fraseandtisert es un proyecto full-stack que ofrece una API para gestionar autenticación, usuarios, productos, pedidos y otras funcionalidades relacionadas.
El modelo de negocio es una tienda de camisetas.

Este repositorio contiene exclusivamente el frontend, que se encarga de:

- Consumir la API del backend para mostrar productos, usuarios, pedidos y gestionar la sesión

- Implementar la lógica del carrito de compra con dos modos según el usuario:

  Usuarios no logueados → Manejo local con useReducer + localStorage para persistencia de datos

  Usuarios logueados → Sincronización con backend mediante llamadas API

  En login → Combinación y merge de la cesta local con la cesta del backend para mantener continuidad

## Características principales

- Manejo avanzado del carrito según estado del usuario (guest / logged-in)

- Formularios controlados y validación con React Hook Form

- Navegación y rutas protegidas con React Router DOM

- Gestión global de estado y modales mediante Context API

## Tecnologías utilizadas

- **Typescript**
- **React (hooks, context API)**
- **React Router DOM para routing**
- **React Hook Form para formularios y validación**
- **uuidv4 para generación de IDs únicos en carritos de usuario invitado**
- **CSS modular con metodología BEM**

## Estructura del proyecto

```bash
/src
/actions # Actions para reducer cart
/api # Funciones para llamadas a la API backend
/config # Api config
/constants # cart types
/components # Componentes reutilizables. Organización ATOM
/context # Contextos para modales, cesta, autenticación
/data
/hooks # Custom hooks para lógica común
/providers # Agrupacion de providers
/reducers # reducers
/pages # Páginas principales
/styles # Archivos CSS
/types # Tipos TypeScript
/utils # Funciones utilitarias
```

## **Scripts**

**npm run dev**: Inicia la aplicación en modo desarrollo

```bash
npm run dev
```

## **Notas**

- La gestión del carrito está diseñada para una experiencia fluida, incluso para usuarios no autenticados, sincronizando correctamente al hacer login.

- El sistema de modales globales permite mostrar loaders y mensajes de error en toda la app.

- Pendiente de implementación el formulario de suscripción a la newsletter

## **Repositorio Frontend**

El backend del proyecto está disponible en otro repositorio: [BACK-proyecto-13-fraseandtisert](https://github.com/marugandev/BACK-proyecto-13-fraseandtisert.git).
