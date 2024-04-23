// modules/render.js

function render(virtualNode, container) {
    const element = document.createElement(virtualNode.tagName);
    
    // Set element properties (if any)
    if (virtualNode.props) {
        Object.keys(virtualNode.props).forEach(prop => {
            // Handle null or undefined props
            if (virtualNode.props[prop] !== null && typeof virtualNode.props[prop] !== 'undefined') {
                element[prop] = virtualNode.props[prop];
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

module.exports = render;
