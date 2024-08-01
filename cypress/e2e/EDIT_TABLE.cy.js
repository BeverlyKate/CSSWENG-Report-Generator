describe('User should be able to edit the items and these edits should reflect in the website', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/dash/table')
    //cy.login('Admin', '12345678')
    //cy.get('#CompanyLogo > img').click()
    //cy.get('.Btn-table > a > img').click()
  })

  it('Should be able to change the date', () => {
    cy.wait(10000);
    cy.get(':nth-child(2) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairDate').clear()
    cy.get('#repairDate').type("Wed Apr 10 2024 00:00:00 GMT+0800 (Philippine Standard Time)")
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.wait(10000);
    cy.get(':nth-child(2) > :nth-child(2) > .col > strong').should('contain', 'Wed Apr 10 2024 00:00:00 GMT+0800 (Philippine Standard Time)')
  });

  it('Should be able to change the repair PL number', () => {
    cy.wait(10000);
    cy.get(':nth-child(14) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairPLNumber').clear()
    cy.get('#repairPLNumber').type(20)
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.get(':nth-child(14) > :nth-child(3) > .col').should('contain', '20')
  });
  it('Should be able to change the customer name', () => {
    cy.wait(10000);
    cy.get(':nth-child(14) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairCustomer').clear()
    cy.get('#repairCustomer').type('Angel')
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.get(':nth-child(14) > :nth-child(4) > .col > strong').should('contain', 'Angel')
  });

  it('Should be able to change the Item Model', () => {
    cy.wait(10000);
    cy.get(':nth-child(24) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairItemModel').select('FRAME VTX-12')
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.get(':nth-child(24) > :nth-child(5) > .col > strong').should('contain', 'FRAME VTX-12')
  });

  it('Should be able to change the category', () => {
    cy.wait(10000);
    cy.get(':nth-child(8) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairCategory1').select('PRO WOOFERS')
    cy.get('#repairCategory2').clear()
    cy.get('#repairCategory2').type('11')
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.get(':nth-child(8) > :nth-child(10) > .col').should('contain', 'PRO WOOFERS')
    cy.get(':nth-child(8) > :nth-child(11) > .col > strong').should('contain', '11')
  });

  
  it('Should be able to change the quantity', () => {
    cy.wait(10000);
    cy.get(':nth-child(8) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairQuantity').clear()
    cy.get('#repairQuantity').type('11')
    cy.get('#repairUOM').select('pc')
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.get(':nth-child(8) > :nth-child(7) > .col').should('contain', '11')
    cy.get(':nth-child(8) > :nth-child(8) > .col').should('contain', 'pc')
  });

  it('Should not be able to change the quantity to a negative value', () => {
    cy.wait(10000);
    cy.get(':nth-child(8) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairQuantity').clear()
    cy.get('#repairQuantity').type('-1')
    cy.get('[type="submit"]').click()
    cy.reload()
    //this should throw an error or prevent user from changing it at least
    cy.get(':nth-child(8) > :nth-child(7) > .col').should('contain', '11')
  });

  it('Should be able to change the repair pull out', () => {
    cy.wait(10000);
    cy.get(':nth-child(8) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairPullOutBy').clear()
    cy.get('#repairPullOutBy').type('mj')
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.get(':nth-child(8) > :nth-child(9) > .col').should('contain', 'mj')
  });

  it('Should be able to change the repair description', () => {
    cy.wait(10000);
    cy.get(':nth-child(8) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairDescription').clear()
    cy.get('#repairDescription').type('Waiting for spare parts')
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.get(':nth-child(8) > :nth-child(6) > .col > strong').should('contain', 'Waiting for spare parts')
  });

  it('Should be able to change the repair serial number and the job order number', () => {
    cy.wait(10000);
    cy.get(':nth-child(8) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairSerialNumber').clear()
    cy.get('#repairSerialNumber').type('12345')
    cy.get('#repairJobOrderNumber').clear()
    cy.get('#repairJobOrderNumber').type('12')
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.get(':nth-child(8) > :nth-child(12) > .col > strong').should('contain', '12345')
    cy.get(':nth-child(8) > :nth-child(13) > .col > strong').should('contain', '12')
  });

  it('Should not be able to change the repair serial number and the job order to non-numbers', () => {
    cy.wait(10000);
    cy.get(':nth-child(8) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairSerialNumber').clear()
    cy.get('#repairSerialNumber').type('a')
    cy.get('#repairJobOrderNumber').clear()
    cy.get('#repairJobOrderNumber').type('b')
    cy.get('[type="submit"]').click()
    cy.reload()
    //This should throw an error
    cy.get(':nth-child(8) > :nth-child(12) > .col > strong').should('contain', '12345')
    cy.get(':nth-child(8) > :nth-child(13) > .col > strong').should('contain', '12')
  });

  it('Should not be able to change the repair serial number and the job order to non-numbers', () => {
    cy.wait(10000);
    cy.get(':nth-child(8) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairSerialNumber').clear()
    cy.get('#repairSerialNumber').type('a')
    cy.get('#repairJobOrderNumber').clear()
    cy.get('#repairJobOrderNumber').type('b')
    cy.get('[type="submit"]').click()
    cy.reload()
    //This should throw an error
    cy.get(':nth-child(8) > :nth-child(12) > .col > strong').should('contain', '12345')
    cy.get(':nth-child(8) > :nth-child(13) > .col > strong').should('contain', '12')
  });

  it('Should be able to change the date started and date finished', () => {
    cy.wait(10000);
    cy.get(':nth-child(8) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairDateStarted').clear()
    cy.get('#repairDateStarted').type('45405')
    cy.get('#repairDateFinished').clear()
    cy.get('#repairDateFinished').type('45407')
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.get(':nth-child(8) > :nth-child(14) > .col > strong').should('contain', '45405')
    cy.get(':nth-child(8) > :nth-child(15) > .col > strong').should('contain', '45407')
  });

  it('Should not be able to change the repair cost to a negative number', () => {
    cy.wait(10000);
    cy.get(':nth-child(8) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairCost').clear()
    cy.get('#repairCost').type('-1')
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.get(':nth-child(8) > :nth-child(21) > .col > strong').should('contain', '12341')
  });

  it('Should not be able to change the repair cost to a non number', () => {
    cy.wait(10000);
    cy.get(':nth-child(8) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairCost').clear()
    cy.get('#repairCost').type('a')
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.get(':nth-child(8) > :nth-child(21) > .col > strong').should('contain', '12341')
  });

  it('Should be able to change the repair cost', () => {
    cy.wait(10000);
    cy.get(':nth-child(8) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairCost').clear()
    cy.get('#repairCost').type('12341')
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.get(':nth-child(8) > :nth-child(21) > .col > strong').should('contain', '12341')
  });

  it('Should be able to change the repair technicians', () => {
    cy.wait(10000);
    cy.get(':nth-child(8) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairTechnician1').select("DREX")
    cy.get('#repairTechnician2').select("MJ")
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.get(':nth-child(8) > :nth-child(16) > .col > strong').should('contain', 'DREX')
    cy.get(':nth-child(8) > :nth-child(17) > .col > strong').should('contain', 'MJ')
  });

  it('Should be able to change the item status', () => {
    cy.wait(10000);
    cy.get(':nth-child(8) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairItemStatus').select("DONE")
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.get(':nth-child(8) > :nth-child(18) > .col > strong').should('contain', 'DONE')
  });

  it('Should be able to change the delivery status', () => {
    cy.get(':nth-child(8) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairDeliveryStatus').select("FORWARDED")
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.get(':nth-child(8) > :nth-child(19) > .col > strong').should('contain', 'FORWARDED')
  });

  it('Should be able to change the remarks', () => {
    cy.wait(10000);
    cy.get(':nth-child(8) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairRemarks').clear()
    cy.get('#repairRemarks').type("Warranty Expired")
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.get(':nth-child(8) > :nth-child(20) > .col > strong').should('contain', 'Warranty Expired')
  });

  it('Should be able to change the return form number', () => {
    cy.wait(10000);
    cy.get(':nth-child(8) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairReturnFormNumber').clear()
    cy.get('#repairReturnFormNumber').type("112")
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.get(':nth-child(8) > :nth-child(22) > .col > strong').should('contain', '112')
  });

  it('Should be not able to change the return form number to a non-number', () => {
    cy.wait(10000);
    cy.get(':nth-child(8) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairReturnFormNumber').clear()
    cy.get('#repairReturnFormNumber').type("a")
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.get(':nth-child(8) > :nth-child(22) > .col > strong').should('contain', '112')
  });

  it('Should be able to change the return date', () => {
    cy.wait(10000);
    cy.get(':nth-child(8) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairDateReturned').clear()
    cy.get('#repairDateReturned').type("Sat Apr 27 2024 00:00:00 GMT+0800 (Philippine Standard Time)")
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.get(':nth-child(8) > :nth-child(23) > .col > strong').should('contain', 'Sat Apr 27 2024 00:00:00 GMT+0800 (Philippine Standard Time)')
  });

  it('Should not be able to change the return date to something that is of the wrong format', () => {
    cy.wait(10000);
    cy.get(':nth-child(8) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairDateReturned').clear()
    cy.get('#repairDateReturned').type("Friday Apr 27 2024 9pm")
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.get(':nth-child(8) > :nth-child(23) > .col > strong').should('contain', 'Sat Apr 27 2024 00:00:00 GMT+0800 (Philippine Standard Time)')
  });

  it('Should be able to change the status', () => {
    cy.wait(10000);
    cy.get(':nth-child(8) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairStatus').select("QA")
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.get(':nth-child(8) > :nth-child(24) > .col > strong').should('contain', 'QA')
  });

  it('Should be able to change the defect description', () => {
    cy.wait(10000);
    cy.get(':nth-child(8) > :nth-child(1) > .col > strong > .idNum').click()
    cy.get('#repairDefect').select("NO POWER")
    cy.get('[type="submit"]').click()
    cy.reload()
    cy.get(':nth-child(8) > :nth-child(25) > .col > strong').should('contain', 'NO POWER')
  });
})