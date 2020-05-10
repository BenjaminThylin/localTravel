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
     * @param {number} id
     * @param {string} departure a string representing the departure time in MT
     * @param {string} arrival a string representing the arrival  time in MT
     * @param {number} price default price for this item
     */
    constructor(id, departure, arrival, price){
        this.id = id;
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
var timeTable = [];
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
 * returns an array from localstorage
 * @param {string} key name of the localstorage item
 */
function loadFromLocalStorage(key){
    let storageString = localStorage.getItem(key)
    let collection = [];
    if(storageString !== null && storageString !== undefined)
        collection = JSON.parse(storageString);
    
    return collection;
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
/**
 * Inits time table this is for testing purposes
 */
function initTimeTable(){
    collection = loadFromLocalStorage("timeTable");
    if(collection.length === 0)
    {
        collection = [
            new TimeTalbeItem(
                1, "Jakobstad", "Vasa",
                [true,true,true,true,true,true,false],
                [
                    new Time(1, "05:00", "6:30", 15),
                    new Time(2, "10:00", "11:30", 15),
                    new Time(3, "14:20", "15:50", 16),
                    new Time(4, "21:00", "22:30", 14)
                ]
            ),
            new TimeTalbeItem(
                2, "Jakobstad", "Nykarleby",
                [true,true,true,true,true,true,false],
                [
                    new Time(1, "05:00", "05:20", 7),
                    new Time(2, "10:00", "10:20", 7),
                    new Time(3, "14:20", "14:40", 7),
                    new Time(4, "21:00", "21:20", 7)
                ]
            ),
            new TimeTalbeItem(
                3, "Vasa", "Jakobstad",
                [true,true,false,true,true,false,false],
                [
                    new Time(1, "06:00", "07:30", 25),
                    new Time(2, "16:00", "17:30", 25),
                    new Time(3, "18:00", "19:30", 25),
                    new Time(4, "22:15", "23:45", 25)
                ]
            ),
            new TimeTalbeItem(
                4, "Vasa", "Karleby",
                [true,true,true,true,true,true,false],
                [
                    new Time(1, "08:00", "09:45", 25),
                    new Time(2, "16:00", "17:45", 25),
                    new Time(3, "21:00", "22:45", 25),
                ]
            ),
            new TimeTalbeItem(
                5, "Vasa", "Åbo",
                [false,true,false,true,false,true,false],
                [
                    new Time(1, "08:00", "20:00", 35),
                    new Time(2, "21:00", "09:00", 20),
                ]
            ),
            new TimeTalbeItem(
                6, "Karleby", "Vasa",
                [true,true,true,true,true,false,false],
                [
                    new Time(1, "05:00", "7:25", 22),
                    new Time(2, "09:00", "11:10", 20),
                    new Time(3, "13:30", "15:55", 22),
                ]
            ),
            new TimeTalbeItem(
                7, "Åbo", "Vasa",
                [true,true,true,true,true,false,false],
                [
                    new Time(1, "05:00", "17:00", 32),
                    new Time(2, "11:00", "23:00", 35),
                    new Time(3, "22:00", "10:00", 22),
                ]
            )
        ];
        pushToLocalStorage("timeTable", collection, false);
    }

    return collection;
}