var isImportant = false;
var isAsideVisible = true;

function toggleImportant() {
  let icon = $(".iImportant");
  if (isImportant) {
    icon.removeClass("fas").addClass("far");
    isImportant = false;
  } else {
    icon.removeClass("far").addClass("fas");
    isImportant = true;
  }
}
function toggleDetails() {
  //do the magic
  let aside = $("aside");
  if (isAsideVisible) {
    aside.hide();
    isAsideVisible = false;
  } else {
    aside.show();
    isAsideVisible = true;
  }
}

function saveTask() {
  let title = $("#txtTitle").val();
  let date = $("#txtDueDate").val();
  let location = $("#txtLocation").val();
  let desc = $("#txtDescription").val();
  let participants = $("#txtParticipants").val();
  let color = $("#txtColor").val();

  if(!title){
      alert("error")
      return;
  }

  let theTask = new Task(
    isImportant,
    title,
    desc,
    location,
    participants,
    color,
    date
  );

  $.ajax({
    url: "https://fsdiapi.azurewebsites.net/api/tasks",
    data: JSON.stringify(theTask),
    contentType: "application/json",
    type: "POST",
    success: function (response) {
      let savedTask = JSON.parse(response);
      displayTask(theTask);
      clearTask();
    },
    error: function (details) {
      console.log("Saved failed", details);

      //show an error
    },
  });
}

function clearTask() {
  $("#txtTitle").val("");
  $("#txtDueDate").val("");
  $("#txtLocation").val("");
  $("#txtDescription").val("");
  $("#txtParticipants").val("");
  $("#txtColor").val("");
  isImportant = true;
  toggleImportant();
}

function displayTask(task) {
  let syntax = ` <div class="task" style = "border: 2px solid ${task.color}">
                <div class="task-title">
                    <h5>${task.title}</h5>
                    <p>${task.description}</p>
                </div>

                <div class="task-middle">
                    <label><i class="fas fa-location-arrow"></i> ${task.location}</label>
                    <label>${task.dueDate}</label>
                </div>
            </div>`;

  $(".task-container").append(syntax);
}

function fetchTasks() {
  $.ajax({
    url: "https://fsdiapi.azurewebsites.net/api/tasks",
    type: "GET",
    success: function (response) {
      let allTasks = JSON.parse(response);
      for (let i = 0; i < allTasks.length; i++) {
        let task = allTasks[i];
        if (task.name === "Nick") {
          displayTask(task);
        }
      }
    },
    error: function (details) {
      console.log("Saved failed", details);

      //show an error
    },
  });
}
function deleteTask(){
    $.ajax({
        url: "https://fsdiapi.azurewebsites.net/api/tasks/clear/Nick",
        type: "Delete",
        success: function(){
            $(".task-container").html("")
        }
      });


}
function init() {
  fetchTasks();

  //load data

  //hook events
  $("#btnSave").click(saveTask);

  $(".iImportant").click(toggleImportant);

  $("#btnToggleDetails").click(toggleDetails);

  $("#btnDelete").click(deleteTask)

}

window.onload = init;

/**
 * 1 Button on html
 * 2 Catch the click event and call a function
 * 3 create the function
 * 4. inside the fn, create a ajax request
 * DELETE "https://fsdiapi.azurewebsites.net/api/tasks/clear/<NAME>"

 */