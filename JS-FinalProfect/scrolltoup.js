let scroll = document.getElementById('scroll');

scroll.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});