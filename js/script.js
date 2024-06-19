document.addEventListener("DOMContentLoaded", function() {
    
    const menuButton = document.querySelector('.logo_nav');

    const dropdownContent = document.querySelector('.dropdown-content');

    menuButton.addEventListener("click", function() {
        const isVisible = dropdownContent.classList.contains("show");

        if (isVisible) {
            dropdownContent.classList.remove("show");
        } else {
            dropdownContent.classList.add("show");
        }

        document.addEventListener('click', function(event) {
            if (!menuButton.contains(event.target) && !dropdownContent.contains(event.target)) {
                dropdownContent.classList.remove('show');
            }
        });
    });
    });
