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
        let paymentMethod, type;
        switch (ticket.paymentMethod) {
            case "cash":
                paymentMethod = "Kontant";
                break;
            case "cashapp":
                paymentMethod = "Betalapp";
                break;
            case "visa":
                paymentMethod = "Visa";
                break;
            default:
                paymentMethod = "Annat";
                break;
        }
        switch (ticket.type) {
            case "once":
                type = "Engångsbiljett";
                break;
            case "10-times":
                type = "10-gångskort";
                break;
            case "month":
                type = "Månadskort";
                break;
            default:
                type = "Annan biljett";
                break;
        }
        statsTableBody.append(
            `<tr>
            <td>`+ ticket.from + `</td>
            <td>`+ ticket.to + `</td>
            <td>` + ticket.date + `</td>
            <td>` + ticket.departure + `</td>
            <td>` + type + `</td>
            <td>` + ticket.price + `</td>
            <td>` + paymentMethod + `</td>
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