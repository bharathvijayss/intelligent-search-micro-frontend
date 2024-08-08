import { Component } from '@angular/core';
import { QfComponent } from './quick-find/qf/qf.component';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'en8-header',
  standalone: true,
  imports: [
    QfComponent,
    MatToolbar
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent { }
