import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Service, inject, signal } from '@angular/core';
import { Observable, Subject, catchError, map, of, switchMap, tap } from 'rxjs';

import { environment } from '../../environments/environment';
import {
  adaptarElementApi,
  adaptarElementsApi,
  prepararElementApi,
} from '../adaptadors/element.adaptador';
import {
  CriterisCerca,
  Element,
  ElementApiResponse,
  EstatElements,
  NouElement,
} from '../models/element.model';

@Service()
export class ElementService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/elements`;

  private readonly criterisInicials: CriterisCerca = { terme: '', categoria: '' };
  private readonly criteris$ = new Subject<CriterisCerca>();
  private darrersCriteris = this.criterisInicials;

  private readonly estatSignal = signal<EstatElements>({ estat: 'inicial', elements: [] });
  readonly estat = this.estatSignal.asReadonly();

  constructor() {
    this.criteris$
      .pipe(
        tap((criteris) => {
          this.darrersCriteris = criteris;
          this.estatSignal.set({ estat: 'carregant', elements: [] });
        }),
        switchMap((criteris) =>
          this.obtenirElements(criteris).pipe(
            map((elements): EstatElements => ({ estat: 'exit', elements })),
            catchError((error: HttpErrorResponse) =>
              of<EstatElements>({
                estat: 'error',
                elements: [],
                error: this.gestionarError(error),
              }),
            ),
          ),
        ),
      )
      .subscribe((estat) => this.estatSignal.set(estat));
  }

  carregarTot(): void {
    this.cercar(this.criterisInicials);
  }

  cercar(criteris: CriterisCerca): void {
    console.log('Botó premut! Enviant criteris: ', criteris);
    this.criteris$.next({
      terme: criteris.terme.trim(),
      categoria: criteris.categoria,
    });
  }

  reintentar(): void {
    this.criteris$.next(this.darrersCriteris);
  }

  crearElement(nou: NouElement): Observable<Element> {
    return this.http.post<ElementApiResponse>(this.apiUrl, prepararElementApi(nou)).pipe(
      map(adaptarElementApi),
      tap(() => this.reintentar()),
    );
  }

  comptarResultats(terme: string): Observable<number> {
    return this.obtenirElements({ terme, categoria: '' }).pipe(map((elements) => elements.length));
  }

  private obtenirElements(criteris: CriterisCerca): Observable<Element[]> {
    let params = new HttpParams();
    if (criteris.categoria) {
      params = params.set('category', criteris.categoria.toLowerCase());
    }

    return this.http.get<ElementApiResponse[]>(this.apiUrl, { params }).pipe(
      map(adaptarElementsApi),
      map((elements) => this.filtrarPerTerme(elements, criteris.terme)),
    );
  }

  private filtrarPerTerme(elements: Element[], terme: string): Element[] {
    console.log('Filtrant per:', terme);
    const text = terme.trim().toLocaleLowerCase('ca');
    if (text.length < 3) {
      return elements;
    }
    return elements.filter((element) =>
      `${element.titol} ${element.descripcio}`.toLocaleLowerCase('ca').includes(text),
    );
  }

  private gestionarError(error: HttpErrorResponse): string {
    switch (error.status) {
      case 0:
        return "No es pot connectar amb l'API. Comproveu que npm run api està actiu.";
      case 404:
        return "Recurs no trobat. Verifiqueu la URL de l'API.";
      case 500:
        return 'Error intern del servidor.';
      default:
        return `Error inesperat (${error.status}): ${error.message}`;
    }
  }
}
