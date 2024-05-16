// node.js
import { TestOne, TesTwo, TestThree } from './router/routes.js'



// Define the App
const App = {
    tagName: 'section',
    props: { id: "wrapper" },
    children: [
        TestThree("This is test.")
    ]

};


export default App;