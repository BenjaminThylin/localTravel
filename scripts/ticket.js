var stops = ["Vasa", "Jakobstad", "Nykarleby", "Karleby", "Åbo"];
var tickets = [
    {
        from: "Jakobstad",
        to: "Vasa",
        price: 25,
        days: [true,true,true,true,true,true,false],
        time: ["08:00", "16:00", "18:00", "21:00"]
    },
    {
        from: "Vasa",
        to: "Vasa",
        price: 25,
        days: [true,true,true,true,true,true,false],
        time: ["08:00", "16:00", "18:00", "21:00"]
    },
    {
        from: "Vasa",
        to: "Åbo",
        price: 25,
        days: [false,true,false,true,false,true,false],
        time: ["08:00", "16:00", "18:00", "21:00"]
    }
];
$(document).ready(function(){
    let ticketCount = 1;
    
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
        if(!stops.includes($(this).val()))
            error.show();
        else
            error.hide();
    });
    $("#input-to").on("focusout", function(){ //cehcks that the to station exists
        let error = $("#error-to");
        if($(this).val() == $("#input-from").val())
        {
            $(this).val("");
            error.show();
        }
        else
            error.hide();

    });
    $("#input-from").trigger("change");
    /*let tickets = ['\
    <div id="ticket-nr-1" class="form-group row">\
        <div class="col-md-2">\
            <label for="ticket-type">Biljettyp:</label>\
            <select class="form-control" id="ticket-type-1">\
                <option value="once">Enkelbiljett</option>\
                <option value="10-times">10-gångs kort</option>\
                <option value="month">Månadskort</option>\
            </select>\
        </div class="col-2">\
        <div class="col-md-2">\
            <label for="discount-type">Rabattyp:</label>\
            <select class="form-control" id="discount-type-1">\
                <option value="none">Vuxen</option>\
                <option value="child">Barn</option>\
                <option value="student">Studerande</option>\
                <option value="senior">Pensionär</option>\
                <option value="unemployed">Arbetslös</option>\
            </select>\
        </div>\
        <div class="col-md-2">\
            <div>\
                Pris:\
            </div>\
        </div>\
        <div class="col-md-2">\
            <button class="btn" id="remove-1" type="button">Ta bort</button>\
        </div>\
    </div>\
    '];*/
    //adds new tickets
    $("#new-ticket").click(function(){
        ticketCount++;
        $("#ticket-div").append(getTicketTemplate(ticketCount));
        
        //remove ticket
        $("#remove-" + ticketCount).click(function(){
            let ticketIndex = $(this)[0].id.split("-")[1];
            $("#ticket-nr-" + ticketIndex).remove();
        });
    });
   
    /*/displays the tickets in the array
    $.each(tickets, function(index, value){
        $("#ticket-div").append(value);
    });*/
});
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
        }
        else
            error.hide();
    });
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