import React , {Component} from 'react';

export default class Vertex{
    
    /**
     * @param {*} node is the current file
     * @param {*} dependecies is import libraries from the file
     */
    constructor(node, dependecies){       
        this.node = node; 
        this.dependecies = dependecies;
        this.name= node.name
        this.id = node.id;
    }
    
    getname(){
        return this.name.toString();
    }
    getID(){
        return this.id;
    }
    getCurrentNode(){
        return this.node;
    }
   
}