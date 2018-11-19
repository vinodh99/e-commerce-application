import React, { Component } from 'react'//we are grabbing one specific thing 'component' from react,hence curly braces
import './wishlist.css';
import ProductCondensed from '../product-condensed/product-condensed'
import DataService from '../services/data-service';
import NotificationService,{NOTIF_WISHLIST_CHANGED} from '../services/notification-service'

let ns = new NotificationService();
class WishList extends Component{

    constructor(props){
        super(props);

        this.state = {wishList:[]};
        // bind functions
        this.createWishList = this.createWishList.bind(this);
        this.onWishListChanged = this.onWishListChanged.bind(this);
        }

// when the component is mounting or it is about to load or if it did just load on 
// the screen we can do something, same goes with unmount, we can do something when
// it goes out of memory
        componentDidMount() {
            ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged)
            // we can add ourselves an observer here
        }

        componentWillUnmount(){
            ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
        // we can remove ourelves an observer here. If we dont remove ourselves
        // an observer here, we could have a memory leak on our app. The notification
        // service will still hold on to this entire component even though it is not
        // on the screen anymore. 
        }

        onWishListChanged(newWishList){
            this.setState({wishList: newWishList})
        }

        createWishList = () => {
            const list = this.state.wishList.map((product) =>
            <ProductCondensed product= {product} key={product._id} />
            
            )
            return (list);
        }

    render(){
        return (
            <div className = "card">
            <div className = "card-block">
            <h4 className = "card-title">wish List</h4>
            <ul className = "list-group">
                {this.createWishList()}
            </ul>
            </div>
            </div>
        );
    }
}

export default WishList; 