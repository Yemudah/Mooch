// node.js
import { HelloMessage, About } from './router/routes.js'



// Define the virtualNode constant
var virtualNode = {
    tagName: 'section',
    props: {id: "wrapper"},
    children: [
        About()
    ]

};




// Export the virtualNode constant
export default virtualNode;
