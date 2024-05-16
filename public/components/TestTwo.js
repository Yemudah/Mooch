export default function TesTwo() {
    return {
        tagName: 'button',
        props:  {onclick: () => {alert("Button clicked")}},
        children: "Press"
    }
}

