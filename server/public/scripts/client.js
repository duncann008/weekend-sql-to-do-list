console.log('JS');

$(document).ready(onReady);

function onReady()  {
    console.log('jQuery');

}


function renderTasks()  {
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then((response) =>   {
        console.log(response);
        $('#table-tasks').empty();

        for (let task of response)  {

        }
    }).catch((error) => {
        console.log('error in GET', error);
    })
}

function doneOrNot(param)   {
    if (param.complete)
}