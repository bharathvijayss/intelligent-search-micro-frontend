import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuickFindModalSearchResultsComponent } from './qf-modal-search-results.component'
import { QuickFindStore } from '../store/quick-find.store';
import { provideAutoSpy } from 'jest-auto-spies';
import { TranslateService } from '@ngx-translate/core';

describe('QuickFindModalSearchResultsComponent', () => {

  async function setup(filteredResultLength = 0) {

    const locale = {
      key: "value"
    }

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

      expect(component).toBeDefined();
    });

    it('store should be defined', async () => {
      const { component } = await setup();

      expect(component.store).toBeDefined();
    })

    it('FilterType should be defined', async () => {
      const { component } = await setup();

      expect(component.FilterType).toBeDefined();
    })

    it('translateSrv should be defined', async () => {
      const { component } = await setup();

      expect(component.translateSrv).toBeDefined();
    })

    it('locale should be defined', async () => {
      const { component } = await setup();

      expect(component.locale).toBeDefined();
    })

    it('resultCount should be defined', async () => {
      const { component } = await setup();

      expect(component.resultCount).toBeDefined();
    })

  })

  describe('resultCount()', () => {

    it('should invoke translateSrv.instant() only once with result_count translation key if the filteredResult length is 1', async () => {
      const filteredResultLength = 1
      const { translateSrv, component } = await setup(filteredResultLength);
      const translationKey = 'header.intelligent_search.result_count';
      const translationArg = {
        t: filteredResultLength
      }

      component.resultCount();

      expect(translateSrv.instant).toHaveBeenCalledTimes(1);
      expect(translateSrv.instant).toHaveBeenCalledWith(translationKey, translationArg);
    })

    it('should invoke translateSrv.instant() only once with results_count translation key if the filteredResult length is greater than 1', async () => {
      const filteredResultLength = 2;
      const { translateSrv, component } = await setup(filteredResultLength);
      const translationKey = 'header.intelligent_search.results_count';
      const translationArg = {
        t: filteredResultLength
      }

      component.resultCount();

      expect(translateSrv.instant).toHaveBeenCalledTimes(1);
      expect(translateSrv.instant).toHaveBeenCalledWith(translationKey, translationArg);
    })

    it('should invoke store.filteredResult() only twice', async () => {
      const { quickFindStoreSrv, component } = await setup();

      component.resultCount();

      expect(quickFindStoreSrv.filteredResult).toHaveBeenCalledTimes(1);
    })

  })

});
