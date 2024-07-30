import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, fromEvent, map, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { QuickFindStore } from '../store/quick-find.store';

@Component({
  selector: 'en8-qf-modal',
  standalone: true,
  imports: [],
  templateUrl: './qf-modal.component.html',
  styleUrl: './qf-modal.component.scss',
})
export class QFModalComponent implements OnInit {

  searchInput = viewChild.required<ElementRef>('searchInp')

  searchControl = new FormControl("");

  enterKeyPress$: Observable<string> = fromEvent<KeyboardEvent>(this.searchInput().nativeElement, 'keydown').pipe(
    takeUntilDestroyed(),
    filter(event => event.key === 'Enter'),
    map(() => this.searchControl.value || '')
  );

  ngOnInit() {
    this.initSearch();
  }

  initSearch(store = inject(QuickFindStore)) {
    store.getResult(this.enterKeyPress$);
  }

  // need to get locale via mat data.

}
