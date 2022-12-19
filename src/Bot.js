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
var discord_js_1 = require("discord.js");
var Replika_1 = require("./Replika");
var Utils_1 = require("./Utils");
var client = new discord_js_1.Client({ partials: Object.values(discord_js_1.Constants.PartialTypes) });
var replika = new Replika_1.Replika();
var Bot = /** @class */ (function () {
    function Bot() {
        this.safe = this.safe.bind(this);
        this.start = this.start.bind(this);
    }
    Bot.prototype.safe = function (str) {
        return str.replace(/`/g, '');
    };
    Bot.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, replika.createCluster()];
                    case 1:
                        _a.sent();
                        client.on('message', function (message) { return __awaiter(_this, void 0, void 0, function () {
                            var args, command, email, pass, res, _a;
                            var _this = this;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!message.partial) return [3 /*break*/, 2];
                                        return [4 /*yield*/, message.fetch()];
                                    case 1:
                                        _b.sent();
                                        _b.label = 2;
                                    case 2:
                                        // Skip itself, do not allow it to process its own messages.
                                        if (message.author.id === client.user.id)
                                            return [2 /*return*/];
                                        if (!(message.channel.type !== 'dm' && message.mentions.members.find(function (v) { return v.user.id === client.user.id; }))) return [3 /*break*/, 4];
                                        return [4 /*yield*/, message.author.createDM()];
                                    case 3:
                                        // They've mentioned us, so let's dm them because they've not dm'd us.
                                        (_b.sent()).send('Hiya, start off with the !login email password to login to Replika.ai.');
                                        return [2 /*return*/];
                                    case 4:
                                        if (message.channel.type !== 'dm') {
                                            return [2 /*return*/];
                                        }
                                        _b.label = 5;
                                    case 5:
                                        // Skip other bots now.
                                        if (message.author.bot)
                                            return [2 /*return*/];
                                        if (replika.isLoggedIn(message.author.id) && message.content.indexOf('!') !== 0) {
                                            if (message.attachments.size > 0) {
                                                message.attachments.forEach(function (v) { return __awaiter(_this, void 0, void 0, function () {
                                                    var filePath, error_1;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                if (!(v.size > 1000000)) return [3 /*break*/, 2];
                                                                return [4 /*yield*/, message.channel.send('Sorry, your image is too big, make sure it is less than 10 MB in size to send to Replika.')];
                                                            case 1:
                                                                _a.sent();
                                                                _a.label = 2;
                                                            case 2:
                                                                _a.trys.push([2, 4, , 6]);
                                                                return [4 /*yield*/, (0, Utils_1.downloadImage)(v.url)];
                                                            case 3:
                                                                filePath = _a.sent();
                                                                if (message.cleanContent.length > 0) {
                                                                    replika.addMessageToQueue(message.cleanContent, message.author.id);
                                                                }
                                                                replika.addImageToQueue(filePath, message.author.id);
                                                                return [3 /*break*/, 6];
                                                            case 4:
                                                                error_1 = _a.sent();
                                                                console.error('Failed to download image attachment for discord message', error_1);
                                                                return [4 /*yield*/, message.channel.send('Sorry, it seems like the file you sent isn\'t the right type or some other error occurred')];
                                                            case 5:
                                                                _a.sent();
                                                                return [3 /*break*/, 6];
                                                            case 6: return [2 /*return*/];
                                                        }
                                                    });
                                                }); });
                                            }
                                            else if (message.cleanContent.length > 0) {
                                                replika.addMessageToQueue(message.cleanContent, message.author.id);
                                            }
                                        }
                                        // Check for prefix.
                                        if (message.content.indexOf('!') !== 0)
                                            return [2 /*return*/];
                                        args = message.content.slice(1).trim().split(/ +/g);
                                        command = args.shift().toLowerCase();
                                        if (!(command === 'login')) return [3 /*break*/, 16];
                                        email = args[0], pass = args[1];
                                        email = "rezkyforce@gmail.com";
                                        pass = "rezkym99";
                                        return [4 /*yield*/, message.channel.send("Alrighty, you're all logged in, hold tight while we connect to your Replika...")];
                                    case 6:
                                        _b.sent();
                                        return [4 /*yield*/, replika.login(email, pass, message.author.id)];
                                    case 7:
                                        res = _b.sent();
                                        _a = res;
                                        switch (_a) {
                                            case Replika_1.ReplikaLoginResult.SUCCESS: return [3 /*break*/, 8];
                                            case Replika_1.ReplikaLoginResult.WRONG_USERNAME: return [3 /*break*/, 11];
                                            case Replika_1.ReplikaLoginResult.WRONG_PASSWORD: return [3 /*break*/, 13];
                                        }
                                        return [3 /*break*/, 15];
                                    case 8: return [4 /*yield*/, message.channel.send("Alrighty, you're all logged in, hold tight while we connect to your Replika...")];
                                    case 9:
                                        _b.sent();
                                        return [4 /*yield*/, replika.startSession(message.author.id, function (content) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (!(content.type === 'text')) return [3 /*break*/, 2];
                                                            return [4 /*yield*/, message.channel.send(content.text)];
                                                        case 1:
                                                            _a.sent();
                                                            _a.label = 2;
                                                        case 2: return [2 /*return*/];
                                                    }
                                                });
                                            }); }, function (isTyping) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    isTyping ? message.channel.startTyping() : message.channel.stopTyping();
                                                    return [2 /*return*/];
                                                });
                                            }); }, function () { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    message.channel.send('All sorted, you can start chatting now!');
                                                    client.user.setActivity("over ".concat(replika.sessionCount(), " sessions"), { type: "WATCHING" });
                                                    return [2 /*return*/];
                                                });
                                            }); })];
                                    case 10:
                                        _b.sent();
                                        return [3 /*break*/, 15];
                                    case 11: return [4 /*yield*/, message.channel.send('Woah, looks like your email is incorrect.')];
                                    case 12:
                                        _b.sent();
                                        return [3 /*break*/, 15];
                                    case 13: return [4 /*yield*/, message.channel.send('Woah, looks like your password is incorrect.')];
                                    case 14:
                                        _b.sent();
                                        return [3 /*break*/, 15];
                                    case 15: return [3 /*break*/, 18];
                                    case 16:
                                        if (!(command === 'close' || command === 'logout')) return [3 /*break*/, 18];
                                        return [4 /*yield*/, replika.closeSession(message.author.id)];
                                    case 17:
                                        _b.sent();
                                        _b.label = 18;
                                    case 18: return [2 /*return*/];
                                }
                            });
                        }); });
                        client.on('ready', function () {
                            console.log("Bot has started, with ".concat(client.users.cache.size, " users in cache, in ").concat(client.channels.cache.size, " cached channels of ").concat(client.guilds.cache.size, " cached guilds."));
                            client.user.setActivity("over ".concat(replika.sessionCount(), " sessions"), { type: "WATCHING" });
                            console.log("Logged in as ".concat(client.user.tag, "!"));
                        });
                        client.login(process.env.DISCORD_BOT_TOKEN);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Bot;
}());
module.exports = new Bot();
