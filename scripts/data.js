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
const ticketType = [
    {
        id: "once",
        multiplyer: 1
    },
    {
        id: "month",
        multiplyer: 12
    },
    {
        id: "10-times",
        multiplyer: 9
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
        this.paymentMethod = null;
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
        this.id = null;
        this.departure = departure;
        this.arrival = arrival;
        this.price = price;
    }
}
/**
 * time table item contains data about availible routes and methods that can manipulate it
 */
class TimeTableItem {
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
        this.times = [];
        for(let i = 0; i < times.length; i++)
            this.addTime(times[i]);
    }
    /**
     * Removes specified time
     * @param {Time} time time object to remove 
     */
    removeTime(time){
        for(let i = 0; i < this.times.length; i++)
        {
            if(time.id === this.times[i].id)
            {
                this.times.splice(i, 1);
                break;
            }
        }
    }
    /**
     * adds time to the times array
     * @param {Time} time 
     */
    addTime(time){
        //finds the biggest id in times
        let biggest = 0;
        this.times.forEach(function(t){
            if(t.id > biggest)
                biggest = t.id;
        });
        biggest++;
        time.id = biggest;
        this.times.push(time);
    }
    /**
     * edits a specific time in the timeTable object
     * @param {number} id 
     * @param {string} departure departure time in MT
     * @param {string} arrival arrival time in MT
     * @param {number} price 
     */
    editTime(id, departure, arrival, price){
        this.times.forEach(function(time){
            if(time.id === id){
                time.departure = departure;
                time.arrival = arrival;
                time.price = price;
            }
        });
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
 * @param {*} type string representing the type of ticket
 */
function getTicketTypePrice(type){
    let returnVal = 1;
    ticketType.forEach(function(tt){
        if(tt.id == type)
            returnVal = tt.multiplyer;
    });
    return returnVal;
}
/**
 * Inits time table
 */
function initTimeTable(){
    collection = loadFromLocalStorage("timeTable");
    // !THIS IS FOR TESTING PURPOSES!
    if(collection.length === 0)
    {
        collection = [
            new TimeTableItem(
                1, "Jakobstad", "Vasa",
                [true,true,true,true,true,true,true],
                [
                    new Time("05:00", "6:30", 15),
                    new Time("10:00", "11:30", 15),
                    new Time("14:20", "15:50", 16),
                    new Time("21:00", "22:30", 14)
                ]
            ),
            new TimeTableItem(
                2, "Jakobstad", "Nykarleby",
                [true,true,true,true,true,true,true],
                [
                    new Time("05:00", "05:20", 7),
                    new Time("10:00", "10:20", 7),
                    new Time("14:20", "14:40", 7),
                    new Time("21:00", "21:20", 7)
                ]
            ),
            new TimeTableItem(
                3, "Vasa", "Jakobstad",
                [true,true,true,true,true,true,true],
                [
                    new Time("06:00", "07:30", 25),
                    new Time("16:00", "17:30", 25),
                    new Time("18:00", "19:30", 25),
                    new Time("22:15", "23:45", 25)
                ]
            ),
            new TimeTableItem(
                4, "Vasa", "Karleby",
                [true,true,true,true,true,true,true],
                [
                    new Time("08:00", "09:45", 25),
                    new Time("16:00", "17:45", 25),
                    new Time("21:00", "22:45", 25),
                ]
            ),
            new TimeTableItem(
                5, "Vasa", "Åbo",
                [true,true,true,true,true,true,true],
                [
                    new Time("08:00", "20:00", 35),
                    new Time("21:00", "09:00", 20),
                ]
            ),
            new TimeTableItem(
                6, "Karleby", "Vasa",
                [true,true,true,true,true,true,true],
                [
                    new Time("05:00", "7:25", 22),
                    new Time("09:00", "11:10", 20),
                    new Time("13:30", "15:55", 22),
                ]
            ),
            new TimeTableItem(
                7, "Åbo", "Vasa",
                [true,true,true,true,true,true,true],
                [
                    new Time("05:00", "17:00", 32),
                    new Time("11:00", "23:00", 35),
                    new Time("22:00", "10:00", 22),
                ]
            )
        ];
        pushToLocalStorage("timeTable", collection, false);
    }
    else //because JSON.stringify axes methods since they are not pure data we have to reinstantiate the TimeTable ojbects when reading them from localstorage
    {   //this could potentially cause problems on some browser wendors as JSON.stringify could be implemented in such a way that insted of ignoring methods it throws an error
        let tempCollection = [];
        collection.forEach(function(route){
            let newTimes = [];
            route.times.forEach(function(time){
                newTimes.push(new Time(time.departure,time.arrival,time.price));
            });
            tempCollection.push(new TimeTableItem(route.id, route.from, route.to, route.days, newTimes));
        });
        collection = tempCollection;
    }
    return collection;
}
/**
 * returns a swedish name for discount name
 * @param {string} name english definition
 * @returns {string} the swedish name for specified discount type 
 */
function getDiscountName(name){
    let discountType = "";
    switch (name) {
        case "regular":
            discountType = "Vuxen";
            break;
        case "child":
            discountType = "Barn";
            break;
        case "student":
            discountType = "Studerande";
            break;
        case "senior":
            discountType = "Pensionär";
            break;
        case "unemployed":
            discountType = "Arbetslös";
            break;
    }
    return discountType;
}
/**
 * returns a swedish name for ticketType
 * @param {string} name english definition
 * @returns {string} the swedish name for specified ticketType 
 */
function getTicketTypeName(name){
    let ticketType = "";
    switch (name) {
        case "once":
            ticketType = "Engångsbiljett";
            break;
        case "10-times":
            ticketType = "10-gångskort";
            break;
        case "month":
            ticketType = "Månadskort";
            break;
    }
    return ticketType;
}