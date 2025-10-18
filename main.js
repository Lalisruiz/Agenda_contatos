// script.js
document.addEventListener('DOMContentLoaded', function() {
    updateEmptyState();
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o envio do formulário

    // Obtém os valores dos campos do formulário
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();

    // Validação básica
    if (!nome || !telefone) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Verifica se o contato já existe
    if (contactExists(nome, telefone)) {
        alert('Este contato já existe na lista!');
        return;
    }

    // Remove o estado vazio se existir
    removeEmptyState();

    // Cria uma nova linha e células para a tabela
    const table = document.getElementById('contactTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    newRow.classList.add('new-contact');

    const nameCell = newRow.insertCell(0);
    const phoneCell = newRow.insertCell(1);
    const actionsCell = newRow.insertCell(2);

    // Define o texto das células
    nameCell.textContent = nome;
    phoneCell.textContent = formatPhone(telefone);
    
    // Adiciona botão de remover
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.className = 'delete-btn';
    deleteBtn.title = 'Remover contato';
    deleteBtn.onclick = function() {
        if (confirm('Deseja realmente remover este contato?')) {
            newRow.remove();
            updateEmptyState();
        }
    };
    actionsCell.appendChild(deleteBtn);

    // Limpa os campos do formulário
    document.getElementById('contactForm').reset();
    
    // Remove a classe de animação após a animação terminar
    setTimeout(() => {
        newRow.classList.remove('new-contact');
    }, 500);
});

function contactExists(nome, telefone) {
    const table = document.getElementById('contactTable').getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');
    
    for (let row of rows) {
        if (row.classList.contains('empty-state')) continue;
        const cells = row.getElementsByTagName('td');
        if (cells.length >= 2 && 
            cells[0].textContent.toLowerCase() === nome.toLowerCase() && 
            cells[1].textContent === formatPhone(telefone)) {
            return true;
        }
    }
    return false;
}

function formatPhone(phone) {
    // Remove todos os caracteres não numéricos
    const numbers = phone.replace(/\D/g, '');
    
    // Formata o telefone brasileiro
    if (numbers.length === 11) {
        return `(${numbers.slice(0,2)}) ${numbers.slice(2,7)}-${numbers.slice(7)}`;
    } else if (numbers.length === 10) {
        return `(${numbers.slice(0,2)}) ${numbers.slice(2,6)}-${numbers.slice(6)}`;
    }
    return phone; // Retorna o original se não conseguir formatar
}

function updateEmptyState() {
    const table = document.getElementById('contactTable').getElementsByTagName('tbody')[0];
    const rows = table.getElementsByTagName('tr');
    
    // Conta apenas as linhas que não são do estado vazio
    let contactCount = 0;
    for (let row of rows) {
        if (!row.classList.contains('empty-state')) {
            contactCount++;
        }
    }
    
    if (contactCount === 0) {
        addEmptyState();
    }
}

function addEmptyState() {
    const table = document.getElementById('contactTable').getElementsByTagName('tbody')[0];
    const emptyRow = table.insertRow();
    emptyRow.classList.add('empty-state');
    
    const emptyCell = emptyRow.insertCell(0);
    emptyCell.colSpan = 3;
    emptyCell.innerHTML = 'Nenhum contato adicionado ainda<br><small>Adicione seu primeiro contato usando o formulário acima</small>';
}

function removeEmptyState() {
    const table = document.getElementById('contactTable').getElementsByTagName('tbody')[0];
    const emptyRows = table.querySelectorAll('.empty-state');
    emptyRows.forEach(row => row.remove());
}
