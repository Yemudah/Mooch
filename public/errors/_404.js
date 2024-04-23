// _404.js

export default function _404() {
    return {
        tagName: 'div',
        props: { id: 'div', class: '404-wrapper' },
        children: [
            {
                tagName: 'h1',
                props: {class: '404-h1'},
                children: "404 Not Found",
            },
            {
                tagName: 'p',
                props: {class: '404-p'},
                children: "The page you are looking for does not exist.",
            }
        ]
    };
}
