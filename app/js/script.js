//================================================================
// Показ модального окна добавления проекта
//================================================================
var showModal = (function () {

  // Инициализирует наш модуль
  function init() {
    _setUpListners();
  }
  // Слушатели событий
  function _setUpListners() {
    // Слушаем кнопку добавления проекта 
    $('#btn-add-project').on({
      click: function (e) {
        e.preventDefault();
        _showAddModal();
      }
    });
  };
  // Показываем модальное окно и при закрытии обнуляем
  function _showAddModal() {
    var
      $modalAddProject = $('#modal-add-project'),
      form = $modalAddProject.find("form"),
      labelFile = form.find(".form__input-file");

    $modalAddProject.bPopup({
      //fadeSpeed: 'slow',
      //followSpeed: 300,
      //follow: "false",
      positionStyle: "fixed",
      modalColor: '#000',
      onClose: function () {
        form.trigger("reset");
        labelFile.text(labelFile.attr("data-attr")),
        form.find("input").removeClass("form__error").removeClass("form__success");
        form.find("textarea").removeClass("form__error").removeClass("form__success");
      }
    });
  };
  // Возвращаем объект (публичные методы) 
  return {
    init: init
  };

})();

// Вызов модуля и проверка наличия нужного элемента
if ($("#modal-add-project").length) {
  showModal.init();
};

//================================================================
// Заменяем текст лэйбла на значение в поле input file
//================================================================
(function () {
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
  _labelInputFile();
})();

//================================================================
// Тултипы
//================================================================


/*// Создаёт тултипы
function _createQtip(target) {

  var
    el = target,
    position = el.attr('qtip-position');

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

  el.qtip({
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
};*/



// По клику на инпут показывает тултип
/*$('.js-input').on("click", function (e) {
  var target = e.target,
    $target = $(target);
  $target.addClass("form__error");
  _createQtip($target);
});*/

//================================================================
// Ajax
//================================================================

var FormSender = (function () {

  function init() {
    _setUpListners();
  }
  // Подключаем прослушку событий
  function _setUpListners() {
    $('form').on('submit', _submitForm);
    $('form').on('keydown', "textarea", _removeError);
    $('form').on('keydown', "input", _removeError);
    $('form input[type="reset"]').on('click', "input", _removeError);//note: не работает
  }
  // Обработка сабмита формы
  function _submitForm(e) {
    e.preventDefault();

    var
      $form = $(this),
      url = $form.attr("action"),
      data = $form.serialize();

    // Отправляет данные
    if (_validation($form)) {
      _sendData(data, url)
        .done(function (ans) {
          console.log("Сервер ответил");
          console.log(ans);
          if ($('#moda-success-project').length) {
            _showSuccessModal();
          }
        }).fail(function () {
          console.log('Проблемы на стороне сервера');
          if ($("#error-massage").length) {
            _showErrorMessage();
          }
        });
    };
  }
  // Удаляет подсветку ошибок
  function _removeError() {
    $(this).removeClass("form__error");
    console.log($(this));
  }
  //Валидация
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
        val = $input.val().trim();

      if (!val) {
        _createQtip($input);
        //console.log($input.attr("name") + " " + val);
        $input.addClass("form__error").removeClass("form__success");
        isValid = false;
      } else {
        $input.addClass("form__success").removeClass("form__error");
      };

    });

    return isValid;

  }
  // Универсальная функция ajax
  function _sendData(data, url) {
    return $.ajax({
      type: "POST",
      url: url,
      dataType: "JSON",
      data: data
    })
  }
  // Показывает окно успешного добавления проекта
  function _showSuccessModal() {
    $('#moda-success-project').bPopup({
      fadeSpeed: 'slow',
      followSpeed: 300,
      modalColor: '#000'
    });
  };
  // Показывает окно ошибки добавления проекта
  function _showErrorMessage() {
    var
      $errorMessage = $("#error-massage"),
      $errorMessageClose = $errorMessage.find(".error-close");

    $errorMessage.addClass("error--visible");
    $errorMessageClose.on("click", function (e) {
      e.preventDefault();
      $errorMessage.removeClass("error--visible");
    });
  }
  // Создаёт тултипы
  function _createQtip(target) {

    var
      el = target,
      position = el.attr('qtip-position');

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
    console.log(position);

    el.qtip({
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
  };
  // Возвращаем в глобальную область видимости
  return {
    init: init
  };

}());
if ($("form").length) {
  FormSender.init();
};