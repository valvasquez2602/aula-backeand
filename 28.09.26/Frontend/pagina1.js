document.addEventListener('DOMContentLoaded', function () {
    const logoBtn = document.getElementById('logoBtn');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const movieGrid = document.getElementById('movieGrid');

    logoBtn.addEventListener('click', function (e) {
        e.preventDefault();
        sidebarMenu.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
        if (!sidebarMenu.contains(e.target) && !logoBtn.contains(e.target)) {
            sidebarMenu.classList.remove('active');
        }
    });

    fetch('http://localhost:3000/usuario/filmes/lista')
        .then(response => {
            if (!response.ok) {
                throw new Error('Falha ao buscar filmes no banco de dados');
            }
            return response.json();
        })
        .then(filmes => {
            movieGrid.innerHTML = '';

            filmes.forEach(filme => {
                const col = document.createElement('div');
                col.className = 'col movie-item';
                col.setAttribute('data-desc', filme.sinopse);
                col.setAttribute('data-rating', `${filme.nota}/5`);
                
                col.innerHTML = `
                    <div class="card movie-card h-100 border-0 text-white">
                        <div class="card-body p-5 d-flex flex-column align-items-center justify-content-center text-center">
                            <h4 class="fw-bold text-white mb-2">${filme.titulo}</h4>
                            <span class="badge bg-light text-dark mb-2">${filme.genero}</span>
                            
                            <div class="movie-details-inline d-none w-100 mt-3 text-start">
                                <hr class="border-light opacity-25">
                                <p class="small movie-text mb-2"></p>
                                <div class="text-warning small">
                                    <i class="bi bi-star-fill me-1"></i> Pontuação: <span class="movie-rate ms-1 fw-bold"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                col.addEventListener('click', function () {
                    const isCurrentlyExpanded = this.classList.contains('expanded');
                    
                    const allItems = document.querySelectorAll('.movie-item');
                    allItems.forEach(i => {
                        i.classList.remove('expanded');
                        i.querySelector('.movie-details-inline').classList.add('d-none');
                    });

                    if (!isCurrentlyExpanded) {
                        this.classList.add('expanded');
                        
                        const detailsContainer = this.querySelector('.movie-details-inline');
                        const textPara = this.querySelector('.movie-text');
                        const rateSpan = this.querySelector('.movie-rate');

                        textPara.textContent = this.getAttribute('data-desc');
                        rateSpan.textContent = this.getAttribute('data-rating');
                        
                        detailsContainer.classList.remove('d-none');
                    }
                });

                movieGrid.appendChild(col);
            });
        })
        .catch(error => {
            console.error('Erro:', error);
            movieGrid.innerHTML = `<div class="col-12 text-center text-white-50">Não foi possível conectar ao banco para carregar os filmes.</div>`;
        });
});