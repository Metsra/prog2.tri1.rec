const searchInput = document.getElementById('search-input');
const guestList = document.getElementById('guest-list');
const statsDiv = document.getElementById('stats');
const confirmSection = document.getElementById('confirm-section');
const searchSection = document.getElementById('search-section');
const selectedNameEl = document.getElementById('selected-name');
const companionsInput = document.getElementById('companions-input');

let selectedGuest = null;

async function updateStats() {
  const res = await fetch('/api/stats');
  const stats = await res.json();
  statsDiv.innerHTML = `
    <div class="stat-item">Total: ${stats.total}</div>
    <div class="stat-item" style="color: green;">Confirmados: ${stats.confirmed}</div>
    <div class="stat-item" style="color: red;">Ausentes: ${stats.absent}</div>
    <div class="stat-item">Acompanhantes: ${stats.companions}</div>
  `;
}

async function searchGuests() {
  const q = searchInput.value.trim();
  const res = await fetch(`/api/guests?q=${encodeURIComponent(q)}`);
  const guests = await res.json();
  
  guestList.innerHTML = guests.length ? '' : '<li>Nenhum convidado encontrado.</li>';

  guests.forEach(g => {
    const li = document.createElement('li');
    const statusText = g.confirmado ? '<span style="color:green; font-weight:bold;">Confirmado</span>' : 'Pendente';
    li.innerHTML = `<span>${g.nome} - ${statusText}</span>`;
    
    if (!g.confirmado) {
      const btn = document.createElement('button');
      btn.textContent = 'Selecionar';
      btn.className = 'btn btn-select';
      btn.onclick = () => selectGuest(g.nome);
      li.appendChild(btn);
    }
    guestList.appendChild(li);
  });
}

function selectGuest(nome) {
  selectedGuest = nome;
  selectedNameEl.textContent = nome;
  searchSection.classList.add('hidden');
  confirmSection.classList.remove('hidden');
  companionsInput.value = 0;
}

document.getElementById('confirm-btn').onclick = async () => {
  const companions = parseInt(companionsInput.value);
  if (companions < 0) return alert('Quantidade inválida.');

  const res = await fetch('/api/confirm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome: selectedGuest, acompanhantes: companions })
  });
  
  if (res.ok) {
    alert('Presença confirmada!');
    cancelSelection();
    updateStats();
  }
};

document.getElementById('cancel-btn').onclick = cancelSelection;

function cancelSelection() {
  selectedGuest = null;
  searchInput.value = '';
  searchSection.classList.remove('hidden');
  confirmSection.classList.add('hidden');
  searchGuests();
}

searchInput.addEventListener('input', searchGuests);
updateStats();
searchGuests();