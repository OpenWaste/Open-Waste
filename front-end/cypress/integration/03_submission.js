describe('Image Submission functionality: ', () => {
    it('Ensure error appears when no image selected', () => {
        // Navigate to submission page
        cy.contains('Submission').click({force:true})

        cy.wait(1000)

        // Select category
        cy.get('select').select(1)

        // Try to submit
        cy.get('div[role=button]').contains('Submit').click()

        cy.wait(500)

        // Ensure error pops up
        cy.get('div').contains('Error').should('exist')
        cy.get('div').contains('Selected image was not submitted').should('exist')
    })
})