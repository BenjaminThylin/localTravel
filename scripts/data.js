var shopingCart = ["testing", "some", "stuff"];
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
        id: "old person",
        procentage: 0.34
    },
    {
        id: "old person",
        procentage: 0.34
    },
];
var stops = ["Vasa", "Jakobstad", "Nykarleby", "Karleby", "Åbo"];
var timeTable = [
    {
        id: 1,
        from: "Jakobstad",
        to: "Vasa",
        price: 25,
        days: [true,true,true,true,true,true,false],
        times: ["08:00", "16:00", "18:00", "21:00"]
    },
    {
        id: 2,
        from: "Jakobstad",
        to: "Vasa",
        price: 15,
        days: [true,true,true,true,true,true,false],
        times: ["05:00", "19:00", "21:00", "23:00"]
    },
    {
        id: 3,
        from: "Vasa",
        to: "Jakobstad",
        price: 25,
        days: [true,true,true,true,true,true,false],
        times: ["06:00", "16:00", "18:00", "22:15"]
    },
    {
        id: 4,
        from: "Vasa",
        to: "Karleby",
        price: 25,
        days: [true,true,true,true,true,true,false],
        times: ["08:00", "16:00", "18:00", "21:00"]
    },
    {
        id: 5,
        from: "Vasa",
        to: "Åbo",
        price: 25,
        days: [false,true,false,true,false,true,false],
        times: ["08:00", "16:00", "18:00", "21:00"]
    }
];