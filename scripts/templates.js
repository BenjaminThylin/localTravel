function getTicketTemplate(ticketIndex){
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
    </div>'
}