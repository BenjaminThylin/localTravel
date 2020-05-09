var searchData = {
    dateIsValid:    false,
    fromIsValid:    false,
    toIsValid:      false,
    from:           "",
    to:             "",
    departureData:  ""
};
var discount = [
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
var stops = ["Vasa", "Jakobstad", "Nykarleby", "Karleby", "Åbo"];
var timeTable = [
    {
        id: 1,
        from: "Jakobstad",
        to: "Vasa",
        days: [true,true,true,true,true,true,false],
        times: [
            {
                time: {
                    departure: "05:00", 
                    arrival: "6:30"
                },
                price: 15
            }, 
            {
                time: {
                    departure: "10:00", 
                    arrival: "11:30"
                },
                price: 15
            }, 
            {
                time: {
                    departure: "14:20", 
                    arrival: "15:50"
                },
                price: 16
            }, 
            {
                time: {
                    departure: "21:00", 
                    arrival: "22:30"
                },
                price: 14
            }
        ]
    },
    {
        id: 2,
        from: "Jakobstad",
        to: "Nykarleby",
        days: [true,true,true,true,true,true,false],
        times: [
            {
                time: {
                    departure: "05:00", 
                    arrival: "05:20"
                },
                price: 7
            }, 
            {
                time: {
                    departure: "10:00", 
                    arrival: "10:20"
                },
                price: 7
            }, 
            {
                time: {
                    departure: "14:20", 
                    arrival: "14:40"
                },
                price: 7
            }, 
            {
                time: {
                    departure: "21:00", 
                    arrival: "21:20"
                },
                price: 7
            }
        ]
    },
    {
        id: 3,
        from: "Vasa",
        to: "Jakobstad",
        days: [true,true,false,true,true,false,false],
        times: [
            {
                time: {
                    departure: "06:00", 
                    arrival: "07:30"
                },
                price: 25
            }, 
            {
                time: {
                    departure: "16:00", 
                    arrival: "17:30"
                },
                price: 25
            }, 
            {
                time: {
                    departure: "18:00", 
                    arrival: "19:30"
                },
                price: 25
            }, 
            {
                time: {
                    departure: "22:15", 
                    arrival: "23:45"
                },
                price: 25
            }
        ]
    },
    {
        id: 4,
        from: "Vasa",
        to: "Karleby",
        days: [true,true,true,true,true,true,false],
        times: [
            {
                time: {
                    departure: "08:00", 
                    arrival: "08:45"
                },
                price: 25
            }, 
            {
                time: {
                    departure: "16:00", 
                    arrival: "16:45"
                },
                price: 25
            }, 
            {
                time: {
                    departure: "21:00", 
                    arrival: "21:45"
                },
                price: 25
            }
        ]
    },
    {
        id: 5,
        from: "Vasa",
        to: "Åbo",
        price: 25,
        days: [false,true,false,true,false,true,false],
        times: [
            {
                time: {
                    departure: "08:00", 
                    arrival: "20:00"
                },
                price: 35
            }, 
            {
                time: {
                    departure: "21:00", 
                    arrival: "09:00"
                },
                price: 20
            }
        ] 
    },
    {
        id: 6,
        from: "Karleby",
        to: "Vasa",
        days: [true,true,true,true,true,false,false],
        times: [
            {
                time: {
                    departure: "05:00", 
                    arrival: "7:25"
                },
                price: 22
            }, 
            {
                time: {
                    departure: "09:00", 
                    arrival: "11:10"
                },
                price: 20
            }, 
            {
                time: {
                    departure: "13:30", 
                    arrival: "15:55"
                },
                price: 22
            }
        ]
    },
    {
        id: 7,
        from: "Åbo",
        to: "Vasa",
        days: [true,true,true,true,true,false,false],
        times: [
            {
                time: {
                    departure: "05:00", 
                    arrival: "17:00"
                },
                price: 32
            }, 
            {
                time: {
                    departure: "11:00", 
                    arrival: "23:00"
                },
                price: 35
            }, 
            {
                time: {
                    departure: "22:00", 
                    arrival: "10:00"
                },
                price: 22
            }
        ]
    }
];
var displayedTickets = [];
/**
 * An array of ticket objects
 */
var shoppingCart = [];
var totalCost = 0;
/**
 * ticket object
 */
class Ticket {
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
 * Saves provided array shoppingCart to sessionStorage and returns the saved array
 * @param {*} key the name of the session storage item
 * @param {*} collection the array to push
 * @param {*} item object to push to the array before saving, if not set the function just saves the passed array 
 */
function pushToSessionStorage(key, collection, item = null){
    if(item !== null)
        collection.push(item);
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
 * @param {*} append set to true as default, if set to false it will overwrite whatever is currently store in the localstorage item. 
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