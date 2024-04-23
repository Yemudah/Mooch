// components/HelloMessage.js

function HelloMessage(props) {
    return {
        tagName: 'h2',
        props: null,
        children: `Hello, ${props.name}!`
    };
}

module.exports = HelloMessage;
