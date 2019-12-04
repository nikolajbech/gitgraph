import { random } from "node-forge";

export default class Node {

    /**
     * @param {*} fileName is the current file
     * @param {*} dependecies is import libraries from the file
     */
    constructor(fileName) {
        this.nodes = fileName.substring(0, fileName.lastIndexOf("."));
        this.dependecies = []; 
        this.extension = fileName.substring(fileName.lastIndexOf(".")+1,fileName.length);   
    }

    addDependency(dependecy) {
        this.dependecies.push(dependecy)
    }

    getNode() {
        return this.nodes;
    }

    getLinks() {
        return this.dependecies;
    }
    getValue(){
        return this.dependecies.length;
    }
    getExtension(){        
        return this.extension;
    }
}