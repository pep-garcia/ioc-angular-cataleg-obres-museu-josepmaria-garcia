import { adaptarElementApi, adaptarElementsApi } from './element.adaptador';
import { ElementApiResponse } from '../models/element.model';

describe('adaptarElementApi', () => {
  const apiElement: ElementApiResponse = {
    id: 'test-001',
    title: '  Títol de prova  ',
    description: 'Descripció de prova',
    category: 'painting',
    author: '',
    price: 10.5,
    image: '',
    featured: true,
    acquisitionYear: 2016,
  };

  it('canvia el nom del camp featured per destacat', () => {
    expect(adaptarElementApi(apiElement).destacat).toBe(true);
  });

  it('normalitza el text, la categoria i la imatge', () => {
    const adaptat = adaptarElementApi(apiElement);
    expect(adaptat.titol).toBe('Títol de prova');
    expect(adaptat.categoria).toBe('Pintura');
    expect(adaptat.imatge).toContain('placehold.co');
  });

  it('converteix números no vàlids a 0', () => {
    const adaptat = adaptarElementApi({ ...apiElement, price: 'abc' as unknown as number });
    expect(adaptat.valoracioEconomica).toBe(0);
  });

  it('adapta un array complet', () => {
    expect(adaptarElementsApi([apiElement, { ...apiElement, id: 'test-002' }])).toHaveLength(2);
  });
});
