describe('Navigation Test', () => {
  it('Ensures access to submission page.', () => {
    // Navigate to submission page
    cy.get('[data-focusable]').contains('Submission').click()
    
    // Assert UI of page showed up
    cy.contains('Image Submission').should('exist')
    cy.contains('If the app was not able to detect your item, upload a picture of it so that it can be used to help improve the app.').should('exist')
  })

  it('Ensures access to profile page and tabs within', () => {
    // Navigate to profile page
    cy.get('[data-focusable]').contains('Profile').click({force:true})

    // Navigate profile, login, and signup pages, ensuring their input fields.
    cy.contains('Log In').click()
    cy.contains('Welcome Back').should('exist')
    cy.get('input[data-testid="usernameField"]').eq(0).should('exist')
    cy.get('input[data-testid="passwordField"]').eq(0).should('exist')
    cy.contains('Create an Account').should('exist')
    cy.get('input[data-testid="usernameField"]').eq(1).should('exist')
    cy.get('input[data-testid="passwordField"]').eq(1).should('exist')
    cy.get('input[data-testid="emailField"]').should('exist')
    
    // Forgot password
    cy.contains('Forgot Password').click({force:true})
    cy.get('div').contains('Enter the e-mail address associated to your account.').should('exist')
    cy.get('input[data-testid="emailField"]').should('exist')
    cy.get('div[data-testid=submitBtn]').contains('Submit').should('exist')
  })

  it('Ensures access to about us page', () => {
    // Navigate to Settings
    cy.get('[data-focusable]').contains('Settings').click({force:true})

    // Ensure UI of Settings page showed up
    cy.get('div').contains('Setting').should('exist')
    cy.get('div').contains('About us').should('exist')
    cy.get('div').contains('Language').should('exist')

    // Navigate into About us and ensure UI
    cy.get('div').contains('About us').click()
    cy.get('div').contains('About us').should('exist')
    cy.get('div').contains('Concordia Precious Plastic Project').should('exist')
    cy.get('div').contains('Zero Waste Concordia').should('exist')
    cy.get('div').contains('Contact Us').should('exist')
    cy.get('div').contains('Social Media').should('exist')
  })

  it('Ensures access to language page', () => {
    // Navigate to Settings
    cy.get('[data-focusable]').contains('Settings').click({force:true})

    // Ensure UI of Settings page showed up
    cy.get('div').contains('Setting').should('exist')
    cy.get('div').contains('About us').should('exist')
    cy.get('div').contains('Language').should('exist')

    // Navigate into Language and ensure UI
    cy.get('div').contains('Language').click()
    cy.get('div').contains('English').should('exist')
    cy.get('div').contains('French').should('exist')
  })
})