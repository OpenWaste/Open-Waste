describe('Image Submission Test', () => {
    it('Ensure you can submit an image.', () => {
      cy.get('[data-cy=image-submission-button]').click()
    })
  })