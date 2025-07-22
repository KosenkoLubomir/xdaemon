/// <reference types="cypress" />

describe('Logs Table UI', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the table or log cards', () => {
    cy.contains('Owner');
    cy.get('input').should('exist');
  });

  it('edits a log and saves it', () => {
    cy.get('input').first().clear().type('Test User');
    cy.get('button').contains('Save').first().click();

    cy.contains('Log updated').should('exist');
  });

  it('deletes a log (mocked)', () => {
    cy.get('button').contains('Delete').first().click();
    cy.contains('Are you sure').should('exist');
    cy.contains('Confirm').click();

    cy.contains('Log deleted').should('exist');
  });
});