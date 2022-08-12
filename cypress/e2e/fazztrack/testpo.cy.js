import ExamplePage from "../page/ExamplePage";

describe('test with page object', ()=>{
    it('test with page object', function () {
        cy.visit('/')
        const examplePage = new ExamplePage()
        examplePage.inputQuote("hello")
        examplePage.selectColor("White")
        examplePage.clickAddQuote()
    });
})