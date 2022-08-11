describe('Koligrum - fazztrack Cypress Practice', () => {
    it('Check dropdown value', function () {
        cy.visit('https://b899-13-67-75-93.ngrok.io/')

        cy.get('#colorSelect')
            //verify the dropdown is visible
            .should('be.visible')

        //verify the list of value (how to handle list)
        cy.get('#colorSelect > option')
            .should($list => {
                //verify the size
                expect($list).to.have.length(5)
                expect($list.eq(0)).to.contain('White')
                expect($list.eq(1)).to.contain('Yellow')
                expect($list.eq(2)).to.contain('Cyan')
                expect($list.eq(3)).to.contain('Magenta')
                expect($list.eq(4)).to.contain('Blue')
            })
    });

    context('Create input', ()=>{
        const quotes = ["Quote White", "Quotes Yellow", "Quotes Cyna", "Quotes Magenta", "Quotes Blue"]
        before('Prepare quotes', ()=>{
            cy.visit('https://b899-13-67-75-93.ngrok.io/')
            //input quotes


            for (let i = 0; i < quotes.length; i++) {
                //type quote
                cy.get('#inputQuote')
                    .type(quotes[i])

                //select color
                cy.get('#colorSelect')
                    .select(i)

                //click button
                cy.get('#buttonAddQuote')
                    .click()
            }

        })

        it('Verify in Grid view', function () {
            //check if tab is active

            const gridView = cy.get('.nav.nav-tabs li:nth-child(1)')

            gridView.then($gridView => {
                if (!$gridView.hasClass('active')){
                    gridView.click()
                }
            })

            const listPanel = cy.get('.row div[name="quotePanel"]')
            //Verify that the number of quotes are correct
            cy.get('.row div[name="quotePanel"]').should('have.length', quotes.length+1)

            //Verify the quotes you inserted are correct
           listPanel.then($listpanel => {
               for (let i = 1; i < $listpanel.length; i++) {
                   expect($listpanel.eq(i)).contain(quotes[i-1])
               }
           })

        });

        it('Verify in Table view', function (){
            //Verify the table is exist
            const tableView = cy.get('.nav.nav-tabs li:nth-child(2)')

            tableView.then($tableView => {
                if (!$tableView.hasClass('active')){
                    tableView.click()
                }
            })

            cy.get('#buttonShowTable').trigger('mouseover')

            cy.get('#tableQuote').should('be.visible')
        })
    })

    context('Handling Alert', () => {
        before('Insert maximum quotes', () => {
            cy.visit('https://b899-13-67-75-93.ngrok.io/')

            for (let i = 0; i < 12; i++) {
                //type quote
                cy.get('#inputQuote')
                    .type("random" + i)

                //select color
                cy.get('#colorSelect')
                    .select(0)

                //click button
                cy.get('#buttonAddQuote')
                    .click()
            }
        })

        it('Handling alert in cypress', ()=>{
            /*cy.on('window:alert',(t)=>{
                //assertions
                expect(t).to.equal('Please delete Quotes first!xxxxx');
            })*/
        })
    })

})