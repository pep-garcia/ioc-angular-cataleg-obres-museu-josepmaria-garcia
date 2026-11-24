import { Element, ElementApiResponse, CategoriaElement, NouElement } from '../models/element.model';

const CATEGORIES_NORMALITZADES: Record<string, string> = {
  painting: 'Pintura',
  sculpture: 'Escultura',
  textile: 'Tèxtil',
  photography: 'Fotografia',
  drawing: 'Dibuix',
  audiovisual: 'Audiovisual',
};

const IMATGE_PER_DEFECTE = 'https://placehold.co/300x200?text=Sense+imatge';

function normalitzarCategoria(categoria: string | undefined): string {
  const neta = (categoria ?? '').trim();
  return CATEGORIES_NORMALITZADES[neta.toLocaleLowerCase()] ?? neta;
}

function numeroSegur(valor: unknown, perDefecte = 0): number {
  const n = Number(valor);
  return Number.isFinite(n) ? n : perDefecte;
}

export function adaptarElementApi(apiElement: ElementApiResponse): Element {
  return {
    id: String(apiElement.id),
    titol: (apiElement.title ?? '').trim(),
    descripcio: (apiElement.description ?? '').trim(),
    categoria: normalitzarCategoria(apiElement.category),
    autor: (apiElement.author ?? '').trim(),
    valoracioEconomica: numeroSegur(apiElement.price),
    imatge: apiElement.image || IMATGE_PER_DEFECTE,
    destacat: apiElement.featured === true,
    anyAdquisicio: numeroSegur(apiElement.acquisitionYear),
  };
}

export function adaptarElementsApi(apiElements: ElementApiResponse[]): Element[] {
  return apiElements.map(adaptarElementApi);
}

export function elementBuit(): Element {
  return {
    id: '',
    titol: '',
    descripcio: '',
    categoria: '',
    autor: '',
    valoracioEconomica: 0,
    imatge: IMATGE_PER_DEFECTE,
    destacat: false,
    anyAdquisicio: 0,
  };
}
export function prepararElementApi(nou: NouElement): Omit<ElementApiResponse, 'id'> {
  return {
    title: nou.titol.trim(),
    description: nou.descripcio.trim(),
    category: nou.categoria,
    author: nou.autor.trim(),
    price: Number(nou.valoracioEconomica),
    image: `https://placehold.co/300x200?text=${encodeURIComponent(nou.autor.trim())}`,
    featured: false,
    acquisitionYear: Number(nou.anyAdquisicio),
  };
}
