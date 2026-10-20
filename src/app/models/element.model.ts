export type CategoriaElement = 'Pintura' | 'Escultura' | 'Dibuix' | 'Fotografia' | 'Audiovisual';
export interface Element {
  id: number;
  titol: string;
  autor: string;
  descripcio: string;
  categoria: CategoriaElement;
  dataActualitzacio: string;
  valoracioEconomica: number;
  destacat?: boolean;
}
