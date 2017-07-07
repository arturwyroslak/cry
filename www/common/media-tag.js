(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === "object" && typeof module === "object") module.exports = factory(); else if (typeof define === "function" && define.amd) define([], factory); else if (typeof exports === "object") exports["MediaTag"] = factory(); else root["MediaTag"] = factory();
})(this, function() {
    return function(modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) {
                return installedModules[moduleId].exports;
            }
            var module = installedModules[moduleId] = {
                i: moduleId,
                l: false,
                exports: {}
            };
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            module.l = true;
            return module.exports;
        }
        __webpack_require__.m = modules;
        __webpack_require__.c = installedModules;
        __webpack_require__.i = function(value) {
            return value;
        };
        __webpack_require__.d = function(exports, name, getter) {
            if (!__webpack_require__.o(exports, name)) {
                Object.defineProperty(exports, name, {
                    configurable: false,
                    enumerable: true,
                    get: getter
                });
            }
        };
        __webpack_require__.n = function(module) {
            var getter = module && module.__esModule ? function getDefault() {
                return module["default"];
            } : function getModuleExports() {
                return module;
            };
            __webpack_require__.d(getter, "a", getter);
            return getter;
        };
        __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        __webpack_require__.p = "";
        return __webpack_require__(__webpack_require__.s = 95);
    }([ function(module, exports, __webpack_require__) {
        "use strict";
        var Identifier = {
            IMAGE: "image",
            AUDIO: "audio",
            VIDEO: "video",
            PDF: "pdf",
            DASH: "dash",
            DOWNLOAD: "download",
            CRYPTO: "crypto",
            CLEAR_KEY: "clear-key",
            MEDIA_OBJECT: "media-object"
        };
        module.exports = Identifier;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var Type = {
            MATCHER: "matcher",
            RENDERER: "renderer",
            FILTER: "filter",
            SANITIZER: "sanitizer"
        };
        module.exports = Type;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var ProcessingEngine = __webpack_require__(34);
        var MatchingEngine = __webpack_require__(33);
        var PluginStore = __webpack_require__(53);
        var UriStore = __webpack_require__(54);
        var MediaTag = __webpack_require__(31);
        function MediaTagAPI(elements) {
            if (elements instanceof Array) {
                var mediaObjects = [];
                elements.forEach(function(element) {
                    if (element.mediaObject) {
                        mediaObjects.push(element.mediaObject);
                    } else {
                        var _mediaTag = new MediaTag(element, MediaTagAPI.processingEngine);
                        _mediaTag.mediaObjects.forEach(function(mediaObject) {
                            mediaObjects.push(MediaTagAPI.processingEngine.start(mediaObject));
                        });
                    }
                });
                return mediaObjects;
            }
            var element = elements;
            var mediaTag = new MediaTag(element, MediaTagAPI.processingEngine);
            mediaTag.mediaObjects.forEach(function(mediaObject) {
                MediaTagAPI.processingEngine.start(mediaObject);
            });
        }
        MediaTagAPI.pluginStore = MediaTagAPI.pluginStore || new PluginStore();
        MediaTagAPI.uriStore = MediaTagAPI.uriStore || new UriStore("../plugins");
        MediaTagAPI.processingEngine = MediaTagAPI.processingEngine || new ProcessingEngine(MediaTagAPI.pluginStore);
        MediaTagAPI.matchingEngine = MediaTagAPI.matchingEngine || new MatchingEngine(MediaTagAPI.pluginStore, MediaTagAPI.uriStore);
        MediaTagAPI.loadingEngine = null;
        module.exports = MediaTagAPI;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Type = __webpack_require__(1);
        var Occurrence = __webpack_require__(5);
        var Plugin = __webpack_require__(6);
        var Matcher = function(_Plugin) {
            _inherits(Matcher, _Plugin);
            function Matcher(identifier, targetType) {
                _classCallCheck(this, Matcher);
                var _this = _possibleConstructorReturn(this, (Matcher.__proto__ || Object.getPrototypeOf(Matcher)).call(this, identifier, Type.MATCHER, Occurrence.ANY));
                _this.targetType = targetType;
                return _this;
            }
            _createClass(Matcher, [ {
                key: "getTargetType",
                value: function getTargetType() {
                    return this.targetType;
                }
            } ]);
            return Matcher;
        }(Plugin);
        module.exports = Matcher;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Type = __webpack_require__(1);
        var Occurrence = __webpack_require__(5);
        var Plugin = __webpack_require__(6);
        var Renderer = function(_Plugin) {
            _inherits(Renderer, _Plugin);
            function Renderer(identifier) {
                _classCallCheck(this, Renderer);
                return _possibleConstructorReturn(this, (Renderer.__proto__ || Object.getPrototypeOf(Renderer)).call(this, identifier, Type.RENDERER, Occurrence.ONCE));
            }
            return Renderer;
        }(Plugin);
        module.exports = Renderer;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var Occurrence = {
            EVERY: "every",
            ANY: "any",
            ONCE: "once"
        };
        module.exports = Occurrence;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var Plugin = function() {
            function Plugin(identifier, type, occurrence) {
                _classCallCheck(this, Plugin);
                this.identifier = identifier;
                this.type = type;
                this.occurrence = occurrence;
            }
            _createClass(Plugin, [ {
                key: "getIdentifier",
                value: function getIdentifier() {
                    if (this.identifier) {
                        return this.identifier;
                    }
                    throw new Error("Plugin has not identifier");
                }
            }, {
                key: "getType",
                value: function getType() {
                    if (this.type) {
                        return this.type;
                    }
                    throw new Error("Plugin has no type");
                }
            }, {
                key: "start",
                value: function start(mediaObject) {
                    return this.process(mediaObject);
                }
            } ]);
            return Plugin;
        }();
        module.exports = Plugin;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Filter = __webpack_require__(12);
        var Identifier = __webpack_require__(0);
        var Store = __webpack_require__(10);
        var CryptoFilter = function(_Filter) {
            _inherits(CryptoFilter, _Filter);
            function CryptoFilter() {
                _classCallCheck(this, CryptoFilter);
                return _possibleConstructorReturn(this, (CryptoFilter.__proto__ || Object.getPrototypeOf(CryptoFilter)).call(this, Identifier.CRYPTO));
            }
            _createClass(CryptoFilter, [ {
                key: "process",
                value: function process(mediaObject) {
                    var dataCryptoKey = mediaObject.getAttribute("data-crypto-key");
                    var schemes = /\w+:/.exec(dataCryptoKey);
                    if (schemes === null) {
                        throw new Error("No algorithm scheme found in data-crypto-key");
                    }
                    var algorithmScheme = schemes[0];
                    var algorithmName = algorithmScheme.replace(":", "");
                    var stringKey = dataCryptoKey.replace(algorithmScheme, "");
                    mediaObject.setAttribute("data-crypto-key", stringKey);
                    if (CryptoFilter.functionStore.isStored(algorithmName)) {
                        var algorithm = CryptoFilter.functionStore.get(algorithmName);
                        algorithm(mediaObject);
                    } else {
                        throw new Error("Algorithm " + algorithmName + " is not registered");
                    }
                }
            } ]);
            return CryptoFilter;
        }(Filter);
        CryptoFilter.functionStore = CryptoFilter.functionStore || new Store();
        CryptoFilter.mediaTypes = [];
        CryptoFilter.setAllowedMediaTypes = function(mediaTypes) {
            CryptoFilter.mediaTypes = mediaTypes;
        };
        CryptoFilter.getAllowedMediaTypes = function() {
            return CryptoFilter.mediaTypes;
        };
        CryptoFilter.addAllowedMediaType = function(mediaType) {
            CryptoFilter.mediaTypes.push(mediaType);
        };
        CryptoFilter.addAllAllowedMediaTypes = function(mediaTypes) {
            mediaTypes.forEach(function(mediaType) {
                CryptoFilter.addAllowedMediaType(mediaType);
            });
        };
        CryptoFilter.removeAllowedMediaType = function(mediaType) {
            var index = CryptoFilter.mediaTypes.indexOf(mediaType);
            if (index >= 0) {
                CryptoFilter.mediaTypes.splice(index, 1);
            }
        };
        CryptoFilter.removeAllAllowedMediaTypes = function(mediaTypes) {
            mediaTypes.forEach(function(mediaType) {
                CryptoFilter.removeAllowedMediaType(mediaType);
            });
        };
        CryptoFilter.isAllowedMediaType = function(mediaType) {
            return CryptoFilter.mediaTypes.some(function(type) {
                return type === mediaType;
            });
        };
        module.exports = CryptoFilter;
    }, , function(module, exports, __webpack_require__) {
        "use strict";
        var hide = __webpack_require__(13);
        var show = __webpack_require__(14);
        module.exports = function(mediaObjectToActivate, mediaTag) {
            mediaTag.mediaObjects.forEach(function(mediaObject) {
                hide(mediaObject);
            });
            mediaTag.activeMediaObject = mediaObjectToActivate;
            show(mediaObjectToActivate);
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var Store = function() {
            function Store() {
                _classCallCheck(this, Store);
                this.map = {};
            }
            _createClass(Store, [ {
                key: "isStored",
                value: function isStored(key) {
                    if (this.get(key)) {
                        return true;
                    }
                    return false;
                }
            }, {
                key: "store",
                value: function store(key, value) {
                    if (this.isStored(key)) {
                        console.warn('The key "' + key + '" is already registered, the content will be overwritten.');
                    }
                    this.map[key] = value;
                }
            }, {
                key: "unstore",
                value: function unstore(key) {
                    if (this.isStored(key) === false) {
                        console.warn('The key "' + key + '" not exists in this manager');
                    } else {
                        var value = this.map[key];
                        delete this.map[key];
                        return value;
                    }
                }
            }, {
                key: "get",
                value: function get(key) {
                    return this.map[key];
                }
            }, {
                key: "keys",
                value: function keys() {
                    return Object.keys(this.map);
                }
            }, {
                key: "values",
                value: function values() {
                    var _this = this;
                    var keys = this.keys();
                    return keys.map(function(key) {
                        return _this.get(key);
                    });
                }
            } ]);
            return Store;
        }();
        module.exports = Store;
    }, , function(module, exports, __webpack_require__) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Type = __webpack_require__(1);
        var Occurrence = __webpack_require__(5);
        var Plugin = __webpack_require__(6);
        var Filter = function(_Plugin) {
            _inherits(Filter, _Plugin);
            function Filter(identifier) {
                _classCallCheck(this, Filter);
                return _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, identifier, Type.FILTER, Occurrence.ANY));
            }
            return Filter;
        }(Plugin);
        module.exports = Filter;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        module.exports = function(mediaObject) {
            mediaObject.element.style.display = "none";
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;
            try {
                for (var _iterator = mediaObject.hookedFns.children()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var child = _step.value;
                    child.style.display = "none";
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        module.exports = function(mediaObject) {
            mediaObject.element.style.display = "block";
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;
            try {
                for (var _iterator = mediaObject.hookedFns.children()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var child = _step.value;
                    child.style.display = "block";
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var AttributesObject = function() {
            function AttributesObject(element) {
                var _this = this;
                _classCallCheck(this, AttributesObject);
                Object.keys(element.attributes).forEach(function(key) {
                    _this[element.attributes[key].name] = element.attributes[key].value;
                });
            }
            _createClass(AttributesObject, [ {
                key: "getAttribute",
                value: function getAttribute(attribute) {
                    return this[attribute];
                }
            }, {
                key: "setAttribute",
                value: function setAttribute(attribute, value) {
                    this[attribute] = value;
                }
            }, {
                key: "removeAttribute",
                value: function removeAttribute(attribute) {
                    delete this[attribute];
                }
            }, {
                key: "hasAttributes",
                value: function hasAttributes() {
                    return Object.keys(this) > 0;
                }
            } ]);
            return AttributesObject;
        }();
        module.exports = AttributesObject;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Errors = {
            PluginExists: function(_Error) {
                _inherits(PluginExists, _Error);
                function PluginExists(objPlugin) {
                    _classCallCheck(this, PluginExists);
                    return _possibleConstructorReturn(this, (PluginExists.__proto__ || Object.getPrototypeOf(PluginExists)).call(this, 'Plugin with same "' + objPlugin.identifier + '" identifier found.'));
                }
                return PluginExists;
            }(Error),
            TypeNotFound: function(_Error2) {
                _inherits(TypeNotFound, _Error2);
                function TypeNotFound() {
                    _classCallCheck(this, TypeNotFound);
                    return _possibleConstructorReturn(this, (TypeNotFound.__proto__ || Object.getPrototypeOf(TypeNotFound)).call(this, "Media Tag could not find the content type of an instance.}."));
                }
                return TypeNotFound;
            }(Error),
            FilterExists: function(_Error3) {
                _inherits(FilterExists, _Error3);
                function FilterExists(filter) {
                    _classCallCheck(this, FilterExists);
                    return _possibleConstructorReturn(this, (FilterExists.__proto__ || Object.getPrototypeOf(FilterExists)).call(this, 'Filter with same "' + filter.identifier + ' identifier found."'));
                }
                return FilterExists;
            }(Error),
            FetchFail: function(_Error4) {
                _inherits(FetchFail, _Error4);
                function FetchFail(response) {
                    _classCallCheck(this, FetchFail);
                    return _possibleConstructorReturn(this, (FetchFail.__proto__ || Object.getPrototypeOf(FetchFail)).call(this, 'Could not fetch "' + response.url + '", received "' + response.status + ": " + response.statusText + '".'));
                }
                return FetchFail;
            }(Error),
            InvalidCryptoKey: function(_Error5) {
                _inherits(InvalidCryptoKey, _Error5);
                function InvalidCryptoKey() {
                    _classCallCheck(this, InvalidCryptoKey);
                    return _possibleConstructorReturn(this, (InvalidCryptoKey.__proto__ || Object.getPrototypeOf(InvalidCryptoKey)).call(this, "Invalid cryptographic key."));
                }
                return InvalidCryptoKey;
            }(Error),
            InvalidCryptoLib: function(_Error6) {
                _inherits(InvalidCryptoLib, _Error6);
                function InvalidCryptoLib() {
                    _classCallCheck(this, InvalidCryptoLib);
                    return _possibleConstructorReturn(this, (InvalidCryptoLib.__proto__ || Object.getPrototypeOf(InvalidCryptoLib)).call(this, "Invalid cryptographic algorithm name."));
                }
                return InvalidCryptoLib;
            }(Error),
            FailedCrypto: function(_Error7) {
                _inherits(FailedCrypto, _Error7);
                function FailedCrypto(err) {
                    _classCallCheck(this, FailedCrypto);
                    return _possibleConstructorReturn(this, (FailedCrypto.__proto__ || Object.getPrototypeOf(FailedCrypto)).call(this, "Failed to decrypt file" + (err && err.message ? " " + err.message : "") + "."));
                }
                return FailedCrypto;
            }(Error)
        };
        module.exports = Errors;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var Permission = {
            ALLOWED: 0,
            REQUIRED: 1,
            FORBIDDEN: 2
        };
        module.exports = Permission;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var Assert = function() {
            function Assert(truth) {
                _classCallCheck(this, Assert);
                this.truth = truth;
            }
            _createClass(Assert, [ {
                key: "is",
                value: function is(predicate) {
                    if (this.truth === predicate) {
                        return this;
                    }
                    throw new Error("Assertion fail on : " + this.truth + " is " + predicate);
                }
            }, {
                key: "not",
                value: function not(predicate) {
                    if (this.truth !== predicate) {
                        return this;
                    }
                    throw new Error("Assertion fail on : " + this.truth + " is not " + predicate);
                }
            } ], [ {
                key: "that",
                value: function that(truth) {
                    return new Assert(truth);
                }
            } ]);
            return Assert;
        }();
        module.exports = Assert;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var MediaTag = __webpack_require__(52);
        var ImagePlugin = __webpack_require__(48);
        var AudioPlugin = __webpack_require__(45);
        var VideoPlugin = __webpack_require__(50);
        var PdfPlugin = __webpack_require__(49);
        var DashPlugin = __webpack_require__(46);
        var DownloadPlugin = __webpack_require__(47);
        var CryptoFilter = __webpack_require__(7);
        var ClearKeyFilter = __webpack_require__(35);
        var MediaObjectSanitizer = __webpack_require__(51);
        MediaTag.pluginStore.store(new ImagePlugin());
        MediaTag.pluginStore.store(new AudioPlugin());
        MediaTag.pluginStore.store(new VideoPlugin());
        MediaTag.pluginStore.store(new PdfPlugin());
        MediaTag.pluginStore.store(new DashPlugin());
        MediaTag.pluginStore.store(new DownloadPlugin());
        MediaTag.pluginStore.store(new CryptoFilter());
        MediaTag.pluginStore.store(new ClearKeyFilter());
        MediaTag.pluginStore.store(new MediaObjectSanitizer());
        var Salsa20Poly1305Algorithm = __webpack_require__(28);
        var CryptpadAlgorithm = __webpack_require__(27);
        CryptoFilter.functionStore.store("salsa20poly1305", Salsa20Poly1305Algorithm);
        CryptoFilter.functionStore.store("cryptpad", CryptpadAlgorithm);
        var defaultPlugin = new DownloadPlugin("<p> MediaTag cannot find a plugin able to renderer your content </p>", "Download");
        MediaTag.processingEngine.setDefaultPlugin(defaultPlugin);
        MediaTag.CryptoFilter = CryptoFilter;
        var allowedMediaTypes = [ "image/png", "image/jpeg", "image/jpg", "image/gif", "audio/mp3", "audio/ogg", "audio/wav", "audio/webm", "video/mp4", "video/ogg", "video/webm", "application/pdf", "application/dash+xml", "download" ];
        MediaTag.CryptoFilter.setAllowedMediaTypes(allowedMediaTypes);
        var Configuration = __webpack_require__(29);
        var Permission = __webpack_require__(17);
        var Identifier = __webpack_require__(0);
        var configuration = new Configuration();
        MediaTag.PdfPlugin = PdfPlugin;
        MediaTag.PdfPlugin.viewer = "/pdfjs/web/viewer.html";
        MediaTag.processingEngine.configure(configuration);
        module.exports = MediaTag;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Type = __webpack_require__(1);
        var Occurrence = __webpack_require__(5);
        var Plugin = __webpack_require__(6);
        var Sanitizer = function(_Plugin) {
            _inherits(Sanitizer, _Plugin);
            function Sanitizer(identifier) {
                _classCallCheck(this, Sanitizer);
                return _possibleConstructorReturn(this, (Sanitizer.__proto__ || Object.getPrototypeOf(Sanitizer)).call(this, identifier, Type.SANITIZER, Occurrence.EVERY));
            }
            return Sanitizer;
        }(Plugin);
        module.exports = Sanitizer;
    }, , , function(module, exports, __webpack_require__) {
        "use strict";
        var Action = {
            clear: __webpack_require__(24),
            show: __webpack_require__(14),
            hide: __webpack_require__(13),
            upgrade: __webpack_require__(26),
            downgrade: __webpack_require__(25),
            activate: __webpack_require__(9)
        };
        module.exports = Action;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        module.exports = function(mediaObject) {
            mediaObject.clearContents();
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var activate = __webpack_require__(9);
        module.exports = function(mediaTag) {
            var index = mediaTag.mediaObjects.indexOf(mediaTag.activeMediaObject);
            if (index > 0) {
                activate(mediaTag.mediaObjects[index - 1], mediaTag);
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var activate = __webpack_require__(9);
        module.exports = function(mediaTag) {
            var index = mediaTag.mediaObjects.indexOf(mediaTag.activeMediaObject);
            if (index < mediaTag.mediaObjects.length) {
                activate(mediaTag.mediaObjects[index + 1], mediaTag);
            }
        };
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var Errors = __webpack_require__(16);
        var MediaTag = __webpack_require__(2);
        var CryptoFilter = __webpack_require__(7);
        var PARANOIA = true;
        var plainChunkLength = 128 * 1024;
        var cypherChunkLength = 131088;
        var Cryptopad = function() {
            function Cryptopad() {
                _classCallCheck(this, Cryptopad);
            }
            _createClass(Cryptopad, null, [ {
                key: "createNonce",
                value: function createNonce() {
                    return new Uint8Array(new Array(24).fill(0));
                }
            }, {
                key: "increment",
                value: function increment(N) {
                    var l = N.length;
                    while (l-- > 1) {
                        if (PARANOIA) {
                            if (typeof N[l] !== "number") {
                                throw new Error("E_UNSAFE_TYPE");
                            }
                            if (N[l] > 255) {
                                throw new Error("E_OUT_OF_BOUNDS");
                            }
                        }
                        if (N[l] !== 255) {
                            return void N[l]++;
                        }
                        N[l] = 0;
                        if (l === 0) {
                            throw new Error("E_NONCE_TOO_LARGE");
                        }
                    }
                }
            }, {
                key: "encodePrefix",
                value: function encodePrefix(p) {
                    return [ 65280, 255 ].map(function(n, i) {
                        return (p & n) >> (1 - i) * 8;
                    });
                }
            }, {
                key: "decodePrefix",
                value: function decodePrefix(A) {
                    return A[0] << 8 | A[1];
                }
            }, {
                key: "joinChunks",
                value: function joinChunks(chunks) {
                    return new Blob(chunks);
                }
            }, {
                key: "slice",
                value: function slice(u8) {
                    return Array.prototype.slice.call(u8);
                }
            }, {
                key: "getRandomKeyStr",
                value: function getRandomKeyStr() {
                    var Nacl = Cryptopad.Nacl;
                    var rdm = Nacl.randomBytes(18);
                    return Nacl.util.encodeBase64(rdm);
                }
            }, {
                key: "getKeyFromStr",
                value: function getKeyFromStr(str) {
                    return Cryptopad.Nacl.util.decodeBase64(str);
                }
            }, {
                key: "encrypt",
                value: function encrypt(u8, key) {
                    var array = u8;
                    var nonce = Cryptopad.Nacl.randomBytes(24);
                    var packed = Cryptopad.Nacl.secretbox(array, nonce, key);
                    if (packed) {
                        return new Uint8Array(Cryptopad.slice(nonce).concat(Cryptopad.slice(packed)));
                    }
                    throw new Error();
                }
            }, {
                key: "decrypt",
                value: function decrypt(u8, key, done) {
                    var Nacl = Cryptopad.Nacl;
                    var progress = function progress(offset) {
                        var ev = new Event("decryptionProgress");
                        ev.percent = offset / u8.length * 100;
                        window.document.dispatchEvent(ev);
                    };
                    var nonce = Cryptopad.createNonce();
                    var i = 0;
                    var prefix = u8.subarray(0, 2);
                    var metadataLength = Cryptopad.decodePrefix(prefix);
                    var res = {
                        metadata: undefined
                    };
                    var metaBox = new Uint8Array(u8.subarray(2, 2 + metadataLength));
                    var metaChunk = Nacl.secretbox.open(metaBox, nonce, key);
                    Cryptopad.increment(nonce);
                    try {
                        res.metadata = JSON.parse(Nacl.util.encodeUTF8(metaChunk));
                    } catch (e) {
                        return done("E_METADATA_DECRYPTION");
                    }
                    if (!res.metadata) {
                        return done("NO_METADATA");
                    }
                    var takeChunk = function takeChunk(cb) {
                        setTimeout(function() {
                            var start = i * cypherChunkLength + 2 + metadataLength;
                            var end = start + cypherChunkLength;
                            i++;
                            var box = new Uint8Array(u8.subarray(start, end));
                            var plaintext = Nacl.secretbox.open(box, nonce, key);
                            Cryptopad.increment(nonce);
                            if (!plaintext) {
                                return void cb("DECRYPTION_FAILURE");
                            }
                            progress(Math.min(end, u8.length));
                            cb(void 0, plaintext);
                        });
                    };
                    var chunks = [];
                    var again = function again() {
                        takeChunk(function(e, plaintext) {
                            if (e) {
                                return setTimeout(function() {
                                    done(e);
                                });
                            }
                            if (plaintext) {
                                if (i * cypherChunkLength < u8.length) {
                                    chunks.push(plaintext);
                                    return again();
                                }
                                chunks.push(plaintext);
                                res.content = Cryptopad.joinChunks(chunks);
                                return done(void 0, res);
                            }
                            done("UNEXPECTED_ENDING");
                        });
                    };
                    again();
                }
            } ]);
            return Cryptopad;
        }();
        Cryptopad.Nacl = window.nacl;
        var DataManager = function() {
            function DataManager() {
                _classCallCheck(this, DataManager);
            }
            _createClass(DataManager, null, [ {
                key: "getArrayBuffer",
                value: function getArrayBuffer(url) {
                    return fetch(url).then(function(response) {
                        if (response.ok) {
                            return response.arrayBuffer();
                        }
                        throw new Errors.FetchFails();
                    }).then(function(arrayBuffer) {
                        return arrayBuffer;
                    });
                }
            }, {
                key: "createUrl",
                value: function createUrl(arrayBuffer) {
                    return window.URL.createObjectURL(arrayBuffer);
                }
            }, {
                key: "getBlobUrl",
                value: function getBlobUrl(data, mtype) {
                    return window.URL.createObjectURL(new Blob([ data ], {
                        type: mtype
                    }));
                }
            }, {
                key: "getDataUrl",
                value: function getDataUrl(data, mtype) {
                    return "data:" + mtype + ";base64," + Cryptopad.Nacl.util.encodeBase64(data);
                }
            } ]);
            return DataManager;
        }();
        function applyMetadata(mediaObject, metadata) {
            var info = metadata.type.split("/");
            var mime = metadata.type;
            var type = info[0];
            var extension = info[1];
            if (CryptoFilter.isAllowedMediaType(mime)) {
                mediaObject.setAttribute("data-type", metadata.type);
                mediaObject.type = type;
                mediaObject.extension = extension;
                mediaObject.mime = mime;
            } else {
                console.log("Not allowed metadata, allowed ones are : ", CryptoFilter.getAllowedMediaTypes());
            }
            mediaObject.name = metadata.name;
            mediaObject.setAttribute("data-attr-type", metadata.type);
        }
        function algorithm(mediaObject) {
            var src = mediaObject.getAttribute("src");
            var strKey = mediaObject.getAttribute("data-crypto-key");
            var cryptoKey = Cryptopad.getKeyFromStr(strKey);
            var xhr = new XMLHttpRequest();
            xhr.open("GET", src, true);
            xhr.responseType = "arraybuffer";
            var fail = function fail(err) {
                var decryptionErrorEvent = new Event("decryptionError");
                decryptionErrorEvent.message = typeof err === "string" ? err : err.message;
                window.document.dispatchEvent(decryptionErrorEvent);
            };
            xhr.onload = function() {
                if (/^4/.test("" + this.status)) {
                    return fail("XHR_ERROR", "" + this.status);
                }
                var arrayBuffer = xhr.response;
                if (arrayBuffer) {
                    var u8 = new Uint8Array(arrayBuffer);
                    Cryptopad.decrypt(u8, cryptoKey, function(err, decrypted) {
                        if (err) {
                            return fail(err);
                        }
                        var decryptionEvent = new Event("decryption");
                        decryptionEvent.metadata = decrypted.metadata;
                        applyMetadata(mediaObject, decrypted.metadata);
                        var binStr = decrypted.content;
                        var url = DataManager.getBlobUrl(binStr, mediaObject.getMimeType());
                        decryptionEvent.blob = new Blob([ binStr ], {
                            type: mediaObject.getMimeType()
                        });
                        mediaObject.setAttribute("src", url);
                        mediaObject.removeAttribute("data-crypto-key");
                        decryptionEvent.callback = function() {
                            MediaTag.processingEngine.return(mediaObject);
                        };
                        window.document.dispatchEvent(decryptionEvent);
                    });
                }
            };
            xhr.send(null);
        }
        module.exports = algorithm;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var Errors = __webpack_require__(16);
        var MediaTag = __webpack_require__(2);
        var CryptoFilter = __webpack_require__(7);
        var Crypto = function() {
            function Crypto() {
                _classCallCheck(this, Crypto);
            }
            _createClass(Crypto, null, [ {
                key: "slice",
                value: function slice(u8) {
                    return Array.prototype.slice.call(u8);
                }
            }, {
                key: "getRandomKeyStr",
                value: function getRandomKeyStr() {
                    var Nacl = Crypto.Nacl;
                    var rdm = Nacl.randomBytes(18);
                    return Nacl.util.encodeBase64(rdm);
                }
            }, {
                key: "getKeyFromStr",
                value: function getKeyFromStr(str) {
                    var Nacl = Crypto.Nacl;
                    var hash = Nacl.hash(Nacl.util.decodeBase64(str));
                    return hash.subarray(32, 64);
                }
            }, {
                key: "encrypt",
                value: function encrypt(u8, key) {
                    var array = u8;
                    var nonce = Crypto.Nacl.randomBytes(24);
                    var packed = Crypto.Nacl.secretbox(array, nonce, key);
                    if (packed) {
                        return new Uint8Array(Crypto.slice(nonce).concat(Crypto.slice(packed)));
                    }
                    throw new Error();
                }
            }, {
                key: "decrypt",
                value: function decrypt(u8, key) {
                    if (u8.length < 24) {
                        throw new Error();
                    }
                    var slice = Crypto.slice;
                    var Nacl = Crypto.Nacl;
                    var nonce = new Uint8Array(slice(u8).slice(0, 24));
                    var packed = new Uint8Array(slice(u8).slice(24));
                    var unpacked = Nacl.secretbox.open(packed, nonce, key);
                    if (unpacked) {
                        return unpacked;
                    }
                    throw new Error("Decrypted file in undefined");
                }
            } ]);
            return Crypto;
        }();
        Crypto.Nacl = window.nacl;
        var DataManager = function() {
            function DataManager() {
                _classCallCheck(this, DataManager);
            }
            _createClass(DataManager, null, [ {
                key: "getArrayBuffer",
                value: function getArrayBuffer(url) {
                    return fetch(url).then(function(response) {
                        if (response.ok) {
                            return response.arrayBuffer();
                        }
                        throw new Errors.FetchFails();
                    }).then(function(arrayBuffer) {
                        return arrayBuffer;
                    });
                }
            }, {
                key: "createUrl",
                value: function createUrl(arrayBuffer) {
                    return window.URL.createObjectURL(arrayBuffer);
                }
            }, {
                key: "getBlobUrl",
                value: function getBlobUrl(data, mtype) {
                    return window.URL.createObjectURL(new Blob([ data ], {
                        type: mtype
                    }));
                }
            }, {
                key: "getDataUrl",
                value: function getDataUrl(data, mtype) {
                    return "data:" + mtype + ";base64," + Crypto.Nacl.util.encodeBase64(data);
                }
            } ]);
            return DataManager;
        }();
        function applyMetadata(mediaObject, metadata) {
            if (CryptoFilter.isAllowedMediaType(metadata.type)) {
                mediaObject.setAttribute("data-type", metadata.type);
                mediaObject.type = metadata.type;
                mediaObject.extension = metadata.extension;
                mediaObject.mime = metadata.mime;
            }
        }
        function algorithm(mediaObject) {
            var src = mediaObject.getAttribute("src");
            var strKey = mediaObject.getAttribute("data-crypto-key");
            var cryptoKey = Crypto.getKeyFromStr(strKey);
            var xhr = new XMLHttpRequest();
            xhr.open("GET", src, true);
            xhr.responseType = "arraybuffer";
            xhr.onload = function() {
                var arrayBuffer = xhr.response;
                if (arrayBuffer) {
                    var u8 = new Uint8Array(arrayBuffer);
                    var binStr = Crypto.decrypt(u8, cryptoKey);
                    var url = DataManager.getBlobUrl(binStr, mediaObject.getMimeType());
                    var decryptionEvent = new Event("decryption");
                    decryptionEvent.blob = new Blob([ binStr ], {
                        type: mediaObject.getMimeType()
                    });
                    window.document.dispatchEvent(decryptionEvent);
                    mediaObject.setAttribute("src", url);
                    mediaObject.removeAttribute("data-crypto-key");
                    if (!mediaObject.hasAttribute("data-type")) {
                        applyMetadata(mediaObject, {
                            type: "image",
                            extension: "png",
                            mime: "image/png"
                        });
                    }
                    MediaTag.processingEngine.return(mediaObject);
                }
            };
            xhr.send(null);
        }
        module.exports = algorithm;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var Configuration = function() {
            function Configuration(data) {
                _classCallCheck(this, Configuration);
                this.data = data || {};
            }
            _createClass(Configuration, [ {
                key: "getPermission",
                value: function getPermission(identifier) {
                    return this.data[identifier];
                }
            }, {
                key: "setPermission",
                value: function setPermission(identifier, permission) {
                    this.data[identifier] = permission;
                }
            }, {
                key: "getData",
                value: function getData() {
                    return this.data;
                }
            } ]);
            return Configuration;
        }();
        module.exports = Configuration;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var AttributesObject = __webpack_require__(15);
        var Parser = __webpack_require__(32);
        var MediaObject = function() {
            function MediaObject(rootElement) {
                _classCallCheck(this, MediaObject);
                this.id = MediaObject.uid();
                this.element = rootElement;
                this.state = "idle";
                this.attributesObject = new AttributesObject(rootElement);
                var properties = Parser.parse(this.attributesObject);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;
                try {
                    for (var _iterator = Object.keys(properties)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var property = _step.value;
                        this[property] = properties[property];
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
                this.hookedFns = {
                    hasChildNodes: rootElement.hasChildNodes.bind(rootElement),
                    removeChild: rootElement.removeChild.bind(rootElement),
                    getLastChild: function getLastChild() {
                        return rootElement.lastChild;
                    },
                    appendChild: rootElement.appendChild.bind(rootElement),
                    children: function children() {
                        return rootElement.children;
                    }
                };
            }
            _createClass(MediaObject, [ {
                key: "setProperties",
                value: function setProperties(properties) {
                    for (var key in properties) {
                        if (this[key]) {
                            throw new Error("The property " + key + " already exists in this MediaObject !");
                        }
                        this[key] = properties[key];
                    }
                }
            }, {
                key: "getId",
                value: function getId() {
                    return this.id;
                }
            }, {
                key: "getAttribute",
                value: function getAttribute(attrName) {
                    return this.attributesObject[attrName];
                }
            }, {
                key: "setAttribute",
                value: function setAttribute(name, value) {
                    this.attributesObject[name] = value;
                }
            }, {
                key: "removeAttribute",
                value: function removeAttribute(name) {
                    delete this.attributesObject[name];
                }
            }, {
                key: "getAllDataAttrKeys",
                value: function getAllDataAttrKeys() {
                    return Object.keys(this.attributesObject).filter(function(field) {
                        return field.startsWith("data-attr");
                    });
                }
            }, {
                key: "getExtension",
                value: function getExtension() {
                    return this.extension;
                }
            }, {
                key: "getMimeType",
                value: function getMimeType() {
                    return this.mime;
                }
            }, {
                key: "hasAttribute",
                value: function hasAttribute(attributeName) {
                    return attributeName in this.attributesObject;
                }
            }, {
                key: "getType",
                value: function getType() {
                    return this.type;
                }
            }, {
                key: "getSource",
                value: function getSource() {
                    return this.src;
                }
            }, {
                key: "getSources",
                value: function getSources() {
                    return this.sources;
                }
            }, {
                key: "clearContents",
                value: function clearContents() {
                    while (this.hookedFns.hasChildNodes()) {
                        this.hookedFns.removeChild(this.hookedFns.getLastChild());
                    }
                }
            }, {
                key: "replaceContents",
                value: function replaceContents(elements) {
                    var _this = this;
                    this.clearContents();
                    elements.forEach(function(element) {
                        return _this.hookedFns.appendChild(element);
                    });
                }
            }, {
                key: "utilsSetAllDataAttributes",
                value: function utilsSetAllDataAttributes(element) {
                    var _this2 = this;
                    var dataAttributes = this.getAllDataAttrKeys();
                    dataAttributes.forEach(function(dataAttr) {
                        return element.setAttribute(dataAttr.substr(10), _this2.getAttribute(dataAttr));
                    });
                }
            }, {
                key: "utilsPassAllDataAttributes",
                value: function utilsPassAllDataAttributes(element) {
                    var _this3 = this;
                    var dataAttributes = this.getAllDataAttrKeys();
                    dataAttributes.forEach(function(dataAttr) {
                        return element.setAttribute(dataAttr, _this3.getAttribute(dataAttr));
                    });
                }
            } ]);
            return MediaObject;
        }();
        MediaObject.uid = function(i) {
            return function() {
                return i++;
            };
        }(0);
        MediaObject.attributesObject = function(element) {
            var attributesObject = {};
            if (element.hasAttributes()) {
                var attributes = element.attributes;
                var keys = Object.keys(attributes);
                keys.forEach(function(key) {
                    var attribute = attributes[key];
                    attributesObject[attribute.name] = attribute.value;
                });
            }
            attributesObject.hasAttribute = function(name) {
                return true && attributesObject[name];
            };
            return attributesObject;
        };
        module.exports = MediaObject;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var Action = __webpack_require__(23);
        var AttributesObject = __webpack_require__(15);
        var MediaObject = __webpack_require__(30);
        var MediaTag = function() {
            function MediaTag(mediaTagElement, processingEngine) {
                var _this = this;
                _classCallCheck(this, MediaTag);
                this.mediaTagElement = mediaTagElement;
                this.processingEngine = processingEngine;
                var attributeObject = new AttributesObject(mediaTagElement);
                var sourcesAttribute = attributeObject.getAttribute("sources") || attributeObject.getAttribute("srcs");
                if (sourcesAttribute) {
                    var sourceObjects = this.extractSourceObjects(sourcesAttribute);
                    var mediaElements = this.extractMediaElements(sourceObjects);
                    this.mediaElements = mediaElements;
                    this.mediaElements.forEach(function(mediaElement) {
                        _this.mediaTagElement.appendChild(mediaElement);
                    });
                    this.mediaObjects = this.createMediaObjects(mediaElements);
                    Action.activate(this.mediaObjects[0], this);
                } else {
                    var mediaObject = new MediaObject(mediaTagElement);
                    this.mediaObjects = [ mediaObject ];
                    this.activeMediaObject = this.mediaObjects[0];
                }
            }
            _createClass(MediaTag, [ {
                key: "extractSourceObjects",
                value: function extractSourceObjects(sourcesAttribute) {
                    return JSON.parse(sourcesAttribute);
                }
            }, {
                key: "extractMediaElements",
                value: function extractMediaElements(sourceObjects) {
                    var _this2 = this;
                    var mediaElements = [];
                    sourceObjects.forEach(function(sourceObject) {
                        mediaElements.push(_this2.extractMediaElement(sourceObject));
                    });
                    return mediaElements;
                }
            }, {
                key: "extractMediaElement",
                value: function extractMediaElement(sourceObject) {
                    var mediaElement = document.createElement("media");
                    Object.keys(sourceObject).forEach(function(attribute) {
                        mediaElement.setAttribute(attribute, sourceObject[attribute]);
                    });
                    return mediaElement;
                }
            }, {
                key: "createMediaObjects",
                value: function createMediaObjects(mediaElements) {
                    var mediaObjects = [];
                    mediaElements.forEach(function(mediaElement) {
                        var mediaObject = new MediaObject(mediaElement);
                        mediaObjects.push(mediaObject);
                    });
                    return mediaObjects;
                }
            } ]);
            return MediaTag;
        }();
        module.exports = MediaTag;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var Parser = function() {
            function Parser() {
                _classCallCheck(this, Parser);
            }
            _createClass(Parser, null, [ {
                key: "extension",
                value: function extension(AttributeObject) {
                    var dataType = AttributeObject.getAttribute("data-type");
                    if (dataType) {
                        return dataType.split("/")[1];
                    }
                    return undefined;
                }
            }, {
                key: "type",
                value: function type(AttributeObject) {
                    var dataType = AttributeObject.getAttribute("data-type");
                    if (dataType) {
                        return dataType.split("/")[0];
                    }
                    return undefined;
                }
            }, {
                key: "mime",
                value: function mime(AttributeObject) {
                    return AttributeObject.getAttribute("data-type");
                }
            }, {
                key: "protocol",
                value: function protocol(AttributeObject) {
                    var array = AttributeObject.getAttribute("src").split("://");
                    if (array.length > 1) {
                        return array[0];
                    }
                    return window.location.protocol;
                }
            }, {
                key: "hostname",
                value: function hostname(AttributeObject) {
                    var array = AttributeObject.getAttribute("src").split("://");
                    if (array.length > 1) {
                        return array[1].split("/")[0];
                    }
                    return window.location.hostname;
                }
            }, {
                key: "source",
                value: function source(AttributeObject) {
                    var source = AttributeObject.getAttribute("src");
                    return source;
                }
            }, {
                key: "schemes",
                value: function schemes(AttributeObject) {
                    return /\w+:/.exec(AttributeObject.getAttribute("src"));
                }
            }, {
                key: "sources",
                value: function sources(AttributeObject) {
                    var sources = AttributeObject.getAttribute("sources") || AttributeObject.getAttribute("srcs");
                    if (sources) {
                        return JSON.parse(sources);
                    }
                    return null;
                }
            }, {
                key: "actions",
                value: function actions(AttributeObject) {
                    var actions = AttributeObject.getAttribute("actions");
                    if (actions) {
                        return JSON.parse(actions);
                    }
                    return null;
                }
            }, {
                key: "parse",
                value: function parse(AttributeObject) {
                    return {
                        protocol: Parser.protocol(AttributeObject),
                        hostname: Parser.hostname(AttributeObject),
                        src: Parser.source(AttributeObject),
                        type: Parser.type(AttributeObject),
                        extension: Parser.extension(AttributeObject),
                        mime: Parser.mime(AttributeObject),
                        sources: Parser.sources(AttributeObject),
                        actions: Parser.actions(AttributeObject)
                    };
                }
            } ]);
            return Parser;
        }();
        module.exports = Parser;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var Assert = __webpack_require__(18);
        var Type = __webpack_require__(1);
        var MatchingEngine = function() {
            function MatchingEngine(pluginStore, uriStore) {
                _classCallCheck(this, MatchingEngine);
                Assert.that(pluginStore).not(undefined);
                Assert.that(uriStore).not(undefined);
                this.pluginStore = pluginStore;
                this.uriStore = uriStore;
            }
            _createClass(MatchingEngine, [ {
                key: "start",
                value: function start(mediaObject) {
                    var _this = this;
                    var matchers = this.pluginStore.getPlugins(Type.MATCHER);
                    var matchedMatchers = matchers.filter(function(matcher) {
                        return matcher.process(mediaObject);
                    });
                    var matchedIdentifiers = matchedMatchers.map(function(matcher) {
                        return matcher.getIdentifier();
                    });
                    var object = {};
                    matchedIdentifiers.forEach(function(identifier) {
                        if (_this.uriStore) {
                            var uri = _this.uriStore.get(identifier);
                            if (uri === undefined) {
                                throw new Error("No uri related to identifier : " + identifier);
                            }
                            object[identifier] = uri;
                        } else {
                            throw new Error("No map registrated for the matching engine");
                        }
                    });
                    return object;
                }
            } ]);
            return MatchingEngine;
        }();
        module.exports = MatchingEngine;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                    arr2[i] = arr[i];
                }
                return arr2;
            } else {
                return Array.from(arr);
            }
        }
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var Assert = __webpack_require__(18);
        var Type = __webpack_require__(1);
        var PluginUtils = __webpack_require__(55);
        var Permission = __webpack_require__(17);
        var ProcessingEngine = function() {
            function ProcessingEngine(pluginStore) {
                _classCallCheck(this, ProcessingEngine);
                Assert.that(pluginStore).not(undefined);
                this.pluginStore = pluginStore;
                this.stacks = {};
                this.snapshots = {};
                this.stats = [];
                this.defaultPlugin = null;
            }
            _createClass(ProcessingEngine, [ {
                key: "configure",
                value: function configure(configuration) {
                    this.configuration = configuration;
                }
            }, {
                key: "start",
                value: function start(mediaObject) {
                    mediaObject.state = "processing";
                    this.routine(mediaObject);
                    this.run(mediaObject);
                }
            }, {
                key: "run",
                value: function run(mediaObject) {
                    var plugin = this.stackTop(mediaObject);
                    if (!plugin) {
                        mediaObject.state = "processed";
                        return mediaObject;
                    }
                    if (this.configuration) {
                        if (this.configuration.getPermission(plugin.identifier) === Permission.FORBIDDEN) {
                            var stat = this.stats[mediaObject.getId()];
                            if (!stat.skipped) {
                                stat.skipped = [];
                            }
                            stat.skipped.push(plugin.identifier);
                            this.return(mediaObject);
                        } else {
                            plugin.process(mediaObject);
                        }
                    } else {
                        plugin.process(mediaObject);
                    }
                }
            }, {
                key: "routine",
                value: function routine(mediaObject) {
                    this.fill(mediaObject);
                    this.snapshot(mediaObject);
                    this.check(mediaObject);
                }
            }, {
                key: "snapshot",
                value: function snapshot(mediaObject) {
                    var stackId = mediaObject.getId();
                    if (this.stacks[stackId]) {
                        var dataStack = [];
                        this.stacks[stackId].forEach(function(plugin) {
                            var metaDataObject = {};
                            metaDataObject.identifier = plugin.getIdentifier();
                            metaDataObject.type = plugin.getType();
                            dataStack.push(metaDataObject);
                        });
                        if (this.snapshots[stackId]) {
                            this.snapshots[stackId].push({
                                stack: dataStack
                            });
                        } else {
                            this.snapshots[stackId] = [ {
                                stack: dataStack
                            } ];
                        }
                    } else {
                        this.snapshots[stackId] = [];
                    }
                }
            }, {
                key: "fill",
                value: function fill(mediaObject) {
                    var stackId = mediaObject.getId();
                    var matchers = this.pluginStore.getPlugins(Type.MATCHER);
                    var matchedMatchers = matchers.filter(function(matcher) {
                        return matcher.process(mediaObject);
                    });
                    var matchedIdentifiers = matchedMatchers.map(function(matcher) {
                        return matcher.getIdentifier();
                    });
                    var plugins = this.pluginStore.values();
                    var matchedPlugins = plugins.filter(function(plugin) {
                        return plugin.type !== Type.MATCHER && matchedIdentifiers.includes(plugin.identifier);
                    });
                    var pluginsByOccurrencies = PluginUtils.filterByOccurrencies(matchedPlugins);
                    var stack = this.substack(mediaObject, pluginsByOccurrencies);
                    if (this.stacks[stackId]) {
                        var _stacks$stackId;
                        (_stacks$stackId = this.stacks[stackId]).push.apply(_stacks$stackId, _toConsumableArray(stack));
                    } else {
                        this.stacks[stackId] = stack;
                    }
                }
            }, {
                key: "substack",
                value: function substack(mediaObject, pluginsByOccurrencies) {
                    var _this = this;
                    var stack = [];
                    pluginsByOccurrencies.once.forEach(function(plugin) {
                        if (_this.configuration) {
                            if (_this.configuration.getPermission(plugin.identifier) === Permission.FORBIDDEN) {
                                _this.skip(mediaObject, plugin);
                            } else if (!_this.isStacked(mediaObject, plugin)) {
                                stack.push(plugin);
                            }
                        } else if (!_this.isStacked(mediaObject, plugin)) {
                            stack.push(plugin);
                        }
                    });
                    pluginsByOccurrencies.any.forEach(function(plugin) {
                        if (_this.configuration) {
                            if (_this.configuration.getPermission(plugin.identifier) === Permission.FORBIDDEN) {
                                _this.skip(mediaObject, plugin);
                            } else if (!_this.isStacked(mediaObject, plugin)) {
                                stack.push(plugin);
                            }
                        } else if (!_this.isStacked(mediaObject, plugin)) {
                            stack.push(plugin);
                        }
                    });
                    pluginsByOccurrencies.every.forEach(function(plugin) {
                        if (_this.configuration) {
                            if (_this.configuration.getPermission(plugin.identifier) === Permission.FORBIDDEN) {
                                _this.skip(mediaObject, plugin);
                            } else {
                                stack.push(plugin);
                            }
                        } else {
                            stack.push(plugin);
                        }
                    });
                    return stack;
                }
            }, {
                key: "skip",
                value: function skip(mediaObject, plugin) {
                    var stat = this.stats[mediaObject.getId()];
                    if (stat) {
                        if (!stat.skipped) {
                            stat.skipped = [];
                        }
                    } else {
                        stat = {
                            skipped: []
                        };
                    }
                    stat.skipped.push(plugin.identifier);
                }
            }, {
                key: "unstack",
                value: function unstack(mediaObject) {
                    var stackId = mediaObject.getId();
                    if (this.stacks[stackId]) {
                        return this.stacks[stackId].pop();
                    }
                    return null;
                }
            }, {
                key: "stackTop",
                value: function stackTop(mediaObject) {
                    var stackId = mediaObject.getId();
                    if (this.stacks[stackId]) {
                        return this.stacks[stackId][this.stacks[stackId].length - 1];
                    }
                    return null;
                }
            }, {
                key: "check",
                value: function check(mediaObject) {
                    var stackId = mediaObject.getId();
                    if (this.stacks[stackId].length >= ProcessingEngine.STACK_LIMIT) {
                        console.error(this.snapshots[stackId]);
                        throw new Error("Plugin stack size exceed");
                    }
                    if (this.snapshots[stackId].length >= ProcessingEngine.SNAPSHOT_LIMIT) {
                        console.error(this.snapshots[stackId]);
                        throw new Error("Plugin snapshots size exceed");
                    }
                    var rendererCount = 0;
                    this.stacks[stackId].forEach(function(plugin) {
                        if (plugin.type === Type.RENDERER) {
                            rendererCount++;
                        }
                    });
                    if (rendererCount > 1) {
                        console.error(this.snapshots[stackId]);
                        throw new Error("More of one renderer in the stack");
                    }
                    if (this.stacks[stackId].length === 0 && !this.stats[stackId][Type.RENDERER]) {
                        if (!this.defaultPlugin) {
                            throw new Error("No default plugin assignated");
                        }
                        this.stacks[stackId].unshift(this.defaultPlugin);
                    }
                }
            }, {
                key: "return",
                value: function _return(mediaObject) {
                    var stackId = mediaObject.getId();
                    var plugin = this.unstack(mediaObject);
                    if (!plugin) {
                        return;
                    }
                    try {
                        if (!this.stats[stackId]) {
                            this.stats[stackId] = {};
                        }
                        if (this.stats[stackId][plugin.type]) {
                            this.stats[stackId][plugin.type] += 1;
                        } else {
                            this.stats[stackId][plugin.type] = 1;
                        }
                    } catch (err) {
                        console.error(err, this.snapshots[stackId]);
                    }
                    if (this.stacks[stackId].length === 0 && plugin.type === Type.RENDERER) {
                        this.run(mediaObject);
                    } else if (plugin.type !== Type.SANITIZER) {
                        this.fill(mediaObject);
                    }
                    this.snapshot(mediaObject);
                    this.check(mediaObject);
                    this.run(mediaObject);
                }
            }, {
                key: "process",
                value: function process(mediaObject) {
                    var stackId = mediaObject.getId();
                    var size = this.stacks[stackId].length;
                    var plugin = this.stacks[stackId][size - 1];
                    if (plugin) {
                        plugin.process(mediaObject);
                    } else {
                        console.log(this.stacks);
                        throw new Error("Impossible to run a undefined plugin");
                    }
                }
            }, {
                key: "isStacked",
                value: function isStacked(mediaObject, plugin) {
                    var stackId = mediaObject.getId();
                    if (this.stacks[stackId]) {
                        if (this.stacks[stackId].includes(plugin)) {
                            return true;
                        }
                    }
                    return false;
                }
            }, {
                key: "setDefaultPlugin",
                value: function setDefaultPlugin(plugin) {
                    this.defaultPlugin = plugin;
                }
            } ]);
            return ProcessingEngine;
        }();
        ProcessingEngine.STACK_LIMIT = 100;
        ProcessingEngine.SNAPSHOT_LIMIT = 100;
        module.exports = ProcessingEngine;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Filter = __webpack_require__(12);
        var Identifier = __webpack_require__(0);
        var MediaTag = __webpack_require__(2);
        var ClearKeyFilter = function(_Filter) {
            _inherits(ClearKeyFilter, _Filter);
            function ClearKeyFilter() {
                _classCallCheck(this, ClearKeyFilter);
                return _possibleConstructorReturn(this, (ClearKeyFilter.__proto__ || Object.getPrototypeOf(ClearKeyFilter)).call(this, Identifier.CLEAR_KEY));
            }
            _createClass(ClearKeyFilter, [ {
                key: "process",
                value: function process(mediaObject) {
                    var clearKey = mediaObject.getAttribute("data-clear-key");
                    var id = clearKey.substring(0, 32);
                    var key = clearKey.substring(33, 65);
                    mediaObject.setAttribute("id", id);
                    mediaObject.setAttribute("key", key);
                    mediaObject.removeAttribute("data-clear-key");
                    MediaTag.processingEngine.return(mediaObject);
                }
            } ]);
            return ClearKeyFilter;
        }(Filter);
        module.exports = ClearKeyFilter;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Identifier = __webpack_require__(0);
        var Type = __webpack_require__(1);
        var Matcher = __webpack_require__(3);
        var ClearKeyMatcher = function(_Matcher) {
            _inherits(ClearKeyMatcher, _Matcher);
            function ClearKeyMatcher() {
                _classCallCheck(this, ClearKeyMatcher);
                return _possibleConstructorReturn(this, (ClearKeyMatcher.__proto__ || Object.getPrototypeOf(ClearKeyMatcher)).call(this, Identifier.CLEAR_KEY, Type.FILTER));
            }
            _createClass(ClearKeyMatcher, [ {
                key: "process",
                value: function process(mediaObject) {
                    return mediaObject.hasAttribute("data-clear-key");
                }
            } ]);
            return ClearKeyMatcher;
        }(Matcher);
        module.exports = ClearKeyMatcher;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Identifier = __webpack_require__(0);
        var Type = __webpack_require__(1);
        var Matcher = __webpack_require__(3);
        var CryptoMatcher = function(_Matcher) {
            _inherits(CryptoMatcher, _Matcher);
            function CryptoMatcher() {
                _classCallCheck(this, CryptoMatcher);
                return _possibleConstructorReturn(this, (CryptoMatcher.__proto__ || Object.getPrototypeOf(CryptoMatcher)).call(this, Identifier.CRYPTO, Type.FILTER));
            }
            _createClass(CryptoMatcher, [ {
                key: "process",
                value: function process(mediaObject) {
                    return mediaObject.hasAttribute("data-crypto-key");
                }
            } ]);
            return CryptoMatcher;
        }(Matcher);
        module.exports = CryptoMatcher;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Identifier = __webpack_require__(0);
        var Type = __webpack_require__(1);
        var Matcher = __webpack_require__(3);
        var AudioMatcher = function(_Matcher) {
            _inherits(AudioMatcher, _Matcher);
            function AudioMatcher() {
                _classCallCheck(this, AudioMatcher);
                return _possibleConstructorReturn(this, (AudioMatcher.__proto__ || Object.getPrototypeOf(AudioMatcher)).call(this, Identifier.AUDIO, Type.RENDERER));
            }
            _createClass(AudioMatcher, [ {
                key: "process",
                value: function process(mediaObject) {
                    var regexExtensions = /^mp3|ogg|webm|wav$/;
                    var regexMimes = /^audio[\/](mp3|ogg|webm|wav)$/;
                    return mediaObject.hasAttribute("src") && mediaObject.getType() === "audio" && regexExtensions.exec(mediaObject.getExtension()) !== null && regexMimes.exec(mediaObject.getMimeType()) !== null;
                }
            } ]);
            return AudioMatcher;
        }(Matcher);
        module.exports = AudioMatcher;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Identifier = __webpack_require__(0);
        var Type = __webpack_require__(1);
        var Matcher = __webpack_require__(3);
        var DashMatcher = function(_Matcher) {
            _inherits(DashMatcher, _Matcher);
            function DashMatcher() {
                _classCallCheck(this, DashMatcher);
                return _possibleConstructorReturn(this, (DashMatcher.__proto__ || Object.getPrototypeOf(DashMatcher)).call(this, Identifier.DASH, Type.RENDERER));
            }
            _createClass(DashMatcher, [ {
                key: "process",
                value: function process(mediaObject) {
                    var regexExtensions = /^dash[+]xml$/;
                    var regexMimes = /^application[\/]dash[+]xml$/;
                    return mediaObject.hasAttribute("src") && mediaObject.getType() === "application" && regexExtensions.exec(mediaObject.getExtension()) !== null && regexMimes.exec(mediaObject.getMimeType()) !== null;
                }
            } ]);
            return DashMatcher;
        }(Matcher);
        module.exports = DashMatcher;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Identifier = __webpack_require__(0);
        var Type = __webpack_require__(1);
        var Matcher = __webpack_require__(3);
        var ImageMatcher = function(_Matcher) {
            _inherits(ImageMatcher, _Matcher);
            function ImageMatcher() {
                _classCallCheck(this, ImageMatcher);
                return _possibleConstructorReturn(this, (ImageMatcher.__proto__ || Object.getPrototypeOf(ImageMatcher)).call(this, Identifier.DOWNLOAD, Type.RENDERER));
            }
            _createClass(ImageMatcher, [ {
                key: "process",
                value: function process(mediaObject) {
                    return mediaObject.hasAttribute("src") && mediaObject.getType() === "download";
                }
            } ]);
            return ImageMatcher;
        }(Matcher);
        module.exports = ImageMatcher;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Identifier = __webpack_require__(0);
        var Type = __webpack_require__(1);
        var Matcher = __webpack_require__(3);
        var ImageMatcher = function(_Matcher) {
            _inherits(ImageMatcher, _Matcher);
            function ImageMatcher() {
                _classCallCheck(this, ImageMatcher);
                return _possibleConstructorReturn(this, (ImageMatcher.__proto__ || Object.getPrototypeOf(ImageMatcher)).call(this, Identifier.IMAGE, Type.RENDERER));
            }
            _createClass(ImageMatcher, [ {
                key: "process",
                value: function process(mediaObject) {
                    var regexExtensions = /^png|jpg|jpeg|gif|svg[+]xml$/;
                    var regexMimes = /^image[\/](png|jpeg|gif|svg[+]xml)$/;
                    return mediaObject.hasAttribute("src") && mediaObject.getType() === "image" && regexExtensions.exec(mediaObject.getExtension()) !== null && regexMimes.exec(mediaObject.getMimeType()) !== null;
                }
            } ]);
            return ImageMatcher;
        }(Matcher);
        module.exports = ImageMatcher;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Identifier = __webpack_require__(0);
        var Type = __webpack_require__(1);
        var Matcher = __webpack_require__(3);
        var PdfMatcher = function(_Matcher) {
            _inherits(PdfMatcher, _Matcher);
            function PdfMatcher() {
                _classCallCheck(this, PdfMatcher);
                return _possibleConstructorReturn(this, (PdfMatcher.__proto__ || Object.getPrototypeOf(PdfMatcher)).call(this, Identifier.PDF, Type.RENDERER));
            }
            _createClass(PdfMatcher, [ {
                key: "process",
                value: function process(mediaObject) {
                    var regexExtensions = /^pdf$/;
                    var regexMimes = /^application[\/]pdf$/;
                    return mediaObject.hasAttribute("src") && mediaObject.getType() === "application" && regexExtensions.exec(mediaObject.getExtension()) !== null && regexMimes.exec(mediaObject.getMimeType()) !== null;
                }
            } ]);
            return PdfMatcher;
        }(Matcher);
        module.exports = PdfMatcher;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Identifier = __webpack_require__(0);
        var Type = __webpack_require__(1);
        var Matcher = __webpack_require__(3);
        var VideoMatcher = function(_Matcher) {
            _inherits(VideoMatcher, _Matcher);
            function VideoMatcher() {
                _classCallCheck(this, VideoMatcher);
                return _possibleConstructorReturn(this, (VideoMatcher.__proto__ || Object.getPrototypeOf(VideoMatcher)).call(this, Identifier.VIDEO, Type.RENDERER));
            }
            _createClass(VideoMatcher, [ {
                key: "process",
                value: function process(mediaObject) {
                    var regexExtensions = /^mp4|ogg|webm$/;
                    var regexMimes = /^video[\/](mp4|ogg|webm)$/;
                    return mediaObject.hasAttribute("src") && mediaObject.getType() === "video" && regexExtensions.exec(mediaObject.getExtension()) !== null && regexMimes.exec(mediaObject.getMimeType()) !== null;
                }
            } ]);
            return VideoMatcher;
        }(Matcher);
        module.exports = VideoMatcher;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Identifier = __webpack_require__(0);
        var Type = __webpack_require__(1);
        var Matcher = __webpack_require__(3);
        var MediaObjectMatcher = function(_Matcher) {
            _inherits(MediaObjectMatcher, _Matcher);
            function MediaObjectMatcher() {
                _classCallCheck(this, MediaObjectMatcher);
                return _possibleConstructorReturn(this, (MediaObjectMatcher.__proto__ || Object.getPrototypeOf(MediaObjectMatcher)).call(this, Identifier.MEDIA_OBJECT, Type.SANITIZER));
            }
            _createClass(MediaObjectMatcher, [ {
                key: "process",
                value: function process(mediaObject) {
                    return mediaObject.hasAttribute("src") && mediaObject.hasAttribute("data-type");
                }
            } ]);
            return MediaObjectMatcher;
        }(Matcher);
        module.exports = MediaObjectMatcher;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Renderer = __webpack_require__(4);
        var Identifier = __webpack_require__(0);
        var MediaTag = __webpack_require__(2);
        var AudioRenderer = function(_Renderer) {
            _inherits(AudioRenderer, _Renderer);
            function AudioRenderer() {
                _classCallCheck(this, AudioRenderer);
                return _possibleConstructorReturn(this, (AudioRenderer.__proto__ || Object.getPrototypeOf(AudioRenderer)).call(this, Identifier.AUDIO));
            }
            _createClass(AudioRenderer, [ {
                key: "process",
                value: function process(mediaObject) {
                    var element = document.createElement("audio");
                    element.setAttribute("src", mediaObject.getAttribute("src"));
                    element.setAttribute("controls", true);
                    mediaObject.utilsSetAllDataAttributes(element);
                    mediaObject.replaceContents([ element ]);
                    MediaTag.processingEngine.return(mediaObject);
                }
            } ]);
            return AudioRenderer;
        }(Renderer);
        module.exports = AudioRenderer;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Renderer = __webpack_require__(4);
        var Identifier = __webpack_require__(0);
        var MediaTag = __webpack_require__(2);
        var DashRenderer = function(_Renderer) {
            _inherits(DashRenderer, _Renderer);
            function DashRenderer() {
                _classCallCheck(this, DashRenderer);
                return _possibleConstructorReturn(this, (DashRenderer.__proto__ || Object.getPrototypeOf(DashRenderer)).call(this, Identifier.DASH));
            }
            _createClass(DashRenderer, [ {
                key: "process",
                value: function process(mediaObject) {
                    var video = document.createElement("video");
                    var player = new shaka.Player(video);
                    var id = mediaObject.getAttribute("id");
                    var key = mediaObject.getAttribute("key");
                    if (id && key) {
                        var clearKeyStringObject = '{"' + id + '": "' + key + '"}';
                        var clearKey = JSON.parse(clearKeyStringObject);
                        player.configure({
                            drm: {
                                clearKeys: clearKey
                            }
                        });
                    }
                    video.setAttribute("controls", true);
                    mediaObject.utilsSetAllDataAttributes(video);
                    mediaObject.replaceContents([ video ]);
                    player.load(mediaObject.getAttribute("src")).then(function() {});
                    MediaTag.processingEngine.return(mediaObject);
                }
            } ]);
            return DashRenderer;
        }(Renderer);
        module.exports = DashRenderer;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Renderer = __webpack_require__(4);
        var Identifier = __webpack_require__(0);
        var MediaTag = __webpack_require__(2);
        var DownloadRenderer = function(_Renderer) {
            _inherits(DownloadRenderer, _Renderer);
            function DownloadRenderer(message, buttonMessage) {
                _classCallCheck(this, DownloadRenderer);
                var _this = _possibleConstructorReturn(this, (DownloadRenderer.__proto__ || Object.getPrototypeOf(DownloadRenderer)).call(this, Identifier.DOWNLOAD));
                _this.message = message;
                _this.buttonMessage = buttonMessage || "Download";
                return _this;
            }
            _createClass(DownloadRenderer, [ {
                key: "process",
                value: function process(mediaObject) {
                    var container = document.createElement("div");
                    var button = document.createElement("button");
                    container.innerHTML = this.message;
                    button.innerHTML = this.buttonMessage;
                    button.onclick = function() {
                        var xhr = new XMLHttpRequest();
                        var src = mediaObject.getAttribute("src");
                        xhr.open("GET", src, true);
                        xhr.responseType = "blob";
                        xhr.onload = function() {
                            var blob = xhr.response;
                            if (blob) {
                                if (mediaObject.name) {
                                    saveAs(blob, mediaObject.name);
                                } else if (mediaObject.getAttribute("data-attr-type")) {
                                    var mime = mediaObject.getAttribute("data-attr-type");
                                    var ar = mime.split("/");
                                    var file = new File([ blob ], "download." + (ar[1] || "txt"), {
                                        type: mime
                                    });
                                    saveAs(file);
                                } else {
                                    saveAs(blob);
                                }
                            }
                        };
                        xhr.send();
                    };
                    container.appendChild(button);
                    mediaObject.utilsSetAllDataAttributes(container);
                    mediaObject.replaceContents([ container ]);
                    MediaTag.processingEngine.return(mediaObject);
                }
            } ]);
            return DownloadRenderer;
        }(Renderer);
        module.exports = DownloadRenderer;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Renderer = __webpack_require__(4);
        var Identifier = __webpack_require__(0);
        var MediaTag = __webpack_require__(2);
        var ImageRenderer = function(_Renderer) {
            _inherits(ImageRenderer, _Renderer);
            function ImageRenderer() {
                _classCallCheck(this, ImageRenderer);
                return _possibleConstructorReturn(this, (ImageRenderer.__proto__ || Object.getPrototypeOf(ImageRenderer)).call(this, Identifier.IMAGE));
            }
            _createClass(ImageRenderer, [ {
                key: "process",
                value: function process(mediaObject) {
                    var element = document.createElement("img");
                    element.setAttribute("src", mediaObject.getAttribute("src"));
                    mediaObject.utilsSetAllDataAttributes(element);
                    mediaObject.replaceContents([ element ]);
                    MediaTag.processingEngine.return(mediaObject);
                }
            } ]);
            return ImageRenderer;
        }(Renderer);
        module.exports = ImageRenderer;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Renderer = __webpack_require__(4);
        var Identifier = __webpack_require__(0);
        var MediaTag = __webpack_require__(2);
        var Mode = {
            PDFJS: "pdfjs",
            DEFAULT: "default"
        };
        var PdfRenderer = function(_Renderer) {
            _inherits(PdfRenderer, _Renderer);
            function PdfRenderer() {
                _classCallCheck(this, PdfRenderer);
                return _possibleConstructorReturn(this, (PdfRenderer.__proto__ || Object.getPrototypeOf(PdfRenderer)).call(this, Identifier.PDF));
            }
            _createClass(PdfRenderer, [ {
                key: "process",
                value: function process(mediaObject) {
                    var url = mediaObject.getAttribute("src");
                    var iframe = document.createElement("iframe");
                    if (!mediaObject.getAttribute("data-attr-width")) {
                        iframe.setAttribute("width", "100%");
                    }
                    if (!mediaObject.getAttribute("data-attr-height")) {
                        iframe.setAttribute("height", document.body.scrollHeight);
                    }
                    if (!PdfRenderer.viewer) {
                        PdfRenderer.mode = Mode.DEFAULT;
                    }
                    switch (PdfRenderer.mode) {
                      case Mode.PDFJS:
                        {
                            var viewerUrl = PdfRenderer.viewer + "?file=" + url;
                            var xhr = new XMLHttpRequest();
                            xhr.onload = function() {
                                if (xhr.status < 400) {
                                    iframe.src = viewerUrl;
                                } else {
                                    console.warn("The pdfjs viewer has not been found ...\n\t\t\t\t\t\t\tThe browser viewer will be used by default");
                                    iframe.src = "" + url;
                                }
                            };
                            xhr.open("HEAD", viewerUrl, true);
                            xhr.send();
                            break;
                        }

                      default:
                        {
                            iframe.src = "" + url;
                        }
                    }
                    mediaObject.utilsSetAllDataAttributes(iframe);
                    mediaObject.replaceContents([ iframe ]);
                    iframe.onload = function() {
                        MediaTag.processingEngine.return(mediaObject);
                    };
                }
            } ]);
            return PdfRenderer;
        }(Renderer);
        PdfRenderer.viewer = null;
        PdfRenderer.mode = Mode.PDFJS;
        module.exports = PdfRenderer;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Renderer = __webpack_require__(4);
        var Identifier = __webpack_require__(0);
        var MediaTag = __webpack_require__(2);
        var VideoRenderer = function(_Renderer) {
            _inherits(VideoRenderer, _Renderer);
            function VideoRenderer() {
                _classCallCheck(this, VideoRenderer);
                return _possibleConstructorReturn(this, (VideoRenderer.__proto__ || Object.getPrototypeOf(VideoRenderer)).call(this, Identifier.VIDEO));
            }
            _createClass(VideoRenderer, [ {
                key: "process",
                value: function process(mediaObject) {
                    var element = document.createElement("video");
                    element.setAttribute("src", mediaObject.getAttribute("src"));
                    element.setAttribute("controls", true);
                    mediaObject.utilsSetAllDataAttributes(element);
                    mediaObject.replaceContents([ element ]);
                    MediaTag.processingEngine.return(mediaObject);
                }
            } ]);
            return VideoRenderer;
        }(Renderer);
        module.exports = VideoRenderer;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Sanitizer = __webpack_require__(20);
        var Identifier = __webpack_require__(0);
        var MediaTag = __webpack_require__(2);
        var MediaObjectSanitizer = function(_Sanitizer) {
            _inherits(MediaObjectSanitizer, _Sanitizer);
            function MediaObjectSanitizer() {
                _classCallCheck(this, MediaObjectSanitizer);
                return _possibleConstructorReturn(this, (MediaObjectSanitizer.__proto__ || Object.getPrototypeOf(MediaObjectSanitizer)).call(this, Identifier.MEDIA_OBJECT));
            }
            _createClass(MediaObjectSanitizer, [ {
                key: "process",
                value: function process(mediaObject) {
                    MediaTag.processingEngine.return(mediaObject);
                }
            } ]);
            return MediaObjectSanitizer;
        }(Sanitizer);
        module.exports = MediaObjectSanitizer;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var ImageMatcher = __webpack_require__(41);
        var AudioMatcher = __webpack_require__(38);
        var VideoMatcher = __webpack_require__(43);
        var PdfMatcher = __webpack_require__(42);
        var DashMatcher = __webpack_require__(39);
        var DownloadMatcher = __webpack_require__(40);
        var CryptoMatcher = __webpack_require__(37);
        var ClearKeyMatcher = __webpack_require__(36);
        var MediaObjectMatcher = __webpack_require__(44);
        var MediaTag = __webpack_require__(2);
        MediaTag.pluginStore.store(new ImageMatcher());
        MediaTag.pluginStore.store(new AudioMatcher());
        MediaTag.pluginStore.store(new VideoMatcher());
        MediaTag.pluginStore.store(new PdfMatcher());
        MediaTag.pluginStore.store(new DashMatcher());
        MediaTag.pluginStore.store(new DownloadMatcher());
        MediaTag.pluginStore.store(new CryptoMatcher());
        MediaTag.pluginStore.store(new ClearKeyMatcher());
        MediaTag.pluginStore.store(new MediaObjectMatcher());
        module.exports = MediaTag;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        var _get = function get(object, property, receiver) {
            if (object === null) object = Function.prototype;
            var desc = Object.getOwnPropertyDescriptor(object, property);
            if (desc === undefined) {
                var parent = Object.getPrototypeOf(object);
                if (parent === null) {
                    return undefined;
                } else {
                    return get(parent, property, receiver);
                }
            } else if ("value" in desc) {
                return desc.value;
            } else {
                var getter = desc.get;
                if (getter === undefined) {
                    return undefined;
                }
                return getter.call(receiver);
            }
        };
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Store = __webpack_require__(10);
        var PluginStore = function(_Store) {
            _inherits(PluginStore, _Store);
            function PluginStore() {
                _classCallCheck(this, PluginStore);
                return _possibleConstructorReturn(this, (PluginStore.__proto__ || Object.getPrototypeOf(PluginStore)).apply(this, arguments));
            }
            _createClass(PluginStore, [ {
                key: "getPlugins",
                value: function getPlugins(type) {
                    var plugins = this.values();
                    return plugins.filter(function(plugin) {
                        if (plugin.type === type) {
                            return true;
                        }
                        return false;
                    });
                }
            }, {
                key: "store",
                value: function store(plugin) {
                    _get(PluginStore.prototype.__proto__ || Object.getPrototypeOf(PluginStore.prototype), "store", this).call(this, [ plugin.identifier, plugin.type ], plugin);
                }
            }, {
                key: "unstore",
                value: function unstore(plugin) {
                    if (PluginStore.isStored([ plugin.identifier, plugin.type ]) === false) {
                        console.warn('The key "' + [ plugin.identifier, plugin.type ] + '" not exists in this manager');
                    } else {
                        return _get(PluginStore.prototype.__proto__ || Object.getPrototypeOf(PluginStore.prototype), "unstore", this).call(this, [ plugin.identifier, plugin.type ]);
                    }
                }
            } ]);
            return PluginStore;
        }(Store);
        module.exports = PluginStore;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        var _get = function get(object, property, receiver) {
            if (object === null) object = Function.prototype;
            var desc = Object.getOwnPropertyDescriptor(object, property);
            if (desc === undefined) {
                var parent = Object.getPrototypeOf(object);
                if (parent === null) {
                    return undefined;
                } else {
                    return get(parent, property, receiver);
                }
            } else if ("value" in desc) {
                return desc.value;
            } else {
                var getter = desc.get;
                if (getter === undefined) {
                    return undefined;
                }
                return getter.call(receiver);
            }
        };
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }
        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }
        var Store = __webpack_require__(10);
        var UriStore = function(_Store) {
            _inherits(UriStore, _Store);
            function UriStore(targetDirectory) {
                _classCallCheck(this, UriStore);
                var _this = _possibleConstructorReturn(this, (UriStore.__proto__ || Object.getPrototypeOf(UriStore)).call(this));
                _this.targetDirectory = targetDirectory;
                return _this;
            }
            _createClass(UriStore, [ {
                key: "store",
                value: function store(identifier, type) {
                    var uri = this.targetDirectory + "/" + type + "s/" + identifier;
                    _get(UriStore.prototype.__proto__ || Object.getPrototypeOf(UriStore.prototype), "store", this).call(this, identifier, uri);
                }
            }, {
                key: "unstore",
                value: function unstore(identifier) {
                    return _get(UriStore.prototype.__proto__ || Object.getPrototypeOf(UriStore.prototype), "unstore", this).call(this, identifier);
                }
            } ]);
            return UriStore;
        }(Store);
        module.exports = UriStore;
    }, function(module, exports, __webpack_require__) {
        "use strict";
        var _createClass = function() {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            return function(Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        var PluginUtils = function() {
            function PluginUtils() {
                _classCallCheck(this, PluginUtils);
            }
            _createClass(PluginUtils, null, [ {
                key: "filterByOccurrence",
                value: function filterByOccurrence(plugins, occurrence) {
                    return plugins.filter(function(plugin) {
                        return plugin.occurrence === occurrence;
                    });
                }
            }, {
                key: "filterByOccurrencies",
                value: function filterByOccurrencies(plugins) {
                    var result = {
                        once: [],
                        any: [],
                        every: []
                    };
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;
                    try {
                        for (var _iterator = plugins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var plugin = _step.value;
                            if (result[plugin.occurrence]) {
                                result[plugin.occurrence].push(plugin);
                            } else {
                                result[plugin.occurrence] = Array.of(plugin);
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                    return result;
                }
            } ]);
            return PluginUtils;
        }();
        module.exports = PluginUtils;
    }, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(19);
    } ]);
});