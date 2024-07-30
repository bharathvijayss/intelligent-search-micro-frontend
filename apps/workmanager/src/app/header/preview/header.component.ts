import { Component } from '@angular/core';
import { QfComponent } from './quick-find/qf/qf.component';

@Component({
  selector: 'en8-header',
  standalone: true,
  imports: [QfComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent { }
