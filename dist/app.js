"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _commander = _interopRequireDefault(require("commander"));

var _utils = require("./utils");

var _pool = require("./pool");

var os = require('os').platform();

var app = new _commander["default"].Command();
app.version('v1.0.0', '-v, --version', '查看版本号');
app.usage('-i demo.png');
app.option('-i, --input [input]', '设置目标文件或文件夹', './');
app.helpOption('-h, --help', '帮助信息');
app.action( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(cmd) {
    var input, pool, files;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            input = cmd.input;
            input = input.replace(/\\/g, '/');
            pool = new _pool.Pool(function (item) {
              return (0, _utils.promiseExec)(item.cmd).then(function () {
                return (0, _utils.success)("\u2714 ".concat(item.file));
              })["catch"](function (err) {
                return (0, _utils.warn)("\u2718 ".concat(item.file, " ").concat(err.message));
              });
            }, 4);
            _context.prev = 3;
            _context.next = 6;
            return (0, _utils.getGlobFiles)(input);

          case 6:
            files = _context.sent;

            if (files.length) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", (0, _utils.warn)('无文件'));

          case 9:
            (0, _utils.info)('>> 开始处理');
            files.forEach(function (item) {
              pool.enqueue({
                cmd: "".concat(os === 'win32' ? 'magick mogrify' : 'mogrify', " -strip \"").concat(item, "\""),
                file: item
              });
            });
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](3);
            (0, _utils.warn)("".concat(input, " ").concat(_context.t0.message));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 13]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
app.parse(process.argv);
var _default = app;
exports["default"] = _default;