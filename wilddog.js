(function() {
    var define = null;
    ! function(e) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
        else if ("function" == typeof define && define.amd) define([], e);
        else {
            var t; "undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" != typeof self && (t = self), t.eio = e() } }(function() {
        var e;
        return function t(e, r, n) {
            function o(i, a) {
                if (!r[i]) {
                    if (!e[i]) {
                        var c = "function" == typeof require && require;
                        if (!a && c) return c(i, !0);
                        if (s) return s(i, !0);
                        var p = new Error("Cannot find module '" + i + "'");
                        throw p.code = "MODULE_NOT_FOUND", p }
                    var u = r[i] = { exports: {} };
                    e[i][0].call(u.exports, function(t) {
                        var r = e[i][1][t];
                        return o(r ? r : t) }, u, u.exports, t, e, r, n) }
                return r[i].exports }
            for (var s = "function" == typeof require && require, i = 0; i < n.length; i++) o(n[i]);
            return o }({
            1: [function(e, t, r) { t.exports = e("./lib/") }, { "./lib/": 2 }],
            2: [function(e, t, r) { t.exports = e("./socket"), t.exports.parser = e("engine.io-parser") }, { "./socket": 3, "engine.io-parser": 20 }],
            3: [function(e, t, r) {
                (function(r) {
                    function n(e, t) {
                        if (!(this instanceof n)) return new n(e, t);
                        t = t || {}, e && "object" == typeof e && (t = e, e = null), e ? (e = u(e), t.hostname = e.host, t.secure = "https" == e.protocol || "wss" == e.protocol, t.port = e.port, e.query && (t.query = e.query)) : t.host && (t.hostname = u(t.host).host), this.secure = null != t.secure ? t.secure : r.location && "https:" == location.protocol, t.hostname && !t.port && (t.port = this.secure ? "443" : "80"), this.agent = t.agent || !1, this.hostname = t.hostname || (r.location ? location.hostname : "localhost"), this.port = t.port || (r.location && location.port ? location.port : this.secure ? 443 : 80), this.query = t.query || {}, "string" == typeof this.query && (this.query = f.decode(this.query)), this.upgrade = !1 !== t.upgrade, this.path = (t.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!t.forceJSONP, this.jsonp = !1 !== t.jsonp, this.forceBase64 = !!t.forceBase64, this.enablesXDR = !!t.enablesXDR, this.timestampParam = t.timestampParam || "t", this.timestampRequests = t.timestampRequests, this.transports = t.transports || ["polling", "websocket"], this.readyState = "", this.writeBuffer = [], this.policyPort = t.policyPort || 843, this.rememberUpgrade = t.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = t.onlyBinaryUpgrades, this.perMessageDeflate = !1 !== t.perMessageDeflate && (t.perMessageDeflate || {}), !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), this.pfx = t.pfx || null, this.key = t.key || null, this.passphrase = t.passphrase || null, this.cert = t.cert || null, this.ca = t.ca || null, this.ciphers = t.ciphers || null, this.rejectUnauthorized = void 0 === t.rejectUnauthorized || t.rejectUnauthorized;
                        var o = "object" == typeof r && r;
                        o.global === o && t.extraHeaders && Object.keys(t.extraHeaders).length > 0 && (this.extraHeaders = t.extraHeaders), this.open() }

                    function o(e) {
                        var t = {};
                        for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
                        return t }
                    var s = e("./transports"),
                        i = e("component-emitter"),
                        a = e("debug")("engine.io-client:socket"),
                        c = e("indexof"),
                        p = e("engine.io-parser"),
                        u = e("parseuri"),
                        h = e("parsejson"),
                        f = e("parseqs");
                    t.exports = n, n.priorWebsocketSuccess = !1, i(n.prototype), n.protocol = p.protocol, n.Socket = n, n.Transport = e("./transport"), n.transports = e("./transports"), n.parser = e("engine.io-parser"), n.prototype.createTransport = function(e) { a('creating transport "%s"', e);
                        var t = o(this.query);
                        t.EIO = p.protocol, t.transport = e, this.id && (t.sid = this.id);
                        var r = new s[e]({ agent: this.agent, hostname: this.hostname, port: this.port, secure: this.secure, path: this.path, query: t, forceJSONP: this.forceJSONP, jsonp: this.jsonp, forceBase64: this.forceBase64, enablesXDR: this.enablesXDR, timestampRequests: this.timestampRequests, timestampParam: this.timestampParam, policyPort: this.policyPort, socket: this, pfx: this.pfx, key: this.key, passphrase: this.passphrase, cert: this.cert, ca: this.ca, ciphers: this.ciphers, rejectUnauthorized: this.rejectUnauthorized, perMessageDeflate: this.perMessageDeflate, extraHeaders: this.extraHeaders });
                        return r }, n.prototype.open = function() {
                        var e;
                        if (this.rememberUpgrade && n.priorWebsocketSuccess && this.transports.indexOf("websocket") != -1) e = "websocket";
                        else {
                            if (0 === this.transports.length) {
                                var t = this;
                                return void setTimeout(function() { t.emit("error", "No transports available") }, 0) }
                            e = this.transports[0] }
                        this.readyState = "opening";
                        try { e = this.createTransport(e) } catch (r) {
                            return this.transports.shift(), void this.open() }
                        e.open(), this.setTransport(e) }, n.prototype.setTransport = function(e) { a("setting transport %s", e.name);
                        var t = this;
                        this.transport && (a("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), this.transport = e, e.on("drain", function() { t.onDrain() }).on("packet", function(e) { t.onPacket(e) }).on("error", function(e) { t.onError(e) }).on("close", function() { t.onClose("transport close") }) }, n.prototype.probe = function(e) {
                        function t() {
                            if (f.onlyBinaryUpgrades) {
                                var t = !this.supportsBinary && f.transport.supportsBinary;
                                h = h || t }
                            h || (a('probe transport "%s" opened', e), u.send([{ type: "ping", data: "probe" }]), u.once("packet", function(t) {
                                if (!h)
                                    if ("pong" == t.type && "probe" == t.data) {
                                        if (a('probe transport "%s" pong', e), f.upgrading = !0, f.emit("upgrading", u), !u) return;
                                        n.priorWebsocketSuccess = "websocket" == u.name, a('pausing current transport "%s"', f.transport.name), f.transport.pause(function() { h || "closed" != f.readyState && (a("changing transport and sending upgrade packet"), p(), f.setTransport(u), u.send([{ type: "upgrade" }]), f.emit("upgrade", u), u = null, f.upgrading = !1, f.flush()) }) } else { a('probe transport "%s" failed', e);
                                        var r = new Error("probe error");
                                        r.transport = u.name, f.emit("upgradeError", r) } })) }

                        function r() { h || (h = !0, p(), u.close(), u = null) }

                        function o(t) {
                            var n = new Error("probe error: " + t);
                            n.transport = u.name, r(), a('probe transport "%s" failed because of error: %s', e, t), f.emit("upgradeError", n) }

                        function s() { o("transport closed") }

                        function i() { o("socket closed") }

                        function c(e) { u && e.name != u.name && (a('"%s" works - aborting "%s"', e.name, u.name), r()) }

                        function p() { u.removeListener("open", t), u.removeListener("error", o), u.removeListener("close", s), f.removeListener("close", i), f.removeListener("upgrading", c) }
                        a('probing transport "%s"', e);
                        var u = this.createTransport(e, { probe: 1 }),
                            h = !1,
                            f = this;
                        n.priorWebsocketSuccess = !1, u.once("open", t), u.once("error", o), u.once("close", s), this.once("close", i), this.once("upgrading", c), u.open() }, n.prototype.onOpen = function() {
                        if (a("socket open"), this.readyState = "open", n.priorWebsocketSuccess = "websocket" == this.transport.name, this.emit("open"), this.flush(), "open" == this.readyState && this.upgrade && this.transport.pause) { a("starting upgrade probes");
                            for (var e = 0, t = this.upgrades.length; e < t; e++) this.probe(this.upgrades[e]) } }, n.prototype.onPacket = function(e) {
                        if ("opening" == this.readyState || "open" == this.readyState) switch (a('socket receive: type "%s", data "%s"', e.type, e.data), this.emit("packet", e), this.emit("heartbeat"), e.type) {
                            case "open":
                                this.onHandshake(h(e.data));
                                break;
                            case "pong":
                                this.setPing(), this.emit("pong");
                                break;
                            case "error":
                                var t = new Error("server error");
                                t.code = e.data, this.onError(t);
                                break;
                            case "message":
                                this.emit("data", e.data), this.emit("message", e.data) } else a('packet received with socket readyState "%s"', this.readyState) }, n.prototype.onHandshake = function(e) { this.emit("handshake", e), this.id = e.sid, this.transport.query.sid = e.sid, this.upgrades = this.filterUpgrades(e.upgrades), this.pingInterval = e.pingInterval, this.pingTimeout = e.pingTimeout, this.onOpen(), "closed" != this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat)) }, n.prototype.onHeartbeat = function(e) { clearTimeout(this.pingTimeoutTimer);
                        var t = this;
                        t.pingTimeoutTimer = setTimeout(function() { "closed" != t.readyState && t.onClose("ping timeout") }, e || t.pingInterval + t.pingTimeout) }, n.prototype.setPing = function() {
                        var e = this;
                        clearTimeout(e.pingIntervalTimer), e.pingIntervalTimer = setTimeout(function() { a("writing ping packet - expecting pong within %sms", e.pingTimeout), e.ping(), e.onHeartbeat(e.pingTimeout) }, e.pingInterval) }, n.prototype.ping = function() {
                        var e = this;
                        this.sendPacket("ping", function() { e.emit("ping") }) }, n.prototype.onDrain = function() { this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush() }, n.prototype.flush = function() { "closed" != this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (a("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush")) }, n.prototype.write = n.prototype.send = function(e, t, r) {
                        return this.sendPacket("message", e, t, r), this }, n.prototype.sendPacket = function(e, t, r, n) {
                        if ("function" == typeof t && (n = t, t = void 0), "function" == typeof r && (n = r, r = null), "closing" != this.readyState && "closed" != this.readyState) { r = r || {}, r.compress = !1 !== r.compress;
                            var o = { type: e, data: t, options: r };
                            this.emit("packetCreate", o), this.writeBuffer.push(o), n && this.once("flush", n), this.flush() } }, n.prototype.close = function() {
                        function e() { n.onClose("forced close"), a("socket closing - telling transport to close"), n.transport.close() }

                        function t() { n.removeListener("upgrade", t), n.removeListener("upgradeError", t), e() }

                        function r() { n.once("upgrade", t), n.once("upgradeError", t) }
                        if ("opening" == this.readyState || "open" == this.readyState) { this.readyState = "closing";
                            var n = this;
                            this.writeBuffer.length ? this.once("drain", function() { this.upgrading ? r() : e() }) : this.upgrading ? r() : e() }
                        return this }, n.prototype.onError = function(e) { a("socket error %j", e), n.priorWebsocketSuccess = !1, this.emit("error", e), this.onClose("transport error", e) }, n.prototype.onClose = function(e, t) {
                        if ("opening" == this.readyState || "open" == this.readyState || "closing" == this.readyState) { a('socket close with reason: "%s"', e);
                            var r = this;
                            clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", e, t), r.writeBuffer = [], r.prevBufferLen = 0 } }, n.prototype.filterUpgrades = function(e) {
                        for (var t = [], r = 0, n = e.length; r < n; r++) ~c(this.transports, e[r]) && t.push(e[r]);
                        return t } }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {}) }, { "./transport": 4, "./transports": 5, "component-emitter": 16, debug: 18, "engine.io-parser": 20, indexof: 24, parsejson: 27, parseqs: 28, parseuri: 29 }],
            4: [function(e, t, r) {
                function n(e) { this.path = e.path, this.hostname = e.hostname, this.port = e.port, this.secure = e.secure, this.query = e.query, this.timestampParam = e.timestampParam, this.timestampRequests = e.timestampRequests, this.readyState = "", this.agent = e.agent || !1, this.socket = e.socket, this.enablesXDR = e.enablesXDR, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert = e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized, this.extraHeaders = e.extraHeaders }
                var o = e("engine.io-parser"),
                    s = e("component-emitter");
                t.exports = n, s(n.prototype), n.prototype.onError = function(e, t) {
                    var r = new Error(e);
                    return r.type = "TransportError", r.description = t, this.emit("error", r), this }, n.prototype.open = function() {
                    return "closed" != this.readyState && "" != this.readyState || (this.readyState = "opening", this.doOpen()), this }, n.prototype.close = function() {
                    return "opening" != this.readyState && "open" != this.readyState || (this.doClose(), this.onClose()), this }, n.prototype.send = function(e) {
                    if ("open" != this.readyState) throw new Error("Transport not open");
                    this.write(e) }, n.prototype.onOpen = function() { this.readyState = "open", this.writable = !0, this.emit("open") }, n.prototype.onData = function(e) {
                    var t = o.decodePacket(e, this.socket.binaryType);
                    this.onPacket(t) }, n.prototype.onPacket = function(e) { this.emit("packet", e) }, n.prototype.onClose = function() { this.readyState = "closed", this.emit("close") } }, { "component-emitter": 16, "engine.io-parser": 20 }],
            5: [function(e, t, r) {
                (function(t) {
                    function n(e) {
                        var r, n = !1,
                            a = !1,
                            c = !1 !== e.jsonp;
                        if (t.location) {
                            var p = "https:" == location.protocol,
                                u = location.port;
                            u || (u = p ? 443 : 80), n = e.hostname != location.hostname || u != e.port, a = e.secure != p }
                        if (e.xdomain = n, e.xscheme = a, r = new o(e), "open" in r && !e.forceJSONP) return new s(e);
                        if (!c) throw new Error("JSONP disabled");
                        return new i(e) }
                    var o = e("xmlhttprequest-ssl"),
                        s = e("./polling-xhr"),
                        i = e("./polling-jsonp"),
                        a = e("./websocket");
                    r.polling = n, r.websocket = a }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {}) }, { "./polling-jsonp": 6, "./polling-xhr": 7, "./websocket": 9, "xmlhttprequest-ssl": 10 }],
            6: [function(e, t, r) {
                (function(r) {
                    function n() {}

                    function o(e) { s.call(this, e), this.query = this.query || {}, a || (r.___eio || (r.___eio = []), a = r.___eio), this.index = a.length;
                        var t = this;
                        a.push(function(e) { t.onData(e) }), this.query.j = this.index, r.document && r.addEventListener && r.addEventListener("beforeunload", function() { t.script && (t.script.onerror = n) }, !1) }
                    var s = e("./polling"),
                        i = e("component-inherit");
                    t.exports = o;
                    var a, c = /\n/g,
                        p = /\\n/g;
                    i(o, s), o.prototype.supportsBinary = !1, o.prototype.doClose = function() { this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), s.prototype.doClose.call(this) }, o.prototype.doPoll = function() {
                        var e = this,
                            t = document.createElement("script");
                        this.script && (this.script.parentNode.removeChild(this.script), this.script = null), t.async = !0, t.src = this.uri(), t.onerror = function(t) { e.onError("jsonp poll error", t) };
                        var r = document.getElementsByTagName("script")[0];
                        r ? r.parentNode.insertBefore(t, r) : (document.head || document.body).appendChild(t), this.script = t;
                        var n = "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent);
                        n && setTimeout(function() {
                            var e = document.createElement("iframe");
                            document.body.appendChild(e), document.body.removeChild(e) }, 100) }, o.prototype.doWrite = function(e, t) {
                        function r() { n(), t() }

                        function n() {
                            if (o.iframe) try { o.form.removeChild(o.iframe) } catch (e) { o.onError("jsonp polling iframe removal error", e) }
                            try {
                                var t = '<iframe src="javascript:0" name="' + o.iframeId + '">';
                                s = document.createElement(t) } catch (e) { s = document.createElement("iframe"), s.name = o.iframeId, s.src = "javascript:0" }
                            s.id = o.iframeId, o.form.appendChild(s), o.iframe = s }
                        var o = this;
                        if (!this.form) {
                            var s, i = document.createElement("form"),
                                a = document.createElement("textarea"),
                                u = this.iframeId = "eio_iframe_" + this.index;
                            i.className = "socketio", i.style.position = "absolute", i.style.top = "-1000px", i.style.left = "-1000px", i.target = u, i.method = "POST", i.setAttribute("accept-charset", "utf-8"), a.name = "d", i.appendChild(a), document.body.appendChild(i), this.form = i, this.area = a }
                        this.form.action = this.uri(), n(), e = e.replace(p, "\\\n"), this.area.value = e.replace(c, "\\n");
                        try { this.form.submit() } catch (h) {}
                        this.iframe.attachEvent ? this.iframe.onreadystatechange = function() { "complete" == o.iframe.readyState && r() } : this.iframe.onload = r } }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {}) }, { "./polling": 8, "component-inherit": 17 }],
            7: [function(e, t, r) {
                (function(r) {
                    function n() {}

                    function o(e) {
                        if (c.call(this, e), r.location) {
                            var t = "https:" == location.protocol,
                                n = location.port;
                            n || (n = t ? 443 : 80), this.xd = e.hostname != r.location.hostname || n != e.port, this.xs = e.secure != t } else this.extraHeaders = e.extraHeaders }

                    function s(e) { this.method = e.method || "GET", this.uri = e.uri, this.xd = !!e.xd, this.xs = !!e.xs, this.async = !1 !== e.async, this.data = void 0 != e.data ? e.data : null, this.agent = e.agent, this.isBinary = e.isBinary, this.supportsBinary = e.supportsBinary, this.enablesXDR = e.enablesXDR, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert = e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized, this.extraHeaders = e.extraHeaders, this.create() }

                    function i() {
                        for (var e in s.requests) s.requests.hasOwnProperty(e) && s.requests[e].abort() }
                    var a = e("xmlhttprequest-ssl"),
                        c = e("./polling"),
                        p = e("component-emitter"),
                        u = e("component-inherit"),
                        h = e("debug")("engine.io-client:polling-xhr");
                    t.exports = o, t.exports.Request = s, u(o, c), o.prototype.supportsBinary = !0, o.prototype.request = function(e) {
                        return e = e || {}, e.uri = this.uri(), e.xd = this.xd, e.xs = this.xs, e.agent = this.agent || !1, e.supportsBinary = this.supportsBinary, e.enablesXDR = this.enablesXDR, e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized, e.extraHeaders = this.extraHeaders, new s(e) }, o.prototype.doWrite = function(e, t) {
                        var r = "string" != typeof e && void 0 !== e,
                            n = this.request({ method: "POST", data: e, isBinary: r }),
                            o = this;
                        n.on("success", t), n.on("error", function(e) { o.onError("xhr post error", e) }), this.sendXhr = n }, o.prototype.doPoll = function() { h("xhr poll");
                        var e = this.request(),
                            t = this;
                        e.on("data", function(e) { t.onData(e) }), e.on("error", function(e) { t.onError("xhr poll error", e) }), this.pollXhr = e }, p(s.prototype), s.prototype.create = function() {
                        var e = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };
                        e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized;
                        var t = this.xhr = new a(e),
                            n = this;
                        try { h("xhr open %s: %s", this.method, this.uri), t.open(this.method, this.uri, this.async);
                            try {
                                if (this.extraHeaders) { t.setDisableHeaderCheck(!0);
                                    for (var o in this.extraHeaders) this.extraHeaders.hasOwnProperty(o) && t.setRequestHeader(o, this.extraHeaders[o]) } } catch (i) {}
                            if (this.supportsBinary && (t.responseType = "arraybuffer"), "POST" == this.method) try { this.isBinary ? t.setRequestHeader("Content-type", "application/octet-stream") : t.setRequestHeader("Content-type", "text/plain;charset=UTF-8") } catch (i) {}
                            "withCredentials" in t && (t.withCredentials = !0), this.hasXDR() ? (t.onload = function() { n.onLoad() }, t.onerror = function() { n.onError(t.responseText) }) : t.onreadystatechange = function() { 4 == t.readyState && (200 == t.status || 1223 == t.status ? n.onLoad() : setTimeout(function() { n.onError(t.status) }, 0)) }, h("xhr data %s", this.data), t.send(this.data) } catch (i) {
                            return void setTimeout(function() { n.onError(i) }, 0) }
                        r.document && (this.index = s.requestsCount++, s.requests[this.index] = this) }, s.prototype.onSuccess = function() { this.emit("success"), this.cleanup() }, s.prototype.onData = function(e) { this.emit("data", e), this.onSuccess() }, s.prototype.onError = function(e) { this.emit("error", e), this.cleanup(!0) }, s.prototype.cleanup = function(e) {
                        if ("undefined" != typeof this.xhr && null !== this.xhr) {
                            if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = n : this.xhr.onreadystatechange = n, e) try { this.xhr.abort() } catch (t) {}
                            r.document && delete s.requests[this.index], this.xhr = null } }, s.prototype.onLoad = function() {
                        var e;
                        try {
                            var t;
                            try { t = this.xhr.getResponseHeader("Content-Type").split(";")[0] } catch (r) {}
                            if ("application/octet-stream" === t) e = this.xhr.response;
                            else if (this.supportsBinary) try { e = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response)) } catch (r) {
                                for (var n = new Uint8Array(this.xhr.response), o = [], s = 0, i = n.length; s < i; s++) o.push(n[s]);
                                e = String.fromCharCode.apply(null, o) } else e = this.xhr.responseText } catch (r) { this.onError(r) }
                        null != e && this.onData(e) }, s.prototype.hasXDR = function() {
                        return "undefined" != typeof r.XDomainRequest && !this.xs && this.enablesXDR }, s.prototype.abort = function() { this.cleanup() }, r.document && (s.requestsCount = 0, s.requests = {}, r.attachEvent ? r.attachEvent("onunload", i) : r.addEventListener && r.addEventListener("beforeunload", i, !1)) }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {}) }, { "./polling": 8, "component-emitter": 16, "component-inherit": 17, debug: 18, "xmlhttprequest-ssl": 10 }],
            8: [function(e, t, r) {
                function n(e) {
                    var t = e && e.forceBase64;
                    u && !t || (this.supportsBinary = !1), o.call(this, e) }
                var o = e("../transport"),
                    s = e("parseqs"),
                    i = e("engine.io-parser"),
                    a = e("component-inherit"),
                    c = e("yeast"),
                    p = e("debug")("engine.io-client:polling");
                t.exports = n;
                var u = function() {
                    var t = e("xmlhttprequest-ssl"),
                        r = new t({ xdomain: !1 });
                    return null != r.responseType }();
                a(n, o), n.prototype.name = "polling", n.prototype.doOpen = function() { this.poll() }, n.prototype.pause = function(e) {
                    function t() { p("paused"), r.readyState = "paused", e() }
                    var r = this;
                    if (this.readyState = "pausing", this.polling || !this.writable) {
                        var n = 0;
                        this.polling && (p("we are currently polling - waiting to pause"), n++, this.once("pollComplete", function() { p("pre-pause polling complete"), --n || t() })), this.writable || (p("we are currently writing - waiting to pause"), n++, this.once("drain", function() { p("pre-pause writing complete"), --n || t() })) } else t() }, n.prototype.poll = function() { p("polling"), this.polling = !0, this.doPoll(), this.emit("poll") }, n.prototype.onData = function(e) {
                    var t = this;
                    p("polling got data %s", e);
                    var r = function(e, r, n) {
                        return "opening" == t.readyState && t.onOpen(), "close" == e.type ? (t.onClose(), !1) : void t.onPacket(e) };
                    i.decodePayload(e, this.socket.binaryType, r), "closed" != this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" == this.readyState ? this.poll() : p('ignoring poll - transport state "%s"', this.readyState)) }, n.prototype.doClose = function() {
                    function e() { p("writing close packet"), t.write([{ type: "close" }]) }
                    var t = this; "open" == this.readyState ? (p("transport open - closing"), e()) : (p("transport not open - deferring close"), this.once("open", e)) }, n.prototype.write = function(e) {
                    var t = this;
                    this.writable = !1;
                    var r = function() { t.writable = !0, t.emit("drain") },
                        t = this;
                    i.encodePayload(e, this.supportsBinary, function(e) { t.doWrite(e, r) }) }, n.prototype.uri = function() {
                    var e = this.query || {},
                        t = this.secure ? "https" : "http",
                        r = "";!1 !== this.timestampRequests && (e[this.timestampParam] = c()), this.supportsBinary || e.sid || (e.b64 = 1), e = s.encode(e), this.port && ("https" == t && 443 != this.port || "http" == t && 80 != this.port) && (r = ":" + this.port), e.length && (e = "?" + e);
                    var n = this.hostname.indexOf(":") !== -1;
                    return t + "://" + (n ? "[" + this.hostname + "]" : this.hostname) + r + this.path + e } }, { "../transport": 4, "component-inherit": 17, debug: 18, "engine.io-parser": 20, parseqs: 28, "xmlhttprequest-ssl": 10, yeast: 31 }],
            9: [function(e, t, r) {
                (function(r) {
                    function n(e) {
                        var t = e && e.forceBase64;
                        t && (this.supportsBinary = !1), this.perMessageDeflate = e.perMessageDeflate, o.call(this, e) }
                    var o = e("../transport"),
                        s = e("engine.io-parser"),
                        i = e("parseqs"),
                        a = e("component-inherit"),
                        c = e("yeast"),
                        p = e("debug")("engine.io-client:websocket"),
                        u = r.WebSocket || r.MozWebSocket,
                        h = u;
                    if (!h && "undefined" == typeof window) try { h = e("ws") } catch (f) {}
                    t.exports = n, a(n, o), n.prototype.name = "websocket", n.prototype.supportsBinary = !0, n.prototype.doOpen = function() {
                        if (this.check()) {
                            var e = this.uri(),
                                t = void 0,
                                r = { agent: this.agent, perMessageDeflate: this.perMessageDeflate };
                            r.pfx = this.pfx, r.key = this.key, r.passphrase = this.passphrase, r.cert = this.cert, r.ca = this.ca, r.ciphers = this.ciphers, r.rejectUnauthorized = this.rejectUnauthorized, this.extraHeaders && (r.headers = this.extraHeaders), this.ws = u ? new h(e) : new h(e, t, r), void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = "buffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners() } }, n.prototype.addEventListeners = function() {
                        var e = this;
                        this.ws.onopen = function() { e.onOpen() }, this.ws.onclose = function() { e.onClose() }, this.ws.onmessage = function(t) { e.onData(t.data) }, this.ws.onerror = function(t) { e.onError("websocket error", t) } }, "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent) && (n.prototype.onData = function(e) {
                        var t = this;
                        setTimeout(function() { o.prototype.onData.call(t, e) }, 0) }), n.prototype.write = function(e) {
                        function t() { n.emit("flush"), setTimeout(function() { n.writable = !0, n.emit("drain") }, 0) }
                        var n = this;
                        this.writable = !1;
                        for (var o = e.length, i = 0, a = o; i < a; i++) ! function(e) { s.encodePacket(e, n.supportsBinary, function(s) {
                                if (!u) {
                                    var i = {};
                                    if (e.options && (i.compress = e.options.compress), n.perMessageDeflate) {
                                        var a = "string" == typeof s ? r.Buffer.byteLength(s) : s.length;
                                        a < n.perMessageDeflate.threshold && (i.compress = !1) } }
                                try { u ? n.ws.send(s) : n.ws.send(s, i) } catch (c) { p("websocket closed before onclose event") }--o || t() }) }(e[i]) }, n.prototype.onClose = function() { o.prototype.onClose.call(this) }, n.prototype.doClose = function() { "undefined" != typeof this.ws && this.ws.close() }, n.prototype.uri = function() {
                        var e = this.query || {},
                            t = this.secure ? "wss" : "ws",
                            r = "";
                        this.port && ("wss" == t && 443 != this.port || "ws" == t && 80 != this.port) && (r = ":" + this.port), this.timestampRequests && (e[this.timestampParam] = c()), this.supportsBinary || (e.b64 = 1), e = i.encode(e), e.length && (e = "?" + e);
                        var n = this.hostname.indexOf(":") !== -1;
                        return t + "://" + (n ? "[" + this.hostname + "]" : this.hostname) + r + this.path + e }, n.prototype.check = function() {
                        return !(!h || "__initialize" in h && this.name === n.prototype.name) } }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {}) }, { "../transport": 4, "component-inherit": 17, debug: 18, "engine.io-parser": 20, parseqs: 28, ws: 15, yeast: 31 }],
            10: [function(e, t, r) {
                var n = e("has-cors");
                t.exports = function(e) {
                    var t = e.xdomain,
                        r = e.xscheme,
                        o = e.enablesXDR;
                    try {
                        if ("undefined" != typeof XMLHttpRequest && (!t || n)) return new XMLHttpRequest } catch (s) {}
                    try {
                        if ("undefined" != typeof XDomainRequest && !r && o) return new XDomainRequest } catch (s) {}
                    if (!t) try {
                        return new ActiveXObject("Microsoft.XMLHTTP") } catch (s) {} } }, { "has-cors": 23 }],
            11: [function(e, t, r) {
                function n(e, t, r) {
                    function n(e, o) {
                        if (n.count <= 0) throw new Error("after called too many times");--n.count, e ? (s = !0, t(e), t = r) : 0 !== n.count || s || t(null, o) }
                    var s = !1;
                    return r = r || o, n.count = e, 0 === e ? t() : n }

                function o() {}
                t.exports = n }, {}],
            12: [function(e, t, r) { t.exports = function(e, t, r) {
                    var n = e.byteLength;
                    if (t = t || 0, r = r || n, e.slice) return e.slice(t, r);
                    if (t < 0 && (t += n), r < 0 && (r += n), r > n && (r = n), t >= n || t >= r || 0 === n) return new ArrayBuffer(0);
                    for (var o = new Uint8Array(e), s = new Uint8Array(r - t), i = t, a = 0; i < r; i++, a++) s[a] = o[i];
                    return s.buffer } }, {}],
            13: [function(e, t, r) {! function(e) { "use strict";
                    r.encode = function(t) {
                        var r, n = new Uint8Array(t),
                            o = n.length,
                            s = "";
                        for (r = 0; r < o; r += 3) s += e[n[r] >> 2], s += e[(3 & n[r]) << 4 | n[r + 1] >> 4], s += e[(15 & n[r + 1]) << 2 | n[r + 2] >> 6], s += e[63 & n[r + 2]];
                        return o % 3 === 2 ? s = s.substring(0, s.length - 1) + "=" : o % 3 === 1 && (s = s.substring(0, s.length - 2) + "=="), s }, r.decode = function(t) {
                        var r, n, o, s, i, a = .75 * t.length,
                            c = t.length,
                            p = 0; "=" === t[t.length - 1] && (a--, "=" === t[t.length - 2] && a--);
                        var u = new ArrayBuffer(a),
                            h = new Uint8Array(u);
                        for (r = 0; r < c; r += 4) n = e.indexOf(t[r]), o = e.indexOf(t[r + 1]), s = e.indexOf(t[r + 2]), i = e.indexOf(t[r + 3]), h[p++] = n << 2 | o >> 4, h[p++] = (15 & o) << 4 | s >> 2, h[p++] = (3 & s) << 6 | 63 & i;
                        return u } }("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/") }, {}],
            14: [function(e, t, r) {
                (function(e) {
                    function r(e) {
                        for (var t = 0; t < e.length; t++) {
                            var r = e[t];
                            if (r.buffer instanceof ArrayBuffer) {
                                var n = r.buffer;
                                if (r.byteLength !== n.byteLength) {
                                    var o = new Uint8Array(r.byteLength);
                                    o.set(new Uint8Array(n, r.byteOffset, r.byteLength)), n = o.buffer }
                                e[t] = n } } }

                    function n(e, t) { t = t || {};
                        var n = new s;
                        r(e);
                        for (var o = 0; o < e.length; o++) n.append(e[o]);
                        return t.type ? n.getBlob(t.type) : n.getBlob() }

                    function o(e, t) {
                        return r(e), new Blob(e, t || {}) }
                    var s = e.BlobBuilder || e.WebKitBlobBuilder || e.MSBlobBuilder || e.MozBlobBuilder,
                        i = function() {
                            try {
                                var e = new Blob(["hi"]);
                                return 2 === e.size } catch (t) {
                                return !1 } }(),
                        a = i && function() {
                            try {
                                var e = new Blob([new Uint8Array([1, 2])]);
                                return 2 === e.size } catch (t) {
                                return !1 } }(),
                        c = s && s.prototype.append && s.prototype.getBlob;
                    t.exports = function() {
                        return i ? a ? e.Blob : o : c ? n : void 0 }() }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {}) }, {}],
            15: [function(e, t, r) {}, {}],
            16: [function(e, t, r) {
                function n(e) {
                    if (e) return o(e) }

                function o(e) {
                    for (var t in n.prototype) e[t] = n.prototype[t];
                    return e }
                t.exports = n, n.prototype.on = n.prototype.addEventListener = function(e, t) {
                    return this._callbacks = this._callbacks || {}, (this._callbacks[e] = this._callbacks[e] || []).push(t), this }, n.prototype.once = function(e, t) {
                    function r() { n.off(e, r), t.apply(this, arguments) }
                    var n = this;
                    return this._callbacks = this._callbacks || {}, r.fn = t, this.on(e, r), this }, n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function(e, t) {
                    if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
                    var r = this._callbacks[e];
                    if (!r) return this;
                    if (1 == arguments.length) return delete this._callbacks[e], this;
                    for (var n, o = 0; o < r.length; o++)
                        if (n = r[o], n === t || n.fn === t) { r.splice(o, 1);
                            break }
                    return this }, n.prototype.emit = function(e) { this._callbacks = this._callbacks || {};
                    var t = [].slice.call(arguments, 1),
                        r = this._callbacks[e];
                    if (r) { r = r.slice(0);
                        for (var n = 0, o = r.length; n < o; ++n) r[n].apply(this, t) }
                    return this }, n.prototype.listeners = function(e) {
                    return this._callbacks = this._callbacks || {}, this._callbacks[e] || [] }, n.prototype.hasListeners = function(e) {
                    return !!this.listeners(e).length } }, {}],
            17: [function(e, t, r) { t.exports = function(e, t) {
                    var r = function() {};
                    r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e } }, {}],
            18: [function(e, t, r) {
                function n() {
                    return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 }

                function o() {
                    var e = arguments,
                        t = this.useColors;
                    if (e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + r.humanize(this.diff), !t) return e;
                    var n = "color: " + this.color;
                    e = [e[0], n, "color: inherit"].concat(Array.prototype.slice.call(e, 1));
                    var o = 0,
                        s = 0;
                    return e[0].replace(/%[a-z%]/g, function(e) { "%%" !== e && (o++, "%c" === e && (s = o)) }), e.splice(s, 0, n), e }

                function s() {
                    return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments) }

                function i(e) {
                    try { null == e ? r.storage.removeItem("debug") : r.storage.debug = e } catch (t) {} }

                function a() {
                    var e;
                    try { e = r.storage.debug } catch (t) {}
                    return e }

                function c() {
                    try {
                        return window.localStorage } catch (e) {} }
                r = t.exports = e("./debug"), r.log = s, r.formatArgs = o, r.save = i, r.load = a, r.useColors = n, r.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : c(), r.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"], r.formatters.j = function(e) {
                    return JSON.stringify(e) }, r.enable(a()) }, { "./debug": 19 }],
            19: [function(e, t, r) {
                function n() {
                    return r.colors[u++ % r.colors.length] }

                function o(e) {
                    function t() {}

                    function o() {
                        var e = o,
                            t = +new Date,
                            s = t - (p || t);
                        e.diff = s, e.prev = p, e.curr = t, p = t, null == e.useColors && (e.useColors = r.useColors()), null == e.color && e.useColors && (e.color = n());
                        var i = Array.prototype.slice.call(arguments);
                        i[0] = r.coerce(i[0]), "string" != typeof i[0] && (i = ["%o"].concat(i));
                        var a = 0;
                        i[0] = i[0].replace(/%([a-z%])/g, function(t, n) {
                            if ("%%" === t) return t;
                            a++;
                            var o = r.formatters[n];
                            if ("function" == typeof o) {
                                var s = i[a];
                                t = o.call(e, s), i.splice(a, 1), a-- }
                            return t }), "function" == typeof r.formatArgs && (i = r.formatArgs.apply(e, i));
                        var c = o.log || r.log || console.log.bind(console);
                        c.apply(e, i) }
                    t.enabled = !1, o.enabled = !0;
                    var s = r.enabled(e) ? o : t;
                    return s.namespace = e, s }

                function s(e) { r.save(e);
                    for (var t = (e || "").split(/[\s,]+/), n = t.length, o = 0; o < n; o++) t[o] && (e = t[o].replace(/\*/g, ".*?"), "-" === e[0] ? r.skips.push(new RegExp("^" + e.substr(1) + "$")) : r.names.push(new RegExp("^" + e + "$"))) }

                function i() { r.enable("") }

                function a(e) {
                    var t, n;
                    for (t = 0, n = r.skips.length; t < n; t++)
                        if (r.skips[t].test(e)) return !1;
                    for (t = 0, n = r.names.length; t < n; t++)
                        if (r.names[t].test(e)) return !0;
                    return !1 }

                function c(e) {
                    return e instanceof Error ? e.stack || e.message : e }
                r = t.exports = o, r.coerce = c, r.disable = i, r.enable = s, r.enabled = a, r.humanize = e("ms"), r.names = [], r.skips = [], r.formatters = {};
                var p, u = 0 }, { ms: 26 }],
            20: [function(e, t, r) {
                (function(t) {
                    function n(e, t) {
                        var n = "b" + r.packets[e.type] + e.data.data;
                        return t(n) }

                    function o(e, t, n) {
                        if (!t) return r.encodeBase64Packet(e, n);
                        var o = e.data,
                            s = new Uint8Array(o),
                            i = new Uint8Array(1 + o.byteLength);
                        i[0] = m[e.type];
                        for (var a = 0; a < s.length; a++) i[a + 1] = s[a];
                        return n(i.buffer) }

                    function s(e, t, n) {
                        if (!t) return r.encodeBase64Packet(e, n);
                        var o = new FileReader;
                        return o.onload = function() { e.data = o.result, r.encodePacket(e, t, !0, n) }, o.readAsArrayBuffer(e.data) }

                    function i(e, t, n) {
                        if (!t) return r.encodeBase64Packet(e, n);
                        if (g) return s(e, t, n);
                        var o = new Uint8Array(1);
                        o[0] = m[e.type];
                        var i = new w([o.buffer, e.data]);
                        return n(i) }

                    function a(e, t, r) {
                        for (var n = new Array(e.length), o = f(e.length, r), s = function(e, r, o) { t(r, function(t, r) { n[e] = r, o(t, n) }) }, i = 0; i < e.length; i++) s(i, e[i], o) }
                    var c = e("./keys"),
                        p = e("has-binary"),
                        u = e("arraybuffer.slice"),
                        h = e("base64-arraybuffer"),
                        f = e("after"),
                        l = e("utf8"),
                        d = navigator.userAgent.match(/Android/i),
                        y = /PhantomJS/i.test(navigator.userAgent),
                        g = d || y;
                    r.protocol = 3;
                    var m = r.packets = {
                            open: 0,
                            close: 1,
                            ping: 2,
                            pong: 3,
                            message: 4,
                            upgrade: 5,
                            noop: 6
                        },
                        v = c(m),
                        b = { type: "error", data: "parser error" },
                        w = e("blob");
                    r.encodePacket = function(e, r, s, a) { "function" == typeof r && (a = r, r = !1), "function" == typeof s && (a = s, s = null);
                        var c = void 0 === e.data ? void 0 : e.data.buffer || e.data;
                        if (t.ArrayBuffer && c instanceof ArrayBuffer) return o(e, r, a);
                        if (w && c instanceof t.Blob) return i(e, r, a);
                        if (c && c.base64) return n(e, a);
                        var p = m[e.type];
                        return void 0 !== e.data && (p += s ? l.encode(String(e.data)) : String(e.data)), a("" + p) }, r.encodeBase64Packet = function(e, n) {
                        var o = "b" + r.packets[e.type];
                        if (w && e.data instanceof t.Blob) {
                            var s = new FileReader;
                            return s.onload = function() {
                                var e = s.result.split(",")[1];
                                n(o + e) }, s.readAsDataURL(e.data) }
                        var i;
                        try { i = String.fromCharCode.apply(null, new Uint8Array(e.data)) } catch (a) {
                            for (var c = new Uint8Array(e.data), p = new Array(c.length), u = 0; u < c.length; u++) p[u] = c[u];
                            i = String.fromCharCode.apply(null, p) }
                        return o += t.btoa(i), n(o) }, r.decodePacket = function(e, t, n) {
                        if ("string" == typeof e || void 0 === e) {
                            if ("b" == e.charAt(0)) return r.decodeBase64Packet(e.substr(1), t);
                            if (n) try { e = l.decode(e) } catch (o) {
                                return b }
                            var s = e.charAt(0);
                            return Number(s) == s && v[s] ? e.length > 1 ? { type: v[s], data: e.substring(1) } : { type: v[s] } : b }
                        var i = new Uint8Array(e),
                            s = i[0],
                            a = u(e, 1);
                        return w && "blob" === t && (a = new w([a])), { type: v[s], data: a } }, r.decodeBase64Packet = function(e, r) {
                        var n = v[e.charAt(0)];
                        if (!t.ArrayBuffer) return { type: n, data: { base64: !0, data: e.substr(1) } };
                        var o = h.decode(e.substr(1));
                        return "blob" === r && w && (o = new w([o])), { type: n, data: o } }, r.encodePayload = function(e, t, n) {
                        function o(e) {
                            return e.length + ":" + e }

                        function s(e, n) { r.encodePacket(e, !!i && t, !0, function(e) { n(null, o(e)) }) } "function" == typeof t && (n = t, t = null);
                        var i = p(e);
                        return t && i ? w && !g ? r.encodePayloadAsBlob(e, n) : r.encodePayloadAsArrayBuffer(e, n) : e.length ? void a(e, s, function(e, t) {
                            return n(t.join("")) }) : n("0:") }, r.decodePayload = function(e, t, n) {
                        if ("string" != typeof e) return r.decodePayloadAsBinary(e, t, n); "function" == typeof t && (n = t, t = null);
                        var o;
                        if ("" == e) return n(b, 0, 1);
                        for (var s, i, a = "", c = 0, p = e.length; c < p; c++) {
                            var u = e.charAt(c);
                            if (":" != u) a += u;
                            else {
                                if ("" == a || a != (s = Number(a))) return n(b, 0, 1);
                                if (i = e.substr(c + 1, s), a != i.length) return n(b, 0, 1);
                                if (i.length) {
                                    if (o = r.decodePacket(i, t, !0), b.type == o.type && b.data == o.data) return n(b, 0, 1);
                                    var h = n(o, c + s, p);
                                    if (!1 === h) return }
                                c += s, a = "" } }
                        return "" != a ? n(b, 0, 1) : void 0 }, r.encodePayloadAsArrayBuffer = function(e, t) {
                        function n(e, t) { r.encodePacket(e, !0, !0, function(e) {
                                return t(null, e) }) }
                        return e.length ? void a(e, n, function(e, r) {
                            var n = r.reduce(function(e, t) {
                                    var r;
                                    return r = "string" == typeof t ? t.length : t.byteLength, e + r.toString().length + r + 2 }, 0),
                                o = new Uint8Array(n),
                                s = 0;
                            return r.forEach(function(e) {
                                var t = "string" == typeof e,
                                    r = e;
                                if (t) {
                                    for (var n = new Uint8Array(e.length), i = 0; i < e.length; i++) n[i] = e.charCodeAt(i);
                                    r = n.buffer }
                                t ? o[s++] = 0 : o[s++] = 1;
                                for (var a = r.byteLength.toString(), i = 0; i < a.length; i++) o[s++] = parseInt(a[i]);
                                o[s++] = 255;
                                for (var n = new Uint8Array(r), i = 0; i < n.length; i++) o[s++] = n[i] }), t(o.buffer) }) : t(new ArrayBuffer(0)) }, r.encodePayloadAsBlob = function(e, t) {
                        function n(e, t) { r.encodePacket(e, !0, !0, function(e) {
                                var r = new Uint8Array(1);
                                if (r[0] = 1, "string" == typeof e) {
                                    for (var n = new Uint8Array(e.length), o = 0; o < e.length; o++) n[o] = e.charCodeAt(o);
                                    e = n.buffer, r[0] = 0 }
                                for (var s = e instanceof ArrayBuffer ? e.byteLength : e.size, i = s.toString(), a = new Uint8Array(i.length + 1), o = 0; o < i.length; o++) a[o] = parseInt(i[o]);
                                if (a[i.length] = 255, w) {
                                    var c = new w([r.buffer, a.buffer, e]);
                                    t(null, c) } }) }
                        a(e, n, function(e, r) {
                            return t(new w(r)) }) }, r.decodePayloadAsBinary = function(e, t, n) { "function" == typeof t && (n = t, t = null);
                        for (var o = e, s = [], i = !1; o.byteLength > 0;) {
                            for (var a = new Uint8Array(o), c = 0 === a[0], p = "", h = 1; 255 != a[h]; h++) {
                                if (p.length > 310) { i = !0;
                                    break }
                                p += a[h] }
                            if (i) return n(b, 0, 1);
                            o = u(o, 2 + p.length), p = parseInt(p);
                            var f = u(o, 0, p);
                            if (c) try { f = String.fromCharCode.apply(null, new Uint8Array(f)) } catch (l) {
                                var d = new Uint8Array(f);
                                f = "";
                                for (var h = 0; h < d.length; h++) f += String.fromCharCode(d[h]) }
                            s.push(f), o = u(o, p) }
                        var y = s.length;
                        s.forEach(function(e, o) { n(r.decodePacket(e, t, !0), o, y) }) }
                }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {})
            }, { "./keys": 21, after: 11, "arraybuffer.slice": 12, "base64-arraybuffer": 13, blob: 14, "has-binary": 22, utf8: 30 }],
            21: [function(e, t, r) { t.exports = Object.keys || function(e) {
                    var t = [],
                        r = Object.prototype.hasOwnProperty;
                    for (var n in e) r.call(e, n) && t.push(n);
                    return t } }, {}],
            22: [function(e, t, r) {
                (function(r) {
                    function n(e) {
                        function t(e) {
                            if (!e) return !1;
                            if (r.Buffer && r.Buffer.isBuffer(e) || r.ArrayBuffer && e instanceof ArrayBuffer || r.Blob && e instanceof Blob || r.File && e instanceof File) return !0;
                            if (o(e)) {
                                for (var n = 0; n < e.length; n++)
                                    if (t(e[n])) return !0 } else if (e && "object" == typeof e) { e.toJSON && (e = e.toJSON());
                                for (var s in e)
                                    if (Object.prototype.hasOwnProperty.call(e, s) && t(e[s])) return !0 }
                            return !1 }
                        return t(e) }
                    var o = e("isarray");
                    t.exports = n }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {}) }, { isarray: 25 }],
            23: [function(e, t, r) {
                try { t.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest } catch (n) { t.exports = !1 } }, {}],
            24: [function(e, t, r) {
                var n = [].indexOf;
                t.exports = function(e, t) {
                    if (n) return e.indexOf(t);
                    for (var r = 0; r < e.length; ++r)
                        if (e[r] === t) return r;
                    return -1 } }, {}],
            25: [function(e, t, r) { t.exports = Array.isArray || function(e) {
                    return "[object Array]" == Object.prototype.toString.call(e) } }, {}],
            26: [function(e, t, r) {
                function n(e) {
                    if (e = "" + e, !(e.length > 1e4)) {
                        var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
                        if (t) {
                            var r = parseFloat(t[1]),
                                n = (t[2] || "ms").toLowerCase();
                            switch (n) {
                                case "years":
                                case "year":
                                case "yrs":
                                case "yr":
                                case "y":
                                    return r * h;
                                case "days":
                                case "day":
                                case "d":
                                    return r * u;
                                case "hours":
                                case "hour":
                                case "hrs":
                                case "hr":
                                case "h":
                                    return r * p;
                                case "minutes":
                                case "minute":
                                case "mins":
                                case "min":
                                case "m":
                                    return r * c;
                                case "seconds":
                                case "second":
                                case "secs":
                                case "sec":
                                case "s":
                                    return r * a;
                                case "milliseconds":
                                case "millisecond":
                                case "msecs":
                                case "msec":
                                case "ms":
                                    return r } } } }

                function o(e) {
                    return e >= u ? Math.round(e / u) + "d" : e >= p ? Math.round(e / p) + "h" : e >= c ? Math.round(e / c) + "m" : e >= a ? Math.round(e / a) + "s" : e + "ms" }

                function s(e) {
                    return i(e, u, "day") || i(e, p, "hour") || i(e, c, "minute") || i(e, a, "second") || e + " ms" }

                function i(e, t, r) {
                    if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + r : Math.ceil(e / t) + " " + r + "s" }
                var a = 1e3,
                    c = 60 * a,
                    p = 60 * c,
                    u = 24 * p,
                    h = 365.25 * u;
                t.exports = function(e, t) {
                    return t = t || {}, "string" == typeof e ? n(e) : t["long"] ? s(e) : o(e) } }, {}],
            27: [function(e, t, r) {
                (function(e) {
                    var r = /^[\],:{}\s]*$/,
                        n = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                        o = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                        s = /(?:^|:|,)(?:\s*\[)+/g,
                        i = /^\s+/,
                        a = /\s+$/;
                    t.exports = function(t) {
                        return "string" == typeof t && t ? (t = t.replace(i, "").replace(a, ""), e.JSON && JSON.parse ? JSON.parse(t) : r.test(t.replace(n, "@").replace(o, "]").replace(s, "")) ? new Function("return " + t)() : void 0) : null } }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {}) }, {}],
            28: [function(e, t, r) { r.encode = function(e) {
                    var t = "";
                    for (var r in e) e.hasOwnProperty(r) && (t.length && (t += "&"), t += encodeURIComponent(r) + "=" + encodeURIComponent(e[r]));
                    return t }, r.decode = function(e) {
                    for (var t = {}, r = e.split("&"), n = 0, o = r.length; n < o; n++) {
                        var s = r[n].split("=");
                        t[decodeURIComponent(s[0])] = decodeURIComponent(s[1]) }
                    return t } }, {}],
            29: [function(e, t, r) {
                var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    o = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
                t.exports = function(e) {
                    var t = e,
                        r = e.indexOf("["),
                        s = e.indexOf("]");
                    r != -1 && s != -1 && (e = e.substring(0, r) + e.substring(r, s).replace(/:/g, ";") + e.substring(s, e.length));
                    for (var i = n.exec(e || ""), a = {}, c = 14; c--;) a[o[c]] = i[c] || "";
                    return r != -1 && s != -1 && (a.source = t, a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"), a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), a.ipv6uri = !0), a } }, {}],
            30: [function(t, r, n) {
                (function(t) {! function(o) {
                        function s(e) {
                            for (var t, r, n = [], o = 0, s = e.length; o < s;) t = e.charCodeAt(o++), t >= 55296 && t <= 56319 && o < s ? (r = e.charCodeAt(o++), 56320 == (64512 & r) ? n.push(((1023 & t) << 10) + (1023 & r) + 65536) : (n.push(t), o--)) : n.push(t);
                            return n }

                        function i(e) {
                            for (var t, r = e.length, n = -1, o = ""; ++n < r;) t = e[n], t > 65535 && (t -= 65536, o += w(t >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), o += w(t);
                            return o }

                        function a(e) {
                            if (e >= 55296 && e <= 57343) throw Error("Lone surrogate U+" + e.toString(16).toUpperCase() + " is not a scalar value") }

                        function c(e, t) {
                            return w(e >> t & 63 | 128) }

                        function p(e) {
                            if (0 == (4294967168 & e)) return w(e);
                            var t = "";
                            return 0 == (4294965248 & e) ? t = w(e >> 6 & 31 | 192) : 0 == (4294901760 & e) ? (a(e), t = w(e >> 12 & 15 | 224), t += c(e, 6)) : 0 == (4292870144 & e) && (t = w(e >> 18 & 7 | 240), t += c(e, 12), t += c(e, 6)), t += w(63 & e | 128) }

                        function u(e) {
                            for (var t, r = s(e), n = r.length, o = -1, i = ""; ++o < n;) t = r[o], i += p(t);
                            return i }

                        function h() {
                            if (b >= v) throw Error("Invalid byte index");
                            var e = 255 & m[b];
                            if (b++, 128 == (192 & e)) return 63 & e;
                            throw Error("Invalid continuation byte") }

                        function f() {
                            var e, t, r, n, o;
                            if (b > v) throw Error("Invalid byte index");
                            if (b == v) return !1;
                            if (e = 255 & m[b], b++, 0 == (128 & e)) return e;
                            if (192 == (224 & e)) {
                                var t = h();
                                if (o = (31 & e) << 6 | t, o >= 128) return o;
                                throw Error("Invalid continuation byte") }
                            if (224 == (240 & e)) {
                                if (t = h(), r = h(), o = (15 & e) << 12 | t << 6 | r, o >= 2048) return a(o), o;
                                throw Error("Invalid continuation byte") }
                            if (240 == (248 & e) && (t = h(), r = h(), n = h(), o = (15 & e) << 18 | t << 12 | r << 6 | n, o >= 65536 && o <= 1114111)) return o;
                            throw Error("Invalid UTF-8 detected") }

                        function l(e) { m = s(e), v = m.length, b = 0;
                            for (var t, r = [];
                                (t = f()) !== !1;) r.push(t);
                            return i(r) }
                        var d = "object" == typeof n && n,
                            y = "object" == typeof r && r && r.exports == d && r,
                            g = "object" == typeof t && t;
                        g.global !== g && g.window !== g || (o = g);
                        var m, v, b, w = String.fromCharCode,
                            x = { version: "2.0.0", encode: u, decode: l };
                        if ("function" == typeof e && "object" == typeof e.amd && e.amd) e(function() {
                            return x });
                        else if (d && !d.nodeType)
                            if (y) y.exports = x;
                            else {
                                var k = {},
                                    B = k.hasOwnProperty;
                                for (var S in x) B.call(x, S) && (d[S] = x[S]) }
                        else o.utf8 = x }(this) }).call(this, "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {}) }, {}],
            31: [function(e, t, r) { "use strict";

                function n(e) {
                    var t = "";
                    do t = a[e % c] + t, e = Math.floor(e / c); while (e > 0);
                    return t }

                function o(e) {
                    var t = 0;
                    for (h = 0; h < e.length; h++) t = t * c + p[e.charAt(h)];
                    return t }

                function s() {
                    var e = n(+new Date);
                    return e !== i ? (u = 0, i = e) : e + "." + n(u++) }
                for (var i, a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), c = 64, p = {}, u = 0, h = 0; h < c; h++) p[a[h]] = h;
                s.encode = n, s.decode = o, t.exports = s }, {}]
        }, {}, [1])(1)
    });
})();
(function(ns) {
    var CLIENT_VERSION = "2.0.0";
    var NODE_CLIENT = 0;
    ns.wrapper = function(good, wd) {
        var h, n = this;

        function p(a) {
            return void 0 !== a }

        function aa() {}

        function ba(a) { a.tb = function() {
                return a.wd ? a.wd : a.wd = new a } }

        function ca(a) {
            var b = typeof a;
            if ("object" == b)
                if (a) {
                    if (a instanceof Array) return "array";
                    if (a instanceof Object) return b;
                    var c = Object.prototype.toString.call(a);
                    if ("[object Window]" == c) return "object";
                    if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                    if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function" } else return "null";
            else if ("function" == b && "undefined" == typeof a.call) return "object";
            return b
        }

        function da(a) {
            return "array" == ca(a) }

        function q(a) {
            return "string" == typeof a }

        function ea(a) {
            return "number" == typeof a }

        function fa(a) {
            return "function" == ca(a) }

        function ga(a) {
            var b = typeof a;
            return "object" == b && null != a || "function" == b }

        function ha(a, b, c) {
            return a.call.apply(a.bind, arguments) }

        function ia(a, b, c) {
            if (!a) throw Error();
            if (2 < arguments.length) {
                var d = Array.prototype.slice.call(arguments, 2);
                return function() {
                    var c = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(c, d);
                    return a.apply(b, c) } }
            return function() {
                return a.apply(b, arguments) } }

        function r(a, b, c) { r = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ha : ia;
            return r.apply(null, arguments) }
        var ja = Date.now || function() {
            return +new Date };

        function ka(a, b) {
            function c() {}
            c.prototype = b.prototype;
            a.mf = b.prototype;
            a.prototype = new c;
            a.prototype.constructor = a;
            a.ef = function(a, c, f) {
                for (var g = Array(arguments.length - 2), k = 2; k < arguments.length; k++) g[k - 2] = arguments[k];
                return b.prototype[c].apply(a, g) } };

        function la(a) {
            if (Error.captureStackTrace) Error.captureStackTrace(this, la);
            else {
                var b = Error().stack;
                b && (this.stack = b) }
            a && (this.message = String(a)) }
        ka(la, Error);
        la.prototype.name = "CustomError";

        function ma() {
            return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ ja()).toString(36) };
        var na = Array.prototype.indexOf ? function(a, b, c) {
                return Array.prototype.indexOf.call(a, b, c) } : function(a, b, c) { c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
                if (q(a)) return q(b) && 1 == b.length ? a.indexOf(b, c) : -1;
                for (; c < a.length; c++)
                    if (c in a && a[c] === b) return c;
                return -1 },
            oa = Array.prototype.forEach ? function(a, b, c) { Array.prototype.forEach.call(a, b, c) } : function(a, b, c) {
                for (var d = a.length, e = q(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a) },
            pa = Array.prototype.filter ? function(a, b, c) {
                return Array.prototype.filter.call(a,
                    b, c)
            } : function(a, b, c) {
                for (var d = a.length, e = [], f = 0, g = q(a) ? a.split("") : a, k = 0; k < d; k++)
                    if (k in g) {
                        var l = g[k];
                        b.call(c, l, k, a) && (e[f++] = l) }
                return e },
            qa = Array.prototype.map ? function(a, b, c) {
                return Array.prototype.map.call(a, b, c) } : function(a, b, c) {
                for (var d = a.length, e = Array(d), f = q(a) ? a.split("") : a, g = 0; g < d; g++) g in f && (e[g] = b.call(c, f[g], g, a));
                return e },
            ra = Array.prototype.reduce ? function(a, b, c, d) { d && (b = r(b, d));
                return Array.prototype.reduce.call(a, b, c) } : function(a, b, c, d) {
                var e = c;
                oa(a, function(c, g) {
                    e = b.call(d,
                        e, c, g, a)
                });
                return e
            },
            sa = Array.prototype.every ? function(a, b, c) {
                return Array.prototype.every.call(a, b, c) } : function(a, b, c) {
                for (var d = a.length, e = q(a) ? a.split("") : a, f = 0; f < d; f++)
                    if (f in e && !b.call(c, e[f], f, a)) return !1;
                return !0 };

        function ta(a, b) {
            var c = ua(a, b, void 0);
            return 0 > c ? null : q(a) ? a.charAt(c) : a[c] }

        function ua(a, b, c) {
            for (var d = a.length, e = q(a) ? a.split("") : a, f = 0; f < d; f++)
                if (f in e && b.call(c, e[f], f, a)) return f;
            return -1 }

        function va(a, b) {
            var c = na(a, b);
            0 <= c && Array.prototype.splice.call(a, c, 1) }

        function wa(a, b) { a.sort(b || xa) }

        function xa(a, b) {
            return a > b ? 1 : a < b ? -1 : 0 };

        function ya(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b) }

        function t(a, b) {
            if (Object.prototype.hasOwnProperty.call(a, b)) return a[b] }

        function za(a, b) {
            for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b(c, a[c]) }

        function Aa(a) {
            var b = {};
            za(a, function(a, d) { b[a] = d });
            return b };

        function Ba(a) { a = String(a);
            if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))) try {
                return eval("(" + a + ")") } catch (b) {}
            throw Error("Invalid JSON string: " + a); }

        function Ca() {}

        function Da(a, b, c) {
            if (null == b) c.push("null");
            else {
                if ("object" == typeof b) {
                    if (da(b)) {
                        var d = b;
                        b = d.length;
                        c.push("[");
                        for (var e = "", f = 0; f < b; f++) c.push(e), Da(a, d[f], c), e = ",";
                        c.push("]");
                        return }
                    if (b instanceof String || b instanceof Number || b instanceof Boolean) b = b.valueOf();
                    else { c.push("{");
                        e = "";
                        for (d in b) Object.prototype.hasOwnProperty.call(b, d) && (f = b[d], "function" != typeof f && (c.push(e), Ea(d, c), c.push(":"), Da(a, f, c), e = ","));
                        c.push("}");
                        return } }
                switch (typeof b) {
                    case "string":
                        Ea(b, c);
                        break;
                    case "number":
                        c.push(isFinite(b) &&
                            !isNaN(b) ? String(b) : "null");
                        break;
                    case "boolean":
                        c.push(String(b));
                        break;
                    case "function":
                        c.push("null");
                        break;
                    default:
                        throw Error("Unknown type: " + typeof b);
                }
            }
        }
        var Fa = { '"': '\\"', "\\": "\\\\", "/": "\\/", "\b": "\\b", "\f": "\\f", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\x0B": "\\u000b" },
            Ga = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;

        function Ea(a, b) { b.push('"', a.replace(Ga, function(a) {
                var b = Fa[a];
                b || (b = "\\u" + (a.charCodeAt(0) | 65536).toString(16).substr(1), Fa[a] = b);
                return b }), '"') };

        function Ha(a) {
            var b = [];
            za(a, function(a, d) { da(d) ? oa(d, function(d) { b.push(encodeURIComponent(a) + "=" + encodeURIComponent(d)) }) : b.push(encodeURIComponent(a) + "=" + encodeURIComponent(d)) });
            return b.length ? "&" + b.join("&") : "" }

        function Ia(a) {
            var b = {};
            a = a.replace(/^\?/, "").split("&");
            oa(a, function(a) { a && (a = a.split("="), b[a[0]] = a[1]) });
            return b }

        function Ja(a) {
            return "undefined" !== typeof JSON && p(JSON.parse) ? JSON.parse(a) : Ba(a) }

        function u(a) {
            if ("undefined" !== typeof JSON && p(JSON.stringify)) a = JSON.stringify(a);
            else {
                var b = [];
                Da(new Ca, a, b);
                a = b.join("") }
            return a }
        var v = {};

        function Ka() { this.xc = x }
        Ka.prototype.u = function(a) {
            return this.xc.ka(a) };
        Ka.prototype.toString = function() {
            return this.xc.toString() };

        function La(a, b) {
            for (var c in a) b.call(void 0, a[c], c, a) }

        function Ma(a, b) {
            var c = {},
                d;
            for (d in a) c[d] = b.call(void 0, a[d], d, a);
            return c }

        function Na(a, b) {
            for (var c in a)
                if (!b.call(void 0, a[c], c, a)) return !1;
            return !0 }

        function Oa(a) {
            var b = 0,
                c;
            for (c in a) b++;
            return b }

        function Pa(a) {
            for (var b in a) return b }

        function Qa(a) {
            var b = [],
                c = 0,
                d;
            for (d in a) b[c++] = a[d];
            return b }

        function Ra(a) {
            var b = [],
                c = 0,
                d;
            for (d in a) b[c++] = d;
            return b }

        function Sa(a, b) {
            return null !== a && b in a }

        function Ta(a, b) {
            for (var c in a)
                if (a[c] == b) return !0;
            return !1 }

        function Ua(a, b, c) {
            for (var d in a)
                if (b.call(c, a[d], d, a)) return d }

        function Va(a, b) {
            var c = Ua(a, b, void 0);
            return c && a[c] }

        function Wa(a) {
            for (var b in a) return !1;
            return !0 }

        function Xa(a) {
            var b = {},
                c;
            for (c in a) b[c] = a[c];
            return b }
        var Ya = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

        function Za(a, b) {
            for (var c, d, e = 1; e < arguments.length; e++) { d = arguments[e];
                for (c in d) a[c] = d[c];
                for (var f = 0; f < Ya.length; f++) c = Ya[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]) } };

        function $a(a) { this.Rb = a;
            this.tc = "wilddog:" }
        $a.prototype.set = function(a, b) { null == b ? this.Rb.removeItem(this.tc + a) : this.Rb.setItem(this.tc + a, u(b)) };
        $a.prototype.get = function(a) { a = this.Rb.getItem(this.tc + a);
            return null == a ? null : Ja(a) };
        $a.prototype.remove = function(a) { this.Rb.removeItem(this.tc + a) };
        $a.prototype.toString = function() {
            return this.Rb.toString() };

        function ab() { this.Mb = {} }
        ab.prototype.set = function(a, b) { null == b ? delete this.Mb[a] : this.Mb[a] = b };
        ab.prototype.get = function(a) {
            return ya(this.Mb, a) ? this.Mb[a] : null };
        ab.prototype.remove = function(a) { delete this.Mb[a] };

        function bb(a) {
            try {
                if ("undefined" !== typeof window && "undefined" !== typeof window[a]) {
                    var b = window[a];
                    b.setItem("wilddog:sentinel", "cache");
                    b.removeItem("wilddog:sentinel");
                    return new $a(b) } } catch (c) {}
            return new ab }
        var cb = bb("localStorage"),
            y = bb("sessionStorage");

        function db() { this.g = -1 };

        function eb() { this.g = -1;
            this.g = 64;
            this.f = [];
            this.H = [];
            this.V = [];
            this.o = [];
            this.o[0] = 128;
            for (var a = 1; a < this.g; ++a) this.o[a] = 0;
            this.A = this.m = 0;
            this.reset() }
        ka(eb, db);
        eb.prototype.reset = function() { this.f[0] = 1732584193;
            this.f[1] = 4023233417;
            this.f[2] = 2562383102;
            this.f[3] = 271733878;
            this.f[4] = 3285377520;
            this.A = this.m = 0 };

        function fb(a, b, c) {
            c || (c = 0);
            var d = a.V;
            if (q(b))
                for (var e = 0; 16 > e; e++) d[e] = b.charCodeAt(c) << 24 | b.charCodeAt(c + 1) << 16 | b.charCodeAt(c + 2) << 8 | b.charCodeAt(c + 3), c += 4;
            else
                for (e = 0; 16 > e; e++) d[e] = b[c] << 24 | b[c + 1] << 16 | b[c + 2] << 8 | b[c + 3], c += 4;
            for (e = 16; 80 > e; e++) {
                var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
                d[e] = (f << 1 | f >>> 31) & 4294967295 }
            b = a.f[0];
            c = a.f[1];
            for (var g = a.f[2], k = a.f[3], l = a.f[4], m, e = 0; 80 > e; e++) 40 > e ? 20 > e ? (f = k ^ c & (g ^ k), m = 1518500249) : (f = c ^ g ^ k, m = 1859775393) : 60 > e ? (f = c & g | k & (c | g), m = 2400959708) : (f = c ^ g ^ k, m = 3395469782), f = (b <<
                5 | b >>> 27) + f + l + m + d[e] & 4294967295, l = k, k = g, g = (c << 30 | c >>> 2) & 4294967295, c = b, b = f;
            a.f[0] = a.f[0] + b & 4294967295;
            a.f[1] = a.f[1] + c & 4294967295;
            a.f[2] = a.f[2] + g & 4294967295;
            a.f[3] = a.f[3] + k & 4294967295;
            a.f[4] = a.f[4] + l & 4294967295
        }
        eb.prototype.update = function(a, b) {
            if (null != a) { p(b) || (b = a.length);
                for (var c = b - this.g, d = 0, e = this.H, f = this.m; d < b;) {
                    if (0 == f)
                        for (; d <= c;) fb(this, a, d), d += this.g;
                    if (q(a))
                        for (; d < b;) {
                            if (e[f] = a.charCodeAt(d), ++f, ++d, f == this.g) { fb(this, e);
                                f = 0;
                                break } } else
                            for (; d < b;)
                                if (e[f] = a[d], ++f, ++d, f == this.g) { fb(this, e);
                                    f = 0;
                                    break } }
                this.m = f;
                this.A += b } };
        var gb;
        a: {
            var hb = n.navigator;
            if (hb) {
                var ib = hb.userAgent;
                if (ib) { gb = ib;
                    break a } }
            gb = "" };
        var jb = null,
            kb = null;

        function lb(a) {
            var b = "";
            mb(a, function(a) { b += String.fromCharCode(a) });
            return b }

        function mb(a, b) {
            function c(b) {
                for (; d < a.length;) {
                    var c = a.charAt(d++),
                        e = kb[c];
                    if (null != e) return e;
                    if (!/^[\s\xa0]*$/.test(c)) throw Error("Unknown base64 encoding at char: " + c); }
                return b }
            nb();
            for (var d = 0;;) {
                var e = c(-1),
                    f = c(0),
                    g = c(64),
                    k = c(64);
                if (64 === k && -1 === e) break;
                b(e << 2 | f >> 4);
                64 != g && (b(f << 4 & 240 | g >> 2), 64 != k && b(g << 6 & 192 | k)) } }

        function nb() {
            if (!jb) { jb = {};
                kb = {};
                for (var a = 0; 65 > a; a++) jb[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a), kb[jb[a]] = a, 62 <= a && (kb["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a)] = a) } };
        var ob = function() {
            var a = 1;
            return function() {
                return a++ } }();

        function z(a, b) {
            if (!a) throw pb(b); }

        function pb(a) {
            return Error("Wilddog (" + qb + ") INTERNAL ASSERT FAILED: " + a) }

        function rb(a) {
            try {
                return NODE_CLIENT ? (new Buffer(a, "base64")).toString("utf8") : "undefined" !== typeof atob ? atob(a) : lb(a) } catch (b) { sb("base64Decode failed: ", b) }
            return null }

        function tb(a) {
            for (var b = [], c = 0, d = 0; d < a.length; d++) {
                var e = a.charCodeAt(d);
                55296 <= e && 56319 >= e && (e = e - 55296, d++, z(d < a.length, "Surrogate pair missing trail surrogate."), e = 65536 + (e << 10) + (a.charCodeAt(d) - 56320));
                128 > e ? b[c++] = e : (2048 > e ? b[c++] = e >> 6 | 192 : (65536 > e ? b[c++] = e >> 12 | 224 : (b[c++] = e >> 18 | 240, b[c++] = e >> 12 & 63 | 128), b[c++] = e >> 6 & 63 | 128), b[c++] = e & 63 | 128) }
            a = new eb;
            a.update(b);
            b = [];
            d = 8 * a.A;
            56 > a.m ? a.update(a.o, 56 - a.m) : a.update(a.o, a.g - (a.m - 56));
            for (c = a.g - 1; 56 <= c; c--) a.H[c] = d & 255, d /= 256;
            fb(a, a.H);
            for (c = d = 0; 5 > c; c++)
                for (e =
                    24; 0 <= e; e -= 8) b[d] = a.f[c] >> e & 255, ++d;
            nb();
            a = jb;
            c = [];
            for (d = 0; d < b.length; d += 3) {
                var f = b[d],
                    g = (e = d + 1 < b.length) ? b[d + 1] : 0,
                    k = d + 2 < b.length,
                    l = k ? b[d + 2] : 0,
                    m = f >> 2,
                    f = (f & 3) << 4 | g >> 4,
                    g = (g & 15) << 2 | l >> 6,
                    l = l & 63;
                k || (l = 64, e || (g = 64));
                c.push(a[m], a[f], a[g], a[l]) }
            return c.join("")
        }

        function ub(a) {
            for (var b = "", c = 0; c < arguments.length; c++) var d = arguments[c],
                e = ca(d),
                b = "array" == e || "object" == e && "number" == typeof d.length ? b + ub.apply(null, arguments[c]) : "object" === typeof arguments[c] ? b + u(arguments[c]) : b + arguments[c],
                b = b + " ";
            return b }
        var vb = null,
            wb = !0;

        function sb(a) {!0 === wb && (wb = !1, null === vb && !0 === y.get("logging_enabled") && xb(!0));
            if (vb) {
                var b = ub.apply(null, arguments);
                vb(b) } }

        function yb(a) {
            return function() { sb(a, arguments) } }

        function zb(a) {
            if ("undefined" !== typeof console) {
                var b = "WILDDOG INTERNAL ERROR: " + ub.apply(null, arguments); "undefined" !== typeof console.error ? console.error(b) : console.log(b) } }

        function Ab(a) {
            var b = ub.apply(null, arguments);
            throw Error("WILDDOG FATAL ERROR: " + b); }

        function Bb(a) {
            if ("undefined" !== typeof console) {
                var b = "WILDDOG WARNING: " + ub.apply(null, arguments); "undefined" !== typeof console.warn ? console.warn(b) : console.log(b) } }

        function Cb(a) {
            var b = "",
                c = "",
                d = "",
                e = "",
                f = !0,
                g = "https",
                k = 443;
            if (q(a)) {
                var l = a.indexOf("//");
                0 <= l && (g = a.substring(0, l - 1), a = a.substring(l + 2));
                l = a.indexOf("/"); - 1 === l && (l = a.length);
                b = a.substring(0, l);
                e = "";
                a = a.substring(l).split("/");
                for (l = 0; l < a.length; l++)
                    if (0 < a[l].length) {
                        var m = a[l];
                        try { m = decodeURIComponent(m.replace(/\+/g, " ")) } catch (w) {}
                        e += "/" + m }
                a = b.split(".");
                3 === a.length ? (c = a[1], d = a[0].toLowerCase()) : 2 === a.length && (c = a[0]);
                l = b.indexOf(":");
                0 <= l && (f = "https" === g || "wss" === g, k = b.substring(l + 1), isFinite(k) &&
                    (k = String(k)), k = q(k) ? /^\s*-?0x/i.test(k) ? parseInt(k, 16) : parseInt(k, 10) : NaN)
            }
            return { host: b, port: k, domain: c, Ne: d, gb: f, scheme: g, Yb: e }
        }

        function Db(a) {
            return ea(a) && (a != a || a == Number.POSITIVE_INFINITY || a == Number.NEGATIVE_INFINITY) }

        function Eb(a, b) {
            if (a === b) return 0;
            if ("[MIN_NAME]" === a || "[MAX_NAME]" === b) return -1;
            if ("[MIN_NAME]" === b || "[MAX_NAME]" === a) return 1;
            var c = Fb(a),
                d = Fb(b);
            return null !== c ? null !== d ? 0 == c - d ? a.length - b.length : c - d : -1 : null !== d ? 1 : a < b ? -1 : 1 }

        function Gb(a) {
            if ("object" !== typeof a || null === a) return u(a);
            var b = [],
                c;
            for (c in a) b.push(c);
            b.sort();
            c = "{";
            for (var d = 0; d < b.length; d++) 0 !== d && (c += ","), c += u(b[d]), c += ":", c += Gb(a[b[d]]);
            return c + "}" }

        function Hb(a, b) {
            if (da(a))
                for (var c = 0; c < a.length; ++c) b(c, a[c]);
            else La(a, b) }

        function Ib(a) {
            z(!Db(a), "Invalid JSON number");
            var b, c, d, e;
            0 === a ? (d = c = 0, b = -Infinity === 1 / a ? 1 : 0) : (b = 0 > a, a = Math.abs(a), a >= Math.pow(2, -1022) ? (d = Math.min(Math.floor(Math.log(a) / Math.LN2), 1023), c = d + 1023, d = Math.round(a * Math.pow(2, 52 - d) - Math.pow(2, 52))) : (c = 0, d = Math.round(a / Math.pow(2, -1074))));
            e = [];
            for (a = 52; a; --a) e.push(d % 2 ? 1 : 0), d = Math.floor(d / 2);
            for (a = 11; a; --a) e.push(c % 2 ? 1 : 0), c = Math.floor(c / 2);
            e.push(b ? 1 : 0);
            e.reverse();
            b = e.join("");
            c = "";
            for (a = 0; 64 > a; a += 8) d = parseInt(b.substr(a, 8), 2).toString(16), 1 === d.length &&
                (d = "0" + d), c += d;
            return c.toLowerCase()
        }
        var Jb = /^-?\d{1,10}$/;

        function Fb(a) {
            return Jb.test(a) && (a = Number(a), -2147483648 <= a && 2147483647 >= a) ? a : null }

        function Kb(a) {
            try { a() } catch (b) { setTimeout(function() { Bb("Exception was thrown by user callback.", b.stack || "");
                    throw b; }, Math.floor(0)) } }

        function A(a, b) {
            if (fa(a)) {
                var c = Array.prototype.slice.call(arguments, 1).slice();
                Kb(function() { a.apply(null, c) }) } };

        function Lb(a) { z(da(a) && 0 < a.length, "Requires a non-empty array");
            this.H = a;
            this.g = {} }
        Lb.prototype.m = function(a, b) {
            for (var c = this.g[a] || [], d = 0; d < c.length; d++) c[d].Ob.apply(c[d].context, Array.prototype.slice.call(arguments, 1)) };
        Lb.prototype.Wa = function(a, b, c) { Mb(this, a);
            this.g[a] = this.g[a] || [];
            this.g[a].push({ Ob: b, context: c });
            (a = this.o(a)) && b.apply(c, a) };
        Lb.prototype.eb = function(a, b, c) { Mb(this, a);
            a = this.g[a] || [];
            for (var d = 0; d < a.length; d++)
                if (a[d].Ob === b && (!c || c === a[d].context)) { a.splice(d, 1);
                    break } };

        function Mb(a, b) { z(ta(a.H, function(a) {
                return a === b }), "Unknown event: " + b) };

        function Nb(a, b) { Lb.call(this, ["authStateChanged", "authTokenExpired"]);
            this.A = { Gd: !1 };
            this.f = {};
            Object.defineProperty(this, "name", { value: b, writable: !1 });
            Object.defineProperty(this, "options", { value: a, writable: !1 });
            var c = this;
            ["auth", "sync"].forEach(function(a) { c[a] = function() {
                    var b = "__" + a,
                        f = n.wilddog.__getService(a);
                    if (!f) throw Error("Could not found module " + a);
                    c[b] || (c[b] = f(this));
                    return c[b] } }) }
        ka(Nb, Lb);
        Nb.prototype.ee = function(a, b) {
            var c = !0,
                d;
            for (d in Ob)
                if (Ob.hasOwnProperty(d) && Ob[d] === a) { c = !1;
                    break }
            if (c) throw Error("Unknown event " + a);
            this.f[a] = b;
            switch (a) {
                case Ob.Qa:
                    this.A.Gd = b && b.Gd }
            this.m(a, b) };
        Nb.prototype.emit = Nb.prototype.ee;
        Nb.prototype.bind = function(a, b) { this.Wa(a, b) };
        Nb.prototype.bind = Nb.prototype.bind;
        Nb.prototype.Pe = function(a, b) { this.eb(a, b) };
        Nb.prototype.unbind = Nb.prototype.Pe;
        Nb.prototype.o = function(a) {
            switch (a) {
                case Ob.Qa:
                    return [this.f[Ob.Qa]] }
            return null };
        var Ob = { Qa: "authStateChanged", nd: "authTokenExpired" };

        function Pb(a) {
            var b = {},
                c = {},
                d = {},
                e = "";
            try {
                var f = a.split("."),
                    g = rb(f[0]) || "",
                    k = rb(f[1]) || "",
                    b = Ja(g),
                    c = Ja(k),
                    e = f[2],
                    d = c.d || {};
                delete c.d } catch (l) { console.warn("error", l) }
            return { gf: b, Kc: c, data: d, jf: e } }

        function Qb(a) { a = Pb(a).Kc;
            return "object" === typeof a && a.hasOwnProperty("iat") ? t(a, "iat") : null };
        var Rb = "auth.wilddog.com";

        function Sb(a, b, c) { this.g = ["session", b.sc, b.Jb, a].join(":");
            this.f = c }
        Sb.prototype.set = function(a, b) {
            if (!b)
                if (this.f.length) b = this.f[0];
                else throw Error("wd.auth.SessionManager : No storage options available!");
            b.set(this.g, a) };
        Sb.prototype.get = function() {
            var a = qa(this.f, r(this.m, this)),
                a = pa(a, function(a) {
                    return null !== a });
            wa(a, function(a, c) {
                return Qb(c.idToken) - Qb(a.idToken) });
            return 0 < a.length ? a.shift() : null };
        Sb.prototype.m = function(a) {
            try {
                var b = a.get(this.g);
                if (b.idToken) return b;
                Tb(this) } catch (c) {}
            return null };

        function Tb(a) { oa(a.f, function(b) { b.remove(a.g) }) };

        function Ub(a, b, c, d, e) { this.uid = e;
            this.displayName = a;
            this.email = b;
            this.photoURL = c;
            this.providerId = d };

        function Vb(a, b, c) { this.da = c;
            this.m = a;
            this.o = b;
            this.g = 0;
            this.f = null }
        Vb.prototype.get = function() {
            var a;
            0 < this.g ? (this.g--, a = this.f, this.f = a.next, a.next = null) : a = this.m();
            return a };

        function Wb(a, b) { a.o(b);
            a.g < a.da && (a.g++, b.next = a.f, a.f = b) };

        function Xb() { this.g = this.f = null }
        var Zb = new Vb(function() {
            return new Yb }, function(a) { a.reset() }, 100);
        Xb.prototype.add = function(a, b) {
            var c = Zb.get();
            c.set(a, b);
            this.g ? this.g.next = c : this.f = c;
            this.g = c };
        Xb.prototype.remove = function() {
            var a = null;
            this.f && (a = this.f, this.f = this.f.next, this.f || (this.g = null), a.next = null);
            return a };

        function Yb() { this.next = this.g = this.f = null }
        Yb.prototype.set = function(a, b) { this.f = a;
            this.g = b;
            this.next = null };
        Yb.prototype.reset = function() { this.next = this.g = this.f = null };

        function $b(a) { n.setTimeout(function() {
                throw a; }, 0) }
        var ac;

        function bc() {
            var a = n.MessageChannel;
            "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && -1 == gb.indexOf("Presto") && (a = function() {
                var a = document.createElement("IFRAME");
                a.style.display = "none";
                a.src = "";
                document.documentElement.appendChild(a);
                var b = a.contentWindow,
                    a = b.document;
                a.open();
                a.write("");
                a.close();
                var c = "callImmediate" + Math.random(),
                    d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host,
                    a = r(function(a) {
                        if (("*" == d || a.origin ==
                                d) && a.data == c) this.port1.onmessage()
                    }, this);
                b.addEventListener("message", a, !1);
                this.port1 = {};
                this.port2 = { postMessage: function() { b.postMessage(c, d) } }
            });
            if ("undefined" !== typeof a && -1 == gb.indexOf("Trident") && -1 == gb.indexOf("MSIE")) {
                var b = new a,
                    c = {},
                    d = c;
                b.port1.onmessage = function() {
                    if (p(c.next)) { c = c.next;
                        var a = c.Ra;
                        c.Ra = null;
                        a() } };
                return function(a) { d.next = { Ra: a };
                    d = d.next;
                    b.port2.postMessage(0) } }
            return "undefined" !== typeof document && "onreadystatechange" in document.createElement("SCRIPT") ? function(a) {
                var b =
                    document.createElement("SCRIPT");
                b.onreadystatechange = function() { b.onreadystatechange = null;
                    b.parentNode.removeChild(b);
                    b = null;
                    a();
                    a = null };
                document.documentElement.appendChild(b)
            } : function(a) { n.setTimeout(a, 0) }
        };

        function cc(a, b) { dc || ec();
            fc || (dc(), fc = !0);
            gc.add(a, b) }
        var dc;

        function ec() {
            if (n.Promise && n.Promise.resolve) {
                var a = n.Promise.resolve(void 0);
                dc = function() { a.then(hc) } } else dc = function() {
                var a = hc,
                    c;!(c = !fa(n.setImmediate)) && (c = n.Window && n.Window.prototype) && (c = -1 == gb.indexOf("Edge") && n.Window.prototype.setImmediate == n.setImmediate);
                c ? (ac || (ac = bc()), ac(a)) : n.setImmediate(a) } }
        var fc = !1,
            gc = new Xb;

        function hc() {
            for (var a = null; a = gc.remove();) {
                try { a.f.call(a.g) } catch (b) { $b(b) }
                Wb(Zb, a) }
            fc = !1 };

        function ic(a, b) { this.f = jc;
            this.V = void 0;
            this.o = this.g = this.m = null;
            this.A = this.H = !1;
            if (a != aa) try {
                var c = this;
                a.call(b, function(a) { kc(c, lc, a) }, function(a) {
                    if (!(a instanceof mc)) try {
                        if (a instanceof Error) throw a;
                        throw Error("Promise rejected."); } catch (b) {}
                    kc(c, nc, a) }) } catch (d) { kc(this, nc, d) } }
        var jc = 0,
            lc = 2,
            nc = 3;

        function oc() { this.next = this.context = this.f = this.g = this.C = null;
            this.m = !1 }
        oc.prototype.reset = function() { this.context = this.f = this.g = this.C = null;
            this.m = !1 };
        var pc = new Vb(function() {
            return new oc }, function(a) { a.reset() }, 100);

        function qc(a, b, c) {
            var d = pc.get();
            d.g = a;
            d.f = b;
            d.context = c;
            return d }
        ic.prototype.then = function(a, b, c) {
            return rc(this, fa(a) ? a : null, fa(b) ? b : null, c) };
        ic.prototype.then = ic.prototype.then;
        ic.prototype.$goog_Thenable = !0;
        h = ic.prototype;
        h.Oe = function(a, b) {
            return rc(this, null, a, b) };
        h.cancel = function(a) { this.f == jc && cc(function() {
                var b = new mc(a);
                sc(this, b) }, this) };

        function sc(a, b) {
            if (a.f == jc)
                if (a.m) {
                    var c = a.m;
                    if (c.g) {
                        for (var d = 0, e = null, f = null, g = c.g; g && (g.m || (d++, g.C == a && (e = g), !(e && 1 < d))); g = g.next) e || (f = g);
                        e && (c.f == jc && 1 == d ? sc(c, b) : (f ? (d = f, d.next == c.o && (c.o = d), d.next = d.next.next) : tc(c), uc(c, e, nc, b))) }
                    a.m = null } else kc(a, nc, b) }

        function vc(a, b) { a.g || a.f != lc && a.f != nc || wc(a);
            a.o ? a.o.next = b : a.g = b;
            a.o = b }

        function rc(a, b, c, d) {
            var e = qc(null, null, null);
            e.C = new ic(function(a, g) { e.g = b ? function(c) {
                    try {
                        var e = b.call(d, c);
                        a(e) } catch (m) { g(m) } } : a;
                e.f = c ? function(b) {
                    try {
                        var e = c.call(d, b);!p(e) && b instanceof mc ? g(b) : a(e) } catch (m) { g(m) } } : g });
            e.C.m = a;
            vc(a, e);
            return e.C }
        h.Qe = function(a) { this.f = jc;
            kc(this, lc, a) };
        h.Re = function(a) { this.f = jc;
            kc(this, nc, a) };

        function kc(a, b, c) {
            if (a.f == jc) { a == c && (b = nc, c = new TypeError("Promise cannot resolve to itself"));
                a.f = 1;
                var d;
                a: {
                    var e = c,
                        f = a.Qe,
                        g = a.Re;
                    if (e instanceof ic) vc(e, qc(f || aa, g || null, a)), d = !0;
                    else {
                        var k;
                        if (e) try { k = !!e.$goog_Thenable } catch (m) { k = !1 } else k = !1;
                        if (k) e.then(f, g, a), d = !0;
                        else {
                            if (ga(e)) try {
                                var l = e.then;
                                if (fa(l)) { xc(e, l, f, g, a);
                                    d = !0;
                                    break a } } catch (m) { g.call(a, m);
                                d = !0;
                                break a }
                            d = !1 } } }
                d || (a.V = c, a.f = b, a.m = null, wc(a), b != nc || c instanceof mc || yc(a, c)) } }

        function xc(a, b, c, d, e) {
            function f(a) { k || (k = !0, d.call(e, a)) }

            function g(a) { k || (k = !0, c.call(e, a)) }
            var k = !1;
            try { b.call(a, g, f) } catch (l) { f(l) } }

        function wc(a) { a.H || (a.H = !0, cc(a.ge, a)) }

        function tc(a) {
            var b = null;
            a.g && (b = a.g, a.g = b.next, b.next = null);
            a.g || (a.o = null);
            return b }
        h.ge = function() {
            for (var a = null; a = tc(this);) uc(this, a, this.f, this.V);
            this.H = !1 };

        function uc(a, b, c, d) {
            if (c == nc && b.f && !b.m)
                for (; a && a.A; a = a.m) a.A = !1;
            if (b.C) b.C.m = null, zc(b, c, d);
            else try { b.m ? b.g.call(b.context) : zc(b, c, d) } catch (e) { Ac.call(null, e) }
            Wb(pc, b) }

        function zc(a, b, c) { b == lc ? a.g.call(a.context, c) : a.f && a.f.call(a.context, c) }

        function yc(a, b) { a.A = !0;
            cc(function() { a.A && Ac.call(null, b) }) }
        var Ac = $b;

        function mc(a) { la.call(this, a) }
        ka(mc, la);
        mc.prototype.name = "cancel";
        var Bc = n.Promise || ic;
        n.setTimeout || (n.setTimeout = function() { window.setTimeout.apply(window, arguments) });
        ic.prototype["catch"] = ic.prototype.Oe;

        function B() {
            var a = this;
            this.g = this.m = null;
            this.f = new Bc(function(b, c) { a.m = b;
                a.g = c }) }

        function D(a, b) {
            return function(c, d) { c ? a.g(c) : a.m(d);
                fa(b) && (Cc(a.f), 1 === b.length ? b(c) : b(c, d)) } }

        function Cc(a) { a.then(void 0, aa) };

        function E(a, b, c, d) { Ub.call(this, b.displayName, b.email, b.photoURL, b.providerId, b.uid);
            this.isAnonymous = "anonymous" === this.f;
            this.emailVerified = !0 === c;
            this.providerData = d || [];
            this.refreshToken = null;
            Object.defineProperty(this, "__authManager", { value: a, writable: !1 }) }
        ka(E, Ub);
        var Dc = ["wd", "User"],
            Ec = n;
        Dc[0] in Ec || !Ec.execScript || Ec.execScript("var " + Dc[0]);
        for (var Fc; Dc.length && (Fc = Dc.shift());) !Dc.length && p(E) ? Ec[Fc] = E : Ec[Fc] ? Ec = Ec[Fc] : Ec = Ec[Fc] = {};
        E.prototype["delete"] = function(a) {
            var b = new B;
            this.__authManager.vc(this.Ba(), D(b, a));
            return b.f };
        E.prototype["delete"] = E.prototype["delete"];
        E.prototype.Ba = function() {
            return this.__authManager.lc().idToken };
        E.prototype.getToken = E.prototype.Ba;
        E.prototype.link = function(a, b) { F("wilddog.User.link", 1, 2, arguments.length);
            G("wilddog.User.link", 1, a, !1);
            var c = a.provider,
                d = new B,
                e = {};
            e.idToken = this.Ba(); "password" == c ? (e.email = a.email, e.password = a.password, Gc(this.__authManager, e, D(d, b))) : (e.providerId = a.provider, e.accessToken = a.accessToken, e.openId = a.openId || "", e.authType = "link", Hc(this.__authManager, e, D(d, b)));
            return d.f };
        E.prototype.link = E.prototype.link;
        E.prototype.Se = function(a, b) { F("wilddog.User.unlink", 1, 2, arguments.length);
            Ic("wilddog.User.unlink", 1, a);
            var c = new B,
                d = this;
            Jc(this.__authManager, "unlink", { idToken: this.Ba(), deleteProvider: [a] }, D(c, function(c, f) { f && (d.providerData = d.providerData.filter(function(b) {
                    if (b.providerId != a) return b }), 0 === d.providerData.length && (Kc(d.__authManager, null), A(void 0, null)));
                b && b(c, f) }));
            return c.f };
        E.prototype.unlink = E.prototype.Se;
        E.prototype.me = function(a, b) { F("wilddog.auth().signInWithPopup", 1, 2, arguments.length);
            G("wilddog.auth().signInWithPopup", 1, a, !1);
            var c = new B;
            Lc(this.__authManager, a, { authType: "link", idToken: this.Ba() }, D(c, b));
            return c.f };
        E.prototype.linkWithPopup = E.prototype.me;
        E.prototype.ne = function(a, b) { F("wilddog.auth().signInWithPopup", 1, 2, arguments.length);
            G("wilddog.auth().signInWithPopup", 1, a, !1);
            var c = new B;
            Mc(this.__authManager, a, { authType: "link", idToken: this.Ba() }, D(c, b));
            return c.f };
        E.prototype.linkWithRedirect = E.prototype.ne;
        E.prototype.Ve = function(a, b) { F("wilddog.User.updateProfile", 1, 2, arguments.length);
            G("wilddog.User.updateProfile", 1, a, !1);
            var c = new B;
            a.idToken = this.Ba();
            Jc(this.__authManager, "profile", a, D(c, b));
            return c.f };
        E.prototype.updateProfile = E.prototype.Ve;
        E.prototype.Te = function(a, b) { F("wilddog.User.updateEmail", 1, 2, arguments.length);
            Ic("wilddog.User.updateEmail", 1, a);
            var c = new B;
            Gc(this.__authManager, { email: a, idToken: this.Ba() }, D(c, b));
            return c.f };
        E.prototype.updateEmail = E.prototype.Te;
        E.prototype.Ue = function(a, b) { F("wilddog.User.updatePassword", 1, 2, arguments.length);
            Ic("wilddog.User.updatePassword", 1, a);
            var c = new B;
            Gc(this.__authManager, { password: a, idToken: this.Ba() }, D(c, b));
            return c.f };
        E.prototype.updatePassword = E.prototype.Ue;
        E.prototype.Be = function(a) { F("wilddog.User.sendEmailVerification", 0, 1, arguments.length);
            H("wilddog.User.sendEmailVerification", 1, a, !0);
            var b = new B;
            Nc(this.__authManager, { idToken: this.Ba(), requestType: "VERIFY_EMAIL" }, D(b, a));
            return b.f };
        E.prototype.sendEmailVerification = E.prototype.Be;
        E.prototype.reload = function(a) { F("wilddog.User.reload", 0, 1, arguments.length);
            H("wilddog.User.reload", 1, a, !0);
            var b = new B;
            Oc(this.__authManager, this.Ba(), D(b, a));
            return b.f };
        E.prototype.reload = E.prototype.reload;
        E.prototype.ze = function(a, b) { F("wilddog.User.reload", 1, 2, arguments.length);
            H("wilddog.User.reload", 2, b, !0);
            if (!a || !a.provider) throw Error("Unknown credential object.");
            var c = new B;
            Hc(this.__authManager, a, D(c, b));
            return c.f };
        E.prototype.reauthenticate = E.prototype.ze;

        function Pc(a) {
            if (a && a.users && a.users[0]) return a = a.users[0], new Ub(a.displayName, a.email, a.photoUrl, a.providerId, a.localId);
            throw Error("Bad response format."); }

        function Qc(a, b) {
            var c = Pc(b);
            if (!c) return null;
            var d = b.users[0],
                e = d.providerUserInfo.map(function(a) { a.photoURL = a.photoUrl;
                    delete a.photoUrl;
                    return a });
            return new E(a, c, d.emailVerified, e) };

        function F(a, b, c, d) {
            var e;
            d < b ? e = "at least " + b : d > c && (e = 0 === c ? "none" : "no more than " + c);
            if (e) throw Error(a + " failed: Was called with " + d + (1 === d ? " argument." : " arguments.") + " Expects " + e + "."); }

        function I(a, b, c) {
            var d = "";
            switch (b) {
                case 1:
                    d = c ? "first" : "First";
                    break;
                case 2:
                    d = c ? "second" : "Second";
                    break;
                case 3:
                    d = c ? "third" : "Third";
                    break;
                case 4:
                    d = c ? "fourth" : "Fourth";
                    break;
                default:
                    throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?"); }
            return a = a + " failed: " + (d + " argument ") }

        function H(a, b, c, d) {
            if ((!d || p(c)) && !fa(c)) throw Error(I(a, b, d) + "must be a valid function."); }

        function Rc(a, b, c) {
            if (p(c) && (!ga(c) || null === c)) throw Error(I(a, b, !0) + "must be a valid context object."); };

        function J(a, b) {
            if (1 == arguments.length) { this.F = a.split("/");
                for (var c = 0, d = 0; d < this.F.length; d++) 0 < this.F[d].length && (this.F[c] = this.F[d], c++);
                this.F.length = c;
                this.aa = 0 } else this.F = a, this.aa = b }

        function Sc(a, b) {
            var c = K(a);
            if (null === c) return b;
            if (c === K(b)) return Sc(L(a), L(b));
            throw Error("INTERNAL ERROR: innerPath (" + b + ") is not within outerPath (" + a + ")"); }

        function K(a) {
            return a.aa >= a.F.length ? null : a.F[a.aa] }

        function Tc(a) {
            return a.F.length - a.aa }

        function L(a) {
            var b = a.aa;
            b < a.F.length && b++;
            return new J(a.F, b) }

        function Uc(a) {
            return a.aa < a.F.length ? a.F[a.F.length - 1] : null }
        h = J.prototype;
        h.toString = function() {
            for (var a = "", b = this.aa; b < this.F.length; b++) "" !== this.F[b] && (a += "/" + this.F[b]);
            return a || "/" };
        h.slice = function(a) {
            return this.F.slice(this.aa + (a || 0)) };
        h.parent = function() {
            if (this.aa >= this.F.length) return null;
            for (var a = [], b = this.aa; b < this.F.length - 1; b++) a.push(this.F[b]);
            return new J(a, 0) };
        h.C = function(a) {
            for (var b = [], c = this.aa; c < this.F.length; c++) b.push(this.F[c]);
            if (a instanceof J)
                for (c = a.aa; c < a.F.length; c++) b.push(a.F[c]);
            else
                for (a = a.split("/"), c = 0; c < a.length; c++) 0 < a[c].length && b.push(a[c]);
            return new J(b, 0) };
        h.j = function() {
            return this.aa >= this.F.length };
        h.$ = function(a) {
            if (Tc(this) !== Tc(a)) return !1;
            for (var b = this.aa, c = a.aa; b <= this.F.length; b++, c++)
                if (this.F[b] !== a.F[c]) return !1;
            return !0 };
        h.contains = function(a) {
            var b = this.aa,
                c = a.aa;
            if (Tc(this) > Tc(a)) return !1;
            for (; b < this.F.length;) {
                if (this.F[b] !== a.F[c]) return !1;++b;++c }
            return !0 };
        var M = new J("");

        function Vc(a, b) { this.g = a.slice();
            this.f = Math.max(1, this.g.length);
            this.m = b;
            for (var c = 0; c < this.g.length; c++) this.f += Wc(this.g[c]);
            Xc(this) }
        Vc.prototype.push = function(a) { 0 < this.g.length && (this.f += 1);
            this.g.push(a);
            this.f += Wc(a);
            Xc(this) };
        Vc.prototype.pop = function() {
            var a = this.g.pop();
            this.f -= Wc(a);
            0 < this.g.length && --this.f };

        function Xc(a) {
            if (768 < a.f) throw Error(a.m + "has a key path longer than 768 bytes (" + a.f + ").");
            if (32 < a.g.length) throw Error(a.m + "path specified exceeds the maximum depth that can be written (32) or object contains a cycle " + Yc(a)); }

        function Yc(a) {
            return 0 == a.g.length ? "" : "in property '" + a.g.join(".") + "'" };

        function Wc(a) {
            for (var b = 0, c = 0; c < a.length; c++) {
                var d = a.charCodeAt(c);
                128 > d ? b++ : 2048 > d ? b += 2 : 55296 <= d && 56319 >= d ? (b += 4, c++) : b += 3 }
            return b };
        var Zc = /[\[\].#$\/\u0000-\u001F\u007F]/,
            $c = /[\[\].#$\u0000-\u001F\u007F]/;

        function ad(a) {
            return q(a) && 0 !== a.length && !Zc.test(a) }

        function bd(a) {
            return null === a || q(a) || ea(a) && !Db(a) || ga(a) && ya(a, ".sv") }

        function cd(a, b, c, d) { d && !p(b) || dd(I(a, 1, d), b, c) }

        function dd(a, b, c) {
            c instanceof J && (c = new Vc(c, a));
            if (!p(b)) throw Error(a + "contains undefined " + Yc(c));
            if (fa(b)) throw Error(a + "contains a function " + Yc(c) + " with contents: " + b.toString());
            if (Db(b)) throw Error(a + "contains " + b.toString() + " " + Yc(c));
            if (q(b) && b.length > 10485760 / 3 && 10485760 < Wc(b)) throw Error(a + "contains a string greater than 10485760 utf8 bytes " + Yc(c) + " ('" + b.substring(0, 50) + "...')");
            if (ga(b)) {
                var d = !1,
                    e = !1;
                za(b, function(b, g) {
                    if (".value" === b) d = !0;
                    else if (".priority" !== b && ".sv" !== b && (e = !0, !ad(b))) throw Error(a + " contains an invalid key (" + b + ") " + Yc(c) + '.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
                    c.push(b);
                    dd(a, g, c);
                    c.pop()
                });
                if (d && e) throw Error(a + ' contains ".value" child ' + Yc(c) + " in addition to actual children.");
            }
        }

        function ed(a, b) {
            var c, d;
            for (c = 0; c < b.length; c++) { d = b[c];
                for (var e = d.slice(), f = 0; f < e.length; f++)
                    if ((".priority" !== e[f] || f !== e.length - 1) && !ad(e[f])) throw Error(a + "contains an invalid key (" + e[f] + ") in path " + d.toString() + '. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"'); }
            b.sort(J.f);
            e = null;
            for (c = 0; c < b.length; c++) { d = b[c];
                if (null !== e && e.contains(d)) throw Error(a + "contains a path " + e.toString() + " that is ancestor of another path " + d.toString());
                e = d } }

        function fd(a, b, c) {
            var d = I(a, 1, !1);
            if (!ga(b) || da(b)) throw Error(d + " must be an Object containing the children to replace.");
            if (ya(b, ".value")) throw Error(d + ' must not contain ".value".  To overwrite with a leaf value, just use .set() instead.');
            var e = [];
            za(b, function(a, b) {
                var k = new J(a);
                dd(d, b, c.C(k));
                if (".priority" === Uc(k) && !bd(b)) throw Error(d + "contains an invalid value for '" + k.toString() + "', which must be a valid Firebase priority (a string, finite number, server value, or null).");
                e.push(k) });
            ed(d, e)
        }

        function gd(a, b, c) {
            if (Db(c)) throw Error(I(a, b, !1) + "is " + c.toString() + ", but must be a valid Wilddog priority (a string, finite number, server value, or null).");
            if (!bd(c)) throw Error(I(a, b, !1) + "must be a valid Wilddog priority (a string, finite number, server value, or null)."); }

        function hd(a, b, c) {
            if (!c || p(b)) switch (b) {
                case "value":
                case "child_added":
                case "child_removed":
                case "child_changed":
                case "child_moved":
                    break;
                default:
                    throw Error(I(a, 1, c) + 'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".'); } }

        function id(a, b, c, d) {
            if ((!d || p(c)) && !ad(c)) throw Error(I(a, b, d) + 'was an invalid key: "' + c + '".  Wilddog keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").'); }

        function jd(a, b) {
            if (!q(b) || 0 === b.length || $c.test(b)) throw Error(I(a, 1, !1) + 'was an invalid path: "' + b + '". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"'); }

        function kd(a, b) {
            if (".info" === K(b)) throw Error(a + " failed: Can't modify data under /.info/"); }

        function ld(a, b) {
            if (!q(b)) throw Error(I(a, 1, !1) + "must be a valid credential (a string)."); }

        function Ic(a, b, c) {
            if (!q(c)) throw Error(I(a, b, !1) + "must be a valid string."); }

        function G(a, b, c, d) {
            if (!d || p(c))
                if (!ga(c) || null === c) throw Error(I(a, b, d) + "must be a valid object."); }

        function md(a, b, c) {
            if (!ga(b) || null === b || !ya(b, c)) throw Error(I(a, 1, !1) + 'must contain the key "' + c + '"');
            if (!q(t(b, c))) throw Error(I(a, 1, !1) + 'must contain the key "' + c + '" with type "string"'); };

        function nd() {
            var a = window.opener.frames,
                b;
            for (b = a.length - 1; 0 <= b; b--) try {
                if (a[b].location.protocol === window.location.protocol && a[b].location.host === window.location.host && "__winchan_relay_frame" === a[b].name) return a[b] } catch (c) {}
            return null }

        function od(a, b, c) { a.attachEvent ? a.attachEvent("on" + b, c) : a.addEventListener && a.addEventListener(b, c, !1) }

        function pd(a, b, c) { a.detachEvent ? a.detachEvent("on" + b, c) : a.removeEventListener && a.removeEventListener(b, c, !1) }

        function qd(a) { /^https?:\/\//.test(a) || (a = window.location.href);
            var b = /^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(a);
            return b ? b[1] : a }

        function rd(a) {
            var b = "";
            try { a = a.replace("#", "");
                var c = Ia(a);
                c && ya(c, "__wilddog_request_key") && (b = t(c, "__wilddog_request_key")) } catch (d) {}
            return b }

        function sd() {
            var a = Cb(Rb);
            return a.scheme + "://" + a.host + "/v2" }

        function td(a) {
            return sd() + "/" + a + "/auth/channel" };
        var ud = { NETWORK_ERROR: "Unable to contact the Wilddog server.", SERVER_ERROR: "An unknown server error occurred.", TRANSPORT_UNAVAILABLE: "There are no login transports available for the requested method.", REQUEST_INTERRUPTED: "The browser redirected the page before the login request could complete.", USER_CANCELLED: "The user cancelled authentication." };

        function vd(a) {
            var b = Error(t(ud, a), a);
            b.code = a;
            return b };

        function xd(a) { a.callback_parameter || (a.callback_parameter = "callback");
            this.f = a;
            window.__wilddog_auth_jsonp = window.__wilddog_auth_jsonp || {} }
        xd.prototype.open = function(a, b, c) {
            function d() { c && (c(vd("REQUEST_INTERRUPTED")), c = null) }

            function e() { setTimeout(function() { window.__wilddog_auth_jsonp[f] = void 0;
                    Wa(window.__wilddog_auth_jsonp) && (window.__wilddog_auth_jsonp = void 0);
                    try {
                        var a = document.getElementById(f);
                        a && a.parentNode.removeChild(a) } catch (b) {} }, 1);
                pd(window, "beforeunload", d) }
            var f = "fn" + (new Date).getTime() + Math.floor(99999 * Math.random());
            b[this.f.callback_parameter] = "__wilddog_auth_jsonp." + f;
            a += (/\?/.test(a) ? "" : "?") + Ha(b);
            od(window,
                "beforeunload", d);
            window.__wilddog_auth_jsonp[f] = function(a) { c && (c(null, a), c = null);
                e() };
            yd(f, a, c)
        };

        function yd(a, b, c) { setTimeout(function() {
                try {
                    var d = document.createElement("script");
                    d.type = "text/javascript";
                    d.id = a;
                    d.async = !0;
                    d.src = b;
                    d.onerror = function() {
                        var b = document.getElementById(a);
                        null !== b && b.parentNode.removeChild(b);
                        c && c(vd("NETWORK_ERROR")) };
                    var e, f = document.getElementsByTagName("head");
                    f && 0 != f.length ? e = f[0] : e = document.documentElement;
                    e.appendChild(d) } catch (g) { c && c(vd("NETWORK_ERROR")) } }, 0) }
        xd.isAvailable = function() {
            return !NODE_CLIENT };
        xd.prototype.Pb = function() {
            return "json" };

        function zd() {
            return "undefined" !== typeof window && !!(window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(navigator.userAgent) }

        function Ad() {
            return "undefined" !== typeof location && /^file:\//.test(location.href) }

        function Bd() {
            if ("undefined" === typeof navigator) return !1;
            var a = navigator.userAgent;
            if ("Microsoft Internet Explorer" === navigator.appName) {
                if ((a = a.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/)) && 1 < a.length) return 8 <= parseFloat(a[1]) } else if (-1 < a.indexOf("Trident") && (a = a.match(/rv:([0-9]{2,2}[\.0-9]{0,})/)) && 1 < a.length) return 8 <= parseFloat(a[1]);
            return !1 };

        function Cd(a) { a.method || (a.method = "GET");
            a.headers || (a.headers = {});
            a.headers.content_type || (a.headers.content_type = "application/json");
            a.headers.content_type = a.headers.content_type.toLowerCase();
            this.f = a }
        Cd.prototype.open = function(a, b, c) {
            function d() { c && (c(vd("REQUEST_INTERRUPTED")), c = null) }
            var e = new XMLHttpRequest,
                f = this.f.method.toUpperCase(),
                g;
            od(window, "beforeunload", d);
            e.onreadystatechange = function() {
                if (c && 4 === e.readyState) {
                    var a;
                    if (200 <= e.status && 300 > e.status) {
                        try { a = Ja(e.responseText) } catch (b) {}
                        c(null, a) } else 500 <= e.status && 600 > e.status ? c(vd("SERVER_ERROR")) : c(vd("NETWORK_ERROR"));
                    c = null;
                    pd(window, "beforeunload", d) } };
            if ("GET" === f) a += (/\?/.test(a) ? "" : "?") + Ha(b), g = null;
            else {
                var k = this.f.headers.content_type;
                "application/json" === k && (g = u(b));
                "application/x-www-form-urlencoded" === k && (g = Ha(b))
            }
            e.open(f, a, !0);
            a = { "X-Requested-With": "XMLHttpRequest", Accept: "application/json;text/plain" };
            Za(a, this.f.headers);
            for (var l in a) e.setRequestHeader(l, a[l]);
            e.send(g)
        };
        Cd.isAvailable = function() {
            return !NODE_CLIENT && !!window.XMLHttpRequest && (!("undefined" !== typeof navigator && (navigator.userAgent.match(/MSIE/) || navigator.userAgent.match(/Trident/))) || Bd()) };
        Cd.prototype.Pb = function() {
            return "json" };

        function Dd(a) {
            if (!a.window_features || "undefined" !== typeof navigator && (-1 !== navigator.userAgent.indexOf("Fennec/") || -1 !== navigator.userAgent.indexOf("Firefox/") && -1 !== navigator.userAgent.indexOf("Android"))) a.window_features = void 0;
            a.window_name || (a.window_name = "_blank");
            this.f = a }
        Dd.prototype.open = function(a, b, c) {
            function d(a) { g && (document.body.removeChild(g), g = void 0);
                w && (w = clearInterval(w));
                pd(window, "message", e);
                pd(window, "unload", d);
                if (m && !a) try { m.close() } catch (b) { k.postMessage("die", l) }
                m = k = void 0 }

            function e(a) {
                if (a.origin === l) try {
                    var b = Ja(a.data); "ready" === b.a ? k.postMessage(C, l) : "error" === b.a ? (d(!1), c && (c(b.d), c = null)) : "response" === b.a && (d(b.forceKeepWindowOpen), c && (c(null, b.d), c = null)) } catch (e) {} }
            var f = Bd(),
                g, k;
            if (!this.f.relay_url) return c(Error("invalid arguments: origin of url and relay_url must match"));
            var l = qd(a);
            if (l !== qd(this.f.relay_url)) c && setTimeout(function() { c(Error("invalid arguments: origin of url and relay_url must match")) }, 0);
            else {
                f && (g = document.createElement("iframe"), g.setAttribute("src", this.f.relay_url), g.style.display = "none", g.setAttribute("name", "__winchan_relay_frame"), document.body.appendChild(g), k = g.contentWindow);
                a += (/\?/.test(a) ? "" : "?") + Ha(b);
                var m = window.open(a, this.f.window_name, this.f.window_features);
                k || (k = m);
                var w = setInterval(function() {
                        m && m.closed && (d(!1), c && (c(vd("USER_CANCELLED")),
                            c = null))
                    }, 500),
                    C = u({ a: "request", d: b });
                od(window, "unload", d);
                od(window, "message", e)
            }
        };
        Dd.isAvailable = function() {
            return !NODE_CLIENT && "postMessage" in window && !Ad() && !(zd() || "undefined" !== typeof navigator && (navigator.userAgent.match(/Windows Phone/) || window.Windows && /^ms-appx:/.test(location.href)) || "undefined" !== typeof navigator && "undefined" !== typeof window && (navigator.userAgent.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i) || navigator.userAgent.match(/CriOS/) || navigator.userAgent.match(/Twitter for iPhone/) || navigator.userAgent.match(/FBAN\/FBIOS/) || window.navigator.standalone)) &&
                !("undefined" !== typeof navigator && navigator.userAgent.match(/PhantomJS/))
        };
        Dd.prototype.Pb = function() {
            return "popup" };

        function Ed(a, b, c) { this.dc = a || {};
            this.Zb = b || {};
            this.ia = c || {};
            this.dc.remember || (this.dc.remember = "default") }
        var Fd = ["remember", "redirectTo"];

        function Gd(a) {
            var b = {},
                c = {};
            za(a || {}, function(a, e) { 0 <= na(Fd, a) ? b[a] = e : c[a] = e });
            return new Ed(b, {}, c) };

        function Hd(a) { this.f = ma() + ma() + ma();
            this.g = a }
        Hd.prototype.open = function(a, b, c) {
            function d() { c && (c(vd("USER_CANCELLED")), c = null) }
            var e = this,
                f = Cb(Rb),
                g;
            b.requestId = this.f;
            b.redirectTo = f.scheme + "://" + f.host + "/blank/page.html";
            a += /\?/.test(a) ? "" : "?";
            a += Ha(b);
            (g = window.open(a, "_blank", "location=no")) && fa(g.addEventListener) ? (g.addEventListener("loadstart", function(a) {
                var b;
                if (b = a && a.url) a: {
                    try {
                        var m = document.createElement("a");
                        m.href = a.url;
                        b = m.host === f.host && "/blank/page.html" === m.pathname;
                        break a } catch (w) {}
                    b = !1 }
                b && (a = rd(a.url), g.removeEventListener("exit",
                    d), g.close(), a = new Ed(null, null, { requestId: e.f, requestKey: a }), e.g.requestWithCredential("/auth/session", a, c), c = null)
            }), g.addEventListener("exit", d)) : c(vd("TRANSPORT_UNAVAILABLE"))
        };
        Hd.isAvailable = function() {
            return !NODE_CLIENT && zd() };
        Hd.prototype.Pb = function() {
            return "redirect" };

        function Id() { this.f = ma() + ma() + ma() }
        Id.prototype.open = function(a, b) { y.set("redirect_request_id", this.f);
            y.set("redirect_request_id", this.f);
            b.requestId = this.f;
            b.redirectTo = b.redirectTo || window.location.href;
            a += (/\?/.test(a) ? "" : "?") + Ha(b);
            window.location = a };
        Id.isAvailable = function() {
            return !NODE_CLIENT && !Ad() && !zd() };
        Id.prototype.Pb = function() {
            return "redirect" };

        function Jd(a, b, c) { this.A = a;
            this.za = a.app;
            this.g = b;
            this.m = new Sb(this.za.name, b, [cb, y]);
            this.f = null;
            this.o = c;
            Kd(this) }
        h = Jd.prototype;
        h.lc = function() {
            return this.f || null };

        function Kd(a) { y.get("redirect_request_id") && Ld(a);
            var b = a.m.get();
            b && b.idToken ? Oc(a, b.idToken, function(c, d) {
                if (!c && d) {
                    var e = { signIn: !0 };
                    e.currentUser = d;
                    e.idToken = b.idToken;
                    Kc(a, e);
                    Nd(a, e, {}) } else Kc(a, null) }) : Kc(a, null) }

        function Od(a, b, c, d) { b && b.idToken ? Pd(a, b.idToken, c, d) : (Kc(a, null), A(d, Error("No idToken found in response."))) }

        function Pd(a, b, c, d) { Oc(a, b, function(e, f) {
                if (!e && f) {
                    var g = { signIn: !0 };
                    g.currentUser = f;
                    g.idToken = b;
                    Kc(a, g);
                    Nd(a, g, c);
                    A(d, e, f) } else Kc(a, null), A(d, e) }) }

        function Hc(a, b, c) { Qd(a);
            var d = new Ed({}, {}, b || {}),
                e;
            e = "POST";
            switch (b.providerId || b.provider) {
                case "password":
                    b = "verifyPassword";
                    break;
                case "anonymous":
                    b = "verifyAnonymous";
                    break;
                case "custom":
                    b = "verifyCustomToken";
                    break;
                default:
                    b = "credential", e = "GET" }
            if (!b) throw Error("Unknown provider '" + provider + "'.");
            e = { path: b, method: e };
            d.ia._method = e.method;
            Rd(a, [Cd, xd], "/auth/" + e.path, d, c) }

        function Lc(a, b, c, d) {
            Qd(a);
            var e = [Dd, Hd];
            c = Gd(c);
            b.id ? (c.ia.providerId = b.id, c.ia.scope = b.scope || "", c.ia.appId = a.g.Jb, c.Zb.window_features = "menubar=yes,modal=yes,alwaysRaised=yeslocation=yes,resizable=yes,scrollbars=yes,status=yes,height=625,width=625,top=" + ("object" === typeof screen ? .5 * (screen.height - 625) : 0) + ",left=" + ("object" === typeof screen ? .5 * (screen.width - 625) : 0), c.Zb.relay_url = td(a.g.Jb), c.Zb.requestWithCredential = r(a.lb, a), Rd(a, e, "/auth/oauth", c, d)) : setTimeout(function() { A(d, vd("TRANSPORT_UNAVAILABLE")) },
                0)
        }

        function Mc(a, b, c, d) { Qd(a);
            var e = [Id];
            c = Gd(c);
            b.id ? (c.ia.providerId = b.id, c.ia.scope = b.scope || "", c.ia.appId = a.g.Jb, y.set("redirect_client_options", c.dc), Rd(a, e, "/auth/oauth", c, d)) : A(d, vd("TRANSPORT_UNAVAILABLE")) }

        function Ld(a) {
            var b = y.get("redirect_request_id");
            if (b) {
                var c = y.get("redirect_client_options");
                y.remove("redirect_request_id");
                y.remove("redirect_client_options");
                var d = [Cd, xd],
                    b = { requestId: b, requestKey: rd(document.location.hash) },
                    c = new Ed(c, {}, b);
                try { document.location.hash = document.location.hash.replace(/&__wilddog_request_key=([a-zA-z0-9]*)/, "") } catch (e) {}
                Rd(a, d, "/auth/session", c, function() {}.bind(a)) } }
        h.Qb = function(a, b) {
            var c = this;
            Qd(this);
            var d = Gd(a);
            d.ia._method = "POST";
            this.lb("/auth/signupNewUser", d, function(a, d) {!a && d && d.idToken ? Pd(c, d.idToken, null, b) : A(b, a) }) };

        function Jc(a, b, c, d) {
            var e = { idToken: c.idToken },
                f = c.photoURL || a.f.currentUser.photoURL,
                g = c.displayName || a.f.currentUser.displayName;
            switch (b) {
                case "unlink":
                    e.deleteProvider = c.deleteProvider;
                    break;
                case "profile":
                    e.photoUrl = f, e.displayName = g }
            Sd(a, e, function(b, c) { b ? A(d, b) : (a.f.currentUser.displayName = g, a.f.currentUser.photoURL = f, Nd(a, a.f), A(d, b, c)) }) }

        function Gc(a, b, c) { Sd(a, b, function(b, e) { b ? A(c, b) : Od(a, e, {}, c) }) }

        function Sd(a, b, c) { b = Gd(b);
            b.ia._method = "POST";
            b.ia.idToken = a.f.idToken;
            a.lb("/auth/setAccountInfo", b, function(a, b) { a ? A(c, a) : A(c, a, b) }) }

        function Oc(a, b, c) { Qd(a);
            b = Gd({ idToken: b });
            b.ia._method = "POST";
            a.lb("/auth/getAccountInfo", b, function(b, e) { b ? A(c, b) : A(c, b, Qc(a, e)) }) }
        h.vc = function(a, b) {
            var c = this;
            Qd(this);
            var d = Gd({ idToken: a });
            d.ia._method = "POST";
            this.lb("/auth/deleteAccount", d, function(a, d) {!a && d && "ok" == d.status && c.f && (Kc(c, null), A(void 0, null));
                A(b, a) }) };

        function Nc(a, b, c) { Qd(a);
            b = Gd(b);
            b.ia._method = "POST";
            a.lb("/auth/getOobConfirmationCode", b, function(a, b) { A(c, a, b) }) }
        h.Nc = function(a, b) { Qd(this);
            var c = Gd({ email: a });
            c.ia._method = "POST";
            this.lb("/auth/getProvider", c, function(a, c) { a ? A(b, a) : A(b, a, c.allProviders || []) }) };
        h.lb = function(a, b, c) { Td(this, [Cd, xd], a, b, c) };

        function Rd(a, b, c, d, e) { Td(a, b, c, d, function(b, c) {!b && c && c.idToken ? Od(a, c, d.dc, function(a, b) { a ? A(e, a) : A(e, null, b) }) : A(e, b || vd("UNKNOWN_ERROR")) }) }

        function Td(a, b, c, d, e) {
            b = pa(b, function(a) {
                return "function" === typeof a.isAvailable && a.isAvailable() });
            0 === b.length ? setTimeout(function() { A(e, vd("TRANSPORT_UNAVAILABLE")) }, 0) : (b = b.shift(), d.Zb.method = d.ia._method, b = new b(d.Zb), d = Aa(d.ia), d.v = (NODE_CLIENT ? "node-" : "js-") + CLIENT_VERSION, d.transport = b.Pb(), d.suppress_status_codes = !0, a = sd() + "/" + a.g.Jb + c, b.open(a, d, function(a, b) {
                if (a) A(e, a);
                else if (b && b.error) {
                    var c = Error(b.error.message);
                    c.code = b.error.code;
                    c.details = b.error.details;
                    A(e, c) } else A(e, null,
                    b)
            }))
        }

        function Nd(a, b, c) { Tb(a.m);
            c = c || {};
            var d = cb; "sessionOnly" === c.remember && (d = y); "none" !== c.remember && a.m.set(b, d) }

        function Kc(a, b) { a.f = b;
            a.A.currentUser = b && b.signIn ? b.currentUser : null;
            a.za.emit(Ob.Qa, b || { signIn: !1 });
            a.o && a.o(null !== b);
            b && b.signIn || Tb(a.m) }

        function Qd(a) {
            if (a.g.xd && "auth.wilddog.com" === Rb) throw Error("This custom Wilddog server ('" + a.g.domain + "') does not support delegated login."); };

        function Ud() {
            var a = "undefined" !== typeof window ? window : global;
            if (!a.wilddog) { a.wilddog = {};
                var b = {};
                a.wilddog.initializeApp = function(b, d) {
                    var e = d || "DEFAULT";
                    a.wilddog[e] = new Nb(b, e);
                    return a.wilddog[e] };
                a.wilddog.__regService = function(a, d) { b[a] = d };
                a.wilddog.__getService = function(a) {
                    return b[a] };
                ["auth", "sync"].forEach(function(b) { a.wilddog[b] = function() {
                        if (!a.wilddog.DEFAULT) throw Error("App has not been initialized.");
                        return a.wilddog.DEFAULT[b]() } });
                n.wilddog = a.wilddog }
            return a.wilddog || n.wilddog };
        Ud().__regService("auth", function(a) {
            return new O(a) });

        function O(a) {
            if (!a.options.authDomain) throw Error("Could not find 'authDomain' in options.");
            var b = this;
            this.g = function(a) {
                var b = /^([a-zA-Z0-9\-_]+)\.([a-z]+)\.com/.exec(a.toLowerCase());
                if (!b) throw Error("Bad 'authDomain' format '" + a + "'.");
                return { Jb: b[1], lf: b[2], df: b[0], sc: "", xd: "wilddog" !== b[2] } }(a.options.authDomain);
            this.app = a;
            this.f = new Jd(this, this.g);
            this.app.bind(Ob.nd, function(a) {
                var d = b.f;
                a = a.reason;
                d.f = null;
                d.A.currentUser = null;
                d.za.emit(Ob.Qa, { signIn: !1, reason: a });
                d.o && d.o(!1);
                Tb(d.m) }) }
        O.prototype.re = function(a) {
            function b(b) { a(b && b.signIn ? b.currentUser : null) }
            var c = this;
            F("wilddog.auth().onAuthStateChanged", 1, 1, arguments.length);
            H("wilddog.auth().onAuthStateChanged", 1, a, !1);
            this.app.bind(Ob.Qa, b);
            return function() { c.app.unbind(Ob.Qa, b) } };
        O.prototype.onAuthStateChanged = O.prototype.re;
        O.prototype.Ge = function(a) { F("wilddog.auth().signInAnonymously", 0, 1, arguments.length);
            H("wilddog.auth().signInAnonymously", 1, a, !0);
            var b = new B;
            this.f.Qb({}, D(b, a));
            return b.f };
        O.prototype.signInAnonymously = O.prototype.Ge;
        O.prototype.Ce = function(a, b) { F("wilddog.auth().sendPasswordResetEmail", 1, 2, arguments.length);
            H("wilddog.auth().sendPasswordResetEmail", 2, b, !0);
            var c = new B;
            Nc(this.f, { requestType: "RESET_PASSWORD", email: a }, D(c, b));
            return c.f };
        O.prototype.sendPasswordResetEmail = O.prototype.Ce;
        O.prototype.Nc = function(a, b) { F("wilddog.auth().fetchProvidersForEmail", 1, 2, arguments.length);
            H("wilddog.auth().fetchProvidersForEmail", 2, b, !0);
            var c = new B;
            this.f.Nc(a, D(c, b));
            return c.f };
        O.prototype.fetchProvidersForEmail = O.prototype.Nc;
        O.prototype.Ie = function(a, b) { F("wilddog.auth().signInWithCustomToken", 1, 2, arguments.length);
            H("wilddog.auth().signInWithCustomToken", 2, b, !0);
            var c = new B;
            Hc(this.f, { providerId: "custom", token: a }, D(c, b));
            return c.f };
        O.prototype.signInWithCustomToken = O.prototype.Ie;
        O.prototype.Je = function(a, b, c) { F("wilddog.auth().signInWithEmailAndPassword", 2, 3, arguments.length);
            H("wilddog.auth().signInWithEmailAndPassword", 3, c, !0);
            var d = new B;
            Hc(this.f, { providerId: "password", password: b, email: a }, D(d, c));
            return d.f };
        O.prototype.signInWithEmailAndPassword = O.prototype.Je;
        O.prototype.Me = function(a) { F("wilddog.auth().signOut", 0, 1, arguments.length);
            H("wilddog.auth().signOut", 1, a, !0);
            var b = new B,
                c = D(b, a);
            Kc(this.f, null);
            A(c, null);
            return b.f };
        O.prototype.signOut = O.prototype.Me;
        O.prototype.ce = function(a, b, c) { F("wilddog.auth().createUserWithEmailAndPassword", 2, 3, arguments.length);
            H("wilddog.auth().createUserWithEmailAndPassword", 3, c, !0);
            var d = new B;
            this.f.Qb({ email: a, password: b }, D(d, c));
            return d.f };
        O.prototype.createUserWithEmailAndPassword = O.prototype.ce;
        O.prototype.Ke = function(a, b) { F("wilddog.auth().signInWithPopup", 1, 2, arguments.length);
            G("wilddog.auth().signInWithPopup", 1, a, !1);
            var c = new B;
            Lc(this.f, a, { authType: "login" }, D(c, b));
            return c.f };
        O.prototype.signInWithPopup = O.prototype.Ke;
        O.prototype.Le = function(a, b) { F("wilddog.auth().signInWithRedirect", 1, 2, arguments.length);
            G("wilddog.auth().signInWithRedirect", 1, a, !1);
            var c = new B;
            Mc(this.f, a, { authType: "login" }, D(c, b));
            return c.f };
        O.prototype.signInWithRedirect = O.prototype.Le;
        O.prototype.He = function(a, b) { F("wilddog.auth().signInWithCredential", 1, 2, arguments.length);
            G("wilddog.auth().signInWithCredential", 1, a, !1);
            var c = {};
            c.providerId = a.provider;
            c.accessToken = a.accessToken;
            c.openId = a.openId || "";
            c.authType = "login";
            var d = new B;
            Hc(this.f, c, D(d, b));
            return d.f };
        O.prototype.signInWithCredential = O.prototype.He;

        function Vd() { this.f = {} }
        Vd.prototype.get = function() {
            return Xa(this.f) };
        var Wd = {},
            Xd = null;
        "undefined" != typeof require && "undefined" !== typeof module && module.exports ? Xd = require("engine.io-client") : Xd = eio;

        function Yd(a, b, c, d, e) { this.id = a;
            this.m = yb("c:" + this.id + ":");
            this.V = c;
            this.H = d;
            this.A = e;
            this.f = b;
            this.o = 0;
            this.m("Connection created");
            this.g = Zd(this);
            this.g.on("open", $d(this));
            this.g.on("error", ae(this)) }

        function $d(a) {
            return function() { a.g.on("message", be(a));
                a.g.on("close", ce(a)) } }

        function be(a) {
            return function(b) {
                if (null == b) throw Error("data is null");
                if (0 != b.charAt(0))
                    if (2 == b.charAt(0)) {
                        var c = null;
                        try { c = JSON.parse(b.substr(1)) } catch (f) {
                            throw f; }
                        if ("object" != typeof c || 2 > c.length) throw Error("decodedData in wrong format");
                        b = c[1];
                        if ("wd" == c[0])
                            if ("c" == b.t)
                                if (c = b.d, "h" == c.t) {
                                    b = c.d;
                                    var c = b.ts,
                                        d = b.v,
                                        e = b.h;
                                    a.sessionId = b.s;
                                    "1.0" != d && Bb("Protocol version mismatch detected");
                                    0 == a.o && (e != a.f.Ca ? (de(a.f, e), a.m("updateHost ", e), a.g.close(), a.g = Zd(a), a.g.on("open", $d(a)), a.g.on("error",
                                        ae(a))) : (a.o = 1, a.m("realtime state connected"), b = a.f, d = b.Sa.indexOf(a.f.Ca), 0 <= d && (b.Sa.splice(d, 1), y.set("failHosts", JSON.stringify(b.Sa))), a.H && (a.H(c), a.H = null)))
                                } else "r" == c.t && (c = c.d, a.m("Reset packet received.  New host: " + c), de(a.f, c), a.close());
                        else "d" == b.t && a.V(b.d);
                        else a.m("eventType not known")
                    } else 1 != b.charAt(0) && a.m("data format error")
            }
        }

        function ce(a) {
            return function() { 2 !== a.o && (a.m("Closing realtime connection."), a.o = 2, a.A && (a.A(), a.A = null)) } }

        function ae(a) {
            return function(b) {
                if (0 == a.o) {
                    var c = a.f.Ca,
                        d = a.f;
                    null != c && 0 > d.Sa.indexOf(c) && c != d.host && (d.Sa.push(c), y.set("failHosts", JSON.stringify(d.Sa)));
                    a.m("error while connecting", b, c);
                    de(a.f) }
                a.close() } }

        function Zd(a) {
            var b = (a.f.gb ? "https://" : "http://") + a.f.Ca + "?v=1.0&cv=" + CLIENT_VERSION,
                c = a.f;
            c.host !== c.Ca && (b = b + "&ns=" + a.f.Ad);
            a.sessionId && (b = b + "&s=" + a.sessionId);
            0 < a.f.Sa.length && (b = b + "&fst=" + encodeURIComponent(a.f.Sa.join(",")));
            a = { path: "/.ws", rememberUpgrade: !0 }; "undefined" == typeof document && (a.jsonp = !1);
            return Xd(b, a) }
        Yd.prototype.wa = function(a) { a = "2" + JSON.stringify(["wd", { t: "d", d: a }]);
            this.g.send(a) };
        Yd.prototype.close = function() { 2 !== this.o && (this.m("Closing realtime connection."), this.o = 2, this.g.close(), this.A && (this.A(), this.A = null)) };

        function ee() {
            Lb.call(this, ["visible"]);
            var a, b;
            "undefined" !== typeof document && "undefined" !== typeof document.addEventListener && ("undefined" !== typeof document.hidden ? (b = "visibilitychange", a = "hidden") : "undefined" !== typeof document.mozHidden ? (b = "mozvisibilitychange", a = "mozHidden") : "undefined" !== typeof document.msHidden ? (b = "msvisibilitychange", a = "msHidden") : "undefined" !== typeof document.webkitHidden && (b = "webkitvisibilitychange", a = "webkitHidden"));
            this.ya = !0;
            if (b) {
                var c = this;
                document.addEventListener(b,
                    function() {
                        var b = !document[a];
                        b !== c.ya && (c.ya = b, c.m("visible", b)) }, !1)
            }
        }
        ka(ee, Lb);
        ee.prototype.o = function(a) { z("visible" === a, "Unknown event type: " + a);
            return [this.ya] };
        ba(ee);

        function fe() { Lb.call(this, ["online"]);
            this.f = !0;
            if ("undefined" !== typeof window && "undefined" !== typeof window.addEventListener) {
                var a = this;
                window.addEventListener("online", function() { a.f || (a.f = !0, a.m("online", !0)) }, !1);
                window.addEventListener("offline", function() { a.f && (a.f = !1, a.m("online", !1)) }, !1) } }
        ka(fe, Lb);
        fe.prototype.o = function(a) { z("online" === a, "Unknown event type: " + a);
            return [this.f] };
        ba(fe);

        function ge(a, b, c, d) { this.id = he++;
            this.f = yb("p:" + this.id + ":");
            this.Fc = !1;
            this.ea = {};
            this.m = [];
            this.La = 0;
            this.Ha = [];
            this.g = !1;
            this.H = 1E3;
            this.mb = 3E5;
            this.jd = b;
            this.hd = c;
            this.Rd = d;
            this.Sd = a;
            this.ad = null;
            this.ac = {};
            this.Pd = 0;
            this.Ga = this.Gc = null;
            ie(this, 0);
            ee.tb().Wa("visible", this.ve, this); - 1 === a.host.indexOf("wd.local") && fe.tb().Wa("online", this.ue, this) }
        var he = 0,
            je = 0;
        h = ge.prototype;
        h.wa = function(a, b, c) {
            var d = ++this.Pd;
            a = { r: d, a: a, b: b };
            this.f(u(a));
            z(this.g, "sendRequest call when we're not connected not allowed.");
            this.A.wa(a);
            c && (this.ac[d] = c) };
        h.yd = function(a, b, c, d) {
            var e = a.sa(),
                f = a.path.toString();
            this.f("Listen called for " + f + " " + e);
            this.ea[f] = this.ea[f] || {};
            z(!this.ea[f][e], "listen() called twice for same path/queryId.");
            a = { S: d, oc: b, xe: a, tag: c };
            this.ea[f][e] = a;
            this.g && ke(this, a) };

        function ke(a, b) {
            var c = b.xe,
                d = c.path.toString(),
                e = c.sa();
            a.f("Listen on " + d + " for " + e);
            var f = { p: d };
            b.tag && (f.q = le(c.G), f.t = b.tag);
            f.h = b.oc();
            a.wa("q", f, function(f) {
                var k = f.d,
                    l = f.s;
                if (k && "object" === typeof k && ya(k, "w")) {
                    var m = t(k, "w");
                    da(m) && 0 <= na(m, "no_index") && Bb("Using an unspecified index. Consider adding " + ('".indexOn": "' + c.G.U().toString() + '"') + " at " + c.path.toString() + " to your security rules for better performance") }(a.ea[d] && a.ea[d][e]) === b && (a.f("listen response", f), "ok" !== l && me(a, d, e), b.S &&
                    b.S(l, k))
            })
        }
        h.W = function(a, b, c) { this.o = { de: a, sd: !1, Ob: b, cc: c };
            this.f("Authenticating using credential: " + a);
            ne(this);
            40 == a.length && (this.f("Admin auth credential detected.  Reducing max reconnect time."), this.mb = 3E4) };
        h.Bc = function(a) { delete this.o;
            this.g && this.wa("unauth", {}, function(b) { a(b.s, b.d) }) };

        function ne(a) {
            var b = a.o;
            a.g && b && a.wa("auth", { cred: b.de }, function(c) {
                var d = c.s;
                c = c.d || "error"; "ok" !== d && a.o === b && delete a.o;
                b.sd ? "ok" !== d && b.cc && b.cc(d, c) : (b.sd = !0, b.Ob && b.Ob(d, c)) }) }
        h.Id = function(a, b) {
            var c = a.path.toString(),
                d = a.sa();
            this.f("Unlisten called for " + c + " " + d);
            if (me(this, c, d) && this.g) {
                var e = le(a.G);
                this.f("Unlisten on " + c + " for " + d);
                c = { p: c };
                b && (c.q = e, c.t = b);
                this.wa("n", c) } };
        h.Xc = function(a, b, c) { this.g ? oe(this, "o", a, b, c) : this.Ha.push({ Yb: a, action: "o", data: b, S: c }) };
        h.Bd = function(a, b, c) { this.g ? oe(this, "om", a, b, c) : this.Ha.push({ Yb: a, action: "om", data: b, S: c }) };
        h.qc = function(a, b) { this.g ? oe(this, "oc", a, null, b) : this.Ha.push({ Yb: a, action: "oc", data: null, S: b }) };

        function oe(a, b, c, d, e) { c = { p: c, d: d };
            a.f("onDisconnect " + b, c);
            a.wa(b, c, function(a) { e && setTimeout(function() { e(a.s, a.d) }, Math.floor(0)) }) }
        h.Gb = function(a, b, c, d) { pe(this, "p", a, b, c, d) };
        h.zd = function(a, b, c, d) { pe(this, "m", a, b, c, d) };

        function pe(a, b, c, d, e, f) { d = { p: c, d: d };
            p(f) && (d.h = f);
            a.m.push({ action: b, request: d, S: e });
            a.La++;
            b = a.m.length - 1;
            a.g ? qe(a, b) : a.f("Buffering put: " + c) }

        function qe(a, b) {
            var c = a.m[b].action,
                d = a.m[b].request,
                e = a.m[b].S;
            a.m[b].ye = a.g;
            a.wa(c, d, function(d) { a.f(c + " response", d);
                delete a.m[b];
                a.La--;
                0 === a.La && (a.m = []);
                e && e(d.s, d.d) }) }
        h.Yc = function(a) {
            if (this.g) { a = { c: a };
                this.f("reportStats", a);
                var b = this;
                this.wa("s", a, function(a) { "ok" !== a.s && b.f("reportStats", "Error sending stats: " + a.d) }) } };
        h.se = function(a) {
            if ("r" in a) { this.f("from server: " + u(a));
                var b = a.r,
                    c = this.ac[b];
                c && (delete this.ac[b], c(a.b)) } else {
                if ("error" in a) throw "A server-side error has occurred: " + a.error;
                "a" in a && (b = a.a, c = a.b, this.f("handleServerMessage", b, c), "d" === b ? this.jd(c.p, c.d, !1, c.t) : "m" === b ? this.jd(c.p, c.d, !0, c.t) : "c" === b ? re(this, c.p, c.q) : "ac" === b ? (a = c.s, b = c.d, c = this.o, delete this.o, c && c.cc && c.cc(a, b)) : "sd" === b ? this.ad ? this.ad(c) : "msg" in c && "undefined" !== typeof console && console.log("WILDDOG: " + c.msg.replace("\n",
                    "\nWILDDOG: ")) : zb("Unrecognized action received from server: " + u(b) + "\nAre you using the latest client?"))
            }
        };
        h.We = function(a) { this.f("connection ready");
            this.g = !0;
            this.Ga = (new Date).getTime();
            this.Rd({ serverTimeOffset: a - (new Date).getTime() });
            a = {};
            a["sdk.js." + CLIENT_VERSION.replace(/\./g, "-")] = 1;
            zd() && (a["framework.cordova"] = 1);
            this.Yc(a);
            se(this);
            this.hd(!0) };

        function ie(a, b) { z(!a.A, "Scheduling a connect when we're already connected/ing?");
            a.V && clearTimeout(a.V);
            a.V = setTimeout(function() { a.V = null;
                if (te(a)) { a.f("Making a connection attempt");
                    a.Gc = (new Date).getTime();
                    a.Ga = null;
                    var b = r(a.se, a),
                        d = r(a.We, a),
                        e = r(a.Cd, a),
                        f = a.id + ":" + je++;
                    a.A = new Yd(f, a.Sd, b, d, e) } }, Math.floor(b)) }
        h.ve = function(a) { a && !this.ya && this.H === this.mb && (this.f("Window became visible.  Reducing delay."), this.H = 1E3, this.A || ie(this, 0));
            this.ya = a };
        h.ue = function(a) { a ? (this.f("Browser went online."), this.H = 1E3, this.A || ie(this, 0)) : (this.f("Browser went offline.  Killing connection."), this.A && this.A.close()) };
        h.Cd = function() {
            this.f("data client disconnected");
            this.g = !1;
            this.A = null;
            for (var a = 0; a < this.m.length; a++) {
                var b = this.m[a];
                b && "h" in b.request && b.ye && (b.S && b.S("disconnect"), delete this.m[a], this.La--) }
            0 === this.La && (this.m = []);
            this.ac = {};
            te(this) && (this.ya ? this.Ga && (3E4 < (new Date).getTime() - this.Ga && (this.H = 1E3), this.Ga = null) : (this.f("Window isn't visible.  Delaying reconnect."), this.H = this.mb, this.Gc = (new Date).getTime()), a = Math.max(0, this.H - ((new Date).getTime() - this.Gc)), a *= Math.random(), this.f("Trying to reconnect in " +
                a + "ms"), ie(this, a), this.H = Math.min(this.mb, 1.3 * this.H));
            this.hd(!1)
        };
        h.cb = function() { this.Fc = !0;
            this.A ? this.A.close() : (this.V && (clearTimeout(this.V), this.V = null), this.g && this.Cd()) };
        h.Eb = function() { this.Fc = !1;
            this.H = 1E3;
            this.A || ie(this, 0) };

        function re(a, b, c) { c = c ? qa(c, function(a) {
                return Gb(a) }).join("$") : "default";
            (a = me(a, b, c)) && a.S && a.S("permission_denied") }

        function me(a, b, c) { b = (new J(b)).toString();
            var d;
            p(a.ea[b]) ? (d = a.ea[b][c], delete a.ea[b][c], 0 === Oa(a.ea[b]) && delete a.ea[b]) : d = void 0;
            return d }

        function se(a) { ne(a);
            La(a.ea, function(b) { La(b, function(b) { ke(a, b) }) });
            for (var b = 0; b < a.m.length; b++) a.m[b] && qe(a, b);
            for (; a.Ha.length;) b = a.Ha.shift(), oe(a, b.action, b.Yb, b.data, b.S) }

        function te(a) {
            var b;
            b = fe.tb().f;
            return !a.Fc && b };

        function ue() { this.children = {};
            this.Jc = 0;
            this.value = null }

        function ve(a, b, c) { this.m = a ? a : "";
            this.g = b ? b : null;
            this.f = c ? c : new ue }

        function we(a, b) {
            for (var c = b instanceof J ? b : new J(b), d = a, e; null !== (e = K(c));) d = new ve(e, d, t(d.f.children, e) || new ue), c = L(c);
            return d }
        h = ve.prototype;
        h.ua = function() {
            return this.f.value };

        function xe(a, b) { z("undefined" !== typeof b, "Cannot set value to undefined");
            a.f.value = b;
            ye(a) }
        h.nc = function() {
            return 0 < this.f.Jc };
        h.j = function() {
            return null === this.ua() && !this.nc() };
        h.X = function(a) {
            var b = this;
            La(this.f.children, function(c, d) { a(new ve(d, b, c)) }) };

        function ze(a, b, c, d) { c && !d && b(a);
            a.X(function(a) { ze(a, b, !0, d) });
            c && d && b(a) }

        function Ae(a, b) {
            for (var c = a.parent(); null !== c && !b(c);) c = c.parent() }
        h.path = function() {
            return new J(null === this.g ? this.m : this.g.path() + "/" + this.m) };
        h.name = function() {
            return this.m };
        h.parent = function() {
            return this.g };

        function ye(a) {
            if (null !== a.g) {
                var b = a.g,
                    c = a.m,
                    d = a.j(),
                    e = ya(b.f.children, c);
                d && e ? (delete b.f.children[c], b.f.Jc--, ye(b)) : d || e || (b.f.children[c] = a.f, b.f.Jc++, ye(b)) } };

        function Be(a, b) {
            return Eb(a.name, b.name) }

        function Ce(a, b) {
            return Eb(a, b) };

        function De() {}
        De.f;
        var Ee = {};

        function Fe(a) {
            return r(a.compare, a) }
        De.prototype.pc = function(a, b) {
            return 0 !== this.compare(new P("[MIN_NAME]", a), new P("[MIN_NAME]", b)) };
        De.prototype.Wb = function() {
            return Ge };

        function He(a) { this.f = a }
        ka(He, De);
        h = He.prototype;
        h.Sb = function(a) {
            return !a.P(this.f).j() };
        h.compare = function(a, b) {
            var c = a.node.P(this.f),
                d = b.node.P(this.f),
                c = c.pb(d);
            return 0 === c ? Eb(a.name, b.name) : c };
        h.Tb = function(a, b) {
            var c = Q(a),
                c = x.T(this.f, c);
            return new P(b, c) };
        h.Ub = function() {
            var a = x.T(this.f, Ie);
            return new P("[MAX_NAME]", a) };
        h.toString = function() {
            return this.f };

        function Je() {}
        ka(Je, De);
        h = Je.prototype;
        h.compare = function(a, b) {
            var c = a.node.J(),
                d = b.node.J(),
                c = c.pb(d);
            return 0 === c ? Eb(a.name, b.name) : c };
        h.Sb = function(a) {
            return !a.J().j() };
        h.pc = function(a, b) {
            return !a.J().$(b.J()) };
        h.Wb = function() {
            return Ge };
        h.Ub = function() {
            return new P("[MAX_NAME]", new Ke("[PRIORITY-POST]", Ie)) };
        h.Tb = function(a, b) {
            var c = Q(a);
            return new P(b, new Ke("[PRIORITY-POST]", c)) };
        h.toString = function() {
            return ".priority" };
        var R = new Je;

        function Le() {}
        ka(Le, De);
        h = Le.prototype;
        h.compare = function(a, b) {
            return Eb(a.name, b.name) };
        h.Sb = function() {
            throw pb("KeyIndex.isDefinedOn not expected to be called."); };
        h.pc = function() {
            return !1 };
        h.Wb = function() {
            return Ge };
        h.Ub = function() {
            return new P("[MAX_NAME]", x) };
        h.Tb = function(a) { z(q(a), "KeyIndex indexValue must always be a string.");
            return new P(a, x) };
        h.toString = function() {
            return ".key" };
        var Me = new Le;

        function Ne() {}
        ka(Ne, De);
        h = Ne.prototype;
        h.compare = function(a, b) {
            var c = a.node.pb(b.node);
            return 0 === c ? Eb(a.name, b.name) : c };
        h.Sb = function() {
            return !0 };
        h.pc = function(a, b) {
            return !a.$(b) };
        h.Wb = function() {
            return Ge };
        h.Ub = function() {
            return Oe };
        h.Tb = function(a, b) {
            var c = Q(a);
            return new P(b, c) };
        h.toString = function() {
            return ".value" };
        var Pe = new Ne;

        function S() {}
        S.prototype.R;
        S.prototype.J;
        S.prototype.ba;
        S.prototype.P;
        S.prototype.ka;
        S.prototype.Rc;
        S.prototype.T;
        S.prototype.M;
        S.prototype.va;
        S.prototype.j;
        S.prototype.Va;
        S.prototype.N;
        S.prototype.hash;
        S.prototype.pb;
        S.prototype.$;
        S.prototype.Oa;
        S.prototype.Ab;

        function P(a, b) { this.name = a;
            this.node = b }

        function Qe(a, b) {
            return new P(a, b) };

        function Re() { this.set = {} }
        h = Re.prototype;
        h.add = function(a, b) { this.set[a] = null !== b ? b : !0 };
        h.contains = function(a) {
            return ya(this.set, a) };
        h.get = function(a) {
            return this.contains(a) ? this.set[a] : void 0 };
        h.remove = function(a) { delete this.set[a] };
        h.j = function() {
            return Wa(this.set) };
        h.count = function() {
            return Oa(this.set) };

        function Se(a, b) { La(a.set, function(a, d) { b(d, a) }) };

        function Te() { this.D = this.K = null }
        Te.prototype.find = function(a) {
            if (null != this.K) return this.K.ka(a);
            if (a.j() || null == this.D) return null;
            var b = K(a);
            a = L(a);
            return this.D.contains(b) ? this.D.get(b).find(a) : null };
        Te.prototype.Db = function(a, b) {
            if (a.j()) this.K = b, this.D = null;
            else if (null !== this.K) this.K = this.K.M(a, b);
            else { null == this.D && (this.D = new Re);
                var c = K(a);
                this.D.contains(c) || this.D.add(c, new Te);
                c = this.D.get(c);
                a = L(a);
                c.Db(a, b) } };

        function Ue(a, b) {
            if (b.j()) return a.K = null, a.D = null, !0;
            if (null !== a.K) {
                if (a.K.R()) return !1;
                var c = a.K;
                a.K = null;
                c.X(R, function(b, c) { a.Db(new J(b), c) });
                return Ue(a, b) }
            return null !== a.D ? (c = K(b), b = L(b), a.D.contains(c) && Ue(a.D.get(c), b) && a.D.remove(c), a.D.j() ? (a.D = null, !0) : !1) : !0 }

        function Ve(a, b, c) { null !== a.K ? c(b, a.K) : a.X(function(a, e) {
                var f = new J(b.toString() + "/" + a);
                Ve(e, f, c) }) }
        Te.prototype.X = function(a) { null !== this.D && Se(this.D, function(b, c) { a(b, c) }) };

        function We(a, b) { this.Hd = {};
            this.V = new Xe(a);
            this.g = b;
            var c = 1E4 + 2E4 * Math.random();
            setTimeout(r(this.f, this), Math.floor(c)) }
        We.prototype.f = function() {
            var a = this.V.get(),
                b = {},
                c = !1,
                d;
            for (d in a) 0 < a[d] && ya(this.Hd, d) && (b[d] = a[d], c = !0);
            c && this.g.Yc(b);
            setTimeout(r(this.f, this), Math.floor(6E5 * Math.random())) };

        function Xe(a) { this.g = a;
            this.f = null }
        Xe.prototype.get = function() {
            var a = this.g.get(),
                b = Xa(a);
            if (this.f)
                for (var c in this.f) b[c] -= this.f[c];
            this.f = a;
            return b };
        var Ye = {},
            Ze = {};

        function $e(a) { a = a.toString();
            Ye[a] || (Ye[a] = new Vd);
            return Ye[a] }

        function af(a, b) {
            var c = a.toString();
            Ze[c] || (Ze[c] = b());
            return Ze[c] };

        function bf(a, b) {
            return a && "object" === typeof a ? (z(".sv" in a, "Unexpected leaf node or priority contents"), b[a[".sv"]]) : a }

        function cf(a, b) {
            var c = new Te;
            Ve(a, new J(""), function(a, e) { c.Db(a, df(e, b)) });
            return c }

        function df(a, b) {
            var c = a.J().N(),
                c = bf(c, b),
                d;
            if (a.R()) {
                var e = bf(a.ua(), b);
                return e !== a.ua() || c !== a.J().N() ? new Ke(e, Q(c)) : a }
            d = a;
            c !== a.J().N() && (d = d.ba(new Ke(c)));
            a.X(R, function(a, c) {
                var e = df(c, b);
                e !== c && (d = d.T(a, e)) });
            return d };

        function ef(a, b) { this.f = yb("p:rest:");
            this.g = a;
            this.m = b;
            this.o = null;
            this.ea = {} }

        function ff(a, b) {
            if (p(b)) return "tag$" + b;
            var c = a.G;
            z(gf(c) && c.w == R, "should have a tag if it's not a default query.");
            return a.path.toString() }
        h = ef.prototype;
        h.yd = function(a, b, c, d) {
            var e = a.path.toString();
            this.f("Listen called for " + e + " " + a.sa());
            var f = ff(a, c),
                g = {};
            this.ea[f] = g;
            a = hf(a.G);
            var k = this;
            jf(this, e + ".json", a, function(a, b) {
                var w = b;
                404 === a && (a = w = null);
                null === a && k.m(e, w, !1, c);
                t(k.ea, f) === g && d(a ? 401 == a ? "permission_denied" : "rest_error:" + a : "ok", null) }) };
        h.Id = function(a, b) {
            var c = ff(a, b);
            delete this.ea[c] };
        h.W = function(a, b) { this.o = a;
            var c = Pb(a),
                d = c.data,
                c = c.Kc && c.Kc.exp;
            b && b("ok", { auth: d, expires: c }) };
        h.Bc = function(a) { this.o = null;
            a("ok", null) };
        h.Xc = function() {};
        h.Bd = function() {};
        h.qc = function() {};
        h.Gb = function() {};
        h.zd = function() {};
        h.Yc = function() {};

        function jf(a, b, c, d) {
            c = c || {};
            c.format = "export";
            a.o && (c.auth = a.o);
            var e = (a.g.gb ? "https://" : "http://") + a.g.host + b + "?" + Ha(c);
            a.f("Sending REST request for " + e);
            var f = new XMLHttpRequest;
            f.onreadystatechange = function() {
                if (d && 4 === f.readyState) {
                    a.f("REST Response for " + e + " received. status:", f.status, "response:", f.responseText);
                    var b = null;
                    if (200 <= f.status && 300 > f.status) {
                        try { b = Ja(f.responseText) } catch (c) { Bb("Failed to parse JSON response for " + e + ": " + f.responseText) }
                        d(null, b) } else 401 !== f.status && 404 !== f.status &&
                        Bb("Got unsuccessful REST response for " + e + " Status: " + f.status), d(f.status);
                    d = null
                }
            };
            f.open("GET", e, !0);
            f.send()
        };

        function kf() { this.f = [] }

        function lf(a, b) {
            for (var c = null, d = 0; d < b.length; d++) {
                var e = b[d],
                    f = e.$a();
                null === c || f.$(c.$a()) || (a.f.push(c), c = null);
                null === c && (c = new mf(f));
                c.add(e) }
            c && a.f.push(c) }

        function nf(a, b, c) { lf(a, c);
            of(a, function(a) {
                return a.$(b) }) }

        function pf(a, b, c) { lf(a, c);
            of(a, function(a) {
                return a.contains(b) || b.contains(a) }) }

        function of(a, b) {
            for (var c = !0, d = 0; d < a.f.length; d++) {
                var e = a.f[d];
                if (e)
                    if (e = e.$a(), b(e)) {
                        for (var e = a.f[d], f = 0; f < e.kc.length; f++) {
                            var g = e.kc[f];
                            if (null !== g) { e.kc[f] = null;
                                var k = g.Ua();
                                vb && sb("event: " + g.toString());
                                Kb(k) } }
                        a.f[d] = null } else c = !1 }
            c && (a.f = []) }

        function mf(a) { this.pa = a;
            this.kc = [] }
        mf.prototype.add = function(a) { this.kc.push(a) };
        mf.prototype.$a = function() {
            return this.pa };

        function qf(a, b) { this.type = rf;
            this.source = sf;
            this.path = a;
            this.$c = b }
        qf.prototype.Xb = function() {
            return this.path.j() ? this : new qf(L(this.path), this.$c) };
        qf.prototype.toString = function() {
            return "Operation(" + this.path + ": " + this.source.toString() + " ack write revert=" + this.$c + ")" };

        function tf(a, b, c) { this.type = uf;
            this.source = a;
            this.path = b;
            this.children = c }
        tf.prototype.Xb = function(a) {
            if (this.path.j()) return a = this.children.subtree(new J(a)), a.j() ? null : a.value ? new vf(this.source, M, a.value) : new tf(this.source, M, a);
            z(K(this.path) === a, "Can't get a merge for a child not on the path of the operation");
            return new tf(this.source, L(this.path), this.children) };
        tf.prototype.toString = function() {
            return "Operation(" + this.path + ": " + this.source.toString() + " merge: " + this.children.toString() + ")" };

        function wf(a, b) { this.type = xf;
            this.source = a;
            this.path = b }
        wf.prototype.Xb = function() {
            return this.path.j() ? new wf(this.source, M) : new wf(this.source, L(this.path)) };
        wf.prototype.toString = function() {
            return "Operation(" + this.path + ": " + this.source.toString() + " listen_complete)" };

        function vf(a, b, c) { this.type = yf;
            this.source = a;
            this.path = b;
            this.Da = c }
        vf.prototype.Xb = function(a) {
            return this.path.j() ? new vf(this.source, M, this.Da.P(a)) : new vf(this.source, L(this.path), this.Da) };
        vf.prototype.toString = function() {
            return "Operation(" + this.path + ": " + this.source.toString() + " overwrite: " + this.Da.toString() + ")" };
        var yf = 0,
            uf = 1,
            rf = 2,
            xf = 3;

        function zf() {}
        zf.prototype.source;
        zf.prototype.type;
        zf.prototype.path;

        function Af(a, b, c, d) { this.Pc = a;
            this.td = b;
            this.fb = c;
            this.ed = d;
            z(!d || b, "Tagged queries must be from server.") }
        var sf = new Af(!0, !1, null, !1),
            Bf = new Af(!1, !0, null, !1);
        Af.prototype.toString = function() {
            return this.Pc ? "user" : this.ed ? "server(queryID=" + this.fb + ")" : "server" };

        function T(a, b, c, d) { this.type = a;
            this.Ea = b;
            this.Na = c;
            this.Wc = d;
            this.uc = void 0 }

        function Cf(a) {
            return new T(Df, a) }
        var Df = "value";

        function Ef() {}
        Ef.prototype.$a;
        Ef.prototype.mc;
        Ef.prototype.Ua;
        Ef.prototype.toString;

        function Ff(a, b, c, d) { this.Mc = b;
            this.yc = c;
            this.uc = d;
            this.jc = a }
        Ff.prototype.$a = function() {
            var a = this.yc.Cb();
            return "value" === this.jc ? a.path : a.parent().path };
        Ff.prototype.mc = function() {
            return this.jc };
        Ff.prototype.Ua = function() {
            return this.Mc.Ua(this) };
        Ff.prototype.toString = function() {
            return this.$a().toString() + ":" + this.jc + ":" + u(this.yc.rd()) };

        function Gf(a, b, c) { this.Mc = a;
            this.error = b;
            this.path = c }
        Gf.prototype.$a = function() {
            return this.path };
        Gf.prototype.mc = function() {
            return "cancel" };
        Gf.prototype.Ua = function() {
            return this.Mc.Ua(this) };
        Gf.prototype.toString = function() {
            return this.path.toString() + ":cancel" };

        function Hf() {}
        Hf.prototype.Zc;
        Hf.prototype.createEvent;
        Hf.prototype.Ua;
        Hf.prototype.Lc;
        Hf.prototype.matches;
        Hf.prototype.Sc;

        function If(a, b, c) { this.ob = a;
            this.Ya = b;
            this.Za = c || null }
        h = If.prototype;
        h.Zc = function(a) {
            return "value" === a };
        h.createEvent = function(a, b) {
            var c = b.G.U();
            return new Ff("value", this, new U(a.Ea, b.Cb(), c)) };
        h.Ua = function(a) {
            var b = this.Za;
            if ("cancel" === a.mc()) { z(this.Ya, "Raising a cancel event on a listener with no cancel callback");
                var c = this.Ya;
                return function() { c.call(b, a.error) } }
            var d = this.ob;
            return function() { d.call(b, a.yc) } };
        h.Lc = function(a, b) {
            return this.Ya ? new Gf(this, a, b) : null };
        h.matches = function(a) {
            return a instanceof If ? a.ob && this.ob ? a.ob === this.ob && a.Za === this.Za : !0 : !1 };
        h.Sc = function() {
            return null !== this.ob };

        function Jf(a, b, c) { this.ja = a;
            this.Ya = b;
            this.Za = c }
        h = Jf.prototype;
        h.Zc = function(a) { a = "children_added" === a ? "child_added" : a;
            return Sa(this.ja, "children_removed" === a ? "child_removed" : a) };
        h.Lc = function(a, b) {
            return this.Ya ? new Gf(this, a, b) : null };
        h.createEvent = function(a, b) { z(null != a.Na, "Child events should have a childName.");
            var c = b.Cb().C(a.Na);
            return new Ff(a.type, this, new U(a.Ea, c, b.G.U()), a.uc) };
        h.Ua = function(a) {
            var b = this.Za;
            if ("cancel" === a.mc()) { z(this.Ya, "Raising a cancel event on a listener with no cancel callback");
                var c = this.Ya;
                return function() { c.call(b, a.error) } }
            var d = this.ja[a.jc];
            return function() { d.call(b, a.yc, a.uc) } };
        h.matches = function(a) {
            if (a instanceof Jf) {
                if (!this.ja || !a.ja) return !0;
                if (this.Za === a.Za) {
                    var b = Oa(a.ja);
                    if (b === Oa(this.ja)) {
                        if (1 === b) {
                            var b = Pa(a.ja),
                                c = Pa(this.ja);
                            return c === b && (!a.ja[b] || !this.ja[c] || a.ja[b] === this.ja[c]) }
                        return Na(this.ja, function(b, c) {
                            return a.ja[c] === b }) } } }
            return !1 };
        h.Sc = function() {
            return null !== this.ja };

        function Kf(a) { this.g = a;
            this.w = a.G.U() }

        function Lf(a, b, c, d) {
            var e = [],
                f = [];
            oa(b, function(b) { "child_changed" === b.type && a.w.pc(b.Wc, b.Ea) && f.push(new T("child_moved", b.Ea, b.Na)) });
            Mf(a, e, "child_removed", b, d, c);
            Mf(a, e, "child_added", b, d, c);
            Mf(a, e, "child_moved", f, d, c);
            Mf(a, e, "child_changed", b, d, c);
            Mf(a, e, Df, b, d, c);
            return e }

        function Mf(a, b, c, d, e, f) { d = pa(d, function(a) {
                return a.type === c });
            wa(d, r(a.f, a));
            oa(d, function(c) {
                var d = Nf(a, c, f);
                oa(e, function(e) { e.Zc(c.type) && b.push(e.createEvent(d, a.g)) }) }) }

        function Nf(a, b, c) { "value" !== b.type && "child_removed" !== b.type && (b.uc = c.Rc(b.Na, b.Ea, a.w));
            return b }
        Kf.prototype.f = function(a, b) {
            if (null == a.Na || null == b.Na) throw pb("Should only compare child_ events.");
            return this.w.compare(new P(a.Na, a.Ea), new P(b.Na, b.Ea)) };

        function Of() {}
        Of.prototype.ud = function() {
            return null };
        Of.prototype.Qc = function() {
            return null };
        var Pf = new Of;

        function Qf(a, b, c) { this.Ld = a;
            this.Fa = b;
            this.rc = c }
        Qf.prototype.ud = function(a) {
            var b = this.Fa.L;
            if (Rf(b, a)) return b.u().P(a);
            b = null != this.rc ? new Sf(this.rc, !0, !1) : this.Fa.I();
            return this.Ld.Ma(a, b) };
        Qf.prototype.Qc = function(a, b, c) {
            var d = null != this.rc ? this.rc : Tf(this.Fa);
            a = this.Ld.Ic(d, b, 1, c, a);
            return 0 === a.length ? null : a[0] };

        function Uf(a, b) { this.Dc = a;
            this.be = b }

        function Vf(a) { this.O = a }
        Vf.prototype.Pa = function(a, b, c, d) {
            var e = new Wf,
                f;
            if (b.type === yf) b.source.Pc ? c = Xf(this, a, b.path, b.Da, c, d, e) : (z(b.source.td, "Unknown source."), f = b.source.ed, c = Yf(this, a, b.path, b.Da, c, d, f, e));
            else if (b.type === uf) b.source.Pc ? c = Zf(this, a, b.path, b.children, c, d, e) : (z(b.source.td, "Unknown source."), f = b.source.ed, c = $f(this, a, b.path, b.children, c, d, f, e));
            else if (b.type === rf)
                if (b.$c)
                    if (f = b.path, null != c.Fb(f)) c = a;
                    else {
                        b = new Qf(c, a, d);
                        d = a.L.u();
                        if (f.j() || ".priority" === K(f)) ag(a.I()) ? b = c.ra(Tf(a)) : (b = a.I().u(),
                            z(b instanceof bg, "serverChildren would be complete if leaf node"), b = c.Nb(b)), b = this.O.qa(d, b, e);
                        else { f = K(f);
                            var g = c.Ma(f, a.I());
                            null == g && Rf(a.I(), f) && (g = d.P(f));
                            b = null != g ? this.O.M(d, f, g, b, e) : a.L.u().va(f) ? this.O.M(d, f, x, b, e) : d;
                            b.j() && ag(a.I()) && (d = c.ra(Tf(a)), d.R() && (b = this.O.qa(b, d, e))) }
                        d = ag(a.I()) || null != c.Fb(M);
                        c = cg(a, b, d, this.O.Aa())
                    }
            else c = dg(this, a, b.path, c, d, e);
            else if (b.type === xf) d = b.path, b = a.I(), f = b.u(), g = b.ca || d.j(), c = eg(this, new fg(a.L, new Sf(f, g, b.rb)), d, c, Pf, e);
            else throw pb("Unknown operation type: " +
                b.type);
            e = Qa(e.f);
            d = c;
            b = d.L;
            b.ca && (f = b.u().R() || b.u().j(), g = gg(a), (0 < e.length || !a.L.ca || f && !b.u().$(g) || !b.u().J().$(g.J())) && e.push(Cf(gg(d))));
            return new Uf(c, e)
        };

        function eg(a, b, c, d, e, f) {
            var g = b.L;
            if (null != d.Fb(c)) return b;
            var k;
            if (c.j()) z(ag(b.I()), "If change path is empty, we must have complete server data"), b.I().rb ? (e = Tf(b), d = d.Nb(e instanceof bg ? e : x)) : d = d.ra(Tf(b)), f = a.O.qa(b.L.u(), d, f);
            else {
                var l = K(c);
                if (".priority" == l) z(1 == Tc(c), "Can't have a priority with additional path components"), f = g.u(), k = b.I().u(), d = d.bc(c, f, k), f = null != d ? a.O.ba(f, d) : g.u();
                else {
                    var m = L(c);
                    Rf(g, l) ? (k = b.I().u(), d = d.bc(c, g.u(), k), d = null != d ? g.u().P(l).M(m, d) : g.u().P(l)) : d = d.Ma(l,
                        b.I());
                    f = null != d ? a.O.M(g.u(), l, d, e, f) : g.u()
                }
            }
            return cg(b, f, g.ca || c.j(), a.O.Aa())
        }

        function Yf(a, b, c, d, e, f, g, k) {
            var l = b.I();
            g = g ? a.O : a.O.sb();
            if (c.j()) d = g.qa(l.u(), d, null);
            else if (g.Aa() && !l.rb) d = l.u().M(c, d), d = g.qa(l.u(), d, null);
            else {
                var m = K(c);
                if ((c.j() ? !l.ca || l.rb : !Rf(l, K(c))) && 1 < Tc(c)) return b;
                d = l.u().P(m).M(L(c), d);
                d = ".priority" == m ? g.ba(l.u(), d) : g.M(l.u(), m, d, Pf, null) }
            l = l.ca || c.j();
            b = new fg(b.L, new Sf(d, l, g.Aa()));
            return eg(a, b, c, e, new Qf(e, b, f), k) }

        function Xf(a, b, c, d, e, f, g) {
            var k = b.L;
            e = new Qf(e, b, f);
            if (c.j()) d = a.O.qa(b.L.u(), d, g), a = cg(b, d, !0, a.O.Aa());
            else if (f = K(c), ".priority" === f) d = a.O.ba(b.L.u(), d), a = cg(b, d, k.ca, k.rb);
            else { c = L(c);
                var l = k.u().P(f),
                    m;
                if (c.j()) m = d;
                else {
                    var w = e.ud(f);
                    null != w ? m = ".priority" === Uc(c) && w.ka(c.parent()).j() ? w : w.M(c, d) : m = x }
                l.$(m) ? a = b : (d = a.O.M(k.u(), f, m, e, g), a = cg(b, d, k.ca, a.O.Aa())) }
            return a }

        function Zf(a, b, c, d, e, f, g) {
            var k = b;
            hg(d, function(d, m) {
                var w = c.C(d);
                Rf(b.L, K(w)) && (k = Xf(a, k, w, m, e, f, g)) });
            hg(d, function(d, m) {
                var w = c.C(d);
                Rf(b.L, K(w)) || (k = Xf(a, k, w, m, e, f, g)) });
            return k }

        function ig(a, b) { hg(b, function(b, d) { a = a.M(b, d) });
            return a }

        function $f(a, b, c, d, e, f, g, k) {
            if (b.I().u().j() && !ag(b.I())) return b;
            var l = b;
            c = c.j() ? d : jg(kg, c, d);
            var m = b.I().u();
            c.children.la(function(c, d) {
                if (m.va(c)) {
                    var N = b.I().u().P(c),
                        N = ig(N, d);
                    l = Yf(a, l, new J(c), N, e, f, g, k) } });
            c.children.la(function(c, d) {
                var N = !ag(b.I()) && null == d.value;
                m.va(c) || N || (N = b.I().u().P(c), N = ig(N, d), l = Yf(a, l, new J(c), N, e, f, g, k)) });
            return l }

        function dg(a, b, c, d, e, f) {
            if (null != d.Fb(c)) return b;
            var g = new Qf(d, b, e),
                k = e = b.L.u();
            if (ag(b.I())) {
                if (c.j()) e = d.ra(Tf(b)), k = a.O.qa(b.L.u(), e, f);
                else if (".priority" === K(c)) {
                    var l = d.Ma(K(c), b.I());
                    null == l || e.j() || e.J().$(l) || (k = a.O.ba(e, l)) } else l = K(c), e = d.Ma(l, b.I()), null != e && (k = a.O.M(b.L.u(), l, e, g, f));
                e = !0 } else if (b.L.ca || c.j()) k = e, e = b.L.u(), e.R() || e.X(R, function(c) {
                var e = d.Ma(c, b.I());
                null != e && (k = a.O.M(k, c, e, g, f)) }), e = b.L.ca;
            else {
                l = K(c);
                if (1 == Tc(c) || Rf(b.L, l)) c = d.Ma(l, b.I()), null != c && (k = a.O.M(e, l,
                    c, g, f));
                e = !1
            }
            return cg(b, k, e, a.O.Aa())
        };

        function Sf(a, b, c) { this.f = a;
            this.ca = b;
            this.rb = c }

        function ag(a) {
            return a.ca }

        function Rf(a, b) {
            return a.ca && !a.rb || a.f.va(b) }
        Sf.prototype.u = function() {
            return this.f };
        ({}).Ye;

        function lg(a, b) { this.g = a;
            this.f = b ? b : mg }
        h = lg.prototype;
        h.Ia = function(a, b) {
            return new lg(this.g, this.f.Ia(a, b, this.g).Z(null, null, ng, null, null)) };
        h.remove = function(a) {
            return new lg(this.g, this.f.remove(a, this.g).Z(null, null, ng, null, null)) };
        h.get = function(a) {
            for (var b, c = this.f; !c.j();) { b = this.g(a, c.key);
                if (0 === b) return c.value;
                0 > b ? c = c.left : 0 < b && (c = c.right) }
            return null };

        function og(a, b) {
            for (var c, d = a.f, e = null; !d.j();) { c = a.g(b, d.key);
                if (0 === c) {
                    if (d.left.j()) return e ? e.key : null;
                    for (d = d.left; !d.right.j();) d = d.right;
                    return d.key }
                0 > c ? d = d.left : 0 < c && (e = d, d = d.right) }
            throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?"); }
        h.j = function() {
            return this.f.j() };
        h.count = function() {
            return this.f.count() };
        h.Vb = function() {
            return this.f.Vb() };
        h.Bb = function() {
            return this.f.Bb() };
        h.la = function(a) {
            return this.f.la(a) };
        h.ub = function(a) {
            return new pg(this.f, null, this.g, !1, a) };
        h.vb = function(a, b) {
            return new pg(this.f, a, this.g, !1, b) };
        h.wb = function(a, b) {
            return new pg(this.f, a, this.g, !0, b) };
        h.vd = function(a) {
            return new pg(this.f, null, this.g, !0, a) };

        function pg(a, b, c, d, e) { this.f = e || null;
            this.g = d;
            this.Ja = [];
            for (e = 1; !a.j();)
                if (e = b ? c(a.key, b) : 1, d && (e *= -1), 0 > e) a = this.g ? a.left : a.right;
                else if (0 === e) { this.Ja.push(a);
                break } else this.Ja.push(a), a = this.g ? a.right : a.left }

        function qg(a) {
            if (0 === a.Ja.length) return null;
            var b = a.Ja.pop(),
                c;
            a.f ? c = a.f(b.key, b.value) : c = { key: b.key, value: b.value };
            if (a.g)
                for (b = b.left; !b.j();) a.Ja.push(b), b = b.right;
            else
                for (b = b.right; !b.j();) a.Ja.push(b), b = b.left;
            return c }

        function rg(a) {
            if (0 === a.Ja.length) return null;
            var b;
            b = a.Ja;
            b = b[b.length - 1];
            return a.f ? a.f(b.key, b.value) : { key: b.key, value: b.value } }

        function sg(a, b, c, d, e) { this.key = a;
            this.value = b;
            this.color = null != c ? c : tg;
            this.left = null != d ? d : mg;
            this.right = null != e ? e : mg }
        var tg = !0,
            ng = !1;
        h = sg.prototype;
        h.Z = function(a, b, c, d, e) {
            return new sg(null != a ? a : this.key, null != b ? b : this.value, null != c ? c : this.color, null != d ? d : this.left, null != e ? e : this.right) };
        h.count = function() {
            return this.left.count() + 1 + this.right.count() };
        h.j = function() {
            return !1 };
        h.la = function(a) {
            return this.left.la(a) || a(this.key, this.value) || this.right.la(a) };

        function ug(a) {
            return a.left.j() ? a : ug(a.left) }
        h.Vb = function() {
            return ug(this).key };
        h.Bb = function() {
            return this.right.j() ? this.key : this.right.Bb() };
        h.Ia = function(a, b, c) {
            var d, e;
            e = this;
            d = c(a, e.key);
            e = 0 > d ? e.Z(null, null, null, e.left.Ia(a, b, c), null) : 0 === d ? e.Z(null, b, null, null, null) : e.Z(null, null, null, null, e.right.Ia(a, b, c));
            return vg(e) };

        function wg(a) {
            if (a.left.j()) return mg;
            a.left.ha() || a.left.left.ha() || (a = xg(a));
            a = a.Z(null, null, null, wg(a.left), null);
            return vg(a) }
        h.remove = function(a, b) {
            var c, d;
            c = this;
            if (0 > b(a, c.key)) c.left.j() || c.left.ha() || c.left.left.ha() || (c = xg(c)), c = c.Z(null, null, null, c.left.remove(a, b), null);
            else { c.left.ha() && (c = yg(c));
                c.right.j() || c.right.ha() || c.right.left.ha() || (c = zg(c), c.left.left.ha() && (c = yg(c), c = zg(c)));
                if (0 === b(a, c.key)) {
                    if (c.right.j()) return mg;
                    d = ug(c.right);
                    c = c.Z(d.key, d.value, null, null, wg(c.right)) }
                c = c.Z(null, null, null, null, c.right.remove(a, b)) }
            return vg(c) };
        h.ha = function() {
            return this.color };

        function vg(a) { a.right.ha() && !a.left.ha() && (a = Ag(a));
            a.left.ha() && a.left.left.ha() && (a = yg(a));
            a.left.ha() && a.right.ha() && (a = zg(a));
            return a }

        function xg(a) { a = zg(a);
            a.right.left.ha() && (a = a.Z(null, null, null, null, yg(a.right)), a = Ag(a), a = zg(a));
            return a }

        function Ag(a) {
            return a.right.Z(null, null, a.color, a.Z(null, null, tg, null, a.right.left), null) }

        function yg(a) {
            return a.left.Z(null, null, a.color, null, a.Z(null, null, tg, a.left.right, null)) }

        function zg(a) {
            return a.Z(null, null, !a.color, a.left.Z(null, null, !a.left.color, null, null), a.right.Z(null, null, !a.right.color, null, null)) }

        function Bg() {}
        h = Bg.prototype;
        h.Z = function() {
            return this };
        h.Ia = function(a, b) {
            return new sg(a, b, null) };
        h.remove = function() {
            return this };
        h.count = function() {
            return 0 };
        h.j = function() {
            return !0 };
        h.la = function() {
            return !1 };
        h.Vb = function() {
            return null };
        h.Bb = function() {
            return null };
        h.ha = function() {
            return !1 };
        var mg = new Bg;

        function Cg(a, b) { this.f = a;
            this.yb = b }
        Cg.prototype.get = function(a) {
            var b = t(this.f, a);
            if (!b) throw Error("No index defined for " + a);
            return b === Ee ? null : b };

        function Dg(a, b, c) {
            var d = Ma(a.f, function(d, f) {
                var g = t(a.yb, f);
                z(g, "Missing index implementation for " + f);
                if (d === Ee) {
                    if (g.Sb(b.node)) {
                        for (var k = [], l = c.ub(Qe), m = qg(l); m;) m.name != b.name && k.push(m), m = qg(l);
                        k.push(b);
                        return Eg(k, Fe(g)) }
                    return Ee }
                g = c.get(b.name);
                k = d;
                g && (k = k.remove(new P(b.name, g)));
                return k.Ia(b, b.node) });
            return new Cg(d, a.yb) }

        function Fg(a, b, c) {
            var d = Ma(a.f, function(a) {
                if (a === Ee) return a;
                var d = c.get(b.name);
                return d ? a.remove(new P(b.name, d)) : a });
            return new Cg(d, a.yb) }
        var Gg = new Cg({ ".priority": Ee }, { ".priority": R });

        function Ke(a, b) { this.K = a;
            z(p(this.K) && null !== this.K, "LeafNode shouldn't be created with null/undefined value.");
            this.fa = b || x;
            Hg(this.fa);
            this.f = null }
        h = Ke.prototype;
        h.R = function() {
            return !0 };
        h.J = function() {
            return this.fa };
        h.ba = function(a) {
            return new Ke(this.K, a) };
        h.P = function(a) {
            return ".priority" === a ? this.fa : x };
        h.ka = function(a) {
            return a.j() ? this : ".priority" === K(a) ? this.fa : x };
        h.va = function() {
            return !1 };
        h.Rc = function() {
            return null };
        h.T = function(a, b) {
            return ".priority" === a ? this.ba(b) : b.j() && ".priority" !== a ? this : x.T(a, b).ba(this.fa) };
        h.M = function(a, b) {
            var c = K(a);
            if (null === c) return b;
            if (b.j() && ".priority" !== c) return this;
            z(".priority" !== c || 1 === Tc(a), ".priority must be the last token in a path");
            return this.T(c, x.M(L(a), b)) };
        h.j = function() {
            return !1 };
        h.Va = function() {
            return 0 };
        h.N = function(a) {
            return a && !this.J().j() ? { ".value": this.ua(), ".priority": this.J().N() } : this.ua() };
        h.hash = function() {
            if (null === this.f) {
                var a = "";
                this.fa.j() || (a += "priority:" + Ig(this.fa.N()) + ":");
                var b = typeof this.K,
                    a = a + (b + ":"),
                    a = "number" === b ? a + Ib(this.K) : a + this.K;
                this.f = tb(a) }
            return this.f };
        h.ua = function() {
            return this.K };
        h.pb = function(a) {
            if (a === x) return 1;
            if (a instanceof bg) return -1;
            z(a.R(), "Unknown node type");
            var b = typeof a.K,
                c = typeof this.K,
                d = na(Jg, b),
                e = na(Jg, c);
            z(0 <= d, "Unknown leaf type: " + b);
            z(0 <= e, "Unknown leaf type: " + c);
            return d === e ? "object" === c ? 0 : this.K < a.K ? -1 : this.K === a.K ? 0 : 1 : e - d };
        var Jg = ["object", "boolean", "number", "string"];
        Ke.prototype.Oa = function() {
            return this };
        Ke.prototype.Ab = function() {
            return !0 };
        Ke.prototype.$ = function(a) {
            return a === this ? !0 : a.R() ? this.K === a.K && this.fa.$(a.fa) : !1 };
        Ke.prototype.toString = function() {
            return u(this.N(!0)) };

        function bg(a, b, c) { this.D = a;
            (this.fa = b) && Hg(this.fa);
            a.j() && z(!this.fa || this.fa.j(), "An empty node cannot have a priority");
            this.f = c;
            this.g = null }
        h = bg.prototype;
        h.R = function() {
            return !1 };
        h.J = function() {
            return this.fa || x };
        h.ba = function(a) {
            return this.D.j() ? this : new bg(this.D, a, this.f) };
        h.P = function(a) {
            if (".priority" === a) return this.J();
            a = this.D.get(a);
            return null === a ? x : a };
        h.ka = function(a) {
            var b = K(a);
            return null === b ? this : this.P(b).ka(L(a)) };
        h.va = function(a) {
            return null !== this.D.get(a) };
        h.T = function(a, b) { z(b, "We should always be passing snapshot nodes");
            if (".priority" === a) return this.ba(b);
            var c = new P(a, b),
                d, e;
            b.j() ? (d = this.D.remove(a), c = Fg(this.f, c, this.D)) : (d = this.D.Ia(a, b), c = Dg(this.f, c, this.D));
            e = d.j() ? x : this.fa;
            return new bg(d, e, c) };
        h.M = function(a, b) {
            var c = K(a);
            if (null === c) return b;
            z(".priority" !== K(a) || 1 === Tc(a), ".priority must be the last token in a path");
            var d = this.P(c).M(L(a), b);
            return this.T(c, d) };
        h.j = function() {
            return this.D.j() };
        h.Va = function() {
            return this.D.count() };
        var Kg = /^(0|[1-9]\d*)$/;
        h = bg.prototype;
        h.N = function(a) {
            if (this.j()) return null;
            var b = {},
                c = 0,
                d = 0,
                e = !0;
            this.X(R, function(f, g) { b[f] = g.N(a);
                c++;
                e && Kg.test(f) ? d = Math.max(d, Number(f)) : e = !1 });
            if (!a && e && d < 2 * c) {
                var f = [],
                    g;
                for (g in b) f[g] = b[g];
                return f }
            a && !this.J().j() && (b[".priority"] = this.J().N());
            return b };
        h.hash = function() {
            if (null === this.g) {
                var a = "";
                this.J().j() || (a += "priority:" + Ig(this.J().N()) + ":");
                this.X(R, function(b, c) {
                    var d = c.hash(); "" !== d && (a += ":" + b + ":" + d) });
                this.g = "" === a ? "" : tb(a) }
            return this.g };
        h.Rc = function(a, b, c) {
            return (c = Lg(this, c)) ? (a = og(c, new P(a, b))) ? a.name : null : og(this.D, a) };

        function Mg(a, b) {
            var c;
            c = (c = Lg(a, b)) ? (c = c.Vb()) && c.name : a.D.Vb();
            return c ? new P(c, a.D.get(c)) : null }

        function Ng(a, b) {
            var c;
            c = (c = Lg(a, b)) ? (c = c.Bb()) && c.name : a.D.Bb();
            return c ? new P(c, a.D.get(c)) : null }
        h.X = function(a, b) {
            var c = Lg(this, a);
            return c ? c.la(function(a) {
                return b(a.name, a.node) }) : this.D.la(b) };
        h.ub = function(a) {
            return this.vb(a.Wb(), a) };
        h.vb = function(a, b) {
            var c = Lg(this, b);
            if (c) return c.vb(a, function(a) {
                return a });
            for (var c = this.D.vb(a.name, Qe), d = rg(c); null != d && 0 > b.compare(d, a);) qg(c), d = rg(c);
            return c };
        h.vd = function(a) {
            return this.wb(a.Ub(), a) };
        h.wb = function(a, b) {
            var c = Lg(this, b);
            if (c) return c.wb(a, function(a) {
                return a });
            for (var c = this.D.wb(a.name, Qe), d = rg(c); null != d && 0 < b.compare(d, a);) qg(c), d = rg(c);
            return c };
        h.pb = function(a) {
            return this.j() ? a.j() ? 0 : -1 : a.R() || a.j() ? 1 : a === Ie ? -1 : 0 };
        h.Oa = function(a) {
            if (a === Me || Ta(this.f.yb, a.toString())) return this;
            var b = this.f,
                c = this.D;
            z(a !== Me, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
            for (var d = [], e = !1, c = c.ub(Qe), f = qg(c); f;) e = e || a.Sb(f.node), d.push(f), f = qg(c);
            var g;
            e ? g = Eg(d, Fe(a)) : g = Ee;
            d = a.toString();
            e = Xa(b.yb);
            e[d] = a;
            a = Xa(b.f);
            a[d] = g;
            return new bg(this.D, this.fa, new Cg(a, e)) };
        h.Ab = function(a) {
            return a === Me || Ta(this.f.yb, a.toString()) };
        h.$ = function(a) {
            if (a === this) return !0;
            if (a.R()) return !1;
            if (this.J().$(a.J()) && this.D.count() === a.D.count()) {
                var b = this.ub(R);
                a = a.ub(R);
                for (var c = qg(b), d = qg(a); c && d;) {
                    if (c.name !== d.name || !c.node.$(d.node)) return !1;
                    c = qg(b);
                    d = qg(a) }
                return null === c && null === d }
            return !1 };

        function Lg(a, b) {
            return b === Me ? null : a.f.get(b.toString()) }
        h.toString = function() {
            return u(this.N(!0)) };

        function Q(a, b) {
            if (null === a) return x;
            var c = null;
            "object" === typeof a && ".priority" in a ? c = a[".priority"] : "undefined" !== typeof b && (c = b);
            z(null === c || "string" === typeof c || "number" === typeof c || "object" === typeof c && ".sv" in c, "Invalid priority type found: " + typeof c);
            "object" === typeof a && ".value" in a && null !== a[".value"] && (a = a[".value"]);
            if ("object" !== typeof a || ".sv" in a) return new Ke(a, Q(c));
            if (a instanceof Array) {
                var d = x,
                    e = a;
                La(e, function(a, b) {
                    if (ya(e, b) && "." !== b.substring(0, 1)) {
                        var c = Q(a);
                        if (c.R() || !c.j()) d =
                            d.T(b, c)
                    }
                });
                return d.ba(Q(c))
            }
            var f = [],
                g = !1,
                k = a;
            za(k, function(a) {
                if ("string" !== typeof a || "." !== a.substring(0, 1)) {
                    var b = Q(k[a]);
                    b.j() || (g = g || !b.J().j(), f.push(new P(a, b))) } });
            if (0 == f.length) return x;
            var l = Eg(f, Be, function(a) {
                return a.name }, Ce);
            if (g) {
                var m = Eg(f, Fe(R));
                return new bg(l, Q(c), new Cg({ ".priority": m }, { ".priority": R })) }
            return new bg(l, Q(c), Gg)
        }
        var Og = Math.log(2);

        function Pg(a) { this.count = parseInt(Math.log(a + 1) / Og, 10);
            this.qd = this.count - 1;
            this.ae = a + 1 & parseInt(Array(this.count + 1).join("1"), 2) }

        function Qg(a) {
            var b = !(a.ae & 1 << a.qd);
            a.qd--;
            return b }

        function Eg(a, b, c, d) {
            function e(b, d) {
                var f = d - b;
                if (0 == f) return null;
                if (1 == f) {
                    var m = a[b],
                        w = c ? c(m) : m;
                    return new sg(w, m.node, ng, null, null) }
                var m = parseInt(f / 2, 10) + b,
                    f = e(b, m),
                    C = e(m + 1, d),
                    m = a[m],
                    w = c ? c(m) : m;
                return new sg(w, m.node, ng, f, C) }
            a.sort(b);
            var f = function(b) {
                function d(b, g) {
                    var k = w - b,
                        C = w;
                    w -= b;
                    var C = e(k + 1, C),
                        k = a[k],
                        N = c ? c(k) : k,
                        C = new sg(N, k.node, g, null, C);
                    f ? f.left = C : m = C;
                    f = C }
                for (var f = null, m = null, w = a.length, C = 0; C < b.count; ++C) {
                    var N = Qg(b),
                        Md = Math.pow(2, b.count - (C + 1));
                    N ? d(Md, ng) : (d(Md, ng), d(Md, tg)) }
                return m }(new Pg(a.length));
            return null !== f ? new lg(d || b, f) : new lg(d || b)
        }

        function Ig(a) {
            return "number" === typeof a ? "number:" + Ib(a) : "string:" + a }

        function Hg(a) {
            if (a.R()) {
                var b = a.N();
                z("string" === typeof b || "number" === typeof b || "object" === typeof b && ya(b, ".sv"), "Priority must be a string or number.") } else z(a === Ie || a.j(), "priority of unexpected type.");
            z(a === Ie || a.J().j(), "Priority nodes can't have a priority of their own.") }
        var x = new bg(new lg(Ce), null, Gg);

        function Rg() { bg.call(this, new lg(Ce), x, Gg) }
        ka(Rg, bg);
        h = Rg.prototype;
        h.pb = function(a) {
            return a === this ? 0 : 1 };
        h.$ = function(a) {
            return a === this };
        h.J = function() {
            return this };
        h.P = function() {
            return x };
        h.j = function() {
            return !1 };
        var Ie = new Rg,
            Ge = new P("[MIN_NAME]", x),
            Oe = new P("[MAX_NAME]", Ie);

        function fg(a, b) { this.L = a;
            this.f = b }

        function cg(a, b, c, d) {
            return new fg(new Sf(b, c, d), a.f) }

        function gg(a) {
            return a.L.ca ? a.L.u() : null }
        fg.prototype.I = function() {
            return this.f };

        function Tf(a) {
            return a.f.ca ? a.f.u() : null };

        function Sg(a, b) { this.xa = a;
            var c = a.G,
                d = new Tg(c.U()),
                c = gf(c) ? new Tg(c.U()) : c.ma ? new Ug(c) : new Vg(c);
            this.g = new Vf(c);
            var e = b.I(),
                f = b.L,
                g = d.qa(x, e.u(), null),
                k = c.qa(x, f.u(), null);
            this.Fa = new fg(new Sf(k, f.ca, c.Aa()), new Sf(g, e.ca, d.Aa()));
            this.f = [];
            this.m = new Kf(a) }

        function Wg(a) {
            return a.xa }
        h = Sg.prototype;
        h.I = function() {
            return this.Fa.I().u() };
        h.Ta = function(a) {
            var b = Tf(this.Fa);
            return b && (gf(this.xa.G) || !a.j() && !b.P(K(a)).j()) ? b.ka(a) : null };
        h.j = function() {
            return 0 === this.f.length };
        h.nb = function(a) { this.f.push(a) };
        h.Xa = function(a, b) {
            var c = [];
            if (b) { z(null == a, "A cancel should cancel all event registrations.");
                var d = this.xa.path;
                oa(this.f, function(a) {
                    (a = a.Lc(b, d)) && c.push(a) }) }
            if (a) {
                for (var e = [], f = 0; f < this.f.length; ++f) {
                    var g = this.f[f];
                    if (!g.matches(a)) e.push(g);
                    else if (a.Sc()) { e = e.concat(this.f.slice(f + 1));
                        break } }
                this.f = e } else this.f = [];
            return c };
        h.Pa = function(a, b, c) { a.type === uf && null !== a.source.fb && (z(Tf(this.Fa), "We should always have a full cache before handling merges"), z(gg(this.Fa), "Missing event cache, even though we have a server cache"));
            var d = this.Fa;
            a = this.g.Pa(d, a, b, c);
            b = this.g;
            c = a.Dc;
            z(c.L.u().Ab(b.O.U()), "Event snap not indexed");
            z(c.I().u().Ab(b.O.U()), "Server snap not indexed");
            z(ag(a.Dc.I()) || !ag(d.I()), "Once a server snap is complete, it should never go back");
            this.Fa = a.Dc;
            return Xg(this, a.be, a.Dc.L.u(), null) };

        function Yg(a, b) {
            var c = a.Fa.L,
                d = [];
            c.u().R() || c.u().X(R, function(a, b) { d.push(new T("child_added", b, a)) });
            c.ca && d.push(Cf(c.u()));
            return Xg(a, d, c.u(), b) }

        function Xg(a, b, c, d) {
            return Lf(a.m, b, c, d ? [d] : a.f) };

        function Zg(a, b) { this.value = a;
            this.children = b || $g }
        var $g = new lg(function(a, b) {
            return a === b ? 0 : a < b ? -1 : 1 });

        function ah(a) {
            var b = kg;
            La(a, function(a, d) { b = b.set(new J(d), a) });
            return b }
        h = Zg.prototype;
        h.j = function() {
            return null === this.value && this.children.j() };

        function bh(a, b, c) {
            if (null != a.value && c(a.value)) return { path: M, value: a.value };
            if (b.j()) return null;
            var d = K(b);
            a = a.children.get(d);
            return null !== a ? (b = bh(a, L(b), c), null != b ? { path: (new J(d)).C(b.path), value: b.value } : null) : null }

        function ch(a, b) {
            return bh(a, b, function() {
                return !0 }) }
        h.subtree = function(a) {
            if (a.j()) return this;
            var b = this.children.get(K(a));
            return null !== b ? b.subtree(L(a)) : kg };
        h.set = function(a, b) {
            if (a.j()) return new Zg(b, this.children);
            var c = K(a),
                d = (this.children.get(c) || kg).set(L(a), b),
                c = this.children.Ia(c, d);
            return new Zg(this.value, c) };
        h.remove = function(a) {
            if (a.j()) return this.children.j() ? kg : new Zg(null, this.children);
            var b = K(a),
                c = this.children.get(b);
            return c ? (a = c.remove(L(a)), b = a.j() ? this.children.remove(b) : this.children.Ia(b, a), null === this.value && b.j() ? kg : new Zg(this.value, b)) : this };
        h.get = function(a) {
            if (a.j()) return this.value;
            var b = this.children.get(K(a));
            return b ? b.get(L(a)) : null };

        function jg(a, b, c) {
            if (b.j()) return c;
            var d = K(b);
            b = jg(a.children.get(d) || kg, L(b), c);
            d = b.j() ? a.children.remove(d) : a.children.Ia(d, b);
            return new Zg(a.value, d) }

        function dh(a, b) {
            return eh(a, M, b) }

        function eh(a, b, c) {
            var d = {};
            a.children.la(function(a, f) { d[a] = eh(f, b.C(a), c) });
            return c(b, a.value, d) }

        function fh(a, b, c) {
            return gh(a, b, M, c) }

        function gh(a, b, c, d) {
            var e = a.value ? d(c, a.value) : !1;
            if (e) return e;
            if (b.j()) return null;
            e = K(b);
            return (a = a.children.get(e)) ? gh(a, L(b), c.C(e), d) : null }

        function hh(a, b, c) {
            if (!b.j()) {
                var d = !0;
                a.value && (d = c(M, a.value));!0 === d && (d = K(b), (a = a.children.get(d)) && ih(a, L(b), M.C(d), c)) } }

        function ih(a, b, c, d) {
            if (b.j()) return a;
            a.value && d(c, a.value);
            var e = K(b);
            return (a = a.children.get(e)) ? ih(a, L(b), c.C(e), d) : kg }

        function hg(a, b) { jh(a, M, b) }

        function jh(a, b, c) { a.children.la(function(a, e) { jh(e, b.C(a), c) });
            a.value && c(b, a.value) }

        function kh(a, b) { a.children.la(function(a, d) { d.value && b(a, d.value) }) }
        var kg = new Zg(null);
        Zg.prototype.toString = function() {
            var a = {};
            hg(this, function(b, c) { a[b.toString()] = c.toString() });
            return u(a) };

        function lh() { this.f = {} }
        h = lh.prototype;
        h.j = function() {
            return Wa(this.f) };
        h.Pa = function(a, b, c) {
            var d = a.source.fb;
            if (null !== d) return d = t(this.f, d), z(null != d, "SyncTree gave us an op for an invalid query."), d.Pa(a, b, c);
            var e = [];
            La(this.f, function(d) { e = e.concat(d.Pa(a, b, c)) });
            return e };
        h.nb = function(a, b, c, d, e) {
            var f = a.sa(),
                g = t(this.f, f);
            if (!g) {
                var g = c.ra(e ? d : null),
                    k = !1;
                g ? k = !0 : (d instanceof bg ? g = c.Nb(d) : g = x, k = !1);
                g = new Sg(a, new fg(new Sf(g, k, !1), new Sf(d, e, !1)));
                this.f[f] = g }
            g.nb(b);
            return Yg(g, b) };
        h.Xa = function(a, b, c) {
            var d = a.sa(),
                e = [],
                f = [],
                g = null != mh(this);
            if ("default" === d) {
                var k = this;
                La(this.f, function(a, d) { f = f.concat(a.Xa(b, c));
                    a.j() && (delete k.f[d], gf(a.xa.G) || e.push(a.xa)) }) } else {
                var l = t(this.f, d);
                l && (f = f.concat(l.Xa(b, c)), l.j() && (delete this.f[d], gf(l.xa.G) || e.push(l.xa))) }
            g && null == mh(this) && e.push(new V(a.B.za, a.B, a.path));
            return { Ae: e, fe: f } };

        function nh(a) {
            return pa(Qa(a.f), function(a) {
                return !gf(a.xa.G) }) }
        h.Ta = function(a) {
            var b = null;
            La(this.f, function(c) { b = b || c.Ta(a) });
            return b };

        function oh(a, b) {
            if (gf(b.G)) return mh(a);
            var c = b.sa();
            return t(a.f, c) }

        function mh(a) {
            return Va(a.f, function(a) {
                return gf(a.xa.G) }) || null };

        function ph(a) { this.Y = a }
        var qh = new ph(new Zg(null));

        function rh(a, b, c) {
            if (b.j()) return new ph(new Zg(c));
            var d = ch(a.Y, b);
            if (null != d) {
                var e = d.path,
                    d = d.value;
                b = Sc(e, b);
                d = d.M(b, c);
                return new ph(a.Y.set(e, d)) }
            a = jg(a.Y, b, new Zg(c));
            return new ph(a) }

        function sh(a, b, c) {
            var d = a;
            za(c, function(a, c) { d = rh(d, b.C(a), c) });
            return d }
        ph.prototype.wc = function(a) {
            if (a.j()) return qh;
            a = jg(this.Y, a, kg);
            return new ph(a) };

        function th(a, b) {
            var c = ch(a.Y, b);
            return null != c ? a.Y.get(c.path).ka(Sc(c.path, b)) : null }

        function uh(a) {
            var b = [],
                c = a.Y.value;
            null != c ? c.R() || c.X(R, function(a, c) { b.push(new P(a, c)) }) : a.Y.children.la(function(a, c) { null != c.value && b.push(new P(a, c.value)) });
            return b }

        function vh(a, b) {
            if (b.j()) return a;
            var c = th(a, b);
            return null != c ? new ph(new Zg(c)) : new ph(a.Y.subtree(b)) }
        ph.prototype.j = function() {
            return this.Y.j() };
        ph.prototype.apply = function(a) {
            return wh(M, this.Y, a) };

        function wh(a, b, c) {
            if (null != b.value) return c.M(a, b.value);
            var d = null;
            b.children.la(function(b, f) { ".priority" === b ? (z(null !== f.value, "Priority writes must always be leaf nodes"), d = f.value) : c = wh(a.C(b), f, c) });
            c.ka(a).j() || null === d || (c = c.M(a.C(".priority"), d));
            return c };
        v.cf;

        function xh() { this.f = qh;
            this.g = [];
            this.m = -1 }
        h = xh.prototype;
        h.wc = function(a) {
            var b = ua(this.g, function(b) {
                return b.Ec === a });
            z(0 <= b, "removeWrite called with nonexistent writeId.");
            var c = this.g[b];
            this.g.splice(b, 1);
            for (var d = c.visible, e = !1, f = this.g.length - 1; d && 0 <= f;) {
                var g = this.g[f];
                g.visible && (f >= b && yh(g, c.path) ? d = !1 : c.path.contains(g.path) && (e = !0));
                f-- }
            if (d) {
                if (e) this.f = zh(this.g, Ah, M), 0 < this.g.length ? this.m = this.g[this.g.length - 1].Ec : this.m = -1;
                else if (c.Da) this.f = this.f.wc(c.path);
                else {
                    var k = this;
                    La(c.children, function(a, b) { k.f = k.f.wc(c.path.C(b)) }) }
                return c.path }
            return null };
        h.ra = function(a, b, c, d) {
            if (c || d) {
                var e = vh(this.f, a);
                return !d && e.j() ? b : d || null != b || null != th(e, M) ? (e = zh(this.g, function(b) {
                    return (b.visible || d) && (!c || !(0 <= na(c, b.Ec))) && (b.path.contains(a) || a.contains(b.path)) }, a), b = b || x, e.apply(b)) : null }
            e = th(this.f, a);
            if (null != e) return e;
            e = vh(this.f, a);
            return e.j() ? b : null != b || null != th(e, M) ? (b = b || x, e.apply(b)) : null };
        h.Nb = function(a, b) {
            var c = x,
                d = th(this.f, a);
            if (d) d.R() || d.X(R, function(a, b) { c = c.T(a, b) });
            else if (b) {
                var e = vh(this.f, a);
                b.X(R, function(a, b) {
                    var d = vh(e, new J(a)).apply(b);
                    c = c.T(a, d) });
                oa(uh(e), function(a) { c = c.T(a.name, a.node) }) } else e = vh(this.f, a), oa(uh(e), function(a) { c = c.T(a.name, a.node) });
            return c };
        h.bc = function(a, b, c, d) { z(c || d, "Either existingEventSnap or existingServerSnap must exist");
            a = a.C(b);
            if (null != th(this.f, a)) return null;
            a = vh(this.f, a);
            return a.j() ? d.ka(b) : a.apply(d.ka(b)) };
        h.Ma = function(a, b, c) { a = a.C(b);
            var d = th(this.f, a);
            return null != d ? d : Rf(c, b) ? vh(this.f, a).apply(c.u().P(b)) : null };
        h.Fb = function(a) {
            return th(this.f, a) };
        h.Ic = function(a, b, c, d, e, f) {
            var g;
            a = vh(this.f, a);
            g = th(a, M);
            if (null == g)
                if (null != b) g = a.apply(b);
                else return [];
            g = g.Oa(f);
            if (g.j() || g.R()) return [];
            b = [];
            a = Fe(f);
            e = e ? g.wb(c, f) : g.vb(c, f);
            for (f = qg(e); f && b.length < d;) 0 !== a(f, c) && b.push(f), f = qg(e);
            return b };

        function yh(a, b) {
            return a.Da ? a.path.contains(b) : !!Ua(a.children, function(c, d) {
                return a.path.C(d).contains(b) }) }

        function Ah(a) {
            return a.visible }

        function zh(a, b, c) {
            for (var d = qh, e = 0; e < a.length; ++e) {
                var f = a[e];
                if (b(f)) {
                    var g = f.path;
                    if (f.Da) c.contains(g) ? (g = Sc(c, g), d = rh(d, g, f.Da)) : g.contains(c) && (g = Sc(g, c), d = rh(d, M, f.Da.ka(g)));
                    else if (f.children)
                        if (c.contains(g)) g = Sc(c, g), d = sh(d, g, f.children);
                        else {
                            if (g.contains(c))
                                if (g = Sc(g, c), g.j()) d = sh(d, M, f.children);
                                else if (f = t(f.children, K(g))) f = f.ka(L(g)), d = rh(d, M, f) }
                    else throw pb("WriteRecord should have .snap or .children"); } }
            return d }

        function Bh(a, b) { this.jb = a;
            this.Y = b }
        h = Bh.prototype;
        h.ra = function(a, b, c) {
            return this.Y.ra(this.jb, a, b, c) };
        h.Nb = function(a) {
            return this.Y.Nb(this.jb, a) };
        h.bc = function(a, b, c) {
            return this.Y.bc(this.jb, a, b, c) };
        h.Fb = function(a) {
            return this.Y.Fb(this.jb.C(a)) };
        h.Ic = function(a, b, c, d, e) {
            return this.Y.Ic(this.jb, a, b, c, d, e) };
        h.Ma = function(a, b) {
            return this.Y.Ma(this.jb, a, b) };
        h.C = function(a) {
            return new Bh(this.jb.C(a), this.Y) };
        v.Ze;

        function Ch(a) { this.f = kg;
            this.g = new xh;
            this.A = {};
            this.m = {};
            this.o = a }

        function Dh(a, b, c, d, e) {
            var f = a.g,
                g = e;
            z(d > f.m, "Stacking an older write on top of newer ones");
            p(g) || (g = !0);
            f.g.push({ path: b, Da: c, Ec: d, visible: g });
            g && (f.f = rh(f.f, b, c));
            f.m = d;
            return e ? Eh(a, new vf(sf, b, c)) : [] }

        function Fh(a, b, c, d) {
            var e = a.g;
            z(d > e.m, "Stacking an older merge on top of newer ones");
            e.g.push({ path: b, children: c, Ec: d, visible: !0 });
            e.f = sh(e.f, b, c);
            e.m = d;
            c = ah(c);
            return Eh(a, new tf(sf, b, c)) }

        function Gh(a, b, c) { c = c || !1;
            b = a.g.wc(b);
            return null == b ? [] : Eh(a, new qf(b, c)) }

        function Hh(a, b, c) { c = ah(c);
            return Eh(a, new tf(Bf, b, c)) }

        function Ih(a, b, c, d) { d = Jh(a, d);
            if (null != d) {
                var e = Kh(d);
                d = e.path;
                e = e.fb;
                b = Sc(d, b);
                c = new vf(new Af(!1, !0, e, !0), b, c);
                return Lh(a, d, c) }
            return [] }

        function Mh(a, b, c, d) {
            if (d = Jh(a, d)) {
                var e = Kh(d);
                d = e.path;
                e = e.fb;
                b = Sc(d, b);
                c = ah(c);
                c = new tf(new Af(!1, !0, e, !0), b, c);
                return Lh(a, d, c) }
            return [] }
        Ch.prototype.nb = function(a, b) {
            var c = a.path,
                d = null,
                e = !1;
            hh(this.f, c, function(a, b) {
                var f = Sc(a, c);
                d = b.Ta(f);
                e = e || null != mh(b);
                return !d });
            var f = this.f.get(c);
            f ? (e = e || null != mh(f), d = d || f.Ta(M)) : (f = new lh, this.f = this.f.set(c, f));
            var g;
            null != d ? g = !0 : (g = !1, d = x, kh(this.f.subtree(c), function(a, b) {
                var c = b.Ta(M);
                c && (d = d.T(a, c)) }));
            var k = null != oh(f, a);
            if (!k && !gf(a.G)) {
                var l = Nh(a);
                z(!Sa(this.m, l), "View does not exist, but we have a tag");
                var m = Oh++;
                this.m[l] = m;
                this.A["_" + m] = l }
            g = f.nb(a, b, new Bh(c, this.g), d, g);
            k || e ||
                (f = oh(f, a), g = g.concat(Ph(this, a, f)));
            return g
        };
        Ch.prototype.Xa = function(a, b, c) {
            var d = a.path,
                e = this.f.get(d),
                f = [];
            if (e && ("default" === a.sa() || null != oh(e, a))) {
                f = e.Xa(a, b, c);
                e.j() && (this.f = this.f.remove(d));
                e = f.Ae;
                f = f.fe;
                b = -1 !== ua(e, function(a) {
                    return gf(a.G) });
                var g = fh(this.f, d, function(a, b) {
                    return null != mh(b) });
                if (b && !g && (d = this.f.subtree(d), !d.j()))
                    for (var d = Qh(d), k = 0; k < d.length; ++k) {
                        var l = d[k],
                            m = l.xa,
                            l = Rh(this, l);
                        this.o.bd(m, Sh(this, m), l.oc, l.S) }
                if (!g && 0 < e.length && !c)
                    if (b) this.o.Ac(a, null);
                    else {
                        var w = this;
                        oa(e, function(a) {
                            a.sa();
                            var b = w.m[Nh(a)];
                            w.o.Ac(a, b)
                        })
                    }
                Th(this, e)
            }
            return f
        };
        Ch.prototype.ra = function(a, b) {
            var c = this.g,
                d = fh(this.f, a, function(b, c) {
                    var d = Sc(b, a);
                    if (d = c.Ta(d)) return d });
            return c.ra(a, d, b, !0) };

        function Qh(a) {
            return dh(a, function(a, c, d) {
                if (c && null != mh(c)) return [mh(c)];
                var e = [];
                c && (e = nh(c));
                La(d, function(a) { e = e.concat(a) });
                return e }) }

        function Th(a, b) {
            for (var c = 0; c < b.length; ++c) {
                var d = b[c];
                if (!gf(d.G)) {
                    var d = Nh(d),
                        e = a.m[d];
                    delete a.m[d];
                    delete a.A["_" + e] } } }

        function Ph(a, b, c) {
            var d = b.path,
                e = Sh(a, b);
            c = Rh(a, c);
            b = a.o.bd(b, e, c.oc, c.S);
            d = a.f.subtree(d);
            if (e) z(null == mh(d.value), "If we're adding a query, it shouldn't be shadowed");
            else
                for (e = dh(d, function(a, b, c) {
                        if (!a.j() && b && null != mh(b)) return [Wg(mh(b))];
                        var d = [];
                        b && (d = d.concat(qa(nh(b), function(a) {
                            return a.xa })));
                        La(c, function(a) { d = d.concat(a) });
                        return d }), d = 0; d < e.length; ++d) c = e[d], a.o.Ac(c, Sh(a, c));
            return b }

        function Rh(a, b) {
            var c = b.xa,
                d = Sh(a, c);
            return {
                oc: function() {
                    return (b.I() || x).hash() },
                S: function(b) {
                    if ("ok" === b) {
                        if (d) {
                            var f = c.path;
                            if (b = Jh(a, d)) {
                                var g = Kh(b);
                                b = g.path;
                                g = g.fb;
                                f = Sc(b, f);
                                f = new wf(new Af(!1, !0, g, !0), f);
                                b = Lh(a, b, f) } else b = [] } else b = Eh(a, new wf(Bf, c.path));
                        return b }
                    f = "Unknown Error";
                    "too_big" === b ? f = "The data requested exceeds the maximum size that can be accessed with a single request." : "permission_denied" == b ? f = "Client doesn't have permission to access the desired data." : "unavailable" == b &&
                        (f = "The service is unavailable");
                    f = Error(b + ": " + f);
                    f.code = b.toUpperCase();
                    return a.Xa(c, null, f)
                }
            }
        }

        function Nh(a) {
            return a.path.toString() + "$" + a.sa() }

        function Kh(a) {
            var b = a.indexOf("$");
            z(-1 !== b && b < a.length - 1, "Bad queryKey.");
            return { fb: a.substr(b + 1), path: new J(a.substr(0, b)) } }

        function Jh(a, b) {
            var c = a.A,
                d = "_" + b;
            return null !== c && d in c ? c[d] : void 0 }

        function Sh(a, b) {
            var c = Nh(b);
            return t(a.m, c) }
        var Oh = 1;

        function Lh(a, b, c) {
            var d = a.f.get(b);
            z(d, "Missing sync point for query tag that we're tracking");
            return d.Pa(c, new Bh(b, a.g), null) }

        function Eh(a, b) {
            return Uh(a, b, a.f, null, new Bh(M, a.g)) }

        function Uh(a, b, c, d, e) {
            if (b.path.j()) return Vh(a, b, c, d, e);
            var f = c.get(M);
            null == d && null != f && (d = f.Ta(M));
            var g = [],
                k = K(b.path),
                l = b.Xb(k);
            if ((c = c.children.get(k)) && l) var m = d ? d.P(k) : null,
                k = e.C(k),
                g = g.concat(Uh(a, l, c, m, k));
            f && (g = g.concat(f.Pa(b, e, d)));
            return g }

        function Vh(a, b, c, d, e) {
            var f = c.get(M);
            null == d && null != f && (d = f.Ta(M));
            var g = [];
            c.children.la(function(c, f) {
                var m = d ? d.P(c) : null,
                    w = e.C(c),
                    C = b.Xb(c);
                C && (g = g.concat(Vh(a, C, f, m, w))) });
            f && (g = g.concat(f.Pa(b, e, d)));
            return g };

        function U(a, b, c) { this.f = a;
            this.g = b;
            this.w = c }
        U.prototype.N = function() { F("Wilddog.DataSnapshot.val", 0, 0, arguments.length);
            return this.f.N() };
        U.prototype.val = U.prototype.N;
        U.prototype.rd = function() { F("Wilddog.DataSnapshot.exportVal", 0, 0, arguments.length);
            return this.f.N(!0) };
        U.prototype.exportVal = U.prototype.rd;
        U.prototype.m = function() { F("Wilddog.DataSnapshot.exists", 0, 0, arguments.length);
            return !this.f.j() };
        U.prototype.exists = U.prototype.m;
        U.prototype.C = function(a) { F("Wilddog.DataSnapshot.child", 0, 1, arguments.length);
            ea(a) && (a = String(a));
            jd("Wilddog.DataSnapshot.child", a);
            var b = new J(a),
                c = this.g.C(b);
            return new U(this.f.ka(b), c, R) };
        U.prototype.child = U.prototype.C;
        U.prototype.va = function(a) { F("Wilddog.DataSnapshot.hasChild", 1, 1, arguments.length);
            jd("Wilddog.DataSnapshot.hasChild", a);
            var b = new J(a);
            return !this.f.ka(b).j() };
        U.prototype.hasChild = U.prototype.va;
        U.prototype.J = function() { F("Wilddog.DataSnapshot.getPriority", 0, 0, arguments.length);
            return this.f.J().N() };
        U.prototype.getPriority = U.prototype.J;
        U.prototype.o = function(a) { F("Wilddog.DataSnapshot.forEach", 1, 1, arguments.length);
            H("Wilddog.DataSnapshot.forEach", 1, a, !1);
            if (this.f.R()) return !1;
            var b = this;
            return !!this.f.X(this.w, function(c, d) {
                return a(new U(d, b.g.C(c), R)) }) };
        U.prototype.forEach = U.prototype.o;
        U.prototype.nc = function() { F("Wilddog.DataSnapshot.hasChildren", 0, 0, arguments.length);
            return this.f.R() ? !1 : !this.f.j() };
        U.prototype.hasChildren = U.prototype.nc;
        U.prototype.name = function() { Bb("Wilddog.DataSnapshot.name() being deprecated. Please use Wilddog.DataSnapshot.key() instead.");
            F("Wilddog.DataSnapshot.name", 0, 0, arguments.length);
            return this.key() };
        U.prototype.name = U.prototype.name;
        U.prototype.key = function() { F("Wilddog.DataSnapshot.key", 0, 0, arguments.length);
            return this.g.key() };
        U.prototype.key = U.prototype.key;
        U.prototype.Va = function() { F("Wilddog.DataSnapshot.numChildren", 0, 0, arguments.length);
            return this.f.Va() };
        U.prototype.numChildren = U.prototype.Va;
        U.prototype.Cb = function() { F("Wilddog.DataSnapshot.ref", 0, 0, arguments.length);
            return this.g };
        U.prototype.ref = U.prototype.Cb;

        function Wh(a, b, c) {
            this.H = b;
            this.za = a;
            this.Ha = $e(b);
            this.g = new kf;
            this.Ga = 1;
            this.Ka = null;
            this.m;
            c || 0 <= ("object" === typeof window && window.navigator && window.navigator.userAgent || "").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i) ? (this.m = new ef(this.H, r(this.Kd, this)), setTimeout(r(this.Jd, this, !0), 0)) : this.m = this.Ka = new ge(this.H, r(this.Kd, this), r(this.Jd, this), r(this.Xe, this));
            this.mb = af(b, r(function() {
                return new We(this.Ha, this.m) }, this));
            this.o = new ve;
            this.La = new Ka;
            var d = this;
            this.ya = new Ch({ bd: function(a, b, c, k) { b = [];
                    c = d.La.u(a.path);
                    c.j() || (b = Eh(d.ya, new vf(Bf, a.path, c)), setTimeout(function() { k("ok") }, 0));
                    return b }, Ac: aa });
            this.za.bind(Ob.Qa, function(a) { a && a.signIn ? d.m.W(a.idToken, function() { Xh(d, "authenticated", !0) }, function(a, b) { Yh(d, a, b) }) : d.m.Bc(function(a, b) { Yh(d, a, b) }) });
            Xh(this, "connected", !1);
            this.A = new Te;
            this.hc = 0;
            this.fd = null;
            this.f = new Ch({
                bd: function(a, b, c, k) { d.m.yd(a, c, b, function(b, c) {
                        var f = k(b, c);
                        pf(d.g, a.path, f) });
                    return [] },
                Ac: function(a,
                    b) { d.m.Id(a, b) }
            })
        }

        function Yh(a, b, c) { Xh(a, "authenticated", !1); "expired_token" == b && a.za.emit(Ob.nd, { status: b, reason: c }) }
        h = Wh.prototype;
        h.toString = function() {
            return (this.H.gb ? "https://" : "http://") + this.H.host };
        h.name = function() {
            return this.H.Ad };

        function Zh(a) { a = a.La.u(new J(".info/serverTimeOffset")).N() || 0;
            return (new Date).getTime() + a }

        function $h(a) { a = a = { timestamp: Zh(a) };
            a.timestamp = a.timestamp || (new Date).getTime();
            return a }
        h.Kd = function(a, b, c, d) { this.hc++;
            var e = new J(a);
            b = this.fd ? this.fd(a, b) : b;
            a = [];
            d ? c ? (b = Ma(b, function(a) {
                return Q(a) }), a = Mh(this.f, e, b, d)) : (b = Q(b), a = Ih(this.f, e, b, d)) : c ? (d = Ma(b, function(a) {
                return Q(a) }), a = Hh(this.f, e, d)) : (d = Q(b), a = Eh(this.f, new vf(Bf, e, d)));
            d = e;
            0 < a.length && (d = ai(this, e));
            pf(this.g, d, a) };
        h.Jd = function(a) { Xh(this, "connected", a);!1 === a && bi(this) };
        h.Xe = function(a) {
            var b = this;
            Hb(a, function(a, d) { Xh(b, d, a) }) };

        function Xh(a, b, c) { b = new J("/.info/" + b);
            c = Q(c);
            var d = a.La;
            d.xc = d.xc.M(b, c);
            c = Eh(a.ya, new vf(Bf, b, c));
            pf(a.g, b, c) }
        h.hb = function(a, b, c, d) { this.$b("set", { path: a.toString(), value: b, hf: c });
            var e = $h(this);
            b = Q(b, c);
            var e = df(b, e),
                f = this.Ga++,
                e = Dh(this.f, a, e, f, !0);
            lf(this.g, e);
            var g = this;
            this.m.Gb(a.toString(), b.N(!0), function(b, c) {
                var e = "ok" === b;
                e || Bb("set at " + a + " failed: " + b);
                e = Gh(g.f, f, !e);
                pf(g.g, a, e);
                ci(d, b, c) });
            e = di(this, a);
            ai(this, e);
            pf(this.g, e, []) };
        h.update = function(a, b, c) { this.$b("update", { path: a.toString(), value: b });
            var d = !0,
                e = $h(this),
                f = {};
            La(b, function(a, b) { d = !1;
                var c = Q(a);
                f[b] = df(c, e) });
            if (d) sb("update() called with empty data.  Don't do anything."), ci(c, "ok");
            else {
                var g = this.Ga++,
                    k = Fh(this.f, a, f, g);
                lf(this.g, k);
                var l = this;
                this.m.zd(a.toString(), b, function(b, d) {
                    var e = "ok" === b;
                    e || Bb("update at " + a + " failed: " + b);
                    var e = Gh(l.f, g, !e),
                        f = a;
                    0 < e.length && (f = ai(l, a));
                    pf(l.g, f, e);
                    ci(c, b, d) });
                b = di(this, a);
                ai(this, b);
                pf(this.g, a, []) } };

        function bi(a) { a.$b("onDisconnectEvents");
            var b = $h(a),
                c = [];
            Ve(cf(a.A, b), M, function(b, e) { c = c.concat(Eh(a.f, new vf(Bf, b, e)));
                var f = di(a, b);
                ai(a, f) });
            a.A = new Te;
            pf(a.g, M, c) }
        h.qc = function(a, b) {
            var c = this;
            this.m.qc(a.toString(), function(d, e) { "ok" === d && Ue(c.A, a);
                ci(b, d, e) }) };

        function ei(a, b, c, d) {
            var e = Q(c);
            a.m.Xc(b.toString(), e.N(!0), function(c, g) { "ok" === c && a.A.Db(b, e);
                ci(d, c, g) }) }

        function fi(a, b, c, d, e) {
            var f = Q(c, d);
            a.m.Xc(b.toString(), f.N(!0), function(c, d) { "ok" === c && a.A.Db(b, f);
                ci(e, c, d) }) }

        function gi(a, b, c, d) {
            var e = !0,
                f;
            for (f in c) e = !1;
            e ? (sb("onDisconnect().update() called with empty data.  Don't do anything."), ci(d, "ok")) : a.m.Bd(b.toString(), c, function(e, f) {
                if ("ok" === e)
                    for (var l in c)
                        if (c.hasOwnProperty(l)) {
                            var m = Q(c[l]);
                            a.A.Db(b.C(l), m) }
                ci(d, e, f) }) }

        function hi(a, b, c) { c = ".info" === K(b.path) ? a.ya.nb(b, c) : a.f.nb(b, c);
            nf(a.g, b.path, c) }
        h.cb = function() { this.Ka && this.Ka.cb() };
        h.Eb = function() { this.Ka && this.Ka.Eb() };
        h.cd = function(a) {
            if ("undefined" !== typeof console) { a ? (this.V || (this.V = new Xe(this.Ha)), a = this.V.get()) : a = this.Ha.get();
                var b = ra(Ra(a), function(a, b) {
                        return Math.max(b.length, a) }, 0),
                    c;
                for (c in a)
                    if (a.hasOwnProperty(c)) {
                        for (var d = a[c], e = c.length; e < b + 2; e++) c += " ";
                        console.log(c + d) } } };
        h.dd = function(a) {
            var b = this.Ha,
                c;
            p(c) || (c = 1);
            ya(b.f, a) || (b.f[a] = 0);
            b.f[a] += c;
            this.mb.Hd[a] = !0 };
        h.$b = function(a) {
            var b = "";
            this.Ka && (b = this.Ka.id + ":");
            sb(b, arguments) };

        function ci(a, b, c) { a && Kb(function() {
                if ("ok" == b) a(null);
                else {
                    var d = (b || "error").toUpperCase(),
                        e = d;
                    c && (e += ": " + c);
                    e = Error(e);
                    e.code = d;
                    a(e) } }) };

        function ii(a, b, c, d, e) { this.host = a.toLowerCase();
            this.domain = this.host.substr(this.host.indexOf(".") + 1);
            this.gb = b;
            this.Ad = c;
            this.sc = e || "";
            this.Ca = cb.get("host:" + a) || this.host;
            this.Sa = JSON.parse(y.get("failHosts")) || [] }
        ii.prototype.xd = function() {
            return "wilddogio.com" !== this.domain && "wilddogio-demo.com" !== this.domain };

        function de(a, b) { null == b ? (a.Ca = a.host, "s-" === a.Ca.substr(0, 2) && cb.remove("host:" + a.host)) : b !== a.Ca && 0 < b.indexOf(".wilddogio.com") && (a.Ca = b, "s-" === a.Ca.substr(0, 2) && cb.set("host:" + a.host, a.Ca)) }
        ii.prototype.toString = function() {
            var a = (this.gb ? "https://" : "http://") + this.host;
            this.sc && (a += "<" + this.sc + ">");
            return a };
        ({}).af;

        function ji(a, b, c, d, e) {
            function f() {}
            a.$b("transaction on " + b);
            var g = new V(a.za, a, b);
            g.Wa("value", f);
            c = { path: b, update: c, S: d, status: null, Dd: ob(), md: e, Fd: 0, Cc: function() { g.eb("value", f) }, Hc: null, ta: null, ec: null, fc: null, gc: null };
            d = a.f.ra(b, void 0) || x;
            c.ec = d;
            d = c.update(d.N());
            if (p(d)) {
                dd("transaction failed: Data returned ", d, c.path);
                c.status = v.ga.Ib;
                e = we(a.o, b);
                var k = e.ua() || [];
                k.push(c);
                xe(e, k);
                "object" === typeof d && null !== d && ya(d, ".priority") ? (k = t(d, ".priority"), z(bd(k), "Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")) : k =
                    (a.f.ra(b) || x).J().N();
                e = $h(a);
                d = Q(d, k);
                e = df(d, e);
                c.fc = d;
                c.gc = e;
                c.ta = a.Ga++;
                c = Dh(a.f, b, e, c.ta, c.md);
                pf(a.g, b, c);
                ki(a)
            } else c.Cc(), c.fc = null, c.gc = null, c.S && (a = new U(c.ec, new V(a.za, a, c.path), R), c.S(null, !1, a))
        }

        function ki(a, b) {
            var c = b || a.o;
            b || li(a, c);
            if (null !== c.ua()) {
                var d = mi(a, c);
                z(0 < d.length, "Sending zero length transaction queue");
                sa(d, function(a) {
                    return a.status === v.ga.Ib }) && ni(a, c.path(), d) } else c.nc() && c.X(function(b) { ki(a, b) }) }

        function ni(a, b, c) {
            for (var d = qa(c, function(a) {
                    return a.ta }), e = a.f.ra(b, d) || x, d = e, e = e.hash(), f = 0; f < c.length; f++) {
                var g = c[f];
                z(g.status === v.ga.Ib, "tryToSendTransactionQueue_: items in queue should all be run.");
                g.status = v.ga.Ud;
                g.Fd++;
                var k = Sc(b, g.path),
                    d = d.M(k, g.fc) }
            var d = d.N(!0),
                l = a.za;
            a.m.Gb(b.toString(), d, function(d) {
                a.$b("transaction put response", { path: b.toString(), status: d });
                var e = [];
                if ("ok" === d) {
                    d = [];
                    for (f = 0; f < c.length; f++) {
                        c[f].status = v.ga.gd;
                        e = e.concat(Gh(a.f, c[f].ta));
                        if (c[f].S) {
                            var g = c[f].gc,
                                k = new V(l, a, c[f].path);
                            d.push(r(c[f].S, null, null, !0, new U(g, k, R)))
                        }
                        c[f].Cc()
                    }
                    li(a, we(a.o, b));
                    ki(a);
                    pf(a.g, b, e);
                    for (f = 0; f < d.length; f++) Kb(d[f])
                } else {
                    if ("datastale" === d)
                        for (f = 0; f < c.length; f++) c[f].status = c[f].status === v.ga.ld ? v.ga.kd : v.ga.Ib;
                    else
                        for (Bb("transaction at " + b.toString() + " failed: " + d), f = 0; f < c.length; f++) c[f].status = v.ga.kd, c[f].Hc = d;
                    ai(a, b) }
            }, e)
        }

        function ai(a, b) {
            var c = oi(a, b),
                d = c.path(),
                c = mi(a, c);
            pi(a, c, d);
            return d }

        function pi(a, b, c) {
            if (0 !== b.length) {
                for (var d = [], e = [], f = qa(b, function(a) {
                        return a.ta }), g = 0; g < b.length; g++) {
                    var k = b[g],
                        l = Sc(c, k.path),
                        m = !1,
                        w;
                    z(null !== l, "rerunTransactionsUnderNode_: relativePath should not be null.");
                    if (k.status === v.ga.kd) m = !0, w = k.Hc, e = e.concat(Gh(a.f, k.ta, !0));
                    else if (k.status === v.ga.Ib)
                        if (25 <= k.Fd) m = !0, w = "maxretry", e = e.concat(Gh(a.f, k.ta, !0));
                        else {
                            var C = a.f.ra(k.path, f) || x;
                            k.ec = C;
                            var N = b[g].update(C.N());
                            p(N) ? (dd("transaction failed: Data returned ", N, k.path), l = Q(N), "object" === typeof N &&
                                null != N && ya(N, ".priority") || (l = l.ba(C.J())), C = k.ta, N = $h(a), N = df(l, N), k.fc = l, k.gc = N, k.ta = a.Ga++, va(f, C), e = e.concat(Dh(a.f, k.path, N, k.ta, k.md)), e = e.concat(Gh(a.f, C, !0))) : (m = !0, w = "nodata", e = e.concat(Gh(a.f, k.ta, !0)))
                        }
                    pf(a.g, c, e);
                    e = [];
                    m && (b[g].status = v.ga.gd, setTimeout(b[g].Cc, Math.floor(0)), b[g].S && ("nodata" === w ? (k = new V(a.za, a, b[g].path), d.push(r(b[g].S, null, null, !1, new U(b[g].ec, k, R)))) : d.push(r(b[g].S, null, Error(w), !1, null))))
                }
                li(a, a.o);
                for (g = 0; g < d.length; g++) Kb(d[g]);
                ki(a)
            }
        }

        function oi(a, b) {
            for (var c, d = a.o; null !== (c = K(b)) && null === d.ua();) d = we(d, c), b = L(b);
            return d }

        function mi(a, b) {
            var c = [];
            qi(a, b, c);
            c.sort(function(a, b) {
                return a.Dd - b.Dd });
            return c }

        function qi(a, b, c) {
            var d = b.ua();
            if (null !== d)
                for (var e = 0; e < d.length; e++) c.push(d[e]);
            b.X(function(b) { qi(a, b, c) }) }

        function li(a, b) {
            var c = b.ua();
            if (c) {
                for (var d = 0, e = 0; e < c.length; e++) c[e].status !== v.ga.gd && (c[d] = c[e], d++);
                c.length = d;
                xe(b, 0 < c.length ? c : null) }
            b.X(function(b) { li(a, b) }) }

        function di(a, b) {
            var c = oi(a, b).path(),
                d = we(a.o, b);
            Ae(d, function(b) { ri(a, b) });
            ri(a, d);
            ze(d, function(b) { ri(a, b) });
            return c }

        function ri(a, b) {
            var c = b.ua();
            if (null !== c) {
                for (var d = [], e = [], f = -1, g = 0; g < c.length; g++) c[g].status !== v.ga.ld && (c[g].status === v.ga.Ud ? (z(f === g - 1, "All SENT items should be at beginning of queue."), f = g, c[g].status = v.ga.ld, c[g].Hc = "set") : (z(c[g].status === v.ga.Ib, "Unexpected transaction status in abort"), c[g].Cc(), e = e.concat(Gh(a.f, c[g].ta, !0)), c[g].S && d.push(r(c[g].S, null, Error("set"), !1, null)))); - 1 === f ? xe(b, null) : c.length = f + 1;
                pf(a.g, b.path(), e);
                for (g = 0; g < d.length; g++) Kb(d[g]) } };

        function si() { this.f = {};
            this.g = !1 }
        ba(si);
        si.prototype.cb = function(a) {
            for (var b in this.f[a.name]) this.f[a.name].hasOwnProperty(b) && this.f[a.name][b].cb() };
        si.prototype.interrupt = si.prototype.cb;
        si.prototype.Eb = function(a) {
            for (var b in this.f[a.name]) this.f[a.name].hasOwnProperty(b) && this.f[a.name][b].Eb() };
        si.prototype.resume = si.prototype.Eb;
        si.prototype.Oc = function() { this.g = !0 };

        function ti(a) {
            var b = this;
            this.Ra = a;
            this.m = "*";
            Bd() ? this.f = this.g = nd() : (this.f = window.opener, this.g = window);
            if (!b.f) throw "Unable to find relay frame";
            od(this.g, "message", r(this.A, this));
            od(this.g, "message", r(this.o, this));
            try { ui(this, { a: "ready" }) } catch (c) { od(this.f, "load", function() { ui(b, { a: "ready" }) }) }
            od(window, "unload", r(this.V, this)) }

        function ui(a, b) { b = u(b);
            Bd() ? a.f.doPost(b, a.m) : a.f.postMessage(b, a.m) }
        ti.prototype.A = function(a) {
            var b = this,
                c;
            try { c = Ja(a.data) } catch (d) {}
            c && "request" === c.a && (pd(window, "message", this.A), this.m = a.origin, this.Ra && setTimeout(function() { b.Ra(b.m, c.d, function(a, c) { b.H = !c;
                    b.Ra = void 0;
                    ui(b, { a: "response", d: a, forceKeepWindowOpen: c }) }) }, 0)) };
        ti.prototype.V = function() {
            try { pd(this.g, "message", this.o) } catch (a) {}
            this.Ra && (ui(this, { a: "error", d: "unknown closed window" }), this.Ra = void 0);
            try { window.close() } catch (a) {} };
        ti.prototype.o = function(a) {
            if (this.H && "die" === a.data) try { window.close() } catch (b) {} };
        var W = { ie: function() { Wd.bf.he();
                Wd.Md.ff() } };
        W.forceLongPolling = W.ie;
        W.je = function() { Wd.Md.he() };
        W.forceWebSockets = W.je;
        W.Fe = function(a, b) { a.B.Ka.ad = b };
        W.setSecurityDebugCallback = W.Fe;
        W.cd = function(a, b) { a.B.cd(b) };
        W.stats = W.cd;
        W.dd = function(a, b) { a.B.dd(b) };
        W.statsIncrementCounter = W.dd;
        W.hc = function(a) {
            return a.B.hc };
        W.dataUpdateCount = W.hc;
        W.le = function(a, b) { a.B.fd = b };
        W.interceptServerData = W.le;
        W.te = function(a) { new ti(a) };
        W.onPopupOpen = W.te;
        W.De = function(a) { Rb = a };
        W.setAuthenticationServer = W.De;

        function vi(a, b) { this.committed = a;
            this.snapshot = b };

        function X(a, b) { this.f = a;
            this.pa = b }
        X.prototype.cancel = function(a) { F("Wilddog.onDisconnect().cancel", 0, 1, arguments.length);
            H("Wilddog.onDisconnect().cancel", 1, a, !0);
            var b = new B;
            this.f.qc(this.pa, D(b, a));
            return b.f };
        X.prototype.cancel = X.prototype.cancel;
        X.prototype.remove = function(a) { F("Wilddog.onDisconnect().remove", 0, 1, arguments.length);
            kd("Wilddog.onDisconnect().remove", this.pa);
            H("Wilddog.onDisconnect().remove", 1, a, !0);
            var b = new B;
            ei(this.f, this.pa, null, D(b, a));
            return b.f };
        X.prototype.remove = X.prototype.remove;
        X.prototype.set = function(a, b) { F("Wilddog.onDisconnect().set", 1, 2, arguments.length);
            kd("Wilddog.onDisconnect().set", this.pa);
            cd("Wilddog.onDisconnect().set", a, this.pa, !1);
            H("Wilddog.onDisconnect().set", 2, b, !0);
            var c = new B;
            ei(this.f, this.pa, a, D(c, b));
            return c.f };
        X.prototype.set = X.prototype.set;
        X.prototype.hb = function(a, b, c) { F("Wilddog.onDisconnect().setWithPriority", 2, 3, arguments.length);
            kd("Wilddog.onDisconnect().setWithPriority", this.pa);
            cd("Wilddog.onDisconnect().setWithPriority", a, this.pa, !1);
            gd("Wilddog.onDisconnect().setWithPriority", 2, b);
            H("Wilddog.onDisconnect().setWithPriority", 3, c, !0);
            var d = new B;
            fi(this.f, this.pa, a, b, D(d, c));
            return d.f };
        X.prototype.setWithPriority = X.prototype.hb;
        X.prototype.update = function(a, b) {
            F("Wilddog.onDisconnect().update", 1, 2, arguments.length);
            kd("Wilddog.onDisconnect().update", this.pa);
            if (da(a)) {
                for (var c = {}, d = 0; d < a.length; ++d) c["" + d] = a[d];
                a = c;
                Bb("Passing an Array to Wilddog.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.") }
            fd("Wilddog.onDisconnect().update", a, this.pa);
            H("Wilddog.onDisconnect().update", 2, b, !0);
            c = new B;
            gi(this.f, this.pa, a, D(c, b));
            return c.f
        };
        X.prototype.update = X.prototype.update;
        var wi = function() {
            var a = 0,
                b = [];
            return function(c) {
                var d = c === a;
                a = c;
                for (var e = Array(8), f = 7; 0 <= f; f--) e[f] = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c % 64), c = Math.floor(c / 64);
                z(0 === c, "Cannot push at time == 0");
                c = e.join("");
                if (d) {
                    for (f = 11; 0 <= f && 63 === b[f]; f--) b[f] = 0;
                    b[f]++ } else
                    for (f = 0; 12 > f; f++) b[f] = Math.floor(64 * Math.random());
                for (f = 0; 12 > f; f++) c += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);
                z(20 === c.length, "nextPushId: Length should be 20.");
                return c
            }
        }();

        function Wf() { this.f = {} }

        function xi(a, b) {
            var c = b.type,
                d = b.Na;
            z("child_added" == c || "child_changed" == c || "child_removed" == c, "Only child changes supported for tracking");
            z(".priority" !== d, "Only non-priority child changes can be tracked.");
            var e = t(a.f, d);
            if (e) {
                var f = e.type;
                if ("child_added" == c && "child_removed" == f) a.f[d] = new T("child_changed", b.Ea, d, e.Ea);
                else if ("child_removed" == c && "child_added" == f) delete a.f[d];
                else if ("child_removed" == c && "child_changed" == f) a.f[d] = new T("child_removed", e.Wc, d);
                else if ("child_changed" == c && "child_added" ==
                    f) a.f[d] = new T("child_added", b.Ea, d);
                else if ("child_changed" == c && "child_changed" == f) a.f[d] = new T("child_changed", b.Ea, d, e.Wc);
                else throw pb("Illegal combination of changes: " + b + " occurred after " + e);
            } else a.f[d] = b
        };

        function Tg(a) { this.w = a }
        h = Tg.prototype;
        h.M = function(a, b, c, d, e) { z(a.Ab(this.w), "A node must be indexed if only a child is updated");
            d = a.P(b);
            if (d.$(c)) return a;
            null != e && (c.j() ? a.va(b) ? xi(e, new T("child_removed", d, b)) : z(a.R(), "A child remove without an old child only makes sense on a leaf node") : d.j() ? xi(e, new T("child_added", c, b)) : xi(e, new T("child_changed", c, b, d)));
            return a.R() && c.j() ? a : a.T(b, c).Oa(this.w) };
        h.qa = function(a, b, c) { null != c && (a.R() || a.X(R, function(a, e) { b.va(a) || xi(c, new T("child_removed", e, a)) }), b.R() || b.X(R, function(b, e) {
                if (a.va(b)) {
                    var f = a.P(b);
                    f.$(e) || xi(c, new T("child_changed", e, b, f)) } else xi(c, new T("child_added", e, b)) }));
            return b.Oa(this.w) };
        h.ba = function(a, b) {
            return a.j() ? x : a.ba(b) };
        h.Aa = function() {
            return !1 };
        h.sb = function() {
            return this };
        h.U = function() {
            return this.w };

        function Vg(a) { this.m = new Tg(a.U());
            this.w = a.U();
            var b;
            a.na ? (b = yi(a), b = a.U().Tb(zi(a), b)) : b = a.U().Wb();
            this.g = b;
            a.oa ? (b = Ai(a), a = a.U().Tb(Bi(a), b)) : a = a.U().Ub();
            this.f = a }
        h = Vg.prototype;
        h.matches = function(a) {
            return 0 >= this.w.compare(this.g, a) && 0 >= this.w.compare(a, this.f) };
        h.M = function(a, b, c, d, e) { this.matches(new P(b, c)) || (c = x);
            return this.m.M(a, b, c, d, e) };
        h.qa = function(a, b, c) { b.R() && (b = x);
            var d = b.Oa(this.w),
                d = d.ba(x),
                e = this;
            b.X(R, function(a, b) { e.matches(new P(a, b)) || (d = d.T(a, x)) });
            return this.m.qa(a, d, c) };
        h.ba = function(a) {
            return a };
        h.Aa = function() {
            return !0 };
        h.sb = function() {
            return this.m };
        h.U = function() {
            return this.w };

        function Ug(a) { this.f = new Vg(a);
            this.w = a.U();
            z(a.ma, "Only valid if limit has been set");
            this.da = a.da;
            this.g = !Ci(a) }
        h = Ug.prototype;
        h.M = function(a, b, c, d, e) { this.f.matches(new P(b, c)) || (c = x);
            return a.P(b).$(c) ? a : a.Va() < this.da ? this.f.sb().M(a, b, c, d, e) : Di(this, a, b, c, d, e) };
        h.qa = function(a, b, c) {
            var d;
            if (b.R() || b.j()) d = x.Oa(this.w);
            else if (2 * this.da < b.Va() && b.Ab(this.w)) { d = x.Oa(this.w);
                b = this.g ? b.wb(this.f.f, this.w) : b.vb(this.f.g, this.w);
                for (var e = 0; 0 < b.Ja.length && e < this.da;) {
                    var f = qg(b),
                        g;
                    if (g = this.g ? 0 >= this.w.compare(this.f.g, f) : 0 >= this.w.compare(f, this.f.f)) d = d.T(f.name, f.node), e++;
                    else break } } else {
                d = b.Oa(this.w);
                d = d.ba(x);
                var k, l, m;
                if (this.g) { b = d.vd(this.w);
                    k = this.f.f;
                    l = this.f.g;
                    var w = Fe(this.w);
                    m = function(a, b) {
                        return w(b, a) } } else b = d.ub(this.w), k = this.f.g, l = this.f.f,
                    m = Fe(this.w);
                for (var e = 0, C = !1; 0 < b.Ja.length;) f = qg(b), !C && 0 >= m(k, f) && (C = !0), (g = C && e < this.da && 0 >= m(f, l)) ? e++ : d = d.T(f.name, x)
            }
            return this.f.sb().qa(a, d, c)
        };
        h.ba = function(a) {
            return a };
        h.Aa = function() {
            return !0 };
        h.sb = function() {
            return this.f.sb() };
        h.U = function() {
            return this.w };

        function Di(a, b, c, d, e, f) {
            var g;
            if (a.g) {
                var k = Fe(a.w);
                g = function(a, b) {
                    return k(b, a) } } else g = Fe(a.w);
            z(b.Va() == a.da, "");
            var l = new P(c, d),
                m = a.g ? Mg(b, a.w) : Ng(b, a.w),
                w = a.f.matches(l);
            if (b.va(c)) {
                var C = b.P(c),
                    m = e.Qc(a.w, m, a.g);
                null != m && m.name == c && (m = e.Qc(a.w, m, a.g));
                e = null == m ? 1 : g(m, l);
                if (w && !d.j() && 0 <= e) return null != f && xi(f, new T("child_changed", d, c, C)), b.T(c, d);
                null != f && xi(f, new T("child_removed", C, c));
                b = b.T(c, x);
                return null != m && a.f.matches(m) ? (null != f && xi(f, new T("child_added", m.node, m.name)), b.T(m.name,
                    m.node)) : b
            }
            return d.j() ? b : w && 0 <= g(m, l) ? (null != f && (xi(f, new T("child_removed", m.node, m.name)), xi(f, new T("child_added", d, c))), b.T(c, d).T(m.name, x)) : b
        };

        function Ei() { this.qb = this.oa = this.ib = this.na = this.ma = !1;
            this.da = 0;
            this.kb = "";
            this.zb = null;
            this.bb = "";
            this.xb = null;
            this.ab = "";
            this.w = R }
        var Fi = new Ei;

        function Ci(a) {
            return "" === a.kb ? a.na : "l" === a.kb }

        function zi(a) { z(a.na, "Only valid if start has been set");
            return a.zb }

        function yi(a) { z(a.na, "Only valid if start has been set");
            return a.ib ? a.bb : "[MIN_NAME]" }

        function Bi(a) { z(a.oa, "Only valid if end has been set");
            return a.xb }

        function Ai(a) { z(a.oa, "Only valid if end has been set");
            return a.qb ? a.ab : "[MAX_NAME]" }
        h = Ei.prototype;
        h.U = function() {
            return this.w };

        function Gi(a) {
            var b = new Ei;
            b.ma = a.ma;
            b.da = a.da;
            b.na = a.na;
            b.zb = a.zb;
            b.ib = a.ib;
            b.bb = a.bb;
            b.oa = a.oa;
            b.xb = a.xb;
            b.qb = a.qb;
            b.ab = a.ab;
            b.w = a.w;
            return b }
        h.Tc = function(a) {
            var b = Gi(this);
            b.ma = !0;
            b.da = a;
            b.kb = "";
            return b };
        h.Uc = function(a) {
            var b = Gi(this);
            b.ma = !0;
            b.da = a;
            b.kb = "l";
            return b };
        h.Vc = function(a) {
            var b = Gi(this);
            b.ma = !0;
            b.da = a;
            b.kb = "r";
            return b };
        h.zc = function(a, b) {
            var c = Gi(this);
            c.na = !0;
            p(a) || (a = null);
            c.zb = a;
            null != b ? (c.ib = !0, c.bb = b) : (c.ib = !1, c.bb = "");
            return c };
        h.ic = function(a, b) {
            var c = Gi(this);
            c.oa = !0;
            p(a) || (a = null);
            c.xb = a;
            p(b) ? (c.qb = !0, c.ab = b) : (c.kf = !1, c.ab = "");
            return c };

        function Hi(a, b) {
            var c = Gi(a);
            c.w = b;
            return c }

        function le(a) {
            var b = {};
            a.na && (b.sp = a.zb, a.ib && (b.sn = a.bb));
            a.oa && (b.ep = a.xb, a.qb && (b.en = a.ab));
            if (a.ma) { b.l = a.da;
                var c = a.kb; "" === c && (c = Ci(a) ? "l" : "r");
                b.vf = c }
            a.w !== R && (b.i = a.w.toString());
            return b }

        function gf(a) {
            return !(a.na || a.oa || a.ma) }

        function hf(a) {
            var b = {};
            if (gf(a) && a.w == R) return b;
            var c;
            a.w === R ? c = "$priority" : a.w === Pe ? c = "$value" : a.w === Me ? c = "$key" : (z(a.w instanceof He, "Unrecognized index type!"), c = a.w.toString());
            b.orderBy = u(c);
            a.na && (b.startAt = u(a.zb), a.ib && (b.startAt += "," + u(a.bb)));
            a.oa && (b.endAt = u(a.xb), a.qb && (b.endAt += "," + u(a.ab)));
            a.ma && (Ci(a) ? b.limitToFirst = a.da : b.limitToLast = a.da);
            return b }
        h.toString = function() {
            return u(le(this)) };

        function Y(a, b, c, d) { this.B = a;
            this.path = b;
            this.G = c;
            this.f = d }

        function Ii(a) {
            var b = null,
                c = null;
            a.na && (b = zi(a));
            a.oa && (c = Bi(a));
            if (a.U() === Me) {
                if (a.na) {
                    if ("[MIN_NAME]" != yi(a)) throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");
                    if ("string" !== typeof b) throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string."); }
                if (a.oa) {
                    if ("[MAX_NAME]" != Ai(a)) throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");
                    if ("string" !==
                        typeof c) throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");
                }
            } else if (a.U() === R) {
                if (null != b && !bd(b) || null != c && !bd(c)) throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string)."); } else if (z(a.U() instanceof He || a.U() === Pe, "unknown index type."), null != b && "object" === typeof b || null != c && "object" === typeof c) throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
        }

        function Ji(a) {
            if (a.na && a.oa && a.ma && (!a.ma || "" === a.kb)) throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead."); }

        function Ki(a, b) {
            if (!0 === a.f) throw Error(b + ": You can't combine multiple orderBy calls."); }
        Y.prototype.Cb = function(a) { F("Query.ref", 0, 1, arguments.length);
            return new V(this.app, this.B, a ? this.path.C(a) : this.path) };
        Y.prototype.ref = Y.prototype.Cb;
        Y.prototype.Wa = function(a, b, c, d) { F("Query.on", 2, 4, arguments.length);
            hd("Query.on", a, !1);
            H("Query.on", 2, b, !1);
            var e = Li("Query.on", c, d);
            if ("value" === a) hi(this.B, this, new If(b, e.cancel || null, e.context || null));
            else {
                var f = {};
                f[a] = b;
                hi(this.B, this, new Jf(f, e.cancel, e.context)) }
            return b };
        Y.prototype.on = Y.prototype.Wa;
        Y.prototype.eb = function(a, b, c) { F("Query.off", 0, 3, arguments.length);
            hd("Query.off", a, !0);
            H("Query.off", 2, b, !0);
            Rc("Query.off", 3, c);
            var d = null,
                e = null; "value" === a ? d = new If(b || null, null, c || null) : a && (b && (e = {}, e[a] = b), d = new Jf(e, null, c || null));
            e = this.B;
            d = ".info" === K(this.path) ? e.ya.Xa(this, d) : e.f.Xa(this, d);
            nf(e.g, this.path, d) };
        Y.prototype.off = Y.prototype.eb;
        Y.prototype.m = function(a, b) {
            function c(k) { f && (f = !1, e.eb(a, c), b && b.call(d.context, k), g.m(k)) }
            F("Query.once", 1, 4, arguments.length);
            hd("Query.once", a, !1);
            H("Query.once", 2, b, !0);
            var d = Li("Query.once", arguments[2], arguments[3]),
                e = this,
                f = !0,
                g = new B;
            Cc(g.f);
            this.Wa(a, c, function(b) { e.eb(a, c);
                d.cancel && d.cancel.call(d.context, b);
                g.g(b) });
            return g.f };
        Y.prototype.once = Y.prototype.m;
        Y.prototype.Tc = function(a) { Bb("Query.limit() being deprecated. Please use Query.limitToFirst() or Query.limitToLast() instead.");
            F("Query.limit", 1, 1, arguments.length);
            if (!ea(a) || Math.floor(a) !== a || 0 >= a) throw Error("Query.limit: First argument must be a positive integer.");
            if (this.G.ma) throw Error("Query.limit: Limit was already set (by another call to limit, limitToFirst, orlimitToLast.");
            var b = this.G.Tc(a);
            Ji(b);
            return new Y(this.B, this.path, b, this.f) };
        Y.prototype.limit = Y.prototype.Tc;
        Y.prototype.Uc = function(a) { F("Query.limitToFirst", 1, 1, arguments.length);
            if (!ea(a) || Math.floor(a) !== a || 0 >= a) throw Error("Query.limitToFirst: First argument must be a positive integer.");
            if (this.G.ma) throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
            return new Y(this.B, this.path, this.G.Uc(a), this.f) };
        Y.prototype.limitToFirst = Y.prototype.Uc;
        Y.prototype.Vc = function(a) { F("Query.limitToLast", 1, 1, arguments.length);
            if (!ea(a) || Math.floor(a) !== a || 0 >= a) throw Error("Query.limitToLast: First argument must be a positive integer.");
            if (this.G.ma) throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
            return new Y(this.B, this.path, this.G.Vc(a), this.f) };
        Y.prototype.limitToLast = Y.prototype.Vc;
        Y.prototype.o = function(a) {
            F("Query.orderByChild", 1, 1, arguments.length);
            if ("$key" === a) throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');
            if ("$priority" === a) throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');
            if ("$value" === a) throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');
            id("Query.orderByChild", 1, a, !1);
            Ki(this, "Query.orderByChild");
            var b = Hi(this.G, new He(a));
            Ii(b);
            return new Y(this.B,
                this.path, b, !0)
        };
        Y.prototype.orderByChild = Y.prototype.o;
        Y.prototype.A = function() { F("Query.orderByKey", 0, 0, arguments.length);
            Ki(this, "Query.orderByKey");
            var a = Hi(this.G, Me);
            Ii(a);
            return new Y(this.B, this.path, a, !0) };
        Y.prototype.orderByKey = Y.prototype.A;
        Y.prototype.H = function() { F("Query.orderByPriority", 0, 0, arguments.length);
            Ki(this, "Query.orderByPriority");
            var a = Hi(this.G, R);
            Ii(a);
            return new Y(this.B, this.path, a, !0) };
        Y.prototype.orderByPriority = Y.prototype.H;
        Y.prototype.V = function() { F("Query.orderByValue", 0, 0, arguments.length);
            Ki(this, "Query.orderByValue");
            var a = Hi(this.G, Pe);
            Ii(a);
            return new Y(this.B, this.path, a, !0) };
        Y.prototype.orderByValue = Y.prototype.V;
        Y.prototype.zc = function(a, b) { F("Query.startAt", 0, 2, arguments.length);
            cd("Query.startAt", a, this.path, !0);
            id("Query.startAt", 2, b, !0);
            var c = this.G.zc(a, b);
            Ji(c);
            Ii(c);
            if (this.G.na) throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");
            p(a) || (b = a = null);
            return new Y(this.B, this.path, c, this.f) };
        Y.prototype.startAt = Y.prototype.zc;
        Y.prototype.ic = function(a, b) { F("Query.endAt", 0, 2, arguments.length);
            cd("Query.endAt", a, this.path, !0);
            id("Query.endAt", 2, b, !0);
            var c = this.G.ic(a, b);
            Ji(c);
            Ii(c);
            if (this.G.oa) throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");
            return new Y(this.B, this.path, c, this.f) };
        Y.prototype.endAt = Y.prototype.ic;
        Y.prototype.g = function(a, b) { F("Query.equalTo", 1, 2, arguments.length);
            cd("Query.equalTo", a, this.path, !1);
            id("Query.equalTo", 2, b, !0);
            if (this.G.na) throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");
            if (this.G.oa) throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");
            return this.zc(a, b).ic(a, b) };
        Y.prototype.equalTo = Y.prototype.g;
        Y.prototype.toString = function() { F("Query.toString", 0, 0, arguments.length);
            for (var a = this.path, b = "", c = a.aa; c < a.F.length; c++) "" !== a.F[c] && (b += "/" + encodeURIComponent(String(a.F[c])));
            return this.B.toString() + (b || "/") };
        Y.prototype.toString = Y.prototype.toString;
        Y.prototype.sa = function() {
            var a = Gb(le(this.G));
            return "{}" === a ? "default" : a };

        function Li(a, b, c) {
            var d = { cancel: null, context: null };
            if (b && c) d.cancel = b, H(a, 3, d.cancel, !0), d.context = c, Rc(a, 4, d.context);
            else if (b)
                if ("object" === typeof b && null !== b) d.context = b;
                else if ("function" === typeof b) d.cancel = b;
            else throw Error(I(a, 3, !0) + " must either be a cancel callback or a context object.");
            return d };
        var Z = {};
        Z.Hb = ge;
        Z.DataConnection = Z.Hb;
        ge.prototype.Qd = function(a, b) { this.wa("q", { p: a }, b) };
        Z.Hb.prototype.simpleListen = Z.Hb.prototype.Qd;
        ge.prototype.Od = function(a, b) { this.wa("echo", { d: a }, b) };
        Z.Hb.prototype.echo = Z.Hb.prototype.Od;
        ge.prototype.interrupt = ge.prototype.cb;
        Z.Td = Yd;
        Z.RealTimeConnection = Z.Td;
        Yd.prototype.sendRequest = Yd.prototype.wa;
        Yd.prototype.close = Yd.prototype.close;
        Z.ke = function(a) {
            var b = ge.prototype.Gb;
            ge.prototype.Gb = function(c, d, e, f) { p(f) && (f = a());
                b.call(this, c, d, e, f) };
            return function() { ge.prototype.Gb = b } };
        Z.hijackHash = Z.ke;
        Z.Nd = v.$e;
        Z.ConnectionTarget = Z.Nd;
        Z.sa = function(a) {
            return a.sa() };
        Z.queryIdentifier = Z.sa;
        Z.oe = function(a) {
            return a.B.Ka.ea };
        Z.listens = Z.oe;
        Z.Oc = function(a) { a.Oc() };
        Z.forceRestClient = Z.Oc;
        Ud().__regService("sync", function(a) {
            return new V(a) });

        function V(a, b, c) {
            this.app = a;
            if (!b && !c) {
                b = a.options.syncURL;
                if (!b) throw Error("Could not find 'syncURL' in options.");
                a = Cb(b);
                b = a.Ne;
                "wilddog" === a.domain && Ab(a.host + " is no longer supported. Please use <YOUR WILDDOG>.wilddogio.com instead");
                b || Ab("Cannot parse Wilddog url. Please use https://<YOUR WILDDOG>.wilddogio.com");
                a.gb || "undefined" !== typeof window && window.location && window.location.protocol && -1 !== window.location.protocol.indexOf("https:") && Bb("Insecure Wilddog access from a secure page. Please use https in calls to new Wilddog().");
                b = new ii(a.host, a.gb, b);
                a = new J(a.Yb);
                c = si.tb();
                var d = this.app,
                    e = b.toString();
                c.f[d.name] || (c.f[d.name] = {});
                var f = t(c.f[d.name], e);
                f || (f = new Wh(d, b, c.g), c.f[d.name][e] = f);
                b = f;
                c = a
            }
            Y.call(this, b, c, Fi, !1)
        }
        ka(V, Y);
        V.prototype.name = function() { Bb("Wilddog.name() being deprecated. Please use Wilddog.key() instead.");
            F("Wilddog.name", 0, 0, arguments.length);
            return this.key() };
        V.prototype.name = V.prototype.name;
        V.prototype.key = function() { F("Wilddog.key", 0, 0, arguments.length);
            return this.path.j() ? null : Uc(this.path) };
        V.prototype.key = V.prototype.key;
        V.prototype.C = function(a) { F("Wilddog.child", 1, 1, arguments.length);
            if (ea(a)) a = String(a);
            else if (!(a instanceof J))
                if (null === K(this.path)) {
                    var b = a;
                    b && (b = b.replace(/^\/*\.info(\/|$)/, "/"));
                    jd("Wilddog.child", b) } else jd("Wilddog.child", a);
            return new V(this.app, this.B, this.path.C(a)) };
        V.prototype.child = V.prototype.C;
        V.prototype.parent = function() { F("Wilddog.parent", 0, 0, arguments.length);
            var a = this.path.parent();
            return null === a ? null : new V(this.app, this.B, a) };
        V.prototype.parent = V.prototype.parent;
        V.prototype.root = function() { F("Wilddog.ref", 0, 0, arguments.length);
            for (var a = this; null !== a.parent();) a = a.parent();
            return a };
        V.prototype.root = V.prototype.root;
        V.prototype.set = function(a, b) { F("Wilddog.set", 1, 2, arguments.length);
            kd("Wilddog.set", this.path);
            cd("Wilddog.set", a, this.path, !1);
            H("Wilddog.set", 2, b, !0);
            var c = new B;
            this.B.hb(this.path, a, null, D(c, b));
            return c.f };
        V.prototype.set = V.prototype.set;
        V.prototype.update = function(a, b) { F("Wilddog.update", 1, 2, arguments.length);
            kd("Wilddog.update", this.path);
            if (da(a)) {
                for (var c = {}, d = 0; d < a.length; ++d) c["" + d] = a[d];
                a = c;
                Bb("Passing an Array to Wilddog.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.") }
            fd("Wilddog.update", a, this.path);
            H("Wilddog.update", 2, b, !0);
            c = new B;
            this.B.update(this.path, a, D(c, b));
            return c.f };
        V.prototype.update = V.prototype.update;
        V.prototype.hb = function(a, b, c) { F("Wilddog.setWithPriority", 2, 3, arguments.length);
            kd("Wilddog.setWithPriority", this.path);
            cd("Wilddog.setWithPriority", a, this.path, !1);
            gd("Wilddog.setWithPriority", 2, b);
            H("Wilddog.setWithPriority", 3, c, !0);
            if (".length" === this.key() || ".keys" === this.key()) throw "Wilddog.setWithPriority failed: " + this.key() + " is a read-only object.";
            var d = new B;
            this.B.hb(this.path, a, b, D(d, c));
            return d.f };
        V.prototype.setWithPriority = V.prototype.hb;
        V.prototype.remove = function(a) { F("Wilddog.remove", 0, 1, arguments.length);
            kd("Wilddog.remove", this.path);
            H("Wilddog.remove", 1, a, !0);
            this.set(null, a) };
        V.prototype.remove = V.prototype.remove;
        V.prototype.transaction = function(a, b, c) {
            F("Wilddog.transaction", 1, 3, arguments.length);
            kd("Wilddog.transaction", this.path);
            H("Wilddog.transaction", 1, a, !1);
            H("Wilddog.transaction", 2, b, !0);
            if (p(c) && "boolean" != typeof c) throw Error(I("Wilddog.transaction", 3, !0) + "must be a boolean.");
            if (".length" === this.key() || ".keys" === this.key()) throw "Wilddog.transaction failed: " + this.key() + " is a read-only object.";
            "undefined" === typeof c && (c = !0);
            var d = new B;
            fa(b) && Cc(d.f);
            ji(this.B, this.path, a, function(a, c, g) {
                a ? d.g(a) :
                    d.m(new vi(c, g));
                fa(b) && b(a, c, g)
            }, c);
            return d.f
        };
        V.prototype.transaction = V.prototype.transaction;
        V.prototype.Ee = function(a, b) { F("Wilddog.setPriority", 1, 2, arguments.length);
            kd("Wilddog.setPriority", this.path);
            gd("Wilddog.setPriority", 1, a);
            H("Wilddog.setPriority", 2, b, !0);
            var c = new B;
            this.B.hb(this.path.C(".priority"), a, null, D(c, b));
            return c.f };
        V.prototype.setPriority = V.prototype.Ee;
        V.prototype.push = function(a, b) { F("Wilddog.push", 0, 2, arguments.length);
            kd("Wilddog.push", this.path);
            cd("Wilddog.push", a, this.path, !0);
            H("Wilddog.push", 2, b, !0);
            var c = Zh(this.B),
                d = wi(c),
                c = this.C(d);
            if (null != a) {
                var e = this,
                    f = c.set(a, b).then(function() {
                        return e.C(d) });
                c.then = r(f.then, f);
                c["catch"] = r(f.then, f, void 0);
                fa(b) && Cc(f) }
            return c };
        V.prototype.push = V.prototype.push;
        V.prototype.onDisconnect = function() { kd("Wilddog.onDisconnect", this.path);
            return new X(this.B, this.path) };
        V.prototype.onDisconnect = V.prototype.onDisconnect;
        V.prototype.W = function(a, b, c) { Bb("WilddogRef.auth() being deprecated. Please use WilddogRef.authWithCustomToken() instead.");
            F("Wilddog.auth", 1, 3, arguments.length);
            ld("Wilddog.auth", a);
            H("Wilddog.auth", 2, b, !0);
            H("Wilddog.auth", 3, b, !0);
            var d = new B;
            Od(self.B.W, {}, { remember: "none" }, D(d, b));
            return d.f };
        V.prototype.auth = V.prototype.W;
        V.prototype.Bc = function(a) { F("Wilddog.unauth", 0, 1, arguments.length);
            H("Wilddog.unauth", 1, a, !0);
            var b = new B,
                c = D(b, a);
            Kc(this.B.W, null);
            A(c, null);
            return b.f };
        V.prototype.unauth = V.prototype.Bc;
        V.prototype.lc = function() { F("Wilddog.getAuth", 0, 0, arguments.length);
            return this.B.W.lc() };
        V.prototype.getAuth = V.prototype.lc;
        V.prototype.qe = function(a, b) { F("Wilddog.onAuth", 1, 2, arguments.length);
            H("Wilddog.onAuth", 1, a, !1);
            Rc("Wilddog.onAuth", 2, b);
            this.B.W.Wa("auth_status", a, b) };
        V.prototype.onAuth = V.prototype.qe;
        V.prototype.pe = function(a, b) { F("Wilddog.offAuth", 1, 2, arguments.length);
            H("Wilddog.offAuth", 1, a, !1);
            Rc("Wilddog.offAuth", 2, b);
            this.B.W.eb("auth_status", a, b) };
        V.prototype.offAuth = V.prototype.pe;
        V.prototype.Wd = function(a, b, c) { F("Wilddog.authWithCustomToken", 1, 3, arguments.length);
            ld("Wilddog.authWithCustomToken", a);
            H("Wilddog.authWithCustomToken", 2, b, !0);
            G("Wilddog.authWithCustomToken", 3, c, !0);
            var d = new B;
            Od(this.B.W, {}, c || {}, D(d, b));
            return d.f };
        V.prototype.authWithCustomToken = V.prototype.Wd;
        V.prototype.Xd = function(a, b, c) { F("Wilddog.authWithOAuthPopup", 2, 3, arguments.length);
            Ic("Wilddog.authWithOAuthPopup", 1, a);
            H("Wilddog.authWithOAuthPopup", 2, b, !1);
            G("Wilddog.authWithOAuthPopup", 3, c, !0);
            var d = new B;
            Lc(this.B.W, a, c, D(d, b));
            return d.f };
        V.prototype.authWithOAuthPopup = V.prototype.Xd;
        V.prototype.Yd = function(a, b, c) { F("Wilddog.authWithOAuthRedirect", 2, 3, arguments.length);
            Ic("Wilddog.authWithOAuthRedirect", 1, a);
            H("Wilddog.authWithOAuthRedirect", 2, b, !1);
            G("Wilddog.authWithOAuthRedirect", 3, c, !0);
            var d = new B;
            Mc(this.B.W, a, c, D(d, b));
            return d.f };
        V.prototype.authWithOAuthRedirect = V.prototype.Yd;
        V.prototype.Zd = function(a, b, c, d) { F("Wilddog.authWithOAuthToken", 3, 4, arguments.length);
            Ic("Wilddog.authWithOAuthToken", 1, a);
            H("Wilddog.authWithOAuthToken", 3, c, !1);
            G("Wilddog.authWithOAuthToken", 4, d, !0);
            var e = new B;
            q(b) ? (Ic("Wilddog.authWithOAuthToken", 2, b), Hc(this.B.W, a + "/token", { access_token: b })) : (G("Wilddog.authWithOAuthToken", 2, b, !1), Hc(this.B.W, a + "/token", b));
            return e.f };
        V.prototype.authWithOAuthToken = V.prototype.Zd;
        V.prototype.Vd = function(a, b) { F("Wilddog.authAnonymously", 0, 2, arguments.length);
            H("Wilddog.authAnonymously", 1, a, !0);
            G("Wilddog.authAnonymously", 2, b, !0);
            var c = new B;
            Hc(this.B.W, "anonymous", {});
            return c.f };
        V.prototype.authAnonymously = V.prototype.Vd;
        V.prototype.$d = function(a, b, c) { F("Wilddog.authWithPassword", 1, 3, arguments.length);
            G("Wilddog.authWithPassword", 1, a, !1);
            md("Wilddog.authWithPassword", a, "email");
            md("Wilddog.authWithPassword", a, "password");
            H("Wilddog.authAnonymously", 2, b, !0);
            G("Wilddog.authAnonymously", 3, c, !0);
            var d = new B;
            Hc(this.B.W, "password", a);
            return d.f };
        V.prototype.authWithPassword = V.prototype.$d;
        V.prototype.Qb = function(a, b) { F("Wilddog.createUser", 1, 2, arguments.length);
            G("Wilddog.createUser", 1, a, !1);
            md("Wilddog.createUser", a, "email");
            md("Wilddog.createUser", a, "password");
            H("Wilddog.createUser", 2, b, !0);
            var c = new B;
            this.B.W.Qb(a, D(c, b));
            return c.f };
        V.prototype.createUser = V.prototype.Qb;
        V.prototype.vc = function(a, b) { F("Wilddog.removeUser", 1, 2, arguments.length);
            G("Wilddog.removeUser", 1, a, !1);
            md("Wilddog.removeUser", a, "email");
            md("Wilddog.removeUser", a, "password");
            H("Wilddog.removeUser", 2, b, !0);
            var c = new B;
            this.B.W.vc(a, D(c, b));
            return c.f };
        V.prototype.removeUser = V.prototype.vc;
        V.prototype.pd = function(a, b) { F("Wilddog.changePassword", 1, 2, arguments.length);
            G("Wilddog.changePassword", 1, a, !1);
            md("Wilddog.changePassword", a, "email");
            md("Wilddog.changePassword", a, "oldPassword");
            md("Wilddog.changePassword", a, "newPassword");
            H("Wilddog.changePassword", 2, b, !0);
            var c = new B;
            this.B.W.pd(a, D(c, b));
            return c.f };
        V.prototype.changePassword = V.prototype.pd;
        V.prototype.od = function(a, b) { F("Wilddog.changeEmail", 1, 2, arguments.length);
            G("Wilddog.changeEmail", 1, a, !1);
            md("Wilddog.changeEmail", a, "oldEmail");
            md("Wilddog.changeEmail", a, "newEmail");
            md("Wilddog.changeEmail", a, "password");
            H("Wilddog.changeEmail", 2, b, !0);
            var c = new B;
            this.B.W.od(a, D(c, b));
            return c.f };
        V.prototype.changeEmail = V.prototype.od;
        V.prototype.Ed = function(a, b) { F("Wilddog.resetPassword", 1, 2, arguments.length);
            G("Wilddog.resetPassword", 1, a, !1);
            md("Wilddog.resetPassword", a, "email");
            H("Wilddog.resetPassword", 2, b, !0);
            var c = new B;
            this.B.W.Ed(a, D(c, b));
            return c.f };
        V.prototype.resetPassword = V.prototype.Ed;

        function xb(a, b) { z(!b || !0 === a || !1 === a, "Can't turn on custom loggers persistently.");!0 === a ? ("undefined" !== typeof console && ("function" === typeof console.log ? vb = r(console.log, console) : "object" === typeof console.log && (vb = function(a) { console.log(a) })), b && y.set("logging_enabled", !0)) : a ? vb = a : (vb = null, y.remove("logging_enabled")) }
        var qb = CLIENT_VERSION;
        V.prototype.goOffline = function() { F("Wilddog.goOffline", 0, 0, arguments.length);
            si.tb().cb(this.app) };
        V.prototype.goOnline = function() { F("Wilddog.goOnline", 0, 0, arguments.length);
            si.tb().Eb(this.app) };
        V.prototype.enableLogging = xb;
        V.prototype.ServerValue = { TIMESTAMP: { ".sv": "timestamp" } };
        V.prototype.SDK_VERSION = qb;
        V.prototype.INTERNAL = W;
        V.prototype.TEST_ACCESS = Z;
        var Mi = { we: {} };
        Mi.we.all = {};
        Mi = Ud();
        (function(a) {
            a.auth = a.auth ? a.auth : {};
            [{ id: "password", name: "Email", Kb: "email", Lb: "password" }, { id: "qq", name: "QQ", Kb: "accessToken", Lb: "openId" }, { id: "weibo", name: "Weibo", Kb: "accessToken", Lb: "openId" }, { id: "weixin", name: "Weixin", Kb: "accessToken", Lb: "openId" }, { id: "weixinmp", name: "Weixinmp", Kb: "accessToken", Lb: "openId" }].forEach(function(b) {
                a.auth[b.name + "AuthProvider"] = function() { this.id = b.id;
                    this.addScope = function(a) { this.scope = a } };
                a.auth[b.name + "AuthProvider"].credential = function(a, d) {
                    var e = {};
                    e.provider =
                        b.id;
                    e[b.Kb] = a;
                    e[b.Lb] = d;
                    return e
                }
            })
        })(Mi);
        1 != NODE_CLIENT ? ("object" == typeof module && module.exports && (module.exports = Mi), "function" == typeof define && define.amd && define("wilddog", [], function() {
            return Mi }), window ? window.wilddog = Mi : WorkerGlobalScope && self && (self.wilddog = Mi)) : module.exports = Mi;
    };
    ns.wrapper(ns.goog, ns.wd)
})({ goog: {}, wd: {} })
