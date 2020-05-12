var searchData = {
    dateIsValid:    false,
    fromIsValid:    false,
    toIsValid:      false,
    from:           "",
    to:             "",
    departureData:  ""
};
/**
 * A collection of shoppingCartItems
 */
var shoppingCart = {
    totalCost: 0,
    cart: [],
    _index: 0,
    /**
     * Returns the next unique index in the ticket collection
     */
    index: function(){
        this._index++;
        return this._index;
    },
    /**
     * sets the shoppingCart
     * @param {Ticket[]} arr an array of ticket objects 
     */
    set: function(arr){
        if(arr.length !== 0){
            this.cart = arr;
            //sets the index of the shopping cart to the highest index found in the passed array
            let splitTopId = this.cart[this.cart.length - 1].id.split("-");
            this._index = parseInt(splitTopId.pop());
            //sets the shopping carts total cost memeber to the sum of prices in passed array
            let price = 0;
            this.cart.forEach(function(ticket){
                price += ticket.price;
            });
            this.totalCost = price;
        }
    },
    /**
     * adds a ticket to the collection
     * @param {Ticket} ticket object to add to the cart 
     */
    push: function(ticket){
        this.cart.push(ticket);
        this.totalCost += ticket.price;
    },
    /**
     * removes specified ticket from the collection
     * @param {Ticket} ticket the ticket to remove
     */
    remove: function(ticket){
        for(let i = 0; i < this.cart.length; i++)
        {
            if(ticket.id == this.cart[i].id)
            {
                this.totalCost -= ticket.price;
                this.cart.splice(i, 1);
                break;
            }
        }
    },
    /**
     * Clears the shoppingCart of all data
     */
    clear: function(){
        this.cart = [];
        this._index = 0;
        this.totalCost = 0;
    },
    /**
     * sets the payment method of the tickets
     * @param {string} method the name of the payment method
     */
    setPaymentMethod: function(method){
        this.cart.forEach(function(ticket){
            ticket.paymentMethod = method;
        });
    }
}

/**
 * Saves provided array shoppingCart to sessionStorage and returns the saved array
 * @param {*} key the name of the session storage item
 * @param {*} collection the array to push
 * @param {*} append set to true as default, if set to false it will overwrite whatever is currently stored in the sessionstorage item. 
 */
function pushToSessionStorage(key, collection, append = true){
    if(append)
    {
        let prevItems = loadFromSessionStorage(key);
        collection = prevItems.concat(prevItems);
    }
    sessionStorage.setItem(key, JSON.stringify(collection));
    return collection;
}
/**
 * returns an array from sessionstorage
 * @param {*} key the name of the sessionstorage item
 */
function loadFromSessionStorage(key){
    let collection = [];
    let storageString = sessionStorage.getItem(key); 
    if(storageString !== null && storageString !== undefined)
        collection = JSON.parse(storageString);
    
    return collection;
}
