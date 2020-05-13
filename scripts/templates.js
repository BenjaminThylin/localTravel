/**
 * returns an option element with passed value and text
 * @param {string} option the value and name of the option
 * @returns {string} string representing html element
 */
function getOptionTemplate(option)
{
    return '<option value="'+option+'">'+option+'</option>';
}
/**
 * returns a ticket element
 * @param {*} ticket takes a ticket object as data
 * @returns {string} string representing html element
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
 * @returns {string} string representing html element
 */
function getSearchResultTemplate(data)
{
    let output = "";
    data.times.forEach(function(time){
        output += '<div class="col-md-12 m-4 border" id="search-item-' + data.id + '-' + time.departure + '">\
                    <div class="col-md-12">\
                    <div class="mt-2 mb-2"><span><h3 class="d-inline">Från: </span> ' + data.from + '</h3><span class="ml-5"><h3 class="d-inline">Till:</span> ' + data.to + '</h3><span class="ml-5"><h3 class="d-inline">Pris:</span> ' + time.price + '</div>\
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
                            <button class="btn" id="add-to-cart-id-'+ data.id +'-'+ time.departure +'" type="button">Lägg till biljett i köpkorg</button>\
                        </div>\
                    </div>\
                    <div class="text-center p-3">\
                        <button class="btn btn-dark pricetag" id="ticket-info-id-'+ data.id +'-'+ time.departure +'" type="button">&darr;</button>\
                    </div>\
                </div>';
    });
    return output;
}
/**
 * returns alteration form element for a ticket
 * @param {TimeTableItem} ticket if set as null it will return a empty alteration form for a new route 
 * @returns {string} string representing html element
 */
function getTicketAlterationTemplate(ticket)
{
    if(ticket != null){
        let times = "";
        ticket.times.forEach(function(time){
            times += getTicketTimeAlterationTemplate(ticket,time);
        });
        let days = getTicketDaysElements(ticket.days);
        return '<div class="col-md-12 m-4 border" id="ticket-'+ ticket.id +'" name="alter-tickets-element">\
                            <div class="col-md-12">\
                                <div class="mt-2 mb-2"><span>Från: </span><h3 class="d-inline"> ' + ticket.from + '</h3><span class="ml-5"> Till:</span><h3 class="d-inline"> ' + ticket.to + '</h3></div>\
                            </div>\
                            <div id="ticket-options-' + ticket.id + '" class="form-group row no-display">\
                                <div class="col-12 font-weight-bold">\
                                    Dagar:\
                                </div>\
                                <div class="col-12 p-4">\
                                    <div class="row border-bottom">'
                                        + days +
                                        '<div class="col-lg-1 col-md-12">\
                                            <input class="btn" id="input-save-days-' + ticket.id + '" type="button" value="spara">\
                                        </div>\
                                    </div>\
                                </div>\
                                <div id="ticket-times-'+ ticket.id +'">'
                                + times +
                                '</div>\
                                <div class="col-12 text-center mt-2">\
                                    <input class="btn" id="input-add-time-to-timetable-' + ticket.id + '" type="button" value="lägg till tid">\
                                </div>\
                            </div>\
                            <div class="text-right p-3">\
                                <input class="btn btn-dark pricetag" id="input-show-options-' + ticket.id + '" type="button" value="EDIT">\
                            </div>\
                        </div>';
    }else{
        //TODO: Return of empty alteration form not implemented
    }

    function getTicketDaysElements(days)
    {
        daysString = ["mon","tis", "ons", "tor", "fre", "lör", "sön"];
        let checked = "";
        let output = "";
        for(let i = 0; i < 7; i++)
        {
            checked = (days[i]) ? "checked" : "";
            output += '<div class="col-lg-1 col-md-12">\
                            <input type="checkbox" id="input-edit-day-'+ i +'-id-' + ticket.id + '" ' + checked + '>\
                            <label for="input-edit-day-'+ i +'-id' + ticket.id + '">' + daysString[i] + '</label>\
                        </div>'            
        }
        return output;
    }
}
/**
 * returns a time alteration element
 * @param {TimeTableItem} ticket the parent ticket of the time element
 * @param {Time} time a time object 
 * @param {bool} noDisplay, set as false by default, if set to true will set the elements display to none
 * @returns {string} string representing html element
 */
function getTicketTimeAlterationTemplate(ticket, time, noDisplay = false)
{
    let display = (noDisplay) ? " no-display" : "";
    return '<div class="col-12'+ display +'" id="time-option-time-id-' + time.id + '-ticket-id-' + ticket.id + '">\
                <form>\
                <div class="form-row">\
                        <div class="col-6 form-group">\
                            <label for="input-time">Avfärdstid</label>\
                            <input type="text" class="form-control" value="' + time.departure + '" id="input-departure-time-'+ time.id + '-ticket-id-' + ticket.id + '">\
                        </div>\
                        <div class="col-6 form-group">\
                            <label for="input-time">ankomstid</label>\
                            <input type="text" class="form-control" value="' + time.arrival + '" id="input-arrival-time-'+ time.id + '-ticket-id-' + ticket.id + '">\
                        </div>\
                </div>\
                <div class="form-row border-bottom">\
                        <div class="col-6 form-group">\
                            <label for="input-time">price</label>\
                            <input type="text" class="form-control" value="' + time.price + '"id="input-price-'+ time.id + '-ticket-id-' + ticket.id + '">\
                        </div>\
                        <div class="col-3 form-group">\
                            <br>\
                            <input class="btn mb-2" id="input-save-time-'+ time.id + '-ticket-id-' + ticket.id + '" type="button" value="Spara tid">\
                        </div>\
                        <div class="col-3 form-group">\
                            <br>\
                            <input class="btn mb-2" id="input-remove-item-'+ time.id + '-ticket-id-' + ticket.id + '" type="button" value="Ta bort tid"></button>\
                        </div>\
                </div>\
                </form>\
            </div>';
}
