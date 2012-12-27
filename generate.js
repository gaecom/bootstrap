$('#downloadzip').on('click',createZip);
function createZip () {
    $('.inselection').removeClass('inselection');
    var fullHtml = '<!DOCTYPE html>\n<html>\n<head>\n<title>Twitter Bootstrap</title>\n<link href="css/bootstrap.min.css" rel="stylesheet">\n</head>\n<body>';
    $('#main-container').children().each(function  (i) {

        fullHtml = '\n'+fullHtml + $(this).html()+'\n';

    });
    fullHtml = '\n'+fullHtml + '\n<script type="text/javascript" src="http://code.jquery.com/latest-jquery.js"></script>\n<script type="text/javascript" src="js/bootstrap.min.js"></script>\n</body>\n</html>';
    console.log(fullHtml);
}