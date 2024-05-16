// node.js
import { HelloMessage } from './router/routes.js'



// Define the App
const App = {
    tagName: 'section',
    props: {id: "wrapper"},
    children: [
        HelloMessage({
            "name": "James",
            "age": "34"
        })
    ]

};


export default App;