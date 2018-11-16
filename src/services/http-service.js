import 'whatwg-fetch';

class HttpService {
    getProducts = () =>{
        //1
        var promise = new Promise((resolve,reject) => {
//        2
            fetch('http://localhost:3002/product')
            .then(res => {
//                4
                resolve(res.json());
             //josn takes the response and converts to json 
            })
        });
//        3
        return promise;
        //then is chained to whatever fetch is returning
    }
}

export default HttpService;//ES6 format of module.export
