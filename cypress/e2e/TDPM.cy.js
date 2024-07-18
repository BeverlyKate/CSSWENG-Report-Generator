describe('Test cases for Report Generation in Top Defects Per Model', () => {  
  beforeEach(() => {
    cy.login('Admin', '12345678')
    cy.get('#CompanyLogo > img').click()
    cy.get('.Btn-generateReport > a > img')
  })
  it('Should be able create a report (TOP DEFECTS PER MODEL [Repair]) based on the month', () => {
    cy.get('[data-report="TDPM"]').click()
    cy.get('.date_range > :nth-child(1) > span').click()
    cy.get('#dateFrom').clear().type('2024-01')
    cy.get('.report-specifics-holder > .taskType > :nth-child(1) > span').click()
    cy.get('[name="category1"]').select("ACCESSORIES")
    cy.get('.btn-generate-report').click()
    cy.wait(15)
    cy.get(':nth-child(2) > :nth-child(1) > .col > strong').should('contain','NO SOUND / NO AUDIO')
    cy.get(':nth-child(2) > :nth-child(2) > .col').should('contain','4')
    cy.wait(15)
  });

  it('Should be able create a report (TOP DEFECTS PER MODEL [Replace]) based on the month', () => {
    cy.get('[data-report="TDPM"]').click()
    cy.get('.date_range > :nth-child(1) > span').click()
    cy.get('#dateFrom').clear().type('2024-04')
    cy.get('.report-specifics-holder > .taskType > :nth-child(2) > span').click()
    cy.get('[name="category1"]').select("CONFERENCE SYSTEM")
    cy.get('.btn-generate-report').click()
    cy.wait(15)
    cy.get(':nth-child(3) > :nth-child(1) > .col > strong').should('contain','DISTORTED SOUND')
    cy.get(':nth-child(3) > :nth-child(2) > .col').should('contain','4')
    cy.wait(15)
  });

  it('Should be able create a report (TOP DEFECTS PER MODEL [Return]) based on the month', () => {
    cy.get('[data-report="TDPM"]').click()
    cy.get('.date_range > :nth-child(1) > span').click()
    cy.get('#dateFrom').clear().type('2024-04')
    cy.get('.report-specifics-holder > .taskType > :nth-child(3) > span').click()
    cy.get('[name="itemModel"]').select("FRAME KIRA 288")
    cy.get('.btn-generate-report').click()
    cy.wait(15)
    cy.get(':nth-child(2) > :nth-child(1) > .col > strong').should('contain','FAN HEADERS NOT PLUGGED IN')
    cy.get(':nth-child(2) > :nth-child(2) > .col').should('contain','4')
    cy.wait(15)
  });

  it('Should be able create a report (TOP DEFECTS PER MODEL [QA]) based on the month', () => {
    cy.get('[data-report="TDPM"]').click()
    cy.get('.date_range > :nth-child(1) > span').click()
    cy.get('#dateFrom').clear().type('2024-04')
    cy.get('.report-specifics-holder > .taskType > :nth-child(4) > span').click()
    cy.get('[name="itemModel"]').select("HORN H315")
    cy.get('.btn-generate-report').click()
    cy.wait(15)
    cy.get(':nth-child(2) > :nth-child(1) > .col > strong').should('contain','FAN HEADERS NOT PLUGGED IN')
    cy.get(':nth-child(2) > :nth-child(2) > .col').should('contain','4')
    cy.wait(15)
  });

  it('Should be able create a report (TOP DEFECTS PER MODEL [Repair]) based on the quarter', () => {
    cy.get('[data-report="TDPM"]').click()
    cy.wait(10)
    cy.get('.date_range > :nth-child(2) > span').click()
    cy.wait(10)
    cy.get('[name="quarterNum"]').select("1st Quarter")
    cy.get('[name="dateFrom"]').select("2024")
    cy.get('.report-specifics-holder > .taskType > :nth-child(1) > span').click()
    cy.get('[name="category1"]').select("ACCESSORIES")
    cy.get('.btn-generate-report').click()
    cy.wait(15)
    cy.get(':nth-child(2) > :nth-child(1) > .col > strong').should('contain','NO SOUND / NO AUDIO')
    cy.get(':nth-child(2) > :nth-child(2) > .col').should('contain','4')
    cy.wait(15)
  });

  it('Should be able create a report (TOP DEFECTS PER MODEL [Replace]) based on the quarter', () => {
    cy.get('[data-report="TDPM"]').click()
    cy.wait(10)
    cy.get('.date_range > :nth-child(2) > span').click()
    cy.wait(10)
    cy.get('[name="quarterNum"]').select("2nd Quarter")
    cy.get('[name="dateFrom"]').select("2024")
    cy.get('.report-specifics-holder > .taskType > :nth-child(2) > span').click()
    cy.get('[name="category1"]').select("CONFERENCE SYSTEM")
    cy.get('.btn-generate-report').click()
    cy.wait(15)
    cy.get(':nth-child(3) > :nth-child(1) > .col > strong').should('contain','DISTORTED SOUND')
    cy.get(':nth-child(3) > :nth-child(2) > .col').should('contain','2')
    cy.wait(15)
  });

  it('Should be able create a report (TOP DEFECTS PER MODEL [Return]) based on the quarter', () => {
    cy.get('[data-report="TDPM"]').click()
    cy.wait(10)
    cy.get('.date_range > :nth-child(2) > span').click()
    cy.wait(10)
    cy.get('[name="quarterNum"]').select("2nd Quarter")
    cy.get('[name="dateFrom"]').select("2024")
    cy.get('.report-specifics-holder > .taskType > :nth-child(3) > span').click()
    cy.get('[name="itemModel"]').select("FRAME KIRA 288")
    cy.get('.btn-generate-report').click()
    cy.wait(15)
    cy.get(':nth-child(2) > :nth-child(1) > .col > strong').should('contain','FAN HEADERS NOT PLUGGED IN')
    cy.get(':nth-child(2) > :nth-child(2) > .col').should('contain','4')
    cy.wait(15)
  });

  it('Should be able create a report (TOP DEFECTS PER MODEL [QA]) based on the quarter', () => {
    cy.get('[data-report="TDPM"]').click()
    cy.wait(10)
    cy.get('.date_range > :nth-child(2) > span').click()
    cy.wait(10)
    cy.get('[name="quarterNum"]').select("2nd Quarter")
    cy.get('[name="dateFrom"]').select("2024")
    cy.get('.report-specifics-holder > .taskType > :nth-child(4) > span').click()
    cy.get('[name="itemModel"]').select("HORN H315")
    cy.get('.btn-generate-report').click()
    cy.wait(15)
    cy.get(':nth-child(2) > :nth-child(1) > .col > strong').should('contain','FAN HEADERS NOT PLUGGED IN')
    cy.get(':nth-child(2) > :nth-child(2) > .col').should('contain','4')
    cy.wait(15)
  });

  it('Should be able create a report (TOP DEFECTS PER MODEL [Repair]) based on the year', () => {
    cy.get('[data-report="TDPM"]').click()
    cy.wait(15)
    cy.get('.date_range > :nth-child(3) > span').click()
    cy.wait(15)
    cy.get('.selection > .btn-dropdown-mock').select("2024")
    cy.get('.report-specifics-holder > .taskType > :nth-child(1) > span').click()
    cy.get('[name="category1"]').select("ACCESSORIES")
    cy.get('.btn-generate-report').click()
    cy.wait(15)
    cy.get(':nth-child(2) > :nth-child(1) > .col > strong').should('contain','NO SOUND / NO AUDIO')
    cy.get(':nth-child(2) > :nth-child(2) > .col').should('contain','4')
    cy.wait(15)
  });

  it('Should be able create a report (TOP DEFECTS PER MODEL [Replace]) based on the year', () => {
    cy.get('[data-report="TDPM"]').click()
    cy.wait(15)
    cy.get('.date_range > :nth-child(3) > span').click()
    cy.wait(15)
    cy.get('.selection > .btn-dropdown-mock').select("2024")
    cy.get('.report-specifics-holder > .taskType > :nth-child(2) > span').click()
    cy.get('[name="category1"]').select("CONFERENCE SYSTEM")
    cy.get('.btn-generate-report').click()
    cy.wait(15)
    cy.get(':nth-child(3) > :nth-child(1) > .col > strong').should('contain','DISTORTED SOUND')
    cy.get(':nth-child(3) > :nth-child(2) > .col').should('contain','2')
    cy.wait(15)
  });

  it('Should be able create a report (TOP DEFECTS PER MODEL [Return]) based on the year', () => {
    cy.get('[data-report="TDPM"]').click()
    cy.wait(15)
    cy.get('.date_range > :nth-child(3) > span').click()
    cy.wait(15)
    cy.get('.selection > .btn-dropdown-mock').select("2024")
    cy.get('.report-specifics-holder > .taskType > :nth-child(3) > span').click()
    cy.get('[name="itemModel"]').select("FRAME KIRA 288")
    cy.get('.btn-generate-report').click()
    cy.wait(15)
    cy.get(':nth-child(2) > :nth-child(1) > .col > strong').should('contain','FAN HEADERS NOT PLUGGED IN')
    cy.get(':nth-child(2) > :nth-child(2) > .col').should('contain','4')
    cy.wait(15)
  });

  it('Should be able create a report (TOP DEFECTS PER MODEL [QA]) based on the year', () => {
    cy.get('[data-report="TDPM"]').click()
    cy.wait(15)
    cy.get('.date_range > :nth-child(3) > span').click()
    cy.wait(15)
    cy.get('.selection > .btn-dropdown-mock').select("2024")
    cy.get('.report-specifics-holder > .taskType > :nth-child(4) > span').click()
    cy.get('[name="itemModel"]').select("HORN H315")
    cy.get('.btn-generate-report').click()
    cy.wait(15)
    cy.get(':nth-child(2) > :nth-child(1) > .col > strong').should('contain','FAN HEADERS NOT PLUGGED IN')
    cy.get(':nth-child(2) > :nth-child(2) > .col').should('contain','4')
    cy.wait(15)
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

  it('Should not be able create a report (TOP DEFECTS PER MODEL) without a date parameter', () => {
    cy.get('[data-report="TDPM"]').click()
    cy.get('.report-specifics-holder > .taskType > :nth-child(1) > span').click()
    cy.get('[name="category1"]').select("ACCESSORIES")
    cy.get('.btn-generate-report').click()
    cy.url().then((currentUrl) => {
      cy.get('.btn-generate-report').click();
      cy.url().should('eq', currentUrl);
    })
  });

  it('Should not be able create a report (TOP DEFECTS PER MODEL) without an item or category parameter', () => {
    cy.get('[data-report="TDPM"]').click()
    cy.wait(15)
    cy.get('.date_range > :nth-child(3) > span').click()
    cy.wait(15)
    cy.get('.selection > .btn-dropdown-mock').select("2024")
    cy.get('.btn-generate-report').click()
    cy.url().then((currentUrl) => {
      cy.get('.btn-generate-report').click();
      cy.url().should('eq', currentUrl);
    })
  });

  it('Should not be able create a report (TOP DEFECTS PER MODEL) without any parameters', () => {
    cy.get('[data-report="TDPM"]').click()
    cy.wait(15)
    cy.get('.btn-generate-report').click()
    cy.url().then((currentUrl) => {
      cy.get('.btn-generate-report').click();
      cy.url().should('eq', currentUrl);
    })
  });
})