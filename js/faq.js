/* ===== تصفية تبويبات الأسئلة الشائعة ===== */
(function () {
  const tabs  = document.querySelectorAll('#faqTabs .ftab');
  const items = document.querySelectorAll('.faq-wrap .faq');
  if (!tabs.length || !items.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('on'));
      tab.classList.add('on');

      const cat = tab.dataset.faq;

      items.forEach(item => {
        const match = (cat === 'all' || item.dataset.faq === cat);
        item.style.display = match ? '' : 'none';

        // إغلاق أي سؤال مفتوح عند تغيير التبويب
        if (!match) {
          item.classList.remove('on');
          const a = item.querySelector('.faq-a');
          if (a) a.style.maxHeight = null;
        }
      });
    });
  });
})();

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