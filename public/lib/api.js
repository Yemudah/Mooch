import virtualNode from '../node.js';

export default class Renderer {
    render(virtualNode, container) {
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
                this.render(child, element);
            });
        }

        // Append the created element to the container
        container.appendChild(element);
    }
}