// node.js
import { HelloMessage, About } from './router/routes.js'



// Define the Render
const virtualNode = {
    tagName: 'section',
    props: {id: "wrapper"},
    children: [
        About()
    ]

};


export default virtualNode;