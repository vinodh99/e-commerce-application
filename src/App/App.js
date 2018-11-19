import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// components
import Product from '../product/product';
import WishList from '../wishlist/wishlist';

// services
import HttpService from '../services/http-service';
const http = new HttpService();
class App extends Component {
    
    constructor(props){
        super(props);  
        
        this.state = {products:[]};
        //Bind funictions
        this.loadData = this.loadData.bind(this);//the loaddata is bound here, thus referring to this scope rather than refering it to global scope
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
            // before th e promise is loaded. self is referring to the component
            // here. But if self is not used and this is placed along with the 
            // setState then this referes to the promise and no longer to the
            // component because it is asynchronous.
            // everytime setState is called, it will render that component and
            // all the components inside of it but not outside of it again
        },err => {
            
        });
    }

    productList = () => {
        const list = this.state.products.map((product) =>
            <div className = "col-sm-4" key={product._id}>
            <Product product={product}/> 
            {/* the whole product is passed as props */}
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
        <div className="container-fluid App-main">        
        <div className="row">
            <div className="col-sm-8">
            <div className="row">
            {this.productList()}

            </div>
            </div> 
            {/* a row is taken first which contains two columns, products 
            and wishlist.Then within the products column productsList is inserted  */}
            <div className="col-sm-4">
            <WishList />
            </div>
         </div>     
            
         </div>
       </div>
    );
  }
}

export default App;
//  the complete description
/* we load the data and when the data is loaded we set the state, refresh the Ui with data.
when you see .then we can no longer use this unless we grab a reference to it
such as self setstate Here. in this example products is refreshed 
which we get from the server goes into the products array and the render
function is called again. this.productlist function is called which uses 
javascript mapping array .we prettymuch use map function whenever we have a list
in react. map goes to every item in the list that we have in the 
products array in this state, frop that product into the "product" parameter
and grab the element out of it, put it into our component, we pass the elements
into different properties and then we return the list which is rendered
 to the screen. Now in the product.js, we access the list by saying this.props.imgUrl 
 which is coming from the parent. when the setstate is called, product.js is also
 rendered
*/