(function () {
    'use strict';
    var factory = function (/*Hash*/) {

        // This API is used to load a CryptPad editor for a provided document in
        // an external platform.
        // The external platform needs to store a session key and make it
        // available to all users who needs to access the realtime editor.

        var getTxid = function () {
            return Math.random().toString(16).replace('0.', '');
        };

        var makeChan = function (iframe, iOrigin) {
            var handlers = {};
            var commands = {};

            var iWindow = iframe.contentWindow;
            var _sendCb = function (txid, args) {
                iWindow.postMessage({ ack: txid, args: args}, iOrigin);
            };
            var onMsg = function (ev) {
                if (ev.source !== iWindow) { return; }
                var data = ev.data;

                // On ack
                if (data.ack) {
                    if (handlers[data.ack]) {
                        handlers[data.ack](data.args);
                    }
                    return;
                }

                // On new command
                var msg = data.msg;
                var txid = data.txid;
                if (commands[msg.q]) {
                    console.warn('OUTER RECEIVED QUERY', msg.q, msg.data);
                    commands[msg.q](msg.data, function (args) {
                        _sendCb(txid, args);
                    });
                    return;
                }

            };
            window.addEventListener('message', onMsg);

            var send = function (q, data, cb) {
                var txid = getTxid();
                if (cb) { handlers[txid] = cb; }

                console.warn('OUTER SENT QUERY', q, data);
                iWindow.postMessage({ msg: {
                    q: q,
                    data: data,
                }, txid: txid}, iOrigin);
                setTimeout(function () {
                    delete handlers[txid];
                }, 60000);
            };
            var on = function (q, handler) {
                if (typeof(handler) !== "function") { return; }
                commands[q] = handler;
            };

            return {
                send: send,
                on: on
            };
        };

        var start = function (config, chan) {
            return new Promise(function (resolve, reject) {
            setTimeout(function () {
                var key = config.document.key;

                chan.on('SAVE', function (data) {
                    config.events.onSave(data);
                });

                var onKeyValidated = function () {
                    chan.send('START', {
                        key: key,
                        document: config.document.url,
                    }, function (obj) {
                        if (obj && obj.error) { reject(obj.error); return console.error(obj.error); }
                        console.log('OUTER START SUCCESS');
                        resolve({});
                    });
                };

                chan.send('GET_SESSION', {
                    key: key
                }, function (obj) {
                    if (obj && obj.error) { reject(obj.error); return console.error(obj.error); }
                    if (obj.key !== key) {
                        key = obj.key;
                        config.events.onNewKey(key);
                    }
                    onKeyValidated();
                });

            });
            });
        };

        /**
         * Create a CryptPad collaborative editor for the provided document.
         *
         * @param {string} cryptpadURL The URL of the CryptPad server.
         * @param {string} containerID (optional) The ID of the HTML element containing the iframe.
         * @param {object} config The object containing configuration parameters.
         *   @param {object} config.document The document to load.
         *     @param {string} document.url The document URL.
         *     @param {string} document.key The collaborative session key.
         *   @param {object} config.events Event handlers.
         *     @param {function} events.onSave The save function to store the document when edited.
         *     @param {function} events.onNewKey The function called when a new key is used.
         *   @param {string} config.documentType The editor to load in CryptPad.
         * @return {promise}
         */
        var init = function (cryptpadURL, containerId, config) {
            return new Promise(function (resolve, reject) {
            setTimeout(function () {

                if (!cryptpadURL || typeof(cryptpadURL) !== "string") {
                    return reject('Missing arg: cryptpadURL');
                }
                var container;
                if (containerId) {
                    container = document.getElementById('containerId');
                }
                if (!container) {
                    console.warn('No container provided, append to body');
                    container = document.body;
                }

                if (!config) { return reject('Missing args: no data provided'); }
                ['document.url', 'document.key', 'documentType',
                    'events.onSave', 'events.onNewKey'].some(function (k) {
                    var s = k.split('.');
                    var c = config;
                    return s.some(function (key) {
                        if (!c[key]) {
                            reject(`Missing args: no "config.${k}" provided`);
                            return true;
                        }
                        c = c[key];
                    });
                });

                cryptpadURL = cryptpadURL.replace(/(\/)+$/, '');
                var url = cryptpadURL + '/integration/';
                var parsed;
                try {
                    parsed = new URL(url);
                } catch (e) {
                    console.error(e);
                    return reject('Invalid arg: cryptpadURL');
                }

                var iframe = document.createElement('iframe');
                iframe.setAttribute('id', 'cryptpad-editor');
                iframe.setAttribute("src", url);
                container.appendChild(iframe);

                var onMsg = function (msg) {
                    var data = typeof(msg.data) === "string" ? JSON.parse(msg.data) : msg.data;
                    if (!data || data.q !== 'INTEGRATION_READY') { return; }
                    window.removeEventListener('message', onMsg);
                    var chan = makeChan(iframe, parsed.origin);
                    start(config, chan).then(resolve).catch(reject);
                };
                window.addEventListener('message', onMsg);

            });
            });
        };

        return init;
    };



    if (typeof(module) !== 'undefined' && module.exports) {
        module.exports = factory();
    } else if ((typeof(define) !== 'undefined' && define !== null) && (define.amd !== null)) {
        define([], function () {
            return factory();
        });
    } else {
        window.CryptPadAPI = factory();
    }
}());

