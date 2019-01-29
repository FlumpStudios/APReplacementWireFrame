$("document").ready(() => {
 $("#submit-button").click(e =>  handleSubmitClick(e));
})

function handleSubmitClick(e){ 
    if ($("#username").val().length > 0){
        $("#reset-message").show();
        $("#error-message").hide();
    }
    else{
        $("#error-message").show();
    }
}