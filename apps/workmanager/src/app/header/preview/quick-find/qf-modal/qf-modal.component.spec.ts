import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QFModalComponent } from './qf-modal.component'
describe('IntelligentSearchContainerComponent', () => {
  let component: QFModalComponent;
  let fixture: ComponentFixture<QFModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QFModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QFModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
