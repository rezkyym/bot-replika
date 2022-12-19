"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Replika = exports.ReplikaLoginResult = void 0;
var pc = require("puppeteer-cluster");
var Fs = require("fs");
var ReplikaLoginResult;
(function (ReplikaLoginResult) {
    ReplikaLoginResult[ReplikaLoginResult["WRONG_USERNAME"] = 0] = "WRONG_USERNAME";
    ReplikaLoginResult[ReplikaLoginResult["WRONG_PASSWORD"] = 1] = "WRONG_PASSWORD";
    ReplikaLoginResult[ReplikaLoginResult["SUCCESS"] = 2] = "SUCCESS";
})(ReplikaLoginResult = exports.ReplikaLoginResult || (exports.ReplikaLoginResult = {}));
var Replika = /** @class */ (function () {
    function Replika() {
        this.loginNextButtonSelector = 'button[data-testid="login-next-button"]';
        this.chatMessageListSelector = 'div[data-testid="chat-messages"]';
        this.messageAuthorSelector = 'div[data-testid="chat-message-text"]';
        this.sendMessageSelector = '#send-message-textarea';
        this.createCluster = this.createCluster.bind(this);
        this.saveLocalStorage = this.saveLocalStorage.bind(this);
        this.restoreLocalStorage = this.restoreLocalStorage.bind(this);
        this.addMessageToQueue = this.addMessageToQueue.bind(this);
        this.addImageToQueue = this.addImageToQueue.bind(this);
        this.closeSession = this.closeSession.bind(this);
        this.isLoggedIn = this.isLoggedIn.bind(this);
        this.destroyCluster = this.destroyCluster.bind(this);
        this.sessionCount = this.sessionCount.bind(this);
        this.sessionInfo = [];
        this.messageQueue = [];
        this.imageQueue = [];
    }
    Replika.prototype.sessionCount = function () {
        return this.sessionInfo.length;
    };
    Replika.prototype.isLoggedIn = function (userId) {
        return this.sessionInfo.find(function (v) { return v.userId == userId; }) !== undefined;
    };
    Replika.prototype.addMessageToQueue = function (message, userId) {
        this.messageQueue.push({ userId: userId, message: message });
    };
    Replika.prototype.addImageToQueue = function (filePath, userId) {
        this.imageQueue.push({ userId: userId, filePath: filePath, isUploaded: false });
    };
    Replika.prototype.createCluster = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, pc.Cluster.launch({
                                concurrency: pc.Cluster.CONCURRENCY_CONTEXT,
                                maxConcurrency: 10,
                                timeout: Math.pow(2, 31) - 1,
                                puppeteerOptions: {
                                    //headless: false,
                                    args: [
                                        '--no-sandbox',
                                        '--disable-setuid-sandbox',
                                        '--disable-dev-shm-usage',
                                        '--disable-accelerated-2d-canvas',
                                        '--no-first-run',
                                        '--no-zygote',
                                        '--disable-gpu'
                                    ]
                                }
                            })];
                    case 1:
                        _a.cluster = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Replika.prototype.destroyCluster = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cluster.idle()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.cluster.close()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Replika.prototype.closeSession = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.sessionInfo.find(function (v) { return v.userId == userId; })) {
                    // Remove it, to kill the while loop.
                    this.sessionInfo = this.sessionInfo.filter(function (v) { return v.userId != userId; });
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * queueSessionLogin
     */
    Replika.prototype.login = function (email, password, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.sessionInfo.find(function (v) { return v.userId == userId; })) {
                            // Remove it, to kill the while loop.
                            this.sessionInfo = this.sessionInfo.filter(function (v) { return v.userId != userId; });
                        }
                        return [4 /*yield*/, this.cluster.execute(function (_a) {
                                var page = _a.page;
                                return __awaiter(_this, void 0, void 0, function () {
                                    var error_1, error_2, error_3;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, page.goto('https://my.replika.ai/login')];
                                            case 1:
                                                _b.sent();
                                                return [4 /*yield*/, page.waitForSelector(this.loginNextButtonSelector)];
                                            case 2:
                                                _b.sent();
                                                return [4 /*yield*/, page.type('#emailOrPhone', email)];
                                            case 3:
                                                _b.sent();
                                                return [4 /*yield*/, page.click(this.loginNextButtonSelector)];
                                            case 4:
                                                _b.sent();
                                                return [4 /*yield*/, page.waitFor(150)];
                                            case 5:
                                                _b.sent();
                                                _b.label = 6;
                                            case 6:
                                                _b.trys.push([6, 8, , 9]);
                                                return [4 /*yield*/, page.waitForSelector('.sc-AxhCb.auGvR', { timeout: 1500 })];
                                            case 7:
                                                _b.sent();
                                                return [2 /*return*/, ReplikaLoginResult.WRONG_USERNAME];
                                            case 8:
                                                error_1 = _b.sent();
                                                return [3 /*break*/, 9];
                                            case 9: return [4 /*yield*/, page.waitForSelector('#login-password')];
                                            case 10:
                                                _b.sent();
                                                return [4 /*yield*/, page.type('#login-password', password)];
                                            case 11:
                                                _b.sent();
                                                return [4 /*yield*/, page.click(this.loginNextButtonSelector)];
                                            case 12:
                                                _b.sent();
                                                _b.label = 13;
                                            case 13:
                                                _b.trys.push([13, 15, , 16]);
                                                return [4 /*yield*/, page.waitForSelector('.sc-AxhCb.auGvR', { timeout: 1500 })];
                                            case 14:
                                                _b.sent();
                                                return [2 /*return*/, ReplikaLoginResult.WRONG_PASSWORD];
                                            case 15:
                                                error_2 = _b.sent();
                                                return [3 /*break*/, 16];
                                            case 16:
                                                _b.trys.push([16, 19, , 20]);
                                                return [4 /*yield*/, page.waitForSelector(this.sendMessageSelector, { timeout: 10000 })];
                                            case 17:
                                                _b.sent();
                                                // Add to the session cookies.
                                                this.sessionInfo.push({
                                                    userId: userId,
                                                    cookies: page.cookies(),
                                                    isActive: true
                                                });
                                                return [4 /*yield*/, this.saveLocalStorage(page, userId)];
                                            case 18:
                                                _b.sent();
                                                return [2 /*return*/, ReplikaLoginResult.SUCCESS];
                                            case 19:
                                                error_3 = _b.sent();
                                                return [2 /*return*/, ReplikaLoginResult.WRONG_PASSWORD];
                                            case 20: return [2 /*return*/];
                                        }
                                    });
                                });
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Replika.prototype.saveLocalStorage = function (page, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, page.evaluate(function () {
                            var json = {};
                            for (var i = 0; i < localStorage.length; i++) {
                                var key = localStorage.key(i);
                                json[key] = localStorage.getItem(key);
                            }
                            return json;
                        })];
                    case 1:
                        json = _a.sent();
                        this.sessionInfo.find(function (v) { return v.userId == userId; }).localStorage = json;
                        return [2 /*return*/];
                }
            });
        });
    };
    Replika.prototype.restoreLocalStorage = function (page, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        json = this.sessionInfo.find(function (v) { return v.userId == userId; }).localStorage;
                        return [4 /*yield*/, page.evaluate(function (json) {
                                localStorage.clear();
                                for (var key in json)
                                    localStorage.setItem(key, json[key]);
                            }, json)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Replika.prototype.startSession = function (userId, onMessage, onTyping, readyForMessages) {
        return __awaiter(this, void 0, void 0, function () {
            var userData;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userData = this.sessionInfo.find(function (v) { return v.userId == userId; });
                        if (!userData) {
                            console.error('Could not find data for uid', userId);
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.cluster.queue(undefined, function (_a) {
                                var page = _a.page;
                                return __awaiter(_this, void 0, void 0, function () {
                                    var error_4, client, _loop_1, this_1, error_5;
                                    var _this = this;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _b.trys.push([0, 11, , 12]);
                                                return [4 /*yield*/, page.goto('https://my.replika.ai')];
                                            case 1:
                                                _b.sent();
                                                return [4 /*yield*/, this.restoreLocalStorage(page, userId)];
                                            case 2:
                                                _b.sent();
                                                return [4 /*yield*/, page.reload()];
                                            case 3:
                                                _b.sent();
                                                _b.label = 4;
                                            case 4:
                                                _b.trys.push([4, 6, , 7]);
                                                // Verify the session has worked.
                                                return [4 /*yield*/, page.waitForSelector(this.sendMessageSelector, { timeout: 10000 })];
                                            case 5:
                                                // Verify the session has worked.
                                                _b.sent();
                                                return [3 /*break*/, 7];
                                            case 6:
                                                error_4 = _b.sent();
                                                console.error('Session has expired.');
                                                return [2 /*return*/];
                                            case 7:
                                                readyForMessages();
                                                client = page._client;
                                                client.on('Network.webSocketCreated', function (_a) {
                                                    var requestId = _a.requestId, url = _a.url;
                                                    console.log('Network.webSocketCreated', requestId, url);
                                                });
                                                client.on('Network.webSocketClosed', function (_a) {
                                                    var requestId = _a.requestId, timestamp = _a.timestamp;
                                                    console.log('Network.webSocketClosed', requestId, timestamp);
                                                });
                                                client.on('Network.webSocketFrameReceived', function (_a) {
                                                    var response = _a.response;
                                                    var json = JSON.parse(response.payloadData);
                                                    if (json.event_name === 'start_typing') {
                                                        onTyping(true);
                                                    }
                                                    // Ignore other events for right now.
                                                    if (json.event_name !== 'message') {
                                                        return;
                                                    }
                                                    onTyping(false);
                                                    var messagePayload = json.payload;
                                                    if (messagePayload) {
                                                        // If the nature is customer, it is us typing.
                                                        if (messagePayload.meta.nature !== 'Customer') {
                                                            onMessage(messagePayload.content);
                                                        }
                                                    }
                                                });
                                                _loop_1 = function () {
                                                    var queue, iQueue, inputUploadHandle_1, error_6, error_7;
                                                    return __generator(this, function (_c) {
                                                        switch (_c.label) {
                                                            case 0:
                                                                _c.trys.push([0, 9, , 12]);
                                                                queue = this_1.messageQueue.filter(function (v) { return v.userId == userId; });
                                                                iQueue = this_1.imageQueue.filter(function (v) { return v.userId == userId; });
                                                                if (!(iQueue.length > 0)) return [3 /*break*/, 7];
                                                                _c.label = 1;
                                                            case 1:
                                                                _c.trys.push([1, 4, , 5]);
                                                                return [4 /*yield*/, page.waitForSelector('#upload-image-to-chat', { timeout: 1500 })];
                                                            case 2:
                                                                _c.sent();
                                                                return [4 /*yield*/, page.$('#upload-image-to-chat')];
                                                            case 3:
                                                                inputUploadHandle_1 = _c.sent();
                                                                iQueue.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                                                    return __generator(this, function (_a) {
                                                                        try {
                                                                            if (inputUploadHandle_1) {
                                                                                console.warn('Uploading file', item.filePath);
                                                                                inputUploadHandle_1.uploadFile(item.filePath);
                                                                                item.isUploaded = true;
                                                                            }
                                                                            // Pass this to a timeout function.
                                                                            setTimeout(function (i) {
                                                                                if (i.isUploaded && Fs.existsSync(i.filePath)) {
                                                                                    try {
                                                                                        console.log('Unlinking', i.filePath);
                                                                                        Fs.unlinkSync(i.filePath);
                                                                                    }
                                                                                    catch (error) {
                                                                                        console.error('Failed to unlink a file', i.filePath, i.userId, error);
                                                                                    }
                                                                                }
                                                                            }, 30000, item);
                                                                        }
                                                                        catch (error) {
                                                                            console.log('Could not upload image.');
                                                                            item.isUploaded = false;
                                                                        }
                                                                        return [2 /*return*/];
                                                                    });
                                                                }); });
                                                                // Remove only uploaded items from the array where the userId is the current session.
                                                                this_1.imageQueue = this_1.imageQueue.filter(function (v) { return !(v.isUploaded && v.userId == userId); });
                                                                return [3 /*break*/, 5];
                                                            case 4:
                                                                error_6 = _c.sent();
                                                                console.log('Could not upload image, no image button present.');
                                                                iQueue.forEach(function (v) { return v.isUploaded = false; });
                                                                return [3 /*break*/, 5];
                                                            case 5: 
                                                            // Wait for image upload to happen.
                                                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 3000); })];
                                                            case 6:
                                                                // Wait for image upload to happen.
                                                                _c.sent();
                                                                _c.label = 7;
                                                            case 7:
                                                                if (queue.length > 0) {
                                                                    queue.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                                                        var messageToSend;
                                                                        return __generator(this, function (_a) {
                                                                            switch (_a.label) {
                                                                                case 0:
                                                                                    messageToSend = item.message;
                                                                                    console.log('Sending message', messageToSend);
                                                                                    return [4 /*yield*/, page.type(this.sendMessageSelector, messageToSend)];
                                                                                case 1:
                                                                                    _a.sent();
                                                                                    return [4 /*yield*/, page.keyboard.press('Enter')];
                                                                                case 2:
                                                                                    _a.sent();
                                                                                    return [2 /*return*/];
                                                                            }
                                                                        });
                                                                    }); });
                                                                    // Remove items from array.
                                                                    this_1.messageQueue = this_1.messageQueue.filter(function (v) { return v.userId != userId; });
                                                                }
                                                                // Wait a bit...
                                                                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 3000); })];
                                                            case 8:
                                                                // Wait a bit...
                                                                _c.sent();
                                                                return [3 /*break*/, 12];
                                                            case 9:
                                                                error_7 = _c.sent();
                                                                console.error('Error inside while loop, reloading page...', error_7);
                                                                return [4 /*yield*/, page.goto('https://my.replika.ai')];
                                                            case 10:
                                                                _c.sent();
                                                                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 3000); })];
                                                            case 11:
                                                                _c.sent();
                                                                return [3 /*break*/, 12];
                                                            case 12: return [2 /*return*/];
                                                        }
                                                    });
                                                };
                                                this_1 = this;
                                                _b.label = 8;
                                            case 8:
                                                if (!this.sessionInfo.find(function (v) { return v.userId == userId; })) return [3 /*break*/, 10];
                                                return [5 /*yield**/, _loop_1()];
                                            case 9:
                                                _b.sent();
                                                return [3 /*break*/, 8];
                                            case 10:
                                                console.log('Ending session');
                                                page.close();
                                                return [3 /*break*/, 12];
                                            case 11:
                                                error_5 = _b.sent();
                                                console.error(error_5);
                                                return [3 /*break*/, 12];
                                            case 12: return [2 /*return*/];
                                        }
                                    });
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.cluster.idle()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Replika;
}());
exports.Replika = Replika;
