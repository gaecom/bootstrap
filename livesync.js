

    var foldFunc_html = CodeMirror.newFoldFunction(CodeMirror.tagRangeFinder);
    var delay = 100;
    var editor = CodeMirror.fromTextArea(document.getElementById("completeeditor"), {
        mode: "text/html",
        lineNumbers: true,
        lineWrapping:true,
        indentUnit :1,
        tabSize :1,
        profile:'xhtml',
        showCursorWhenSelecting:true,
        autofocus:true
        //extraKeys: {"Ctrl-Q": function(cm){foldFunc_html(cm, cm.getCursor().line);}}
    });

    editor.on("change", function() {
    clearTimeout(delay);
    delay = setTimeout(updatePreview, 300);
    });

    editor.on("gutterClick", foldFunc_html);
    editor.setValue(style_html(editor.getValue(),{'indent_size': 1}));

    function updatePreview() {
        $('#main-container').html(editor.getValue());
    }
    function  updateCode() {
        var thehtml = style_html($('#main-container').html(),{'indent_size': 1});
        editor.setValue(thehtml);
    }
var stack=[];
var cursorObject = editor.getCursor();
var line = cursorObject.line;
var ch =  cursorObject.ch;
var currentLine = editor.getLine(line);
var shortenedLine = currentLine.substring(0,ch);
var divtag = currentLine.lastIndexOf('<div');
var enddivtag = currentLine.lastIndexOf('</div>');
if (divtag<enddivtag) {//<div> occurs

};