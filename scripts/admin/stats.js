$(".stats-wrapper").ready(function(){
    let soldTicketsSpan = $("#totalSoldTickets");
    let statsTableBody = $("#statsTableBody");
    soldTicketsSpan.html(soldTickets.length);
    
    soldTickets.forEach(ticket => {
        statsTableBody.append(
            `<tr>
            <td>`+ ticket.id + `</td>
            <td>` + ticket.date + `</td>
            <td>` + ticket.departureTime + `</td>
            <td>` + ticket.type + `</td>
            </tr>`
        )
    });
});