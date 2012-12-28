      var delay;
      // Initialize CodeMirror editor with a nice html5 canvas demo.
      var editor = CodeMirror.fromTextArea(document.getElementById("codemirror"), {
        mode: {name: "xml", alignCDATA: true},
        lineNumbers: true
      });
      editor.on("change", function() {
        clearTimeout(delay);
        delay = setTimeout(updatePreview, 300);
      });

      function updatePreview() {
        document.getElementById('preview').innerHTML=editor.getValue();
      }
      setTimeout(updatePreview, 300);
      document.getElementById('preview').innerHTML=editor.getValue();//First Time