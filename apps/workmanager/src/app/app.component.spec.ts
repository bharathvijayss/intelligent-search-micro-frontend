import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { provideAutoSpy, Spy } from 'jest-auto-spies';

const lang_code = 'en-gb';
const return_value = of(lang_code);

describe('AppComponent', () => {

  async function setup() {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent
      ],
      providers: [
        provideAutoSpy(TranslateService)
      ]
    }).compileComponents();

    const translateSrv: Spy<TranslateService> = TestBed.inject<unknown>(TranslateService) as Spy<TranslateService>;
    translateSrv.use.mockReturnValue(return_value);

    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    const component: AppComponent = fixture.componentInstance;

    return {
      fixture,
      component,
      translateSrv
    }
  }

  describe('constructor()', () => {
    it('should create instance', async () => {
      const { component } = await setup();

      expect(component).toBeDefined();
    });

    it(`should define translation$ with return value of translateSrv.use()`, async () => {
      const { component } = await setup();

      expect(component.translation$).toBe(return_value);
    });
  })

  describe('translateSrv.use()', () => {

    it('should be called only once', async () => {
      const { translateSrv } = await setup();

      expect(translateSrv.use).toHaveBeenCalledTimes(1);
    });

    it('should be called with default lang code', async () => {
      const { translateSrv } = await setup();

      expect(translateSrv.use).toHaveBeenCalledWith(lang_code);
    });

  })


});
