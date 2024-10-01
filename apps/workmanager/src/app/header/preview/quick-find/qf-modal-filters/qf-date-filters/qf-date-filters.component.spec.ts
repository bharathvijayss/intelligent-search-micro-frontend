// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { QfDateFiltersComponent } from './qf-date-filters.component';
// import { QuickFindStore } from '../../store/quick-find.store';

// describe('QfDateFiltersComponent', () => {

//   const locale = {
//     filters: {
//       date: {
//         "all_time": "All Time",
//         "today": "Today",
//         "last_week": "Last Week",
//         "last_month": "Last Month",
//       }
//     }
//   }

//   const MockQuickFindStore = {
//     dateFilter: jest.fn(),
//     getResult: jest.fn(),
//     setFromAndToDate: jest.fn(),
//     setDateFilter: jest.fn()
//   }

//   async function setup() {
//     TestBed.configureTestingModule({
//       imports: [QfDateFiltersComponent],
//       providers: [
//         {
//           provide: QuickFindStore,
//           useValue: MockQuickFindStore
//         },
//       ]
//     }).compileComponents();
//     const fixture: ComponentFixture<QfDateFiltersComponent> = TestBed.createComponent(QfDateFiltersComponent);
//     const component: QfDateFiltersComponent = fixture.componentInstance;
//     const mockStore = TestBed.inject(QuickFindStore);

//     fixture.componentRef.setInput('locale', locale);

//     return {
//       fixture,
//       component,
//       mockStore
//     }
//   }

//   describe('constructor()', () => {

//     it('should create instance', async () => {
//       const { component } = await setup();

//       expect(component).toBeDefined();
//     })

//   })

// });

