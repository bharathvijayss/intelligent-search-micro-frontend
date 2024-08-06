import { Component } from '@angular/core';
import { QfComponent } from './quick-find/qf/qf.component';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'en8-header',
  standalone: true,
  imports: [
    QfComponent,
    MatIcon,
    MatToolbar
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent { }
