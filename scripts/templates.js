/**
 * 
 * @param {*} ticketIndex takes the ticket counter number as input
 * @param {*} data takes a timeTable object as input 
 */
function getTicketTemplate(ticketIndex, data){
    return '\
    <div id="ticket-nr-' + ticketIndex + '" class="form-group row">\
        <div class="col-md-2">\
            <label for="ticket-type">Biljettyp:</label>\
            <select class="form-control" id="ticket-type-' + ticketIndex + '">\
                <option value="once">Enkelbiljett</option>\
                <option value="10-times">10-gångs kort</option>\
                <option value="month">Månadskort</option>\
            </select>\
        </div class="col-2">\
        <div class="col-md-2">\
            <label for="discount-type">Rabattyp:</label>\
            <select class="form-control" id="discount-type-' + ticketIndex + '">\
                <option value="none">Vuxen</option>\
                <option value="child">Barn</option>\
                <option value="student">Studerande</option>\
                <option value="senior">Pensionär</option>\
                <option value="unemployed">Arbetslös</option>\
            </select>\
        </div>\
        <div class="col-md-2">\
            <div>\
                Pris:\
            </div>\
        </div>\
        <div class="col-md-2">\
            <button class="btn" id="remove-' + ticketIndex + '" type="button">Ta bort</button>\
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
        output += '<div class="col-12 m-4 border" id="searhc-item-'+data.id+'-'+time.time.departure+'">\
                    <div class="col-12">\
                        <div class="display-1 mb-2">'+ data.from +' --> '+ data.to +'</div>\
                    </div>\
                    <div class="col-12">\
                        <div class="display-4 mb-2">'+ time.time.departure +' --> ' + time.time.arival + '</div>\
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
                                <option value="none">Vuxen</option>\
                                <option value="child">Barn</option>\
                                <option value="student">Studerande</option>\
                                <option value="senior">Pensionär</option>\
                                <option value="unemployed">Arbetslös</option>\
                            </select>\
                        </div>\
                        <div class="col-md-2">\
                            <div>\
                                Pris:\
                            </div>\
                        </div>\
                    </div>\
                    <div class="text-center">\
                        <button class="btn" id="ticket-info-id-'+ data.id +'-'+ time.time.departure +'" type="button">'+ time.price +'€</button>\
                    </div>\
                </div>';
    });
    return output;
}
