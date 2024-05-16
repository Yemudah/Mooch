// components/HelloMessage.js

export default function HelloMessage(props) {
    return {
        tagName: 'h2',
        props: null,
        children: `Hello ${props.name} you are ${props.age}`
    };
}

