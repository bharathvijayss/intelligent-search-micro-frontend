import { Component } from '@angular/core';
import { IntelligentSearchComponent } from '@enate/workmanager/intelligent-search';

@Component({
  standalone: true,
  imports: [IntelligentSearchComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
}
