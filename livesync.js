var delay = 100;
var editor = CodeMirror.fromTextArea(document.getElementById("completeeditor"), {
        mode: {name: "xml", alignCDATA: true},
        lineNumbers: true,
        lineWrapping:true,
        profile:'xhtml'
        });

editor.on("change", function() {
clearTimeout(delay);
delay = setTimeout(updatePreview, 300);
});

function updatePreview() {
            $('#main-container').html(editor.getValue());
}
function  updateCode() {
            var thehtml = style_html($('#main-container').html());
            editor.setValue(thehtml);
}