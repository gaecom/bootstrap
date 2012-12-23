function changeWidthThroughClass ($element,isIncrease) {
    /*if (!$element.hasClass(className)) {
        console.log('Doesnt have that Class')
    };*/
    var className = $element.attr('class').split(" ")[0];//first class
    if (className==='inselection') {
        className = $element.attr('class').split(" ")[1];//second class
    };
    //console.log(className);
    var lastNumber = parseInt(className[className.length-1]) ;
    //console.log(lastNumber);
    var bootstrapClass = className.substr(0,className.length-1);
    //console.log(bootstrapClass);
    if (isIncrease) {
        lastNumber = lastNumber +1 ;
    } else{
        if (lastNumber!==1) {
            lastNumber = lastNumber - 1;
        } else{
            console.log('Cannot be Decreased Further . Deleting the element');
            //function for deleting the element
        };
    };
    var newClass = bootstrapClass + lastNumber;
    console.log(newClass);
    $element.removeClass(className);
    $element.addClass(newClass);
}
function selectRow ($element) {
    console.log('row Selected');
}
function inControlBox ($element,whichElement) {

    if (inSelectionObject.col) {
        inSelectionObject.col.removeClass('inselection');
    };
    if (inSelectionObject.controlBox) {
        inSelectionObject.controlBox.hide();
    };
    if (inSelectionObject.row) {
        inSelectionObject.row.removeClass('inselection');
        console.log('remove row selection');
    };
    if (whichElement==='row') {

        var $optionContainer = $('#rowoptions');
        $('#coloptions').hide();
        inSelectionObject.row = $element;
    };
    if (whichElement==='col') {
        var $optionContainer = $('#coloptions');
        $('#rowoptions').hide();
        inSelectionObject.col = $element;
    };
    console.log(inSelectionObject);
    inSelectionObject.controlBox = $optionContainer;
    var offset = $element.offset();
    $optionContainer.show();
    $optionContainer.css({
        'left' : offset.left,
        'top': offset.top - 60
    });
    console.log('inControlBox');
    $element.addClass('inselection');
}
