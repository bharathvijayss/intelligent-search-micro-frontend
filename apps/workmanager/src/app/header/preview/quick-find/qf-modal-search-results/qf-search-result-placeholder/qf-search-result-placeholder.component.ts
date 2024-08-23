import { Component, input } from '@angular/core';

@Component({
  selector: 'en8-qf-search-result-placeholder',
  templateUrl: './qf-search-result-placeholder.component.html',
  styleUrls: ['./qf-search-result-placeholder.component.scss'],
  standalone: true
})
export class QfSearchResultPlaceholderComponent {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locale = input.required<any>();

}
