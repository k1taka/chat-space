$(document).on('turbolinks:load', function(){


$(function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image? `<img src= ${ message.image} class="message__text__image">` : "";
    var html = `<div class="message" data-id= ${message.id}>
                  <div class="message__uper-info">
                    <p class="message__uper-info__talker">
                      ${message.user_name}
                    </p>
                    <p class="message__uper-info__date">
                      ${message.created_at}
                    </p>
                  </div>
                    <p class="message__text">
                    </p>
                    <p class="message__text__content">
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
        $('#new_message')[0].reset();
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function(){
        alert('メッセージを入力して下さい。');
      })
    })  

    var reloadMessages = function() {

      url = window.location.href
      if(url.match(/\/groups\/\d+\/messages/)){

      var last_message_id = $('.message:last').data('id');
      var group_id = $('.chat-main').data('group-id')

      $.ajax({
        url: `/groups/${group_id}/api/messages`,
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
      var insertHTML = '';

      messages.forEach(function(message){
      var html = buildHTML(message);
      insertHTML += html;
      $(".messages").append(insertHTML);
      $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, 'fast');
      });

      })
      .fail(function() {
        alert('自動更新が失敗しました。');
      });
    };
  }
    setInterval(reloadMessages, 5000);
   });
});