function changeWidthThroughClass ($element,classContains,isIncrease) {

    /*Code to find the appropriate className*/
    var arrayposition = -1;
    var classNames = $element.attr('class').split(" ");//Array of all Classes
    $(classNames).each(function  (i) {
        if (this.indexOf(classContains)!==-1) {//Contains Class
            arrayposition = i;
        };
    });

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
        }
        else {

        if (lastNumber!==1) {
            lastNumber = lastNumber - 1;
        } else{
            console.log('Cannot be Decreased Further . Deleting the element');
            //function for deleting the element
        };
        };
        var newClass = bootstrapClass + lastNumber;
        $element.removeClass(className);
        $element.addClass(newClass);
        //console.log($element);
    };
}