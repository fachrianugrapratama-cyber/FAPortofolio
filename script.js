// LOADER

window.addEventListener('load', () => {

    const loader =
        document.querySelector('.loader');

    setTimeout(() => {

        loader.classList.add('hide');

    }, 2000);

});

// CLOCK

function updateClock() {

    const clock =
        document.getElementById('clock');

    const now =
        new Date();

    clock.innerHTML =
        now.toLocaleTimeString();
}

setInterval(updateClock, 1000);

// CURSOR

const cursor =
    document.querySelector('.cursor');

document.addEventListener('mousemove', e => {

    cursor.style.left =
        e.clientX + 'px';

    cursor.style.top =
        e.clientY + 'px';

});

// PARTICLES

const particles =
    document.getElementById('particles');

for (let i = 0; i < 120; i++) {

    const span =
        document.createElement('span');

    span.style.left =
        Math.random() * 100 + '%';

    span.style.animationDuration =
        Math.random() * 10 + 5 + 's';

    span.style.opacity =
        Math.random();

    particles.appendChild(span);

}

// TYPING EFFECT

const texts = [

    "Frontend Developer",
    "Fullstack Developer",
    "UI/UX Designer",
    "Creative Coder",
    "Modern Web Engineer"

];

let speed = 100;
let textIndex = 0;
let charIndex = 0;

const typing =
    document.querySelector('.typing');

function type() {

    if (charIndex < texts[textIndex].length) {

        typing.innerHTML +=
            texts[textIndex].charAt(charIndex);

        charIndex++;

        setTimeout(type, speed);

    }

    else {

        setTimeout(erase, 2000);

    }

}

function erase() {

    if (charIndex > 0) {

        typing.innerHTML =
            texts[textIndex].substring(0, charIndex - 1);

        charIndex--;

        setTimeout(erase, 50);

    }

    else {

        textIndex++;

        if (textIndex >= texts.length) {

            textIndex = 0;

        }

        setTimeout(type, 500);

    }

}

type();

// SCROLL REVEAL

window.addEventListener('scroll', reveal);

function reveal() {

    const reveals =
        document.querySelectorAll('.reveal');

    reveals.forEach(r => {

        const windowHeight =
            window.innerHeight;

        const top =
            r.getBoundingClientRect().top;

        if (top < windowHeight - 100) {

            r.classList.add('active');

        }

    });

}

// DARK MODE

const toggle =
    document.getElementById('themeToggle');

toggle.onclick = () => {

    document.body.classList.toggle('light');

};

// MAGNETIC BUTTON

const buttons =
    document.querySelectorAll('.btn');

buttons.forEach(btn => {

    btn.addEventListener('mousemove', e => {

        const rect =
            btn.getBoundingClientRect();

        const x =
            e.clientX - rect.left - rect.width / 2;

        const y =
            e.clientY - rect.top - rect.height / 2;

        btn.style.transform =
            `translate(${x * 0.15}px, ${y * 0.15}px)`;

    });

    btn.addEventListener('mouseleave', () => {

        btn.style.transform =
            'translate(0,0)';

    });

});

// PARALLAX

document.addEventListener('mousemove', e => {

    document.querySelectorAll('.bg').forEach(layer => {

        const speed = 20;

        const x =
            (window.innerWidth - e.pageX * speed) / 1000;

        const y =
            (window.innerHeight - e.pageY * speed) / 1000;

        layer.style.transform =
            `translate(${x}px, ${y}px)`;

    });

});

// SMOOTH NAV ACTIVE

const sections =
    document.querySelectorAll('section');

const navLinks =
    document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {

    let current = '';

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        if (pageYOffset >= sectionTop - 200) {

            current =
                section.getAttribute('id');

        }

    });

    navLinks.forEach(a => {

        a.classList.remove('active');

        if (a.getAttribute('href') === '#' + current) {

            a.classList.add('active');

        }

    });

});// PREMIUM MOBILE MENU

const menuToggle =
    document.getElementById('menuToggle');

const nav =
    document.querySelector('nav');

menuToggle.addEventListener('click', () => {

    menuToggle.classList.toggle('active');

    nav.classList.toggle('active');

});