# 通用 js

```
var o = t.lex = {
            oneDateTime: 864e5,
            httpUrl: "https://api.zhugeio.com",
            lang: {
                regExp: {
                    url: "^((http://)|(https://)|(//))[A-Za-z0-9]",
                    phone: "^1{1}[0-9]{2}[0-9]{8}$",
                    email: "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+\\.){1,63}[a-z0-9]+$",
                    password: "^\\S{6,20}$",
                    code: "^\\d{4}$",
                    userName: "^.{1,10}$",
                    teamAndAppName: "^.{1,20}$",
                    sourceMediumName: "^.{1,100}$"
                },
                toMap: function(t, n) {
                    var e = {
                        originArr: t
                    };
                    return t.forEach(function(t, i) {
                        e[t[n]] = t,
                        e[t[n]].indexInOriginArr = i
                    }),
                    e
                },
                getRandom: function(t, n) {
                    return Math.round(Math.random() * (n - t)) + t
                },
                getDateLength: function(t, n) {
                    var e = new Date,
                    i = new Date(e.getTime()),
                    r = t.match(/(\d{4})(\d{2})(\d{2})/),
                    a = n.match(/(\d{4})(\d{2})(\d{2})/);
                    return e.setFullYear(r[1], r[2] - 1, r[3]),
                    i.setFullYear(a[1], a[2] - 1, a[3]),
                    (i.getTime() - e.getTime()) / o.oneDateTime + 1
                },
                power: function(t, n) {
                    for (var e = 1; n--;) e *= t;
                    return e
                },
                toDecimal: function(t, n) {
                    var e = parseFloat(t);
                    if (isNaN(e)) return ! 1;
                    var i = (Math.round(e * this.power(10, n)) / this.power(10, n)).toString(),
                    o = i.indexOf(".");
                    for (o < 0 && (o = i.length, i += "."); i.length <= o + n;) i += "0";
                    return i
                },
                isArray: function(t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                },
                isString: function(t) {
                    return "[object String]" === Object.prototype.toString.call(t)
                },
                isNumber: function(t) {
                    return "[object Number]" === Object.prototype.toString.call(t)
                },
                isObject: function(t) {
                    return "[object Object]" === Object.prototype.toString.call(t)
                },
                isDate: function(t) {
                    return "[object Date]" === Object.prototype.toString.call(t)
                },
                isFunction: function(t) {
                    return "[object Function]" === Object.prototype.toString.call(t)
                },
                isEmptyObject: function(t) {
                    var n = null;
                    for (n in t) n = n;
                    return ! n
                },
                isEqual: function(t, n) {
                    return JSON.stringify(t) == JSON.stringify(n)
                },
                isConstructorOf: function(t, n) {
                    try {
                        return t.constructor.name === n
                    } catch(t) {
                        return ! 1
                    }
                },
                inArray: function(t, n) {
                    for (var e = 0; e < t.length; e++) {
                        if (("number" == typeof t[e] || "number" == typeof n) && t[e] == n) return 1;
                        if (this.isEqual(n, t[e])) return 1
                    }
                    return 0
                },
                toThousands: function(t) {
                    var n = String(t).split(".");
                    return n[0] = n[0].replace(new RegExp("(\\d)(?=(\\d{3})+$)", "ig"), "$1,"),
                    n.join(".")
                },
                clone: function(t) {
                    if (o.lang.isArray(t)) {
                        for (var n = [], e = 0; e < t.length; e++) n.push(o.lang.clone(t[e]));
                        return n
                    }
                    if (!this.isObject(t)) return t;
                    if (null === t) return t;
                    var i = {};
                    for (var r in t) i[r] = o.lang.clone(t[r]);
                    return i
                },
                mergeObject: function(t, n) {
                    for (var e in t) if (o.lang.isObject(t[e])) n[e] = n[e] ? n[e] : {},
                    o.lang.mergeObject(t[e], n[e]);
                    else if (o.lang.isArray(t[e])) if (n[e] && n[e] !== []) for (var i = 0,
                    r = n[e].length, a = t[e].length; i < r && i < a; i++) n[e][i] = o.lang.mergeObject(t[e][i], n[e][i]);
                    else n[e] = t[e];
                    else n[e] = null === n[e] || void 0 === n[e] ? t[e] : n[e];
                    return n
                },
                dateFormat: function(t, n) {
                    var e = n || "yyyy-mm-dd",
                    i = t.getMonth() + 1,
                    o = t.getDate();
                    return e = e.toLowerCase(),
                    e.replace("yyyy", t.getFullYear()).replace("mm", i >= 10 ? i: "0" + i.toString()).replace("dd", o >= 10 ? o: "0" + o.toString())
                },
                timeFormat: function(t, n) {
                    n = o.lang.isObject(n) ? n: {};
                    var e = parseInt((parseFloat(t) / 1e3).toFixed(0)),
                    i = parseInt(e / 60),
                    r = parseInt(i / 60);
                    e -= 60 * i,
                    i -= 60 * r;
                    var a = {
                        s: "s",
                        m: "m",
                        h: "h"
                    };
                    a = o.lang.mergeObject(a, n || {});
                    var s = e + a.s;
                    return s = (i ? i + a.m: "") + s,
                    s = (r ? r + a.h: "") + s
                },
                getDate: function(t) {
                    var n = new Date;
                    return n.setFullYear(t.substr(0, 4), t.substr(4, 2) - 1, t.substr(6, 2)),
                    n.setHours(0),
                    n.setMinutes(0),
                    n.setSeconds(0),
                    n.setMilliseconds(0),
                    n
                },
                stringMiddleSplit: function(t, n) {
                    t += "";
                    var e = {
                        maxLength: 20,
                        beginLength: 8,
                        endLength: 8,
                        replaceStr: "..."
                    };
                    e = this.mergeObject(e, n || {});
                    var i = /[^\x00-\xff]/g,
                    o = t.match(i) ? t.match(i).length: 0,
                    r = t.length + o,
                    a = [],
                    s = 0,
                    l = [],
                    c = 0;
                    if (r > e.maxLength) {
                        var u = t.match(/[\S\s]{1}/g);
                        return u.forEach(function(t) {
                            if (! (s >= e.beginLength)) {
                                var n = /[^\x00-\xff]/.test(t) ? 2 : 1;
                                s += n,
                                a.push(t)
                            }
                        }),
                        u.reverse().forEach(function(t) {
                            if (! (c >= e.endLength)) {
                                var n = /[^\x00-\xff]/.test(t) ? 2 : 1;
                                c += n,
                                l.push(t)
                            }
                        }),
                        a.join("") + e.replaceStr + l.reverse().join("")
                    }
                    return t
                },
                getStringLength: function(t) {
                    var n = new RegExp(/[^\\x00-\\xff]/),
                    e = t.match(n) ? t.match(n).length: 0;
                    return t.length + e
                },
                splitString: function(t, n, e) {
                    var i = "",
                    o = 0,
                    r = new RegExp(/[^\x00-\xff]/),
                    a = !1;
                    e = e || "...";
                    for (var s = 0; s < t.length; s++) {
                        var l = t.charAt(s);
                        o += r.test(l) ? 2 : 1,
                        o <= n ? i += l: a = !0
                    }
                    return {
                        str: a ? i + e: i,
                        len: o
                    }
                },
                href: function(t) {
                    t = /^\//.test(t) ? t: "/" + t;
                    var n = /\/zhugesdkv-web/.test(location.pathname);
                    location.href = n ? "/zhugesdkv-web" + t: t
                },
                toHref: function(t, n, e) {
                    t += "?";
                    var i = [];
                    for (var r in n) i.push(r + "=" + n[r]);
                    return t += i.join("&"),
                    e && (t = o.lang.setHashData(e, t)),
                    t
                },
                getHrefData: function(t) {
                    var n = decodeURIComponent(t ? t.replace(/\S*\?/, "") : location.search.replace("?", "")),
                    e = [],
                    i = {};
                    return e = this.matchArray(/[^=]+=("{.*}"|[^=&]+)/g, n).map(function(t) {
                        return 0 === t.indexOf("&") ? t.replace("&", "") : t
                    }),
                    e.forEach(function(t) {
                        var n = t.indexOf("="),
                        e = t.slice(0, n),
                        o = t.slice(n + 1);
                        i[e] = o
                    }),
                    i
                },
                setHrefData: function(t) {
                    var n = this.getHrefData();
                    if (t && !this.isEqual(t, n)) {
                        var e = this.mergeObject(n, t),
                        i = [];
                        for (var o in e) e.hasOwnProperty(o) && i.push(o + "=" + e[o]);
                        var r = location.pathname + "?" + i.join("&") + location.hash;
                        window.history.replaceState(null, "", r)
                    }
                },
                setHashData: function(t, n) {
                    if (t) {
                        var e = [];
                        for (var o in t) e.push(o + "=" + t[o]);
                        if (n) return n + "#" + i.encode(e.join("/"));
                        location.hash = i.encode(e.join("/"))
                    }
                },
                getHashData: function() {
                    var t = location.hash ? i.decode(location.hash.replace("#", "")).split("/") : [],
                    n = {};
                    return t.forEach(function(t) {
                        var e = t.split("=");
                        e.length > 1 && (n[e[0]] = e[1])
                    }),
                    n
                },
                matchArray: function(t, n) {
                    for (var e, i = []; e = t.exec(n);) i.push(e[0]);
                    return i
                },
                getRectOfInline: function(t, n) {
                    n = o.lang.mergeObject({
                        content: "",
                        rotate: 0,
                        fontSize: 12,
                        lineHeight: 30,
                        breakWord: "normal"
                    },
                    n || {}),
                    $("#get-txt-length-util").remove();
                    var e = $('<span id="get-txt-length-util"style="line-height: ${lineHeight}px;word-wrap:${breakWord};font-size: ${fontSize}px;transform: rotate(${rotate}deg);"></span>'.customReplace("lineHeight", n.lineHeight).customReplace("breakWord", n.breakWord).customReplace("fontSize", n.fontSize).customReplace("rotate", n.rotate));
                    e.append(t),
                    $("body").append(e);
                    var i = e.get(0).getBoundingClientRect();
                    return {
                        height: i.height,
                        width: i.width
                    }
                },
                getAbsoluteTimeRange: function(t, n, e) {
                    var i = !!e,
                    r = new Date,
                    a = o.oneDateTime,
                    s = new Date(r.getTime() - a),
                    l = {
                        begin: new Date(r.getTime() - n * a),
                        end: null
                    };
                    switch (t) {
                    case "hour":
                        l.end = new Date(l.begin);
                        break;
                    case "day":
                        l.end = i ? new Date(r) : new Date(r - a);
                        break;
                    case "week":
                        var c = new Date(r.getTime() - (r.getDay() - 1) * a);
                        0 === r.getDay() && (c = new Date(r.getTime() - 6 * a)),
                        l.begin = new Date(c.getTime() - 7 * n * a),
                        1 === r.getDay() ? l.end = i ? new Date(r) : new Date(s) : 0 === r.getDay() ? l.end = new Date(r) : l.end = new Date(r.getTime() + a * (7 - r.getDay()));
                        break;
                    case "month":
                        l.begin = new Date,
                        l.end = new Date,
                        l.begin.setMonth(r.getMonth() - n),
                        l.begin.setDate(1),
                        1 === r.getDate() ? l.end = i ? new Date(r) : new Date(r.getTime() - a) : (l.end.setMonth(l.end.getMonth() + 1), l.end.setDate(0));
                        break;
                    default:
                        l.end = i ? new Date(r) : new Date(r - a)
                    }
                    return l
                },
                copyTextToClipboard: function(t) {
                    var n = !0,
                    e = document.createElement("textarea");
                    e.style.position = "fixed",
                    e.style.top = 0,
                    e.style.left = 0,
                    e.style.width = "2em",
                    e.style.height = "2em",
                    e.style.padding = 0,
                    e.style.border = "none",
                    e.style.outline = "none",
                    e.style.boxShadow = "none",
                    e.style.background = "transparent",
                    e.value = t,
                    document.body.appendChild(e),
                    e.select();
                    try {
                        var i = document.execCommand("copy");
                        n = !!i
                    } catch(t) {
                        n = !1
                    }
                    return document.body.removeChild(e),
                    n
                }
            },
            log: function() {
                if (t.console && window.openLog) {
                    var n = [],
                    e = null;
                    for (e in arguments) n.push(arguments[e]);
                    console.info.apply(console, n)
                }
            },
            error: function() {
                if (t.console) {
                    var n = [],
                    e = null;
                    for (e in arguments) n.push(arguments[e]);
                    console.error.apply(console, n)
                }
            },
            keyCodeMap: {
                enter: 13,
                up: 38,
                down: 40,
                left: 37,
                right: 39,
                del: 8,
                tab: 9,
                shift: 16,
                esc: 27
            },
            cookieUtil: {
                get: function(t) {
                    var n = encodeURIComponent(t) + "=",
                    e = document.cookie.indexOf(n),
                    i = null;
                    if (e > -1) {
                        var o = document.cookie.indexOf(";", e); - 1 == o && (o = document.cookie.length),
                        i = decodeURIComponent(document.cookie.substring(e + n.length, o))
                    }
                    return i
                },
                set: function(t, n, e, i, o, r) {
                    var a = encodeURIComponent(t) + "=" + encodeURIComponent(n);
                    e instanceof Date && (a += "; expires=" + e.toGMTString()),
                    i && (a += "; path=" + i),
                    o && (a += "; domain=" + o),
                    r && (a += "; secure"),
                    document.cookie = a
                },
                unset: function(t, n, e, i) {
                    this.set(t, "", new Date(0), n, e, i)
                }
            },
            eventUtil: {
                getWheelEventName: function() {
                    return "onwheel" in document.createElement("div") ? "wheel": void 0 !== document.onmousewheel ? "mousewheel": "DOMMouseScroll"
                },
                getWheelDelta: function(t) {
                    return t = t.originalEvent || t,
                    t.wheelDelta ? t.wheelDelta / 3 : Math.abs(t.deltaX) > Math.abs(t.deltaY) ? t.deltaX: t.deltaY
                },
                bind: function(t, n, e) {
                    t.addEventListener ? t.addEventListener(n, e, !1) : t.attachEvent ? t.attachEvent("on" + n, e) : t["on" + n] = e
                },
                unbind: function(t, n, e) {
                    t.removeEventListener ? t.removeEventListener(n, e, !1) : t.detachEvent ? t.detachEvent("on" + n, e) : t["on" + n] = null
                },
                preventDefault: function(t) {
                    t.preventDefault && t.preventDefault(),
                    t.stopPropagation && t.stopPropagation(),
                    t.returnValue && (t.returnValue = !1),
                    t.cancelBubble && (t.cancelBubble = !0)
                }
            },
            browser: {
                isIE: function() {
                    return "ActiveXObject" in window
                }
            },
            isPc: function() {
                for (var t = navigator.userAgent,
                n = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"], e = !0, i = 0; i < n.length; i++) if (t.indexOf(n[i]) > 0) {
                    e = !1;
                    break
                }
                return e
            }
        };
```
