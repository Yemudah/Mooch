import virtualNode from '../node.js';

export default function render(virtualNode, container) {
    const element = document.createElement(virtualNode.tagName);

    // Set element properties (if any)
    if (virtualNode.props) {
        Object.entries(virtualNode.props).forEach(([prop, value]) => {
            // Handle null or undefined props
            if (value !== null && typeof value !== 'undefined') {
                // Check if the prop is className and assign it to the class attribute
                if (prop === 'class') {
                    element.className = value;
                } else {
                    // Assign other props directly to the element
                    element[prop] = value;
                }
            }
        });
    }

    // Set text content (if children are text)
    if (typeof virtualNode.children === 'string') {
        element.textContent = virtualNode.children;
    }

    // Render children (if any)
    if (Array.isArray(virtualNode.children)) {
        virtualNode.children.forEach(child => {
            render(child, element);
        });
    }

    // Append the created element to the container
    container.appendChild(element);
}

document.addEventListener("DOMContentLoaded", function () {
    const root = document.getElementById('root');
    if (!root) {
        console.error("Element with id 'root' not found.");
        return;
    }
    render(virtualNode, root);
});

document.addEventListener("DOMContentLoaded", function() {
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
