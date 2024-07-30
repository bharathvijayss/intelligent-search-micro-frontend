import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { filter, fromEvent, tap } from 'rxjs';

@Component({
  selector: 'en8-qf',
  standalone: true,
  imports: [],
  templateUrl: './qf.component.html',
  styleUrl: './qf.component.scss',
})
export class QfComponent {

  locale: unknown;

  constructor(private translateSrv: TranslateService) {
    fromEvent<KeyboardEvent>(document, 'keydown').pipe(
      takeUntilDestroyed(),
      filter(event => event.altKey && event.key === 'q'),
      tap((event) => {
        event.preventDefault();
        this.openSearchContainer();
      })
    ).subscribe();

    this.locale = this.translateSrv.instant("header.intelligent_search") || {};
  }

  openSearchContainer() {
    // Should open the search modal.
  }

}
