export const handleScrollReveal = () => {
  const reveals = document.querySelectorAll('.reveal');

  reveals.forEach((reveal) => {
    const windowHeight = window.innerHeight;
    const elementTop = reveal.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add('active');
    }
  });
};

export const initScrollReveal = () => {
  window.addEventListener('scroll', handleScrollReveal);
  handleScrollReveal(); // Initial check
  
  return () => window.removeEventListener('scroll', handleScrollReveal);
};