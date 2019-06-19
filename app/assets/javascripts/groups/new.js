$(document).on('turbolinks:load', function(){

  $(function() {
  $("#user-search-field").on("keypress", function() {
    var input = $("#user-search-field").val();
    console.log(input);
  });
});

});


{/* <div class="chat-group-form__search clearfix">
<input class="chat-group-form__input" id="user-search-field" placeholder="追加したいユーザー名を入力してください" type="text">
</div> */}