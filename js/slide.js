const texts = document.querySelectorAll('.text');
let currentIndex = 0;

document.body.addEventListener('click', () => {

    if (currentIndex < texts.length - 1) {
        texts[currentIndex].classList.remove('active');
        currentIndex++;
        texts[currentIndex].classList.add('active');
    }
});