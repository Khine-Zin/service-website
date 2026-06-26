const menuBtn = document.querySelector('.menu-bar');
const menu = document.querySelector('nav');
const modal = document.getElementById('blog-modal');
const closeBtn = document.getElementById('close-modal');
const modalTitle = modal.querySelector('h3');
const modalText = modal.querySelector('p');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuBtn.classList.toggle('fa-times');
});

//Review JS Code
let review = document.querySelector('#review'),
    dots = document.querySelectorAll('#review-dots li'),
    reviewContent = document.querySelectorAll('#review-content .review-box'),
    leftArrow = document.querySelector('#left-arrow'),
    rightArrow = document.querySelector('#right-arrow'),
    reviewSpeed = 4500,
    currentSlide = 0,
    currentActive = 0,
    reviewTimer;

window.onload = function () {
    function playSlide(slide) {
        for (let i = 0; i < dots.length; i++) {
            reviewContent[i].classList.remove('active');
            reviewContent[i].classList.remove('inactive');
            dots[i].classList.remove('active');
        }
        if (slide < 0) {
            slide = currentSlide = reviewContent.length - 1;
        }
        if (slide > reviewContent.length - 1) {
            slide = currentSlide = 0;
        }
        if (currentActive != currentSlide) {
            reviewContent[currentActive].classList.add("inactive");
        }
        reviewContent[slide].classList.add("active");
        dots[slide].classList.add("active");
        currentActive = currentSlide;

        clearTimeout(reviewTimer);
        reviewTimer = setTimeout(function () {
            playSlide(currentSlide += 1);
        }, reviewSpeed)
    }
    leftArrow.addEventListener("click", () => {
        playSlide(currentSlide -= 1);
    })
    rightArrow.addEventListener("click", () => {
        playSlide(currentSlide += 1);
    })
    for (let j = 0; j < dots.length; j++) {
        dots[j].addEventListener("click", () => {
            playSlide(currentSlide = dots.indexOf(this));
        })
    }
    playSlide(currentSlide);
}

//Scrollspy
const navLi = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        let sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
        if (current === 'about') {
            document.querySelector('.like .fa-thumbs-up').classList.add('active');
        } else {
            document.querySelector('.like .fa-thumbs-up').classList.remove('active');
        }
    });
    navLi.forEach(li => {
        li.classList.remove('active');
        document.querySelector('nav ul li a[href*=' + current + ']').classList.add('active');
    });
});
document.querySelectorAll('.news .new-text a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        modal.style.display = 'flex'; // Show modal
    });
});

// Close modal when button is clicked
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('blog-modal');
    const closeBtn = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');

    document.querySelectorAll('.news-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // ၁။ အချက်အလက်ယူမယ်
            const parent = this.closest('.new-text');
            const title = parent.querySelector('h3').innerText;
            
            // ၂။ data-fulltext ထဲက စာကိုယူမယ် (မရှိရင် <p> ထဲကစာကိုယူမယ်)
            const fullText = this.getAttribute('data-fulltext') || parent.querySelector('p').innerText;

            // ၃။ Modal ထဲကို အတင်းသွင်းမယ် (ဒီနေရာမှာ Static issue ပျောက်သွားပါမယ်)
            modalTitle.innerText = title;
            modalText.innerText = fullText;

            // ၄။ ပြမယ်
            modal.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});