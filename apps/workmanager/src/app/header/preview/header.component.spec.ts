import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Component } from '@angular/core';
import { QfComponent } from './quick-find/qf/qf.component';

@Component({
  selector: 'en8-qf',
  template: '',
  standalone: true
})
export class MockQfComponent {
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
      ],
    })
      .overrideComponent(HeaderComponent, {
        add: {
          imports: [
            MockQfComponent
          ]
        },
        remove: {
          imports: [
            QfComponent
          ]
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
