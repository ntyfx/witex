var testText = '`a^2` $a^2$ `\\left ( 1+\\dfrac{1}{2} \\right )` `\\left ( 1+\\dfrac{1}{2} \\right )`';

WiTex.init({
    mathjax: {
        tex2jax: {
            inlineMath: [
                ['`', '`'],
                ['$', '$'],
                ["\\(", "\\)"]

            ]
        }
    }
});
WiTex.render(testText, function(result) {
    document.getElementById('second').innerHTML = result.html;
});
WiTex.render('third');