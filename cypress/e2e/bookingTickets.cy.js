import credentials from '../fixtures/booking.json'

describe('booking tickets', () => {
  credentials.forEach((data) => {
    it('booking', () => {
      cy.visit('/admin');
      cy.adminLogin(data.admin.email, data.admin.passw);
      cy.get(data.admin.seancesHall).first().then((hall) => {
        cy.get(hall).find(data.admin.seancesMovie).should("have.length.greaterThan", 0);
        cy.get(hall).find(data.admin.seancesTitle).invoke("text").then((hallName) => {
          cy.visit('/');
          cy.contains(hallName).parents(data.user.seancesHall)
            .find(data.user.seancesTime).last().should("not.have.class", "acceptin-button-disabled")
            .click();
          cy.bookSeats(data.user.seats);
          cy.get(data.user.acceptButton).click();
          cy.url().should("eq", "http://qamid.tmweb.ru/client/payment.php");
          cy.contains(hallName).should("be.visible");
        });
      })
    })
  })
})