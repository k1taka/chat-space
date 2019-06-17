$(document).on('turbolinks:load', function(){


$(function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message">
                  <div class="message__uper-info">
                    <p class="message__uper-info__talker">
                      ${message.user_name}
                    </p>
                    <p class="message__uper-info__date">
                       ${message.created_at}
                    </p>
                  </div>

                    <p class="message__text">
                    </p><p class="message__text__content">
                      ${content}
                    </p>
                    <img class="message__text__image" src="${img}">

                </div>`

    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
     })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html)
        $('#message_content').val('')
      })
      .fail(function(){
        alert('エラーが発生したためメッセージは送信できませんでした。');
      })
  })  
});

});
