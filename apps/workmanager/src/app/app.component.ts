import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    MatProgressBarModule
  ],
  selector: 'en8-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  translation$: Observable<unknown>;

  constructor(private translateSrv: TranslateService) {
    this.translation$ = this.translateSrv.use('en-gb');
  }

}
