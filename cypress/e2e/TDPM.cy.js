describe('template spec', () => {  
  beforeEach(() => {
    cy.login('Admin', '12345678')
    cy.get('#CompanyLogo > img').click()
    cy.get('.Btn-generateReport > a > img')
  })
  it('Should be able create a report (TOP DEFECTS PER MODEL) based on the month', () => {
    cy.get('[data-report="TDPM"]').click()
    cy.get('.date_range > :nth-child(1) > span').click()
    cy.get('#dateFrom').clear().type('2024-01')
    cy.get('.report-specifics-holder > .taskType > :nth-child(1) > span').click()
    cy.get('[name="category1"]').select("ACCESSORIES")
    cy.get('.btn-generate-report').click()
    cy.get(':nth-child(2) > :nth-child(1) > .col > strong').should('contain','NO SOUND / NO AUDIO')
    cy.get(':nth-child(2) > :nth-child(2) > .col').should('contain','4')
    //cy.get(':nth-child(2) > span')
    //cy.get(':nth-child(3) > span')
  });

  it('Should be able create a report (TOP DEFECTS PER MODEL) based on the quarter', () => {
    cy.get('[data-report="TDPM"]').click()
    cy.wait(10)
    cy.get('.date_range > :nth-child(2) > span').click()
    cy.wait(10)
    cy.get('[name="quarterNum"]').select("1st Quarter")
    cy.get('[name="dateFrom"]').select("2024")
    cy.get('.report-specifics-holder > .taskType > :nth-child(1) > span').click()
    cy.get('[name="category1"]').select("ACCESSORIES")
    cy.get('.btn-generate-report').click()
    cy.get(':nth-child(2) > :nth-child(1) > .col > strong').should('contain','NO SOUND / NO AUDIO')
    cy.get(':nth-child(2) > :nth-child(2) > .col').should('contain','4')
    //cy.get(':nth-child(2) > span')
    //cy.get(':nth-child(3) > span')
  });

  it('Should be able create a report (TOP DEFECTS PER MODEL) based on the year', () => {
    cy.get('[data-report="TDPM"]').click()
    cy.wait(15)
    cy.get('.date_range > :nth-child(3) > span').click()
    cy.wait(15)
    cy.get('.selection > .btn-dropdown-mock').select("2024")
    cy.get('.report-specifics-holder > .taskType > :nth-child(1) > span').click()
    cy.get('[name="category1"]').select("ACCESSORIES")
    cy.get('.btn-generate-report').click()
    cy.get(':nth-child(2) > :nth-child(1) > .col > strong').should('contain','NO SOUND / NO AUDIO')
    cy.get(':nth-child(2) > :nth-child(2) > .col').should('contain','4')
    //cy.get(':nth-child(2) > span')
    //cy.get(':nth-child(3) > span')
  });

  it.skip('Should not be able create a report (Item Quantity per Model) without a date parameter', () => {
    cy.get('[data-report="IQPM"]').click()
    cy.get('.centered > .btn-dropdown-mock').select("AGR/MIRACLE 8 ITEM")
    cy.get('.btn-generate-report').click()
    //cy.get(':nth-child(2) > span')
    //cy.get(':nth-child(3) > span')
  });
})