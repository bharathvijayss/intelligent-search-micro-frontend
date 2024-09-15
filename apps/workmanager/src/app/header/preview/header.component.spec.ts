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

  async function setup() {
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

    const fixture: ComponentFixture<HeaderComponent> = TestBed.createComponent(HeaderComponent);
    const component: HeaderComponent = fixture.componentInstance;

    return {
      fixture,
      component
    }
  }

  it('should create', async () => {
    const { component } = await setup();

    expect(component).toBeTruthy();
  });
});
