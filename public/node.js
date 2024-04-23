// node.js
import { Navbar, Rightside, Leftside } from './import.js'



// Define the virtualNode constant
var virtualNode = {
    tagName: 'div',
    props: null,
    children: [
        Navbar(),
    ],

};


virtualNode.children.push({
    tagName: 'div',
    props: { id: 'container', class: 'wrapper' },
    children: [
        Leftside(),
        Rightside()
    ]
});


// Export the virtualNode constant
export default virtualNode;
