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
  const whatsappBtn=document.getElementById('send-whatsapp');
  
  if(!form) return;

  // Função para obter os dados do formulário
  function getFormData(){
    const situacao = form.situacao.value.trim();
    const ajuda = form.ajuda.value;
    const cidade = form.cidade.value.trim();
    return { situacao, ajuda, cidade };
  }

  // Botão WhatsApp
  whatsappBtn?.addEventListener('click',()=>{
    const data = getFormData();
    
    if(!data.ajuda){
      alert('Por favor, selecione que tipo de ajuda você precisa.');
      return;
    }

    let message = `🌸 *Agosto Lilás - Pedido de Ajuda*\n\n`;
    
    if(data.cidade) message += `📍 *Cidade:* ${data.cidade}\n`;
    message += `🆘 *Tipo de ajuda:* ${getHelpText(data.ajuda)}\n`;
    if(data.situacao) message += `💭 *Situação:* ${data.situacao}\n`;
    
    message += `\n_Peço orientações sobre os canais de ajuda disponíveis._`;
    message += `\n\n📞 *Emergência:* 190 | 180`;
    
    const whatsappUrl = `https://wa.me/+55619610-0180?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Limpar formulário por segurança
    form.reset();
    
    // Mostrar dica de segurança
    setTimeout(() => {
      alert('💡 DICA DE SEGURANÇA:\n\n- Salve o WhatsApp 180 com nome de uma amiga\n- Delete as mensagens após receber as orientações\n- Use modo anônimo se necessário');
    }, 1000);
  });

  // Envio local (simulação)
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = getFormData();
    
    let alertMessage = '✅ Mensagem registrada localmente (simulação).\n\n';
    
    if(data.cidade) alertMessage += `📍 Cidade: ${data.cidade}\n`;
    if(data.ajuda) alertMessage += `🆘 Ajuda: ${getHelpText(data.ajuda)}\n`;
    if(data.situacao) alertMessage += `💭 Situação: ${data.situacao.substring(0,50)}${data.situacao.length>50?'...':''}\n`;
    
    alertMessage += '\n🚨 Em situação de emergência:\n• Ligue 190 (Polícia)\n• Ligue 180 (Central da Mulher)\n• WhatsApp: (61) 9610-0180';
    
    alert(alertMessage);
    form.reset();
  });

  function getHelpText(value){
    const helpTypes = {
      'orientacao-juridica': 'Orientação jurídica',
      'acolhimento-psicologico': 'Acolhimento psicológico',
      'medidas-protetivas': 'Medidas protetivas',
      'abrigamento': 'Abrigamento',
      'orientacao-geral': 'Orientação geral',
      'so-desabafar': 'Só quero desabafar'
    };
    return helpTypes[value] || value;
  }
}

function initEmergencyModal(){
  const emergLink=document.querySelector('a[href="#emergencia"]');
  const modal=document.getElementById('emergency-modal');
  const closeBtn=modal?.querySelector('.modal-close');
  if(!emergLink||!modal) return;

  emergLink.addEventListener('click',e=>{
    e.preventDefault();
    modal.removeAttribute('hidden');
    modal.focus();
  });
  
  closeBtn?.addEventListener('click',()=>modal.setAttribute('hidden',''));
  
  modal.addEventListener('click',e=>{
    if(e.target===modal){ modal.setAttribute('hidden',''); }
  });

  // Fechar modal com ESC
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&!modal.hasAttribute('hidden')){
      modal.setAttribute('hidden','');
    }
  });
}

// Funcionalidade adicional para destacar números de emergência
document.addEventListener('DOMContentLoaded', () => {
  // Animar cards de estatísticas quando ficam visíveis
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = Math.random() * 0.3 + 's';
        entry.target.classList.add('animate-in');
      }
    });
  });

  document.querySelectorAll('.card.stat').forEach(card => {
    observer.observe(card);
  });
});

// CSS para animação (será injetado via JavaScript)
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-in {
    animation: fadeInUp 0.6s ease forwards;
  }
  
  .card.stat {
    opacity: 0;
  }
`;
document.head.appendChild(style);