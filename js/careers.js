
const WHATSAPP_NUMBER = '201015534488';

/* ---------- فلترة الوظائف ---------- */
const tabs = document.querySelectorAll('#jobTabs .jtab');
const cards = document.querySelectorAll('.job-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('on'));
    tab.classList.add('on');
    const cat = tab.dataset.cat;
    cards.forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
    });
  });
});

/* ---------- زر قدم على الوظيفة ---------- */
const posSelect = document.getElementById('jPosition');
document.querySelectorAll('[data-job]').forEach(btn => {
  btn.addEventListener('click', () => {
    const job = btn.dataset.job.trim();
    Array.from(posSelect.options).forEach(opt => {
      if (opt.value.trim() === job) posSelect.value = opt.value;
    });
    document.getElementById('apply').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ---------- الأسئلة الشائعة ---------- */
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

/* ---------- نموذج التقديم ---------- */
const form = document.getElementById('jobForm');
const success = document.getElementById('jobSuccess');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name   = document.getElementById('jName').value.trim();
  const phone  = document.getElementById('jPhone').value.trim();
  const email  = document.getElementById('jEmail').value.trim();
  const pos    = document.getElementById('jPosition').value;
  const exp    = document.getElementById('jExp').value;
  const qual   = document.getElementById('jQual').value.trim();
  const branch = document.getElementById('jBranch').value;
  const cv     = document.getElementById('jCv').value.trim();
  const about  = document.getElementById('jAbout').value.trim();

  if (!name || !phone || !pos) {
    alert('من فضلك أكمل الاسم ورقم الهاتف والوظيفة المتقدم لها.');
    return;
  }
  if (!/^0?1[0-9]{8,9}$/.test(phone.replace(/\s/g, ''))) {
    alert('رقم الهاتف غير صحيح — اكتب رقماً مصرياً صحيحاً مثل 01xxxxxxxxx.');
    return;
  }

  let msg = 'طلب توظيف جديد%0A';
  msg += '━━━━━━━━━━━━━━━%0A';
  msg += 'الاسم: ' + encodeURIComponent(name) + '%0A';
  msg += 'الهاتف: ' + encodeURIComponent(phone) + '%0A';
  if (email)  msg += 'البريد: ' + encodeURIComponent(email) + '%0A';
  msg += 'الوظيفة: ' + encodeURIComponent(pos) + '%0A';
  if (exp)    msg += 'الخبرة: ' + encodeURIComponent(exp) + '%0A';
  if (qual)   msg += 'المؤهل: ' + encodeURIComponent(qual) + '%0A';
  if (branch) msg += 'الفرع المفضل: ' + encodeURIComponent(branch) + '%0A';
  if (cv)     msg += 'رابط السيرة الذاتية: ' + encodeURIComponent(cv) + '%0A';
  if (about)  msg += 'نبذة: ' + encodeURIComponent(about) + '%0A';
  msg += '━━━━━━━━━━━━━━━%0A';
  msg += 'تم الإرسال من صفحة الوظائف — سأرفق سيرتي الذاتية بعد هذه الرسالة.';

  window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + msg, '_blank');
  success.classList.add('on');
});
