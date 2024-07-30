import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QFModalFiltersComponent } from './qf-modal-filters.component'

describe('IntelligentSearchFiltersComponent', () => {
  let component: QFModalFiltersComponent;
  let fixture: ComponentFixture<QFModalFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QFModalFiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QFModalFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
