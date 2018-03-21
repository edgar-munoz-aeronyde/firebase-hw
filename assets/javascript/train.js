 // Initialize Firebase

 var config = {
    apiKey: "AIzaSyBWGw1Uw_90AF2a5aeztQc0cswy1QcA1E4",
    authDomain: "project-test-d62d0.firebaseapp.com",
    databaseURL: "https://project-test-d62d0.firebaseio.com",
    projectId: "project-test-d62d0",
    storageBucket: "project-test-d62d0.appspot.com",
    messagingSenderId: "895287015725"
  };
  firebase.initializeApp(config);


  var database = firebase.database();

  $("#submitButton").on("click", function(event) {
event.preventDefault();

var name = $("#trainName-Input").val().trim();
var destination = $("#destination-Input").val().trim();
var trainTime = $("#time-Input").val().trim();
var frequency = $("#frequency-Input").val().trim();

database.ref().push({
name: name,
destination: destination,
trainTime: trainTime,
frequency: frequency,
dateAdded: firebase.database.ServerValue.TIMESTAMP

});

    $("#trainName-Input").val("");
    $("#destination-Input").val("");
    $("#time-Input").val("");
    $("#frequency-Input").val("");

  });


database.ref().on("child_added", function(snapshot){

    var newRow = $("<tr>");
    var tableName = $("<td>").text(snapshot.val().name);
    var tableStart = $("<td>").text(snapshot.val().startDate);
    var calcDate = moment(snapshot.val().startDate, "MM-DD-YYYY");
    var monthsWorked = moment().diff(moment(calcDate), "months")
    var tableWorked = $("<td>").text(monthsWorked);
    var tableRole = $("<td>").text(snapshot.val().role);
    var tableRate = $("<td>").text(snapshot.val().monthlyRate);

    var tableBilled = $("<td>").text(monthsWorked * snapshot.val().monthlyRate);

    newRow.append(tableName).append(tableRole).append(tableStart).append(tableWorked).append(tableRate).append(tableBilled);

    $("#trainInputTable").append(newRow);

 }, function(errorObject) {

    console.log("Errors handled: " + errorObject.code);

 });

