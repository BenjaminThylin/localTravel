$(document).ready(function(){
    let storageString = localStorage.getItem("boughtTickets"); //loads sold tickets stats
    if(storageString !== null && storageString !== undefined)
        soldTickets = JSON.parse(storageString);
    //populates discount stats element
    let discountStatsElement = $("#discount-count");
    let discountStats = {};
    discount.forEach(function(type){ // inits discountStats
        discountStats[type.id] = 0;
    });
    soldTickets.forEach(function(ticket){ //displays stats regarding discount types 
        discount.forEach(function(type){
            if(type.id == ticket.discount){ //checks if discount type exists
                discountStats[ticket.discount]++;
            }
        });
    });
    discount.forEach(function(type){
        discountStatsElement.append(getDiscountStatElement(type.id, discountStats[type.id]));
    });
    //populate ticket type stats element
    let ticketTypeElement = $("#ticket-types-count")
    let ticketTypeStats = {};
    ticketType.forEach(function(type){// inits ticketTypeStats
        ticketTypeStats[type.id] = 0;
    });
    soldTickets.forEach(function(ticket){
        ticketType.forEach(function(type){
            if(type.id == ticket.type){//checks if ticketType exists
                ticketTypeStats[ticket.type]++;
            }
        });
    });
    ticketType.forEach(function(type){
        ticketTypeElement.append(getTicketTypeStatElement(type.id, ticketTypeStats[type.id]));
    });
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