
describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html') // reference onde esta o arquivo cypress.config.js
  })

  it('Verificar o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('sample text being repeat', 10)

    cy.get('#firstName').type('Fernanda')
    cy.get('#lastName').type('Palaria')
    cy.get('#email').type('test@example.com')
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe uma mensagem de erro ao submeter o formulario com um email com formatacao invalida', () => {
    cy.get('#firstName').type('Fernanda')
    cy.get('#lastName').type('Palaria')
    cy.get('#email').type('test@example')
    cy.get('#open-text-area').type('Test')
    cy.get('button[type="submit"]').click()
    
    cy.get('.error').should('be.visible')
  })
  
  it('campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
    cy.get('#phone')
    .type('textInput')
    .should('have.value', '')
  })
  
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Fernanda')
    cy.get('#lastName').type('Palaria')
    cy.get('#email').type('test@example')
    cy.get('#open-text-area').type('Test')
    cy.get('#phone-checkbox').click() //flaky, pq num retest se já estivar marcado, click() vai desmarcar
    cy.get('button[type="submit"]').click()
    
    cy.get('.error').should('be.visible')
  })

  it('somente campos obrigatórios usando comandos', () => {
   cy.mandatoryFieldsOnly()
  })

  it('seleciona um Youtube como producto por seu texto', () => {
    cy.get('#product').select('youtube')
    cy.get('#product').should('have.value', 'youtube')
  })

  it('marca o tipo de atendimento como Feedback', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('mark all elements - radio', () => {
    cy.get('input[type="radio"]')
      .each(atendimento => {
        cy.wrap(atendimento).check().should('be.checked')
      })
  })

  it('mark all elements - checkbox', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
    cy.get('input[type="checkbox"]')
      .last()
      .uncheck()
      .should('be.not.checked')
  })

  it('upload a file', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('upload a file - drag and drop', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('upload a file - drag and drop', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .selectFile('@sampleFile', { action: 'drag-drop' })
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'target', '_blank')
      .and('have.attr', 'href', 'privacy.html')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()  

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })
})