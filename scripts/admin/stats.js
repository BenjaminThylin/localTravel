$(".stats-wrapper").ready(function(){
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
    
    soldTickets.forEach(ticket => {
        statsTableBody.append(
            `<tr>
            <td>`+ ticket.from + `</td>
            <td>`+ ticket.to + `</td>
            <td>` + ticket.date + `</td>
            <td>` + ticket.departureTime + `</td>
            <td>` + ticket.type + `</td>
            <td>` + (ticket.regularPrice * getDiscount(ticket.type)) + `</td>
            </tr>`
        )
    });
});

function getTotalIncome() {
    let totalIncome = 0;

    soldTickets.forEach(ticket => {
        totalIncome = totalIncome + (ticket.regularPrice * getDiscount(ticket.type));
    });
    return totalIncome;
}

function getDiscount(discountType) {
    var type = "";
    discount.forEach(discount => {
        if (discount.id == discountType) {
            type = discount.procentage;
        }
    });
    return type;
}