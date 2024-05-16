// components/HelloMessage.js

export default function TestOne() {
    return {
        tagName: 'section',
        props: {onclick: () => {alert("Hello: You click the button")}},
        children: "Click Me"
    }
}

