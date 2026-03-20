describe('Students CRUD', () => {

  beforeEach(() => {
    // Simuler un utilisateur connecté
    cy.window().then(win => {
      win.sessionStorage.setItem('jwt_token', 'fake-jwt-token');
    });
  });

  it('should display student list', () => {
    cy.intercept('GET', '/api/students', {
      body: [{ id: 1, firstName: 'Alice', lastName: 'Martin', email: 'alice@t.com' }]
    }).as('getStudents');

    cy.visit('/students');
    cy.wait('@getStudents');
    cy.contains('Alice').should('be.visible');
  });

  it('should add a student', () => {
    cy.intercept('GET', '/api/students', { body: [] });
    cy.intercept('POST', '/api/students', {
      body: { id: 1, firstName: 'Bob', lastName: 'D', email: 'bob@t.com' }
    }).as('create');

    cy.visit('/students/new');
    cy.get('input[formControlName="firstName"]').type('Bob');
    cy.get('input[formControlName="lastName"]').type('Dupont');
    cy.get('input[formControlName="email"]').type('bob@test.com');
    cy.get('button.btn-primary').click();
    cy.wait('@create');
    cy.url().should('include', '/students');
  });

  it('should display student detail', () => {
    cy.intercept('GET', '/api/students/1', {
      body: { id: 1, firstName: 'Alice', lastName: 'Martin', email: 'alice@t.com' }
    }).as('getStudent');

    cy.visit('/students/1');
    cy.wait('@getStudent');
    cy.contains('Alice').should('be.visible');
  });

  it('should edit a student', () => {
    cy.intercept('GET', '/api/students/1', {
      body: { id: 1, firstName: 'Alice', lastName: 'M', email: 'a@t.com' }
    });
    cy.intercept('PUT', '/api/students/1', {
      body: { id: 1, firstName: 'Updated', lastName: 'M', email: 'a@t.com' }
    }).as('update');
    cy.intercept('GET', '/api/students', { body: [] });

    cy.visit('/students/1/edit');
    cy.get('input[formControlName="firstName"]').clear().type('Updated');
    cy.get('button.btn-primary').click();
    cy.wait('@update');
  });

  it('should redirect to login when not authenticated', () => {
    cy.window().then(win => win.sessionStorage.removeItem('jwt_token'));
    cy.visit('/students');
    cy.url().should('include', '/login');
  });
});
