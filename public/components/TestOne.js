// components/HelloMessage.js

export default function TestOne(props) {
    return {
        tagName: 'h2',
        props: null,
        children: `Hello ${props.name} you are ${props.age}`
    };
}

