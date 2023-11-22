describe('Signup Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login'); 
    });

    it('should open the signup popup when clicking the Sign Up button', () => {
        cy.contains('Sign up').click();
    
        cy.get('.popup-overlay').should('be.visible'); 
        cy.get('.signup-form').should('be.visible'); 
      });
  
    it('should submit the signup form successfully', () => {
        cy.contains('Sign up').click();

        cy.get('input[name="email"]').type('test@example.com');
        cy.get('input[name="username"]').type('testuser');
        cy.get('input[name="password"]').type('password123');
        cy.get('input[name="confirmPassword"]').type('password123');
    
        cy.get('form#signupForm').submit();
    
        cy.get('.popup-overlay').should('be.visible'); 
        cy.get('.signup-form').should('not.be.visible'); 
    });
});