import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QFModalFiltersComponent } from './qf-modal-filters.component'
import { QfCheckboxFiltersComponent } from './qf-checkbox-filters/qf-checkbox-filters.component';
import { QfDateFiltersComponent } from './qf-date-filters/qf-date-filters.component';
import { Component } from '@angular/core';

describe('QFModalFiltersComponent', () => {

  async function setup() {

    const locale = {
      key: "value"
    }

    @Component({
      selector: 'en8-qf-checkbox-filters',
      template: '',
      standalone: true
    })
    class MockQfCheckboxFiltersComponent {}

    @Component({
      selector: 'en8-qf-date-filters',
      template: '',
      standalone: true
    })
    class MockQfDateFiltersComponent {}

    await TestBed.configureTestingModule({
      imports: [QFModalFiltersComponent]
    })
      .overrideComponent(QFModalFiltersComponent, {
        remove: {
          imports: [
            QfCheckboxFiltersComponent,
            QfDateFiltersComponent,
          ]
        },
        add: {
          imports: [
            MockQfCheckboxFiltersComponent,
            MockQfDateFiltersComponent
          ]
        }
      })
      .compileComponents();

    const fixture: ComponentFixture<QFModalFiltersComponent> = TestBed.createComponent(QFModalFiltersComponent);
    const component: QFModalFiltersComponent = fixture.componentInstance;

    fixture.componentRef.setInput('locale', locale);

    return {
      fixture,
      component
    }
  }

  describe('constructor()', () => {

    it('should create instance', async () => {
      const { component } = await setup();

      expect(component).toBeDefined();
    });

    it('locale should be defined', async () => {
      const { component } = await setup();

      expect(component.locale).toBeDefined();
    })

  })

});
