import React, { Component } from 'react'//we are grabbing one specific thing 'component' from react,hence curly braces
import './product-condensed.css';

class ProductCondensed extends Component{
    render(){
        return (
            <li className = "list-group-item pc-condensed">
                <a className= "btn btn-outline-danger">X</a>
                <p>{this.props.product.title} | <b>${this.props.product.price}</b></p>
            </li>
        )
    }
}

export default ProductCondensed; 