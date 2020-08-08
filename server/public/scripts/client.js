console.log('js');

console.log('js');

$(document).ready(function () {
  console.log('JQ');
  clickListeners();
  keyListeners();
  getTasks();
}); 


function clickListeners() {
    $('#addButton').on('click', postTask());
    $('#postedTasks').on('click', '.edit', editTasks());
    $('#postedTasks').on('click', '.delete', deleteTasks());
    $('#postedTasks').on('click', '.cancelEdit', cancelEdit());
}

function keyListeners() {
 
    
}


function getTasks() {
    console.log('in get Tasks');
    
    
    appendKoalas();
}

function appendTasks() {
    console.log('in append Koalas');
    
    
}

function postTask() {
    
    let taskToSend = {
        name: $('#nameOfTask').val(),
        age: $('#description').val(),
        gender: $('#when').val(),
        ready_to_transfer: $('#readyForTransferIn').val(),
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