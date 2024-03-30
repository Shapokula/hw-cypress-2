import credentials from '../fixtures/admin.json'

describe('admin', () => {
  beforeEach (() => {
    cy.visit(("/admin"));
  })

  credentials.forEach((data) => {
    it(data.name, () => {
      cy.adminLogin(data.email, data.passw);
      cy.contains(data.message).should("be.visible");
      cy.clearCookies();
    })
  })
})

