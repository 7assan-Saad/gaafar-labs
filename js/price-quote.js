
const WHATSAPP_AMREYA = '201015534488';
const WHATSAPP_AGAMY  = '201210358627';

const amreya = document.getElementById('amreya');
const agamy = document.getElementById('agamy');

const success = document.getElementById('pqSuccess');

amreya.addEventListener('click', () => waMessage(WHATSAPP_AMREYA));

agamy.addEventListener('click', ()=> waMessage(WHATSAPP_AGAMY));

function waMessage(WHATSAPP_NUMBER) {

  const name  = document.getElementById('pName').value.trim();
  const phone = document.getElementById('pPhone').value.trim();

  const tests = Array.from(
    document.querySelectorAll('#pChips input:checked')
  ).map(i => i.value);

  const other  = document.getElementById('pText').value.trim();
  const bundle = document.getElementById('pBundle').checked;
  const home   = document.getElementById('pHome').checked;

  if (!name || !phone) {
    alert('من فضلك اكتب الاسم ورقم الواتساب.');
    return;
  }
  if (tests.length === 0 && !other) {
    alert('من فضلك اختر تحليلاً واحداً على الأقل أو اكتب التحليل المطلوب.');
    return;
  }
  if (!/^0?1[0-9]{8,9}$/.test(phone.replace(/\s/g, ''))) {
    alert('رقم الهاتف غير صحيح — اكتب رقماً مصرياً صحيحاً مثل 01xxxxxxxxx.');
    return;
  }

  let msg = 'استفسار عن أسعار تحاليل%0A';
  msg += '━━━━━━━━━━━━━━━%0A';
  msg += 'الاسم: ' + encodeURIComponent(name) + '%0A';
  msg += 'رقم الواتساب: ' + encodeURIComponent(phone) + '%0A';

  if (tests.length) {
    msg += 'التحاليل المطلوبة:%0A';
    tests.forEach((t, i) => {
      msg += '  ' + (i + 1) + '. ' + encodeURIComponent(t) + '%0A';
    });
  }

  if (other) msg += 'تفاصيل إضافية: ' + encodeURIComponent(other) + '%0A';

  msg += 'اقتراح باقة أوفر: ' + (bundle ? 'نعم' : 'لا') + '%0A';
  if (home) msg += 'استفسار عن سحب العينة من المنزل: نعم%0A';

  msg += '━━━━━━━━━━━━━━━%0A';
  msg += 'أرجو إرسال الأسعار، شكراً.';

  window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + msg);
  success.classList.add('on');
}