
document.querySelectorAll('.faq').forEach(faq => {
  const q = faq.querySelector('.faq-q');
  const a = faq.querySelector('.faq-a');
  q.addEventListener('click', () => {
    const isOpen = faq.classList.contains('on');
    document.querySelectorAll('.faq').forEach(f => {
      f.classList.remove('on');
      f.querySelector('.faq-a').style.maxHeight = null;
    });
    if (!isOpen) {
      faq.classList.add('on');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});