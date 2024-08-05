import { Component } from '@angular/core';
import { QfComponent } from './quick-find/qf/qf.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'en8-header',
  standalone: true,
  imports: [
    QfComponent,
    MatIconModule,
    MatToolbarModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent { }
