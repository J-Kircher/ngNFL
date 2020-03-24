import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  sanitizedHtml: SafeHtml;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, messageBodyHtml: string },
    private sanitized: DomSanitizer
  ) {
    this.sanitizedHtml = this.sanitize(data.messageBodyHtml);
  }

  sanitize(htmlText) {
    return this.sanitized.bypassSecurityTrustHtml(htmlText);
  }

  submitForm() {
    this.dialogRef.close(true);
  }

  onClose(): void {
    this.dialogRef.close(false);
  }
}
