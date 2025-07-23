/// <reference types="cypress" />
export {};

describe('Logs Table UI', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the table or log cards', () => {
    cy.get('[data-testid="log-owner"]').should('exist');
    cy.get('input').should('exist');
  });

  it('edits a log and saves it', () => {
    cy.get('input').first().clear().type('Test User');
    cy.get('[data-testid="save-button"]').first().click();
    cy.contains('Log updated').should('exist');
  });

  it('deletes a log (mocked)', () => {
    cy.get('[data-testid="delete-button"]').first().click();
    cy.contains('Are you sure').should('exist');
    cy.contains('Confirm').click();
    cy.contains('Log deleted').should('exist');
  });

  it('adds a new log and saves it', () => {
    cy.get('[data-testid="new-log-button"]').click();

    cy.get('input[placeholder="Enter owner name"]').first().type('New User');
    cy.get('textarea[placeholder="Enter log text"]').first().type('This is a new test log.');
    cy.get('[data-testid="save-button"]').first().click();

    cy.contains('Log updated', { timeout: 5000 }).should('exist');
  });

  it('navigates through pagination correctly', () => {
    cy.get('button').contains('2').should('exist');
    cy.get('[data-testid="log-owner"]').first().invoke('val').then((firstPageLogText) => {
      cy.get('button').contains('2').click();
      cy.get('[data-testid="log-owner"]').first().invoke('val').should((secondPageLogText) => {
        expect(secondPageLogText).not.to.eq(firstPageLogText);
      });
    });
  });
});