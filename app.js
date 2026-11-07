// 1. Registro do Service Worker para o PWA funcionar Offline
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log("Service Worker ativo!"))
    .catch(err => console.error("Erro no Service Worker:", err));
}

// 2. Dados de Teste (Simula passageiros vindos de uma planilha ou banco)
const dadosIniciais = [
  { id: 1, nome: "Carlos Silva", telefone: "5511999999999", presente: false },
  { id: 2, nome: "Ana Oliveira", telefone: "5511888888888", presente: false },
  { id: 3, nome: "Marcos Souza", telefone: "5511777777777", presente: false }
];

// Carrega do localStorage ou inicia com os dados acima se estiver vazio
let passageiros = JSON.parse(localStorage.getItem('passageiros')) || dadosIniciais;

const listaContainer = document.getElementById('list');
const contadorEl = document.getElementById('counter');

// 3. Função para renderizar a tela
function renderizarLista() {
  listaContainer.innerHTML = '';
  let presentes = 0;

  passageiros.forEach(p => {
    if (p.presente) presentes++;

    const item = document.createElement('div');
    item.className = 'passenger-item';
    
    // Mensagem customizada para o WhatsApp caso a pessoa suma
    const msgZap = encodeURIComponent(`Olá ${p.nome}, estamos iniciando o embarque da excursão. Onde você está?`);
    const linkZap = `https://wa.me{p.telefone}?text=${msgZap}`;

    item.innerHTML = `
      <div class="passenger-info">
        <div class="checkbox-btn ${p.presente ? 'checked' : ''}" onclick="alternarPresenca(${p.id})">
          ${p.presente ? '✓' : ''}
        </div>
        <span class="name" style="${p.presente ? 'text-decoration: line-through; color: #888;' : ''}">${p.nome}</span>
      </div>
      <div class="actions">
        ${!p.presente ? `<a href="${linkZap}" target="_blank" class="btn-ws">Chamar</a>` : ''}
      </div>
    `;
    listaContainer.appendChild(item);
  });

  contadorEl.innerText = `${presentes} / ${passageiros.length}`;
  localStorage.setItem('passageiros', JSON.stringify(passageiros));
}

// 4. Alternar presença ao clicar no quadradinho
window.alternarPresenca = function(id) {
  passageiros = passageiros.map(p => p.id === id ? { ...p, presente: !p.presente } : p);
  renderizarLista();
}

// Inicializa a tela
renderizarLista();
