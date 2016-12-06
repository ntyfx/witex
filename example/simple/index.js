var testText = '`a^2` $a^2$ `\\left ( 1+\\dfrac{1}{2} \\right )` `\\left ( 1+\\dfrac{1}{2} \\right )`';

WiTex.init({
    mathjax: {
        jax: ["input/MathML"],
        extensions: ["mml2jax.js"],
        tex2jax: {
            inlineMath: [
                ['`', '`'],
                ['$', '$'],
                ["\\(", "\\)"]

            ]
        }
    }
});
WiTex.render(testText, function (result) {
    document.getElementById('second').innerHTML = result.html;
});
WiTex.render('third');
WiTex.renderBySelector('.main-content .selector');