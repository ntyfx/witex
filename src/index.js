(function(root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof(module) !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        var _previousRoot = root.WiTex;
        var self = factory();
        self.noConflict = function() {
            root.WiTex = _previousRoot;
            return self;
        };
        root.WiTex = self;
    }
}(this, function() {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
    if (!Function.prototype.bind) {
        Function.prototype.bind = function(oThis) {
            if (typeof this !== "function") {
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function() {},
                fBound = function() {
                    return fToBind.apply(this instanceof fNOP && oThis ?
                        this :
                        oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
        };
    }
    var wiTex = null;
    var DONOTHING = function() {};
    var merge = function(dst, src) {
        for (var id in src) {
            if (src.hasOwnProperty(id)) {
                if (typeof src[id] === 'object' && !(src[id] instanceof Array) && (typeof dst[id] === 'object' || typeof dst[id] === 'function')) {
                    merge(dst[id], src[id]);
                } else {
                    dst[id] = src[id];
                }
            }
        }
        return dst;
    };

    var _appendToHead = function(obj, isRemove) {
        var h = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
        if (h.firstChild) {
            h.insertBefore(obj, h.firstChild);
        } else {
            h.appendChild(obj);
        }
        if (isRemove) {
            h.removeChild(obj);
        }

        return obj;
    }

    var loader = {
        js: function(url, opt) {
            opt = merge({
                charset: 'utf-8',
                onload: DONOTHING,
                onerror: DONOTHING
            }, opt || {});

            var s = document.createElement('script');
            var t = opt.onload;
            opt.onload = function() {
                t.apply(s, arguments);
                s.onload = s.onreadystatechange = DONOTHING;
            };
            merge(s, opt);
            s.onreadystatechange = function() {
                switch (s.readyState) {
                    case 'loaded':
                    case 'complete':
                        opt.onload.apply(s, arguments);
                        break;
                    default:
                        break;
                }
            };
            s.src = url;
            return _appendToHead(s);
        }
    };

    var defaults = {
        main: 'http://cdn.bootcss.com/mathjax/2.6.1/MathJax.js',
        config: 'TeX-AMS_SVG',

        mathjax: {
            showProcessingMessages: false,
            skipStartupTypeset: true,
            showMathMenu: false,
            showMathMenuMSIE: false,
            messageStyle: 'none',
            SVG: {
                linebreaks: {
                    automatic: true,
                    width: "container"
                },
                useFontCache: true,
                useGlobalCache: false
            },
            tex2jax: {
                inlineMath: [
                    ['$', '$'],
                    ["\\(", "\\)"]
                ],
                processEscapes: true
            }
        },


        onReady: DONOTHING
    };

    function WiTex(opts) {
        this.opts = merge(defaults, opts);
        this.isReady = false;
        this.queue = [];
        this.init();
    }

    WiTex.prototype.init = function() {
        var main = this.opts.main + '?config=' + this.opts.config;
        loader.js(main, {
            onload: this.configMathjax.bind(this),
            onerror: function() {
                // TODO error handler
            }
        });
    }

    WiTex.prototype.config = function(config) {
        this.MathJax.Hub.Config(config);
    }

    WiTex.prototype.configMathjax = function() {
        this.MathJax = MathJax;
        this.MathJax.Hub.Config(this.opts.mathjax);
        this.opts.onReady();
        this.isReady = true;
        this.render();
    }

    WiTex.prototype.push = function(text, callback) {
        this.queue.push({
            text: text,
            callback: callback
        });
        if (!this.isReady) {
            return false;
        } else {
            this.render();
        }
    }

    WiTex.prototype.render = function() {
        var that = this;
        if (!this.queue.length) {
            return;
        }

        var _q = this.queue.shift();

        this._render(_q, this.render.bind(this));
    }

    WiTex.prototype._render = function(obj, callback) {
        if (obj.callback) {
            var wrapper = document.createElement("div");
            wrapper.innerHTML = obj.text;
            this.MathJax.Hub.Queue(['Typeset', MathJax.Hub, wrapper]);
            this.MathJax.Hub.Queue(function(a) {
                var mjOut = wrapper.getElementsByTagName("svg")[0];
                mjOut.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                obj.callback({
                    html: wrapper.outerHTML
                });
            });
        } else {
            var elem = document.getElementById(obj.text);
            elem.style.visibility = 'hidden';
            this.MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem, function() {
                elem.style.visibility = '';
            }]);
        }

        callback();
    }

    var wi = {
        init: function(opts) {
            if (!wiTex) {
                wiTex = new WiTex(opts);
            }
        },
        config: function(conf) {
            wiTex.config(conf);
        },
        render: function(text, callback) {
            !wiTex && wi.init();

            wiTex.push(text, callback);
        }
    }

    return wi;
}));