it('select a random option from a select dropdown', () => {
    cy.visit('/index.html')

    cy.get('select option')
    .as('options')
    .its('length', { log: false }).then(n => {
      cy.get('@options', { log: false }).then($options => {
        const randomOptionIndex = Cypress._.random(n - 1)
        const randomOptionText = $options[randomOptionIndex].innerText
        cy.get('select').select(randomOptionText)
      })
    })
})

it('simplifyed v.8.5 cypress - select a random option from a select dropdown', () => {
    cy.visit('/index.html')

    cy.get('select option')
        .its('length', { log: false }).then(n => {
            cy.get('select').select(Cypress._.random(n - 1))
      })
})