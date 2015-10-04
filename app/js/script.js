;
(function ($) {
  $(function () {
    $('#btn-add-project').bind('click', function (e) {
      e.preventDefault();
      $('#moda-add-project').bPopup({
        fadeSpeed: 'slow',
        followSpeed: 300,
        modalColor: '#000',
      });
    });
  });

})(jQuery);

(function ($) {
  $(function () {
    $('#add-button').bind('click', function (e) {
      e.preventDefault();
      $('#moda-success-project').bPopup({
        fadeSpeed: 'slow',
        followSpeed: 300,
        modalColor: '#000',
      });
    });
  });

})(jQuery);

$(function () {
  var
    button = $("#add-button"),
    input = $(".form__input"),
    inputFile = $("input[type='file']"),
    labelFile = $(".form__input-file"),
    inputLenght = input.length,
    inputObj = {},
    keyObj = "";

  button.click(function (e) {
    e.preventDefault();
    for (var i = 0; i < inputLenght; i++) {
      keyObj = input.eq(i).attr("name");
      inputObj[keyObj] = input.eq(i).val();
    }
    console.log(inputObj);
  });

  inputFile.change(function () {
    labelFile.text(inputFile.val().replace(/.+[\\\/]/, ""));
  });

});