/* ===================== قائمة الجوال ===================== */

const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  burger.classList.toggle('on');
  nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('on');
    nav.classList.remove('open');
  });
});

/* ===================== زر العودة للأعلى ===================== */

const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop.classList.toggle('on', window.scrollY > 500);
  document.getElementById('header').style.boxShadow =
    window.scrollY > 40 ? '0 6px 26px rgba(0,0,0,.28)' : 'none';
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ===================== السنة في الفوتر ===================== */

document.getElementById('year').textContent = new Date().getFullYear();


/* ===================== زر المشاركة ===================== */

const btn   = document.getElementById('shareBtn');
const toast = document.getElementById('shareToast');
let toastTimer = null;

const showToast = (text) => {
  toast.textContent = text;
  toast.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('on'), 2600);
};

const copyLink = async () => {
  const url = window.location.href;
  try {
    await navigator.clipboard.writeText(url);
    showToast('✅ تم نسخ رابط الصفحة');
  } catch {
    // بديل للمتصفحات التي لا تدعم Clipboard API
    const tmp = document.createElement('textarea');
    tmp.value = url;
    tmp.style.position = 'fixed';
    tmp.style.opacity = '0';
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand('copy');
    document.body.removeChild(tmp);
    showToast('✅ تم نسخ رابط الصفحة');
  }
};

btn.addEventListener('click', async () => {
  const shareData = {
    title: 'معامل أ.د. عبد الله جعفر للتحاليل الطبية',
    text : 'دقة في النتائج، سحب عينة من المنزل مجاناً، وخدمة شرح النتائج.',
    url  : window.location.href
  };

  // Web Share API (موبايل بشكل أساسي)
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (err) {
      // المستخدم أغلق نافذة المشاركة → لا نفعل شيئاً
      if (err.name === 'AbortError') return;
      // أي خطأ آخر → نسخ الرابط كبديل
    }
  }

  // بديل: نسخ الرابط
  copyLink();
});

/* ===== Page Transition Overlay ===== */
(function () {
  const overlay = document.getElementById('pageOverlay');
  if (!overlay) return;

  const DURATION = 250; // ← يجب أن يطابق مدة page-fade-out
  const body = document.body;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // عند الرجوع من ذاكرة التخزين المؤقت
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      overlay.classList.remove('is-active');
      body.classList.remove('page-fade-out');
    }
  });

  // عند النقر على رابط داخلي
  document.addEventListener('click', function (e) {
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;

    const link = e.target.closest('a');
    if (!link) return;
    if (link.target === '_blank') return;
    if (link.hasAttribute('download') || link.hasAttribute('data-no-fade')) return;

    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;

    let url;
    try { url = new URL(href, location.href); } catch { return; }
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.search === location.search) return;

    e.preventDefault();

    if (reducedMotion.matches) {
      location.href = link.href;
      return;
    }

    // اعرض الـ overlay وأخفِ الصفحة
    overlay.classList.add('is-active');
    body.classList.add('page-fade-out');

    setTimeout(function () {
      location.href = link.href;
    }, DURATION);
  });
})();