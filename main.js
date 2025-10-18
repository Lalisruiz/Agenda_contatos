// script.js
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o envio do formulário

    // Obtém os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;

    // Cria uma nova linha e células para a tabela
    const table = document.getElementById('contactTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const nameCell = newRow.insertCell(0);
    const phoneCell = newRow.insertCell(1);

    // Define o texto das células
    nameCell.textContent = nome;
    phoneCell.textContent = telefone;

    // Limpa os campos do formulário
    document.getElementById('contactForm').reset();
});
