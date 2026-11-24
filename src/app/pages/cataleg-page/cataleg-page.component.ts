import { Component, OnInit, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ElementService } from '../../services/element.service';
import { CriterisCerca } from '../../models/element.model';
import { FormulariCercaComponent } from '../../components/formulari-cerca/formulari-cerca.component';
import { FormulariNouElementComponent } from '../../components/formulari-nou-element/formulari-nou-element.component';

@Component({
  imports: [DecimalPipe, FormulariCercaComponent, FormulariNouElementComponent], // ← Afegir el formulari
  selector: 'app-cataleg-page',
  styleUrl: './cataleg-page.component.scss',
  templateUrl: './cataleg-page.component.html',
})
export class CatalegPageComponent implements OnInit {
  readonly elementService = inject(ElementService);

  ngOnInit(): void {
    this.elementService.carregarTot();
  }

  onCerca(criteris: CriterisCerca): void {
    this.elementService.cercar(criteris);
  }

  reintentar(): void {
    this.elementService.reintentar();
  }
}
