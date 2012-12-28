      var delay;
      // Initialize CodeMirror maineditor with a nice html5 canvas demo.
      var maineditor = CodeMirror.fromTextArea(document.getElementById("completemaineditor"), {
        mode: {name: "xml", alignCDATA: true},
        lineNumbers: true
      });
      maineditor.on("change", function() {
        clearTimeout(delay);
        //document.getElementById('main-container').innerHTML=maineditor.getValue();
        delay = setTimeout(updatePreview, 300);
      });

      function updatePreview() {
        document.getElementById('main-container').innerHTML=maineditor.getValue();
      }
      setTimeout(updatePreview, 300);
      maineditor.setValue(document.getElementById('main-container').innerHTML);//First Time