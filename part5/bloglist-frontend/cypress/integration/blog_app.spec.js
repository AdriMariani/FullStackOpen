describe('Blog app', function() {
  const user = {
    username: 'jteller',
    password: 'samcro',
    name: 'Jax Teller'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login to Application')
    cy.get('#loginForm')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#loginButton').click()

      cy.contains(`${user.name} is currently logged in.`)
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type('incorrect')
      cy.get('#loginButton').click()

      cy.get('.error')
        .should('contain', 'Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', `${user.name} is currently logged in.`)
      cy.contains('Login to Application')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: user.username, password: user.password })
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

        cy.get('.likes').contains(`${blogTwo.likes + 1}`)
      })
    })
  })
})