import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuickFindModalSearchResultsComponent } from './qf-modal-search-results.component'
import { QuickFindStore } from '../store/quick-find.store';
import { provideAutoSpy } from 'jest-auto-spies';
import { TranslateService } from '@ngx-translate/core';

describe('QuickFindModalSearchResultsComponent', () => {

  const locale = {
    key: "value"
  }
  const filteredResultLength = 0;

  async function setup() {

    const MockQuickFindStore = {
      filteredResult: jest.fn().mockReturnValue({ length: filteredResultLength })
    }

    await TestBed.configureTestingModule({
      imports: [
        QuickFindModalSearchResultsComponent,
      ],
      providers: [
        {
          provide: QuickFindStore,
          useValue: MockQuickFindStore
        },
        provideAutoSpy(TranslateService),
      ]
    })
    .compileComponents();

    const fixture: ComponentFixture<QuickFindModalSearchResultsComponent> = TestBed.createComponent(QuickFindModalSearchResultsComponent);
    const component: QuickFindModalSearchResultsComponent = fixture.componentInstance;

    fixture.componentRef.setInput('locale', locale);

    const translateSrv = TestBed.inject(TranslateService);
    const quickFindStoreSrv = TestBed.inject(QuickFindStore);

    return {
      fixture,
      component,
      translateSrv,
      quickFindStoreSrv
    }
  }

  describe('constructor()', () => {

    it('should create instance', async () => {
      const { component } = await setup();

      expect(component).toBeTruthy();
    });

    it('store should be defined', async () => {
      const { component } = await setup();

      expect(component.store).toBeTruthy();
    })

    it('FilterType should be defined', async () => {
      const { component } = await setup();

      expect(component.FilterType).toBeTruthy();
    })

    it('translateSrv should be defined', async () => {
      const { component } = await setup();

      expect(component.translateSrv).toBeTruthy();
    })

    it('locale should be defined', async () => {
      const { component } = await setup();

      expect(component.locale).toBeTruthy();
    })

    it('resultCount should be defined', async () => {
      const { component } = await setup();

      expect(component.resultCount).toBeTruthy();
    })

  })

  describe('resultCount()', () => {

    it('should invoke translateSrv.instant() only once with proper arguments', async () => {
      const { translateSrv, component } = await setup();
      const translationKey = 'header.intelligent_search.result_count';
      const translationArg = {
        t: filteredResultLength
      }

      component.resultCount();

      expect(translateSrv.instant).toHaveBeenCalledTimes(1);
      expect(translateSrv.instant).toHaveBeenCalledWith(translationKey, translationArg);
    })

    it('should invoke store.filteredResult() only once', async () => {
      const { quickFindStoreSrv, component } = await setup();

      component.resultCount();

      expect(quickFindStoreSrv.filteredResult).toHaveBeenCalledTimes(1);
    })

  })

});
