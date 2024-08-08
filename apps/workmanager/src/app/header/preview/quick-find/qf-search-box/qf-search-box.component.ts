import { AfterViewInit, booleanAttribute, Component, DestroyRef, ElementRef, inject, input, viewChild } from '@angular/core';
import { QuickFindStore } from '../store/quick-find.store';
import { filter, fromEvent, map, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'en8-qf-search-box',
  templateUrl: './qf-search-box.component.html',
  styleUrl: './qf-search-box.component.scss',
  standalone: true,
  imports: [
  ]
})
export class QfSearchBoxComponent implements AfterViewInit {

  icon = input.required<string>();

  placeholder = input.required<string>();

  shortcutKey = input.required<string>();

  readonly = input(false, { transform: booleanAttribute });

  store = inject(QuickFindStore);

  destroyRef = inject(DestroyRef);

  searchInput = viewChild.required<ElementRef>('searchInp');

  ngAfterViewInit() {
    if (!this.readonly()) {
      this.initSearch();
    }
  }

  initSearch() {
    const enterKeyPress$: Observable<string> = fromEvent<KeyboardEvent>(this.searchInput().nativeElement, 'keydown').pipe(
      takeUntilDestroyed(this.destroyRef),
      filter(event => event.key === 'Enter'),
      map(() => this.searchInput().nativeElement.value || '')
    );

    this.store.getResult(enterKeyPress$);
  }

}
