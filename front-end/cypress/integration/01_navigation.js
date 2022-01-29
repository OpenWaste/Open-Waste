describe('Navigation Test', () => {
  it('Ensures you can access camera and submission page.', () => {
    cy.wait(1000) // wait for camera to load
    cy.get('[data-focusable]').first().click()
    cy.contains('Image Submission').should('exist')
    cy.contains('If the app was not able to detect your item, upload a picture of it so that it can be used to help improve the app.').should('exist')
  })

  it('Ensures access to profile page', () => {
    cy.get('[data-focusable]').contains('Profile').click({force:true})
  })
})