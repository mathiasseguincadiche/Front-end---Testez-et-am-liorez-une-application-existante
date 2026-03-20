import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { StudentService } from './student.service';

describe('StudentService', () => {
  let service: StudentService;
  let httpMock: HttpTestingController;

  const mockStudent = {
    id: 1, firstName: 'Alice', lastName: 'Martin', email: 'alice@test.com'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), StudentService]
    });
    service = TestBed.inject(StudentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => { expect(service).toBeTruthy(); });

  it('should fetch all students', () => {
    service.findAll().subscribe(students => {
      expect(students.length).toBe(1);
    });
    const req = httpMock.expectOne('/api/students');
    expect(req.request.method).toBe('GET');
    req.flush([mockStudent]);
  });

  it('should fetch student by id', () => {
    service.findById(1).subscribe(s => {
      expect(s.firstName).toBe('Alice');
    });
    httpMock.expectOne('/api/students/1').flush(mockStudent);
  });

  it('should create a student', () => {
    const newStudent = { firstName: 'Bob', lastName: 'D', email: 'bob@t.com' };
    service.create(newStudent).subscribe(s => { expect(s.id).toBe(2); });
    const req = httpMock.expectOne('/api/students');
    expect(req.request.method).toBe('POST');
    req.flush({ id: 2, ...newStudent });
  });

  it('should update a student', () => {
    const data = { firstName: 'Updated', lastName: 'M', email: 'a@t.com' };
    service.update(1, data).subscribe(s => {
      expect(s.firstName).toBe('Updated');
    });
    const req = httpMock.expectOne('/api/students/1');
    expect(req.request.method).toBe('PUT');
    req.flush({ id: 1, ...data });
  });

  it('should delete a student', () => {
    service.delete(1).subscribe();
    const req = httpMock.expectOne('/api/students/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
