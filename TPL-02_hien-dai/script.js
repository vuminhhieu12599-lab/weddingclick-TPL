// --- 1. MỞ THIỆP ---
function openInvite() {
    console.log("Đang mở thiệp...");
    const overlay = document.getElementById('intro-overlay');
    if (overlay) {
        overlay.classList.add('slide-up');
        setTimeout(() => { overlay.style.display = 'none'; }, 1500);
    }
    document.body.style.overflow = 'auto';
    
    // Phát nhạc
    const audio = document.getElementById('bgMusic');
    const btnMusic = document.getElementById('btnMusic');
    if (audio) {
        audio.play().then(() => {
            if (btnMusic) btnMusic.classList.add('playing');
        }).catch(err => console.log("Lỗi nhạc: " + err));
    }
}

// --- 2. BẬT TẮT NHẠC ---
function toggleMusic() {
    const audio = document.getElementById('bgMusic');
    const btn = document.getElementById('btnMusic');
    if (audio.paused) {
        audio.play();
        btn.classList.add('playing');
    } else {
        audio.pause();
        btn.classList.remove('playing');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const weddingDateStr = "June 30, 2026 11:00:00"; 
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxjAHleuy7Dg8cTtsCBnP82kETkQ1vXBdaOgVt0YXu-7VHXsxIqsvU1gvfEVvSqGm4/exec';

    // TÊN KHÁCH
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('n');
    if (guestName) {
        const setHtml = (id, h) => { const e = document.getElementById(id); if(e) e.innerHTML = h; };
        setHtml('intro-guest-name', `Xin chào, <span style="font-family: var(--font-script); font-size: 1.5rem; color: #ffecd2;">${guestName}</span>`);
        setHtml('guestNameHero', `<div style="font-size:0.8rem; letter-spacing:2px;">TRÂN TRỌNG KÍNH MỜI</div><div style="font-family:var(--font-script); font-size:2.2rem; color:#ffd700; margin-top:5px;">${guestName}</div>`);
// ... (Đoạn code trong phần TÊN KHÁCH MỜI) ...

    if (guestName) {
        const setHtml = (id, h) => { const e = document.getElementById(id); if(e) e.innerHTML = h; };
        
        // Intro & Hero giữ nguyên...
        setHtml('intro-guest-name', `Xin chào, <span style="font-family: var(--font-script); font-size: 1.5rem; color: #ffecd2;">${guestName}</span>`);
        setHtml('guestNameHero', `<div style="font-size:0.8rem; letter-spacing:2px;">TRÂN TRỌNG KÍNH MỜI</div><div style="font-family:var(--font-script); font-size:2.5rem; color:#ffd700; margin-top:5px;">${guestName}</div>`);
        
        // --- SỬA DÒNG NÀY: Đổi font tên khách trong thiệp sang Quicksand (giống bìa) ---
        setHtml('guestNameInvite', `<div style="font-family: 'Quicksand', sans-serif; font-weight: 700; text-transform: uppercase; font-size: 1.8rem; color: var(--primary); margin-top: 10px; letter-spacing: 1px;">${guestName}</div>`);
        
        const inp = document.getElementById('name'); if(inp) inp.value = guestName;
    }

    // ... (Các phần dưới giữ nguyên) ...        const inp = document.getElementById('name'); if(inp) inp.value = guestName;
    }

    // ĐẾM NGƯỢC
    const weddingTime = new Date(weddingDateStr).getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const dist = weddingTime - now;
        if (dist < 0) return;
        document.getElementById("days").innerText = Math.floor(dist / (1000 * 60 * 60 * 24));
        document.getElementById("hours").innerText = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("minutes").innerText = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("seconds").innerText = Math.floor((dist % (1000 * 60)) / 1000);
    }, 1000);

    // MODAL
    function setupModal(btnId, modalId, closeId) {
        const btn = document.getElementById(btnId);
        const modal = document.getElementById(modalId);
        const close = document.getElementById(closeId);
        if(btn) btn.addEventListener('click', () => modal.classList.add('active'));
        if(close) close.addEventListener('click', () => modal.classList.remove('active'));
        if(modal) modal.addEventListener('click', (e) => { if(e.target===modal) modal.classList.remove('active'); });
    }
    setupModal('btnOpenQR', 'qrModal', 'btnCloseQR');
    setupModal('btnOpenWish', 'wishModal', 'btnCloseWish');

    // COPY STK
    const btnCopy = document.getElementById('btnCopySTK');
    if(btnCopy) {
        btnCopy.addEventListener('click', () => {
            navigator.clipboard.writeText(document.getElementById('bankNumberTxt').innerText);
            btnCopy.innerHTML = '<i class="fa-solid fa-check"></i> Đã Copy';
            setTimeout(() => btnCopy.innerHTML = '<i class="fa-regular fa-copy"></i> Copy STK', 2000);
        });
    }

    // FORM
    const btnSubmit = document.getElementById('btnSubmitWish');
    if(btnSubmit) {
        btnSubmit.addEventListener('click', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const relationship = document.getElementById('relationship').value;
            const msg = document.getElementById('message').value;
            const attendance = document.getElementById('attendance').value;

            if(!name || !relationship) { alert("Vui lòng nhập Tên và Mối quan hệ!"); return; }

            btnSubmit.innerText = "Đang gửi...";
            const formData = new FormData();
            formData.append('name', name);
            formData.append('relationship', relationship);
            formData.append('message', msg);
            formData.append('attendance', attendance);

            fetch(scriptURL, { method: 'POST', mode: 'no-cors', body: formData })
            .then(() => {
                alert("Đã gửi lời chúc thành công!");
                document.getElementById('wishModal').classList.remove('active');
                document.getElementById('rsvpForm').reset();
            })
            .catch(err => alert("Lỗi: " + err))
            .finally(() => btnSubmit.innerText = "GỬI NGAY");
        });
    }

    // ANIMATION KHỞI TẠO (CHẬM)
    AOS.init({
        duration: 1900, // Tốc độ mặc định 2 giây (Siêu chậm)
        once: true,
        offset: 50
    });
});