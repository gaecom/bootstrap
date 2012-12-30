function changeWidthThroughClass ($element,classContains,isIncrease) {

    /*Code to find the appropriate className*/

    var arrayposition = -1;
    var classNames = $element.attr('class').split(" ");//Array of all Classes
    $(classNames).each(function  (i) {
        if (this.indexOf(classContains)!==-1) {//Contains Class
            arrayposition = i;
        };
    });
<<<<<<< HEAD
    //console.log(arrayposition);
=======

>>>>>>> index2 working
    if (arrayposition===-1) {//The Given class is not present
        var className = classContains+'0';
    }
    else{
        var className = classNames[arrayposition];
    };
    var lastNumber = parseInt(className[className.length-1]) ;
    if (lastNumber===1 && !isIncrease) {
        //if 1 is postfix and you are decreasing then remove the class
        $element.removeClass(className);
    }
    else{

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
        //console.log('oldclass '+className);
        //console.log('newclass '+newClass);
<<<<<<< HEAD

        /*Not Working
        */
        $element.removeClass(className);
        $element.addClass(newClass);
        console.log($element);
    };
}
function selectRow ($element) {
    console.log('row Selected');
}
=======
        $element.removeClass(className);
        $element.addClass(newClass);
        //console.log($element);
    };
}
>>>>>>> index2 working
/**Inside The Control Box*/
function inControlBox ($element,whichElement) {

/**PREVIOUS Control BOXES*/
<<<<<<< HEAD
    if (inSelectionObject.col) {
        inSelectionObject.col.removeClass('inselection');
        console.log('remove col selection');
    };
=======
    $('.inselection').removeClass('inselection');

>>>>>>> index2 working
    if (inSelectionObject.controlBox) {
        if (inSelectionObject.controlBox.length) {
            inSelectionObject.controlBox.hide();
        };
    };
    /**CONTROL BOXES SELECTED*/
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
<<<<<<< HEAD
    console.log(whichElement,inSelectionObject);
=======

>>>>>>> index2 working
    inSelectionObject.controlBox = $optionContainer;
    var offset = $element.offset();
    $optionContainer.show();
    /*
    *   Function to Check whether Flowing outside
    */
    $optionContainer.css({
        'left' : offset.left,
        'top': offset.top - 60
    });
    $element.addClass('inselection');
}
function removeControlBox () {
  inSelectionObject.controlBox.hide();
 }
 function changeDataLength ($row,isIncrease) {
     /*var length = parseInt($row.attr('data-length'));
     if (isIncrease) {
        length=length+1;
     }
     else{
        length = length -1;
     };
     //$row.attr('data-length',length);*/
 }