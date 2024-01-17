/// <reference types="cypress" />


describe('Home Page Test', () => {
  it('Renders movie list', () => {
    // Visit the home page
    cy.visit('http://localhost:3000/home');

    cy.get('.spinner-container').should('not.exist');
  });
});