$(document).ready(function(){
    let soldTicketsSpan = $("#totalSoldTickets");
    let statsTableBody = $("#statsTableBody");
    let totalIncome = $("#totalIncome");
    //#region for testing
    let storageString = localStorage.getItem("boughtTickets");
    if(storageString !== null && storageString !== undefined)
        soldTickets = soldTickets.concat(JSON.parse(storageString));
    //#endregion
    soldTicketsSpan.html(soldTickets.length);
    totalIncome.html(getTotalIncome() + "€");
    
    soldTickets.forEach(function(ticket){
        statsTableBody.append(
            `<tr>
            <td>`+ ticket.from + `</td>
            <td>`+ ticket.to + `</td>
            <td>` + ticket.date + `</td>
            <td>` + ticket.departure + `</td>
            <td>` + ticket.type + `</td>
            <td>` + ticket.price + `</td>
            </tr>`
        )
    });
    $("#statistics-empty").click(function() {
        localStorage.clear("boughtTickets");
        sessionStorage.clear();
    });
});

function getTotalIncome() {
    let totalIncome = 0;
    soldTickets.forEach(function(ticket){
        totalIncome += ticket.price;
    });
    return totalIncome;
}