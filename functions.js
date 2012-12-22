function changeWidthThroughClass ($element,className,isIncrease) {
    if (!$element.hasClass(className)) {
        console.log('Doesnt have that Class')
    };
    var lastNumber = parseInt(className[className.length-1]);
    var bootstrapClass = className.substr(0,className.length-1);
    if (isIncrease) {
        lastNumber = lastNumber +1 ;
    } else{
        if (lastNumber!==1) {
            lastNumber = lastNumber - 1;
        } else{
            console.log('Cannot be Decreased Further . Deleing the element');
            //function for deleting the element
        };
    };
    var newClass = bootstrapClass + lastNumber;
    $element.removeClass(className).addClass(bootstrapClass);
}
function selectRow ($element) {
    console.log('row Selected');
    //$element.on('click',function  () {

    //});
}
function inControlBox ($element) {

    if (inSelectionObject.row) {
        $(inSelectionObject.row).removeClass('inselection');
    };
    var $optionContainer = $('#rowoptions');

    var offset = $element.offset();
    $optionContainer.show();
    $optionContainer.css({
        'left' : offset.left,
        'top': offset.top - 60
    });
    console.log('inControlBox');
    $element.addClass('inselection');
    inSelectionObject.row = $element;
}
