describe('Image Submission functionality: ', () => {
    it('Ensure error appears when no image selected', () => {
        // Navigate to submission page
        cy.get('[data-focusable]').contains('Profile').click({force:true})
        cy.contains('Submission').click()

        cy.wait(500)

        // Select category
        cy.get('select').select(1)

        // Try to submit
        cy.get('div[role=button]').contains('Submit').click()

        cy.wait(500)

        // Ensure error pops up
        cy.get('div').contains('Error').should('exist')
        cy.get('div').contains('Selected image was not submitted').should('exist')
        cy.get('div[role=button]').contains('Ok').click()
    })
})