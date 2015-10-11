//================================================================
// FormSender
//================================================================
var FormSender = (function () {

  function init() {
    _setUpListners();
    _modules();
  }
  // Подключаем прослушку событий
  function _setUpListners() {
    $('form').on('submit', _submitForm);
    $('form').on('keydown', "input, textarea", _removeError);
    $('form input[type="reset"]').on('click', _clearForm);
    $('#btn-add-project').on({
      click: function (e) {
        e.preventDefault();
        _showAddModal();
      }
    });
  };
  // Подключаем модули
  function _modules() {
    _labelInputFile();
  };
  // Обработка сабмита формы
  function _submitForm(e) {
    e.preventDefault();

    var
      $form = $(this),
      url = $form.attr("action"),
      data = $form.serialize(),
      validInput = _validation($form),
      validFile = true;

    if ($('input[type="file"]').length) {
      var validFile = _validationFile($form);
    }

    // Отправляет данные
    if (validInput && validFile) {
      _sendData(data, url)
        .done(function (ans) {
          console.log(ans);
          console.log("Сервер ответил");
          _clearForm();
          _showAddModal().close();
          if ($('#moda-success-project').length) {
            _showSuccessModal();
          }
          if ($('#modaд-success-send').length) {
            _showSuccessSend();
          }
        }).fail(function () {
          console.log('Проблемы на стороне сервера');
          if ($("#error-massage").length) {
            _showErrorMessage().show();
          }
          if ($("#modal-error-send").length) {
            _showErrorSend();
          }
        });
    };
  };
  // Очистка формы
  function _clearForm() {
    var form = $("form");
    form.trigger("reset");
    form.find("input, textarea, label").removeClass("form__error").removeClass("form__success").trigger("hideTooltip");
  }
  // Удаляет подсветку ошибок 
  function _removeError() {
    $(this).removeClass("form__error");
  }
  //Валидация инпутов
  function _validation($form) {
    var
      inputs = $form.find("input")
      .not("input[type='submit']")
      .not("input[type='reset']")
      .not("input[type='file']")
      .not("input[type='checkbox']"),
      textarea = $form.find("textarea"),
      $allInputs = $.merge(inputs, textarea),
      isValid = true;

    $.each($allInputs, function (i, item) {
      var
        $input = $(item),
        val = $.trim($input.val());
      if (!val) {
        _createQtip($input);
        $input.addClass("form__error").removeClass("form__success");
        isValid = false;
      } else {
        $input.addClass("form__success").removeClass("form__error");
      };

    });

    return isValid;

  }
  // Валидация инпута file
  function _validationFile($form) {
    var
      $inputFile = $form.find("input[type='file']"),
      $labelFile = $form.find("label[class='form__input-file']"),
      isValid = true;

    _createQtip($labelFile);
    //$labelFile.trigger("hideTooltip");

    if (!$inputFile.val()) {
      $labelFile.removeClass("form__success").addClass("form__error").trigger("show");
      isValid = false;
      //console.log(this);
    } else {
      $labelFile.removeClass("form__error").addClass("form__success").trigger("hideTooltip");
    };
    $inputFile.change(function () {
      if ($inputFile.val()) {
        $labelFile.removeClass("form__error").trigger("hideTooltip");
      } else {
        $labelFile.removeClass("form__success").trigger("hideTooltip");
      }
    });
    return isValid;
  };
  // Универсальная функция ajax
  function _sendData(data, url) {
    return $.ajax({
      type: "POST",
      url: url,
      dataType: "JSON",
      data: data
    })
  };
  // Показывает окно успешного добавления проекта
  function _showSuccessModal() {
    $('#moda-success-project').bPopup({
      fadeSpeed: 'slow',
      followSpeed: 300,
      modalColor: '#000',
      autoClose: 1000
    });
  };
  // Показывает окно ошибки добавления проекта
  function _showErrorMessage() {
    var
      $errorMessage = $("#error-massage"),
      $errorMessageClose = $errorMessage.find(".error-close");

    return obj = {
      show: function () {
        $errorMessage.addClass("error--visible");
        $errorMessageClose.on("click", function (e) {
          e.preventDefault();
          $errorMessage.removeClass("error--visible");
        });
      },
      hide: function () {
        $errorMessage.removeClass("error--visible");
      }
    }
  };
  // Показывает окно успешной отправки сообщения
  function _showSuccessSend() {
    $('#modaд-success-send').bPopup({
      fadeSpeed: 'slow',
      followSpeed: 300,
      modalColor: '#000',
      autoClose: 1000
    });
  };
  // Показывает окно что сообщение не возможно отправить
  function _showErrorSend() {
    $('#modal-error-send').bPopup({
      fadeSpeed: 'slow',
      followSpeed: 300,
      modalColor: '#000',
      autoClose: 1000
    });
  };
  // Создаёт тултипы
  function _createQtip(el) {

    var position = el.attr('qtip-position');

    // позиция тултипа
    if (position === 'right') {
      position = {
        my: 'left center',
        at: 'right center'
      };
    } else {
      position = {
        my: 'right center',
        at: 'left center'
      };
    }
    //console.log(position);

    var el = el.qtip({
      content: {
        text: function () {
          return $(this).attr('qtip-content');
        }
      },
      show: {
        event: 'show'
      },
      hide: {
        event: 'keydown hideTooltip'
      },
      position: position,
      style: {
        classes: 'qtip-rounded myclass'
      }
    }).trigger('show');
    //el.trigger("hideTooltip");
    //return el;  
  };
  //Заменяем текст лэйбла на значение в поле input file
  function _labelInputFile() {
    var
      $inputFile = $("form input[type='file']"),
      $labelFile = $("form .form__input-file"),
      $labelFileVal = $labelFile.attr("data-attr");

    $inputFile.change(function () {
      if ($inputFile.val()) {
        $labelFile.text($inputFile.val().replace(/.+[\\\/]/, ""));
      } else {
        $labelFile.text($labelFileVal);
      };
    });
  };
  // Показываем модальное окно и при закрытии обнуляем
  function _showAddModal() {
    var
      $modalAddProject = $('#modal-add-project'),
      form = $modalAddProject.find("form"),
      labelFile = form.find(".form__input-file"),
      bPopup = $modalAddProject.bPopup({
        positionStyle: "fixed",
        modalColor: '#000',
        modalClose: false,
        onClose: function () {
          form.trigger("reset");
          labelFile.text(labelFile.attr("data-attr"));
          _clearForm();
          _showErrorMessage().hide();
        }
      });
    return bPopup;
  };
  // Возвращаем в глобальную область видимости
  return {
    init: init
  };

}());
if ($("form").length) {
  FormSender.init();
};

// Плэйсхолдеры для ie8
(function () {
  $('input, textarea').placeholder();
  $("[type='password']").placeholder().val("");
})();