import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QfSearchBoxComponent } from './qf-search-box.component';
import { QuickFindStore } from '../store/quick-find.store';
import { fromEvent, Subject } from 'rxjs';

jest.mock('rxjs', () => ({
  ...jest.requireActual('rxjs'),
  fromEvent: jest.fn()
}));

describe('QfSearchBoxComponent', () => {

  async function setup(readonly = false) {

    const mockStore = {
      setSearchQuery: jest.fn(),
      getResult: jest.fn()
    }

    await TestBed.configureTestingModule({
      imports: [
        QfSearchBoxComponent
      ],
      providers: [
        {
          provide: QuickFindStore,
          useValue: mockStore
        }
      ]
    }).compileComponents();

    const fixture: ComponentFixture<QfSearchBoxComponent> = TestBed.createComponent(QfSearchBoxComponent);
    const component: QfSearchBoxComponent = fixture.componentInstance;

    fixture.componentRef.setInput('icon', 'icon');
    fixture.componentRef.setInput('placeholder', 'placeholder');
    fixture.componentRef.setInput('shortcutKey', 'shortcutKey');
    fixture.componentRef.setInput('readonly', readonly);

    return {
      fixture,
      component,
      mockStore
    }
  }

  describe('constructor()', () => {

    it('should create instance', async () => {
      const { component } = await setup();

      expect(component).toBeDefined();
    });

    it('store should be defined', async () => {
      const { component } = await setup();

      expect(component.store).toBeDefined();
    });

    it('destroyRef should be defined', async () => {
      const { component } = await setup();

      expect(component.destroyRef).toBeDefined();
    });

    it('readonly should have default value of false', async () => {
      const { component } = await setup();

      expect(component.readonly()).toBeFalsy();
    });

  })

  describe('initSearch()', () => {

    async function initSearchSetup(readonly = false) {
      const { fixture, component, mockStore } = await setup(readonly);

      const mockInputElement = document.createElement('input') as HTMLInputElement;
      jest.spyOn(component, 'searchInput').mockReturnValue({
        nativeElement: mockInputElement
      })

      const mockEventSubject = new Subject<KeyboardEvent>();
      (fromEvent as jest.Mock).mockRestore();
      (fromEvent as jest.Mock).mockReturnValue(mockEventSubject.asObservable());

      return {
        fixture,
        component,
        mockStore,
        mockInputElement,
        mockEventSubject
      }
    }

    it('should not be called if readonly() is true', async () => {
      const readonly = true;
      const { fixture, component } = await initSearchSetup(readonly);
      const initSearchSpy: jest.SpyInstance = jest.spyOn(component, 'initSearch');

      fixture.detectChanges();

      expect(initSearchSpy).not.toHaveBeenCalled();
    })

    it('should be called only once if readonly() is false', async () => {
      const readonly = false;
      const { fixture, component } = await initSearchSetup(readonly);
      const initSearchSpy: jest.SpyInstance = jest.spyOn(component, 'initSearch');

      fixture.detectChanges();

      expect(initSearchSpy).toHaveBeenCalledTimes(1);
    })

    it('fromEvent should be configured properly', async () => {
      const { component, mockInputElement } = await initSearchSetup();

      component.initSearch();

      expect(fromEvent).toHaveBeenCalledTimes(1);
      expect(fromEvent).toHaveBeenCalledWith(mockInputElement, 'keydown');
    })

    it('should not call store.setSearchQuery() and store.getResult() if enter key is not pressed', async () => {
      const { component, mockStore, mockEventSubject } = await initSearchSetup();
      jest.useFakeTimers();
      component.initSearch();

      mockEventSubject.next(new KeyboardEvent('keydown', { key: 'a' }));
      mockEventSubject.next(new KeyboardEvent('keydown', { key: 'b' }));
      jest.runAllTimers();

      expect(mockStore.setSearchQuery).not.toHaveBeenCalled();
      expect(mockStore.getResult).not.toHaveBeenCalled();
    })

    it('should not call store.setSearchQuery() and store.getResult() more than once if search query is duplicate and enter key is pressed', async () => {
      const { component, mockStore, mockEventSubject, mockInputElement } = await initSearchSetup();
      const userInput = 'ab';
      jest.useFakeTimers();
      component.initSearch();

      mockEventSubject.next(new KeyboardEvent('keydown', { key: 'a' }));
      mockEventSubject.next(new KeyboardEvent('keydown', { key: 'b' }));
      mockInputElement.value = userInput;
      mockEventSubject.next(new KeyboardEvent('keydown', { key: 'Enter' }));
      jest.runAllTimers();
      mockEventSubject.next(new KeyboardEvent('keydown', { key: 'Enter' }));
      jest.runAllTimers();

      expect(mockStore.setSearchQuery).toHaveBeenCalledTimes(1);
      expect(mockStore.getResult).toHaveBeenCalledTimes(1);
    })

    it('should call store.setSearchQuery() and store.getResult() only once with input element value if enter key is pressed', async () => {
      const { component, mockStore, mockEventSubject, mockInputElement } = await initSearchSetup();
      const userInput = 'ab';
      jest.useFakeTimers();
      component.initSearch();

      mockEventSubject.next(new KeyboardEvent('keydown', { key: 'a' }));
      mockEventSubject.next(new KeyboardEvent('keydown', { key: 'b' }));
      mockInputElement.value = userInput;
      mockEventSubject.next(new KeyboardEvent('keydown', { key: 'Enter' }));
      jest.runAllTimers();

      expect(mockStore.setSearchQuery).toHaveBeenCalledWith(userInput);
      expect(mockStore.setSearchQuery).toHaveBeenCalledTimes(1);
      expect(mockStore.getResult).toHaveBeenCalledTimes(1);
    })

  })

});
