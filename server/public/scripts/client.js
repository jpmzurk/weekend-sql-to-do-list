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
    $('#postedTasks').val('');
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let tr = $('<tr></tr>');
        tr.data('task', task);
        tr.append(`<td>${task.name}</td>`)
        tr.append(`<td>${task.when}</td>`)
        tr.append(`<td>${task.location}</td>`)
        tr.append(`<td>${task.notes}</td>`)
        $('#postedTasks').append(tr);
    }
    
}

function postTask() {
    let taskToSend = {
        name: $('#nameOfTask').val(),
        when: $('#when').val(),
        location: $('#location').val(),
        notes: $('#notesIn').val()
    }

    $.ajax({
        method: POST,
        url: '/tasks',
        data: taskToSend

    }).then(function (response) {
        console.log('server response', response);
        getTasks();

    }).catch(function (error) {
        console.log('error');
        alert('there is a problem with server')
    })

}

function editTasks () {
    console.log('in editTasks');
    

}

function deleteTasks (){
    console.log('in deleteTasks');

}

function cancelEdit () {
    console.log('in cancelEdit');
    
}