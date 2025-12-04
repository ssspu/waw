document.addEventListener('DOMContentLoaded', () => {
  const bookButtons = document.querySelectorAll('.book-button');
  
  bookButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.service-card');
      const serviceTitle = card.querySelector('.service-title').textContent;
      
      // Add animation feedback
      button.textContent = 'Booked!';
      button.style.background = '#48bb78';
      
      setTimeout(() => {
        button.textContent = 'Book Now';
        button.style.background = '';
      }, 2000);
      
      console.log(`Booking service: ${serviceTitle}`);
    });
  });
  
  // Add entrance animation
  const cards = document.querySelectorAll('.service-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 150);
  });
});
