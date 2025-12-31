// Target Date: Jan 1, 2026, 02:28:00
const startDate = new Date("2026-01-01T02:28:00").getTime();

function updateTimer() {
    const now = new Date().getTime();
    const distance = now - startDate; // Calculate time elapsed

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = d.toString().padStart(2, '0');
    document.getElementById("hours").innerText = h.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = m.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = s.toString().padStart(2, '0');
}

setInterval(updateTimer, 1000);
updateTimer();

// PWA Install Logic
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('installBtn').style.display = 'block';
});

document.getElementById('installBtn').addEventListener('click', () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') document.getElementById('installBtn').style.display = 'none';
    });
});
