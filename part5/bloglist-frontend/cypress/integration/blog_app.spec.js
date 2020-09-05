describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'jteller',
      password: 'samcro',
      name: 'Jax Teller'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login to Application')
    cy.get('#loginForm')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('jteller')
      cy.get('#password').type('samcro')
      cy.get('#loginButton').click()

      cy.contains('Jax Teller is currently logged in.')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('jteller')
      cy.get('#password').type('incorrect')
      cy.get('#loginButton').click()

      cy.get('.error')
        .should('contain', 'Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Jax Teller logged in')
      cy.contains('Login to Application')
    })
  })
})