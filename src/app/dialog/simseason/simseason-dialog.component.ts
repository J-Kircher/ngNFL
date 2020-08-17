import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Result {
  simSeason: boolean;
  simFast: boolean;
}

@Component({
  selector: 'app-simseason-dialog',
  templateUrl: './simseason-dialog.component.html',
  styleUrls: ['./simseason-dialog.component.scss']
})
export class SimseasonDialogComponent implements OnInit {

  result: Result = { simSeason: false, simFast: false};

  constructor(
    public dialogRef: MatDialogRef<SimseasonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    // console.log('[simseason] data.simFast: ' + this.data.simFast);
    if (this.data.simFast) {
      this.result.simFast = this.data.simFast;
    }
  }

  submitForm() {
    // console.log('[simseason] submitForm() simSeason: ' + this.result.simSeason);
    // console.log('[simseason] submitForm() simFast: ' + this.result.simFast);
    this.dialogRef.close(this.result);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
