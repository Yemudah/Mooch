// node.js
import { TestOne } from './router/routes.js'



// Define the App
const App = {
    tagName: 'section',
    props: {id: "wrapper"},
    children: [
        new TestOne().render(),
    ]

};


export default App;