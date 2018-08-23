var 萌评 = function (a, b, c, d) {
    var e = encodeURIComponent, f = (decodeURIComponent, function (a) {
        return "//comment.moe/api/" + a
    }), g = function (a) {
        var a, b = +a, c = new Date;
        if ((b + "").match(/^\d{10}$/)) a = new Date(1e3 * b); else {
            if ((b + "").match(/^\d{0,9}$/)) return "∞";
            var d = (b + "").split(/[-\/ :]/);
            a = new Date(d[0], d[1] - 1, d[2], d[3], d[4], d[5])
        }
        var e = parseInt, f = e((c - a) / 1e3);
        return !b || 5 > f ? "刚刚" : 60 > f ? f + "秒前" : (f /= 60) < 60 ? e(f) + "分前" : (f /= 60) < 24 ? e(f) + "时前" : (f /= 24) < 7 ? e(f) + "天前" : (f /= 7) < 2 ? e(f) + "周前" : a > new Date(c.getFullYear() + "-01-01") ? a.getMonth() + 1 + "月" + a.getDate() + "日" : a.getFullYear() + "年" + (a.getMonth() + 1) + "月" + a.getDate() + "日"
    }, h = function (a) {
        return (a + "").replace(/^\s+|\s+$/g, "")
    }, i = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;",
        "`": "&#x60;",
        "=": "&#x3D;"
    }, k = function (a) {
        return String(a).replace(/[&<>"'=]/g, function (a) {
            return i[a]
        })
    }, l = function (a) {
        return k(h(a)).replace(/```(\w+)?\n([\S\s]+?)```/gi, function (a, b, c) {
            return b = b || "", '<pre type="' + b + '"><code>' + h(c) + "</code></pre>"
        }).replace(/`(.+?)`/gi, function (a, b) {
            return "<code>" + h(b) + "</code>"
        }).replace(/(https?:)?\/\/(www\.)?[-\w@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-\w@:%_\+.~#?&\/\/=]*)/gi, function (a) {
            var b = "" + a.replace(/(https?:)?\/\//, "").match(/[\w-\.]{3,}/);
            if (b.match(/w.\d\.sinaimg\.cn/i)) {
                var c = "" + a.match(/\w{16,32}/);
                return '<a href="//ws2.sinaimg.cn/large/' + c + '" target="_blank" class="cm-content-img"><img src="//ws2.sinaimg.cn/thumb150/' + c + '"></a>'
            }
            return b.match(/xiami/) ? '<a class="cm-content-xiami" href="' + a + '" target="_blank">' + a + "</a>" : '<a href="' + a + '">' + a + "</a>"
        }).replace(/\n/g, "<br>")
    }, m = function (a) {
        return a = a || navigator.userAgent, a.match(/Windows Phone/i) ? "Mango" : a.match(/Windows CE/i) ? "winCE" : a.match(/ipad/i) ? "iPad" : a.match(/iPod/i) ? "Touch" : a.match(/iphone/i) ? "iPhone" : a.match(/android/i) ? "Android" : a.match(/Ubuntu/i) ? "Ubuntu" : a.match(/Mac OS/i) ? "Mac" : a.match(/opera min/i) ? "Opera mini" : a.match(/Chrome/i) ? "Cr" : a.match(/Safarf/i) ? "Safari" : a.match(/Opera/i) ? "Opera" : a.match(/UCWEB/i) ? "UC" : a.match(/PHP/i) ? "PHP" : a.match(/Postman/i) ? "Postman" : a.match(/curl/i) ? "cURL" : ""
    }, n = document, o = function (a, b) {
        return (b || n).querySelector(a)
    }, p = function (a, b) {
        return q((b || n).querySelectorAll(a))
    }, q = function (a) {
        return Array.prototype.slice.apply(a)
    }, r = function (a, b, c) {
        a = q(a);
        var d = function () {
            return item = a.shift(), item ? void b(item, d) : void(c && c())
        };
        d()
    }, s = Element.prototype, t = window.localStorage;
    o.D = function (a) {
        if (h(a).match(/^</)) {
            var b = n.createElement("div");
            return b.innerHTML = a, b.children[0]
        }
        return n.createElement(a)
    }, s.add = function (a) {
        return a && this.appendChild(a), this
    }, s.del = function (a) {
        return (a = this.parentNode) && a.removeChild(this), a
    }, s._ = function (a) {
        return o(a, this)
    }, s.__ = function (a) {
        return p(a, this)
    }, s.parent = function (a) {
        var b = this, c = p(a);
        if (c) for (; (b = b.parentNode) && b != document.body;) if (-1 != c.indexOf(b)) return b
    }, o.clone = function (a) {
        var b, c, d = a;
        if (a && ((c = a instanceof Array) || a instanceof Object)) {
            d = c ? [] : {};
            for (b in a) a.hasOwnProperty(b) && (d[b] = o.clone(a[b]))
        }
        return d
    };
    var u = {};
    o.x = function () {
        var a, b, c, d, f, g, h, i, j = q(arguments), dd;
        if (j[0] && "string" == typeof j[0] && j[0].match(/^(put|get|post|delete)$/i) && (a = j.shift().toUpperCase()), j[0] && "object" == typeof j[0] && (i = j.shift()), b = j.shift(), j[0] && "object" == typeof j[0]) {
            dd = j.shift(), c = [];
            for (var k in dd) c.push(e(k) + "=" + e(dd[k]));
            c = c.join("&")
        } else c = j[0] && "string" == typeof j[0] ? j.shift() : "";
        if (a || (a = c ? "POST" : "GET"), j[0] && "function" == typeof j[0] && (d = j.shift()), j[0] && "function" == typeof j[0] && (f = j.shift()), u[b] && "GET" == a) return d(clone(u[b]));
        var l = t && "GET" == a && b.match(/article/), m = "xhr-" + b.match(/key=[^&]+/);
        if (l && t[m] && d(JSON.parse(t[m])), (g = new XMLHttpRequest).open(a, b, 1), j[0] && j[0] instanceof HTMLElement) {
            if (g.dom = j.shift(), g.dom.xhr && 4 != g.dom.xhr.readyState) return;
            g.dom.xhr = g, g.dom.classList.add("shade-box")
        }
        if (j[0] && "x" == j[0] && (j.shift(), g.withCredentials = !0), b.match(location.origin) || (g.withCredentials = !0), i) for (var n in i) g[n] = i[n];
        return c && g.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), (d || f) && (g.onreadystatechange = function () {
            if (4 == g.readyState) if (g.status > 199 && g.status < 301 || 304 == g.status) {
                g.dom && g.dom.classList.remove("shade-box"), h = "blob" == g.responseType ? g.response : g.responseText;
                try {
                    (g.getResponseHeader("Content-Type") || "").match(/json/) && (h = JSON.parse(h || null))
                } catch (a) {
                    f && f(a)
                }
                c || (u[b] = h);
                var e = o.x.filter(h);
                if (e === !1) return;
                d(o.clone(e)), t[m] = JSON.stringify(e)
            } else if (f) {
                if (!g.status) return;
                f(g.status)
            }
        }), setTimeout(function () {
            g.notSend || g.send(c)
        }), g
    }, o.x.filter = function (a) {
        return a.error ? "当前网站尚未注册评论组件" == a.error ? a : (alert(a.error), !1) : a
    }, o.j = function (a, b, c) {
        b = b || function () {
        }, c = c || function () {
        };
        var d, e;
        d = "cb" + (+((+new Date + "").substr(6) + (Math.random() + "").substring(3, 7))).toString(32), a.match(/\{cb\}/) && (window[d] = b), e = document.createElement("script"), e.src = a.replace(/\{cb\}/, d), e.charset = "UTF-8", e.onload = function () {
            a.match(/\{cb\}/) || b(), e.parentNode.removeChild(e)
        }, e.onerror = function () {
            c(), e.parentNode.removeChild(e)
        }, document.body.appendChild(e)
    };
    var v = function (a, b) {
            return c.运转(d("评论们部分模板"), {comments: a, users: b}, {"浏览器信息格式化": m})
        },
        w = '(⌒▽⌒)å（￣▽￣）å(=・ω・=)å(｀・ω・´)å(〜￣△￣)〜å(･∀･)å(°∀°)ﾉå(￣3￣)å╮(￣▽￣)╭å( ´_ゝ｀)å("▔□▔)/å(ﾟДﾟ≡ﾟдﾟ)å!?Σ(ﾟдﾟ;)åΣ( ￣□￣||)å(´；ω；`)å（/TДT)/å(｡･ω･｡)å(ノ≧∇≦)ノå(´･_･`)å(-_-#)å（￣へ￣）å(￣ε(#￣) Σåヽ(`Д´)ﾉå(╯°口°)╯(┴—┴å_(:3」∠)_å┌( ಠ_ಠ)┘å٩͡[๏̯͡๏]۶å٩(×̯×)۶å´_ゝ｀å（｀へ´）å🙄å🙃å😀å😏å😉å🤗å👻å🤕å🤒å😎å🤓å💩å😤å🍵å💊å🐸å🐶å🐑å🌝å✨å💦å🍭å🎲'.split(/å/),
        x = function () {
            if (a && a.me) {
                var b = c.运转(d("账户部分模板"), {me: a.me, smiles: w});
                p(".cm-head").forEach(function (a) {
                    if (!a.innerHTML) {
                        a.innerHTML = b;
                        var c = a._("form");
                        c && (c.onsubmit = function (a) {
                            a.preventDefault();
                            var b = this.parent(".cm-article"), d = b.getAttribute("data-key");
                            d = h(d), o.x(f("comment"), {
                                key: d,
                                parent: c.paid.value,
                                text: c.text.value
                            }, function (a) {
                                return a.error ? alert(a.error) : void y(b, 1)
                            })
                        })
                    }
                })
            }
        }, y = function (b, c) {
            if (c || !b.innerHTML) {
                var d = b.getAttribute("data-key");
                d = h(d), d && o.x(f("article") + "?key=" + e(d) + "&unix=" + Math.floor(new Date / 1e3), function (c) {
                    if ("当前网站尚未注册评论组件" == c.error) return void(b.innerHTML = '<div class="cm-text-box"><h3>代码插入成功~</h3><small>在 <a href="//comment.moe/">萌评</a> 登记站点信息 即可激活 ⁽⁽ଘ(ˊᵕˋ)ଓ⁾⁾</small></div>');
                    var d, e, f = {}, g = [];
                    c.count = {comments: c.comments.length};
                    for (d in c.comments) e = c.comments[d], f[e.cid] = e;
                    for (d = c.comments.length; e = c.comments[--d];) e.parent && f[e.parent] ? (f[e.parent].child || (f[e.parent].child = []), f[e.parent].child.push(e)) : g.unshift(e);
                    c.comments = g, b.innerHTML = '<div class="cm-head"></div><ul class="cm-comments"><li class="cm-text-banner">加载中…</li></ul>';
                    for (var h in c.users) c.users[h].avatar = c.users[h].avatar.replace(/https?:\/\/tva\d\./, "//ws4."), ("" + c.users[h].avatar).match(/http:\/\/tp\d\.sinaimg\.cn\/\d+/) && (c.users[h].avatar += "/50/0");
                    b._(".cm-comments").innerHTML = v(c.comments, c.users) + '<li class="cm-text-banner">' + (c.count.comments ? "共计 " + c.count.comments + " 条评论" : "尚无评论") + "</li>", b.onclick = function (c) {
                        var d = c.target, e = d.getAttribute("action"), f = d.parent(".cm-comment"), g = 0;
                        switch (f && (g = +f.getAttribute("data-cid")), e) {
                            case"toLogin":
                                a.toLogin();
                                break;
                            case"toWeibo":
                                a.toWeibo();
                                break;
                            case"fo":
                                var h = b._("form");
                                if (!h) return alert("请登录");
                                b._(".cm-fo-pre").innerHTML = '<div class="cm-comment">' + f.innerHTML + '<button action="unfo">取消回应</button></div>', h.paid.value = g, h.text.focus();
                                break;
                            case"unfo":
                                b._(".cm-fo-pre").innerHTML = "", h.paid.value = 0;
                                break;
                            case"up":
                                if (d.classList.contains("active")) {
                                    var i = (+d.innerHTML || 0) - 1;
                                    0 > i && (nunm = 0), d.innerHTML = i, d.classList.remove("active")
                                } else d.innerHTML = (+d.innerHTML || 0) + 1, d.classList.add("active");
                                break;
                            case"down":
                                alert("反对 " + g);
                                break;
                            case"report":
                                alert("举报成功 " + g);
                                break;
                            case"smile":
                                c.preventDefault(), b._(".cm-smile-box").classList.contains("active") ? b._(".cm-smile-box").classList.remove("active") : b._(".cm-smile-box").classList.add("active");
                                break;
                            case"pics":
                                c.preventDefault();
                                var h = b._("form");
                                if (!h) return;
                                D(function (a) {
                                    h.text.focus(), h.text.value && (h.text.value += " "), h.text.value += "//ww2.sinaimg.cn/large/" + a + " "
                                });
                                break;
                            case"sm":
                                var h = b._("form");
                                if (!h) return;
                                b._(".cm-smile-box").classList.remove("active"), h.text.value && (h.text.value += " "), h.text.value += d.innerHTML + " "
                        }
                    }, x(b), H(b)
                })
            }
        }, z = function () {
            p(".cm-article").forEach(y)
        }, A = function (a, c) {
            b(a, c, function () {
                alert("上传文件出错了！")
            }, function (a) {
            })
        }, B = o.D("input");
    B.type = "file";
    var C = o.D("form");
    C.add(B);
    var D = function (a, b) {
        C.reset(), B.accept = "image/*", B.setAttribute("multiple", !!b), B.onchange = function () {
            this.files && this.files[0] && r(this.files, function (b, c) {
                A(b, function (b) {
                    a(b), c()
                })
            }, function () {
            })
        }, B.click()
    }, E = new Audio, F = {}, G = {
        _u: function (a) {
            for (var b = parseInt(a), c = a.substr(1), d = Math.floor(c.length / b), e = c.length % b, f = new Array, g = 0; e > g; g++) f[g] = c.substr((d + 1) * g, d + 1);
            for (g = e; b > g; g++) f[g] = c.substr(d * (g - e) + (d + 1) * e, d);
            for (g = 0, d = c = ""; g < f[0].length; g++) for (j = 0; j < f.length; j++) d += f[j].substr(g, 1);
            for (g = 0, d = unescape(d); g < d.length; g++) c += "^" == d.substr(g, 1) ? "0" : d.substr(g, 1);
            return c
        }, init: function (a) {
            a = a || n.body;
            var b = a.__('a[href*="//www.xiami.com/song/"]').filter(function (a) {
                var b = a.loadstart;
                a.loadstart = 1;
                var c = +a.href.match(/\d+/);
                if (F[c]) {
                    var d = F[c];
                    a.classList.add("cm-content-xiami"), a.innerHTML = (d.title.match(/^「.*」$/) ? d.title : "「" + d.title + "」") + d.artist, a.onclick = function () {
                        return d.mp3 ? (this.classList.contains("play") || this.classList.contains("pause") ? this.classList.contains("play") ? (E.pause(), this.classList.add("pause"), this.classList.remove("play"), G.nowPlay = 0) : this.classList.contains("pause") && (E.play(), this.classList.add("play"), this.classList.remove("pause"), G.nowPlay = d.xid) : (E.src = G._u(d.mp3), E.play(), p(".cm-content-xiami").forEach(function (a) {
                            a.classList.remove("play"), a.classList.remove("pause")
                        }), this.classList.add("play"), this.classList.remove("pause"), G.nowPlay = d.xid), !1) : void 0
                    }, G.nowPlay == d.xid && a.classList.add("play")
                }
                return !b
            }).map(function (a) {
                return +a.href.match(/\d+/)
            });
            b.length && o.j("//itorr.sinaapp.com/fm/x/?a=song&cb={cb}&id=" + b.join(","), function (a) {
                a.error || a.length && (a.forEach(function (a) {
                    F[a.xid] = a
                }), G.init())
            })
        }
    };
    window.处理评论们 = v, window.格式化时间 = g, window.格式化正文 = l, window.浏览器信息格式化 = m;
    var H = function (a) {
        G.init(a)
    };
    return z(), a.init(function (a) {
        x()
    }), {"运转": z}
}(function () {
    var a = "//api.mouto.org/", b = "//comment.moe/api/", c = location, d = encodeURIComponent, e = function (a, b, c) {
        b = b || function () {
        }, c = c || function () {
        };
        var d, e;
        d = "cb" + (+((+new Date + "").substr(6) + (Math.random() + "").substring(3, 7))).toString(32), a.match(/\{cb\}/) && (window[d] = b), e = document.createElement("script"), e.src = a.replace(/\{cb\}/, d), e.charset = "UTF-8", e.onload = function () {
            a.match(/\{cb\}/) || b(), e.parentNode.removeChild(e)
        }, e.onerror = function () {
            c(), e.parentNode.removeChild(e)
        }, document.body.appendChild(e)
    }, f = {
        init: function (a) {
            a = a || function () {
            }, e(b + "u?cb={cb}", function (b) {
                f.me = b, a && a(b)
            })
        }, toLogin: function () {
            c.href = b + "jump?url=" + d(a + "login.html#!redirect=" + d(c.href))
        }, toWeibo: function () {
            c.href = b + "jump?url=" + d(a + "x/?a=towb&redirect=" + d(c.href))
        }
    };
    return f
}(), function (a, b, c, d, e, f, g) {
    if ("function" == typeof b) f = a; else {
        if (!a.file) return;
        (g = a.success) && (b = g), (g = a.upload) && (d = g), (g = a.error) && (c = g)
    }
    e = new XMLHttpRequest, e.open("POST", "//x.mouto.org/wb/x.php?up&_r=" + Math.random(), 1), d && (e.upload.onprogress = function (a) {
        d(a.loaded / a.total)
    }), e.onload = function (a) {
        return a = JSON.parse(e.responseText), a.error && c ? c(a.error) : a.pid && b ? b(a.pid) : void 0
    }, e.send(f)
}, function () {
    var a = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;",
        "`": "&#x60;",
        "=": "&#x3D;"
    }, b = function (b) {
        return String(b).replace(/[&<>"'`=\/]/g, function (b) {
            return a[b]
        }).replace(/\n\r/g, function (a) {
            return "\\n"
        })
    }, c = function (a) {
        return String(a)
    }, d = function (a) {
        var b = [], c = "_",
            a = a.replace(/[\n\r\t]/g, "").replace(/"/g, '\\"').replace(/\{\{(#|\/|\^|&|\$)?(.+?)\}\}/g, function (a, d, e) {
                var 钥匙
                "." == e && (e = "_循环关键字"), e = e.split("|"), 钥匙 = e.shift();
                var f, g, h;
                switch (f = e.reverse().join("(") + "(", g = [], g.length = e.length, g = g.join(")") + ")", h = f + 钥匙 + g, c = [], c.length = b.length + 3, c = c.join("_"), d) {
                    case"#":
                        return b.push(钥匙), '");(function(){var ' + c + "value;var " + c + "key;if( typeof(" + 钥匙 + ')!=="undefined" && ' + 钥匙 + " && (" + 钥匙 + "=" + h + "))for(" + c + "key in " + 钥匙 + ")with(" + c + "value=" + 钥匙 + "[" + c + "key]){var _钥匙=" + c + "key;var _循环关键字=" + c + 'value;$return.push("';
                    case"$":
                        return b.push(钥匙), '");(function(){if( typeof(' + 钥匙 + ')!=="undefined" && (' + 钥匙 + ') ){$return.push("';
                    case"^":
                        return b.push(钥匙), '");(function(){if( typeof(' + 钥匙 + ')==="undefined" || !(' + 钥匙 + ') ){$return.push("';
                    case"/":
                        for (var i = b.length + 1; b[--i] && b[i] != 钥匙;) ;
                        return b.splice(i, 1), '")}})();$return.push("';
                    case"&":
                        return '");if(typeof(' + 钥匙 + ')!=="undefined")$return.push(编码成网页(' + h + "||''));$return.push(\"";
                    default:
                        return '");if(typeof(' + 钥匙 + ')!=="undefined")$return.push(编码成文本(' + h + "||''));$return.push(\""
                }
            });
        return a = 'var $return=[];var _value=$data;var _key;with($data){$return.push("' + a + "\");}return $return.join('');", Function("$data", "编码成文本", "编码成网页", a)
    }, e = function (a, e, f) {
        return d(a).call(f || window, e, b, c)
    };
    return {"运转": e, "编译模板": d, "编码成文本": b, "编码成网页": c}
}(), function (M) {
    return function (key) {
        return M[key]
    }
}({
    "评论们部分模板": "{{#comments}}\n<li id=\"cm-c-{{cid}}\">\n<div class=\"cm-comment\" data-cid=\"{{cid}}\">\n{{$users[uid]}}\n<div class=\"cm-comment-head\">\n{{$users[uid].url}}\n<a class=\"cm-comment-user\" href=\"{{users[uid].url}}\" target=\"_blank\">\n{{$users[uid].avatar}}\n<img src=\"{{users[uid].avatar}}\">\n{{/users[uid].avatar}}\n{{users[uid].name}}\n</a>\n{{/users[uid].url}}\n{{^users[uid].url}}\n<span class=\"cm-comment-user\">\n{{$users[uid].avatar}}\n<img src=\"{{users[uid].avatar}}\">\n{{/users[uid].avatar}}\n{{users[uid].name}}\n</span>\n{{/users[uid].url}}\n<span class=\"cm-comment-agent\">{{agent|浏览器信息格式化}}</span>\n</div>\n{{/users[uid]}}\n{{^users[uid]}}\n<div class=\"cm-comment-head\">\n<span class=\"cm-comment-user\">匿名</span>\n<span class=\"cm-comment-agent\">{{agent|浏览器信息格式化}}</span>\n</div>\n{{/users[uid]}}\n<div class=\"cm-comment-content\">{{&text|格式化正文}}</div>\n<div class=\"cm-comment-ctrl\">\n<time unix=\"{{created}}\">{{created|格式化时间}}</time>\n<button action=\"fo\"></button>\n<button action=\"up\">{{up}}</button>\n<button action=\"down\">{{down}}</button>\n<button action=\"report\"></button>\n</div>\n</div>\n{{$child}}\n<ul class=\"cm-comment-child\">\n{{&child,users|处理评论们}}\n</ul>\n{{/child}}\n</li>\n{{/comments}}",
    "账户部分模板": "{{^me.error}}\n<div class=\"cm-user\">\n<div class=\"cm-user-info\">\n<b>{{me.name}}</b>\n<a action=\"toLogin\">切换账号</a>\n</div>\n</div>\n<form class=\"cm-reply\">\n<div class=\"cm-fo-pre\"></div>\n<input type=\"hidden\" name=\"paid\" value=\"0\">\n<label class=\"cm-reply-text\">\n<textarea name=\"text\" cols=\"30\" rows=\"4\" placeholder=\"键入评论\"></textarea>\n</label>\n<div class=\"cm-reply-ctrl\">\n<div class=\"cm-submit\">\n<button action=\"submit\">发布</button>\n</div>\n<div class=\"cm-bar\">\n<button action=\"smile\">表情</button>\n<button action=\"pics\">图片</button>\n</div>\n<div class=\"cm-smile-box\">\n{{#smiles}}\n<span action=\"sm\">{{.}}</span>\n{{/smiles}}\n</div>\n</div>\n</form>\n{{/me.error}}\n{{$me.error}}\n<div class=\"cm-user\">\n<div class=\"cm-user-login\">\n使用 <a action=\"toWeibo\">微博认证</a> 或 <a action=\"toLogin\">账号登录</a> 参与评论\n</div>\n</div>\n{{/me.error}}"
}));

export default 萌评