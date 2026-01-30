document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. MỞ PHONG BÌ ---
    window.openEnvelope = function() {
        const wrapper = document.getElementById('envelope-wrapper');
        const intro = document.getElementById('intro-screen');
        const main = document.getElementById('main-content');
        const musicBtn = document.getElementById('musicBtn');
        const bgMusic = document.getElementById('bg-music');
        const liveBar = document.getElementById('live-bottom-bar');

        wrapper.classList.add('open');

        if(bgMusic) {
            bgMusic.play().catch(e => console.log("Audio auto-play blocked"));
            musicBtn.classList.remove('hidden');
            musicBtn.innerHTML = '<i class="fa-solid fa-compact-disc fa-spin"></i>';
        }

        setTimeout(() => {
            intro.classList.add('fade-out');
            main.classList.remove('hidden');
            setTimeout(() => { main.style.opacity = 1; }, 50);
            if(liveBar) setTimeout(() => liveBar.classList.remove('hidden-bar-init'), 1000);
            setTimeout(() => { intro.style.display = 'none'; }, 1500);
        }, 2200); 
    }

    // --- 2. HIỆU ỨNG SCROLL ---
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('anim-active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.anim-up, .anim-down, .anim-left, .anim-right, .anim-zoom, .anim-blur').forEach(el => scrollObserver.observe(el));

    // --- 3. LOGIC HIỆN CHAT ---
    const chatContainer = document.getElementById('tiktok-chat-container');
    window.addEventListener('scroll', () => {
        if (!chatContainer) return;
        if (window.scrollY > 300) {
            chatContainer.classList.add('chat-visible');
        } else {
            chatContainer.classList.remove('chat-visible');
        }
    });

    // --- 4. CHAT FAKE & TIM BAY ---
    const fakeWishes = [
        { name: "Minh Tuấn", msg: "Chúc hai bạn trăm năm hạnh phúc! ❤️" },
        { name: "Thu Hà", msg: "Cô dâu xinh quá, chú rể bảnh trai 🥰" },
        { name: "Team Design", msg: "Cuối cùng cũng cưới rồi! Chúc mừng nha 🎉" },
        { name: "Anh Hùng", msg: "Sớm sinh quý tử nhé hai em" },
        { name: "Em Mây", msg: "Đám cưới đẹp quá anh chị ơi 💖" },
        { name: "Hội bạn thân", msg: "Quẩy lên nào anh em ơi 🥳" }
    ];
    function addChatMessage(name, msg) {
        if(!chatContainer) return;
        const div = document.createElement('div');
        div.classList.add('chat-item');
        div.innerHTML = `<span class="chat-name">${name}:</span> ${msg}`;
        chatContainer.appendChild(div);
        if (chatContainer.children.length > 5) chatContainer.removeChild(chatContainer.children[0]);
    }
    function autoRunChat() {
        const r = fakeWishes[Math.floor(Math.random() * fakeWishes.length)];
        addChatMessage(r.name, r.msg);
    }
    let chatInterval = setInterval(autoRunChat, 3000); 

    function spawnHeart() {
        const heartContainer = document.body;
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        const icons = ['❤️', '💖', '🥰', '😍', '🎉', '💍', '🥂'];
        heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];
        heart.style.right = (15 + Math.random() * 30) + 'px';
        heart.style.fontSize = (15 + Math.random() * 20) + 'px';
        heart.style.animationDuration = (2 + Math.random() * 2) + 's';
        heartContainer.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 4000);
    }
    setInterval(spawnHeart, 2500);

    window.sendLiveWish = function() {
        const input = document.getElementById('live-wish-input');
        const msg = input.value.trim();
        if(msg === "") return;
        let sName = document.getElementById('guest-name-intro').innerText;
        if(sName === "Khách Quý") sName = "Bạn";
        addChatMessage(sName, msg);
        input.value = "";
        for(let i=0; i<5; i++) setTimeout(spawnHeart, i * 100);
        clearInterval(chatInterval);
        chatInterval = setInterval(autoRunChat, 4000);
    }
    document.getElementById('live-wish-input')?.addEventListener("keypress", (e) => {
        if(e.key === "Enter") sendLiveWish();
    });

    window.toggleBottomBar = function(show) {
        const bar = document.getElementById('live-bottom-bar');
        const reopenBtn = document.getElementById('reopen-bar-btn');
        const chatBox = document.getElementById('tiktok-chat-container');
        if(show) {
            bar.classList.remove('hide-down');
            reopenBtn.classList.add('hidden');
            if(window.scrollY > 300) chatBox.classList.add('chat-visible');
        } else {
            bar.classList.add('hide-down');
            reopenBtn.classList.remove('hidden');
        }
    }

    const params = new URLSearchParams(window.location.search);
    const gName = params.get('ten');
    if(gName) {
        document.getElementById('guest-name-intro').innerText = gName;
        const fn = document.getElementById('form-name');
        if(fn) fn.value = gName;
    }

    // --- 5. BỘ ĐẾM NGƯỢC THÔNG MINH ---
    // Ngày cưới: 30/01/2026 08:00
    const wedDate = new Date("Jan 30, 2026 08:00:00").getTime();
    
    // Lưu ID của interval để có thể dừng lại
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = wedDate - now;

        const box = document.getElementById("countdown-box");

        // TRƯỜNG HỢP 1: Đã qua giờ cưới
        if (distance < 0) {
            clearInterval(countdownInterval); // Dừng đếm
            // Thay thế toàn bộ ô số bằng dòng chữ
            box.innerHTML = '<div class="success-msg">Đám cưới đã diễn ra thành công tốt đẹp! ❤️</div>';
            return;
        }

        // TRƯỜNG HỢP 2: Chưa đến giờ (Đếm ngược)
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Hiển thị số nguyên bản (không thêm số 0)
        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;

    }, 1000);

    const mBtn = document.getElementById('musicBtn');
    const bgM = document.getElementById('bg-music');
    let isP = true;
    mBtn?.addEventListener('click', () => {
        if(isP) { bgM.pause(); mBtn.innerHTML = '<i class="fa-solid fa-music"></i>'; }
        else { bgM.play(); mBtn.innerHTML = '<i class="fa-solid fa-compact-disc fa-spin"></i>'; }
        isP = !isP;
    });

    const qrM = document.getElementById('qr-modal');
    window.openQR = () => qrM.classList.remove('hidden');
    document.querySelector('.close-qr').onclick = () => qrM.classList.add('hidden');
    window.onclick = (e) => { if(e.target == qrM) qrM.classList.add('hidden'); }
    window.copySTK = () => {
        navigator.clipboard.writeText(document.getElementById('stk-text').innerText)
        .then(() => alert("Đã copy STK!"));
    }

    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    window.openLightbox = (img) => { lb.classList.remove('hidden'); lbImg.src = img.src; }
    window.closeLightbox = () => lb.classList.add('hidden');
});