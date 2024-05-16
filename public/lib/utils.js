import App from '../app.js';
import Renderer from './api.js';


document.addEventListener("DOMContentLoaded", function () {
    const root = document.getElementById('root');
    if (!root) {
        console.error("Element with id 'root' not found.");
        return;
    }
    const renderer = new Renderer();
    renderer.render(App, root);
});



document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll('.lazy-load');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(image => {
        observer.observe(image);
    });
});
