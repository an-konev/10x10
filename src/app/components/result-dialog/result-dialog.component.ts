import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
}
