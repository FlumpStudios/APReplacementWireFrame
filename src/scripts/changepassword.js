$("document.html").ready(() => {
    $("#submit-form").click(() => handleSubmit())
    }        
);

function handleSubmit(){
    var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    let newpass = $("#new-password").val();
    let confirmPass = $("#confirm-password").val();
    if ($("#change-password-form").valid()){  
        
        if (mediumRegex.test(newpass)){
         if(newpass !== confirmPass){
            $("#response-message").text("Passwords do not match");     
         }
         else{   
            $("#response-message").text("Password successfully changed");
        }
    }
    else{
        $("#response-message").text("Password does not meet the required strench criteria");
    }
    
    }
}