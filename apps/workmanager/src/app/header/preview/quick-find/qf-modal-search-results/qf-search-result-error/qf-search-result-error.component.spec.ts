import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QfSearchResultErrorComponent } from './qf-search-result-error.component';

describe('QfSearchResultErrorComponent', () => {

  async function setup() {

    const locale = {
      key: "value"
    }

    TestBed.configureTestingModule({
      imports: [QfSearchResultErrorComponent]
    }).compileComponents();

    const fixture: ComponentFixture<QfSearchResultErrorComponent> = TestBed.createComponent(QfSearchResultErrorComponent);
    const component: QfSearchResultErrorComponent = fixture.componentInstance;

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
