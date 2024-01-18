describe('Chatroom E2E Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000');
    });
  
    it('should log in and send a message', () => {
      cy.visit('http://localhost:3000/login');
  
      cy.get('input[name="loginUsername"]').type('test');
      cy.get('input[name="loginPassword"]').type('1234567890');
      cy.get('button[type="submit"]').click();
  
      // Wait for the login to complete
      cy.url().should('not.include', '/login');
  
      // Navigate to the chatroom page
      cy.visit('http://localhost:3000/chat/Ivan');
  
      // Type a message in the textarea
      cy.get('.message-input-container textarea')
        .type('Hello, this is a test message')
        .should('have.value', 'Hello, this is a test message');
  
      // Click the send button
      cy.get('.message-input-container button').click();
  
      // Wait for the message to appear in the messages container
      cy.get('.messages-container .messages .sent').should('contain', 'Hello, this is a test message');
    });
  
    // Add more test cases as needed
  });