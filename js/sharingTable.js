// Js file created to display the comments by users.
var id = 0;

function addToTable() {
    // Retrieve the input message from user.
    var userName = document.getElementById("name").value;
    console.log(userName);
    var msg = document.getElementById("message").value;

    var rowID = id;
    id++;
    var flag = true;

    // Check that the user input is not empty.
    if (userName == "") {
        $("#empty-name-warning").removeAttr("hidden");
        flag = false;
    } else {
        $("#empty-name-warning").attr("hidden", "true");
    }

    if (msg == "") {
        $("#empty-msg-warning").removeAttr("hidden");
        flag = false;
    } else {
        $("#empty-msg-warning").attr("hidden", "true");
    }

    if (flag) addRow(rowID, userName, msg);
}

// Add one row to the sharing table.
function addRow(rowID, userName, msg) {
    var share = {};
    share.id = rowID;
    share.userName = userName;
    share.msg = msg;

    var markup =
        "<tr" + " id=" + rowID + ">"
        + "<td>" + userName + "</td>"
        + "<td>" + msg + "</td>"
        + "</tr>";

    $("#sharing-table > tbody:last-child").append(markup);
}