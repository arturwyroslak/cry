define([
    'jquery',
    '/api/config',
    '/customize/application_config.js',
    '/bower_components/chainpad-crypto/crypto.js',
    '/common/toolbar.js',
    '/bower_components/nthen/index.js',
    '/common/sframe-common.js',
    '/common/hyperscript.js',
    '/customize/messages.js',
    '/common/common-interface.js',
    '/common/common-ui-elements.js',
    '/common/common-util.js',
    '/common/common-hash.js',
    '/common/common-signing-keys.js',
    '/support/ui.js',

    '/lib/datepicker/flatpickr.js',

    'css!/lib/datepicker/flatpickr.min.css',
    'css!/bower_components/bootstrap/dist/css/bootstrap.min.css',
    'css!/bower_components/components-font-awesome/css/font-awesome.min.css',
    'less!/admin/app-admin.less',
], function (
    $,
    ApiConfig,
    AppConfig,
    Crypto,
    Toolbar,
    nThen,
    SFCommon,
    h,
    Messages,
    UI,
    UIElements,
    Util,
    Hash,
    Keys,
    Support,
    Flatpickr
    )
{
    var APP = {
        'instanceStatus': {}
    };

    var common;
    var sFrameChan;

    var categories = {
        'general': [ // Msg.admin_cat_general
            'cp-admin-flush-cache',
            'cp-admin-update-limit',
            'cp-admin-archive',
            'cp-admin-unarchive',
            // 'cp-admin-registration',
        ],
        'quota': [ // Msg.admin_cat_quota
            'cp-admin-defaultlimit',
            'cp-admin-setlimit',
            'cp-admin-getquota',
            'cp-admin-getlimits',
        ],
        'stats': [ // Msg.admin_cat_stats
            'cp-admin-refresh-stats',
            'cp-admin-active-sessions',
            'cp-admin-active-pads',
            'cp-admin-open-files',
            'cp-admin-registered',
            'cp-admin-disk-usage',
        ],
        'support': [ // Msg.admin_cat_support
            'cp-admin-support-list',
            'cp-admin-support-init'
        ],
        'broadcast': [ // Msg.admin_cat_support
            'cp-admin-broadcast-delete',
            'cp-admin-broadcast',
        ],
        'performance': [ // Msg.admin_cat_performance
            'cp-admin-refresh-performance',
            'cp-admin-performance-profiling',
        ]
    };

    var create = {};

    var makeBlock = function (key, addButton) { // Title, Hint, maybeButton
        // Convert to camlCase for translation keys
        var safeKey = key.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });

        var $div = $('<div>', {'class': 'cp-admin-' + key + ' cp-sidebarlayout-element'});
        $('<label>').text(Messages['admin_'+safeKey+'Title'] || key).appendTo($div);
        $('<span>', {'class': 'cp-sidebarlayout-description'})
            .text(Messages['admin_'+safeKey+'Hint'] || 'Coming soon...').appendTo($div);
        if (addButton) {
            $('<button>', {
                'class': 'btn btn-primary'
            }).text(Messages['admin_'+safeKey+'Button'] || safeKey).appendTo($div);
        }
        return $div;
    };
    create['update-limit'] = function () {
        var key = 'update-limit';
        var $div = makeBlock(key, true); // Msg.admin_updateLimitHint, .admin_updateLimitTitle, .admin_updateLimitButton
        $div.find('button').click(function () {
            sFrameChan.query('Q_UPDATE_LIMIT', null, function (e, res) {
                if (e || (res && res.error)) { return void console.error(e || res.error); }
                UI.alert(Messages.admin_updateLimitDone || 'done');
            });
        });
        return $div;
    };
    create['flush-cache'] = function () {
        var key = 'flush-cache';
        var $div = makeBlock(key, true); // Msg.admin_flushCacheHint, .admin_flushCacheTitle, .admin_flushCacheButton
        var called = false;
        $div.find('button').click(function () {
            if (called) { return; }
            called = true;
            sFrameChan.query('Q_ADMIN_RPC', {
                cmd: 'FLUSH_CACHE',
            }, function (e, data) {
                called = false;
                UI.alert(data ? Messages.admin_flushCacheDone || 'done' : 'error' + e);
            });
        });
        return $div;
    };

    var archiveForm = function (archive, $div, $button) {
        var label = h('label', { for: 'cp-admin-archive' }, Messages.admin_archiveInput);
        var input = h('input#cp-admin-archive', {
            type: 'text'
        });

        var label2 = h('label.cp-admin-pw', {
            for: 'cp-admin-archive-pw'
        }, Messages.admin_archiveInput2);
        var input2 = UI.passwordInput({
            id: 'cp-admin-archive-pw',
            placeholder: Messages.login_password
        });
        var $pw = $(input2);
        $pw.addClass('cp-admin-pw');
        var $pwInput = $pw.find('input');


        $button.before(h('div.cp-admin-setlimit-form', [
            label,
            input,
            label2,
            input2
        ]));

        $div.addClass('cp-admin-nopassword');

        var parsed;
        var $input = $(input).on('keypress change paste', function () {
            setTimeout(function () {
                $input.removeClass('cp-admin-inval');
                var val = $input.val().trim();
                if (!val) {
                    $div.toggleClass('cp-admin-nopassword', true);
                    return;
                }

                parsed = Hash.isValidHref(val);
                $pwInput.val('');

                if (!parsed || !parsed.hashData) {
                    $div.toggleClass('cp-admin-nopassword', true);
                    return void $input.addClass('cp-admin-inval');
                }

                var pw = parsed.hashData.version !== 3 && parsed.hashData.password;
                $div.toggleClass('cp-admin-nopassword', !pw);
            });
        });
        $pw.on('keypress change', function () {
            setTimeout(function () {
                $pw.toggleClass('cp-admin-inval', !$pwInput.val());
            });
        });

        var clicked = false;
        $button.click(function () {
            if (!parsed || !parsed.hashData) {
                UI.warn(Messages.admin_archiveInval);
                return;
            }
            var pw = parsed.hashData.password ? $pwInput.val() : undefined;
            var channel;
            if (parsed.hashData.version === 3) {
                channel = parsed.hashData.channel;
            } else {
                var secret = Hash.getSecrets(parsed.type, parsed.hash, pw);
                channel = secret && secret.channel;
            }

            if (!channel) {
                UI.warn(Messages.admin_archiveInval);
                return;
            }

            if (clicked) { return; }
            clicked = true;

            nThen(function (waitFor) {
                if (!archive) { return; }
                common.getFileSize(channel, waitFor(function (err, size) {
                    if (!err && size === 0) {
                        clicked = false;
                        waitFor.abort();
                        return void UI.warn(Messages.admin_archiveInval);
                    }
                }), true);
            }).nThen(function () {
                sFrameChan.query('Q_ADMIN_RPC', {
                    cmd: archive ? 'ARCHIVE_DOCUMENT' : 'RESTORE_ARCHIVED_DOCUMENT',
                    data: channel
                }, function (err, obj) {
                    var e = err || (obj && obj.error);
                    clicked = false;
                    if (e) {
                        UI.warn(Messages.error);
                        console.error(e);
                        return;
                    }
                    UI.log(archive ? Messages.archivedFromServer : Messages.restoredFromServer);
                    $input.val('');
                    $pwInput.val('');
                });
            });
        });
    };

    create['archive'] = function () {
        var key = 'archive';
        var $div = makeBlock(key, true); // Msg.admin_archiveHint, .admin_archiveTitle, .admin_archiveButton
        var $button = $div.find('button');
        archiveForm(true, $div, $button);
        return $div;
    };
    create['unarchive'] = function () {
        var key = 'unarchive';
        var $div = makeBlock(key, true); // Msg.admin_unarchiveHint, .admin_unarchiveTitle, .admin_unarchiveButton
        var $button = $div.find('button');
        archiveForm(false, $div, $button);
        return $div;
    };

    create['registration'] = function () {
        var key = 'registration';
        var $div = makeBlock(key, true); // Msg.admin_registrationHint, .admin_registrationTitle, .admin_registrationButton
        var $button = $div.find('button');
        var state = APP.instanceStatus.restrictRegistration;
        if (state) {
            $button.text(Messages.admin_registrationAllow);
        } else {
            $button.removeClass('btn-primary').addClass('btn-danger');
        }
        var called = false;
        $div.find('button').click(function () {
            called = true;
            sFrameChan.query('Q_ADMIN_RPC', {
                cmd: 'ADMIN_DECREE',
                data: ['RESTRICT_REGISTRATION', [!state]]
            }, function (e) {
                if (e) { UI.warn(Messages.error); console.error(e); }
                APP.updateStatus(function () {
                    called = false;
                    state = APP.instanceStatus.restrictRegistration;
                    if (state) {
                        console.log($button);
                        $button.text(Messages.admin_registrationAllow);
                        $button.addClass('btn-primary').removeClass('btn-danger');
                    } else {
                        $button.text(Messages.admin_registrationButton);
                        $button.removeClass('btn-primary').addClass('btn-danger');
                    }
                });
            });
        });
        return $div;
    };

    var getPrettySize = UIElements.prettySize;

    create['defaultlimit'] = function () {
        var key = 'defaultlimit';
        var $div = makeBlock(key); // Msg.admin_defaultlimitHint, .admin_defaultlimitTitle
        var _limit = APP.instanceStatus.defaultStorageLimit;
        var _limitMB = Util.bytesToMegabytes(_limit);
        var limit = getPrettySize(_limit);
        var newLimit = h('input', {type: 'number', min: 0, value: _limitMB});
        var set = h('button.btn.btn-primary', Messages.admin_setlimitButton);
        $div.append(h('div', [
            h('span.cp-admin-defaultlimit-value', Messages._getKey('admin_limit', [limit])),
            h('div.cp-admin-setlimit-form', [
                h('label', Messages.admin_defaultLimitMB),
                newLimit,
                h('nav', [set])
            ])
        ]));

        UI.confirmButton(set, {
            classes: 'btn-primary',
            multiple: true,
            validate: function () {
                var l = parseInt($(newLimit).val());
                if (isNaN(l)) { return false; }
                return true;
            }
        }, function () {
            var lMB = parseInt($(newLimit).val()); // Megabytes
            var l = lMB * 1024 * 1024; // Bytes
            var data = [l];
            sFrameChan.query('Q_ADMIN_RPC', {
                cmd: 'ADMIN_DECREE',
                data: ['UPDATE_DEFAULT_STORAGE', data]
            }, function (e) {
                if (e) { UI.warn(Messages.error); return void console.error(e); }
                var limit = getPrettySize(l);
                $div.find('.cp-admin-defaultlimit-value').text(Messages._getKey('admin_limit', [limit]));
            });
        });
        return $div;
    };
    create['getlimits'] = function () {
        var key = 'getlimits';
        var $div = makeBlock(key); // Msg.admin_getlimitsHint, .admin_getlimitsTitle
        APP.refreshLimits = function () {
            sFrameChan.query('Q_ADMIN_RPC', {
                cmd: 'GET_LIMITS',
            }, function (e, data) {
                if (e) { return; }
                if (!Array.isArray(data) || !data[0]) { return; }

                $div.find('.cp-admin-all-limits').remove();

                var obj = data[0];
                if (obj && (obj.message || obj.location)) {
                    delete obj.message;
                    delete obj.location;
                }
                var list = Object.keys(obj).sort(function (a, b) {
                    return obj[a].limit > obj[b].limit;
                });

                var compact = list.length > 10;

                var content = list.map(function (key) {
                    var user = obj[key];
                    var limit = getPrettySize(user.limit);
                    var title = Messages._getKey('admin_limit', [limit]) + ', ' +
                                Messages._getKey('admin_limitPlan', [user.plan]) + ', ' +
                                Messages._getKey('admin_limitNote', [user.note]);

                    var keyEl = h('code.cp-limit-key', key);
                    $(keyEl).click(function () {
                        $('.cp-admin-setlimit-form').find('.cp-setlimit-key').val(key);
                        $('.cp-admin-setlimit-form').find('.cp-setlimit-quota').val(Math.floor(user.limit / 1024 / 1024));
                        $('.cp-admin-setlimit-form').find('.cp-setlimit-note').val(user.note);
                    });
                    if (compact) {
                        return h('tr.cp-admin-limit', {
                            title: title
                        }, [
                            h('td', keyEl),
                            h('td.limit', Messages._getKey('admin_limit', [limit])),
                            h('td.plan', Messages._getKey('admin_limitPlan', [user.plan])),
                            h('td.note', Messages._getKey('admin_limitNote', [user.note]))
                        ]);
                    }
                    return h('li.cp-admin-limit', [
                        keyEl,
                        h('ul.cp-limit-data', [
                            h('li.limit', Messages._getKey('admin_limit', [limit])),
                            h('li.plan', Messages._getKey('admin_limitPlan', [user.plan])),
                            h('li.note', Messages._getKey('admin_limitNote', [user.note]))
                        ])
                    ]);
                });
                if (compact) { return $div.append(h('table.cp-admin-all-limits', content)); }
                $div.append(h('ul.cp-admin-all-limits', content));
            });
        };
        APP.refreshLimits();
        return $div;
    };

    create['setlimit'] = function () {
        var key = 'setlimit';
        var $div = makeBlock(key); // Msg.admin_setlimitHint, .admin_setlimitTitle

        var user = h('input.cp-setlimit-key');
        var $key = $(user);
        var limit = h('input.cp-setlimit-quota', {type: 'number', min: 0, value: 0});
        var note = h('input.cp-setlimit-note');
        var remove = h('button.btn.btn-danger', Messages.fc_remove);
        var set = h('button.btn.btn-primary', Messages.admin_setlimitButton);
        var form = h('div.cp-admin-setlimit-form', [
            h('label', Messages.admin_limitUser),
            user,
            h('label', Messages.admin_limitMB),
            limit,
            h('label', Messages.admin_limitSetNote),
            note,
            h('nav', [set, remove])
        ]);

        var getValues = function () {
            var key = $key.val();
            var _limit = parseInt($(limit).val());
            var _note = $(note).val();
            if (key.length !== 44) {
                try {
                    var u = Keys.parseUser(key);
                    if (!u.domain || !u.user || !u.pubkey) {
                        return void UI.warn(Messages.admin_invalKey);
                    }
                } catch (e) {
                    return void UI.warn(Messages.admin_invalKey);
                }
            }
            if (isNaN(_limit) || _limit < 0) {
                return void UI.warn(Messages.admin_invalLimit);
            }
            return {
                key: key,
                data: {
                    limit: _limit * 1024 * 1024,
                    note: _note,
                    plan: 'custom'
                }
            };
        };

        UI.confirmButton(remove, {
            classes: 'btn-danger',
            multiple: true,
            validate: function () {
                var obj = getValues();
                if (!obj || !obj.key) { return false; }
                return true;
            }
        }, function () {
            var obj = getValues();
            var data = [obj.key];
            sFrameChan.query('Q_ADMIN_RPC', {
                cmd: 'ADMIN_DECREE',
                data: ['RM_QUOTA', data]
            }, function (e) {
                if (e) { UI.warn(Messages.error); console.error(e); }
                APP.refreshLimits();
                $key.val('');
            });
        });

        $(set).click(function () {
            var obj = getValues();
            if (!obj || !obj.key) { return; }
            var data = [obj.key, obj.data];
            sFrameChan.query('Q_ADMIN_RPC', {
                cmd: 'ADMIN_DECREE',
                data: ['SET_QUOTA', data]
            }, function (e) {
                if (e) { UI.warn(Messages.error); console.error(e); }
                APP.refreshLimits();
                $key.val('');
            });
        });

        $div.append(form);
        return $div;
    };

    create['getquota'] = function () {
        var key = 'getquota';
        var $div = makeBlock(key, true); // Msg.admin_getquotaHint, .admin_getquotaTitle, .admin_getquotaButton

        var input = h('input#cp-admin-getquota', {
            type: 'text'
        });
        var $input = $(input);

        var $button = $div.find('button');
        $button.before(h('div.cp-admin-setlimit-form', [
            input,
        ]));

        $button.click(function () {
            var val = $input.val();
            if (!val || !val.trim()) { return; }
            var key = Keys.canonicalize(val);
            if (!key) { return; }
            $input.val('');
            sFrameChan.query('Q_ADMIN_RPC', {
                cmd: 'GET_USER_TOTAL_SIZE',
                data: key
            }, function (e, obj) {
                if (e || (obj && obj.error)) {
                    console.error(e || obj.error);
                    return void UI.warn(Messages.error);
                }
                var size = Array.isArray(obj) && obj[0];
                if (typeof(size) !== "number") { return; }
                UI.alert(Util.getPrettySize(size, Messages));
            });
        });

        return $div;
    };

    var onRefreshStats = Util.mkEvent();

    create['refresh-stats'] = function () {
        var key = 'refresh-stats';
        var $div = $('<div>', {'class': 'cp-admin-' + key + ' cp-sidebarlayout-element'});
        var $btn = $(h('button.btn.btn-primary', Messages.oo_refresh));
        $btn.click(function () {
            onRefreshStats.fire();
        });
        $div.append($btn);
        return $div;
    };

    create['active-sessions'] = function () {
        var key = 'active-sessions';
        var $div = makeBlock(key); // Msg.admin_activeSessionsHint, .admin_activeSessionsTitle
        var onRefresh = function () {
            $div.find('pre').remove();
            sFrameChan.query('Q_ADMIN_RPC', {
                cmd: 'ACTIVE_SESSIONS',
            }, function (e, data) {
                var total = data[0];
                var ips = data[1];
                $div.find('pre').remove();
                $div.append(h('pre', total + ' (' + ips + ')'));
            });
        };
        onRefresh();
        onRefreshStats.reg(onRefresh);
        return $div;
    };
    create['active-pads'] = function () {
        var key = 'active-pads';
        var $div = makeBlock(key); // Msg.admin_activePadsHint, .admin_activePadsTitle
        var onRefresh = function () {
            $div.find('pre').remove();
            sFrameChan.query('Q_ADMIN_RPC', {
                cmd: 'ACTIVE_PADS',
            }, function (e, data) {
                console.log(e, data);
                $div.find('pre').remove();
                $div.append(h('pre', String(data)));
            });
        };
        onRefresh();
        onRefreshStats.reg(onRefresh);
        return $div;
    };
    create['open-files'] = function () {
        var key = 'open-files';
        var $div = makeBlock(key); // Msg.admin_openFilesHint, .admin_openFilesTitle
        var onRefresh = function () {
            $div.find('pre').remove();
            sFrameChan.query('Q_ADMIN_RPC', {
                cmd: 'GET_FILE_DESCRIPTOR_COUNT',
            }, function (e, data) {
                console.log(e, data);
                $div.find('pre').remove();
                $div.append(h('pre', String(data)));
            });
        };
        onRefresh();
        onRefreshStats.reg(onRefresh);
        return $div;
    };
    create['registered'] = function () {
        var key = 'registered';
        var $div = makeBlock(key); // Msg.admin_registeredHint, .admin_registeredTitle
        var onRefresh = function () {
            $div.find('pre').remove();
            sFrameChan.query('Q_ADMIN_RPC', {
                cmd: 'REGISTERED_USERS',
            }, function (e, data) {
                console.log(e, data);
                $div.find('pre').remove();
                $div.append(h('pre', String(data)));
            });
        };
        onRefresh();
        onRefreshStats.reg(onRefresh);
        return $div;
    };
    create['disk-usage'] = function () {
        var key = 'disk-usage';
        var $div = makeBlock(key, true); // Msg.admin_diskUsageHint, .admin_diskUsageTitle, .admin_diskUsageButton
        var called = false;
        $div.find('button').click(function () {
            $div.find('button').hide();
            if (called) { return; }
            called = true;
            sFrameChan.query('Q_ADMIN_RPC', {
                cmd: 'DISK_USAGE',
            }, function (e, data) {
                console.log(e, data);
                if (e) { return void console.error(e); }
                var obj = data[0];
                Object.keys(obj).forEach(function (key) {
                    var val = obj[key];
                    var unit = Util.magnitudeOfBytes(val);
                    if (unit === 'GB') {
                        obj[key] = Util.bytesToGigabytes(val) + ' GB';
                    } else if (unit === 'MB') {
                        obj[key] = Util.bytesToMegabytes(val) + ' MB';
                    } else {
                        obj[key] = Util.bytesToKilobytes(val) + ' KB';
                    }
                });
                $div.append(h('ul', Object.keys(obj).map(function (k) {
                    return h('li', [
                        h('strong', k === 'total' ? k : '/' + k),
                        ' : ',
                        obj[k]
                    ]);
                })));
            });
        });
        return $div;
    };

    var supportKey = ApiConfig.supportMailbox;
    create['support-list'] = function () {
        if (!supportKey || !APP.privateKey) { return; }
        var $container = makeBlock('support-list'); // Msg.admin_supportListHint, .admin_supportListTitle
        var $div = $(h('div.cp-support-container')).appendTo($container);

        var catContainer = h('div.cp-dropdown-container');
        var col1 = h('div.cp-support-column', h('h1', [
            h('span', Messages.admin_support_premium),
            h('span.cp-support-count'),
            h('button.btn.cp-support-column-button', Messages.admin_support_collapse)
        ]));
        var col2 = h('div.cp-support-column', h('h1', [
            h('span', Messages.admin_support_normal),
            h('span.cp-support-count'),
            h('button.btn.cp-support-column-button', Messages.admin_support_collapse)
        ]));
        var col3 = h('div.cp-support-column', h('h1', [
            h('span', Messages.admin_support_answered),
            h('span.cp-support-count'),
            h('button.btn.cp-support-column-button', Messages.admin_support_collapse)
        ]));
        var col4 = h('div.cp-support-column', h('h1', [
            h('span', Messages.admin_support_closed),
            h('span.cp-support-count'),
            h('button.btn.cp-support-column-button', Messages.admin_support_collapse)
        ]));
        var $col1 = $(col1), $col2 = $(col2), $col3 = $(col3), $col4 = $(col4);
        $div.append([
            //catContainer
            col1,
            col2,
            col3,
            col4
        ]);
        $div.find('.cp-support-column-button').click(function () {
            var $col = $(this).closest('.cp-support-column');
            $col.toggleClass('cp-support-column-collapsed');
            if ($col.hasClass('cp-support-column-collapsed')) {
                $(this).text(Messages.admin_support_open);
                $(this).toggleClass('btn-primary');
            } else {
                $(this).text(Messages.admin_support_collapse);
                $(this).toggleClass('btn-primary');
            }
        });
        var category = 'all';
        var $drop = APP.support.makeCategoryDropdown(catContainer, function (key) {
            category = key;
            if (key === 'all') {
                $div.find('.cp-support-list-ticket').show();
                return;
            }
            $div.find('.cp-support-list-ticket').hide();
            $div.find('.cp-support-list-ticket[data-cat="'+key+'"]').show();
        }, true);
        $drop.setValue('all');

        var metadataMgr = common.getMetadataMgr();
        var privateData = metadataMgr.getPrivateData();
        var cat = privateData.category || '';
        var linkedId = cat.indexOf('-') !== -1 && cat.slice(8);

        var hashesById = {};

        var getTicketData = function (id) {
            var t = hashesById[id];
            if (!Array.isArray(t) || !t.length) { return; }
            var ed = Util.find(t[0], ['content', 'msg', 'content', 'sender', 'edPublic']);
            // If one of their ticket was sent as a premium user, mark them as premium
            var premium = t.some(function (msg) {
                var _ed = Util.find(msg, ['content', 'msg', 'content', 'sender', 'edPublic']);
                if (ed !== _ed) { return; }
                return Util.find(msg, ['content', 'msg', 'content', 'sender', 'plan']);
            });
            var lastMsg = t[t.length - 1];
            var lastMsgEd = Util.find(lastMsg, ['content', 'msg', 'content', 'sender', 'edPublic']);
            return {
                lastMsg: lastMsg,
                time: Util.find(lastMsg, ['content', 'msg', 'content', 'time']),
                lastMsgEd: lastMsgEd,
                lastAdmin: lastMsgEd !== ed && ApiConfig.adminKeys.indexOf(lastMsgEd) !== -1,
                premium: premium,
                authorEd: ed,
                closed: Util.find(lastMsg, ['content', 'msg', 'type']) === 'CLOSE'
            };
        };

        var addClickHandler = function ($ticket) {
            $ticket.on('click', function () {
                $ticket.toggleClass('cp-support-open', true);
                $ticket.off('click');
            });
        };
        var makeOpenButton = function ($ticket) {
            var button = h('button.btn.btn-primary.cp-support-expand', Messages.admin_support_open);
            var collapse = h('button.btn.cp-support-collapse', Messages.admin_support_collapse);
            $(button).click(function () {
                $ticket.toggleClass('cp-support-open', true);
            });
            addClickHandler($ticket);
            $(collapse).click(function (e) {
                $ticket.toggleClass('cp-support-open', false);
                e.stopPropagation();
                setTimeout(function () {
                    addClickHandler($ticket);
                });
            });
            $ticket.find('.cp-support-title-buttons').prepend([button, collapse]);
            $ticket.append(h('div.cp-support-collapsed'));
        };
        var updateTicketDetails = function ($ticket, isPremium) {
            var $first = $ticket.find('.cp-support-message-from').first();
            var user = $first.find('span').first().html();
            var time = $first.find('.cp-support-message-time').text();
            var last = $ticket.find('.cp-support-message-from').last().find('.cp-support-message-time').text();
            var $c = $ticket.find('.cp-support-collapsed');
            var txtClass = isPremium ? ".cp-support-ispremium" : "";
            $c.html('').append([
                UI.setHTML(h('span'+ txtClass), user),
                h('span', [
                    h('b', Messages.admin_support_first),
                    h('span', time)
                ]),
                h('span', [
                    h('b', Messages.admin_support_last),
                    h('span', last)
                ])
            ]);

        };

        var sort = function (id1, id2) {
            var t1 = getTicketData(id1);
            var t2 = getTicketData(id2);
            if (!t1) { return 1; }
            if (!t2) { return -1; }
            /*
            // If one is answered and not the other, put the unanswered first
            if (t1.lastAdmin && !t2.lastAdmin) { return 1; }
            if (!t1.lastAdmin && t2.lastAdmin) { return -1; }
            */
            // Otherwise, sort them by time
            return t1.time - t2.time;
        };

        var _reorder = function () {
            var orderAnswered = Object.keys(hashesById).filter(function (id) {
                var d = getTicketData(id);
                return d && d.lastAdmin && !d.closed;
            }).sort(sort);
            var orderPremium = Object.keys(hashesById).filter(function (id) {
                var d = getTicketData(id);
                return d && d.premium && !d.lastAdmin && !d.closed;
            }).sort(sort);
            var orderNormal = Object.keys(hashesById).filter(function (id) {
                var d = getTicketData(id);
                return d && !d.premium && !d.lastAdmin && !d.closed;
            }).sort(sort);
            var orderClosed = Object.keys(hashesById).filter(function (id) {
                var d = getTicketData(id);
                return d && d.closed;
            }).sort(sort);
            var cols = [$col1, $col2, $col3, $col4];
            [orderPremium, orderNormal, orderAnswered, orderClosed].forEach(function (list, j) {
                list.forEach(function (id, i) {
                    var $t = $div.find('[data-id="'+id+'"]');
                    var d = getTicketData(id);
                    $t.css('order', i).appendTo(cols[j]);
                    updateTicketDetails($t, d.premium);
                });
                if (!list.length) {
                    cols[j].hide();
                } else {
                    cols[j].show();
                    cols[j].find('.cp-support-count').text(list.length);
                }
            });
        };
        var reorder = Util.throttle(_reorder, 150);

        var to = Util.throttle(function () {
            var $ticket = $div.find('.cp-support-list-ticket[data-id="'+linkedId+'"]');
            $ticket.addClass('cp-support-open');
            $ticket[0].scrollIntoView();
            linkedId = undefined;
        }, 200);

        // Register to the "support" mailbox
        common.mailbox.subscribe(['supportadmin'], {
            onMessage: function (data) {
                /*
                    Get ID of the ticket
                    If we already have a div for this ID
                        Push the message to the end of the ticket
                    If it's a new ticket ID
                        Make a new div for this ID
                */
                var msg = data.content.msg;
                var hash = data.content.hash;
                var content = msg.content;
                var id = content.id;
                var $ticket = $div.find('.cp-support-list-ticket[data-id="'+id+'"]');

                hashesById[id] = hashesById[id] || [];
                if (hashesById[id].indexOf(hash) === -1) {
                    hashesById[id].push(data);
                }

                if (msg.type === 'CLOSE') {
                    // A ticket has been closed by the admins...
                    if (!$ticket.length) { return; }
                    $ticket.addClass('cp-support-list-closed');
                    $ticket.append(APP.support.makeCloseMessage(content, hash));
                    reorder();
                    return;
                }
                if (msg.type !== 'TICKET') { return; }
                $ticket.removeClass('cp-support-list-closed');

                if (!$ticket.length) {
                    $ticket = APP.support.makeTicket($div, content, function (hideButton) {
                        // the ticket will still be displayed until the worker confirms its deletion
                        // so make it unclickable in the meantime
                        hideButton.setAttribute('disabled', true);
                        var error = false;
                        nThen(function (w) {
                            hashesById[id].forEach(function (d) {
                                common.mailbox.dismiss(d, w(function (err) {
                                    if (err) {
                                        error = true;
                                        console.error(err);
                                    }
                                }));
                            });
                        }).nThen(function () {
                            if (!error) {
                                $ticket.remove();
                                delete hashesById[id];
                                reorder();
                                return;
                            }
                            // if deletion failed then reactivate the button and warn
                            hideButton.removeAttribute('disabled');
                            // and show a generic error message
                            UI.alert(Messages.error);
                        });
                    });
                    makeOpenButton($ticket);
                    if (category !== 'all' && $ticket.attr('data-cat') !== category) {
                        $ticket.hide();
                    }
                }
                $ticket.append(APP.support.makeMessage(content, hash));
                reorder();

                if (linkedId) { to(); }
            }
        });
        return $container;
    };


    var checkAdminKey = function (priv) {
        if (!supportKey) { return; }
        return Hash.checkBoxKeyPair(priv, supportKey);
    };

    create['support-init'] = function () {
        var $div = makeBlock('support-init'); // Msg.admin_supportInitHint, .admin_supportInitTitle
        if (!supportKey) {
            $div.append(h('p', Messages.admin_supportInitHelp));
            return $div;
        }
        if (!APP.privateKey || !checkAdminKey(APP.privateKey)) {
            $div.append(h('p', Messages.admin_supportInitPrivate));

            var error = h('div.cp-admin-support-error');
            var input = h('input.cp-admin-add-private-key');
            var button = h('button.btn.btn-primary', Messages.admin_supportAddKey);

            if (APP.privateKey && !checkAdminKey(APP.privateKey)) {
                $(error).text(Messages.admin_supportAddError);
            }

            $div.append(h('div', [
                error,
                input,
                button
            ]));

            $(button).click(function () {
                var key = $(input).val();
                if (!checkAdminKey(key)) {
                    $(input).val('');
                    return void $(error).text(Messages.admin_supportAddError);
                }
                sFrameChan.query("Q_ADMIN_MAILBOX", key, function () {
                    APP.privateKey = key;
                    $('.cp-admin-support-init').hide();
                    APP.$rightside.append(create['support-list']());
                });
            });
            return $div;
        }
        return;
    };

    Messages.admin_cat_broadcast = "Broadcast"; // XXX
    // Messages.admin_broadcastHint // XXX
    // Messages.admin_broadcastTitle // XXX

    //Messages.admin_broadcastDeleteHint // XXX
    //Messages.admin_broadcastDeleteTitle // XXX

    Messages.broadcast_new = "New message";
    Messages.broadcast_maintenance = 'maintenance';// XXX
    Messages.broadcast_survey = 'survey'; // XXX
    Messages.broadcast_version = 'version'; // XXX
    Messages.broadcast_custom = 'custom'; // XXX
    Messages.broadcast_delete = 'delete'; // XXX
    Messages.broadcast_newVersionReload = 'Force a worker reload on all clients'; // XXX
    Messages.broadcast_surveyURL = 'Survey URL';
    Messages.broadcast_translations = 'Translations';
    Messages.broadcast_defaultLanguage = 'Fallback to this language (optional)';
    Messages.broadcast_start = 'Start time';
    Messages.broadcast_end = 'End time';
    Messages.broadcast_preview = "Preview in a fake notification";
    Messages.broadcast_deleteBtn = "Delete for all";
    Messages.broadcast_clear = "Clear all for everybody";
    Messages.expired = "Expired";
    Messages.broadcast_empty = "No active message";
    Messages.broadcast_noFallback = "Don't fallback to a default language";

    var onRefreshBroadcast = Util.mkEvent();
    var getBroadcastForm = function ($form, key) {
        $form.empty();

        var getData = function () {
            return false;
        };
        var reset = function () {};

        var button = h('button.btn.btn-primary', Messages.support_formButton);
        var $button = $(button);

        var send = function (_cb) {
            var cb = Util.once(_cb || function () {});
            var data = getData();
            if (data === false) {
                cb('NODATA');
                return void UI.warn(Messages.error);
            }
            $button.prop('disabled', 'disabled');
            data.time = +new Date();
            common.mailbox.sendTo('BROADCAST_'+key.toUpperCase(), data, {}, function (err, data) {
                $button.prop('disabled', '');
                cb(err, data);
                if (err) {
                    console.error(err);
                    return UI.warn(Messages.error);
                }


                // Only print success if there is no callback
                if (!_cb) {
                    UI.log(Messages.saved);
                    // Clear the UI
                    reset();
                    onRefreshBroadcast.fire();
                }
            });
        };

        $button.click(function () {
            send();
        });

        var onPreview = function (l) {
            var data = getData();
            if (data === false) { return void UI.warn(Messages.error); }
            var msg = {
                uid: Util.uid(),
                type: 'BROADCAST_'+key.toUpperCase(),
                content: data
            };
            common.mailbox.onMessage({
                lang: l,
                type: 'broadcast',
                content: {
                    msg: msg,
                    hash: 'LOCAL|' + JSON.stringify(msg).slice(0,58)
                }
            }, function () {
                UI.log(Messages.saved);
            });
        };
        var preview = h('button.cp-broadcast-preview.btn.btn-secondary', Messages.broadcast_preview);
        $(preview).click(function () {
            onPreview();
        });


        if (key === 'custom') {
            (function () {
                // Custom message
                var container = h('div.cp-broadcast-container');
                var $container = $(container);
                var languages = Messages._languages;
                var keys = Object.keys(languages).sort();

                // Always keep the textarea ordered by language code
                var reorder = function () {
                    $container.find('.cp-broadcast-lang').each(function (i, el) {
                        var $el = $(el);
                        var l = $el.attr('data-lang');
                        $el.css('order', keys.indexOf(l));
                    });
                };

                var noFallbackBtn = h('button.btn.btn-secondary.cp-broadcast-preview',
                                        Messages.broadcast_noFallback);
                var $noFallbackBtn = $(noFallbackBtn);
                var checkFallbackBtn = function () {
                    var hasDefault = $container.find('.cp-broadcast-lang .cp-checkmark input:checked').length;
                    if (hasDefault) {
                        $noFallbackBtn.css('visibility', '');
                    } else {
                        $noFallbackBtn.css('visibility', 'hidden');
                    }
                };

                // Remove a textarea
                var removeLang = function (l) {
                    $container.find('.cp-broadcast-lang[data-lang="'+l+'"]').remove();
                    checkFallbackBtn();
                };

                // Add a textarea
                var addLang = function (l) {
                    if ($container.find('.cp-broadcast-lang[data-lang="'+l+'"]').length) { return; }
                    var preview = h('button.btn.btn-secondary', Messages.broadcast_preview);
                    $(preview).click(function () {
                        onPreview(l);
                    });
                    var bcastDefault = Messages.broadcast_defaultLanguage;
                    var first = !$container.find('.cp-broadcast-lang').length;
                    var radio = UI.createRadio('broadcastDefault', null, bcastDefault, first, {
                        'data-lang': l,
                        label: {class: 'noTitle'}
                    });
                    $(radio).find('input').on('change', function () {
                        checkFallbackBtn();
                    });
                    $container.append(h('div.cp-broadcast-lang', { 'data-lang': l }, [
                        h('h4', languages[l]),
                        h('label', Messages.kanban_body),
                        h('textarea'),
                        radio,
                        preview
                    ]));
                    checkFallbackBtn();
                    reorder();
                };

                // Checkboxes to select translations
                var boxes = keys.map(function (l) {
                    var $cbox = $(UI.createCheckbox('cp-broadcast-custom-lang-'+l,
                        languages[l], false, { label: { class: 'noTitle' } }));
                    var $check = $cbox.find('input').on('change', function () {
                        var c = $check.is(':checked');
                        if (c) { return void addLang(l); }
                        removeLang(l);
                    });
                    if (l === 'en') {
                        setTimeout(function () {
                            $check.click();
                        });
                    }
                    return $cbox[0];
                });

                // Extract form data
                getData = function () {
                    var map = {};
                    var defaultLanguage;
                    var error = false;
                    $container.find('.cp-broadcast-lang').each(function (i, el) {
                        var $el = $(el);
                        var l = $el.attr('data-lang');
                        if (!l) { error = true; return; }
                        var text = $el.find('textarea').val();
                        if (!text.trim()) { error = true; return; }
                        if ($el.find('.cp-checkmark input').is(':checked')) {
                            defaultLanguage = l;
                        }
                        map[l] = text;
                    });
                    if (!Object.keys(map).length) {
                        console.error('You must select at least one language');
                        return false;
                    }
                    if (error) {
                        console.error('One of the selected languages has no data');
                        return false;
                    }
                    return {
                        defaultLanguage: defaultLanguage,
                        content: map
                    };
                };
                // Clear all the textarea when sent
                reset = function () {
                    $container.find('.cp-broadcast-lang textarea').each(function (i, el) {
                        $(el).val('');
                    });
                };

                // "Don't fallback to a default language" button
                $noFallbackBtn.click(function () {
                    $container.find('.cp-checkmark input').prop('checked', false);
                    $noFallbackBtn.css('visibility', 'hidden');
                });

                // Make the form
                $form.append([
                    h('label', Messages.broadcast_translations),
                    h('div.cp-broadcast-languages', boxes),
                    container,
                    button,
                    noFallbackBtn
                ]);
            })();
            return;
        }
        if (key === 'maintenance') {
            (function () {
                // Maintenance message

                // Start and end date pickers
                var start = h('input');
                var end = h('input');
                var $start = $(start);
                var $end = $(end);
                var endPickr = Flatpickr(end, {
                    enableTime: true,
                    minDate: new Date()
                });
                Flatpickr(start, {
                    enableTime: true,
                    minDate: new Date(),
                    onChange: function () {
                        endPickr.set('minDate', new Date($start.val()));
                    }
                });

                // Extract form data
                getData = function () {
                    var start = +new Date($start.val());
                    var end = +new Date($end.val());
                    if (isNaN(start) || isNaN(end)) {
                        console.error('Invalid dates');
                        return false;
                    }
                    return {
                        start: start,
                        end: end
                    };
                };

                // Clear when sent
                reset = function () {
                    $start.val('');
                    $end.val('');
                };
                $form.append([
                    h('label', Messages.broadcast_start),
                    start,
                    h('label', Messages.broadcast_end),
                    end,
                    h('br'),
                    button,
                    preview
                ]);
            })();
            return;
        }
        if (key === 'version') {
            (function () {
                // New version available message

                // This checkbox can be used to trigger a fake "reconnect" event on the clients
                // so that they can check api/config and reload the worker in case of a new version
                var $cbox = $(UI.createCheckbox('cp-admin-version-reload',
                    Messages.broadcast_newVersionReload,
                    false, { label: { class: 'noTitle' } }));
                var $checkbox = $cbox.find('input');

                // Extract the data and make the form
                getData = function () {
                    return {
                        reload: $checkbox.is(':checked')
                    };
                };
                reset = function () {
                    $checkbox[0].checked = false;
                };
                $form.append([
                    $cbox[0],
                    h('br'),
                    button,
                    preview
                ]);
            })();
            return;
        }
        if (key === 'survey') {
            (function () {
                // New survey message
                // TODO send different URLs for other languages?
                var label = h('label', Messages.broadcast_surveyURL);
                var input = h('input');
                var $input = $(input);
                getData = function () {
                    var url = $input.val();
                    if (!Util.isValidURL(url)) {
                        console.error('Invalid URL');
                        return false;
                    }
                    return {
                        url: url
                    };
                };
                reset = function () {
                    $input.val('');
                };
                $form.append([
                    label,
                    input,
                    h('br'),
                    button,
                    preview
                ]);
            })();
            return;
        }

        if (key === 'delete') {
            // Delete form
            require(['/api/broadcast?'+ (+new Date())], function (BCast) {

            // Always display the messages from the instance "lastBroadcastHash"
            var hash = BCast.lastBroadcastHash || '1'; // Truthy value if no lastKnownHash
            common.mailbox.getNotificationsHistory('broadcast', null, hash, function (e, msgs) {
                var table = h('table.cp-broadcast-delete');
                var $table = $(table);

                // Empty history
                if (!msgs.length) {
                    $table.append(h('tr', h('td.empty', Messages.broadcast_empty)));
                }

                // Build the table
                msgs.forEach(function (data) {
                    var el = common.mailbox.createElement(data);
                    var t = Util.find(data, ['content', 'msg', 'type']);

                    // A "DELETE" message is here to disable a previous line
                    if (t === 'BROADCAST_DELETE') {
                        var _uid = Util.find(data, ['content', 'msg', 'content', 'uid']);
                        var $button = $table.find('[data-uid="'+_uid+'"] td.delete button');
                        $button.prop('disabled', 'disabled').text(Messages.deleted);
                        return;
                    }

                    // Make the line
                    var uid = Util.find(data, ['content', 'msg', 'uid']);
                    var time = Util.find(data, ['content', 'msg', 'content', 'time']);
                    var deleteBtn = h('button.btn.btn-danger', Messages.broadcast_deleteBtn);
                    var tr = h('tr', { 'data-uid': uid }, [
                        h('td', 'ID: '+uid),
                        h('td', new Date(time || 0).toLocaleString()),
                        h('td', el),
                        h('td.delete', deleteBtn),
                    ]);

                    // Auto-expire maintenance and survey messages
                    if (t === 'BROADCAST_MAINTENANCE') {
                        var end = Util.find(data, ['content', 'msg', 'content', 'end']);
                        if (end < +new Date()) {
                            $(deleteBtn).prop('disabled', 'disabled').text(Messages.expired);
                        }
                    }
                    if (t === 'BROADCAST_VERSION') {
                        $(deleteBtn).prop('disabled', 'disabled').text(Messages.expired);
                    }

                    // "Delete this message" button
                    UI.confirmButton(deleteBtn, {
                        classes: 'btn-danger',
                        multiple: true
                    }, function () {
                        getData = function () {
                            if (!uid) { return false; }
                            return { uid: uid };
                        };
                        reset = function () {
                            $(deleteBtn).prop('disabled', 'disabled').text(Messages.deleted);
                        };
                        send();
                    });

                    $table.append(tr);
                });

                // Clear all button: remove all the messages and bump lastBroadcastHash
                var clearAll = h('button.btn.btn-danger', Messages.broadcast_clear);
                UI.confirmButton(clearAll, {
                    classes: 'btn-danger',
                    multiple: true
                }, function () {
                    getData = function () {
                        return { all: true };
                    };
                    reset = function () {};

                    // Send a message to all users telling them to wipe the broadcast mailbox
                    // and on success, send an admin decree to update /api/broadcast
                    send(function (err, obj) {
                        if (err) { return; }
                        if (!obj || !obj.hash) { return; }
                        sFrameChan.query('Q_ADMIN_RPC', {
                            cmd: 'ADMIN_DECREE',
                            data: ['SET_LAST_BROADCAST_HASH', [obj.hash]]
                        }, function (e) {
                            if (e) {
                                UI.warn(Messages.error); console.error(e);
                                return;
                            }
                            // On success, reload the "delete" tab
                            onRefreshBroadcast.fire();
                        });
                    });
                });

                $form.append([
                    table,
                    msgs.length ? clearAll : undefined
                ]);
            });
            });
            return;
        }

    };
    create['broadcast'] = function () {
        var key = 'broadcast';
        var $div = makeBlock(key);

        var form = h('div.cp-admin-broadcast-form');
        var $select = $(h('div.cp-dropdown-container')).appendTo($div);
        var $form = $(form).appendTo($div);

        var categories = [
            'maintenance',
            'survey',
            'version',
            'custom',
        ];

        // The "version" message only works if the instance is using a manual /api/config
        // This is a custom setup for which our team won't provide support and is NOT
        // recommended unless you know exactly what you're doing.
        if (!AppConfig.customApiConfig) { categories.splice(2,1); }

        categories = categories.map(function (key) {
            return {
                tag: 'a',
                content: h('span', Messages['broadcast_'+key]),
                action: function () {
                    getBroadcastForm($form, key);
                }
            };
        });
        var dropdownCfg = {
            text: Messages.broadcast_new,
            angleDown: 1,
            options: categories,
            container: $select,
            isSelect: true,
            buttonCls: 'btn btn-default'
        };
        UIElements.createDropdown(dropdownCfg);


        return $div;
    };

    create['broadcast-delete'] = function () {
        var key = 'broadcast-delete';
        var $div = makeBlock(key);

        var form = h('div.cp-admin-broadcast-form');
        var $form = $(form).appendTo($div);
        getBroadcastForm($form, 'delete');
        onRefreshBroadcast.reg(function () {
            getBroadcastForm($form, 'delete');
        });
        return $div;
    };



    var onRefreshPerformance = Util.mkEvent();

    create['refresh-performance'] = function () {
        var key = 'refresh-performance';
        var btn = h('button.btn.btn-primary', Messages.oo_refresh);
        var div = h('div.cp-admin-' + key + '.cp-sidebarlayout-element', btn);
        $(btn).click(function () {
            onRefreshPerformance.fire();
        });
        return $(div);
    };

    create['performance-profiling'] = function () {
        var $div = makeBlock('performance-profiling'); // Msg.admin_performanceProfilingHint, .admin_performanceProfilingTitle

        var onRefresh = function () {
            var body = h('tbody');

            var table = h('table#cp-performance-table', [
                h('thead', [
                    h('th', Messages.admin_performanceKeyHeading),
                    h('th', Messages.admin_performanceTimeHeading),
                    h('th', Messages.admin_performancePercentHeading),
                ]),
                body,
            ]);
            var appendRow = function (key, time, percent) {
                console.log("[%s] %ss running time (%s%)", key, time, percent);
                body.appendChild(h('tr', [ key, time, percent ].map(function (x) {
                    return h('td', x);
                })));
            };
            var process = function (_o) {
                var o = _o[0];
                var sorted = Object.keys(o).sort(function (a, b) {
                  if (o[b] - o[a] <= 0) { return -1; }
                  return 1;
                });
                var total = 0;
                sorted.forEach(function (k) { total += o[k]; });
                sorted.forEach(function (k) {
                    var percent = Math.floor((o[k] / total) * 1000) / 10;
                    appendRow(k, o[k], percent);
                });
            };

            sFrameChan.query('Q_ADMIN_RPC', {
                cmd: 'GET_WORKER_PROFILES',
            }, function (e, data) {
                if (e) { return void console.error(e); }
                //console.info(data);
                $div.find("table").remove();


                process(data);
                $div.append(table);
            });
        };

        onRefresh();
        onRefreshPerformance.reg(onRefresh);

        return $div;
    };

    var hideCategories = function () {
        APP.$rightside.find('> div').hide();
    };
    var showCategories = function (cat) {
        hideCategories();
        cat.forEach(function (c) {
            APP.$rightside.find('.'+c).show();
        });
    };

    var SIDEBAR_ICONS = {
        general: 'fa fa-user-o',
        stats: 'fa fa-line-chart',
        quota: 'fa fa-hdd-o',
        support: 'fa fa-life-ring',
        broadcast: 'fa fa-bullhorn',
        performance: 'fa fa-heartbeat',
    };

    var createLeftside = function () {
        var $categories = $('<div>', {'class': 'cp-sidebarlayout-categories'})
                            .appendTo(APP.$leftside);
        var metadataMgr = common.getMetadataMgr();
        var privateData = metadataMgr.getPrivateData();
        var active = privateData.category || 'general';
        if (active.indexOf('-') !== -1) {
            active = active.split('-')[0];
        }
        common.setHash(active);
        Object.keys(categories).forEach(function (key) {
            var $category = $('<div>', {'class': 'cp-sidebarlayout-category'}).appendTo($categories);
            var iconClass = SIDEBAR_ICONS[key];
            if (iconClass) {
                $category.append($('<span>', {'class': iconClass}));
            }

            if (key === active) {
                $category.addClass('cp-leftside-active');
            }

            $category.click(function () {
                if (!Array.isArray(categories[key]) && categories[key].onClick) {
                    categories[key].onClick();
                    return;
                }
                active = key;
                common.setHash(key);
                $categories.find('.cp-leftside-active').removeClass('cp-leftside-active');
                $category.addClass('cp-leftside-active');
                showCategories(categories[key]);
            });

            $category.append(Messages['admin_cat_'+key] || key);
        });
        showCategories(categories[active]);
    };

    var createToolbar = function () {
        var displayed = ['useradmin', 'newpad', 'limit', 'pageTitle', 'notifications'];
        var configTb = {
            displayed: displayed,
            sfCommon: common,
            $container: APP.$toolbar,
            pageTitle: Messages.adminPage || 'Admin',
            metadataMgr: common.getMetadataMgr(),
        };
        APP.toolbar = Toolbar.create(configTb);
        APP.toolbar.$rightside.hide();
    };

    var updateStatus = APP.updateStatus = function (cb) {
        sFrameChan.query('Q_ADMIN_RPC', {
            cmd: 'INSTANCE_STATUS',
        }, function (e, data) {
            if (e) { console.error(e); return void cb(e); }
            if (!Array.isArray(data)) { return void cb('EINVAL'); }
            APP.instanceStatus = data[0];
            console.log("Status", APP.instanceStatus);
            cb();
        });
    };

    nThen(function (waitFor) {
        $(waitFor(UI.addLoadingScreen));
        SFCommon.create(waitFor(function (c) { APP.common = common = c; }));
    }).nThen(function (waitFor) {
        APP.$container = $('#cp-sidebarlayout-container');
        APP.$toolbar = $('#cp-toolbar');
        APP.$leftside = $('<div>', {id: 'cp-sidebarlayout-leftside'}).appendTo(APP.$container);
        APP.$rightside = $('<div>', {id: 'cp-sidebarlayout-rightside'}).appendTo(APP.$container);
        sFrameChan = common.getSframeChannel();
        sFrameChan.onReady(waitFor());
    }).nThen(function (waitFor) {
        updateStatus(waitFor());
    }).nThen(function (/*waitFor*/) {
        createToolbar();
        var metadataMgr = common.getMetadataMgr();
        var privateData = metadataMgr.getPrivateData();
        common.setTabTitle(Messages.adminPage || 'Administration');

        if (!common.isAdmin()) {
            return void UI.errorLoadingScreen(Messages.admin_authError || '403 Forbidden');
        }

        APP.privateKey = privateData.supportPrivateKey;
        APP.origin = privateData.origin;
        APP.readOnly = privateData.readOnly;
        APP.support = Support.create(common, true);


        // Content
        var $rightside = APP.$rightside;
        var addItem = function (cssClass) {
            var item = cssClass.slice(9); // remove 'cp-settings-'
            if (typeof (create[item]) === "function") {
                $rightside.append(create[item]());
            }
        };
        for (var cat in categories) {
            if (!Array.isArray(categories[cat])) { continue; }
            categories[cat].forEach(addItem);
        }

        createLeftside();

        UI.removeLoadingScreen();

    });
});
