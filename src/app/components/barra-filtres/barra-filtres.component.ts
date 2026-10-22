import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriaElement } from '../../models/element.model';

export interface FiltresElement {
  text: string;
  categoria: CategoriaElement | 'Totes';
}

@Component({
  imports: [FormsModule],
  selector: 'app-barra-filtres',
  styleUrl: './barra-filtres.component.scss',
  templateUrl: './barra-filtres.component.html',
})
export class BarraFiltresComponent {
  @Output() filtresCanviats = new EventEmitter<FiltresElement>();

  categories: Array<CategoriaElement | 'Totes'> = [
    'Totes',
    'Pintura',
    'Escultura',
    'Dibuix',
    'Fotografia',
    'Audiovisual',
  ];

  filtres: FiltresElement = {
    text: '',
    categoria: 'Totes',
  };

  aplicaFiltres(): void {
    this.filtresCanviats.emit({ ...this.filtres });
  }

  restableixFiltres(): void {
    this.filtres = { text: '', categoria: 'Totes' };
    this.aplicaFiltres();
  }
}
