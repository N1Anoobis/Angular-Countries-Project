import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContinentComponent } from './create-continent.component';

describe('CreateContinentComponent', () => {
  let component: CreateContinentComponent;
  let fixture: ComponentFixture<CreateContinentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateContinentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContinentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
