// Problem: User interaction doesn't provide desired results.
// Solution: Add interactivity so the user can manage daily tasks.

var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks list
var completedTasksHolder = document.getElementById("completed-tasks"); // completed-tasks list

// Planning:

//New task list item

var createNewTaskElement = function (taskString) {
  //create new list item
  var listItem = document.createElement("li");
  
    // input (checkbox)
    var checkBox = document.createElement("input"); //checkbox
    // label
    var label = document.createElement("label");
    // input (text)
    var editInput = document.createElement("input"); //text
    // button.edit
    var editButton = document.createElement("button");
    // button.delete
    var deleteButton = document.createElement("button");
    // Each of these elements needs to be modified
  
  checkBox.type = "checkbox";
  editInput.type = "text";
  
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  
  label.innerText = taskString;
  
  //Each of these elements needs to be appended
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  return listItem;
};

// Add new task
var addTask = function () {
  console.log("Add task");
  // Create a new list item with the text from #new-task:
  var listItem = createNewTaskElement(taskInput.value);
  if(taskInput.value) {
    //Append listItem to incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
  } else {
   alert("Please enter the text!"); 
  }
};


// Edit an existing task
var editTask = function () {
  console.log("Edit task");
var listItem = this.parentNode;
  
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  var containsClass = listItem.classList.contains("editMode");
  var editButton = listItem.querySelector("button.edit");
    // if the class of the parent is .editMode
  if (containsClass) {
      // Switch from .editMode
      // label text to become the input's value
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
      // Switch to .editMode
      // input's value becomes the label's text
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

    // Toggle .editMode on the listItem
  listItem.classList.toggle("editMode");
};

// Delete existing task
var deleteTask = function () {
  console.log("Delete task");
  
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  
  // Remove the parent list item from the ul
  ul.removeChild(listItem);
};


// Mark a task as complete
var taskCompleted = function () {
  console.log("Completed task");
   // Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};


// Mark a task as incomplete
var taskIncomplete = function () {
  console.log("Incomplete task");
  // Append the task list item to the #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function (taskListItem, checkboxEventHandler) {
  console.log("Bind list item events");
  //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var deleteButton = taskListItem.querySelector("button.delete");
  var editButton = taskListItem.querySelector("button.edit");
  //bind editTask to editButton
  editButton.onclick = editTask;
  //bind deleteTask to deleteButton
  deleteButton.onclick = deleteTask;
  //bind checkboxEventHandler to the checkbox
  checkBox.onchange = checkboxEventHandler;
};

// Set the click handler to the addTask function
addButton.addEventListener("click", addTask);

//cycle over incompleteTasksHolder ul list items
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
    //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//cycle over completeTasksHolder ul list items
  for(var i = 0; i < completedTasksHolder.children.length; i++) {
    //bind events to list item's children (taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

