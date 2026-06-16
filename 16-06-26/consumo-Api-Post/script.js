const container = document.getElementById('resultados');

async function executarAtividade() {
    try {
        const responsePosts = await fetch('https://typicode.com');
        const posts = await responsePosts.json();
        
        container.innerHTML += '<h2>Exemplo de Posts Recebidos:</h2>';
        posts.slice(0, 3).forEach(post => {
            container.innerHTML += `
                <div class="post">
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                    <small>ID do Post: ${post.id} | Criado pelo Usuário: ${post.userId}</small>
                </div>
            `;
        });

        const responseUser = await fetch('https://typicode.com');
        const user = await responseUser.json();

        container.innerHTML += `
            <h2>Dados do Usuário Filtrado (ID 3):</h2>
            <div class="post" style="border-left: 5px solid #28a745;">
                <h3>Nome: ${user.name}</h3>
                <p><strong>E-mail:</strong> ${user.email}</p>
                <p><strong>Cidade:</strong> ${user.address.city}</p>
            </div>
        `;

    } catch (erro) {
        console.error('Erro ao consumir a API:', erro);
    }
}

executarAtividade();
