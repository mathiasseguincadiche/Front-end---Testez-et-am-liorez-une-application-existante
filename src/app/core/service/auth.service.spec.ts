import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => { httpMock.verify(); sessionStorage.clear(); });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store token', () => {
    service.login({ login: 'john', password: 'secret' }).subscribe(token => {
      expect(token).toBe('fake-token');
      expect(sessionStorage.getItem('jwt_token')).toBe('fake-token');
    });
    const req = httpMock.expectOne('/api/login');
    expect(req.request.method).toBe('POST');
    req.flush('fake-token');
  });

  it('should return true when logged in', () => {
    sessionStorage.setItem('jwt_token', 'token');
    expect(service.isLoggedIn()).toBe(true);
  });

  it('should return false when not logged in', () => {
    expect(service.isLoggedIn()).toBe(false);
  });

  it('should remove token on logout', () => {
    sessionStorage.setItem('jwt_token', 'token');
    service.logout();
    expect(service.getToken()).toBeNull();
  });
});
