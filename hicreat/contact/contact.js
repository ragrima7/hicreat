addEventListener('DOMContentLoaded', () => {
  const f = document.getElementById('contactForm');
  f.addEventListener('submit', (e) => {
    const name = document.getElementById('name');
    const email= document.getElementById('email');
    const msg  = document.getElementById('message');
    let ok = true;
    ['err_name','err_email','err_message'].forEach(id => document.getElementById(id).textContent='');
    if(!name.value.trim()){ document.getElementById('err_name').textContent='お名前を入力してください'; ok=false; }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){ document.getElementById('err_email').textContent='正しいメールアドレスを入力してください'; ok=false; }
    if(!msg.value.trim()){ document.getElementById('err_message').textContent='お問い合わせ内容を入力してください'; ok=false; }
    if(!ok) e.preventDefault();
  });
});
