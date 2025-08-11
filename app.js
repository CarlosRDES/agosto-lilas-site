document.addEventListener('DOMContentLoaded', () => {
  initSmoothScrolling();
  initViolenceCards();
  initFAQ();
  initAnonymousForm();
  initEmergencyModal();
});

function initSmoothScrolling(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const href=a.getAttribute('href');
      if(href==="#"||href.length<2) return;
      e.preventDefault();
      const el=document.querySelector(href);
      if(!el) return;
      const headerH=document.querySelector('.header').offsetHeight||0;
      const top=el.getBoundingClientRect().top+window.scrollY-headerH-12;
      window.scrollTo({top,behavior:'smooth'});
    });
  });
}

function initViolenceCards(){
  document.querySelectorAll('.violence-card').forEach(card=>{
    const toggle=()=> {
      const expanded=card.classList.toggle('expanded');
      card.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    };
    card.addEventListener('click',toggle);
    card.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){
        e.preventDefault();
        toggle();
      }
    });
  });
}

function initFAQ(){
  document.querySelectorAll('.faq-item').forEach(item=>{
    const q=item.querySelector('.faq-q');
    const a=item.querySelector('.faq-a');
    q.addEventListener('click',()=>{
      const expanded=q.getAttribute('aria-expanded')==='true';
      q.setAttribute('aria-expanded', String(!expanded));
      if(expanded){ a.setAttribute('hidden',''); }
      else{ a.removeAttribute('hidden'); }
    });
  });
}

function initAnonymousForm(){
  const form=document.getElementById('anon-form');
  if(!form) return;
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const data={
      situacao: form.situacao.value.trim(),
      ajuda: form.ajuda.value.trim(),
      cidade: form.cidade.value.trim()
    };
    alert('Mensagem registrada localmente (simulação).\n\n' +
      (data.cidade?`Cidade: ${data.cidade}\n`:``) +
      (data.ajuda?`Ajuda: ${data.ajuda}\n`:``) +
      (data.situacao?`Situação: ${data.situacao}\n`:``) +
      '\nEm situação de emergência, ligue 190 ou 180.');
    form.reset();
  });
}

function initEmergencyModal(){
  const emergLink=document.querySelector('a[href="#emergencia"]');
  const modal=document.getElementById('emergency-modal');
  const closeBtn=modal?.querySelector('.modal-close');
  if(!emergLink||!modal) return;

  emergLink.addEventListener('click',e=>{
    e.preventDefault();
    modal.removeAttribute('hidden');
  });
  closeBtn?.addEventListener('click',()=>modal.setAttribute('hidden',''));
  modal.addEventListener('click',e=>{
    if(e.target===modal){ modal.setAttribute('hidden',''); }
  });
}
