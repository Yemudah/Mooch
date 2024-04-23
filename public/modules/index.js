// modules/index.js

const virtualNode = require('./virtualNode');
const render = require('./render');

document.addEventListener("DOMContentLoaded", function() {
    const root = document.getElementById('root');
    if (!root) {
        console.error("Element with id 'root' not found.");
        return;
    }
    render(virtualNode, root);
});
