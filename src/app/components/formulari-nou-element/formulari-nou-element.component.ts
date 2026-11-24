import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ElementService } from '../../services/element.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-formulari-nou-element',
  styleUrl: './formulari-nou-element.component.scss',
  templateUrl: './formulari-nou-element.component.html',
})
export class FormulariNouElementComponent {
  private readonly elementService = inject(ElementService);

  readonly categories = [
    'painting',
    'sculpture',
    'photography',
    'drawing',
    'audiovisual',
    'textile',
  ];

  readonly formulari = new FormGroup({
    titol: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    autor: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    descripcio: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
    categoria: new FormControl('painting', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    anyAdquisicio: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(2000)],
    }),
    valoracioEconomica: new FormControl(1, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
  });

  // Estat de l'enviament (canvia dins d'una resposta HTTP: per això és un signal)
  readonly enviant = signal(false);
  readonly missatge = signal<string | null>(null);
  readonly error = signal<string | null>(null);

  crear(): void {
    if (this.formulari.invalid) {
      this.formulari.markAllAsTouched();
      return;
    }

    this.enviant.set(true);
    this.missatge.set(null);
    this.error.set(null);

    this.elementService.crearElement(this.formulari.getRawValue()).subscribe({
      next: (element) => {
        this.missatge.set(`S'ha creat "${element.titol}" amb l'identificador ${element.id}.`);
        this.formulari.reset();
        this.enviant.set(false);
      },
      error: () => {
        this.error.set("No s'ha pogut crear l'element. Comproveu que l'API està activa.");
        this.enviant.set(false);
      },
    });
  }

  teError(
    control:
      'titol' | 'autor' | 'descripcio' | 'categoria' | 'anyAdquisicio' | 'valoracioEconomica',
  ): boolean {
    const c = this.formulari.controls[control];
    return c.invalid && (c.dirty || c.touched);
  }
}
