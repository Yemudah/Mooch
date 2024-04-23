// modules/virtualNode.js

const virtualNode = {
    tagName: 'div',
    props: { id: 'container' },
    children: [
        {
            tagName: 'h1',
            props: null,
            children: 'Hello, Virtual DOM!' // Updated to a string
        }
    ]
};

module.exports = virtualNode;
