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
    let selectOutput = '<select id="input-ticket-time-'+ data.id +'" class="form-control">';
    data.times.forEach(function(time){
        selectOutput += '<option value="'+ time +'">'+ time +'</option>';
    });
    selectOutput += "</select>"
    return  '<div class="col-12 m-4 border" id="searhc-item-'+data.id+'">\
                <div class="display-1 mb-2">'+ data.from +' --> '+ data.to +'</div>\
                <form>\
                    <div class="form-group">\
                        <label for="input-ticket-departure">avgångstid:</label>\
                        '+ selectOutput +'\
                        <label>Pris: '+ data.price +'€</label>\
                    </div>\
                </form>\
                <div id="ticket-id-' + data.id + '" class="form-group row">\
        <div class="col-md-2">\
            <label for="ticket-type">Biljettyp:</label>\
            <select class="form-control" id="ticket-type-' + data.id + '">\
                <option value="once">Enkelbiljett</option>\
                <option value="10-times">10-gångs kort</option>\
                <option value="month">Månadskort</option>\
            </select>\
        </div>\
        <div class="col-md-2">\
            <label for="discount-type">Rabattyp:</label>\
            <select class="form-control" id="discount-type-' + data.id + '">\
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
        <div class="text-center">\
            <button class="btn" id="new-ticket-'+ data.id +'" type="button">'+ data.price +'€</button>\
        </div>\
    </div>';
}