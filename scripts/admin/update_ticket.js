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
    //save success confiramtion
    let successElement = $("#output-save-success");
    $("#update-success-confirm").click(function(){
        if(successElement.is(":visible"))
            successElement.hide();
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
        let successElement = $("#output-save-success");
        // sets functionallity for ticket alteration form
        let timesOptionsWrapper = $("#ticket-times-" + ticket.id)
        let ticketOptionsElement = $("#ticket-options-" + ticket.id);
        $("#input-show-options-" + ticket.id).click(function(){
            ticketOptionsElement.slideToggle(150);
        });
        $("#input-add-time-to-timetable-" + ticket.id).click(function(){
            let newTime = new Time("00:00", "23:00", 10);
            ticket.addTime(newTime);
            timesOptionsWrapper.append(getTicketTimeAlterationTemplate(ticket, newTime, true));
            setTimeFunctionallity(newTime, ticket, true);
        });
        $("#input-save-days-" + ticket.id).click(function(){
            let newDays = [];
            for(let i = 0; i < 7; i++){
                if($('#input-edit-day-'+ i +'-id-' + ticket.id).is(":checked"))
                    newDays[i] = true;
                else
                    newDays[i] = false;
            }
            ticket.days = newDays;
            pushToLocalStorage("timeTable", timeTable, false);
            if(!successElement.is(":visible"))
                successElement.show();
        });
        //sets functionallity for ticket time alteration
        for(let i = 0; i < ticket.times.length; i++)
            setTimeFunctionallity(ticket.times[i], ticket);
    });
    /**
     * sets functionallity for editing specific time for a route
     * @param {Time} time  
     * @param {TimeTableItem} ticket
     * @param {bool} toggle set to false as default, if set to true executes .slideToggle on the element
     */
    function setTimeFunctionallity(time, ticket, toggle = false)
    {
        let successElement = $("#output-save-success");
        let timeOptionElement = $("#time-option-time-id-" + time.id + "-ticket-id-" + ticket.id);
        let departureTime = $("#input-departure-time-" + time.id + "-ticket-id-" + ticket.id);
        let arrivaltime = $("#input-arrival-time-" + time.id + "-ticket-id-" + ticket.id);
        let price = $("#input-price-" + time.id + "-ticket-id-" + ticket.id);
        //displays element if hidden
        if(toggle){
            console.log("#time-option-time-id-" + time.id + "-ticket-id-" + ticket.id);
            timeOptionElement.slideDown(150);
        }
        $("#input-remove-item-" + time.id + "-ticket-id-" + ticket.id).click(function(){
            console.log(ticket);
            ticket.removeTime(time);
            timeOptionElement.remove();
            pushToLocalStorage("timeTable", timeTable, false);
            if(!successElement.is(":visible"))
                successElement.show();
        });
        $("#input-save-time-" + time.id + "ticket-id-" + ticket.id).click(function(){
            ticket.editTime(
                parseInt(time.id), 
                departureTime.val(), 
                arrivaltime.val(), 
                Number(price.val())
            );
            pushToLocalStorage("timeTable", timeTable, false);    
            if(!successElement.is(":visible"))
                successElement.show();
        });
    }
}

