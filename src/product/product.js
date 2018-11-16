import React, { Component } from 'react'//we are grabbing one specific thing 'component' from react,hence curly braces
import './product.css';

class Product extends Component{
    render(){
        return (
        <div  className = "card">
            <img className = "card-img-top" src = {this.props.imgURL}alt="Product"></img>
            {/* curly braces is a special syntax to insert javascript */}
            <div className="card-block">
                <h4 className="card-title">{this.props.title}</h4>
                <p className="card-text">Price: ${this.props.price}</p>
                <a href="#" className="btn btn-primary">Add to wishlist</a>
                
            </div>
        </div>
        );
    }
}

export default Product; 