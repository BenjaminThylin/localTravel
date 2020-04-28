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
    //hides all error outputs
    $("[error]").each(function(){
        $(this).hide();
    });
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
    let ticketCount = 1;
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
        $("#ticket-div").append('\
    <div id="ticket-nr-' + ticketCount + '" class="form-group row">\
        <div class="col-md-2">\
            <label for="ticket-type">Biljettyp:</label>\
            <select class="form-control" id="ticket-type-' + ticketCount + '">\
                <option value="once">Enkelbiljett</option>\
                <option value="10-times">10-gångs kort</option>\
                <option value="month">Månadskort</option>\
            </select>\
        </div class="col-2">\
        <div class="col-md-2">\
            <label for="discount-type">Rabattyp:</label>\
            <select class="form-control" id="discount-type-' + ticketCount + '">\
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
            <button class="btn" id="remove-' + ticketCount + '" type="button">Ta bort</button>\
        </div>\
    </div>');
        //removes ticket
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

function hideDataOption(select, option){
    select.each(function(){
        if($(this).val() == option)
            $(this).prop("disabled", true);
        else 
            $(this).prop("disabled", false);
    })
}