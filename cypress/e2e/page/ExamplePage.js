class ExamplePage {
    inputQuote(quote){
        cy.get('#inputQuote')
            .type(quote)
    }

    selectColor(color){
        cy.get('#colorSelect')
            .select(color)
    }

    clickAddQuote(){
        cy.get('#buttonAddQuote')
            .click()
    }
}

export default ExamplePage