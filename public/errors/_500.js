// _500.js

export default function _500() {
    return {
        tagName: 'div',
        props: { id: 'div', class: '500-wrapper' },
        children: [
            {
                tagName: 'h1',
                props: {class: '500-h1'},
                children: "500 Internal Server Error",
            },
            {
                tagName: 'p',
                props: {class: '500-p'},
                children: "Oops! Something went wrong on the server.",
            }
        ]
    };
}
