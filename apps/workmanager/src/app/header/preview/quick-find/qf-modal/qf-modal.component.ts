import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { QfSearchBoxComponent } from '../qf-search-box/qf-search-box.component';
import { IDialogData } from '../model/dialog-data';
import { QFModalFiltersComponent } from '../qf-modal-filters/qf-modal-filters.component';
import { MatDividerModule } from '@angular/material/divider'
import { QuickFindModalSearchResultsComponent } from '../qf-modal-search-results/qf-modal-search-results.component';

@Component({
  selector: 'en8-qf-modal',
  standalone: true,
  imports: [
    QfSearchBoxComponent,
    QFModalFiltersComponent,
    QuickFindModalSearchResultsComponent,
    MatDialogModule,
    MatDividerModule,
  ],
  templateUrl: './qf-modal.component.html',
  styleUrl: './qf-modal.component.scss',
})
export class QFModalComponent {

  readonly data = inject<IDialogData>(MAT_DIALOG_DATA);

}
