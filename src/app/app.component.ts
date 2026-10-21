import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TargetaElementComponent } from './components/targeta-element/targeta-element.component';
import { Element } from './models/element.model';
import { LlistaElementsComponent } from './components/llista-elements/llista-elements.component';
import { ELEMENTS_MOCK } from './mocks/dades-mock';

@Component({
  imports: [RouterOutlet, LlistaElementsComponent],
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class App {
  public nomAplicacio = "Catàleg d'obres museu";
  elements: Element[] = ELEMENTS_MOCK;
  elementSeleccionat: Element | undefined = undefined;

  seleccionaElement(element: Element): void {
    this.elementSeleccionat = element;
  }

  tancaDetall(): void {
    this.elementSeleccionat = undefined;
  }
}
