/* global firebase */

var shareddatabase = firebase.database();

var chatlimit = 100;

var database_refname = "Public-Object-Chat-dev"

$(document).ready(function() {
                
$("#sculptorname").on("keyup", function(event) {
    if (event.keyCode === 13) {
      submitCommand();
    }
  });
                  

  // when we click on it, change the database
  $("#submitCommand").click(submitCommand);

  function submitCommand() {
    
    var data = {
      timestamp: Date.now(),
      Sculptor: $("#sculptorname").val(),
      Command: $("#commandInput").val()
    };

    $("commandInput").val("");
    
    console.log(data);
    shareddatabase.ref("Public-Object-Chat-dev").push(data);
  }

  var chatlimit = 100;

  // when the database changes, change the website
  shareddatabase.ref("Public-Object-Chat-dev").orderByChild("timestamp").limitToLast(chatlimit).on("value", function(snapshot) {
    
    
    
      var chats = snapshot.val();

      $(".chatcontainer").empty();

      var url;
    
    
    
      for (var k in chats) {
      

        $(".chatcontainer").append(`
        <div class="messagecontainer">
          <div class="messagename">${chats[k].Sculptor}</div>
          <div class="messagetext"> ${chats[k].Command}</div>
          
        </div>`);

      }

    
});
});