document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('contactForm').addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const form = event.target;
        const formData = new FormData(form);
        
        console.log('Form data:', Array.from(formData.entries()));

        const plainFormData = Object.fromEntries(formData.entries());
        const formDataJsonString = JSON.stringify(plainFormData);

        try {
            const response = await fetch('/submit-contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: formDataJsonString
            });

            if (!response.ok) {
                throw new Error('Eroare la trimiterea formularului');
            }

            const responseData = await response.text();
            console.log('Raspuns de la server:', responseData); // Pentru debugging

            const responseMessage = document.getElementById('responseMessage');
            responseMessage.innerText = responseData;
            responseMessage.style.color = 'black';

            // Reseteaza formularul dupa trimitere
            form.reset();

            // Ascunde mesajul dupa 5 secunde
            setTimeout(() => {
                responseMessage.innerText = '';
            }, 5000);
        } catch (error) {
            console.error('Eroare:', error);
            const responseMessage = document.getElementById('responseMessage');
            responseMessage.innerText = 'A aparut o eroare la trimiterea formularului.';
            responseMessage.style.color = 'red';
        }
    });
});
