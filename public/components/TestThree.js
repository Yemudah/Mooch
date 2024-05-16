export default function TestThree(props) {
    return {
        tagName: 'button',
        props: {onclick: () => {alert(`${props}`)}},
        children: 'Press'
    }
}