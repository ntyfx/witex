var testText = '$\\sqrt{1+\\sqrt{1+\\sqrt{1+\\sqrt{1+\\sqrt{1+\\sqrt{1+\\sqrt{1+x}}}}}}}$ 由$x = \\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}$题意知直线$l$的斜率存在，设直线$l$的方程为$y=kx+2$， $A(x_{1},y_{1})$，$B(x_{2},y_{2})$';

WiLex.render(testText, function(result) {
    document.getElementById('second').value = result.html;
});
WiLex.render('third');
