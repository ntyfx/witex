var testText = '由$x = \\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}$题意知直线$l$的斜率存在，设直线$l$的方程为$y=kx+2$';

WiTex.render(testText, function(result) {
    document.getElementById('second').value = result.html;
});
WiTex.render('third');
