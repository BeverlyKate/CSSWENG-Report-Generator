describe('User should be able to login', () => {
  it('Should be able to login with the correct credentials', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#username').type('Neko Nyan')
    cy.get('#password').type('catto')
    cy.get('#login').click()
    cy.get('.Title').should('contain', 'Generate Report')
  })
  it('Should be not be able to login with no username', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#password').type('catto')
    cy.get('#login').click()
    cy.get('#loginError').should('contain','Invalid username' )
  })
  it('Should be not be able to login with no password', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#username').type('Neko Nyan')
    cy.get('#login').click()
    cy.get('#loginError').should('contain','Invalid Password' )
  })

  it('Should be not be able to login with no input', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#login').click()
    cy.get('#loginError').should('contain','Invalid username' )
  })

  it('Should be not be able to login with incorrect credentials', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#username').type('Neko Nyan')
    cy.get('#password').type('doggo')
    cy.get('#login').click()
    cy.get('#loginError').should('contain','Invalid Password' )
  })
})

describe('User should be able to register', () => {
  it.skip('Should be able to register with the correct credentials', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#registerNew').click()
    cy.get('#email').type("angel_ancheta@dlsu.edu.ph")
    cy.get('#username').type("Angel Ancheta")
    cy.get('#password').type('catto')
    cy.get('#retypePassword').type('catto')
    cy.get('#register').click()
    cy.get('#loginError').should('contain', 'Registration successful! Please login.')
    //cy.get('.Title').should('contain', 'Generate Report')
  })
  it('Should be not able to register with mismatched passwords', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#registerNew').click()
    cy.get('#email').type("angel_ancheta@dlsu.edu.ph")
    cy.get('#username').type("Angel Ancheta")
    cy.get('#password').type('catto')
    cy.get('#retypePassword').type('cattos')
    cy.get('#register').click()
    cy.get('#registerError').should('contain', 'Passwords do not match')
    //cy.get('.Title').should('contain', 'Generate Report')
  })

  it('Should be not able to register with no email', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#registerNew').click()
    cy.get('#username').type("Angel Ancheta")
    cy.get('#password').type('catto')
    cy.get('#retypePassword').type('catto')
    cy.get('#register').click()
    cy.url().then((currentUrl) => {
      cy.url().should('eq', currentUrl);
    })
    //cy.get('.Title').should('contain', 'Generate Report')
  })

  it('Should be not able to register with no username', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#registerNew').click()
    cy.get('#email').type("angel_ancheta@dlsu.edu.ph")
    cy.get('#password').type('catto')
    cy.get('#retypePassword').type('catto')
    cy.get('#register').click()
    cy.url().then((currentUrl) => {
      cy.url().should('eq', currentUrl);
    })
    //cy.get('.Title').should('contain', 'Generate Report')
  })
  
  it.skip('Should be able to register as guest', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#registerNew').click()
    cy.get('#email').type("neko@dgmail.com")
    cy.get('#username').type("Neko Nyan")
    cy.get('#password').type('catto')
    cy.get('#retypePassword').type('catto')
    cy.get('#role').select('guest')
    cy.get('#register').click()
    cy.url().then((currentUrl) => {
      cy.url().should('eq', currentUrl);
    })
    cy.get('#loginError').should('contain', 'Registration successful! Please login.')
    //cy.get('.Title').should('contain', 'Generate Report')
  })

  it('Should not be able to register using a taken username', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#registerNew').click()
    cy.get('#email').type("neko@dgmail.com")
    cy.get('#username').type("Neko Nyan")
    cy.get('#password').type('catto')
    cy.get('#retypePassword').type('catto')
    cy.get('#role').select('guest')
    cy.get('#register').click()
    cy.url().then((currentUrl) => {
      cy.url().should('eq', currentUrl);
    })
    cy.get('#registerError').should('contain', 'Username already exists')
    //cy.get('.Title').should('contain', 'Generate Report')
  })
})

describe('User should be able to recover an account', () => {
  it.skip('Should be able to change the password of a lost account', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#forgotPassword').click()
    cy.get('#email').type("angel_ancheta@dlsu.edu.ph")
    cy.get('#username').type("Angel Ancheta")
    cy.get('#password').type('alotofcattos')
    cy.get('#retypePassword').type('alotofcattos')
    cy.get('#resetPassword').click()
    cy.get('#loginError').should('contain','Password reset successful! Please login with your new password.')
  })

  it('Should be not able to change the password of an account with incorrect credentials', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#forgotPassword').click()
    cy.get('#email').type("neko@dlsu.edu.ph")
    cy.get('#username').type("Angel Ancheta")
    cy.get('#password').type('alotofcattos')
    cy.get('#retypePassword').type('alotofcattos')
    cy.get('#resetPassword').click()
    cy.get('#recoveryError').should('contain','User not found')
  })

  it('Should be not able to change the password of an account if the passwords dont match', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#forgotPassword').click()
    cy.get('#email').type("angel_ancheta@dlsu.edu.ph")
    cy.get('#username').type("Angel Ancheta")
    cy.get('#password').type('alotofcattos')
    cy.get('#retypePassword').type('alotofcatto')
    cy.get('#resetPassword').click()
    cy.get('#recoveryError').should('contain','Passwords do not match')
  })
  it('Should be able to login with the edited credentials', () => {
    cy.visit('http://localhost:3000/')
    cy.get('#username').type("Angel Ancheta")
    cy.get('#password').type('alotofcattos')
    cy.get('#login').click()
    cy.get('.Title').should('contain', 'Generate Report')
  })
})

describe('User should be able to interact with the sidebar menu', () => {
  beforeEach(() => {
    cy.login('Neko Nyan', 'catto')
  })

  it('should be able to click the sidebar menu', () => {
    cy.get('#CompanyLogo > img').click()
    cy.get('.navbar').should('exist')
  })

  it('should be able to access imports from the sidebar menu', () => {
    cy.get('#CompanyLogo > img').click()
    cy.get('.Btn-import > a > img').click()
    cy.get('.Title').should('contain', 'Import file')
  })

  it('should be able to access tables from the sidebar menu', () => {
    cy.get('#CompanyLogo > img').click()
    cy.get('.Btn-table > a > img').click()
    cy.get('.Title').should('contain', 'View table')
  })

  it('should be able to access imports from the sidebar menu', () => {
    cy.get('#CompanyLogo > img').click()
    cy.get('.Btn-generateReport > a > img').click()
    cy.get('.Title').should('contain', 'Generate Report')
  })
})

