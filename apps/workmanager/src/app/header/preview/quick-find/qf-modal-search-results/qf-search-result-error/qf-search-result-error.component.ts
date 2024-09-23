import { Component, input } from '@angular/core';

@Component({
  selector: 'en8-qf-search-result-error',
  templateUrl: './qf-search-result-error.component.html',
  styleUrls: ['./qf-search-result-error.component.scss'],
  standalone: true
})
export class QfSearchResultErrorComponent {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locale = input.required<any>();

}
