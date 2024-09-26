import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QfSearchResultPlaceholderComponent } from './qf-search-result-placeholder.component';

describe('QfSearchResultPlaceholderComponent', () => {

  async function setup() {

    const locale = {
      key: "value"
    }

    TestBed.configureTestingModule({
      imports: [QfSearchResultPlaceholderComponent]
    }).compileComponents();

    const fixture: ComponentFixture<QfSearchResultPlaceholderComponent> = TestBed.createComponent(QfSearchResultPlaceholderComponent);
    const component: QfSearchResultPlaceholderComponent = fixture.componentInstance;

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
