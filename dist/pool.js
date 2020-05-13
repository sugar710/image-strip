"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pool = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Pool = /*#__PURE__*/function () {
  function Pool(runTask, limit) {
    (0, _classCallCheck2["default"])(this, Pool);
    this.runTask = runTask;
    this.queue = [];
    this.processing = [];
    this.limit = limit;
  }

  (0, _createClass2["default"])(Pool, [{
    key: "enqueue",
    value: function enqueue(task) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.queue.push({
          task: task,
          resolve: resolve,
          reject: reject
        });

        _this.check();
      });
    }
  }, {
    key: "run",
    value: function run(item) {
      var _this2 = this;

      this.queue = this.queue.filter(function (v) {
        return v !== item;
      });
      this.processing.push(item);
      this.runTask(item.task).then(function (res) {
        _this2.processing = _this2.processing.filter(function (v) {
          return v !== item;
        });
        item.resolve(res);

        _this2.check();
      }, function (err) {
        return item.reject(err);
      });
    }
  }, {
    key: "check",
    value: function check() {
      var _this3 = this;

      var processingNum = this.processing.length;
      var availableNum = this.limit - processingNum;
      this.queue.slice(0, availableNum).forEach(function (item, index) {
        _this3.run(item);
      });
    }
  }]);
  return Pool;
}();

exports.Pool = Pool;