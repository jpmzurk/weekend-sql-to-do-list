console.log('js');

$(document).ready(function () {
    console.log('JQ');
    clickListeners();
    keypressListeners()
    getTasks();
});

function clickListeners() {
    $('#addButton').on('click', postTask);
    $('#postedTasks').on('click', '.edit', editTasks);
    $('#postedTasks').on('click', '.deleteBtn', deleteTasks);
    $('#postedTasks').on('click', '.success', completeTask);
    $('#postedTasks').on('click', '.notSuccess', incompleteTask)
    $('#postedTasks').on('click', '.cancel', cancelEdit);
    $('#postedTasks').on('click', '.move', movingTasks);
}

function keypressListeners(){

    $('#addTask').keyup(function (e) {
        if (e.which === 13){
            postTask();
        } else if (e.which ===27){
            cancelEdit();
        }
    })
}

function getTasks() {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log('current tasks', response);
        appendTasks(response);
    }).catch(function (error) {
        console.log(error, 'error in getTasks');
    });
}

function appendTasks(tasks) {
   
    $('#postedTasks').empty();

    let radioButtons =
        (`<div class="btn-group btn-group-toggle radio addTarget" data-toggle="buttons">
        <label class="btn btn-secondary active">
        <input type="radio" class="notSuccess" autocomplete="off" checked> Incomplete </label>
        <label class="btn btn-secondary ">
        <input type="radio" class="success" autocomplete="off"> Complete </label> </div>`);
        

    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let tr = $('<tr></tr>');
        tr.data('task', task);
        tr.append(`<td>${task.name}</td>`)
        tr.append(`<td>${task.when}</td>`)
        tr.append(`<td>${task.location}</td>`)
        tr.append(`<td>${task.notes}</td>`)
        tr.append(`<td>${radioButtons}</td>`)
        tr.append(`<td><button class="deleteBtn btn btn-outline-secondary">Delete</button></td>`);
        tr.append(`<td><button class="edit btn btn-outline-secondary">Edit</button></td>`);
        $('#postedTasks').append(tr);
    }
}

function postTask() {

    let taskToSend = {
        name: $('#nameOfTask').val(),
        when: $('#whenComplete').val(),
        location: $('#location').val(),
        notes: $('#notesIn').val()
    }
    console.log(taskToSend);

    if (taskToSend.name === '' || taskToSend.when === '') {
        alert('please enter a name and when')
    } else {
        $.ajax({
            method: 'POST',
            url: '/tasks',
            data: taskToSend

        }).then(function (response) {
            console.log('server response', response);
            getTasks();
            $('#nameOfTask').val(''),
                $('#whenComplete').val(''),
                $('#location').val(''),
                $('#notesIn').val('')

        }).catch(function (error) {
            console.log('error');
            alert('there is a problem with server')
        })
    }
}

function deleteTasks() {
    let clickedId = $(this).closest('tr').data('task').id;
    console.log(clickedId);
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${clickedId}`
    }).then(function (response) {
        console.log('deleteTasks');
        getTasks();
    }).catch(function (error) {
        console.log('error attempting to delete', error);
    });
}

function editTasks() {
    let $currentRow = $(this).closest('tr');
    let $theseTds = $(this).closest('tr').children('td');
    let enableEditable = ($currentRow).prop('contenteditable', true);
    let cancelButton = '<td> <button class="cancel btn btn-outline-secondary"> Cancel </button> </td>';
    let cancelButtonLocation = ($currentRow).find('.cancel').remove();
    
    //get edited task data
    let task = {};
    task.id = $(this).closest('tr').data('task').id;
    task.name = $theseTds.eq(0).text();
    task.when = $theseTds.eq(1).text();
    task.location = $theseTds.eq(2).text();
    task.notes = $theseTds.eq(3).text();

    //if user is done editing
    if ($(this).text() == 'Done') {
        $(this).closest('tr').prop('contenteditable', false);  
        $(this).html('Edit');
        $(cancelButtonLocation).remove();

        //update data-task object
        $currentRow.data('task', task);
        postEditedTasks(task);
    
    } // if user is beginning to edit
        else if ($(this).text() == 'Edit') {
        $(enableEditable);
        $currentRow.append(cancelButton)
        $(this).html('Done')
    }
}

function postEditedTasks(task) {
    $.ajax({
        method: 'PUT',
        url: `/tasks/edited`,
        data: task
    }).then(function (response) {
        console.log('in postEditedTasks', response);
        getTasks();
    }).catch(function (error) {
        console.log('this is the error', error);
    })
}

function cancelEdit() {
    console.log('in cancelEdit');

     //disable editing ability
    $(this).closest('tr').prop('contenteditable', false);
     
    //these tds in the row
    let currentTdsInRow = $(this).closest('tr').children('td');

    //edit button
    let editBtb = `<button class="edit btn btn-outline-secondary">Edit</button>`;
    let cancelButtonLocation = $(this).closest('tr').children('td').eq(7);

    //get pre-edit task data 
    let preEditTask = $(this).closest('tr').data('task');
    
    //empty necessary tds
    currentTdsInRow.eq(0).empty();
    currentTdsInRow.eq(1).empty();
    currentTdsInRow.eq(2).empty();
    currentTdsInRow.eq(3).empty();
    currentTdsInRow.eq(6).empty();
    $(cancelButtonLocation).remove();
    
     //set those same tds with pre-edit data
    currentTdsInRow.eq(0).append(preEditTask.name)
    currentTdsInRow.eq(1).append(preEditTask.when)
    currentTdsInRow.eq(2).append(preEditTask.location)
    currentTdsInRow.eq(3).append(preEditTask.notes)
    currentTdsInRow.eq(6).append(editBtb);

    
     
}

function completeTask(){
    let moveTaskBtn = `<label class="btn btn-secondary move">
    <input type="radio" class="notSuccess" autocomplete="off"> Move Task </label>`;

    if ($(this).is(':checked') === true ) {
        $(this).parents('tr').addClass('green');
        $(this).closest('tr').find('.addTarget').append(moveTaskBtn)
    } 


}

function incompleteTask(){
    
    if ($(this).is(':checked') === true ) {
        $(this).parents('tr').removeClass('green');
        $(this).closest('tr').find('.move').remove();
    }
}

function movingTasks (){
    console.log('in move task');

    let currentRowData = $(this).closest('tr').data('task')

    $(this).closest('tr').remove();
    $('#completed').empty();
    
    let successTable = 
    `<h2 class="tableTwoHeader">Completed Tasks</h2>
    <div class="table-responsive table-hover table-complete">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>When</th>
            <th>Where</th>
            <th>Notes</th>
            <th>Time Complete</th>
          </tr>
        </thead>
        <tbody class="completeTasks">
        </tbody>
      </table>
    </div>`
    
    $('#completed').append(successTable);

}

// function postCompleteTasks(task) {
//     $.ajax({
//         method: 'PUT',
//         url: `/tasks/completeTable`,
//         data: task
//     }).then(function (response) {
//         console.log('in postEditedTasks', response);
//         getTasks();
//     }).catch(function (error) {
//         console.log('this is the error', error);
//     })
// }