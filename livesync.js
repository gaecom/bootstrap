var foldFunc_html = CodeMirror.newFoldFunction(CodeMirror.tagRangeFinder);
var delay = 100;
var newline;
var shortenedLine;
var divtag;
var enddivtag;
var lineNumber;
var stack=[];
var found ={};
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
    // /clearTimeout(delay);
    //delay = setTimeout(updatePreview, 300);
    updatePreview();
    highlightPreview();
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
function highlightPreview() {
    stack=[];
    var cursorObject = editor.getCursor();
    lineNumber = cursorObject.line;
    var ch =  cursorObject.ch;
    if (ch!==0&&lineNumber!==0)
    {
        $.when(findTag(editor.getLine(lineNumber),ch)).done(function  () {

            if (found!==undefined) {
                var classname = findClassName(found);
                console.log(classname);
                var numberbefore = findbeforeClass(classname,found);
                $($('#main-container').find('.'+classname).get(numberbefore)).addClass('inselection');
            };
        });
    };
}
function findbeforeClass  (classname,found) {
    if (found.line===0) {
        return 0;
    }
    else{
        lineNumber = found.line - 1;
        var number=0;
        while(lineNumber!==0)
        {
            var k = editor.getLine(lineNumber).indexOf(classname);
            if (k!==-1) {
                number=number+1;
            };
            lineNumber=lineNumber-1;
        }
        return number;
    };
}
function findClassName (found) {
    console.log(found);
    var classstring = editor.getLine(found.line).substring(found.ch,editor.getLine(found.line).length);
    var rowfound = classstring.indexOf('row-fluid');
    if (rowfound!==-1) {
        return "row-fluid";
    } else{
        var k = classstring.match(/span./);
        if (k!==null) {
            return classstring.match(/span./)[0];
        } else{
            console.log("Notfound");
        };
    };
}
function findTag (line,ch) {

    shortenedLine = line.substring(0,ch);
    divtag = shortenedLine.lastIndexOf('<div');
    enddivtag = shortenedLine.lastIndexOf('</div>');
    if (divtag===-1 && enddivtag ===-1) { // None Are Present
        //ITS THE FIRST LINE
        if (lineNumber===0) {
            console.log('Couldnt be Found');
        }
        else{
            lineNumber = lineNumber-1;
            newline = editor.getLine(lineNumber);
        // GO TO PREVIOS LINE //
            findTag(newline,newline.length);
        };
    }
    else if (divtag>enddivtag && stack.length===0) {//<div> occurs
        // This Divtag is the one we are looking for  //
        console.log('FOUND at '+divtag);
        found = {};//Object to be Returned
        found.line=lineNumber;
        found.ch=divtag;
        console.log(found);
        return found;
        // END THE LOOP //
    }
    else if(divtag>enddivtag && stack.length!==0){//<div> occurs
        stack.pop();//Remove The last </div> Present
        findTag(line,divtag);
    }
    else if(enddivtag>divtag){//</div> occurs
        stack.push('</div>');
        findTag(line,enddivtag);
    }
    else{
        console.log('Couldnt Find The Div Tag');
    };

}