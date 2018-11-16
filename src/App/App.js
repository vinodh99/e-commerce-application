import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Product from '../product/product';

import HttpService from '../services/http-service';

const http = new HttpService();
class App extends Component {
    
    constructor(props){
        super(props);  
        
        this.state = {products:[]};
        //Bind funictions
        this.loadData = this.loadData.bind(this);//the loaddata is bound to here thus referring to this scope rather than refering it to global scope
        this.productList = this.productList.bind(this);

        this.loadData(); //this is where the function is passed which is inside the loaddata variable.
        
    }
    //loadData=loaddata.bind(loaddata); bind can also be defined this way but if defined this way, loaddata is not reusable for another new object if we create one
    
    loadData = () => {
        var self = this;
        http.getProducts().then(data =>{
            self.setState({products:data})
            // we are inside of a promise here and 
            // "then" here is screwing up our "this" hence a reference is created
            // before the promise is loaded. self is referring to the component
            // here. But if self is not used and this is placed along with the 
            // setState then this referes to the promise and no longer to the
            // component because it is asynchronous.
            // everytime setState is called, it will render that component again and
            // all the components inside of it but not outside of it
        },err => {
            
        });
    }

    productList = () => {
        const list = this.state.products.map((product) =>
            <div className = "col-sm-4" key={product._id}>
            <Product title={product.title} price ={product.price} imgURL={product.imgURL}/> 
            </div>
        );
        return (list);
    }
      
  render() {
    return (
      <div className="App">
        <div className="App-header">
            <h2>welcome suckers, find your best deals</h2>
        </div>
        <div className="container App-main">        
        <div className="row">
            {this.productList()}
         </div>     
            
         </div>
       </div>
    );
  }
}

export default App;
 