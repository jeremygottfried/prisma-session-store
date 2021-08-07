'use strict';
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __makeTemplateObject =
  (this && this.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, 'raw', { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.PrismaSessionStore = void 0;
var cuid_1 = __importDefault(require('cuid'));
var express_session_1 = require('express-session');
var ts_dedent_1 = require('ts-dedent');
var logger_1 = require('./logger');
var utils_1 = require('./utils');
/**
 * An `express-session` store used in the `express-session` options
 * to hook up prisma as a session store
 *
 * @example
 * ```ts
 * const app = express();
 * const prisma = new PrismaClient();
 *
 * app.use(
 *   expressSession({
 *     secret: "Some Secret Value",
 *     resave: false,
 *     saveUninitialized: false,
 *     store: new PrismaSessionStore(prisma, {
 *       checkPeriod: 10 * 60 * 1000 // 10 minutes
 *     });
 *   })
 * );
 * ```
 */
var PrismaSessionStore = /** @class */ (function (_super) {
  __extends(PrismaSessionStore, _super);
  /**
   * Initialize PrismaSessionStore with the given `prisma` and (optional) `options`.
   *
   * @param prisma the prisma client that includes a `Sessions` model
   * @param options the options to alter how this store behaves
   *
   * @example
   * ```ts
   * const app = express();
   * const prisma = new PrismaClient();
   *
   * app.use(
   *   expressSession({
   *     secret: "Some Secret Value",
   *     resave: false,
   *     saveUninitialized: false,
   *     store: new PrismaSessionStore(prisma, {
   *       checkPeriod: 10 * 60 * 1000 // 10 minutes
   *     });
   *   })
   * );
   * ```
   */
  function PrismaSessionStore(prisma, options) {
    var _a, _b, _c, _d;
    var _this = _super.call(this) || this;
    _this.prisma = prisma;
    _this.options = options;
    /**
     * @description A flag indicating to use the session ID as the Prisma Record ID
     *
     * Note: If undefined and dbRecordIdFunction is also undefined then a random
     * CUID will be used instead.
     */
    _this.dbRecordIdIsSessionId = _this.options.dbRecordIdIsSessionId;
    /**
     * @description whether or not the prisma connection has been tested to be invalid
     */
    _this.invalidConnection = false;
    /**
     * @description A object that handles logging to a given logger based on the logging level
     */
    _this.logger = new logger_1.ManagedLogger(
      (_a = _this.options.logger) !== null && _a !== void 0 ? _a : console,
      (_b = _this.options.loggerLevel) !== null && _b !== void 0
        ? _b
        : ['error']
    );
    /**
     * @description Some serializer that will transform objects into strings
     * and vice versa
     */
    _this.serializer =
      (_c = _this.options.serializer) !== null && _c !== void 0 ? _c : JSON;
    /**
     * @description The name of the sessions model
     */
    _this.sessionModelName =
      (_d = _this.options.sessionModelName) !== null && _d !== void 0
        ? _d
        : 'session';
    /**
     * @description A function to generate the Prisma Record ID for a given session ID
     *
     * Note: If undefined and dbRecordIdIsSessionId is also undefined then a random
     * CUID will be used instead.
     */
    _this.dbRecordIdFunction = function (sid) {
      var _a, _b, _c;
      return (_c =
        (_b = (_a = _this.options).dbRecordIdFunction) === null || _b === void 0
          ? void 0
          : _b.call(_a, sid)) !== null && _c !== void 0
        ? _c
        : cuid_1.default();
    };
    /**
     * Fetch all sessions
     *
     * @param callback a callback providing all session data
     * or an error that occurred
     */
    _this.all = function (callback) {
      return __awaiter(_this, void 0, void 0, function () {
        var sessions, result, e_1;
        var _this = this;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, this.validateConnection()];
            case 1:
              if (!_a.sent())
                return [
                  2 /*return*/,
                  callback === null || callback === void 0
                    ? void 0
                    : callback(),
                ];
              _a.label = 2;
            case 2:
              _a.trys.push([2, 4, , 5]);
              return [
                4 /*yield*/,
                this.prisma[this.sessionModelName].findMany({
                  select: { sid: true, data: true },
                }),
              ];
            case 3:
              sessions = _a.sent();
              result = sessions
                .map(function (_a) {
                  var sid = _a.sid,
                    data = _a.data;
                  return [
                    sid,
                    _this.serializer.parse(
                      data !== null && data !== void 0 ? data : '{}'
                    ),
                  ];
                })
                .reduce(function (prev, _a) {
                  var _b;
                  var sid = _a[0],
                    data = _a[1];
                  return __assign(
                    __assign({}, prev),
                    ((_b = {}), (_b[sid] = data), _b)
                  );
                }, {});
              if (callback) utils_1.defer(callback, undefined, result);
              return [2 /*return*/, result];
            case 4:
              e_1 = _a.sent();
              this.logger.error('all(): ' + String(e_1));
              if (callback) utils_1.defer(callback, e_1);
              return [3 /*break*/, 5];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    };
    /**
     * Delete all sessions from the store
     *
     * @param callback a callback notifying that all sessions
     * were deleted or that an error occurred
     */
    _this.clear = function (callback) {
      return __awaiter(_this, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, this.validateConnection()];
            case 1:
              if (!_a.sent())
                return [
                  2 /*return*/,
                  callback === null || callback === void 0
                    ? void 0
                    : callback(),
                ];
              _a.label = 2;
            case 2:
              _a.trys.push([2, 4, , 5]);
              return [
                4 /*yield*/,
                this.prisma[this.sessionModelName].deleteMany(),
              ];
            case 3:
              _a.sent();
              if (callback) utils_1.defer(callback);
              return [3 /*break*/, 5];
            case 4:
              e_2 = _a.sent();
              if (callback) utils_1.defer(callback, e_2);
              return [3 /*break*/, 5];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    };
    /**
     * Destroy the session(s) associated with the given `sid`(s).
     *
     * @param sid a single or multiple id(s) to remove data for
     * @param callback a callback notifying that the session(s) have
     * been destroyed or that an error occurred
     */
    _this.destroy = function (sid, callback) {
      return __awaiter(_this, void 0, void 0, function () {
        var e_3;
        var _this = this;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, this.validateConnection()];
            case 1:
              if (!_a.sent())
                return [
                  2 /*return*/,
                  callback === null || callback === void 0
                    ? void 0
                    : callback(),
                ];
              _a.label = 2;
            case 2:
              _a.trys.push([2, 7, , 8]);
              if (!Array.isArray(sid)) return [3 /*break*/, 4];
              return [
                4 /*yield*/,
                Promise.all(
                  sid.map(function (s) {
                    return __awaiter(_this, void 0, void 0, function () {
                      return __generator(this, function (_a) {
                        return [2 /*return*/, this.destroy(s, callback)];
                      });
                    });
                  })
                ),
              ];
            case 3:
              _a.sent();
              return [3 /*break*/, 6];
            case 4:
              return [
                4 /*yield*/,
                this.prisma[this.sessionModelName].delete({
                  where: { sid: sid },
                }),
              ];
            case 5:
              _a.sent();
              _a.label = 6;
            case 6:
              return [3 /*break*/, 8];
            case 7:
              e_3 = _a.sent();
              this.logger.warn(
                'Attempt to destroy non-existent session:' +
                  String(sid) +
                  ' ' +
                  String(e_3)
              );
              if (callback) utils_1.defer(callback, e_3);
              return [3 /*break*/, 8];
            case 8:
              if (callback) utils_1.defer(callback);
              return [2 /*return*/];
          }
        });
      });
    };
    /**
     * Attempt to fetch session by the given `sid`.
     *
     * @param sid the sid to attempt to fetch
     * @param callback a function to call with the results
     */
    _this.get = function (sid, callback) {
      return __awaiter(_this, void 0, void 0, function () {
        var session, result;
        var _a;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              return [4 /*yield*/, this.validateConnection()];
            case 1:
              if (!_b.sent())
                return [
                  2 /*return*/,
                  callback === null || callback === void 0
                    ? void 0
                    : callback(),
                ];
              console.log('THIS.SESSIONMODELNAME', this.sessionModelName);
              return [
                4 /*yield*/,
                this.prisma[this.sessionModelName]
                  .findUnique({
                    where: { sid: sid },
                  })
                  .catch(function () {
                    return null;
                  }),
              ];
            case 2:
              session = _b.sent();
              if (session === null)
                return [
                  2 /*return*/,
                  callback === null || callback === void 0
                    ? void 0
                    : callback(),
                ];
              try {
                result = this.serializer.parse(
                  (_a = session.data) !== null && _a !== void 0 ? _a : '{}'
                );
                if (callback) utils_1.defer(callback, undefined, result);
                return [2 /*return*/, result];
              } catch (e) {
                this.logger.error('get(): ' + String(e));
                if (callback) utils_1.defer(callback, e);
              }
              return [2 /*return*/];
          }
        });
      });
    };
    /**
     * Fetch all sessions' ids
     *
     * @param callback a callback providing all session id
     * or an error that occurred
     */
    _this.ids = function (callback) {
      return __awaiter(_this, void 0, void 0, function () {
        var sessions, sids, e_4;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, this.validateConnection()];
            case 1:
              if (!_a.sent())
                return [
                  2 /*return*/,
                  callback === null || callback === void 0
                    ? void 0
                    : callback(),
                ];
              _a.label = 2;
            case 2:
              _a.trys.push([2, 4, , 5]);
              return [
                4 /*yield*/,
                this.prisma[this.sessionModelName].findMany({
                  select: { sid: true },
                }),
              ];
            case 3:
              sessions = _a.sent();
              sids = sessions.map(function (_a) {
                var sid = _a.sid;
                return sid;
              });
              if (callback) utils_1.defer(callback, undefined, sids);
              return [2 /*return*/, sids];
            case 4:
              e_4 = _a.sent();
              if (callback) utils_1.defer(callback, e_4);
              return [3 /*break*/, 5];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    };
    /**
     * Get the count of all sessions in the store
     *
     * @param callback a callback providing either the number of sessions
     * or an error that occurred
     */
    _this.length = function (callback) {
      return __awaiter(_this, void 0, void 0, function () {
        var sessions, itemCount, e_5;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, this.validateConnection()];
            case 1:
              if (!_a.sent())
                return [
                  2 /*return*/,
                  callback === null || callback === void 0
                    ? void 0
                    : callback(new Error('Could not connect'), 0),
                ];
              _a.label = 2;
            case 2:
              _a.trys.push([2, 4, , 5]);
              return [
                4 /*yield*/,
                this.prisma[this.sessionModelName].findMany({
                  select: { sid: true },
                }),
              ];
            case 3:
              sessions = _a.sent();
              itemCount = sessions.length;
              if (callback) utils_1.defer(callback, undefined, itemCount);
              return [2 /*return*/, itemCount];
            case 4:
              e_5 = _a.sent();
              if (callback) utils_1.defer(callback, e_5);
              return [3 /*break*/, 5];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    };
    /**
     * Remove only expired entries from the store
     */
    _this.prune = function () {
      return __awaiter(_this, void 0, void 0, function () {
        var sessions, _i, sessions_1, session, now, remainingSec;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, this.validateConnection()];
            case 1:
              if (!_a.sent()) return [2 /*return*/];
              // XXX More efficient way? Maybe when filtering is fully implemented? XXX
              this.logger.log('Checking for any expired sessions...');
              return [
                4 /*yield*/,
                this.prisma[this.sessionModelName].findMany({
                  select: {
                    expiresAt: true,
                    sid: true,
                  },
                }),
              ];
            case 2:
              sessions = _a.sent();
              (_i = 0), (sessions_1 = sessions);
              _a.label = 3;
            case 3:
              if (!(_i < sessions_1.length)) return [3 /*break*/, 6];
              session = sessions_1[_i];
              now = new Date();
              remainingSec =
                (session.expiresAt.valueOf() - now.valueOf()) / 1000;
              this.logger.log(
                'session:' + session.sid + ' expires in ' + remainingSec + 'sec'
              );
              if (!(now.valueOf() >= session.expiresAt.valueOf()))
                return [3 /*break*/, 5];
              this.logger.log('Deleting session with sid: ' + session.sid);
              return [
                4 /*yield*/,
                this.prisma[this.sessionModelName].delete({
                  where: { sid: session.sid },
                }),
              ];
            case 4:
              _a.sent();
              _a.label = 5;
            case 5:
              _i++;
              return [3 /*break*/, 3];
            case 6:
              return [2 /*return*/];
          }
        });
      });
    };
    /**
     * Commit the given `session` object associated with the given `sid`.
     *
     * @param sid the ID to save the session data under
     * @param session the session data to save
     * @param callback a callback with the results of saving the data
     * or an error that occurred
     */
    _this.set = function (sid, session, callback) {
      return __awaiter(_this, void 0, void 0, function () {
        var ttl, expiresAt, sessionString, existingSession, data;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4 /*yield*/, this.validateConnection()];
            case 1:
              if (!_a.sent())
                return [
                  2 /*return*/,
                  callback === null || callback === void 0
                    ? void 0
                    : callback(),
                ];
              ttl = utils_1.getTTL(this.options, session, sid);
              expiresAt = utils_1.createExpiration(ttl, {
                rounding: this.options.roundTTL,
              });
              try {
                sessionString = this.serializer.stringify(session);
              } catch (e) {
                this.logger.error('set(): ' + String(e));
                if (callback) utils_1.defer(callback, e);
                return [2 /*return*/];
              }
              console.log('THIS.SESSIONMODELNAME', this.sessionModelName);
              return [
                4 /*yield*/,
                this.prisma[this.sessionModelName]
                  .findUnique({
                    where: { sid: sid },
                  })
                  .catch(function () {
                    return null;
                  }),
              ];
            case 2:
              existingSession = _a.sent();
              data = {
                sid: sid,
                expiresAt: expiresAt,
                data: sessionString,
                id: this.dbRecordIdIsSessionId
                  ? sid
                  : this.dbRecordIdFunction(sid),
              };
              if (!(existingSession !== null)) return [3 /*break*/, 4];
              return [
                4 /*yield*/,
                this.prisma[this.sessionModelName].update({
                  data: data,
                  where: { sid: sid },
                }),
              ];
            case 3:
              _a.sent();
              return [3 /*break*/, 6];
            case 4:
              return [
                4 /*yield*/,
                this.prisma[this.sessionModelName].create({
                  data: __assign(__assign({}, data), { data: sessionString }),
                }),
              ];
            case 5:
              _a.sent();
              _a.label = 6;
            case 6:
              if (callback) utils_1.defer(callback);
              return [2 /*return*/];
          }
        });
      });
    };
    /**
     * Refresh the time-to-live for the session with the given `sid`.
     *
     * @param sid the id of the session to refresh
     * @param session the data of the session to resave
     * @param callback a callback notifying that the refresh was completed
     * or that an error occurred
     */
    _this.touch = function (sid, session, callback) {
      return __awaiter(_this, void 0, void 0, function () {
        var ttl, expiresAt, existingSession, existingSessionData, e_6;
        var _a;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              return [4 /*yield*/, this.validateConnection()];
            case 1:
              if (!_b.sent())
                return [
                  2 /*return*/,
                  callback === null || callback === void 0
                    ? void 0
                    : callback(),
                ];
              ttl = utils_1.getTTL(this.options, session, sid);
              expiresAt = utils_1.createExpiration(ttl, {
                rounding: this.options.roundTTL,
              });
              _b.label = 2;
            case 2:
              _b.trys.push([2, 6, , 7]);
              console.log('SESSIONMODELNAME', this.sessionModelName);
              return [
                4 /*yield*/,
                this.prisma[this.sessionModelName].findUnique({
                  where: { sid: sid },
                }),
              ];
            case 3:
              existingSession = _b.sent();
              if (!(existingSession !== null)) return [3 /*break*/, 5];
              existingSessionData = __assign(
                __assign(
                  {},
                  this.serializer.parse(
                    (_a = existingSession.data) !== null && _a !== void 0
                      ? _a
                      : '{}'
                  )
                ),
                { cookie: session.cookie }
              );
              return [
                4 /*yield*/,
                this.prisma[this.sessionModelName].update({
                  where: { sid: existingSession.sid },
                  data: {
                    expiresAt: expiresAt,
                    data: this.serializer.stringify(existingSessionData),
                  },
                }),
              ];
            case 4:
              _b.sent();
              _b.label = 5;
            case 5:
              // *** If there is no found session, for some reason, should it be recreated from sess *** ?
              if (callback) utils_1.defer(callback);
              return [3 /*break*/, 7];
            case 6:
              e_6 = _b.sent();
              this.logger.error('touch(): ' + String(e_6));
              if (callback) utils_1.defer(callback, e_6);
              return [3 /*break*/, 7];
            case 7:
              return [2 /*return*/];
          }
        });
      });
    };
    console.log('OPTIONS', options);
    _this.startInterval();
    _this.connect();
    return _this;
  }
  /**
   * Attempts to connect to Prisma, displaying a pretty error if the connection is not possible.
   */
  PrismaSessionStore.prototype.connect = function () {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            return [
              4 /*yield*/,
              (_b =
                (_a = this.prisma) === null || _a === void 0
                  ? void 0
                  : _a.$connect) === null || _b === void 0
                ? void 0
                : _b.call(_a),
            ];
          case 1:
            _c.sent();
            return [4 /*yield*/, this.validateConnection()];
          case 2:
            _c.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Disables store, used when prisma cannot be connected to
   */
  PrismaSessionStore.prototype.disable = function () {
    this.invalidConnection = true;
  };
  /**
   * Returns if the connect is valid or not, logging an error if it is not.
   */
  PrismaSessionStore.prototype.validateConnection = function () {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
      var _this = this;
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            return [
              4 /*yield*/,
              ((_c =
                (_b =
                  (_a = this.prisma) === null || _a === void 0
                    ? void 0
                    : _a.$connect) === null || _b === void 0
                  ? void 0
                  : _b.call(_a)) !== null && _c !== void 0
                ? _c
                : Promise.reject(new Error('Could not connect'))
              ).catch(function () {
                _this.disable();
                _this.stopInterval();
                _this.logger.error(
                  ts_dedent_1.dedent(
                    templateObject_1 ||
                      (templateObject_1 = __makeTemplateObject(
                        [
                          'Could not connect to Sessions model in Prisma.\n      Please make sure that prisma is setup correctly and that your migrations are current.\n      For more information check out https://github.com/kleydon/prisma-session-store',
                        ],
                        [
                          'Could not connect to Sessions model in Prisma.\n      Please make sure that prisma is setup correctly and that your migrations are current.\n      For more information check out https://github.com/kleydon/prisma-session-store',
                        ]
                      ))
                  )
                );
              }),
            ];
          case 1:
            _d.sent();
            return [2 /*return*/, !this.invalidConnection];
        }
      });
    });
  };
  /**
   * A function to stop any ongoing intervals and disconnect from the `PrismaClient`
   */
  PrismaSessionStore.prototype.shutdown = function () {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            this.stopInterval();
            return [4 /*yield*/, this.prisma.$disconnect()];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * Start an interval to prune expired sessions
   */
  PrismaSessionStore.prototype.startInterval = function () {
    var _this = this;
    var ms = this.options.checkPeriod;
    if (typeof ms === 'number' && ms !== 0) {
      this.stopInterval();
      this.checkInterval = setInterval(function () {
        _this.prune();
      }, Math.floor(ms));
    }
  };
  /**
   * Stop checking if sessions have expired
   */
  PrismaSessionStore.prototype.stopInterval = function () {
    if (this.checkInterval) clearInterval(this.checkInterval);
  };
  return PrismaSessionStore;
})(express_session_1.Store);
exports.PrismaSessionStore = PrismaSessionStore;
var templateObject_1;
