document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form values
        const identifier = document.getElementById('email').value; // This can be username or email
        const password = document.getElementById('password').value;

        try {
            const user = await getUser(identifier);
            if (user) {
                if (user.password === password) {
                    alert('Login successful!');
                    window.location.href = 'index.html';
                } else {
                    alert('Incorrect password!');
                }
            } else {
                alert('User not found!');
            }
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    });
});
