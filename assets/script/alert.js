document.getElementById('bio-link').addEventListener('click', function(event) {
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
