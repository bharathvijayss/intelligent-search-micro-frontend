import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

const lang_code = 'en-gb';
const return_value = of(lang_code);

class TranslateServiceMock {
  use = jest.fn().mockReturnValue(return_value)
}
describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let translateSrv: TranslateServiceMock;

  beforeEach(async () => {
    translateSrv = new TranslateServiceMock();
    await TestBed.configureTestingModule({
      imports: [
        AppComponent
      ],
      providers: [
        {
          provide: TranslateService,
          useValue: translateSrv
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  describe('constructor()', () => {
    it('should create instance', () => {
      expect(component).toBeDefined();
    });

    it(`should define translation$ with return value of translateSrv.use()`, () => {
      expect(component.translation$).toBe(return_value);
    });
  })

  describe('translateSrv.use()', () => {

    it('should be called only once', () => {
      expect(translateSrv.use).toHaveBeenCalledTimes(1);
    });

    it('should be called with default lang code', () => {
      expect(translateSrv.use).toHaveBeenCalledWith(lang_code);
    });

  })


});
