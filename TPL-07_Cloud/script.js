// 1. KHỞI TẠO AOS (Hiệu ứng khi cuộn)
AOS.init({
    duration: 1200, // Thời gian hiệu ứng 1.2s
    once: false,    // Lặp lại khi cuộn lên xuống
});

// 2. TỰ ĐỘNG MỞ RÈM KHI TẢI TRANG
window.onload = function() {
    const curtain = document.getElementById('curtain-overlay');
    const music = document.getElementById('bg-music');
    const musicIcon = document.querySelector('.music-control');
    
    // Đợi 300ms (rất nhanh) để trang ổn định rồi mở
    setTimeout(() => {
        // Thêm class này để kích hoạt CSS: Nền trong suốt + Mây trôi
        curtain.classList.add('open-curtain');
        
        // Thử phát nhạc tự động
        music.play().then(() => {
            musicIcon.classList.add('music-playing');
        }).catch(() => {
            console.log("Trình duyệt chặn nhạc tự động, cần click thủ công");
        });

        // Sau 3 giây (khi mây đã trôi khuất), ẩn hoàn toàn div rèm
        setTimeout(() => {
            curtain.style.display = 'none';
        }, 3000);
        
    }, 300);
};

// 3. NÚT NHẠC
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

// 4. LOGIC POPUP (MODAL)
function openGift() {
    document.getElementById('gift-modal').style.display = 'flex';
}

function openRSVP() {
    document.getElementById('rsvp-modal').style.display = 'flex';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Click ra ngoài thì đóng popup
window.onclick = function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = "none";
    }
}

// 5. COPY SỐ TÀI KHOẢN
function copyBankNumber(txt) {
    navigator.clipboard.writeText(txt).then(() => {
        alert("Đã sao chép: " + txt);
    }).catch(() => {
        alert("Lỗi copy, vui lòng nhập tay: " + txt);
    });
}

// 6. GỬI LỜI CHÚC (DEMO)
function submitRSVP(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    const originalText = btn.innerText;
    
    btn.innerText = "Đang gửi...";
    btn.disabled = true;
    
    // Giả lập gửi mất 1.5s
    setTimeout(() => {
        alert("Cảm ơn! Lời chúc của bạn đã được gửi đi.");
        closeModal('rsvp-modal');
        e.target.reset();
        btn.innerText = originalText;
        btn.disabled = false;
    }, 1500);
}