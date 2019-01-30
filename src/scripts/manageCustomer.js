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

    $("#customer-initiated-check").change(() => handleCustomerInitiatedChecked());
    $(".confirm-submission").click( () => handleConfirm() )
});

function handleCustomerInitiatedChecked(){
    $('#confirm-modal').modal('show')
}

function handleConfirm(){
  $("#customer-initiated-check").prop("disabled","true");
  $("#confirm-modal").modal("hide");
  $("#question-icon").toggleClass('fa-question-circle fa-check-circle');
  
}