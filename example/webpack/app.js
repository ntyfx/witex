import WiTex from '../../src/';

var testText = '$\\therefore 0 < S\\leqslant \\frac{\\sqrt{2}}{2}$';

WiTex.render(testText, function(result) {
    document.getElementById('second').innerHTML = result.html;
});
WiTex.render('third');