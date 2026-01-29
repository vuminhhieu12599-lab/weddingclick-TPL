document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Hiệu ứng hiển thị chậm (Scroll Reveal) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.scroll-reveal');
    hiddenElements.forEach((el) => observer.observe(el));


    // --- 2. Xử lý Modal Mừng Cưới ---
    const modal = document.getElementById("gift-modal");
    const btn = document.getElementById("open-gift-modal");
    const span = document.getElementsByClassName("close-modal")[0];

    // Mở Modal
    if(btn) {
        btn.onclick = function() {
            modal.style.display = "block";
        }
    }

    // Đóng Modal khi ấn X
    if(span) {
        span.onclick = function() {
            modal.style.display = "none";
        }
    }

    // Đóng Modal khi ấn ra ngoài
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


    // --- 3. Tính năng Copy STK ---
    window.copyToClipboard = function(text) {
        navigator.clipboard.writeText(text).then(function() {
            alert('Đã sao chép STK: ' + text);
        }, function(err) {
            alert('Không thể sao chép, bạn vui lòng nhập thủ công!');
        });
    }

    // --- 4. Form RSVP (Mô phỏng) ---
    const rsvpForm = document.getElementById('rsvp-form');
    if(rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btnSubmit = rsvpForm.querySelector('.btn-submit');
            const oldText = btnSubmit.innerText;
            
            btnSubmit.innerText = "Đang gửi...";
            btnSubmit.disabled = true;

            setTimeout(() => {
                alert("Cảm ơn bạn đã xác nhận tham dự! Chúng mình rất vui được đón tiếp bạn.");
                rsvpForm.reset();
                btnSubmit.innerText = oldText;
                btnSubmit.disabled = false;
            }, 1500);
        });
    }
});