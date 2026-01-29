// CẤU HÌNH NGÀY CƯỚI (Bạn chỉ cần sửa ngày ở đây cho mỗi khách hàng)
// Định dạng: "YYYY-MM-DDTHH:MM:SS"
const weddingDate = new Date("2025-10-12T13:00:00").getTime(); // [cite: 19, 22]

// 1. Chức năng Đếm ngược
const countdown = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("countdown").innerHTML = "Đám cưới đã diễn ra!";
    }
}, 1000);

// 2. Chức năng ẩn/hiện QR Code
function toggleQR() {
    const popup = document.getElementById('qr-popup');
    popup.classList.toggle('hidden');
}

// 3. Xử lý Form (Chỉ là demo, thực tế cần kết nối Google Sheets)
document.getElementById('wedding-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Cảm ơn bạn! Lời chúc đã được gửi đi (Demo).");
});