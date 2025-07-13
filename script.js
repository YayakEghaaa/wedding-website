// script.js

const highBtn = document.getElementById('highContrast');
const textSizeBtn = document.getElementById('textSize');
const voiceBtn = document.getElementById('voiceControl');

highBtn.onclick = () => {
  document.body.classList.toggle('high-contrast');
};

let fontSize = 1;
textSizeBtn.onclick = () => {
  fontSize = fontSize >= 1.5 ? 1 : fontSize + 0.1;
  document.body.style.fontSize = fontSize + 'rem';
};

if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'id-ID';
  recognition.continuous = false;
  recognition.interimResults = false;

  voiceBtn.addEventListener('click', () => {
    recognition.start();
    voiceBtn.innerHTML = '<i class="fas fa-microphone"></i> Mendengarkan...';
  });

  recognition.onresult = function (event) {
    const command = event.results[0][0].transcript.toLowerCase();
    if (command.includes('home')) document.getElementById('navHome').click();
    else if (command.includes('tentang') || command.includes('about')) document.getElementById('navAbout').click();
    else if (command.includes('galeri') || command.includes('gallery')) document.getElementById('navGallery').click();
    else if (command.includes('layanan') || command.includes('services')) document.getElementById('navServices').click();
    else if (command.includes('kontak') || command.includes('contact')) document.getElementById('navContact').click();
  };

  recognition.onend = () => {
    voiceBtn.innerHTML = '<i class="fas fa-microphone"></i> Kontrol Suara';
  };
} else {
  voiceBtn.disabled = true;
  voiceBtn.title = 'Browser tidak mendukung kontrol suara';
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
