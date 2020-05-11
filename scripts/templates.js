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
    switch (ticket.type) {
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
                <h4>Tid: ' + ticket.departure + ' ---> '+ ticket.arrival +'</h4>\
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
                <input class="btn" id="remove-ticket-' + ticket.id + '" type="button" value="Ta bort">\
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
        output += '<div class="col-md-12 m-4 border" id="search-item-' + data.id + '-' + time.departure + '">\
                    <div class="col-md-12">\
                        <div class="display-4 mb-2">'+ data.from +' --> '+ data.to +'</div>\
                    </div>\
                    <div class="col-md-12">\
                        <div class="display-5 mb-2">'+ time.departure +' --> ' + time.arrival + '</div>\
                    </div>\
                    <div id="input-ticket-options-id-'+ data.id +'-'+ time.departure +'" class="form-group row no-display">\
                        <div class="col-md-2">\
                            <label for="ticket-type">Biljettyp:</label>\
                            <select class="form-control" id="ticket-type-'+ data.id +'-'+ time.departure +'">\
                                <option value="once">Enkelbiljett</option>\
                                <option value="10-times">10-gångs kort</option>\
                                <option value="month">Månadskort</option>\
                            </select>\
                        </div>\
                        <div class="col-md-2">\
                            <label for="discount-type">Rabattyp:</label>\
                            <select class="form-control" id="discount-type-'+ data.id +'-'+ time.departure +'">\
                                <option value="regular">Vuxen</option>\
                                <option value="child">Barn</option>\
                                <option value="student">Studerande</option>\
                                <option value="senior">Pensionär</option>\
                                <option value="unemployed">Arbetslös</option>\
                            </select>\
                        </div>\
                        <br>\
                        <div class="col-md-2">\
                            <button class="btn ticket-add-to-cart" id="add-to-cart-id-'+ data.id +'-'+ time.departure +'" type="button">Lägg till biljett i köpkorg</button>\
                        </div>\
                    </div>\
                    <div class="text-center">\
                        <button class="btn pricetag" id="ticket-info-id-'+ data.id +'-'+ time.departure +'" type="button">'+ time.price +'€</button>\
                    </div>\
                </div>';
    });
    return output;
}
/**
 * returns alteration form element for a ticket
 * @param {TimeTableItem} ticket null by default, if left as null it will return a empty alteration form for a new ticket 
 */
function getTicketAlterationTemplate(ticket = null)
{

    if(ticket != null){
        let times = "";
        ticket.times.forEach(function(time){
            times += getTicketTimeAlterationElements(time);
        });
        let days = getTicketDaysElements(ticket.days);
        return '<div class="col-md-12 m-4 border" id="ticket-'+ ticket.id +'">\
                            <div class="col-md-12">\
                                <div class="display-4 mb-2">' + ticket.from + '->' + ticket.to + '</div>\
                            </div>\
                            <div id="ticket-options-' + ticket.id + '" class="form-group row no-display">\
                                <div class="col-12 font-weight-bold">\
                                    Dagar:\
                                </div>\
                                <div class="col-12 p-4">\
                                    <div class="row border-bottom">'
                                        + days +
                                    '</div>\
                                </div>'
                                + times +
                                '<div class="col-12 text-center mt-2">\
                                    <input class="btn ticket-add-to-cart" id="input-add-to-timetable-' + ticket.id + '" type="button" value="Spara biljett">\
                                </div>\
                            </div>\
                            <div class="text-center">\
                                <input class="btn pricetag" id="input-show-options-' + ticket.id + '" type="button" value="EDIT">\
                            </div>\
                        </div>';
    }

    function getTicketTimeAlterationElements(time)
    {
        return '<div class="col-12">\
                    <form>\
                    <div class="form-row">\
                            <div class="col-6 form-group">\
                                <label for="input-time">Avfärdstid</label>\
                                <input type="text" class="form-control" value="' + time.departure + '" id="input-time-'+ time.id +'">\
                            </div>\
                            <div class="col-6 form-group">\
                                <label for="input-time">ankomstid</label>\
                                <input type="text" class="form-control" value="' + time.arrival + '" id="input-time-'+ time.id +'">\
                            </div>\
                    </div>\
                    <div class="form-row border-bottom">\
                            <div class="col-6 form-group">\
                                <label for="input-time">price</label>\
                                <input type="text" class="form-control" value="' + time.price + '"id="input-price-'+ time.id +'">\
                            </div>\
                            <div class="col-3 form-group">\
                                <br>\
                                <input class="btn mb-2" id="input-save-time-'+ time.id +'" type="button" value="Spara tid">\
                            </div>\
                            <div class="col-3 form-group">\
                                <br>\
                                <input class="btn mb-2" id="input-remove-item-'+ time.id +'" type="button" value="Ta bort tid"></button>\
                            </div>\
                    </div>\
                    </form>\
                </div>';
    }
    function getTicketDaysElements(days)
    {
        daysString = ["mon","tis", "ons", "tor", "fre", "lör", "sön"];
        let output = "";
        for(let i = 0; i < days.length; i++)
        {
            output += '<div class="col-lg-1 col-md-12">\
                            <div class="custom-control custom-checkbox">\
                                <input type="checkbox" class="custom-control-input" id="input-edit-day-'+(i+1)+'-id' + ticket.id + '">\
                                <label class="custom-control-label" for="input-edit-monday">' + daysString[i] + '</label>\
                            </div>\
                        </div>'            
        }
        return output;
    }
}
