// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(reg => {
            console.log('Service Worker registered:', reg);
            document.getElementById('status').textContent = '✅ App ready to install';
        })
        .catch(err => {
            console.error('Service Worker registration failed:', err);
            document.getElementById('status').textContent = '⚠️ Online only mode';
        });
} else {
    document.getElementById('status').textContent = '⚠️ Browser not supported';
}

// Target Start Date: Jan 1, 2026, 02:48:00 IST
const startDate = new Date("2026-01-01T02:48:00+05:30").getTime();

function updateTimer() {
    const now = new Date().getTime();
    const distance = now - startDate; // Time elapsed since start date

    if (distance < 0) {
        // If the start time hasn't arrived yet
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        return;
    }

    // Calculate time components
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update DOM with padded values
    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
}

// Update timer every second
setInterval(updateTimer, 1000);
updateTimer(); // Initial call

// PWA Install Prompt Logic
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    const installBtn = document.getElementById('installBtn');
    installBtn.style.display = 'block';
});

document.getElementById('installBtn').addEventListener('click', async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
        document.getElementById('installBtn').style.display = 'none';
        document.getElementById('status').textContent = '✅ App installed successfully!';
    }
    
    deferredPrompt = null;
});

// Hide install button if already installed
window.addEventListener('appinstalled', () => {
    document.getElementById('installBtn').style.display = 'none';
    document.getElementById('status').textContent = '✅ App installed!';
});
