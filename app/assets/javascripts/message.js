$(document).on('turbolinks:load', function(){


$(function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image } class="message__text__image">` : "";
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
                      ${img}
                </div>`

    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $('.form__submit').removeAttr('data-disable-with')

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
        $('#message_image').val('')
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');

      })
      .fail(function(){
        alert('エラーが発生したためメッセージを送信することができませんでした。');
      })
  })  
});

});
