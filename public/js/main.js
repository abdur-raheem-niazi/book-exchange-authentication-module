// Form validation
document.addEventListener('DOMContentLoaded', function() {
    // Get all forms with the class 'needs-validation'
    const forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        }, false);
    });

    // File input preview
    const fileInput = document.getElementById('profilePicture');
    const previewContainer = document.getElementById('imagePreview');
    
    if (fileInput && previewContainer) {
        fileInput.addEventListener('change', function() {
            const file = this.files[0];
            
            if (file) {
                const reader = new FileReader();
                
                reader.addEventListener('load', function() {
                    previewContainer.innerHTML = `<img src="${this.result}" class="w-32 h-32 object-cover rounded-full">`;
                });
                
                reader.readAsDataURL(file);
            }
        });
    }

    // Auto-hide alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert');
    
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => {
                alert.style.display = 'none';
            }, 500);
        }, 5000);
    });
}); 