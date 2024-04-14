describe('xkcd explorer', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('displays correct number of items initially', () => {
    cy.get('[data-cy="thumbnail"]').should('have.length', 9);
  });

  it('can click on a thumbnail', () => {
    cy.get('[data-cy="thumbnail"]').first().should('exist');
    cy.get('[data-cy="thumbnail"]').first().click();
    cy.get('[data-cy="modal"]').should('exist');
    cy.contains('Barrel - Part 1 (2006-01-01)');
    cy.get('[data-cy="modal-close-button"]').should('exist');
    cy.get('[data-cy="modal-close-button"]').click();
  });

  it('can filter comics', () => {
    cy.get('[data-cy="filter-button-april"]').should('exist');
    cy.get('[data-cy="filter-button-april"]').click();
    cy.get('[data-cy="thumbnail"]').first().click();
    cy.get('[data-cy="modal"]').should('exist');
    cy.contains('Eclipse Coolness (2024-04-01)');
  });

  it('can clear filters', () => {
    cy.get('[data-cy="filter-button-april"]').should('exist');
    cy.get('[data-cy="filter-button-april"]').click();
    cy.get('[data-cy="thumbnail"]').first().click();
    cy.get('[data-cy="modal"]').should('exist');
    cy.contains('Eclipse Coolness (2024-04-01)');
    cy.get('[data-cy="modal-close-button"]').should('exist');
    cy.get('[data-cy="modal-close-button"]').click();
    cy.get('[data-cy="clear-filter-button"]').should('exist');
    cy.get('[data-cy="clear-filter-button"]').click();
    cy.get('[data-cy="thumbnail"]').first().should('exist');
    cy.get('[data-cy="thumbnail"]').first().click();
    cy.get('[data-cy="modal"]').should('exist');
    cy.contains('Barrel - Part 1 (2006-01-01)');
  });

  it('shows an error when server is down', () => {
    cy.get('[data-cy="filter-button-april"]').should('exist');
    cy.get('[data-cy="filter-button-april"]').click();
    cy.get('[data-cy="thumbnail"]').first().click();
    cy.get('[data-cy="modal"]').should('exist');
    cy.contains('Eclipse Coolness (2024-04-01)');
    cy.get('[data-cy="modal-close-button"]').should('exist');
    cy.get('[data-cy="modal-close-button"]').click();
    cy.get('[data-cy="clear-filter-button"]').should('exist');
    cy.get('[data-cy="clear-filter-button"]').click();
    cy.get('[data-cy="thumbnail"]').first().should('exist');
    cy.get('[data-cy="thumbnail"]').first().click();
    cy.get('[data-cy="modal"]').should('exist');
    cy.contains('Barrel - Part 1 (2006-01-01)');
  });
})
