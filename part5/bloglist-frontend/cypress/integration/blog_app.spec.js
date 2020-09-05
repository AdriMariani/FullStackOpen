describe('Blog app', function() {
  const userOne = {
    username: 'jteller',
    password: 'samcro',
    name: 'Jax Teller'
  }
  const userTwo = {
    username: 'chibs',
    password: 'sambel',
    name: 'Filip Telford'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', userOne)
    cy.request('POST', 'http://localhost:3001/api/users', userTwo)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login to Application')
    cy.get('#loginForm')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(userOne.username)
      cy.get('#password').type(userOne.password)
      cy.get('#loginButton').click()

      cy.contains(`${userOne.name} is currently logged in.`)
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type(userOne.username)
      cy.get('#password').type('incorrect')
      cy.get('#loginButton').click()

      cy.get('.error')
        .should('contain', 'Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', `${userOne.name} is currently logged in.`)
      cy.contains('Login to Application')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: userOne.username, password: userOne.password })
    })

    it('A blog can be created', function() {
      const blog = {
        title: 'some blog',
        author: 'tester',
        url: 'http://www.ablog.ca'
      }

      cy.contains('New Blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.contains('save').click()

      cy.get('.titleAndAuthor')
        .should('contain', `${blog.title} by ${blog.author}`)
    })

    describe('and several blogs exist', function() {
      const blogOne = {
        title: 'blog1',
        author: 'tester',
        url: 'http://www.blogs.ca',
        likes: 2
      }
      const blogTwo = {
        title: 'blog2',
        author: 'tester',
        url: 'http://www.blogs.ca',
        likes: 10
      }

      beforeEach(function() {
        cy.createBlog(blogOne)
        cy.createBlog(blogTwo)
      })

      it('can like a blog', function() {
        cy.contains(`${blogTwo.title} by ${blogTwo.author}`).parent().as('blog')

        cy.get('@blog').contains('View').click()
        cy.get('@blog').contains('Like').click()

        cy.get('.likes').should('contain', `${blogTwo.likes + 1}`)
      })

      it('can delete a blog', function() {
        cy.contains(`${blogOne.title} by ${blogOne.author}`).parent().as('blog')

        cy.get('@blog').contains('View').click()
        cy.get('@blog').contains('Delete').click()

        cy.get('.success')
          .should('contain', `Successfully deleted ${blogOne.title} by ${blogOne.author}`)
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')

        cy.get('html', { timeout: 6000 }) //must wait for notification to disappear
          .should('not.contain', `${blogOne.title} by ${blogOne.author}`)
      })

      it('a different user cannot delete a blog not created by them', function() {
        cy.login({ username: userTwo.username, password: userTwo.password })

        cy.contains(`${blogOne.title} by ${blogOne.author}`).parent().as('blog')

        cy.get('@blog').contains('View').click()
        cy.get('@blog').should('not.contain', 'Delete')
      })
    })
  })
})