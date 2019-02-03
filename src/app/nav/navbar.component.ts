import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ScheduleService } from '../service/schedule.service';
import { TopTeamsDialogComponent } from '../dialog/top-teams/top-teams-dialog.component';
// import { SimpleModalComponent } from '../common/simple-modal.component';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavBarComponent {
  private postseason: boolean = false;
  // @ViewChild('childModal') childModal: SimpleModalComponent;

  dialogReturn: any;

  constructor(
    private scheduleService: ScheduleService,
    public dialog: MatDialog
    ) { }

  simulate() {
    // console.log('[navbar] simulate() clicked!');
    if (this.scheduleService.playNextGame()) {
      // Keep playing
    } else {
      // End of season
      this.postseason = true;
    }
  }

  openTopTeamsDialog(): void {
    const dialogRef = this.dialog.open(TopTeamsDialogComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.dialogReturn = result;
    });
  }

  getTopTeams() {
    // this.childModal.show();
    this.openTopTeamsDialog();
  }
}
