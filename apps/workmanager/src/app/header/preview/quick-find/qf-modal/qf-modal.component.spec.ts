import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QFModalComponent } from './qf-modal.component'
import { Component } from '@angular/core';
import { QfSearchBoxComponent } from '../qf-search-box/qf-search-box.component';
import { QFModalFiltersComponent } from '../qf-modal-filters/qf-modal-filters.component';
import { QuickFindModalSearchResultsComponent } from '../qf-modal-search-results/qf-modal-search-results.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('QFModalComponent', () => {

  @Component({
    selector: 'en8-qf-search-box',
    standalone: true,
    template: ''
  })
  class MockQfSearchBoxComponent {
  }

  @Component({
    selector: 'en8-qf-modal-filters',
    standalone: true,
    template: ''
  })
  class MockQFModalFiltersComponent {
  }

  @Component({
    selector: 'en8-qf-modal-search-results',
    standalone: true,
    template: ''
  })
  class MockQuickFindModalSearchResultsComponent {
  }

  async function setup() {

    await TestBed.configureTestingModule({
      imports: [QFModalComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    })
      .overrideComponent(QFModalComponent, {
        add: {
          imports: [
            MockQfSearchBoxComponent,
            MockQFModalFiltersComponent,
            MockQuickFindModalSearchResultsComponent
          ]
        },
        remove: {
          imports: [
            QfSearchBoxComponent,
            QFModalFiltersComponent,
            QuickFindModalSearchResultsComponent
          ]
        }
      })
      .compileComponents();

    const fixture: ComponentFixture<QFModalComponent> = TestBed.createComponent(QFModalComponent);
    const component: QFModalComponent = fixture.componentInstance;

    return {
      fixture,
      component
    }
  }

  describe('constructor()', () => {

    it('should create instance', async () => {
      const { component } = await setup();

      expect(component).toBeTruthy();
    });

    it('should define data property', async () => {
      const { component } = await setup();

      expect(component.data).toBeTruthy();
    });

  })

});
