import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlCursosComponent } from './control-cursos.component';

describe('ControlCursosComponent', () => {
  let component: ControlCursosComponent;
  let fixture: ComponentFixture<ControlCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlCursosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
