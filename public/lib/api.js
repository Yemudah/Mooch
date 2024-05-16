import App from '../app.js';

export default class Renderer {
    render(App, container) {
        const element = document.createElement(App.tagName);

        // Set element properties (if any)
        if (App.props) {
            Object.entries(App.props).forEach(([prop, value]) => {
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
        if (typeof App.children === 'string') {
            element.textContent = App.children;
        }

        // Render children (if any)
        if (Array.isArray(App.children)) {
            App.children.forEach(child => {
                this.render(child, element);
            });
        }

        // Append the created element to the container
        container.appendChild(element);
    }
}