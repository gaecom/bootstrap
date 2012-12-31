(function ($, undefined) {
    $.fn.getCursorPosition = function() {
        var el = $(this).get(0);
        var pos = 0;
        if('selectionStart' in el) {
            pos = el.selectionStart;
        } else if('selection' in document) {
            el.focus();
            var Sel = document.selection.createRange();
            var SelLength = document.selection.createRange().text.length;
            Sel.moveStart('character', -el.value.length);
            pos = Sel.text.length - SelLength;
        }
        return pos;
    }
})(jQuery);
function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function setCaretToPos (input, pos) {
  setSelectionRange(input, pos, pos);
}
var textarea = $('textarea');
textarea.on("click",function  () {
    $('.inselection').removeClass('inselection');
    $('.optionbox').hide();
});
textarea.on("keyup", function(e) {
    console.log(e.keyCode);
    if (e.keyCode===9) {//TAB or SPACE
        updatePreview();
    };
});
function updatePreview(content) {

    console.log('updatePreview');
    var pos = $('#completeeditor').getCursorPosition();
    console.log(pos);
    var thehtml = $('textarea').val();
    inSelectionObject.html =  thehtml;
    $('#main-container').html(thehtml);
    setCaretToPos(document.getElementById("completeeditor"), pos);

}
$('#main-container').on("DOMSubtreeModified",updateCode);
function  updateCode() {
    console.log('updateCode');
        inSelectionObject.html = style_html($('#main-container').html());
        textarea.val(inSelectionObject.html);
}