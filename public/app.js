// node.js
import { TestOne, TestTwo } from './router/routes.js'



// Define the App
const App = {
    tagName: 'section',
    props: {id: "wrapper"},
    children: [
        TestOne({
            "name": "James",
            "age": "34"
        }), 
        TestTwo("Paul", "20")
    ]

};


export default App;