# Models i adaptadors

## Interfícies principals

### ElementCataleg (model intern)

Model utilitzat dins l'aplicació Angular:

```typescript
interface Element {
  id: string;
  titol: string;
  autor: string;
  descripcio: string;
  categoria: string;
  anyAdquisicio: number;
  valoracioEconomica: number;
  imatge: string;
  destacat?: boolean;
}
```

### ElementApiResponse (resposta API)

Format de les dades que retorna l'API:

```typescript
interface ElementApiResponse {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  price: number;
  image: string;
  featured: boolean;
  acquisitionYear: number;
}
```

## Adaptadors

### adaptarElementApi()

Transforma un element de l'API al format intern:

- Canvia `title` → `titol`, `author` → `autor`, `description` → `descripcio`, `category` → `categoria`, `price` → `valoracioEconomica`, `acquisitionYear` → `anyAdquisicio`, `image` → `imatge` i `featured` → `destacat`

- Assigna una imatge per defecte si `image` és buit

### adaptarElementsApi()

Aplica `adaptarElementApi()` a un array d'elements.

### elementBuit()

Retorna un element amb valors per defecte per inicialitzar formularis.

## Mapeig de camps

| Camp API          | Camp intern          | Transformació                                      |
| ----------------- | -------------------- | -------------------------------------------------- |
| `id`              | `id`                 | Conversió a `string`                               |
| `title`           | `titol`              | Renombrat, `trim()`                                |
| `author`          | `autor`              | Renombrat,`trim()`                                 |
| `description`     | `descripcio`         | Renombrat, `trim()`                                |
| `category`        | `categoria`          | Renombrat,`trim()` + normalització a català        |
| `price`           | `valoracioEconomica` | Renombrat, `Number()` segur (0 si no és vàlid)     |
| `acquisitionYear` | `anyAdquisicio`      | Renombrat, `Number()` segur (0 si no és vàlid)     |
| `image`           | `imatge`             | Renombrat, `trim()` + valor per defecte si és buit |
| `featured`        | `destacat`           | Renombrat, `=== true`                              |
