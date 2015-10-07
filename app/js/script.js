"use strict";

//============================================================

/*$(function () {
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

});*/
//============================================================


(function () {



  // Показ модального окна
  //================================================================
  var ModalForm = (function () {

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
          _labelInputFile();
        }
      });
      // Слушаем кнопку сабмита формы
      $('#add-button').on({
        click: function (e) {
          e.preventDefault();
        }
      });
    };

    // Показываем модальное окно и при закрытии обнуляем
    function _showAddModal() {
      $('#modal-add-project').bPopup({
        fadeSpeed: 'slow',
        //followSpeed: 300,
        modalColor: '#000',
        onClose: function () {
          this.find("form.form").trigger("reset");
          $(".form__input-file").text("Загрузите изображение");
        }
      });
    };
    // Показывает окно успешного добавления проекта
    function _showSuccessModal() {
      $('#moda-success-project').bPopup({
        fadeSpeed: 'slow',
        followSpeed: 300,
        modalColor: '#000'
      });
    };

    // Заменяем текст лэйбла на значение в поле input file
    function _labelInputFile() {
      var
        $inputFile = $("input[type='file']"),
        $labelFile = $(".form__input-file"),
        $labelFileVal = $labelFile.text();

      $inputFile.change(function () {
        if ($inputFile.val() !== "") {
          $labelFile.text($inputFile.val().replace(/.+[\\\/]/, ""));
        } else {
          $labelFile.text($labelFileVal);
        };
      });
    };

    // Возвращаем объект (публичные методы) 
    return {
      init: init
    };

  })();

  // Вызов модуля и проверка наличия нужного элемента
  if ($("#modal-add-project").length) {
    ModalForm.init();
  };

  // END Показ модального окна
  //================================================================


})();



// Тултипы
//==================================================================

// Создаёт тултипы
var createQtip = function (el, position) {

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
};

// Показывает тултипы по айдишнику
var showQtip = function (clas) {
  var el = $('.' + clas),
    pos = el.attr('qtip-position');
    createQtip(el, pos);
};

showQtip("js-input");

// END Тултипы
//==================================================================

// Ajax
//==================================================================



// END Ajax
//==================================================================