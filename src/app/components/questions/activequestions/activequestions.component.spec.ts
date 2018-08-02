import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivequestionsComponent } from './activequestions.component';

describe('ActivequestionsComponent', () => {
  let component: ActivequestionsComponent;
  let fixture: ComponentFixture<ActivequestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivequestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivequestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
