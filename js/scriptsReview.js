document.addEventListener("DOMContentLoaded", function () {
    const reviewCards = Array.from(document.querySelectorAll(".review-card"));
    const prevBtn = document.getElementById("previous-button");
    const nextBtn = document.getElementById("next-button");
    const dotsContainer = document.getElementById("pagination-dots");
    const cardsPerPage = 3; // Number of reviews displayed
    let currentIndex = 0; // Current starting index

    function updateVisibleCards() {
        reviewCards.forEach((card, index) => {
            if (index >= currentIndex && index < currentIndex + cardsPerPage) {
                card.style.display = "block"; // Show the card
            } else {
                card.style.display = "none"; // Hide the card
            }
        });

        // Update dots
        updateDots();
    }

    function updateDots() {
        dotsContainer.innerHTML = ""; // Clear existing dots
        const totalDots = reviewCards.length - cardsPerPage + 1; // Calculate total dots
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement("span");
            dot.className = "dot";
            dot.dataset.index = i; // Set data attribute for index
            dot.textContent = '●'; // Dot character
            dot.style.cursor = "pointer"; // Make the dots clickable
            dot.style.margin = "0 5px"; // Space between dots
            dot.addEventListener("click", function () {
                currentIndex = i; // Set current index to dot's index
                updateVisibleCards(); // Update visible cards
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateReviews(direction) {
        // Increment the index based on direction
        if (direction === 'next') {
            if (currentIndex < reviewCards.length - cardsPerPage) {
                currentIndex++; // Move to the next set
            }
        } else if (direction === 'prev') {
            if (currentIndex > 0) {
                currentIndex--; // Move to the previous set
            }
        }
        
        // Update visibility of the cards
        updateVisibleCards();
    }

    // Event listeners for navigation buttons
    prevBtn.addEventListener("click", function () {
        updateReviews('prev');
    });

    nextBtn.addEventListener("click", function () {
        updateReviews('next');
    });

    

    // Display only the first 3 cards initially
    updateVisibleCards();
});
