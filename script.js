// ==============================
// ACTIVE NAV BUTTON
// ==============================
const navButtons = document.querySelectorAll(".nav-links button");




function setActiveNav(sectionId) {
  navButtons.forEach(btn => btn.classList.remove("active-btn"));




  const activeButton = [...navButtons].find(btn =>
    btn.getAttribute("onclick").includes(sectionId)
  );




  if (activeButton) activeButton.classList.add("active-btn");
}




// Modify your showSection()
function showSection(sectionId) {
  const sections = document.querySelectorAll("section");
  sections.forEach(sec => sec.classList.remove("active"));


  const targetSection = document.getElementById(sectionId);
  targetSection.classList.add("active");


  setActiveNav(sectionId);


  const headerHeight = document.querySelector(".main-nav").offsetHeight;


  window.scrollTo({
    top: targetSection.offsetTop - headerHeight,
    behavior: "smooth"
  });
}




// ==============================
// SHRINK NAVBAR ON SCROLL
// ==============================
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".main-nav");
  if (window.scrollY > 50) nav.classList.add("shrink");
  else nav.classList.remove("shrink");
});




// ==============================
// MOBILE MENU TOGGLE
// ==============================
const menuIcon = document.getElementById("menuIcon");
const navbarMenu = document.getElementById("navbarMenu");
const overlay = document.getElementById("menu-overlay");




menuIcon.addEventListener("click", () => {
  navbarMenu.classList.toggle("show-menu");
  menuIcon.classList.toggle("open");
  overlay.classList.toggle("show");
});




// Close menu when clicking a button
navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    navbarMenu.classList.remove("show-menu");
    menuIcon.classList.remove("open");
    overlay.classList.remove("show");
  });
});




// Close menu when clicking outside
overlay.addEventListener("click", () => {
  navbarMenu.classList.remove("show-menu");
  menuIcon.classList.remove("open");
  overlay.classList.remove("show");
});




// Bio popup
function showBio(text) {
  const popup = document.getElementById('bio-popup');
  const bioText = document.getElementById('bio-text');
  bioText.textContent = text;
  popup.classList.add('show');
}




function closeBio() {
  document.getElementById('bio-popup').classList.remove('show');
}




// Load testimonials from localStorage
function loadTestimonials() {
  const container = document.getElementById('testimonial-list');
  const saved = JSON.parse(localStorage.getItem('testimonials')) || [];
  container.innerHTML = '';


  saved.forEach(t => {
    const div = document.createElement('div');
    div.classList.add('testimonial', 'fade-in');
    div.textContent = `"${t}" – Guest`;
    container.appendChild(div);
  });
}




// Add testimonial
function addTestimonial() {
  const input = document.getElementById('userTestimonial');
  const text = input.value.trim();
  if (!text) return alert('Please write something first!');
 
  const saved = JSON.parse(localStorage.getItem('testimonials')) || [];
  saved.push(text);
  localStorage.setItem('testimonials', JSON.stringify(saved));
 
  input.value = '';
  loadTestimonials();
}




// Initial load
window.onload = loadTestimonials;




// === GALLERY LIGHTBOX WITH NAVIGATION ===
const galleryImgs = document.querySelectorAll(".gallery-img");
const popup = document.getElementById("img-popup");
const popupImg = document.getElementById("popup-img");
const closePopup = document.getElementById("close-popup");
const prevBtn = document.getElementById("prev-img");
const nextBtn = document.getElementById("next-img");




let currentIndex = 0;






// Keyboard arrows for desktop users
document.addEventListener("keydown", (e) => {
  if (!popup.classList.contains("show")) return;




  if (e.key === "ArrowRight") {
    nextBtn.click();
  } else if (e.key === "ArrowLeft") {
    prevBtn.click();
  } else if (e.key === "Escape") {
    popup.classList.remove("show");
  }
});




// === FAQ INTERACTIVITY ===
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach(item => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
   
    // Optionally, close others when opening one
    faqItems.forEach(other => {
      if (other !== item) other.classList.remove("active");
    });
  });
});


// FLIP CARDS – CLICK SUPPORT
document.querySelectorAll(".flip-card").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("flipped");
  });
});


// Scroll reveal animation
const reveals = document.querySelectorAll(".reveal");


const revealOnScroll = () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;


    if (top < windowHeight - 100) {
      el.classList.add("show");
    }
  });
};


window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // run once on load
