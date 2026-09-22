document.addEventListener('DOMContentLoaded', () => {
    const tipoUsuario = "chef";

    const modal = document.getElementById('modal-login-overlay');
    const formLogin = document.getElementById('form-login');
    const btnAbrirLogin = document.getElementById('btn_login');
    const btnFecharModal = document.getElementById('btn-fechar-modal');
    const btnCancelarModal = document.getElementById('btn-cancelar-modal');

    if (btnAbrirLogin && formLogin && modal) {
        btnAbrirLogin.addEventListener('click', () => {
            formLogin.reset(); 
            modal.classList.add('ativo');
        });
    }

    const fecharModalLogin = () => {
        if (modal) modal.classList.remove('ativo');
    };

    if (btnFecharModal) btnFecharModal.addEventListener('click', fecharModalLogin);
    if (btnCancelarModal) btnCancelarModal.addEventListener('click', fecharModalLogin);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) fecharModalLogin();
        });
    }

    const btnVerPerfil = document.getElementById('btn_verperfil');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const btnFecharSidebar = document.getElementById('btnFecharSidebar');
    const btnSuasReceitas = document.getElementById('btnSuasReceitas');

    if (btnVerPerfil && sidebarMenu) {
        if (tipoUsuario === "comum") {
            btnVerPerfil.disabled = true;
            btnVerPerfil.style.cursor = "not-allowed";
            btnVerPerfil.style.opacity = "0.6";
        } else if (tipoUsuario === "chef") {
            btnVerPerfil.disabled = false;
            btnVerPerfil.addEventListener('click', (e) => {
                e.preventDefault();
                sidebarMenu.classList.add('ativo');
            });
        }
    }

    if (btnFecharSidebar && sidebarMenu) {
        btnFecharSidebar.addEventListener('click', () => {
            sidebarMenu.classList.remove('ativo');
        });
    }

    const cards = document.querySelectorAll('.mural .card');

    if (btnSuasReceitas) {
        btnSuasReceitas.addEventListener('click', () => {
            cards.forEach(card => {
                const textoTooltip = card.querySelector('.tooltip')?.textContent.toLowerCase() || "";
                if (textoTooltip.includes("@chef1")) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            window.location.href = "index.html";
        });
    }

    const chefSearch = document.getElementById('chefSearch');
    const btnSearch = document.getElementById('btnSearch');
    const searchError = document.getElementById('searchError');

    if (btnSearch && chefSearch) {
        btnSearch.addEventListener('click', () => {
            const termoBusca = chefSearch.value.trim().toLowerCase();
            let encontrouChef = false;

            if (termoBusca === "") {
                if (searchError) searchError.textContent = "";
                cards.forEach(card => card.style.display = "block");
                return;
            }

            cards.forEach(card => {
                const textoTooltip = card.querySelector('.tooltip')?.textContent.toLowerCase() || "";
                if (textoTooltip.includes("@" + termoBusca)) {
                    card.style.display = "block";
                    encontrouChef = true;
                } else {
                    card.style.display = "none";
                }
            });

            if (searchError) {
                if (!encontrouChef) {
                    searchError.textContent = "Chef não encontrado";
                } else {
                    searchError.textContent = "";
                }
            }
        });
    }

    const estrelas = document.querySelectorAll('.c .curt');

    estrelas.forEach(estrela => {
        estrela.style.cursor = 'pointer';

        let jaFavoritou = false;
        let valorInicial = parseInt(estrela.closest('.c').querySelector('.qnt p').textContent, 10);
        
        if (valorInicial > 0) {
            jaFavoritou = true;
            estrela.classList.add('favoritado');
        }

        estrela.addEventListener('click', (e) => {
            const containerC = e.target.closest('.c');
            if (!containerC) return;
            
            const pQuantidade = containerC.querySelector('.qnt p');
            if (!pQuantidade) return;
            
            let quantidadeAtual = parseInt(pQuantidade.textContent, 10);

            if (jaFavoritou) {
                pQuantidade.textContent = quantidadeAtual - 1;
                estrela.classList.remove('favoritado');
                jaFavoritou = false;
            } else {
                pQuantidade.textContent = quantidadeAtual + 1;
                estrela.classList.add('favoritado');
                jaFavoritou = true;
            }
        });
    });

    const recipeForm = document.getElementById('recipeForm');
    const recipeTitle = document.getElementById('recipeTitle');
    const recipeOrigin = document.getElementById('recipeOrigin');
    const recipeImage = document.getElementById('recipeImage');
    const fileNameDisplay = document.getElementById('fileName');

    const titleError = document.getElementById('titleError');
    const originError = document.getElementById('originError');
    const imageError = document.getElementById('imageError');

    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

    if (recipeImage && fileNameDisplay && imageError) {
        recipeImage.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                fileNameDisplay.textContent = file.name;
                validateImageField(file);
            } else {
                fileNameDisplay.textContent = "Nenhum arquivo escolhido";
                imageError.textContent = "A imagem da receita é obrigatória.";
            }
        });
    }

    function validateImageField(file) {
        if (!imageError) return false;
        if (!file) {
            imageError.textContent = "A imagem da receita é obrigatória.";
            return false;
        }
        const fileExtension = file.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            imageError.textContent = "Formatos permitidos: JPG, JPEG, PNG, GIF e WEBP.";
            return false;
        }
        imageError.textContent = "";
        return true;
    }

    if (recipeForm && recipeTitle && recipeOrigin && recipeImage && fileNameDisplay) {
        recipeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;

            if (recipeTitle.value.trim() === "") {
                if (titleError) titleError.textContent = "O título da receita é obrigatório.";
                isValid = false;
            } else {
                if (titleError) titleError.textContent = "";
            }

            if (recipeOrigin.value.trim() === "") {
                if (originError) originError.textContent = "A origem da receita é obrigatória.";
                isValid = false;
            } else {
                if (originError) originError.textContent = "";
            }

            const file = recipeImage.files[0];
            if (!validateImageField(file)) {
                isValid = false;
            }

            if (isValid) {
                alert("Receita cadastrada com sucesso!");
                recipeForm.reset();
                fileNameDisplay.textContent = "Nenhum arquivo escolhido";
            }
        });
    }
});
