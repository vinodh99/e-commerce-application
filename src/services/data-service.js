import NotificationService, {NOTIF_WISHLIST_CHANGED} from './notification-service';

let ns = new NotificationService();
// no matter how many times a new object of type notificationservice is created,
// it will still reference to the same one in memory
let instance = null;
var wishList = [];

class DataService{
    constructor(){
        if(!instance){
            instance = this;
            // if instance is created for the very first time, we are
            // making it not null and create once in memory at "this" point in time
            // and we store in the instance permanently
            // now next time an object of the class is created, it checks that
            // the object is not null and thus returns the same instance 

        }
        return instance;
    }
    addWishListItem = item => {
        wishList.push(item); 
        ns.postNotification(NOTIF_WISHLIST_CHANGED,wishList);
        // posts notification with the new item in the wish list
    }
    removeWishListItem = item => {
        for(var x=0; x<wishList.length;x++){
            if (wishList[x]._id === item._id){
                wishList.splice(x,1);
                ns.postNotification(NOTIF_WISHLIST_CHANGED,wishList);
                break;
            }
        }   
    }

}
export default DataService;
// we are gonna use it for the application so that it has only one dataservice 
// that can be accessed. If we have more than one different data services, the data is 
// inconsistent and 






// class Car {
//     // engine size
//     // color
// }

// car1 =  Car();
// car2 =  Car();
// a singleton allows only one instance of the car in the memory.
// it can never be more than one