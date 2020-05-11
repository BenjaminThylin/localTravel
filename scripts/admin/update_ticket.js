//sets functionallity for editing tickets
$(".tickets-wrapper").ready(function(){
    let ticketsWrapper = $(".tickets-wrapper");
    //ouputs all tickets by default
    appendTickets(timeTable, ticketsWrapper);    
    //populates fromInput with stops
    let fromInput = $("#input-from");
    fromInput.append(getOptionTemplate("*"));
    stops.forEach(function(stop){
        fromInput.append(getOptionTemplate(stop));
    });
    fromInput.val("*")//sets default value
            .focusout(function(){
                appendTickets(getValidTickets(fromInput.val()), ticketsWrapper);
            });
});
/**
 * Gets an array of valid tickets 
 * @param {string} from name of the departure station 
 * @returns {TimeTableItem[]} an array of timeTableItems/tickets
 */
function getValidTickets(from){
    if(from === "*")
        return timeTable;
    else{
        let returnTickets = [];
        timeTable.forEach(function(ticket){
            if(ticket.from === from)
                returnTickets.push(ticket);
        });
        return returnTickets;    
    }
}
/**
 * appends new ticket elements to tickets wrapper
 * @param {TimeTableItem[]} tickets an array of tickets to display. If empty displays nothing
 * @param {$(element)} outputElement a jQuery object of the tickets wrapper.  
 */
function appendTickets(tickets, outputElement)
{
    //clears old tickets
    outputElement.find('div[name="alter-tickets-element"]').remove();
    //populates element with tickets
    tickets.forEach(function(ticket){
        outputElement.append(getTicketAlterationTemplate(ticket));
        let ticketOptionsElement = $("#ticket-options-" + ticket.id);
        $("#input-show-options-" + ticket.id).click(function(){
            console.log(ticketOptionsElement);
            if(ticketOptionsElement.is(":visible"))
                ticketOptionsElement.hide()
            else
                ticketOptionsElement.show();
        })
    });
}
