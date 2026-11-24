// 1. El model intern
export type CategoriaElement =
  'Pintura' | 'Escultura' | 'Dibuix' | 'Fotografia' | 'Audiovisual' | 'Tèxtil';

export interface Element {
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

export interface ElementApiResponse {
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

export type EstatServei = 'inicial' | 'carregant' | 'exit' | 'error';

export interface EstatElements {
  estat: EstatServei;
  elements: Element[];
  error?: string;
}

export interface CriterisCerca {
  terme: string;
  categoria: string;
}
export interface CercaDesada {
  terme: string;
  categoria: string;
  data: string; // ISO 8601, moment en què es va fer
}

export type NouElement = Pick<
  Element,
  'titol' | 'autor' | 'descripcio' | 'categoria' | 'anyAdquisicio' | 'valoracioEconomica'
>;
