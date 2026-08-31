# Frontend REST & GraphQL

Frontend desarrollado con React y TypeScript para consumir y gestionar vehículos mediante dos APIs:

* REST API
* GraphQL API

La aplicación permite seleccionar qué API utilizar y realizar las mismas operaciones independientemente de la tecnología utilizada por el backend.

## Tecnologías

* React
* TypeScript
* Vite
* Material UI
* Apollo Client
* GraphQL
* REST API
* Fetch API

## Arquitectura

El frontend utiliza una arquitectura que abstrae el mecanismo de comunicación con el backend.

```text
                         ┌──────────────────┐
                         │      App.tsx     │
                         └────────┬─────────┘
                                  │
                                  ▼
                       ┌─────────────────────┐
                       │  getVehicleApi()    │
                       └──────────┬──────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
                    ▼                           ▼
             ┌──────────────┐           ┌──────────────┐
             │  REST API    │           │ GraphQL API  │
             └──────┬───────┘           └──────┬───────┘
                    │                          │
                    ▼                          ▼
               Fetch API                 Apollo Client
                                               │
                                               ▼
                                      GraphQL HTTP Link
```

De esta manera, `App.tsx` no necesita conocer cómo se realiza cada operación.

Por ejemplo:

```ts
const api = getVehicleApi(apiType);

const vehicles = await api.getVehicles();
```

La operación puede terminar utilizando REST o GraphQL dependiendo de la selección realizada por el usuario.

---

## Funcionalidades

La aplicación permite:

* Listar vehículos.
* Buscar vehículos.
* Crear vehículos.
* Editar vehículos.
* Eliminar vehículos.
* Seleccionar REST o GraphQL como fuente de datos.
* Mostrar notificaciones de las operaciones realizadas.
* Mostrar estados de carga y errores.
* Utilizar un formulario modal para crear y editar vehículos.
* Visualizar los vehículos mediante una tabla.
* Utilizar Material UI para la interfaz.

---

## Estructura del proyecto

```text
src/
│
├── api/
│   │
│   ├── graphql/
│   │   ├── apollo.ts
│   │   └── vehicle.api.ts
│   │
│   ├── rest/
│   │   └── vehicle.api.ts
│   │
│   └── vehicle.api.ts
│
├── components/
│   │
│   ├── VehicleForm/
│   │   └── VehicleForm.tsx
│   │
│   └── VehicleTable/
│       └── VehicleTable.tsx
│
├── config/
│   └── api.ts
│
├── types/
│   ├── create-vehicle.ts
│   └── vehicle.ts
│
├── App.tsx
└── main.tsx
```

---

## Configuración de las APIs

Las URLs de los servicios se encuentran centralizadas en:

```text
src/config/api.ts
```

Ejemplo:

```ts
export const API_CONFIG = {
  rest: {
    baseUrl: 'http://localhost:8000/api',
  },

  graphql: {
    baseUrl: 'http://localhost:8001/graphql',
  },
};
```

Por lo tanto:

### REST

```text
http://localhost:8000/api
```

### GraphQL

```text
http://localhost:8001/graphql
```

---

## API REST

Las operaciones REST están encapsuladas dentro de:

```text
src/api/rest/vehicle.api.ts
```

La implementación utiliza `fetch`.

Ejemplo:

```ts
export async function getVehicles(): Promise<Vehicle[]> {
  const response = await fetch(
    `${API_CONFIG.rest.baseUrl}/vehicles`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch vehicles');
  }

  return response.json();
}
```

---

## API GraphQL

Las operaciones GraphQL están encapsuladas dentro de:

```text
src/api/graphql/vehicle.api.ts
```

La comunicación se realiza mediante **Apollo Client**.

El cliente se configura en:

```text
src/api/graphql/apollo.ts
```

Actualmente utiliza un `HttpLink`:

```ts
const httpLink = new HttpLink({
  uri: API_CONFIG.graphql.baseUrl,
});
```

y el cliente:

```ts
export const apolloClient =
  new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
```

---

## Apollo Client

Apollo se utiliza exclusivamente como capa de comunicación para GraphQL.

Las operaciones disponibles son:

```text
getVehicles()
searchVehicles()
createVehicle()
updateVehicle()
deleteVehicle()
```

Por ejemplo:

```ts
const { data } =
  await apolloClient.query({
    query: GET_VEHICLES,
    fetchPolicy: 'network-only',
  });
```

Las mutaciones utilizan:

```ts
apolloClient.mutate(...)
```

---

## Tipado GraphQL

Los documentos GraphQL están definidos utilizando `TypedDocumentNode`.

Ejemplo:

```ts
const GET_VEHICLES: TypedDocumentNode<
  GetVehiclesData
> = gql`
  query GetVehicles {
    vehicles {
      id
      licensePlate
      brand
      model
      year
      color
      type
      active
    }
  }
`;
```

Esto permite que TypeScript infiera correctamente el tipo de respuesta sin tener que especificar manualmente los genéricos en cada llamada a Apollo.

---

## Modelo de vehículo

El frontend utiliza el siguiente modelo:

```ts
export interface Vehicle {
  id: number;
  licensePlate: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  type: VehicleType;
  active: boolean;
}
```

Para la creación y actualización se utiliza:

```ts
export interface CreateVehicle {
  licensePlate: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  type: VehicleType;
}
```

---

## Selección de API

La aplicación permite seleccionar desde la interfaz:

```text
API

┌──────────────┐
│ REST       ▼ │
└──────────────┘
```

o:

```text
┌──────────────┐
│ GraphQL    ▼ │
└──────────────┘
```

Cuando el usuario cambia la opción, se vuelve a cargar la información utilizando la API seleccionada.

La aplicación utiliza:

```ts
const api = getVehicleApi(apiType);
```

Esto permite mantener una interfaz común para ambas implementaciones.

---

## Operaciones

### Listar vehículos

```ts
api.getVehicles();
```

### Buscar vehículos

```ts
api.searchVehicles(search);
```

### Crear vehículo

```ts
api.createVehicle(vehicle);
```

### Actualizar vehículo

```ts
api.updateVehicle(
  vehicle.id,
  vehicle,
);
```

### Eliminar vehículo

```ts
api.deleteVehicle(vehicle.id);
```

---

## Requisitos

Antes de ejecutar el proyecto es necesario tener instalado:

* Node.js
* npm

Además, las APIs REST y GraphQL deben estar ejecutándose.

---

## Instalación

Clonar el proyecto:

```bash
git clone <repository-url>
```

Ingresar al proyecto:

```bash
cd sd-frontend-rest-graphql
```

Instalar dependencias:

```bash
npm install
```

---

## Ejecución

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Por defecto, Vite iniciará la aplicación en:

```text
http://localhost:5173
```
