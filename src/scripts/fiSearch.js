/*******************
 **  PAGE DATA    **
 *******************/
let searchResults = [
    {
      salesPerson: "",
      referenceNumber: "",
      customerName: "",
      status: "",
      vrn: "",
      vin: "",
      lastUpdatedDate: "",
      deliveryDate: ""
    }
  ];
  
  /***************
   ** PAGE CODE **
   ***************/
  
  $("document").ready(() => {
    $("#sale-date-from").datepicker({
      uiLibrary: "bootstrap4"
    });
    $("#sale-date-to").datepicker({
      uiLibrary: "bootstrap4"
    });

    $("#delivery-date-from").datepicker({
        uiLibrary: "bootstrap4"
      });

      $("#delivery-date-to").datepicker({
        uiLibrary: "bootstrap4"
      });
  
      $("#delivery-date-from").val(moment().startOf('month').format("DD/MM/YYYY"));
      $("#delivery-date-to").val(moment().endOf('month').format("DD/MM/YYYY"));

    setPageDependingOnType();
  });
  
  //helper functions
  function setPageDependingOnType() {
    //Group policy is the default layout
    switch (getUrlVars().type.toUpperCase()) {
      case "INPROGRESS":
        $("#status").val("1001"); 
        $(".table-status").text("In Progress");
        break;
      case "FINALISED":
        $("#status").val("4");
        $(".table-status").text("Finalised");
        $(".fa-file-alt").hide();
        
        break;
      case "CANCELLED":
        $("#status").val("0");
        $(".table-status").text("Cancelled");
        $(".fa-file-alt").hide();
        break;
 
      default:
        console.log("either no query string found or query string is invalid");
        break;
    }
  }
  
  function getUrlVars() {
    let vars = [],
      hash;
    let hashes = window.location.href
      .slice(window.location.href.indexOf("?") + 1)
      .split("&");
    for (let i = 0; i < hashes.length; i++) {
      hash = hashes[i].split("=");
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  }
  