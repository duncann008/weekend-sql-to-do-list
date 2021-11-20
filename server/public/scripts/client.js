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
            <tr data-id="${param.id}" class="unchecked">
                <td>${param.task}</td>
                <td><input type="checkbox" class="false" id="check-complete" value="${param.id}" data-complete="${param.complete}"></td>
                <td><button class="delete" id="delete-button">Delete</button></td>
            </tr>
        `)
    }
    else 
        $('#task-table').append(`
            <tr data-id="${param.id}" class="checked">
                <td>${param.task}</td>
                <td><input type="checkbox" class="true checked" id="check-complete" value="${param.id}" data-complete="${param.complete}" checked></td>
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

    if ($('#task').val() === '')   {
        alert('Maybe come up with a task first.')
    }
    else    {

    addTask(taskToSubmit);
    
    clearInput();

    placeholderTextChange();
    }
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
    let okay = confirm("Are you sure you want to delete a task?");
    if (okay === true)   {
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
}
    else    {
        return;
    }
};



function clearInput()   {
    $('#task').val('');
    console.log('Inputs cleared');
}

let i = 1;

function placeholderTextChange()  {
    
    let placeholderText = [
        'e.g. Mow the lawn.',
        'e.g. Rake the yard.',
        "Okay, that's enough.",
        "Stop while you're ahead.",
        "Continue at your own risk.",
        "Wow, you really called my bluff.",
        'e.g. Mow the lawn.',
        'Haha, tricked you!'
    ];
    
    
    if  (i <= placeholderText.length - 1 && placeholderText[i] === 'Haha, tricked you!'){
        $('#task').attr('placeholder', `${placeholderText[i]}`);
        $("body").addClass("trick-body");
        i++;
        console.log('huh?');
        
    }
    else if (i <= placeholderText.length - 1) {
        $('#task').attr('placeholder', `${placeholderText[i]}`);
        $("body").removeClass("trick-body");
        i++;
    }
    else    {
        i = 0;
        $('#task').attr('placeholder', `${placeholderText[i]}`);
        $("body").removeClass("trick-body");
    };
};



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