$(function(){
  function buildHTML(message){
    var html = `<div class="message">
                  <div class="message__uper-info">
                    <p class="message__uper-info__talker">
                      ${message.name}
                    </p>
                    <p class="message__uper-info__date">
                      ${message.created_at}
                    </p>
                  </div>
                  <p class="message__text">
                    </p><p class="message__text__content">
                      ${message.content}
                    </p>
                    <img class="message__text__image" src="${@message.image}">

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
      .done(function(message){
        var html = buildHTML(message);
        $('.messages').append(html)
        $('#message_content').val('')
      })
      .fail(function(){
      })
  })  
});