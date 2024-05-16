// node.js
import { Home } from './router/routes.js'



// Define the App
const App = {
    tagName: 'section',
    props: {id: "wrapper"},
    children: [
        Home()
    ]

};


export default App;