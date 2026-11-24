# Configuració de serveis

## API Mock (desenvolupament)

### Arrencar el servidor

```bash
npm run api
```

### Endpoints disponibles

- `GET /elements` - Retorna tots els elements
- `GET /elements?category=painting` - Filtra per categoria
- `GET /elements/:id` - Obté un element per ID

### Configuració

- **Port:** 4301
- **Fitxer de dades:** `tools/api/catalog.json`

El filtre de text es pot aplicar al servei Angular després d'adaptar les dades. Així no depeneu d'un paràmetre de cerca específic del servidor.

## Canviar a API real

Per utilitzar una API real, modifiqueu `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://api.exemple.com',
  apiKey: 'LA_VOSTRA_CLAU_API', // Si cal autenticació
};
```

## ElementService

### Responsabilitats

- Comunicació HTTP amb l'API de catàleg (GET i POST)
- Gestió d'un estat únic (inicial, carregant, èxit, error) amb un signal
- Cerca reactiva amb `Subject` + `switchMap` (només compta l'última petició)
- Transformació de respostes amb adaptadors
- Gestió centralitzada d'errors amb missatges comprensibles

### API pública

| Membre                    | Tipus                   | Descripció                                              |
| ------------------------- | ----------------------- | ------------------------------------------------------- |
| `estat()`                 | `Signal<EstatElements>` | Fase actual, elements i missatge d'error                |
| `carregarTot()`           | `void`                  | Emet criteris buits: carrega tots els elements          |
| `cercar(criteris)`        | `void`                  | Emet criteris nous (terme i categoria)                  |
| `reintentar()`            | `void`                  | Repeteix l'última cerca                                 |
| `crearElement(nou)`       | `Observable<Element>`   | POST d'un element nou; en acabar, refresca el llistat   |
| `comptarResultats(terme)` | `Observable<number>`    | Nombre d'elements que coincideixen (validador asíncron) |

### Flux d'una cerca

1. `cercar()` emet els criteris a `criteris$`
2. `tap` guarda els criteris i posa l'estat a `carregant`
3. `switchMap` fa `GET /elements` (amb `?category=` si cal) i cancel·la peticions anteriors
4. `adaptarElementsApi` transforma la resposta i es filtra el text al servei
5. L'estat passa a `exit` amb els elements, o a `error` amb el missatge

### Gestió d'errors

| Codi HTTP | Missatge                                                             |
| --------- | -------------------------------------------------------------------- |
| 0         | No es pot connectar amb l'API. Comproveu que npm run api està actiu. |
| 404       | Recurs no trobat. Verifiqueu la URL de l'API.                        |
| 500       | Error intern del servidor.                                           |
| Altres    | Error inesperat (codi): missatge                                     |
