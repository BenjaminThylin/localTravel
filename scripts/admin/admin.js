$(document).ready(function(){
    //inits timeTable
    timeTable = initTimeTable();
    let statsButton = $("#stats");
    let ticketsButton = $("#tickets");
    let statsWrapper = $(".stats-wrapper");
    let ticketsWrapper = $(".tickets-wrapper");

    statsButton.click(function() {
        statsButton.addClass("active");
        ticketsButton.removeClass("active");
        if (statsButton.hasClass("active")) {
            if (ticketsWrapper.hasClass("show")) {
                ticketsWrapper.removeClass("show");
            }
            statsWrapper.addClass("show");
        }
    });
    
    ticketsButton.click(function() {
        ticketsButton.addClass("active");
        statsButton.removeClass("active");
        if (ticketsButton.hasClass("active")) {
            if (statsWrapper.hasClass("show")) {
                statsWrapper.removeClass("show");
            }
            ticketsWrapper.addClass("show");
        }
    }).trigger("click"); //for testing

    //sets functionallity for editing tickets
    timeTable.forEach(function(ticket){
        ticketsWrapper.append(getTicketAlterationTemplate(ticket));
        let ticketOptionsElement = $("#ticket-options-" + ticket.id);
        $("#input-show-options-" + ticket.id).on("click", function(){
            console.log(ticketOptionsElement);
            if(ticketOptionsElement.is(":visible"))
                ticketOptionsElement.hide()
            else
                ticketOptionsElement.show();
        })

    });
});