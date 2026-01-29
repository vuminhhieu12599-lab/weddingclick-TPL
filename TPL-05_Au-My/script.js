// 1. Khởi tạo Animation
// Tăng duration từ 1000ms lên 1200ms cho mượt hơn
AOS.init({
    duration: 1200, // Thời gian chạy hiệu ứng chậm lại một chút
    once: true,     // Chỉ chạy 1 lần
    offset: 60,     // Bắt đầu chạy sớm hơn một chút khi cuộn
    easing: 'ease-out-cubic' // Kiểu chuyển động mượt mà, kết thúc chậm
});

// 2. Xử lý Nhạc nền (Giữ nguyên)
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;
musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
        musicBtn.innerHTML = '<i class="fas fa-music text-xs"></i>';
    } else {
        bgMusic.play();
        musicBtn.classList.add('playing');
        musicBtn.innerHTML = '<i class="fas fa-pause text-xs"></i>';
    }
    isPlaying = !isPlaying;
});

// 3. Xử lý Sao chép STK (Giữ nguyên)
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Đã sao chép số tài khoản: ' + text);
    }).catch(err => { console.error('Lỗi sao chép: ', err); });
}

// 4. Xử lý Form Submit (Giữ nguyên demo)
document.getElementById('weddingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerText;
    btn.innerText = "Đang gửi..."; btn.disabled = true;
    setTimeout(() => {
        alert('Cảm ơn bạn đã gửi xác nhận!');
        btn.innerText = originalText; btn.disabled = false; this.reset();
    }, 1000);
});

/* --- XỬ LÝ POPUP QUÀ MỪNG (CODE MỚI) --- */
const modal = document.getElementById('giftModal');
const overlay = document.getElementById('giftModalOverlay');
const openBtn = document.getElementById('openGiftModalBtn');
const closeBtn = document.getElementById('closeGiftModalBtn');

// Hàm mở popup
function openModal() {
    overlay.classList.add('overlay-active');
    // Delay nhẹ để hiệu ứng scale trông mượt hơn
    setTimeout(() => {
        modal.classList.add('modal-active');
    }, 10);
}

// Hàm đóng popup
function closeModal() {
    modal.classList.remove('modal-active');
    // Đợi popup ẩn xong mới ẩn lớp nền
    setTimeout(() => {
        overlay.classList.remove('overlay-active');
    }, 300);
}

// Gán sự kiện click
openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal); // Bấm ra ngoài cũng đóng