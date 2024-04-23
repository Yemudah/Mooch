// components/HelloMessage.js

export default function Navbar() {
    return {
        tagName: 'div',
        props: { id: 'navbar', class: 'nav-wrapper' },
        children: [
            {
                tagName: 'nav',
                props: { class: "nav-item" },
                children: [
                    {
                        tagName: 'div',
                        props: { id: 'navbar-item', class: '' },
                        children: 'Mooch'
                    },
                    {
                        tagName: 'a',
                        props: { href: 'https://github.com/pyquinnnarlo' },
                        children: [
                            {
                                tagName: 'img',
                                props: { src: "../static/img/github-6980894_1280.png", id: 'navbar-item', loading:"lazy", alt: "Github logo" },
                                children: 'Github'
                            }
                        ]
                    }
                ]
            }
        ]
    };
}


