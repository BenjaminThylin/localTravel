$(document).ready(function(){
    
    let storageString = localStorage.getItem("boughtTickets");
    if(storageString !== null && storageString !== undefined)
        soldTickets = JSON.parse(storageString);
        
    populateStatsTable(soldTickets);

    $("#statistics-empty").click(function() {
        soldTickets = [];
        localStorage.removeItem("boughtTickets");
        populateStatsTable(soldTickets);
    });
});
function populateStatsTable(data){
    let soldTicketsSpan = $("#totalSoldTickets");
    let statsTableBody = $("#statsTableBody");
    let totalIncome = $("#totalIncome");
    soldTicketsSpan.html(data.length);
    totalIncome.html(getTotalIncome() + "€");
    statsTableBody.html("");
    data.forEach(function(ticket){
        statsTableBody.append(
            `<tr>
            <td>`+ ticket.from + `</td>
            <td>`+ ticket.to + `</td>
            <td>` + ticket.date + `</td>
            <td>` + ticket.departure + `</td>
            <td>` + ticket.type + `</td>
            <td>` + ticket.price + `</td>
            <td>` + ticket.paymentMethod + `</td>
            </tr>`
        )
    });
}
function getTotalIncome() {
    let totalIncome = 0;
    soldTickets.forEach(function(ticket){
        totalIncome += ticket.price;
    });
    return totalIncome;
}