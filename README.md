# Catàleg d'obres d'Art - Unitat 3

## Nom de l'aplicació

- cataleg-obres-museu

## Autor/a

- Josep Maria Garcia Crehuet

## Descripció

- Aplicació web que permet fer un registre de les diferents obres d'art del museu així com la visualització i descripció d'aquestes.
- És una activitat de l'assignatura 0A01 Programació avançada dins del CFGS de DAW de l'IOC.

## Versions utilitzades

- **Angular CLI** : 22.2.0

- **Angular** : 22.2.0

- **Node.js** : 24.15.0

## Funcionalitats

- ✅ API mock amb `json-server` (`catalog.json` al port `4301`) i gestió centralitzada d'errors HTTP
- ✅ Models d'entrada/sortida, adaptadors de transformació (`adaptarElementApi`, `adaptarElementsApi`, `elementBuit`) i taula de mapeig de camps
- ✅ Servei `ElementService` amb `signals`, cerca reactiva amb `Subject` i `switchMap`, reintent i alta (`POST`)
- ✅ Formulari reactiu `FormulariCercaComponent` amb validació síncrona (`minLength(3)`) i asíncrona (`termeAmbResultatsValidator` amb `timer(400)` + `switchMap`)
- ✅ Documentació tècnica a `docs/serveis.md`, `docs/models.md` i `docs/formularis.md`

## Estructura del projecte

```
docs/
├── formularis.md                 # FormulariCercaComponent i validacions
├── models.md                     # Interfícies, adaptadors i mapeig de camps
└── serveis.md                    # Configuració API mock i ElementService
tools/
└── api/
    └── catalog.json              # Dades de l'API mock (port 4301)
src/app/
├── models/                       # Models del domini i respostes de l'API
├── adaptadors/                   # Adaptadors de dades API <-> aplicació
├── services/                     # ElementService i lògica d'estat/HTTP
└── components/                   # Components i formularis de l'aplicació
```

## Execució

```bash
npm install
ng serve --open
```

Aplicació disponible a `http://localhost:4200`
API mock disponible a `http://localhost:4301`

## Enllaç del repositori

- Arrel:
  - https://github.com/pep-garcia/ioc-angular-cataleg-obres-museu-josepmaria-garcia
- Branca ra3-serveis:
  - https://github.com/pep-garcia/ioc-angular-cataleg-obres-museu-josepmaria-garcia/tree/ra3-serveis
