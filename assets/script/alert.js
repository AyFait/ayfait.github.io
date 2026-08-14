/*document.getElementById('bio-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior
    document.getElementById('popup').style.display = 'flex';
});

document.getElementById('enter-bio').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
    window.location.href = '#bio';
});

document.getElementById('close-popup').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});
*/


// wiki tab element
const wikiTab = document.getElementById('wiki-tab');

// click event listener to the wiki tab
wikiTab.addEventListener('click', (e) => {
    // Prevent the default link behavior
    e.preventDefault();

    // Display the popup
    const popup = document.getElementById('popup');
    popup.style.display = 'flex';

    // event listeners to the popup buttons
    document.getElementById('proceed-btn').addEventListener('click', () => {
        // Hide the popup and navigate to the wiki page
        popup.style.display = 'none';
        window.location.href = 'wiki.html';
    });

    document.getElementById('go-back-btn').addEventListener('click', () => {
        // Hide the popup
        popup.style.display = 'none';
    });
});
