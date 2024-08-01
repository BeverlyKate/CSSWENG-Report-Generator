describe('Total Item Quantity Per Technician (TIQPT) reports.', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('#username').type('Neko Nyan')
    cy.get('#password').type('catto')
    cy.get('#login').click()
    cy.get('[data-report="TIQPT"]').click()
  })

  it('01 | Filter by month.', () => {
    cy.get('.popup-options > :nth-child(1)').click()
    cy.get('#dateFrom').type('2024-04')
    cy.get('.btn-generate-report').click()
  })

  it('02 | Filter by quarter.', () => {
    cy.get('.popup-options > :nth-child(2)').click()
    cy.get('[name="quarterNum"]').select('2nd Quarter')
    cy.get('[name="dateFrom"]').select('2024')
    cy.get('.btn-generate-report').click()
  })

  it('03 | Filter by year.', () => {
    cy.get('.popup-options > :nth-child(3)').click()
    cy.get('.selection > .btn-dropdown-mock').select('2024')
    cy.get('.btn-generate-report').click()
  })

  it('04 | Filter by month & by technician.', () => {
    cy.get('.popup-options > :nth-child(1)').click()
    cy.get('#dateFrom').type('2024-04')
    cy.get('.centered > .btn-dropdown-mock').select('CHRISTIAN')
    cy.get('.btn-generate-report').click()
  })

  it('05 | Filter by quarter & by technician.', () => {
    cy.get('.popup-options > :nth-child(2)').click()
    cy.get('[name="quarterNum"]').select('2nd Quarter')
    cy.get('[name="dateFrom"]').select('2024')
    cy.get('.centered > .btn-dropdown-mock').select('CHRISTIAN')
    cy.get('.btn-generate-report').click()
  })

  it('06 | Filter by year & by technician.', () => {
    cy.get('.popup-options > :nth-child(3)').click()
    cy.get('.selection > .btn-dropdown-mock').select('2024')
    cy.get('.centered > .btn-dropdown-mock').select('CHRISTIAN')
    cy.get('.btn-generate-report').click()
  })

  it('07 | Immediately click "generate report" without inputting anything else.', () => {
    cy.get('.btn-generate-report').click()
  })

})
  