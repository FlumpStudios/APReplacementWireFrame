let customerDetail = {
    customerName: "",
    postcode: "",
    email: "",
    telephone: "",
    firstContact: "",
    deferredSalesStatusID: "",
    customerInitiated: false
  };
  
  $(document).ready(function() {
    $("#delivery-date").datepicker({
      uiLibrary: "bootstrap4"
    });
  
    $("#log-date").datepicker({
      uiLibrary: "bootstrap4"
    });
  
    $("[data-toggle=popover]").popover({ html: true });
  
    //Event handelers
    $("#intended-funding").change(e => handleIntendedFundingChange(e));
  
    $("#save-button, #finalise-button").click(() => handleSave());
  });
  
  //Event handlers
  function handleIntendedFundingChange(e) {
    if ($("#intended-funding :selected").text() === "Cash") {
      $("#finance-opportunity").val("1");
    }
  }
  
  function handleSave() {
    if (validateForm("fi-log-form")) {
      alert("Form sumbitted");
    }
  }
  
  //Helper functions
  function validateForm(id) {
    id = `#${id}`;
  
    if ($(id).valid()) {
      return true;
    } else {
      $("#error-list").empty();
      $.each($(id).validate().errorMap, (index, value) => {
        $("#error-list-card").show();
        $("#error-list").append(
          "<li class='error'>" + index + " - " + value + "</li>"
        );
      });
      $("html, body").animate({ scrollTop: 0 }, "slow");
    }
  }
  