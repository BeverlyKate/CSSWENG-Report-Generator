describe('Total Item Quantity Per Item Model Per Technician (TIQPMPT) reports.', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('#username').type('Neko Nyan')
    cy.get('#password').type('catto')
    cy.get('#login').click()
    cy.get('[data-report="TIQPMPT"]').click()
  })

  it('01 | Filter by month -> by task type (REPAIR) -> by item & technician.', () => {
    cy.get('.date_range > :nth-child(1)').click()
    cy.get('#dateFrom').type('2024-04')
    cy.get('.report-specifics-holder > .taskType > :nth-child(1)').click()
    cy.get('[name="category1"]').select('FRAME EZ-112A')
    cy.get('[name="technician"]').select('CHRISTIAN')
    cy.get('.btn-generate-report').click()
  })

  it('02 | Filter by month -> by task type (REPLACE) -> by item & technician.', () => {
    cy.get('.date_range > :nth-child(1)').click()
    cy.get('#dateFrom').type('2024-04')
    cy.get('.report-specifics-holder > .taskType > :nth-child(2)').click()
    cy.get('[name="category1"]').select('FRAME EZ-112A')
    cy.get('[name="technician"]').select('CHRISTIAN')
    cy.get('.btn-generate-report').click()
  })

  it('03 | Filter by month -> by task type (RETURN) -> by item & technician.', () => {
    cy.get('.date_range > :nth-child(1)').click()
    cy.get('#dateFrom').type('2024-04')
    cy.get('.report-specifics-holder > .taskType > :nth-child(3)').click()
    cy.get('[name="category1"]').select('FRAME EZ-112A')
    cy.get('[name="technician"]').select('CHRISTIAN')
    cy.get('.btn-generate-report').click()
  })

  it('04 | Filter by month -> by task type (QA) -> by item & technician.', () => {
    cy.get('.date_range > :nth-child(1)').click()
    cy.get('#dateFrom').type('2024-04')
    cy.get('.report-specifics-holder > .taskType > :nth-child(4)').click()
    cy.get('[name="category1"]').select('FRAME EZ-112A')
    cy.get('[name="technician"]').select('CHRISTIAN')
    cy.get('.btn-generate-report').click()
  })

  it('05 | Filter by quarter -> by task type (REPAIR) -> by item & technician.', () => {
    cy.get('.date_range > :nth-child(2)').click()
    cy.get('[name="quarterNum"]').select('2nd Quarter')
    cy.get('[name="dateFrom"]').select('2024')
    cy.get('.report-specifics-holder > .taskType > :nth-child(1)').click()
    cy.get('[name="category1"]').select('FRAME EZ-112A')
    cy.get('[name="technician"]').select('CHRISTIAN')
    cy.get('.btn-generate-report').click()
  })

  it('06 | Filter by quarter -> by task type (REPLACE) -> by item & technician.', () => {
    cy.get('.date_range > :nth-child(2)').click()
    cy.get('[name="quarterNum"]').select('2nd Quarter')
    cy.get('[name="dateFrom"]').select('2024')
    cy.get('.report-specifics-holder > .taskType > :nth-child(2)').click()
    cy.get('[name="category1"]').select('FRAME EZ-112A')
    cy.get('[name="technician"]').select('CHRISTIAN')
    cy.get('.btn-generate-report').click()
  })

  it('07 | Filter by quarter -> by task type (RETURN) -> by item & technician.', () => {
    cy.get('.date_range > :nth-child(2)').click()
    cy.get('[name="quarterNum"]').select('2nd Quarter')
    cy.get('[name="dateFrom"]').select('2024')
    cy.get('.report-specifics-holder > .taskType > :nth-child(3)').click()
    cy.get('[name="category1"]').select('FRAME EZ-112A')
    cy.get('[name="technician"]').select('CHRISTIAN')
    cy.get('.btn-generate-report').click()
  })

  it('08 | Filter by quarter -> by task type (QA) -> by item & technician.', () => {
    cy.get('.date_range > :nth-child(2)').click()
    cy.get('[name="quarterNum"]').select('2nd Quarter')
    cy.get('[name="dateFrom"]').select('2024')
    cy.get('.report-specifics-holder > .taskType > :nth-child(4)').click()
    cy.get('[name="category1"]').select('FRAME EZ-112A')
    cy.get('[name="technician"]').select('CHRISTIAN')
    cy.get('.btn-generate-report').click()
  })

  it('09 | Filter by year -> by task type (REPAIR) -> by item & technician.', () => {
    cy.get('.date_range > :nth-child(3)').click()
    cy.get('.selection > .btn-dropdown-mock').select('2024')
    cy.get('.report-specifics-holder > .taskType > :nth-child(1)').click()
    cy.get('[name="category1"]').select('FRAME EZ-112A')
    cy.get('[name="technician"]').select('CHRISTIAN')
    cy.get('.btn-generate-report').click()
  })

  it('10 | Filter by year -> by task type (REPLACE) -> by item & technician.', () => {
    cy.get('.date_range > :nth-child(3)').click()
    cy.get('.selection > .btn-dropdown-mock').select('2024')
    cy.get('.report-specifics-holder > .taskType > :nth-child(2)').click()
    cy.get('[name="category1"]').select('FRAME EZ-112A')
    cy.get('[name="technician"]').select('CHRISTIAN')
    cy.get('.btn-generate-report').click()
  })

  it('11 | Filter by year -> by task type (RETURN) -> by item & technician.', () => {
    cy.get('.date_range > :nth-child(3)').click()
    cy.get('.selection > .btn-dropdown-mock').select('2024')
    cy.get('.report-specifics-holder > .taskType > :nth-child(3)').click()
    cy.get('[name="category1"]').select('FRAME EZ-112A')
    cy.get('[name="technician"]').select('CHRISTIAN')
    cy.get('.btn-generate-report').click()
  })

  it('12 | Filter by year -> by task type (QA) -> by item & technician.', () => {
    cy.get('.date_range > :nth-child(3)').click()
    cy.get('.selection > .btn-dropdown-mock').select('2024')
    cy.get('.report-specifics-holder > .taskType > :nth-child(4)').click()
    cy.get('[name="category1"]').select('FRAME EZ-112A')
    cy.get('[name="technician"]').select('CHRISTIAN')
    cy.get('.btn-generate-report').click()
  })

  it('13 | Immediately click "generate report" without inputting anything else.', () => {
    cy.get('.btn-generate-report').click()
  })

})
  