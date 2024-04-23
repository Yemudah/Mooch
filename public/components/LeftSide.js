// Leftside.js

export default function Leftside() {
    return {
        tagName: 'div',
        props: { id: 'nav', class: 'left-wrapper' },
        children: [
            {
                tagName: 'h1',
                props: {},
                children: 'Streamline Your Data Flow with Seamless Integreation',
            },
            {
                tagName: 'p',
                props: {},
                children: "Streamlining your data flow involves optimizing the movement and integration of data within your system to enhance efficiency and effectiveness. Seamless integration plays a vital role in this process by enabling smooth connectivity between different components, systems, or platforms. By ensuring seamless integration, organizations can eliminate data silos, reduce manual effort, and enhance overall productivity."
            }
        ]
    };
}
