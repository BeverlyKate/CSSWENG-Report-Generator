describe('20-PS_PerModel_ItemInv', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('#username').type('Admin')
    cy.get('#password').type('12345678')
    cy.get('#login').click()
    cy.get('[data-report="TIQPT"]').click()
  })

  it('01 | Filter by month.', () => {
    cy.get('.popup-options > :nth-child(1)').click()
    cy.get('#dateFrom').type('2024-04')
    cy.get('.btn-generate-report').click()
    cy.wait(1000);
  })

  it('02 | Filter by quarter.', () => {
    cy.get('.popup-options > :nth-child(2)').click()
    cy.get('[name="quarterNum"]').select('2nd Quarter')
    cy.get('[name="dateFrom"]').select('2024')
    cy.get('.btn-generate-report').click()
    cy.wait(1000);
  })

  it('03 | Filter by year.', () => {
    cy.get('.popup-options > :nth-child(3)').click()
    cy.get('.selection > .btn-dropdown-mock').select('2024')
    cy.get('.btn-generate-report').click()
    cy.wait(1000);
  })

  it('04 | Filter by month & by technician.', () => {
    cy.get('.popup-options > :nth-child(1)').click()
    cy.get('#dateFrom').type('2024-04')
    cy.get('.centered > .btn-dropdown-mock').select('CHRISTIAN')
    cy.wait(10000);
    cy.get('.btn-generate-report').click()
    cy.wait(1000);
  })

  it('05 | Filter by quarter & by technician.', () => {
    cy.get('.popup-options > :nth-child(2)').click()
    cy.get('[name="quarterNum"]').select('2nd Quarter')
    cy.get('[name="dateFrom"]').select('2024')
    cy.get('.centered > .btn-dropdown-mock').select('CHRISTIAN')
    cy.wait(10000);
    cy.get('.btn-generate-report').click()
    cy.wait(1000);
  })

  it('06 | Filter by year & by technician.', () => {
    cy.get('.popup-options > :nth-child(3)').click()
    cy.get('.selection > .btn-dropdown-mock').select('2024')
    cy.get('.centered > .btn-dropdown-mock').select('CHRISTIAN')
    cy.wait(10000);
    cy.get('.btn-generate-report').click()
    cy.wait(1000);
  })

  it('07 | Immediately click "generate report" without inputting anything else.', () => {
    cy.get('.btn-generate-report').click()
    cy.wait(1000);
  })

})
  