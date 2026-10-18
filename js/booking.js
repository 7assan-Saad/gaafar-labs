
const WHATSAPP_NUMBER = '201015534488';

document.getElementById('bookingForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('bName').value.trim();
  const phone = document.getElementById('bPhone').value.trim();
  const branch = document.getElementById('bBranch').value;
  const test = document.getElementById('bTest').value;
  const date = document.getElementById('bDate').value;
  const time = document.getElementById('bTime').value;
  const home = document.getElementById('bHome').checked;
  const explain = document.getElementById('bExplain').checked;
  const address = document.getElementById('bAddress').value.trim();
  const notes = document.getElementById('bNotes').value.trim();

  let msg = '';
  msg += 'طلب حجز موعد%0A';
  msg += '━━━━━━━━━━━━━━━%0A';
  msg += 'معامل الدكتور عبد الله جعفر للتحاليل الطبية%0A';
  msg += '━━━━━━━━━━━━━━━%0A';
  msg += 'الاسم: ' + name + '%0A';
  msg += 'رقم الهاتف: ' + phone + '%0A';
  msg += 'الفرع: ' + branch + '%0A';
  msg += 'التحليل / الباقة: ' + test + '%0A';
  msg += 'التاريخ: ' + date + '%0A';
  msg += 'الوقت: ' + time + '%0A';
  msg += 'سحب عينة من المنزل: ' + (home ? 'نعم' : 'لا') + '%0A';
  msg += 'شرح النتائج: ' + (explain ? 'نعم' : 'لا') + '%0A';
  if (address) msg += 'العنوان: ' + address + '%0A';
  if (notes) msg += 'ملاحظات: ' + notes + '%0A';
  msg += '━━━━━━━━━━━━━━━%0A';
  msg += 'تم الإرسال من الموقع الإلكتروني';

  window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + msg, '_blank');
});

/* ===================== منع اختيار تاريخ سابق ===================== */
const dateInput = document.getElementById('bDate');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);