function changePage(pageNumber) {
    const storyPages = document.querySelectorAll('.storybook-page');
    storyPages.forEach(page => page.style.display = 'none');

    storyPages[pageNumber - 1].style.display = 'block';

    if (pageNumber === 1) {
        storyPages[pageNumber - 1].className = "storybook-page page-background-1";
        storyPages[pageNumber - 1].querySelector("p").className = "text-color-1";

    } else if (pageNumber === 2) {
        storyPages[pageNumber - 1].className = "storybook-page page-background-2";
        storyPages[pageNumber - 1].querySelector("p").className = "text-color-2";
    } else {
        storyPages[pageNumber - 1].className = "storybook-page page-background-3";
        storyPages[pageNumber - 1].querySelector("p").className = "text-color-3";
    }
}

// Initially hide all pages except the first one
const initialPages = document.querySelectorAll('.storybook-page');
for (let i = 1; i < initialPages.length; i++) {
    initialPages[i].style.display = 'none';
}