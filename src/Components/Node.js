export default class Node {

    /**
     * @param {*} fileName is the current file
     * @param {*} dependecies is import libraries from the file
     * @param {*} val is import libraries from the file
     */
    constructor(fileName) {
        this.nodes = fileName
        this.dependecies = []
        this.value = this.dependecies.length
    }

    addDependency(dependecy) {
        this.dependecies.push(dependecy)
    }

    getNode() {
        return this.nodes
    }

    getLinks() {
        return this.dependecies
    }
    getValue(){
        return this.value
    }
}