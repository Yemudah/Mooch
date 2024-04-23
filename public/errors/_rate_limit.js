// _rate_limit.js

export default function _rate_limit() {
    return {
        tagName: 'div',
        props: { id: 'div', class: '_rate_limit-wrapper' },
        children: [
            {
                tagName: 'h1',
                props: {class: '_rate_limit-h1'},
                children: "Too Many Requests: Wait few seconds.",
            },
            {
                tagName: 'p',
                props: {class: '_rate_limit-p'},
                children: "Sorry, you've reached the rate limit. Please try again later.",
            }
        ]
    };
}
