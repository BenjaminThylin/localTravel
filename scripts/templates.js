/**
 * returns an option element with passed value and text
 * @param {*} option the value and name of the option
 */
function getOptionTemplate(option)
{
    return '<option value="'+option+'">'+option+'</option>';
}
/**
 * returns a ticket element
 * @param {*} ticket takes a ticket object as data
 */
function getTicketTemplate(ticket){
    let discountType, ticketType;
    switch (ticket.ticketType) {
        case "once":
            ticketType = "Engångsbiljett";
            break;
        case "10-times":
            ticketType = "10-gångskort";
            break;
        case "month":
            ticketType = "Månadskort";
            break;
    }
    switch (ticket.discount) {
        case "regular":
            discountType = "Vuxen";
            break;
        case "child":
            discountType = "Barn";
            break;
        case "student":
            discountType = "Studerande";
            break;
        case "senior":
            discountType = "Pensionär";
            break;
        case "unemployed":
            discountType = "Arbetslös";
            break;
    }
    return '\
    <div class="border p-2 mb-2" id="ticket-id-' + ticket.id + '" name="cart-item">\
        <div class="row">\
            <div class="col-md-7">\
                <h4>Rutt: ' + ticket.from + '--->' + ticket.to + '</h4>\
            </div>\
            <div class="col-md-5">\
                <h4>Tid: ' + ticket.time.departure + ' ---> '+ ticket.time.arrival +'</h4>\
            </div>\
        </div>\
        <div class="row">\
            <div class="col-md-3">\
                <div>Biljettyp: ' + ticketType + '</div>\
            </div>\
            <div class="col-md-2">\
                <div>Resenär: ' + discountType + '</div>\
            </div>\
            <div class="col-md-2">\
                <div>Pris: ' + ticket.price + '</div>\
            </div>\
            <div class="col-md-5 text-right">\
                <button class="btn" id="remove-ticket-' + ticket.id + '" type="button">Ta bort</button>\
            </div>\
        </div>\
    </div>';
}

/**
 * 
 * @param {*} data takes a timeTable object as input 
 */
function getSearchResultTemplate(data)
{
    let output = "";
    data.times.forEach(function(time){
        output += '<div class="col-md-12 m-4 border" id="search-item-' + data.id + '-' + time.time.departure + '">\
                    <div class="col-md-12">\
                        <div class="display-4 mb-2">'+ data.from +' --> '+ data.to +'</div>\
                    </div>\
                    <div class="col-md-12">\
                        <div class="display-5 mb-2">'+ time.time.departure +' --> ' + time.time.arrival + '</div>\
                    </div>\
                    <div id="input-ticket-options-id-'+ data.id +'-'+ time.time.departure +'" class="form-group row no-display">\
                        <div class="col-md-2">\
                            <label for="ticket-type">Biljettyp:</label>\
                            <select class="form-control" id="ticket-type-'+ data.id +'-'+ time.time.departure +'">\
                                <option value="once">Enkelbiljett</option>\
                                <option value="10-times">10-gångs kort</option>\
                                <option value="month">Månadskort</option>\
                            </select>\
                        </div>\
                        <div class="col-md-2">\
                            <label for="discount-type">Rabattyp:</label>\
                            <select class="form-control" id="discount-type-'+ data.id +'-'+ time.time.departure +'">\
                                <option value="regular">Vuxen</option>\
                                <option value="child">Barn</option>\
                                <option value="student">Studerande</option>\
                                <option value="senior">Pensionär</option>\
                                <option value="unemployed">Arbetslös</option>\
                            </select>\
                        </div>\
                        <br>\
                        <div class="col-md-2">\
                            <button class="btn ticket-add-to-cart" id="add-to-cart-id-'+ data.id +'-'+ time.time.departure +'" type="button">Lägg till biljett i köpkorg</button>\
                        </div>\
                    </div>\
                    <div class="text-center">\
                        <button class="btn pricetag" id="ticket-info-id-'+ data.id +'-'+ time.time.departure +'" type="button">'+ time.price +'€</button>\
                    </div>\
                </div>';
    });
    return output;
}
