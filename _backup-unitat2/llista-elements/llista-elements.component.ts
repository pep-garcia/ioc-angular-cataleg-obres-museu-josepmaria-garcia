import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TargetaElementComponent } from '../targeta-element/targeta-element.component';
import { Element } from '../../models/element.model';

@Component({
  imports: [TargetaElementComponent],
  selector: 'app-llista-elements',
  styleUrl: './llista-elements.component.scss',
  templateUrl: './llista-elements.component.html',
})
export class LlistaElementsComponent {
  @Input({ required: true }) elements: Element[] = [];
  @Input() elementSeleccionatId?: number;
  @Output() selecciona = new EventEmitter<Element>();

  propagaSeleccio(element: Element): void {
    this.selecciona.emit(element);
  }
}
