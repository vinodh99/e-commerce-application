// we could also make our http service a singleton which is not needed here.
//  If there is app that has multipe components and those components needs to access the 
// HTTP service we would want to make it a singleton. 
export const NOTIF_WISHLIST_CHANGED = "notif_wishlist_changed";
// in our data-service, we need to start posting notifications, but before posting
// notifications, we need to have a central place where we can store them
var observers = {};
let instance = null;
class NotificationService {
    constructor(){
        if (!instance){
            instance = this;
        }

        return instance;
    }

    postNotification = (notifName, data) => {
        let obs = observers[notifName];
        for (var x = 0; x < obs.length; x++){
            var obj = obs[x];
            obj.callBack(data);
        }
    }
    removeObserver = (observer,notifName) => {
        var obs = observers[notifName];
        if(obs) {
            for (var x=0; x<obs.length; x++){
                if(observer === obs[x].observer){
                    obs.splice(x,1);
                    observers[notifName] = obs;
                    break;
     // *important* 
// multiple things can hold on to the same memory address, to the same
// memory spot. If there is a component created by react and it is on 
// the screen, it existed but if it is also stored in observers, now there are
// two places that are referencing or pointing to the same space in memory 
// Here in this program, it is being checked whether the observer is the exact same one
// one thats in memory at that address location 
                }
            }
        }
    }
    
    addObserver = (notifName, observer, callBack) => {
        let obs =  observers[notifName];

        if(!obs){
            observers[notifName] = [];
                //if there is no array in there, 
            // that means we have never registered for that notification 
            // before. So we are creating an
            // empty array at tha slot for that specific notification 
            // name that is passed to this function
        }
        let obj = {observer: observer, callBack: callBack};
        observers[notifName].push(obj);
        // notification name is used as a special key on our observers list 
        // and pushed to that array 
    }
}  

export default NotificationService;
// we store a list of observers. An observer is a class or a component. An observer is a class or a component that says hello, I would like to listen
// (kind of like register to vote, here class registers to observe) and when it is time to be notified. Obbserver will register and the system will send
// back notifications when it is time to be notified.