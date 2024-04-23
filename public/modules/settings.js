import virtualNode from '../node.js';

export default function render(virtualNode, container) {
    const element = document.createElement(virtualNode.tagName);

    // Set element properties (if any)
    if (virtualNode.props) {
        Object.keys(virtualNode.props).forEach(prop => {
            // Handle null or undefined props
            if (virtualNode.props[prop] !== null && typeof virtualNode.props[prop] !== 'undefined') {
                // Check if the prop is className and assign it to the class attribute
                if (prop === 'class') {
                    element.className = virtualNode.props[prop];
                } else {
                    // Assign other props directly to the element
                    element[prop] = virtualNode.props[prop];
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

})

