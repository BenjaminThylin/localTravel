/**
 * ticket object
 */
class Ticket {
    /**
     * 
     * @param {string} id 
     * @param {string} date shotrt date string 
     * @param {string} to 
     * @param {string} from 
     * @param {string} departure text representing departure in MT 
     * @param {string} arrival text representing arrival in MT
     * @param {number} price 
     * @param {string} discount 
     * @param {string} type 
     */
    constructor(id, date, to, from, departure, arrival, price, discount, type) {
        this.id = id;
        this.date = date;
        this.to = to;
        this.from = from;
        this.departure = departure;
        this.arrival = arrival;
        this.price = price;
        this.discount = discount;
        this.type = type;
    }
}
/**
 * Time object contains arrival and departure information including price
 */
class Time{
    /**
     * Creates a Time object
     * @param {string} departure a string representing the departure time in MT
     * @param {string} arrival a string representing the arrival  time in MT
     * @param {number} price default price for this item
     */
    constructor(departure, arrival, price){
        this.departure = departure;
        this.arrival = arrival;
        this.price = price;
    }
}
/**
 * time table item contains data about availible routes
 */
class TimeTalbeItem {
    /**
     * Creates a timeTable object
     * @param {number} id 
     * @param {string} from name of departure station 
     * @param {string} to name of arrival station
     * @param {bool[]} days a 7 element long array of bools representing days of a week that the rout runs  
     * @param {time[]} times an array of Time objects 
     */
    constructor(id, from, to, days, times){
        this.id = id;
        this.from = from;
        this.to = to;
        this.days = days;
        this.times = times
    }
}
var timeTable = [
    new TimeTalbeItem(
        1, "Jakobstad", "Vasa",
        [true,true,true,true,true,true,false],
        [
            new Time("05:00", "6:30", 15),
            new Time("10:00", "11:30", 15),
            new Time("14:20", "15:50", 16),
            new Time("21:00", "22:30", 14)
        ]
    ),
    new TimeTalbeItem(
        2, "Jakobstad", "Nykarleby",
        [true,true,true,true,true,true,false],
        [
            new Time("05:00", "05:20", 7),
            new Time("10:00", "10:20", 7),
            new Time("14:20", "14:40", 7),
            new Time("21:00", "21:20", 7)
        ]
    ),
    new TimeTalbeItem(
        3, "Vasa", "Jakobstad",
        [true,true,false,true,true,false,false],
        [
            new Time("06:00", "07:30", 25),
            new Time("16:00", "17:30", 25),
            new Time("18:00", "19:30", 25),
            new Time("22:15", "23:45", 25)
        ]
    ),
    new TimeTalbeItem(
        4, "Vasa", "Karleby",
        [true,true,true,true,true,true,false],
        [
            new Time("08:00", "09:45", 25),
            new Time("16:00", "17:45", 25),
            new Time("21:00", "22:45", 25),
        ]
    ),
    new TimeTalbeItem(
        5, "Vasa", "Åbo",
        [false,true,false,true,false,true,false],
        [
            new Time("08:00", "20:00", 35),
            new Time("21:00", "09:00", 20),
        ]
    ),
    new TimeTalbeItem(
        6, "Karleby", "Vasa",
        [true,true,true,true,true,false,false],
        [
            new Time("05:00", "7:25", 22),
            new Time("09:00", "11:10", 20),
            new Time("13:30", "15:55", 22),
        ]
    ),
    new TimeTalbeItem(
        7, "Åbo", "Vasa",
        [true,true,true,true,true,false,false],
        [
            new Time("05:00", "17:00", 32),
            new Time("11:00", "23:00", 35),
            new Time("22:00", "10:00", 22),
        ]
    )
];
var searchData = {
    dateIsValid:    false,
    fromIsValid:    false,
    toIsValid:      false,
    from:           "",
    to:             "",
    departureData:  ""
};
const discount = [
    {
        id: "regular",
        procentage: 1
    },
    {
        id: "senior",
        procentage: 0.85
    },
    {
        id: "student",
        procentage: 0.75
    },
    {
        id: "child",
        procentage: 0.65
    },
    {
        id: "unemployed",
        procentage: 0.75
    }
];
const stops = ["Vasa", "Jakobstad", "Nykarleby", "Karleby", "Åbo"];
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
/**
 * Saves provided array to localStorage
 * @param {*} key the name of the local storage item
 * @param {*} collection the array to push
 * @param {*} append set to true as default, if set to false it will overwrite whatever is currently stored in the localstorage item. 
 */
function pushToLocalStorage(key, collection, append = true){
    if(append){
        let prevItems = [];
        let storageString = localStorage.getItem(key);
        if(storageString !== null && storageString !== undefined)
            prevItems = JSON.parse(storageString);

        collection = prevItems.concat(collection);
    }
    localStorage.setItem(key, JSON.stringify(collection));
}
/**
 * @param {*} type string representing the type of discount
 */
function getDiscount(type){
    let returnVal = 1;
    discount.forEach(function(disc){
        if(disc.id == type)
            returnVal = disc.procentage;
    });
    return returnVal;
}