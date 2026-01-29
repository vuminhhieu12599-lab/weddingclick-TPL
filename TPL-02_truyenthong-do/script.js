document.addEventListener("DOMContentLoaded", function() {
    
    // 1. ANIMATION SCROLL
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Giữ threshold thấp để hiệu ứng bắt đầu sớm nhưng diễn ra từ từ
    document.querySelectorAll('.scroll-anim').forEach(el => observer.observe(el));

    // 2. MỞ CỔNG & HERO
    const gateContainer = document.getElementById('welcome-gate');
    const heroElements = document.querySelectorAll('.hero-section [class*="anim-"]');
    
    setTimeout(() => {
        document.body.classList.add('open-gate');
        // Kích hoạt animation hero chậm hơn một chút để đợi cổng mở
        heroElements.forEach(el => el.classList.add('anim-active'));
        
        setTimeout(() => {
            if (gateContainer) gateContainer.style.display = 'none';
            playMusicBtn();
        }, 4500); // Tăng thời gian chờ cổng mở xong (khớp với CSS 4s)
    }, 1000);

    // 3. FORM GỬI LỜI CHÚC
    const scriptURL = 'HÃY_DÁN_LINK_GOOGLE_SCRIPT_CỦA_BẠN_VÀO_ĐÂY'; 
    const rsvpForm = document.getElementById('wedding-rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (scriptURL.includes('HÃY_DÁN')) { alert("Chưa cấu hình Script!"); return; }
            const btn = document.getElementById('btn-submit');
            const txt = btn.innerText;
            btn.innerText = "ĐANG GỬI..."; btn.disabled = true;
            fetch(scriptURL, { method: 'POST', body: new FormData(rsvpForm)})
                .then(() => { alert("Gửi thành công!"); rsvpForm.reset(); btn.innerText = txt; btn.disabled = false; })
                .catch(() => { alert("Lỗi gửi!"); btn.innerText = txt; btn.disabled = false; });
        });
    }

    // 4. POPUP QR
    const qrModal = document.getElementById('qr-modal');
    const btnShowQR = document.getElementById('btn-show-qr');
    const closeQr = document.querySelector('.close-qr');
    const btnDownload = document.querySelector('.btn-download');
    const qrImage = document.getElementById('qr-image-src');

    if (btnShowQR) {
        btnShowQR.addEventListener('click', () => {
            qrModal.classList.remove('hidden');
        });
    }

    if (btnDownload && qrImage) {
        btnDownload.addEventListener('click', async (e) => {
            e.preventDefault(); 
            try {
                const response = await fetch(qrImage.src);
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = "QR_Mung_Cuoi.jpg"; 
                document.body.appendChild(a);
                a.click(); 
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } catch (error) {
                console.error('Lỗi tải ảnh:', error);
                alert("Vui lòng nhấn giữ ảnh và chọn 'Lưu ảnh'.");
                window.open(qrImage.src, '_blank');
            }
        });
    }
    
    if (closeQr) closeQr.addEventListener('click', () => qrModal.classList.add('hidden'));
    window.addEventListener('click', (e) => { if(e.target == qrModal) qrModal.classList.add('hidden'); });

    window.copySTK = function() {
        var stk = document.getElementById("stk-text").innerText;
        navigator.clipboard.writeText(stk).then(() => alert("Đã copy STK!"), () => alert("Lỗi copy"));
    }

    // 5. NHẠC NỀN
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;
    function playMusicBtn() {
        if(bgMusic) {
            bgMusic.play().then(() => { isPlaying = true; musicBtn.classList.remove('music-paused'); musicBtn.classList.add('music-playing'); }).catch(e=>console.log("Autoplay blocked"));
        }
    }
    if(musicBtn) {
        musicBtn.addEventListener('click', () => {
            if(isPlaying) { bgMusic.pause(); musicBtn.classList.remove('music-playing'); musicBtn.classList.add('music-paused'); }
            else { bgMusic.play(); musicBtn.classList.remove('music-paused'); musicBtn.classList.add('music-playing'); }
            isPlaying = !isPlaying;
        });
    }
});