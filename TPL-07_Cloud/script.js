// 1. KHỞI TẠO AOS
AOS.init({
    duration: 1000, 
    once: false,
    offset: 50,
});

// 2. TỰ ĐỘNG MỞ MÂY
window.onload = function() {
    const curtain = document.getElementById('curtain-overlay');
    const music = document.getElementById('bg-music');
    const musicIcon = document.querySelector('.music-control');
    
    // Đợi 500ms cho trang load xong hẳn mới bắt đầu
    setTimeout(() => {
        curtain.classList.add('open-curtain');
        
        // Thử phát nhạc
        music.play().then(() => {
            musicIcon.classList.add('music-playing');
        }).catch(() => {
            console.log("Cần chạm để phát nhạc");
        });

        // Ẩn rèm hoàn toàn sau 4 giây
        setTimeout(() => {
            curtain.style.display = 'none';
            // QUAN TRỌNG: Làm mới lại tính toán vị trí hiệu ứng sau khi rèm tắt
            AOS.refresh(); 
        }, 4000);
        
    }, 500);
};

// ... Các phần code khác (Toggle nhạc, Popup...) giữ nguyên không đổi ...
function toggleMusic() {
    const music = document.getElementById('bg-music');
    const musicIcon = document.querySelector('.music-control');
    if (music.paused) {
        music.play();
        musicIcon.classList.add('music-playing');
    } else {
        music.pause();
        musicIcon.classList.remove('music-playing');
    }
}

function openGift() { document.getElementById('gift-modal').style.display = 'flex'; }
function openRSVP() { document.getElementById('rsvp-modal').style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }
window.onclick = function(e) { if(e.target.classList.contains('modal')) e.target.style.display="none"; }

function copyBankNumber(txt) {
    navigator.clipboard.writeText(txt).then(() => alert("Đã sao chép: " + txt));
}

function submitRSVP(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerText = "Đang gửi...";
    setTimeout(() => {
        alert("Cảm ơn! Lời chúc đã được gửi.");
        closeModal('rsvp-modal');
        btn.innerText = "Gửi đi";
        e.target.reset();
    }, 1500);
}