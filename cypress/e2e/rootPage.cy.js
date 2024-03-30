describe('root page', () => {
  it('root page shows successfully', () => {
    cy.visit('/');
    cy.get(".page-nav__day").should("have.length", 7);
    cy.get(".movie").should("be.visible");
  })
})

