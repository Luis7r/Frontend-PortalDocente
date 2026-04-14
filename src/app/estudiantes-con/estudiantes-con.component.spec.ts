import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesConComponent } from './estudiantes-con.component';

describe('EstudiantesConComponent', () => {
  let component: EstudiantesConComponent;
  let fixture: ComponentFixture<EstudiantesConComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudiantesConComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudiantesConComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
