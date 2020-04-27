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
    $("#input-to").on("focusout", function(){
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
});

function hideDataOption(select, option){
    select.each(function(){
        if($(this).val() == option)
            $(this).prop("disabled", true);
        else 
            $(this).prop("disabled", false);
    })
}