document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
        emailInput.value = savedEmail;
    }

    loginForm.addEventListener('submit', function (event) {
        if (!this.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault(); 
            
            const email = emailInput.value;
            const password = passwordInput.value;

            fetch('http://localhost:3000/usuario/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    senha: password
                })
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.erro || 'Falha no login'); });
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userPassword', password);

                alert("Login realizado com sucesso!");
                window.location.href = 'pagina1.html';
            })
            .catch(error => {
                alert(error.message);
            });
        }
        this.classList.add('was-validated');
    }, false);
});
