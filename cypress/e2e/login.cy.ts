describe('Login Page', () => {
  it('should display login form', () => {
    cy.visit('/login');
    cy.get('h5').should('contain', 'Login');
  });

  it('should login and redirect to students', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      body: 'fake-jwt-token',
      headers: { 'content-type': 'text/plain' }
    }).as('login');
    cy.intercept('GET', '/api/students', { body: [] }).as('getStudents');

    cy.visit('/login');
    cy.get('input[formControlName="login"]').type('john');
    cy.get('input[formControlName="password"]').type('secret');
    cy.get('button.btn-primary').click();
    cy.wait('@login');
    cy.url().should('include', '/students');
  });

  it('should show error on failed login', () => {
    cy.intercept('POST', '/api/login', { statusCode: 401 }).as('login');
    cy.visit('/login');
    cy.get('input[formControlName="login"]').type('wrong');
    cy.get('input[formControlName="password"]').type('wrong');
    cy.get('button.btn-primary').click();
    cy.wait('@login');
    cy.get('.alert-danger').should('be.visible');
  });
});
