import { Component, input } from '@angular/core';
import { QfDateFiltersComponent } from './qf-date-filters/qf-date-filters.component';
import { QfCheckboxFiltersComponent } from './qf-checkbox-filters/qf-checkbox-filters.component';

@Component({
  selector: 'en8-qf-modal-filters',
  standalone: true,
  imports: [
    QfCheckboxFiltersComponent,
    QfDateFiltersComponent,
  ],
  templateUrl: './qf-modal-filters.component.html',
  styleUrl: './qf-modal-filters.component.scss',
})
export class QFModalFiltersComponent {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locale = input.required<any>();

}
