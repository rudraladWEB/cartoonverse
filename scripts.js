// Header animation (existing)
const phrases = [
    "Step into the World of Cartoon Memories ✨",
    "Relive Your Favourite Childhood Classics 🌟",
    "Where Timeless Cartoons and Memories Meet ⭐",
    "Feel the Magic of Your Cartoon Past 🎬"
];

const header = document.getElementById('header');
let phraseIndex = 0;

function typePhrase(text, i = 0) {
    if (i < text.length) {
        header.textContent = text.slice(0, i + 1);
        setTimeout(() => typePhrase(text, i + 1), 120);
    } else {
        setTimeout(() => {
            phraseIndex = (phraseIndex + 1) % phrases.length;
            header.textContent = "";
            typePhrase(phrases[phraseIndex]);
        }, 2500);
    }
}

// Welcome audio function
function playWelcomeAudio() {
    const audio = document.getElementById('welcomeAudio');
    audio.play().catch(e => {
        console.log('Audio play failed:', e);
    });
}

// Start animations on load
window.onload = () => {
    typePhrase(phrases[phraseIndex]);
};
// ============ INITIALIZE ON PAGE LOAD ============
document.addEventListener('DOMContentLoaded', function() {
  
  // ============ SLIDESHOW (Home Page Only) ============
  const slides = document.getElementsByClassName("mySlides");
  if (slides.length > 0) {
    let slideIndex = 1;
    showSlides(slideIndex);
    
    // Auto slide every 5 seconds
    setInterval(function(){
      slideIndex++;
      showSlides(slideIndex);
    }, 5000);
  }
  
  function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    for (let j = 0; j < dots.length; j++) {
      dots[j].className = dots[j].className.replace(" active", "");
    }
    if (slides[n - 1]) {
      slides[n - 1].style.display = "block";  
      dots[n - 1].className += " active";
    }
  }
  
  // ============ HELPER FUNCTION - UPDATE DISPLAY ============
  function updateCardDisplay() {
    const cards = document.querySelectorAll('.card');
    const noResultsDiv = document.getElementById('noResults');
    const countSpan = document.getElementById('cartoonCount');
    
    let visibleCount = 0;
    
    cards.forEach(card => {
      if (card.style.display === 'flex') {
        visibleCount++;
      }
    });
    
    // Show/hide no results message
    if (visibleCount === 0) {
      noResultsDiv.style.display = 'block';
    } else {
      noResultsDiv.style.display = 'none';
    }
    
    // Update count
    if (countSpan) {
      countSpan.textContent = visibleCount;
    }
  }
  
  // ============ SEARCH FUNCTIONALITY ============
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keyup', function(e) {
      const searchTerm = this.value.toLowerCase();
      
      document.querySelectorAll('.card').forEach(card => {
        const name = card.querySelector('p').textContent.toLowerCase();
        const isMatch = name.includes(searchTerm);
        card.style.display = isMatch ? 'flex' : 'none';
      });
      
      updateCardDisplay();
    });
  }
  
  // ============ FILTER BUTTONS ============
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        const selectedCategory = this.dataset.category;
        const cards = document.querySelectorAll('.card');
        
        // Show/hide cards based on category
        cards.forEach(card => {
          const cardCategory = card.dataset.category;
          
          if (selectedCategory === 'all') {
            card.style.display = 'flex';
          } else if (cardCategory === selectedCategory) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
        
        // Update active button styling
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Update display
        updateCardDisplay();
      });
    });
  }
  
  // ============ SCROLL BUTTON ============
  const scrollBtn = document.getElementById('scrollBtn');
  if (scrollBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        scrollBtn.style.display = 'flex';
      } else {
        scrollBtn.style.display = 'none';
      }
    });
    
    scrollBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
});

// ============ SLIDESHOW CONTROLS (Outside DOMContentLoaded for onclick handlers) ============
function plusSlides(n) {
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");
  
  let currentIndex = 0;
  for (let i = 0; i < slides.length; i++) {
    if (slides[i].style.display === "block") {
      currentIndex = i;
      break;
    }
  }
  
  let newIndex = currentIndex + n;
  if (newIndex >= slides.length) newIndex = 0;
  if (newIndex < 0) newIndex = slides.length - 1;
  
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let j = 0; j < dots.length; j++) {
    dots[j].className = dots[j].className.replace(" active", "");
  }
  
  slides[newIndex].style.display = "block";
  dots[newIndex].className += " active";
}

function currentSlide(n) {
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");
  
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let j = 0; j < dots.length; j++) {
    dots[j].className = dots[j].className.replace(" active", "");
  }
  
  slides[n - 1].style.display = "block";
  dots[n - 1].className += " active";
}
// ============ CARD HOVER SOUND ============
document.addEventListener('DOMContentLoaded', function() {
  
  const cardHoverSound = document.getElementById('cardHoverSound');
  console.log('Card hover sound element:', cardHoverSound); // Debug
  
  if (cardHoverSound) {
    cardHoverSound.volume = 0.4;
    console.log('Sound ready, volume set to:', cardHoverSound.volume);
    
    const cards = document.querySelectorAll('.card');
    console.log('Found', cards.length, 'cards');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        try {
          cardHoverSound.currentTime = 0;
          const playPromise = cardHoverSound.play();
          
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.log('Sound play error:', error);
            });
          }
        } catch (e) {
          console.log('Error playing sound:', e);
        }
      });
    });
  } else {
    console.log('Card hover sound element NOT found!');
  }
  
});
// ============ ANIMATED POPUP FUNCTIONS ============
function showPopup(message = "Success!") {
  const popup = document.getElementById('successPopup');
  const messageEl = document.getElementById('popupMessage');
  
  if (messageEl) messageEl.textContent = message;
  if (popup) {
    popup.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scroll
    setTimeout(() => popup.querySelector('.popup-content')?.classList.add('show-glow'), 500);
  }
}

function closePopup() {
  const popup = document.getElementById('successPopup');
  if (popup) {
    popup.classList.remove('show');
    document.body.style.overflow = ''; // Restore scroll
  }
}

// Close on outside click
document.addEventListener('click', function(e) {
  const popup = document.getElementById('successPopup');
  if (popup && popup.classList.contains('show') && !e.target.closest('.popup-content')) {
    closePopup();
  }
});

// ESC key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closePopup();
  }
});

// ============ FORMS ============
document.addEventListener('DOMContentLoaded', function() {
  
  // FEEDBACK FORM
  const feedbackForm = document.getElementById('feedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const requiredFields = feedbackForm.querySelectorAll('[required]');
      let allFilled = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          allFilled = false;
        }
      });
      
      if (!allFilled) {
        showPopup('⚠️ Please fill all required fields (*) correctly!');
      } else {
        showPopup('🎉 Thank you for your feedback! We appreciate it! 💖');
        feedbackForm.reset();
      }
    });
  }
  
  // CONTACT FORM
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const requiredFields = contactForm.querySelectorAll('[required]');
      let allFilled = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          allFilled = false;
        }
      });
      
      if (!allFilled) {
        showPopup('⚠️ Please fill all required fields (*) correctly!');
      } else {
        showPopup('📧 Message sent successfully! We\'ll get back to you soon! 🚀');
        contactForm.reset();
      }
    });
  }
});
// ============ STAR RATING - FIXED ============
const ratingStars = document.getElementById('ratingStars');
const ratingValue = document.getElementById('ratingValue');

if (ratingStars && ratingValue) {
  const stars = ratingStars.querySelectorAll('.star');
  
  // Click handler
  stars.forEach(star => {
    star.addEventListener('click', function() {
      const value = Number(this.dataset.value);
      ratingValue.value = value;
      
      // Update active stars
      stars.forEach((s, index) => {
        if (index < value) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });
    });
  });
  
  // Hover effect
  stars.forEach(star => {
    star.addEventListener('mouseenter', function() {
      const value = Number(this.dataset.value);
      stars.forEach((s, index) => {
        if (index < value) {
          s.style.opacity = '1';
        } else {
          s.style.opacity = '0.4';
        }
      });
    });
  });
  
  // Reset hover
  ratingStars.addEventListener('mouseleave', function() {
    stars.forEach(star => {
      if (!star.classList.contains('active')) {
        star.style.opacity = '0.6';
      }
    });
  });
}
// ============ SHINCHAN CHARACTER SLIDER ============
let charSlideIndex = 1;

function showCharSlides(n) {
  let i;
  let slides = document.getElementsByClassName("charSlide");
  let dots = document.getElementsByClassName("charDot");
  
  if (n > slides.length) {charSlideIndex = 1}    
  if (n < 1) {charSlideIndex = slides.length}
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  slides[charSlideIndex-1].style.display = "block";  
  dots[charSlideIndex-1].className += " active";
}

function currentCharSlide(n) {
  showCharSlides(charSlideIndex = n);
}

// Initialize and auto-slide
document.addEventListener('DOMContentLoaded', function() {
  showCharSlides(charSlideIndex);
  
  // Auto-slide every 4 seconds
  setInterval(function(){
    charSlideIndex++;
    showCharSlides(charSlideIndex);
  }, 4000);
});
// ============ AUDIO TAG TITLE SONG ============
document.addEventListener('DOMContentLoaded', function() {
    const musicBtn = document.getElementById('playTitleSong');
    const audio = document.getElementById('titleSong');
    
    if (musicBtn && audio) {
        musicBtn.addEventListener('click', function() {
            if (audio.paused) {
                audio.play().then(() => {
                    musicBtn.textContent = '⏸️ Stop Song';
                    musicBtn.classList.add('playing');
                }).catch(err => {
                    console.log('Audio play failed:', err);
                });
            } else {
                audio.pause();
                musicBtn.textContent = '🎵 Play Title Song';
                musicBtn.classList.remove('playing');
            }
        });
        
        // Volume control (50% default)
        audio.volume = 0.5;
        
        // Auto-pause when leaving page
        window.addEventListener('beforeunload', function() {
            audio.pause();
        });
    }
});
