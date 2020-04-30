// var oldSearchData = null;
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
$(document).ready(function(){
    let ticketCount = 1;
    //populates the search field with timetables: just for testing
    let searchOutput = $("#output-search-results");
    timeTable.forEach(function(ticket){
        searchOutput.append(getSearchResultTemplate(ticket));
    });
    //hides all error outputs
    $("[error]").each(function(){
        $(this).hide();
    });
    //stops selection of old dates
    setDateRestrictions($("#input-departure-date"));
    //populates to and from with valid stops
    let dataFrom = $("#data-from");
    let dataTo = $("#data-to");
    stops.forEach(function(stop){
        dataFrom.append('<option value="'+stop+'">'+stop+'</option>');
        dataTo.append('<option value="'+stop+'">'+stop+'</option>');
    });
    $("#input-from").val(stops[0]);
    $("#input-to").val(stops[1]);

    //makes sure that from and to inputs cant be the same
    $("#input-from").on("change", function(){
        let toInput = $("#input-to");
        if($(this).val() == toInput.val())
        {
            let nextValidStop;
            if(stops.indexOf($(this).val()) + 1 == stops.length)
                nextValidStop = 0;
            else
                nextValidStop = stops.indexOf($(this).val()) + 1;
            toInput.val(stops[nextValidStop]);
        }
        hideDataOption($("#data-to option"), $(this).val());
    }).on("focusout", function(){ //checks that the station exists
        let error = $("#error-from");
        if(!stops.includes($(this).val())){
            error.show();
            searchData.fromIsValid = false;
        }
        else{
            error.hide();
            searchData.fromIsValid = true;
            searchData.from = $(this).val();
            getSearchResults();
        }
    }).trigger("change").trigger("focusout");
    $("#input-to").on("focusout", function(){ //checks that the to station exists
        let error = $("#error-to");
        if($(this).val() == $("#input-from").val())
        {
            $(this).val("");
            error.show();
            searchData.toIsValid = false;
        }
        else if(!stops.includes($(this).val()))
        {
            $(this).val("");
            error.show();
            searchData.toIsValid = false;
        }
        else{
            error.hide();
            searchData.toIsValid = true;
            searchData.to = $(this).val();
            getSearchResults();
        }
    }).trigger("focusout");
    //adds new tickets
    $("#add-ticket").click(function(){
        ticketCount++;
        // TODO: pass the selected ticket as a parameter to get price and time information in the shopping cart
        $("#ticket-div").append(getTicketTemplate(ticketCount));
        
        //remove ticket
        $("#remove-" + ticketCount).click(function(){
            let ticketIndex = $(this)[0].id.split("-")[1];
            $("#ticket-nr-" + ticketIndex).remove();
        });
    });
});
function getSearchResults(){
    // TODO: some way of stopping unnecessary searches of old data
    // if(oldSearchData === null || oldSearchData != searchData){// checks if any search params changed
        if(searchData.dateIsValid === true &&
            searchData.toIsValid === true &&
            searchData.fromIsValid === true)
            {
                let searchResults = [];
                timeTable.forEach(function(item){
                    if(item.from == searchData.from && item.to == searchData.to){
                        let departureDate = new Date(searchData.departureData);
                        if(item.days[departureDate.getDay() - 1])//check if buss active on that week day
                            searchResults.push(item);
                    }
                });
                console.log("populating search");
                populateSearchOutput(searchResults);
            }
    // }
}

function populateSearchOutput(results){
    let searchOutput = $("#output-search-results");
    searchOutput.html('\
        <div class="row" id="output-search-results">\
            <h1>Tidtabell:</h1>\
        </div>'
    );
    results.forEach(function(ticket){
        searchOutput.append(getSearchResultTemplate(ticket));
    });
}
function setDateRestrictions(dateInput){
    let date = new Date();
    dateInput.attr("min", getShortDate(date))
            .attr("value", getShortDate(date));

    dateInput.on("focusout", function(){
        let error = $("#error-date")
        let selectedDate = new Date($(this).val().toString());
        let dateLimit = new Date();
        dateLimit.setDate(dateLimit.getDate() - 1);
        if(selectedDate <= dateLimit)
        {
            let d = getShortDate(new Date())
            $(this).val(d);
            error.show().text("datum måste vara större än " + d);
            searchData.dateIsValid = false;
        }
        else
        {
            error.hide();
            searchData.departureData = $(this).val();
            searchData.dateIsValid = true;
            getSearchResults();
        }
    }).trigger("focusout");
}
function hideDataOption(select, option){
    select.each(function(){
        if($(this).val() == option)
            $(this).prop("disabled", true);
        else 
            $(this).prop("disabled", false);
    })
}
function getShortDate(date){
    let day = (date.getDate() >= 10) ? date.getDate() : "0" + date.getDate().toString();
    let month = (date.getMonth() + 1 >= 10) ? date.getMonth() + 1 : "0" + (date.getMonth() + 1).toString()
    let year = date.getFullYear();
    let dateString = year + "-" + month + "-" + day;
    return dateString;
}

