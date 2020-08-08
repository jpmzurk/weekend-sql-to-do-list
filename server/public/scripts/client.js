console.log('js');

console.log('js');

$(document).ready(function () {
  console.log('JQ');
  clickListeners();
//   keyListeners();
  getTasks();
}); 


function clickListeners() {
    $('#addButton').on('click', postTask);
    $('#postedTasks').on('click', '.edit', editTasks);
    $('#postedTasks').on('click', '.delete', deleteTasks);
    $('#postedTasks').on('click', '.cancelEdit', cancelEdit);
}

// function keyListeners() {
 
    
// }


function getTasks() {
    console.log('in get Tasks');

    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function(response){
        console.log('current tasks', response);
        appendTasks(response);
    }).catch(function (error){
        console.log(error, 'error in getTasks');
    });
    
}

function appendTasks(tasks) {
    console.log('in append Tasks');
    $('#postedTasks').empty();

    let radioButtons =
        (`<div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-secondary active">
        <input type="radio" name="options" id="option1" autocomplete="off" checked> Incomplete </label>
        <label class="btn btn-secondary">
        <input type="radio" name="options" id="option2" autocomplete="off"> Complete </label> </div>`);

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
    
    if (taskToSend.name === '' || taskToSend.when === ''){
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

function editTasks () {
    console.log('in editTasks');
    let $currentRow = $(this).closest('tr');
    let $thisTd = $(this).closest('tr').children('td');
    let enableEditable = ($currentRow).prop('contenteditable', true);

    if ($(this).text() == 'Done' ){
        $(this).closest('tr').prop('contenteditable', false);
        //change name of button
        $(this).html('Edit');
        //pull in edited text
        let task = {};
        task.id = $(this).closest('tr').data('task').id;
        task.name = $thisTd.eq(0).text();
        task.when = $thisTd.eq(1).text();
        task.location = $thisTd.eq(2).text();
        task.notes = $thisTd.eq(3).text();
        // task.status = $thisTd.eq(4).text();
  
        //update data-bear object
        $currentRow.data('task', task);
        //remove cancel button
        // $(cancelButtonLocation).remove();
       
        postEditedTasks(task);
       
    } else if ($(this).text() == 'Edit' ) {
        $(enableEditable);
        //change name of button
        $(this).html('Done')
     
    }
}

function postEditedTasks(task) {
    $.ajax({
        method: 'PUT',
        url: `/tasks/reSubmit`,
        data: task
    
      }).then(function (response) {
        console.log('in postEditedTasks', response);
        getTasks();
    
      }).catch(function (error) {
        console.log('this is the error', error);
      })
}

function deleteTasks (){
    console.log('in deleteTasks');
    let clickedId = $(this).closest('tr').data('task').id;
    console.log(clickedId);
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${clickedId}`
    }).then(function (response){
        console.log('deleteTasks');
        getTasks();
    }).catch(function (error){
        console.log('error attempting to delete', error);
    })
}

function cancelEdit () {
    console.log('in cancelEdit');
    
}