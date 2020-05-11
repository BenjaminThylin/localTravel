//sets functionallity for editing tickets
$(".tickets-wrapper").ready(function(){
    let ticketsWrapper = $(".tickets-wrapper");
    console.log(ticketsWrapper);
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