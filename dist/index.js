/*! witex@v1.1.1 */
!function(t,e){"use strict";if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof module&&module.exports)module.exports=e();else{var n=t.WiTex,i=e();i.noConflict=function(){return t.WiTex=n,i},t.WiTex=i}}(this,function(){function t(t){this.opts=i(a,t),this.isReady=!1,this.queue=[],this.init()}Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var e=Array.prototype.slice.call(arguments,1),n=this,i=function(){},o=function(){return n.apply(this instanceof i&&t?this:t,e.concat(Array.prototype.slice.call(arguments)))};return i.prototype=this.prototype,o.prototype=new i,o}),Array.prototype.indexOf||(Array.prototype.indexOf=function(t,e){var n;if(null==this)throw new TypeError('"this" is null or not defined');var i=Object(this),o=i.length>>>0;if(0===o)return-1;var r=+e||0;if(Math.abs(r)===1/0&&(r=0),r>=o)return-1;for(n=Math.max(r>=0?r:o-Math.abs(r),0);n<o;){if(n in i&&i[n]===t)return n;n++}return-1});var e=null,n=function(){},i=function(t,e){for(var n in e)e.hasOwnProperty(n)&&("object"!=typeof e[n]||e[n]instanceof Array||"object"!=typeof t[n]&&"function"!=typeof t[n]?t[n]=e[n]:i(t[n],e[n]));return t},o=function(t,e){var n=document.head||document.getElementsByTagName("head")[0]||document.documentElement;return n.firstChild?n.insertBefore(t,n.firstChild):n.appendChild(t),e&&n.removeChild(t),t},r={js:function(t,e){e=i({charset:"utf-8",onload:n,onerror:n},e||{});var r=document.createElement("script"),a=e.onload;return e.onload=function(){a.apply(r,arguments),r.onload=r.onreadystatechange=n},i(r,e),r.onreadystatechange=function(){switch(r.readyState){case"loaded":case"complete":e.onload.apply(r,arguments)}},r.src=t,o(r)}},a={main:"//static.xueba100.com/public/mathjax/v2.7.0/MathJax.js",config:"TeX-AMS_SVG",mathjax:{showProcessingMessages:!1,skipStartupTypeset:!0,showMathMenu:!1,showMathMenuMSIE:!1,messageStyle:"none",AssistiveMML:{disabled:!0},"fast-preview":{disabled:!0},SVG:{linebreaks:{automatic:!0,width:"container"},useFontCache:!0,useGlobalCache:!1},MathML:{extensions:["content-mathml.js"]},tex2jax:{inlineMath:[["`","`"]],processEscapes:!0}},onReady:n};t.prototype.init=function(){var t=this.opts.main+"?config="+this.opts.config;r.js(t,{onload:this.configMathjax.bind(this),onerror:function(){}})},t.prototype.config=function(t){this.MathJax.Hub.Config(t)},t.prototype.configMathjax=function(){this.MathJax=MathJax,this.MathJax.Hub.Config(this.opts.mathjax),this.opts.onReady(),this.isReady=!0,this.render()},t.prototype.push=function(t,e){return this.queue.push({text:t,callback:e}),!!this.isReady&&void this.render()},t.prototype.render=function(){if(this.queue.length){var t=this.queue.shift();this._render(t,this.render.bind(this))}},t.prototype._render=function(t,e){var n=t.text;return n.style?(n.style.visibility="hidden",this.MathJax.Hub.Queue(["Typeset",MathJax.Hub,n,function(){n.style.visibility="";var e=n.innerHTML;t.callback&&t.callback({html:e})}]),e()):e(new Error("参数错误"))};var s={init:function(n){e||(e=new t(n))},config:function(t){e.config(t)},render:function(t,n){!e&&s.init();var i=n,o=null;n?(o=document.createElement("div"),o.innerHTML=t,document.getElementsByTagName("body")[0].appendChild(o),i=function(t){o.parentNode&&o.parentNode.removeChild(o),n(t)}):o=document.getElementById(t),e.push(o,i)},renderBySelector:function(t,n){if(!e&&s.init(),t&&"string"==typeof t){var i=document.querySelectorAll(t),o=i.length;if(o)for(var r=0;r<o;r++){var a=i[r];e.push(a,n)}}}};return s});