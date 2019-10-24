import React from 'react';


export default class Vertex extends React.Component{

    addDependency(v){
        return {
            vertices : [...Array.apply(v) ],
        };
    }


}


