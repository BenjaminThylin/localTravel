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
                    arival: "6:30"
                },
                price: 15
            }, 
            {
                time: "19:00",
                time: {
                    departure: "05:00", 
                    arival: "6:30"
                },
                price: 15
            }, 
            {
                time:"21:00",
                time: {
                    departure: "05:00", 
                    arival: "6:30"
                },
                price: 16
            }, 
            {
                time: "23:00",
                time: {
                    departure: "05:00", 
                    arival: "6:30"
                },
                price: 14
            }
        ]
    },
    {
        id: 2,
        from: "Vasa",
        to: "Jakobstad",
        days: [true,true,false,true,true,false,false],
        times: [
            {
                time: {
                    departure: "06:00", 
                    arival: "07:30"
                },
                price: 25
            }, 
            {
                time: {
                    departure: "16:00", 
                    arival: "17:30"
                },
                price: 25
            }, 
            {
                time: {
                    departure: "18:00", 
                    arival: "19:30"
                },
                price: 25
            }, 
            {
                time: {
                    departure: "22:15", 
                    arival: "23:45"
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
                    arival: "08:45"

                },
                price: 25
            }, 
            {
                time: {
                    departure: "16:00", 
                    arival: "16:45"
                },
                price: 25
            }, 
            {
                time: {
                    departure: "21:00", 
                    arival: "21:45"
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
                    arival: "20:00"
                },
                price: 35
            }, 
            {
                time: {
                    departure: "21:00", 
                    arival: "09:00"
                },
                price: 20
            }
        ] 
    }
];
var displayedTickets = [];
/**
 * An array of ticket object. A ticket object is an object that is created when the user adds a ticket to the shopping cart.
 * -structure-
 *                      {
 *                          id: elementID + "-" + departureDate,
 *                          to: ticket.to
 *                          from: ticket.from
 *                          date: departureDate,
 *                          time:
 *                          {
 *                               departure:  item.time.departure,
 *                               arival:     item.time.arival
 *                          },
 *                          price: ticket.price * getDiscount(discountType),
 *                          discount: discountType,
 *                          tikcetType: titcketType
 *                      }
 */
var shopingCart = [];



