document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        const data = await response.json();
        alert("Login bem-sucedido!");
        localStorage.setItem('token', data.token);
        // Redirecionar, se necessário
        window.location.href = 'index.html';
    } else {
        const errorMessage = await response.json();
        alert("Erro ao fazer login: " + errorMessage);
    }
});

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    if (password !== confirmPassword) {
        alert("As senhas não correspondem.");
        return;
    }

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
        alert("Registro bem-sucedido!");
        // Redirecionar ou limpar o formulário
    window.location.href = 'index.html';
    } else {
        const errorMessage = await response.json();
        alert("Erro ao registrar: " + errorMessage);
    }
});
