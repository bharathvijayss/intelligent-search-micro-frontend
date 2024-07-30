import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuickFindModalSearchResultsComponent } from './qf-modal-search-results.component'
describe('IntelligentSearchResultListComponent', () => {
  let component: QuickFindModalSearchResultsComponent;
  let fixture: ComponentFixture<QuickFindModalSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickFindModalSearchResultsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuickFindModalSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
