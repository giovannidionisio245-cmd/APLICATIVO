document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('candidateForm');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalBox = modalOverlay.querySelector('.modal-box');
  const modalStatusIcon = document.getElementById('modalStatusIcon');
  const modalMessage = document.getElementById('modalMessage');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  // Evento ao enviar o formulário
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Captura dos valores
    const nome = document.getElementById('nome').value.trim();
    const idade = parseInt(document.getElementById('idade').value, 10);
    const altura = parseFloat(document.getElementById('altura').value);

    // Validação das Regras do Negócio:
    // Altura >= 1.70m E Idade >= 18 anos
    const eApto = altura >= 1.70 && idade >= 18;

    exibirModal(eApto, nome);
  });

  // Função para abrir o Pop-up Modal
  function exibirModal(apto, nome) {
    // Limpa estados anteriores
    modalBox.classList.remove('sucesso', 'erro');

    if (apto) {
      modalBox.classList.add('sucesso');
      modalStatusIcon.textContent = '✓';
      modalMessage.textContent = `Parabéns, ${nome}! Você pode prosseguir no processo para a vaga!`;
    } else {
      modalBox.classList.add('erro');
      modalStatusIcon.textContent = '✕';
      modalMessage.textContent = `Infelizmente você não é apto à vaga.`;
    }

    // Exibe o modal com transição CSS
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
  }

  // Função para fechar o Pop-up Modal
  function fecharModal() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
  }

  // Eventos de Fechamento do Modal
  modalCloseBtn.addEventListener('click', fecharModal);

  // Fecha o modal ao clicar fora da caixa central
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      fecharModal();
    }
  });

  // Fecha o modal ao pressionar a tecla "ESC"
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      fecharModal();
    }
  });
});