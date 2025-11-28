import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-api-key-dialog',
  imports: [
    ClipboardModule,
    MatButtonModule,
    MatIconModule
],
  templateUrl: './api-key-dialog.component.html',
  styleUrl: './api-key-dialog.component.scss'
})
export class ApiKeyDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { apiKey: string, isError?: boolean },
    private clipboard: Clipboard,
    private snack: MatSnackBar
  ) {}

  copyKey() {
    this.clipboard.copy(this.data.apiKey);
    this.snack.open('API Key copiada!', 'OK', { 
      duration: 2500,
      panelClass: ['apixbr-snackbar']
    });
  }
}
