import { AfterViewInit, Component, DestroyRef, ElementRef, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { filter, fromEvent, merge, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { QFModalComponent } from '../qf-modal/qf-modal.component';
import { QfSearchBoxComponent } from '../qf-search-box/qf-search-box.component';

@Component({
  selector: 'en8-qf',
  templateUrl: './qf.component.html',
  styleUrl: './qf.component.scss',
  standalone: true,
  imports: [
    QfSearchBoxComponent
  ],
})
export class QfComponent implements AfterViewInit {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  locale: any;

  searchBox = viewChild.required(QfSearchBoxComponent, { read: ElementRef });

  searchBoxIcon = 'search';

  constructor(
    private translateSrv: TranslateService,
    private destroyRef: DestroyRef,
    public dialog: MatDialog
  ) {
    this.locale = this.translateSrv.instant("header.intelligent_search") || {};
  }

  ngAfterViewInit() {
    const searchBoxClickEvent$ = fromEvent<MouseEvent>(this.searchBox().nativeElement, 'click');
    const shortCutKeyPressEvent$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(filter(event => event.altKey && event.key === 'q'))

    merge(searchBoxClickEvent$, shortCutKeyPressEvent$)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((event) => {
          event.preventDefault();
          this.openSearchContainer();
        })
      ).subscribe();
  }

  // after dialog closed we need to clear the state.
  openSearchContainer() {
    const dialogRef = this.dialog.open(QFModalComponent, {
      data: {
        locale: this.locale,
        searchBoxIcon: this.searchBoxIcon
      },
      maxWidth: '80vw',
      position: {
        top: '8px'
      }
    });
  }

}
