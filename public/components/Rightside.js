// navbar.js

export default function Rightside() {
    return {
        tagName: 'div',
        props: { id: 'nav', class: 'right-wrapper' },
        children: [
            {
                tagName: 'div',
                props: {class: 'circle-wrapper'},
                children: [
                    {
                        tagName: 'div',
                        props: {class: 'circle'},
                        children: [],
                    }
                ],
            }
        ]
    };
}
