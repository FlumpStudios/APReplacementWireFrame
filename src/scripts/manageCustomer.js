let customerDetail = {
    customerName: "",
    postcode: "",
    email: "",
    telephone: "",
    firstContact: "",
    deferredSalesStatusID: "",
    customerInitiated: false
  };
  


$(document).ready(function(){
    $("[data-toggle=popover]")
    .popover({html:true})
});
