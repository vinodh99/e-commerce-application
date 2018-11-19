import React, { Component } from 'react'//we are grabbing one specific thing 'component' from react,hence curly braces
import './product.css';
import DataService from '../services/data-service';

let ds = new DataService();

class Product extends Component{

    constructor(props){
        super(props);
        this.onButtonClicked = this.onButtonClicked.bind(this);
    }
    onButtonClicked = () =>{
            ds.addWishListItem(this.props.product);
// when we add whishlist item, then we enter the dataservice, it added the item,
// and the notification is posted which is passing the brand new wishlist with
// all the items. Now, since wishlist.js file is listening, it is going to pass
// in as a newWishlist and then we set the state for the new items in the wishlist.

    }

    render(){

        return (
        <div  className = "card">
            <img className = "card-img-top" src = {this.props.product.imgUrl}alt="Product"></img>
            {/* curly braces is a special syntax to insert javascript */}
            <div className="card-block">
                <h4 className="card-title">{this.props.product.title}</h4>
                <p className="card-text">Price: ${this.props.product.price}</p>
                <a href="#" onClick = {()=> this.onButtonClicked()}className="btn btn-primary">Add to wishlist</a>
                
            </div>
        </div>
        );
    }
}

export default Product; 