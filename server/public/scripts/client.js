console.log('JS');

$(document).ready(onReady);

function onReady()  {
    console.log('jQuery');
    renderTasks();
    clickHandlers();
}


function clickHandlers()    {
    $('#submitTask').on('click', submitTask);
    $('tbody').on('click', '#delete-button', deleteTask);
    $('tbody').on('click', '#check-complete', updateTask);
    
}



function renderTasks()  {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then((response) =>   {
        console.log(response);
        $('#task-table').empty();

        for (let task of response)  {
            doneOrNot(task);
        }
    }).catch((error) => {
        console.log('error in GET', error);
    })
}

function doneOrNot(param)   {
    if (param.complete === false) {
        $('#task-table').append(`
            <tr data-id="${param.id}">
                <td>${param.task}</td>
                <td><input type="checkbox" class="false" id="check-complete" value="${param.id}" data-complete="${param.complete}"></td>
                <td><button class="delete" id="delete-button">Delete</button></td>
            </tr>
        `)
    }
    else 
        $('#task-table').append(`
            <tr data-id="${param.id}">
                <td>${param.task}</td>
                <td><input type="checkbox" class="true" id="check-complete" value="${param.id}" data-complete="${param.complete}" checked></td>
                <td><button class="delete" id="delete-button">Delete</button></td>
            </tr>
        `)
}


function addTask(taskToAdd)  {
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskToAdd
    })
    .then((response) => {
        renderTasks();
        console.log('response:', response)
    })
    .catch((error) =>   {
        console.error(error);
    })
}

function submitTask()   {

    console.log('Submit click');

    let taskToSubmit = {};
    
    taskToSubmit.task = $('#task').val();

    addTask(taskToSubmit);
    
    clearInput();
}

function updateTask() {
    const taskId = $(this).val();
    const currentStatus = $(this).is(':checked');
    
    console.log('taskId', taskId);
    console.log('currentStatus', currentStatus);
    $.ajax({
      type: 'PUT',
      url: `/tasks/${taskId}`,
      data: { currentStatus: currentStatus }
    }).then((res) => {
      renderTasks();
    }).catch((err) => {
      console.error(err);
    })
  }


function deleteTask()   {
    //sweetAlert();
    const taskIdToDelete = $(this).closest('tr').data('id');
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskIdToDelete}`
    }).then((response) => {
        console.log(response);
        renderTasks();
    }).catch((err) => {
        console.error(err);
    })
    };



function clearInput()   {
    $('#task').val('');
    console.log('Inputs cleared');
}

// function sweetAlert(){
//     Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//         if (result.isConfirmed) {
//         Swal.fire(
//             'Deleted!',
//             'Your file has been deleted.',
//             'success'
//         )
//         }
//     })
// };