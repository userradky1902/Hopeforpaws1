// Global variables
let selectedDonationItems = [];
let totalDonationAmount = 0;
let currentSection = 'hero';

// Section messages for dog mascot
const sectionMessages = {
    hero: "Welcome! Let's find your perfect companion! 🐾",
    about: "We're making a difference, one pet at a time! ❤️",
    pets: "Look at all these amazing friends waiting for homes! 🏠",
    donation: "Every donation helps save a life! 💝",
    success: "See how donations help pets like me! ⭐",
    contact: "Ready to help? Let's get in touch! 📞"
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavbar();
    initializeMascot();
});

// Initialize fade-in animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
}

// Initialize navbar scroll effects
function initializeNavbar() {
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Initialize dog mascot
function initializeMascot() {
    window.addEventListener('scroll', function() {
        const sections = ['hero', 'about', 'pets', 'donation', 'success', 'contact'];
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
                const { offsetTop, offsetHeight } = element;
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    if (currentSection !== section) {
                        currentSection = section;
                        showMascotMessage(sectionMessages[section]);
                        animateMascot();
                    }
                    break;
                }
            }
        }
    });
}

// Show mascot message
function showMascotMessage(message = null) {
    const speechBubble = document.getElementById('speechBubble');
    const displayMessage = message || sectionMessages[currentSection];
    
    speechBubble.textContent = displayMessage;
    speechBubble.classList.add('show');
    
    setTimeout(() => {
        speechBubble.classList.remove('show');
    }, 3000);
}

// Animate mascot
function animateMascot() {
    const mascot = document.querySelector('.dog-mascot');
    mascot.classList.add('moving');
    
    setTimeout(() => {
        mascot.classList.remove('moving');
    }, 800);
}

// Contact Modal Functions
function openContactModal() {
    document.getElementById('contactModal').style.display = 'block';
}

function closeContactModal() {
    document.getElementById('contactModal').style.display = 'none';
}

// Partner Modal Functions
function openPartnerModal() {
    document.getElementById("partnerModal").style.display = "block";
}

function closePartnerModal() {
    document.getElementById("partnerModal").style.display = "none";
}

// Adopt Modal Functions
function openAdoptModal(petName) {
    document.getElementById("adoptPetName").textContent = `Adopt ${petName}`;
    document.getElementById("adoptPetNameSpan").textContent = petName;
    document.getElementById("adoptModal").style.display = "block";
}

function closeAdoptModal() {
    document.getElementById("adoptModal").style.display = "none";
}

// Volunteer Modal Functions
function openVolunteerModal() {
    document.getElementById("volunteerModal").style.display = "block";
}

function closeVolunteerModal() {
    document.getElementById("volunteerModal").style.display = "none";
}

// Close modal when clicking outside
window.onclick = function(event) {
    const contactModal = document.getElementById("contactModal");
    const partnerModal = document.getElementById("partnerModal");
    const adoptModal = document.getElementById("adoptModal");
    const volunteerModal = document.getElementById("volunteerModal");
    
    if (event.target === contactModal) {
        closeContactModal();
    }
    if (event.target === partnerModal) {
        closePartnerModal();
    }
    if (event.target === adoptModal) {
        closeAdoptModal();
    }
    if (event.target === volunteerModal) {
        closeVolunteerModal();
    }
}

// Send message from contact modal
function sendMessage(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Show success message
    showSuccessAlert("Thank you for your message! We have received your inquiry and will get back to you within 24 hours. 📧");
    form.reset();
    closeContactModal();
}

// Submit partner application
function submitPartnerApplication(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Show success message
    showSuccessAlert("Thank you for your partnership application! 🤝 We are excited about the possibility of collaborating with you. Our partnership team will review your application and contact you within 3-5 business days.");
    form.reset();
    closePartnerModal();
}

// Submit adoption application
function submitAdoptionApplication(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const petName = document.getElementById("adoptPetNameSpan").textContent;
    
    // Show success message
    showSuccessAlert(`🎉 Congratulations! Your application to adopt ${petName} has been submitted! Our adoption counselor will contact you within 1-2 business days to discuss the next steps and schedule a meet-and-greet.`);
    form.reset();
    closeAdoptModal();
}

// Submit volunteer application
function submitVolunteerApplication(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Show success message
    showSuccessAlert("🌟 Thank you for your interest in volunteering! Your application has been submitted successfully. Our volunteer coordinator will contact you within 3-5 business days to discuss available opportunities and schedule an orientation session.");
    form.reset();
    closeVolunteerModal();
}

// Send contact form message
function sendContactMessage(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    
    // Show success message
    showSuccessAlert("Thank you for reaching out! 💌 Your message has been successfully submitted. We will respond to your inquiry within 24 hours.");
    form.reset();
}

// Enhanced alert function with better styling
function showSuccessAlert(message) {
    // Create custom alert overlay
    const alertOverlay = document.createElement("div");
    alertOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        backdrop-filter: blur(5px);
    `;
    
    const alertBox = document.createElement("div");
    alertBox.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        max-width: 400px;
        text-align: center;
        border: 2px solid #ea580c;
    `;
    
    alertBox.innerHTML = `
        <div style="color: #ea580c; font-size: 3rem; margin-bottom: 1rem;">✅</div>
        <h3 style="color: #9a3412; margin-bottom: 1rem;">Success!</h3>
        <p style="color: #666; line-height: 1.6; margin-bottom: 1.5rem;">${message}</p>
        <button onclick="this.closest("div").remove()" style="
            background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
        ">OK</button>
    `;
    
    alertOverlay.appendChild(alertBox);
    document.body.appendChild(alertOverlay);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertOverlay.parentNode) {
            alertOverlay.remove();
        }
    }, 5000);
}

// Donation Functions
function toggleDonationItem(id, name, price) {
    const item = { id, name, price };
    const itemElement = document.querySelector(`[onclick*="${id}"]`);
    const existingIndex = selectedDonationItems.findIndex(selected => selected.id === id);
    
    if (existingIndex > -1) {
        // Remove item
        selectedDonationItems.splice(existingIndex, 1);
        itemElement.classList.remove('selected');
        itemElement.querySelector('.select-btn').textContent = 'Select';
    } else {
        // Add item
        selectedDonationItems.push(item);
        itemElement.classList.add('selected');
        itemElement.querySelector('.select-btn').textContent = 'Selected';
    }
    
    updateTotal();
}

function updateTotal() {
    const customAmount = parseFloat(document.getElementById('customAmount').value) || 0;
    const itemsTotal = selectedDonationItems.reduce((sum, item) => sum + item.price, 0);
    totalDonationAmount = itemsTotal + customAmount;
    
    updateDonationSummary();
}

function updateDonationSummary() {
    const summaryElement = document.getElementById('donationSummary');
    const selectedItemsElement = document.getElementById('selectedItems');
    const totalAmountElement = document.getElementById('totalAmount');
    const customAmount = parseFloat(document.getElementById('customAmount').value) || 0;
    
    if (selectedDonationItems.length > 0 || customAmount > 0) {
        summaryElement.style.display = 'block';
        
        // Update selected items list
        let itemsHTML = '';
        selectedDonationItems.forEach(item => {
            itemsHTML += `
                <div class="selected-item">
                    <span>${item.name}</span>
                    <span>₹${item.price}</span>
                </div>
            `;
        });
        
        if (customAmount > 0) {
            itemsHTML += `
                <div class="selected-item">
                    <span>Custom Donation</span>
                    <span>₹${customAmount}</span>
                </div>
            `;
        }
        
        selectedItemsElement.innerHTML = itemsHTML;
        totalAmountElement.textContent = `₹${totalDonationAmount}`;
    } else {
        summaryElement.style.display = 'none';
    }
}

function processDonation() {
    if (totalDonationAmount > 0) {
        // Collect donation data
        const donationData = {
            donor_name: 'Anonymous Donor', // You can add a form field for this
            donor_email: '', // You can add a form field for this
            donor_phone: '', // You can add a form field for this
            amount: totalDonationAmount,
            selected_items: selectedDonationItems,
            custom_amount: parseFloat(document.getElementById('customAmount').value) || 0,
            payment_method: 'online'
        };

        // Send to backend API
        fetch('/api/donations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(donationData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showSuccessAlert(`🎉 Thank you for your generous donation of ₹${totalDonationAmount}! Your contribution will directly help save animal lives. Transaction ID: ${data.transaction_id}. We will send you a donation receipt via email shortly.`);
                
                // Reset donation form
                selectedDonationItems = [];
                totalDonationAmount = 0;
                document.getElementById('customAmount').value = '';
                
                // Remove selected state from all items
                document.querySelectorAll('.donation-item').forEach(item => {
                    item.classList.remove('selected');
                    item.querySelector('.select-btn').textContent = 'Select';
                });
                
                updateDonationSummary();
            } else {
                showErrorAlert(`Error processing donation: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showErrorAlert('There was an error processing your donation. Please try again.');
        });
    } else {
        showErrorAlert('Please select donation items or enter a custom amount to proceed with your donation. 💝');
    }
}

// Error alert function
function showErrorAlert(message) {
    const alertOverlay = document.createElement('div');
    alertOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        backdrop-filter: blur(5px);
    `;
    
    const alertBox = document.createElement('div');
    alertBox.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        max-width: 400px;
        text-align: center;
        border: 2px solid #dc2626;
    `;
    
    alertBox.innerHTML = `
        <div style="color: #dc2626; font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
        <h3 style="color: #dc2626; margin-bottom: 1rem;">Attention!</h3>
        <p style="color: #666; line-height: 1.6; margin-bottom: 1.5rem;">${message}</p>
        <button onclick="this.closest('div').remove()" style="
            background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
        ">OK</button>
    `;
    
    alertOverlay.appendChild(alertBox);
    document.body.appendChild(alertOverlay);
    
    setTimeout(() => {
        if (alertOverlay.parentNode) {
            alertOverlay.remove();
        }
    }, 5000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Pet adoption functions
document.querySelectorAll(".adopt-btn").forEach(button => {
    button.addEventListener("click", function() {
        const petName = this.textContent.replace("Adopt ", "");
        openAdoptModal(petName);
    });
});

// Volunteer button
document.querySelectorAll('button').forEach(button => {
    if (button.textContent.includes('Volunteer')) {
        button.addEventListener('click', function() {
            openVolunteerModal();
        });
    }
});

// Get Directions button
document.querySelectorAll('button').forEach(button => {
    if (button.textContent.includes('Directions')) {
        button.addEventListener('click', function() {
            showSuccessAlert('🗺️ Opening directions to our shelter! Our address: 123 Pet Street, Animal City, India. We are open daily from 9 AM to 6 PM. Looking forward to seeing you!');
        });
    }
});

// Find Your Pet and Learn More buttons
document.querySelectorAll('button').forEach(button => {
    if (button.textContent.includes('Find Your Pet')) {
        button.addEventListener('click', function() {
            document.getElementById('pets').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            setTimeout(() => {
                showMascotMessage("Here are our amazing friends looking for homes! 🏠");
            }, 1000);
        });
    }
    
    if (button.textContent.includes('Learn More')) {
        button.addEventListener('click', function() {
            document.getElementById('about').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            setTimeout(() => {
                showMascotMessage("Learn about our mission to save lives! ❤️");
            }, 1000);
        });
    }
});

// Initialize mascot message on page load
setTimeout(() => {
    showMascotMessage();
}, 1000);

