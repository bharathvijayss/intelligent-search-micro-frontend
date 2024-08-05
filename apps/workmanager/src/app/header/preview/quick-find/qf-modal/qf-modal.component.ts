import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { QfSearchBoxComponent } from '../qf-search-box/qf-search-box.component';
import { IDialogData } from '../model/dialog-data';
import { QFModalFiltersComponent } from '../qf-modal-filters/qf-modal-filters.component';

@Component({
  selector: 'en8-qf-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    QfSearchBoxComponent,
    QFModalFiltersComponent
  ],
  templateUrl: './qf-modal.component.html',
  styleUrl: './qf-modal.component.scss',
})
export class QFModalComponent {

  readonly data = inject<IDialogData>(MAT_DIALOG_DATA);

}
