import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QfComponent } from './qf.component';
import { provideAutoSpy, Spy } from 'jest-auto-spies'
import { TranslateService } from '@ngx-translate/core';
import { QuickFindStore } from '../store/quick-find.store';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { fromEvent, of, Subject } from 'rxjs';
import { QFModalComponent } from '../qf-modal/qf-modal.component';

jest.mock('rxjs', () => ({
  ...jest.requireActual('rxjs'),
  fromEvent: jest.fn()
}));

describe('QfComponent', () => {

  const searchIconName = 'search';

  async function setup() {

    const MockQuickFindStore = {
      resetSearchQueryAndResult: jest.fn()
    }

    await TestBed.configureTestingModule({
      imports: [QfComponent],
      providers: [
        provideAutoSpy(TranslateService),
        provideAutoSpy(MatDialog),
        {
          provide: QuickFindStore,
          useValue: MockQuickFindStore
        },
      ]
    }).compileComponents();

    const fixture: ComponentFixture<QfComponent> = TestBed.createComponent(QfComponent);
    const component: QfComponent = fixture.componentInstance;
    const translateSrv: Spy<TranslateService> = TestBed.inject<unknown>(TranslateService) as Spy<TranslateService>;
    const mockStore = TestBed.inject(QuickFindStore);
    const mockMatDialog: Spy<MatDialog> = TestBed.inject<unknown>(MatDialog) as Spy<MatDialog>;
    mockMatDialog.open.mockReturnValue({
      afterClosed: () => of(null)
    } as MatDialogRef<unknown, unknown>)

    const mockInputElement = document.createElement('input') as HTMLInputElement;
    jest.spyOn(component, 'searchBox').mockReturnValue({
      nativeElement: mockInputElement
    })

    const mockMouseEventSubject = new Subject<MouseEvent>();
    const mockKeyboardEventSubject = new Subject<KeyboardEvent>();

    (fromEvent as jest.Mock).mockRestore();
    (fromEvent as jest.Mock).mockImplementation((target, event) => {
      if (event === 'click' && target === mockInputElement) {
        return mockMouseEventSubject.asObservable();
      } else if (event === 'keydown' && target === document) {
        return mockKeyboardEventSubject.asObservable();
      }
      return;
    })

    return {
      fixture,
      component,
      mockStore,
      translateSrv,
      mockMouseEventSubject,
      mockKeyboardEventSubject,
      mockMatDialog
    }
  }

  describe('constructor()', () => {

    it('should create instance', async () => {
      const { component } = await setup();

      expect(component).toBeDefined();
    });

    it(`should have default value for searchBoxIcon propery as "${searchIconName}"`, async () => {
      const { component } = await setup();

      expect(component.searchBoxIcon).toBe(searchIconName);
    });

    it('store should be defined', async () => {
      const { component } = await setup();

      expect(component.store).toBeDefined();
    })

  })

  describe('ngOnInit()', () => {

    it('should call getTranslationData() only once', async () => {
      const { component, fixture } = await setup();
      const getTranslationDataSpy = jest.spyOn(component, 'getTranslationData');

      fixture.detectChanges();

      expect(getTranslationDataSpy).toHaveBeenCalledTimes(1);
    })

  })

  describe('getTranslationData()', () => {

    const translationKey = "header.intelligent_search";
    const translationData = 'translation data';
    it('should call translateSrv.instant only once with proper key', async () => {
      const { component, translateSrv } = await setup();

      component.getTranslationData();

      expect(translateSrv.instant).toHaveBeenCalledTimes(1);
      expect(translateSrv.instant).toHaveBeenCalledWith(translationKey);
    })

    it('should assign locale property with translation data if it is available', async () => {
      const { component, translateSrv } = await setup();
      translateSrv.instant.mockReturnValue(translationData);

      component.getTranslationData();

      expect(component.locale).toBe(translationData);
    })

    it('should assign locale property with empty object if translation is not available', async () => {
      const { component, translateSrv } = await setup();
      translateSrv.instant.mockReturnValue(translationKey);

      component.getTranslationData();

      expect(component.locale).toStrictEqual({});
    })

  })

  describe('ngAfterViewInit()', () => {

    it('should call openSearchContainer() when searchBoxClickEvent Occurs', async () => {
      const { fixture, component, mockMouseEventSubject } = await setup();
      const openSearchContainerSpy = jest.spyOn(component, 'openSearchContainer');

      fixture.detectChanges();
      mockMouseEventSubject.next(new MouseEvent('click'));

      expect(openSearchContainerSpy).toHaveBeenCalledTimes(1);
    })

    it('should call openSearchContainer() when shortCutKeyPressEvent Occurs', async () => {
      const { fixture, component, mockKeyboardEventSubject } = await setup();
      const openSearchContainerSpy = jest.spyOn(component, 'openSearchContainer');

      fixture.detectChanges();
      mockKeyboardEventSubject.next(new KeyboardEvent('keydown', { altKey: true, key: 'q' }));

      expect(openSearchContainerSpy).toHaveBeenCalledTimes(1);
    })

    it('should not call openSearchContainer() during some other keyboard key presses', async () => {
      const { fixture, component, mockKeyboardEventSubject } = await setup();
      const openSearchContainerSpy = jest.spyOn(component, 'openSearchContainer');

      fixture.detectChanges();
      mockKeyboardEventSubject.next(new KeyboardEvent('keydown', { altKey: false, key: 'q' }));

      expect(openSearchContainerSpy).not.toHaveBeenCalled();
    })

  })

  describe('openSearchContainer()', () => {

    it('should open the dialog with the correct configuration only once and reset the search query and result when the dialog closes', async () => {
      const { component, mockMatDialog, mockStore } = await setup();

      component.openSearchContainer();

      expect(mockMatDialog.open).toHaveBeenCalledTimes(1);
      expect(mockMatDialog.open).toHaveBeenCalledWith(QFModalComponent, {
        data: {
          locale: component.locale,
          searchBoxIcon: component.searchBoxIcon
        },
        width: '45vw',
        minWidth: '450px',
        maxWidth: '950px',
        maxHeight: '90vh',
        position: {
          top: '8px'
        }
      });
      expect(mockStore.resetSearchQueryAndResult).toHaveBeenCalledTimes(1);
    });

  })

});
