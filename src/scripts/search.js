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
  console.log(getUrlVars());
  setPageDependingOnType();


});

//helper functions
function setPageDependingOnType() {
  //Group policy is the default layout
  switch (getUrlVars().type.toUpperCase()) {
    case "PENDINGQUOTE":
      $("#status").val("1000");
      $(".client-status").text("Quoted");

      break;
    case "ACTIVE":
      $("#status").val("1004");
      $(".pending-icon").hide();
      break;
    case "CANCELLED":
      $("#status").val("4");
      $(".pending-icon").hide();
      $(".fa-pencil-alt").hide();
      $(".fa-file-alt").hide();
      $(".client-status").text("Cancelled");
      break;
    case "NOTTAKEN":
      $("#status").val("8");
      $(".pending-icon").hide();
      $(".fa-file-alt").hide();
      $(".client-status").text("Not Taken Up");
      break;
    case "AMENDREQUEST":
      $("#status").val("1004");
      $(".fa-thumbs-up").hide();
      $(".fa-times").hide();
      $(".client-status").text("Active");
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
