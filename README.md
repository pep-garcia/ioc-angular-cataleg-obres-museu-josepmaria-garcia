# Catàleg d'obres d'Art - Unitat 2

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

- ✅ Targeta reutilitzable amb subcomponent d'etiqueta
- ✅ Llistat dinàmic amb iteració optimitzada i panell de detall
- ✅ Formulari de filtres (text i categoria) amb validacions i restabliment
- ✅ Filtratge combinat
- ✅ Estats visuals (buit, resultats)
- ✅ Mesures d'accessibilitat implementades (labels, ARIA, teclat, focus visible)
- ✅ Responsive design

## Estructura del projecte

```
src/app/
├── models/
│   └── element.model.ts          # Interfície Element
├── mocks/
│   └── dades-mock.ts              # Dades simulades (10 elements)
├── components/
│   ├── etiqueta-element/          # Subcomponent etiqueta (badge)
│   ├── targeta-element/           # Component targeta (@Input/@Output)
│   ├── llista-elements/           # Component llistat (@for, @empty)
│   └── barra-filtres/             # Formulari de filtres (FormsModule)
└── app.component.*                # Component arrel (estat, filtratge, detall)
```

## Execució

```bash
npm install
ng serve --open
```

Aplicació disponible a `http://localhost:4200`

## Enllaç del repositori

- Arrel:
  - https://github.com/pep-garcia/ioc-angular-cataleg-obres-museu-josepmaria-garcia
- Branca ra2-components:
  - https://github.com/pep-garcia/ioc-angular-cataleg-obres-museu-josepmaria-garcia/tree/ra2-components
