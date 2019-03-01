import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface Result {
  simSeason: boolean;
  simFast: boolean;
}

@Component({
  selector: 'app-simseason-dialog',
  templateUrl: './simseason-dialog.component.html',
  styleUrls: ['./simseason-dialog.component.scss']
})
export class SimseasonDialogComponent {

  result: Result = { simSeason: false, simFast: false};

  constructor(
    public dialogRef: MatDialogRef<SimseasonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  submitForm() {
    // console.log('[simseason] submitForm() simSeason: ' + this.result.simSeason);
    // console.log('[simseason] submitForm() simFast: ' + this.result.simFast);
    this.dialogRef.close(this.result);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
