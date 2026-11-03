import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TargetaElementComponent } from './components/targeta-element/targeta-element.component';
import {
  BarraFiltresComponent,
  FiltresElement,
} from './components/barra-filtres/barra-filtres.component';
import { Element } from './models/element.model';
import { LlistaElementsComponent } from './components/llista-elements/llista-elements.component';
import { ELEMENTS_MOCK } from './mocks/dades-mock';

@Component({
  imports: [RouterOutlet, LlistaElementsComponent, BarraFiltresComponent],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App {
  public nomAplicacio = "Catàleg d'obres museu";
  elements: Element[] = ELEMENTS_MOCK;
  elementSeleccionat: Element | undefined = undefined;

  elementsFiltrats: Element[] = ELEMENTS_MOCK;
  filtresActuals: FiltresElement = { text: '', categoria: 'Totes' };

  seleccionaElement(element: Element): void {
    this.elementSeleccionat = element;
  }

  tancaDetall(): void {
    this.elementSeleccionat = undefined;
  }

  actualitzarFiltres(filtres: FiltresElement): void {
    this.filtresActuals = filtres;
    const text = filtres.text.trim().toLocaleLowerCase('ca');

    this.elementsFiltrats = this.elements.filter((element) => {
      const categoriaCoincideix =
        filtres.categoria === 'Totes' || element.categoria === filtres.categoria;
      const textCoincideix = text === '' || this.conteText(element, text);
      return categoriaCoincideix && textCoincideix;
    });
    if (this.elementSeleccionat && !this.elementsFiltrats.includes(this.elementSeleccionat)) {
      this.elementSeleccionat = undefined;
    }
  }
  private conteText(element: Element, text: string): boolean {
    const contingut = `${element.titol} ${element.descripcio} ${element.autor}`.toLocaleLowerCase(
      'ca',
    );
    return contingut.includes(text);
  }
}
