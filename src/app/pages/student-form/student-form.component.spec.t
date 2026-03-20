import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentFormComponent } from './student-form.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';

describe('StudentFormComponent', () => {
  let component: StudentFormComponent;
  let fixture: ComponentFixture<StudentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentFormComponent],
      providers: [
        provideHttpClient(), provideHttpClientTesting(), provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(StudentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should be in create mode', () => { expect(component.isEditMode).toBe(false); });
  it('should have invalid form when empty', () => {
    expect(component.studentForm.valid).toBeFalsy();
  });
  it('should have valid form when filled', () => {
    component.studentForm.controls['firstName'].setValue('Alice');
    component.studentForm.controls['lastName'].setValue('Martin');
    component.studentForm.controls['email'].setValue('alice@test.com');
    expect(component.studentForm.valid).toBeTruthy();
  });
 
it('should set submitted to true on submit', () => {
    component.onSubmit();
    expect(component.submitted).toBe(true);
  });
});
