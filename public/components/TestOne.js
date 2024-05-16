// components/HelloMessage.js

class TestOne {

    render() {
        return {
            tagName: 'h2',
            props: null,
            children: `Testing default page!`
        };
    }
}





class TestTwo extends TestOne {
    render() {
        // Call the render method of the parent class
        const parentRender = super.render();
        
        // Modify the children property as needed
        parentRender.children = "Hello, World!"; // Override the children property
        
        return parentRender;
    }
}

export default TestTwo;
