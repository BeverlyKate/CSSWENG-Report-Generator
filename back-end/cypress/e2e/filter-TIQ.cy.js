describe('16-TIQ_ItemInv', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('#username').type('Neko Nyan')
    cy.get('#password').type('catto')
    cy.get('#login').click()
    cy.get('[data-report="IQPM"] > :nth-child(1)').click()
  })


  it('01 | Filter by month', () => {
    cy.get('.popup-options > :nth-child(1)').click()
    cy.get('#dateFrom').type('2024-04')
    cy.get('.btn-generate-report').click()
    cy.wait(1500)
  })
  
  it('02 | Filter by quarter', () => {
    cy.get('.popup-options > :nth-child(2)').click()
    cy.get('.selectQuarter select[name="quarterNum"]').select('first')
    cy.get('.selectQuarter select[name="dateFrom"]').select('2024')
    cy.get('.btn-generate-report').click()
    cy.wait(1500)
  })

  it('03 | Filter by year', () => {
    cy.get('.popup-options > :nth-child(3)').click()
    cy.get('select[name="dateFrom"]').select('2024')
    cy.get('.btn-generate-report').click()
    cy.wait(1500)
  })

  it('04 | Filter by month and by item category', () => {
    cy.get('.popup-options > :nth-child(1)').click()
    cy.get('#dateFrom').type('2024-04')
    cy.get('select[name="category1"]').select('ACCESSORIES');
    cy.get('.btn-generate-report').click()
    cy.wait(1500)
  })

  it('05 | Filter by quarter and by item category', () => {
    cy.get('.popup-options > :nth-child(2)').click()
    cy.get('.selectQuarter select[name="quarterNum"]').select('first')
    cy.get('.selectQuarter select[name="dateFrom"]').select('2024')
    cy.get('select[name="category1"]').select('ACCESSORIES');
    cy.get('.btn-generate-report').click()
    cy.wait(1500)
  })

  it('06 | Filter by year and by item category', () => {
    cy.get('.popup-options > :nth-child(3)').click()
    cy.get('select[name="dateFrom"]').select('2024')
    cy.get('select[name="category1"]').select('ACCESSORIES');
    cy.get('.btn-generate-report').click()
    cy.wait(1500)
  })

  it('07 | No input/s. Just click generate report', () => {
    cy.get('.popup-options > :nth-child(3)').click()
    cy.get('.btn-generate-report').click()
    cy.wait(1500)
  })



})
  