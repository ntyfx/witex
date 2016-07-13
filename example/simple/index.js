var testText = '$\therefore 0 < S\leqslant \frac{\sqrt{2}}{2}$';

WiTex.render(testText, function(result) {
    document.getElementById('second').value = result.html;
});
WiTex.render('third');
