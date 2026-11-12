
(function () {
  const WHATSAPP_NUMBER = '201006424284';

  const form     = document.getElementById('feedbackForm');
  const success  = document.getElementById('feedbackSuccess');
  const nameF    = document.getElementById('fName');
  const phoneF   = document.getElementById('fPhone');
  const anonChk  = document.getElementById('fAnonymous');
  const callChk  = document.getElementById('fCallback');

  // عند تفعيل «تقديم مجهول» → عطّل حقلي الاسم والهاتف
  anonChk.addEventListener('change', () => {
    const isAnon = anonChk.checked;
    nameF.disabled = isAnon;
    phoneF.disabled = isAnon;
    if (isAnon) {
      nameF.value = '';
      phoneF.value = '';
      // لا يمكن طلب اتصال في الوضع المجهول
      callChk.checked = false;
      callChk.disabled = true;
    } else {
      callChk.disabled = false;
    }
  });

  // عند تفعيل «طلب اتصال» → اجعل الهاتف إلزامياً
  callChk.addEventListener('change', () => {
    if (callChk.checked) {
      phoneF.required = true;
      phoneF.placeholder = 'رقم الهاتف (مطلوب للتواصل)';
      if (!phoneF.value && !anonChk.checked) phoneF.focus();
    } else {
      phoneF.required = false;
      phoneF.placeholder = '01xxxxxxxxx';
    }
  });

  // التحقق قبل الإرسال
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const type    = form.querySelector('input[name="fType"]:checked');
    const name    = nameF.value.trim();
    const phone   = phoneF.value.trim();
    const email   = document.getElementById('fEmail').value.trim();
    const branch  = document.getElementById('fBranch').value;
    const subject = document.getElementById('fSubject').value.trim();
    const details = document.getElementById('fDetails').value.trim();
    const isAnon  = anonChk.checked;
    const wantsCall = callChk.checked;

    if (!type) {
      alert('من فضلك اختر نوع الرسالة (شكوى / اقتراح / شكر).');
      return;
    }
    if (!subject || !details) {
      alert('من فضلك اكتب موضوع الرسالة وتفاصيلها.');
      return;
    }
    if (wantsCall && !phone) {
      alert('طلبت التواصل هاتفياً — من فضلك اكتب رقم هاتفك.');
      return;
    }
    if (phone && !/^0?1[0-9]{8,9}$/.test(phone.replace(/\s/g, ''))) {
      alert('رقم الهاتف غير صحيح — اكتب رقماً مصرياً صحيحاً مثل 01xxxxxxxxx.');
      return;
    }

    let msg = 'رسالة من نموذج الشكاوى والاقتراحات%0A';
    msg += '━━━━━━━━━━━━━━━%0A';
    msg += 'النوع: ' + encodeURIComponent(type.value) + '%0A';
    msg += 'الموضوع: ' + encodeURIComponent(subject) + '%0A';

    if (isAnon) {
      msg += 'المرسل: مجهول%0A';
    } else {
      if (name)  msg += 'الاسم: ' + encodeURIComponent(name) + '%0A';
      if (phone) msg += 'الهاتف: ' + encodeURIComponent(phone) + '%0A';
    }
    if (email)  msg += 'البريد: ' + encodeURIComponent(email) + '%0A';
    if (branch) msg += 'الفرع: ' + encodeURIComponent(branch) + '%0A';

    msg += '━━━━━━━━━━━━━━━%0A';
    msg += 'التفاصيل:%0A' + encodeURIComponent(details) + '%0A';
    msg += '━━━━━━━━━━━━━━━%0A';
    if (wantsCall) msg += 'طلب اتصال هاتفي: نعم%0A';
    msg += 'تم الإرسال من الويب سايت.';

    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + msg, '_blank');
    success.classList.add('on');
  });
})();