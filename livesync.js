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
    updateCode();
    findinLiveCode();
});
textarea.on("keyup", function(e) {
    console.log(e.keyCode);
    if (e.keyCode===9) {//TAB or SPACE
        updatePreview();
    };
    if (e.keyCode===32||e.keyCode===38||e.keyCode===40) {//ENTER or ARROW Keys
        findinLiveCode();
    };
});

function updatePreview(content) {

    console.log('updatePreview');
    var pos =  textarea.prop('selectionStart');
    console.log(pos);
    var thehtml = $('textarea').val();
    inSelectionObject.html =  thehtml;
    $('#main-container').html(thehtml);
    setCaretToPos(document.getElementById("completeeditor"), pos);

}
//While adding Rows and columns
$('#main-container').on("DOMSubtreeModified",updateCode);
function  updateCode() {
    console.log('updateCode');
        inSelectionObject.html = style_html($('#main-container').html());
        textarea.val(inSelectionObject.html);
}
function findinLiveCode () {
    //console.log('findinLiveCode');
    //String Till Closing Div
    var htmlstring = $('textarea').val();
    var startstring = stringTillCloseDiv(textarea.val(),textarea.prop('selectionStart'));
    var reverse = startstring.split("").reverse().join("");
    var newpos = findOpenDiv(reverse);//Self-looping Function
    var mainstring = startstring.substr(0,startstring.length-newpos-4);
    //Find Out the CLass of the Div
    var divstring = startstring.substr(startstring.length-newpos-4,startstring.length-mainstring.length);
    var itsClass = startstring.substr(mainstring.length+12,divstring.indexOf('">')-12);
    var numberofprev = mainstring.split(itsClass).length-1;
    if (itsClass==='row-fluid') {
        console.log($('#main-container').children('.'+itsClass)[numberofprev]);
    }
    else{
        console.log($('.'+itsClass)[numberofprev]);
    }
    //console.log(posopendiv);
}
function stringTillCloseDiv (string,pos) {
      var htmlstring = textarea.val();
      var endstring = htmlstring.substr(pos,htmlstring.length);//from cursor pos to end
      /*Add a Self-looping Function here similar to findOpenDiv*/
      var closediv = endstring.indexOf('</div>');//to pos of first closing div
      var opendiv = endstring.indexOf('<div>');//Also Check for -1
      /*Different Conditions For Checking the String*/
      var startstring = htmlstring.substr(0,closediv+pos);//from start point to pos of first closing
      return startstring;
}
var stringArray = [];
var startdivreverse = "<div".split("").reverse().join("");
var enddivreverse = "</div>".split("").reverse().join("");

function findOpenDiv (string) {
    var firstopendiv = string.indexOf(startdivreverse);
    var firstclosediv = string.indexOf(enddivreverse);
    console.log(firstopendiv);
    console.log(firstclosediv);
    if (firstopendiv<firstclosediv||firstclosediv===-1) {
        //Open Div Occurs First
        console.log('Open Div Occurs First');
        var element = stringArray.pop() ;
        console.log(element);
        if (element===undefined) {
            //The Last UNIDENTED OPEN DIV
            console.log('Last UNIDENTED Open Div');
            return firstopendiv;
        }
    }

    else{
        //Close Div Occurs First
        console.log('Close Div Occurs First');
        stringArray.push(firstclosediv);
        var newstring = string.substr(firstclosediv+6,string.length);
        console.log(newstring);
        findOpenDiv(newstring);
    }

}