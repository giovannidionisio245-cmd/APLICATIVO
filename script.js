document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('mcForm');
  const btnSubmit = document.getElementById('btnSubmit');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalBox = document.getElementById('modalBox');
  const modalStatusIcon = document.getElementById('statusIcon');
  const modalMessage = document.getElementById('modalMessage');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  // Submissão do formulário com Animação de Explosão de TNT
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Inicia pisca-pisca de contagem da TNT no botão
    btnSubmit.classList.add('tnt-ignited');
    btnSubmit.disabled = true;

    // Aguarda o tempo do fusível da TNT antes de explodir
    setTimeout(() => {
      // Posição do botão para originar a explosão
      const rect = btnSubmit.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Executa efeito de partículas no portal da tela
      criarExplosaoTNT(centerX, centerY);

      // Leitura dos dados
      const nome = document.getElementById('nome').value.trim();
      const idade = parseInt(document.getElementById('idade').value, 10);
      const altura = parseFloat(document.getElementById('altura').value);

      // Validação das Regras do Negócio (Altura >= 1.70m E Idade >= 18 anos)
      const eApto = altura >= 1.70 && idade >= 18;

      // Restaura o botão e exibe a mensagem no Modal Pop-Up
      btnSubmit.classList.remove('tnt-ignited');
      btnSubmit.disabled = false;
      exibirModal(eApto, nome);
    }, 1200);
  });

  // Gera partículas visuais simulando a explosão do bloco de TNT
  function criarExplosaoTNT(x, y) {
    const totalParticulas = 35;
    const coresTNT = ['#ff5555', '#ffffff', '#555555', '#ffaa00', '#333333'];

    for (let i = 0; i < totalParticulas; i++) {
      const particle = document.createElement('div');
      particle.className = 'tnt-particle';
      
      // Cor aleatória entre fumaça, fogo e estilhaços da TNT
      const cor = coresTNT[Math.floor(Math.random() * coresTNT.length)];
      particle.style.backgroundColor = cor;

      // Posição inicial no centro do botão
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      // Ângulo e velocidade de projeção
      const angle = Math.random() * Math.PI * 2;
      const velocity = 80 + Math.random() * 160;
      const dx = Math.cos(angle) * velocity;
      const dy = Math.sin(angle) * velocity;

      particle.style.setProperty('--dx', `${dx}px`);
      particle.style.setProperty('--dy', `${dy}px`);

      document.body.appendChild(particle);

      // Remove a partícula após o término da animação
      setTimeout(() => particle.remove(), 600);
    }
  }

  // Abre e estiliza o Modal Pop-up
  function exibirModal(apto, nome) {
    modalBox.classList.remove('sucesso', 'erro');

    if (apto) {
      modalBox.classList.add('sucesso');
      modalStatusIcon.textContent = '⚔️';
      modalMessage.textContent = `Parabéns, ${nome}! Você cumpre os requisitos e pode prosseguir no processo para a vaga!`;
    } else {
      modalBox.classList.add('erro');
      modalStatusIcon.textContent = '💥';
      modalMessage.textContent = `Infelizmente, ${nome}, você não é apto à vaga.`;
    }

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
  }

  // Fecha o Modal Pop-up
  function fecharModal() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
  }

  modalCloseBtn.addEventListener('click', fecharModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) fecharModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      fecharModal();
    }
  });
});