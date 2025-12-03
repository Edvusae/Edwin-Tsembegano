document.getElementById('togglePassword').addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const eyeIcon = document.getElementById('eyeIcon');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                eyeIcon.classList.remove('fa-eye');
                eyeIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                eyeIcon.classList.remove('fa-eye-slash');
                eyeIcon.classList.add('fa-eye');
            }
        });

        // Handle Registration Form
        document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const messageDiv = document.getElementById('registerMessage');
            const registerBtn = document.getElementById('registerBtn');

            // Clear previous messages
            messageDiv.classList.add('hidden');

            // Validate passwords match
            if (password !== confirmPassword) {
                messageDiv.className = 'bg-red-50 border border-red-300 text-red-700 p-4 rounded-lg text-sm';
                messageDiv.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i>Passwords do not match!';
                messageDiv.classList.remove('hidden');
                return;
            }

            // Show loading state
            registerBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Creating Account...';
            registerBtn.disabled = true;

            // Simulate API registration
            setTimeout(() => {
                // Collect form data
                const userData = {
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    address: document.getElementById('address').value,
                    city: document.getElementById('city').value,
                    state: document.getElementById('state').value,
                    zipCode: document.getElementById('zipCode').value,
                    marketingOptIn: document.getElementById('marketing').checked,
                    registeredAt: new Date().toISOString()
                };

                // Show success message
                messageDiv.className = 'bg-green-50 border border-green-300 text-green-700 p-4 rounded-lg text-sm';
                messageDiv.innerHTML = '<i class="fas fa-check-circle mr-2"></i>Account created successfully! Redirecting to login...';
                messageDiv.classList.remove('hidden');

                // Store data (in real app, this would be sent to server)
                console.log('User registered:', userData);

                // Redirect to login after 2 seconds
                setTimeout(() => {
                    window.location.href = 'customer-login.html';
                }, 2000);

            }, 1500);
        });

        // Format phone number as user types
        document.getElementById('phone').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = '(' + value;
                } else if (value.length <= 6) {
                    value = '(' + value.slice(0, 3) + ') ' + value.slice(3);
                } else {
                    value = '(' + value.slice(0, 3) + ') ' + value.slice(3, 6) + '-' + value.slice(6, 10);
                }
            }
            e.target.value = value;
        });

        // Validate zip code
        document.getElementById('zipCode').addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 5);
        });