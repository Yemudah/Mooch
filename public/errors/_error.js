// _error.js

export default function _error() {
    return {
        tagName: 'div',
        props: { id: 'div', class: '_error-wrapper' },
        children: [
            {
                tagName: 'h1',
                props: {class: '_error-h1'},
                children: "System fixing in Process..",
            },
            {
                tagName: 'p',
                props: {class: '_error-p'},
                children: "An error occurred while processing your request.",
            }
        ]
    };
}
