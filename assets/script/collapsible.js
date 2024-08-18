
  const toggleBtns = document.querySelectorAll('.toggle-btn');

  toggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const sectionContent = btn.nextElementSibling;
      sectionContent.style.display = sectionContent.style.display === 'none' ? 'block' : 'none';
    });
  });

