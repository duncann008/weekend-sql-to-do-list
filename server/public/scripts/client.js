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
    $('tbody').on('click', '#check-complete', checkBox);
}



function renderTasks()  {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then((response) =>   {
        console.log(response);
        $('#task-table').empty();

        for (let task of response)  {
            // doneOrNot(task);
            $('#task-table').append(`
             <tr id="${task.id}">
                 <td>${task.task}</td>
                 <td><input type="checkbox" id="check-complete"></td>
                 <td><button id="delete-button">Delete</button></td>
            </tr>
            `)
        }
    }).catch((error) => {
        console.log('error in GET', error);
    })
}

// function doneOrNot(param)   {
//     if (param.complete === false) {
//         $('#task-table').append(`
//             <tr id="${param.id}">
//                 <td>${param.task}</td>
//                 <td><button class="checkComplete">Complete</button></td>
//                 <td><button id="delete-button">Delete</button></td>
//             </tr>
//         `)
//     }
//     else 
//         $('#task-table').append(`
//             <tr id="${param.id}">
//                 <td>${param.task}</td>
//                 <td>✅</td>
//                 <td><button id="delete-button">Delete</button></td>
//             </tr>
//         `)
// }


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
    
}


function deleteTask()   {
    console.log(this);
}

function checkBox() {
    console.log('Checked the box');
}