describe('Profile functionality: ', () => {
    it('Ensure sign up functionality', () => {
        // Navigate to sign up page
        cy.get('[data-focusable]').contains('Profile').click({force:true})
        cy.contains('Log In').click()

        // Sign up
        cy.get('input[data-testid="usernameField"]').eq(1).type('user', {force:true})
        cy.get('input[data-testid="passwordField"]').eq(1).type('password', {force:true})
        cy.get('input[data-testid="emailField"]').type('test@test.com', {force:true})
        cy.get('div[role=button]').contains('Sign Up').click({force:true})

        cy.wait(750)

        // Ensure you land on profile page
        cy.get('div[role=button]').contains('Edit Profile').should('exist')
        cy.get('div[role=button]').contains('Log Out').should('exist')

    })

    it('Ensure login and change email functionality', () => {
        // Navigate to login page
        cy.get('[data-focusable]').contains('Profile').click({force:true})
        cy.contains('Log In').click()

        // Login
        cy.get('input[data-testid="usernameField"]').eq(0).type('user', {force:true})
        cy.get('input[data-testid="passwordField"]').eq(0).type('password', {force:true})
        cy.get('div[role=button]').eq(1).click({force:true}) // click login button

        cy.wait(750)

        // Ensure you land on profile page
        cy.get('div[role=button]').contains('Edit Profile').should('exist')
        cy.get('div[role=button]').contains('Log Out').should('exist')

        // Change email
        cy.get('div[role=button]').contains('Edit Profile').click()
        cy.get('div').contains('Edit Email').click()
        cy.get('input').eq(1).clear().type('test@changed.com')
        cy.get('div[role=button]').contains('Save').click()

        // Assert email changed
        cy.get('div').contains('test@changed.com').should('exist')

    })

    it('Ensure login and delete account functionality', () => {
        // Navigate to login page
        cy.get('[data-focusable]').contains('Profile').click({force:true})
        cy.contains('Log In').click()

        // Login
        cy.get('input[data-testid="usernameField"]').eq(0).type('user', {force:true})
        cy.get('input[data-testid="passwordField"]').eq(0).type('password', {force:true})
        cy.get('div[role=button]').eq(1).click({force:true}) // click login button

        cy.wait(750)

        // Ensure you land on profile page
        cy.get('div[role=button]').contains('Edit Profile').should('exist')
        cy.get('div[role=button]').contains('Log Out').should('exist')

        // Delete account
        cy.get('div[role=button]').contains('Edit Profile').click()
        cy.get('div[role=button]').contains('Delete account').click()
        cy.wait(750)
        cy.get('div[role=button]').eq(6).click()

        // Assert empty profile page
        cy.get('div').contains('Guest').should('exist')

    })
})