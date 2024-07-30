import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QfComponent } from './qf.component';

describe('IntelligentSearchComponent', () => {
  let component: QfComponent;
  let fixture: ComponentFixture<QfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QfComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
