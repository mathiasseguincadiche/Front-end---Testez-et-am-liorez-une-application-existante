describe('Register Page', () => {
  it('should display register form', () => {
    cy.visit('/register');
    cy.get('h5').should('contain', 'Registration Form');
    cy.get('input[formControlName="firstName"]').should('be.visible');
  });

  it('should register successfully', () => {
    cy.intercept('POST', '/api/register', { statusCode: 201 }).as('register');
    cy.visit('/register');
    cy.get('input[formControlName="firstName"]').type('John');
    cy.get('input[formControlName="lastName"]').type('Doe');
    cy.get('input[formControlName="login"]').type('johndoe');
    cy.get('input[formControlName="password"]').type('secret');
    cy.get('button.btn-primary').click();
    cy.wait('@register');
  });
});
