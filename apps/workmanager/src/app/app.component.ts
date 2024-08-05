import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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

  translation$ = inject(TranslateService).use('en-gb');

}
