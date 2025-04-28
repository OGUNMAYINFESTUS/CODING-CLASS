const pages = document.querySelectorAll('.page');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageNumberDisplay = document.getElementById('page-number');

let currentPage = 0;
const totalPages = pages.length;

function updateBook() {
    // Hide all pages
    pages.forEach(page => {
        page.style.display = 'none';
    });

    // Show the current page
    pages[currentPage].style.display = 'block';

    // Update page number display
    pageNumberDisplay.textContent = `Page ${currentPage + 1} of ${totalPages}`;

    // Disable/enable buttons based on current page
    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages - 1;
}

function nextPage() {
    if (currentPage < totalPages - 1) {
        currentPage++;
        updateBook();
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        updateBook();
    }
}

// Initial setup: Show the first page
updateBook();

// Event listeners for navigation buttons
nextBtn.addEventListener('click', nextPage);
prevBtn.addEventListener('click', prevPage);