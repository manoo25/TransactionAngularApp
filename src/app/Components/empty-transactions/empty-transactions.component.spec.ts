import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyTransactionsComponent } from './empty-transactions.component';

describe('EmptyTransactionsComponent', () => {
  let component: EmptyTransactionsComponent;
  let fixture: ComponentFixture<EmptyTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyTransactionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
