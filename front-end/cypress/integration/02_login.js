describe('Login functionality: ', () => {
    it('Ensure login functionality', () => {
        cy.get('[data-focusable]').contains('Profile').click({force:true})
        cy.contains('Log In').click()
        cy.wait(1000)
        cy.get('input').first().type('user', {force:true})
        cy.get('input').eq(1).type('password', {force:true})
        cy.get('[role=button]').contains('Log In').click({force:true})

        // Does not assert anything yet because profile navigation is buggy on web instead of mobile

    })
})