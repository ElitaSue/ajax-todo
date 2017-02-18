$(document).ready( () => {
  const getAllTasks = () => {
  $.ajax({
    url: '/tasks',
    type: 'GET',
    dataType: 'JSON'
  }).done( (data) => {
    updateTaskList(data);
  }).fail( (msg) => {
    console.log(msg);
  })
};

 const updateTaskList = (tasks) => {
   let list = $('#task_list');
   list.empty();
   tasks.forEach( (task) => {
     let { _id: id, title, complete } = task;
     $.ajax({
       url: '/tasks/task_template',
       type: 'POST',
       dataType: 'HTML',
       data: { id, title, complete }
   }).done( (data) => {
     list.append(data);
   }).fail( (msg) => {
     console.log(msg);
   });
 });
}

getAllTasks();
  $('#add_task').on('submit', (e) => {
    e.preventDefault();
    let title = $(e.target).children('input').val();

    $.ajax({
      url: '/tasks',
      type: 'POST',
      data: { title },
      dataType: 'JSON'
    }).done( (data) => {
      //We need to update this later
      $('#add_task input').val('');
       getAllTasks();
      console.log(data);
    }).fail( (msg) => {
      console.log(msg);
    });
  });

  $(document).on('change', '#task_list input', (e) => {
    let input = $(e.target);
    const url = `/tasks/${input.attr('id')}`;
    $.ajax({
      url: url,
      type: 'PUT',
      data: { complete: input.is(':checked') }
    }).done( (data) => {
      input.closest('.row').find('.title').toggleClass('checked');
      console.log('Updated');
    }).fail( (msg) => {
      alert("Something went wrong");
      input.attr('checked', !input.is(':checked'));
    });
  });

  $(document).on('click', '.remove-task', (e) => {
  const url = `/tasks/${$(e.target).data('id')}`;  // <= Can't use $(this)
  $.ajax({
    url: url,
    type: 'DELETE',
    dataType: 'JSON'
  }).done( (data) => {
    getAllTasks();
   }).fail( (msg) => {
     console.log(msg);
   });
  });

});