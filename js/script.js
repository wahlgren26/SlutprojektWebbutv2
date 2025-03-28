// Vänta tills dokumentet är helt laddat
document.addEventListener('DOMContentLoaded', function() {
    // Lägg till fade-in-animation på huvudelement
    const mainElements = document.querySelectorAll('main section');
    mainElements.forEach(element => {
        element.classList.add('fade-in');
    });

    // Hantera portfolio-filtrering
    setupPortfolioFilter();
    
    // Validera kontaktformulär
    setupFormValidation();
});

/**
 * Konfigurerar portfolio-filtrering
 */
function setupPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Ta bort active-klassen från alla knappar
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Lägg till active-klassen på den klickade knappen
                this.classList.add('active');
                
                // Hämta filtervärdet
                const filterValue = this.getAttribute('data-filter');
                
                // Filtrera portfolio-objekt
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

/**
 * Konfigurerar validering av kontaktformulär
 */
function setupFormValidation() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            if (!validateForm()) {
                event.preventDefault();
            }
        });
        
        // Validera formuläret
        function validateForm() {
            let isValid = true;
            
            // Validera namn
            const nameInput = document.getElementById('name');
            if (nameInput && nameInput.value.trim() === '') {
                showError(nameInput, 'Vänligen ange ditt namn');
                isValid = false;
            } else if (nameInput) {
                removeError(nameInput);
            }
            
            // Validera e-post
            const emailInput = document.getElementById('email');
            if (emailInput) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailInput.value.trim() === '') {
                    showError(emailInput, 'Vänligen ange din e-postadress');
                    isValid = false;
                } else if (!emailRegex.test(emailInput.value.trim())) {
                    showError(emailInput, 'Vänligen ange en giltig e-postadress');
                    isValid = false;
                } else {
                    removeError(emailInput);
                }
            }
            
            // Validera meddelande
            const messageInput = document.getElementById('message');
            if (messageInput && messageInput.value.trim() === '') {
                showError(messageInput, 'Vänligen ange ett meddelande');
                isValid = false;
            } else if (messageInput) {
                removeError(messageInput);
            }
            
            return isValid;
        }
        
        // Visa felmeddelande
        function showError(input, message) {
            const formGroup = input.parentElement;
            const errorElement = formGroup.querySelector('.invalid-feedback') || document.createElement('div');
            
            errorElement.className = 'invalid-feedback';
            errorElement.textContent = message;
            
            input.classList.add('is-invalid');
            
            if (!formGroup.querySelector('.invalid-feedback')) {
                formGroup.appendChild(errorElement);
            }
        }
        
        // Ta bort felmeddelande
        function removeError(input) {
            input.classList.remove('is-invalid');
            const formGroup = input.parentElement;
            const errorElement = formGroup.querySelector('.invalid-feedback');
            
            if (errorElement) {
                formGroup.removeChild(errorElement);
            }
        }
    }
}