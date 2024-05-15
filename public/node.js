// node.js
import { HelloMessage } from './router/routes.js'



// Define the virtualNode constant
var virtualNode = {
    tagName: 'div',
    props: null,
    children: [
        HelloMessage(),
    ]

};




// Export the virtualNode constant
export default virtualNode;
