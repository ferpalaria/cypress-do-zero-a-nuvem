Cypress.Commands.add('assertTenResultsPlusMoreResultsButton', () => {
    cy.get('.result')
        .should('have.length', 11)
        .last()
        .should('contain', 'More results')
})