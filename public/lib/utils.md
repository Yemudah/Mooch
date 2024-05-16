# Render Virtual DOM to Real DOM

This repository contains a simple implementation of rendering a virtual DOM node into a real DOM container using vanilla JavaScript. The main function provided is `render`, which takes a virtual node object and a container element, creating and appending the appropriate HTML elements.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Example](#example)
- [Lazy Loading Images](#lazy-loading-images)
- [Contributing](#contributing)
- [License](#license)

## Installation

No installation is required for this script. Simply include it in your project.

## Usage

To use the render function, import it and call it with the appropriate arguments.

```javascript
import render from './path/to/render.js';

// Define a virtual node
const virtualNode = {
    tagName: 'div',
    props: { class: 'container' },
    children: [
        {
            tagName: 'h1',
            props: null,
            children: 'Hello, world!'
        },
        {
            tagName: 'p',
            props: { class: 'intro' },
            children: 'This is a simple virtual DOM example.'
        }
    ]
};

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    const root = document.getElementById('root');
    if (!root) {
        console.error("Element with id 'root' not found.");
        return;
    }
    render(virtualNode, root);
});
```

## API

### `render(virtualNode, container)`

Renders a virtual DOM node into a real DOM container.

#### Parameters

- `virtualNode` (Object): The virtual DOM node to render. Should have the following structure:
  - `tagName` (String): The HTML tag name (e.g., 'div', 'span').
  - `props` (Object, optional): An object containing the properties to set on the element (e.g., `{ class: 'my-class' }`).
  - `children` (String or Array, optional): The text content or an array of child virtual nodes.

- `container` (HTMLElement): The DOM element to which the created element will be appended.

## Example

Here is an example of how to define a virtual node and render it to an HTML container.

```javascript
const virtualNode = {
    tagName: 'div',
    props: { class: 'container' },
    children: [
        {
            tagName: 'h1',
            props: null,
            children: 'Hello, world!'
        },
        {
            tagName: 'p',
            props: { class: 'intro' },
            children: 'This is a simple virtual DOM example.'
        }
    ]
};

document.addEventListener("DOMContentLoaded", function () {
    const root = document.getElementById('root');
    if (!root) {
        console.error("Element with id 'root' not found.");
        return;
    }
    render(virtualNode, root);
});
```

## Lazy Loading Images

The script also includes functionality for lazy loading images using the Intersection Observer API.

```javascript
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
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.