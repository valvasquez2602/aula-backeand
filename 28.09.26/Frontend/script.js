const API_URL = 'http://localhost:3000/filmes';

const movieGrid = document.getElementById('movieGrid');
const meuFormulario = document.getElementById('meuFormulario');
const inputBusca = document.getElementById('inputBusca');

async function carregarFilmes() {
    try {
        const resposta = await fetch(API_URL);
        const filmes = await resposta.json();
        renderizarFilmes(filmes);
    } catch (erro) {
        console.error("Erro ao conectar ao servidor backend:", erro);
    }
}

function renderizarFilmes(listaFilmes) {
    movieGrid.innerHTML = "";
    
    if (listaFilmes.length === 0) {
        movieGrid.innerHTML = `<div class="col-12 text-center text-muted my-4">Nenhum filme disponível.</div>`;
        return;
    }

    listaFilmes.forEach(filme => {
        const cardHtml = `
            <div class="col">
                <div class="movie-card">
                    <!-- Botão de Lixeira Excluir -->
                    <button class="delete-btn-floating" onclick="excluirFilme(${filme.id})">
                        <i class="bi bi-trash3-fill"></i>
                    </button>
                    <!-- Imagem e Nota -->
                    <div class="poster-wrapper">
                        <img src="${filme.url_imagem}" alt="${filme.titulo}" onerror="this.src='https://placehold.co'">
                        <div class="rating-badge text-warning">
                            <i class="bi bi-star-fill me-1"></i> ${Number(filme.nota).toFixed(1)}
                        </div>
                    </div>
                    <!-- Textos descritivos -->
                    <div class="movie-title text-white" title="${filme.titulo}">${filme.titulo}</div>
                    <div class="movie-meta">${filme.genero}</div>
                </div>
            </div>
        `;
        movieGrid.innerHTML += cardHtml;
    });
}

meuFormulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const novoFilme = {
        titulo: document.getElementById('titulo').value,
        sinopse: document.getElementById('sinopse').value,
        genero: document.getElementById('genero').value,
        nota: parseInt(document.getElementById('nota').value),
        url_imagem: document.getElementById('url_imagem').value
    };

    try {
        const resposta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoFilme)
        });

        if (resposta.ok) {
            meuFormulario.reset(); 

            const bootstrapCollapse = bootstrap.Collapse.getInstance(document.getElementById('formCadastro'));
            if(bootstrapCollapse) bootstrapCollapse.hide();
            
            carregarFilmes(); 
        } else {
            const erroData = await resposta.json();
            alert(`Erro do Servidor: ${erroData.erro}`);
        }
    } catch (erro) {
        alert("Não foi possível enviar os dados ao backend.");
    }
});

async function excluirFilme(id) {
    if (!confirm("Deseja mesmo remover este filme do catálogo?")) return;

    try {
        const resposta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (resposta.ok) {
            carregarFilmes(); 
        }
    } catch (erro) {
        console.error("Erro ao remover o registro:", erro);
    }
}

inputBusca.addEventListener('input', () => {
    const termo = inputBusca.value.toLowerCase();
    const cards = document.querySelectorAll('#movieGrid .col');
    
    cards.forEach(card => {
        const tituloCard = card.querySelector('.movie-title').textContent.toLowerCase();
        const generoCard = card.querySelector('.movie-meta').textContent.toLowerCase();
        
        if (tituloCard.includes(termo) || generoCard.includes(termo)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

window.addEventListener('DOMContentLoaded', carregarFilmes);
