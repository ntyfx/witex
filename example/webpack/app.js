import WiTex from '../../src/';

var testText = '$\therefore 0 < S\leqslant \frac{\sqrt{2}}{2}$';

WiTex.render(testText, result => {
    document.getElementById('second').value = result.html;
});
WiTex.render('third');