import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mutant-checker',
  templateUrl: './mutant-checker.component.html',
  styleUrls: ['./mutant-checker.component.css']
})
export class MutantCheckerComponent {
  dnaInput: string = '';
  result: boolean | null = null;
  isLoading: boolean = false;

  constructor(private snackBar: MatSnackBar) {}

  checkMutant() {
    this.isLoading = true;
    setTimeout(() => {
      const dna = this.dnaInput.split(',').map(s => s.trim());
      if (!this.isValidDna(dna)) {
        this.snackBar.open('La secuencia de ADN solo puede contener A, T, C, G.', 'Cerrar', {
          duration: 3000,
          panelClass: 'error-snackbar'
        });
        this.isLoading = false;
        return;
      }
      this.result = this.isMutant(dna);
      this.showResult();
      this.isLoading = false;
    }, 2000); // Simula un tiempo de carga de 2 segundos
  }

  isValidDna(dna: string[]): boolean {
    const validChars = new Set(['A', 'T', 'C', 'G']);
    return dna.every(row => [...row].every(char => validChars.has(char)));
  }

  isMutant(dna: string[]): boolean {
    const n = dna.length;
    let count = 0;

    // Verificar horizontalmente
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - 3; j++) {
        if (
          dna[i][j] === dna[i][j + 1] &&
          dna[i][j] === dna[i][j + 2] &&
          dna[i][j] === dna[i][j + 3]
        ) {
          count++;
          if (count > 1) return true; // Si encuentra más de una secuencia, es mutante
        }
      }
    }

    // Verificar verticalmente
    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n - 3; i++) {
        if (
          dna[i][j] === dna[i + 1][j] &&
          dna[i][j] === dna[i + 2][j] &&
          dna[i][j] === dna[i + 3][j]
        ) {
          count++;
          if (count > 1) return true; // Si encuentra más de una secuencia, es mutante
        }
      }
    }

    // Verificar diagonalmente (de izquierda a derecha)
    for (let i = 0; i < n - 3; i++) {
      for (let j = 0; j < n - 3; j++) {
        if (
          dna[i][j] === dna[i + 1][j + 1] &&
          dna[i][j] === dna[i + 2][j + 2] &&
          dna[i][j] === dna[i + 3][j + 3]
        ) {
          count++;
          if (count > 1) return true; // Si encuentra más de una secuencia, es mutante
        }
      }
    }

    // Verificar diagonalmente (de derecha a izquierda)
    for (let i = 0; i < n - 3; i++) {
      for (let j = 3; j < n; j++) {
        if (
          dna[i][j] === dna[i + 1][j - 1] &&
          dna[i][j] === dna[i + 2][j - 2] &&
          dna[i][j] === dna[i + 3][j - 3]
        ) {
          count++;
          if (count > 1) return true; // Si encuentra más de una secuencia, es mutante
        }
      }
    }

    return false; // Si no encuentra más de una secuencia, no es mutante
  }

  showResult() {
    const message = this.result ? '¡Es un mutante!' : 'No es un mutante.';
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: this.result ? 'mutant-snackbar' : 'not-mutant-snackbar'
    });
  }
}
