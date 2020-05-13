"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGlobFiles = getGlobFiles;
exports.info = info;
exports.success = success;
exports.warn = warn;
exports.promiseExec = promiseExec;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = _interopRequireDefault(require("fs"));

var _child_process = require("child_process");

var _chalk = _interopRequireDefault(require("chalk"));

var _glob = _interopRequireDefault(require("glob"));

function getGlobFiles(_x) {
  return _getGlobFiles.apply(this, arguments);
}

function _getGlobFiles() {
  _getGlobFiles = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(input) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              try {
                var stat = _fs["default"].lstatSync(input);

                if (stat.isFile()) {
                  return resolve([input]);
                } else {
                  (0, _glob["default"])("".concat(input, "/**/*.{jpg,jpeg,bmp,png}"), function (err, files) {
                    if (err) {
                      return reject(err);
                    }

                    return resolve(files);
                  });
                }
              } catch (err) {
                return reject(new Error('文件或文件夹不存在!'));
              }
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getGlobFiles.apply(this, arguments);
}

function info(msg) {
  console.log(_chalk["default"].blue(msg));
}

function success(msg) {
  console.log(_chalk["default"].green(msg));
}

function warn(msg) {
  console.log(_chalk["default"].white.bgRed(msg));
}

function promiseExec(cmd) {
  return new Promise(function (resolve, reject) {
    (0, _child_process.exec)(cmd, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}