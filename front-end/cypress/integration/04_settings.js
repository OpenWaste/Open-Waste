describe('Settings functionality: ', () => {
    it('Ensure language changes to french', () => {
        // Navigate to Settings
        cy.contains('Settings').click({force:true})
    
        // Ensure UI of Settings page showed up
        cy.get('div').contains('Setting').should('exist')
        cy.get('div').contains('About us').should('exist')
        cy.get('div').contains('Language').should('exist')
    
        // Navigate into Language and select french
        cy.get('div').contains('Language').click()
        cy.get('div').contains('French').click()

        // Ensure language change
        cy.get('div').contains('Paramètres').should('exist')
        cy.get('div').contains('À propos de nous').should('exist')
        cy.get('div').contains('Langue').should('exist')
    })
})