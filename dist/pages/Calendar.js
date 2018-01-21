'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FQcalendar = function (_wepy$page) {
  _inherits(FQcalendar, _wepy$page);

  function FQcalendar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FQcalendar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FQcalendar.__proto__ || Object.getPrototypeOf(FQcalendar)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      headerText: '',
      weeks: ['一', '二', '三', '四', '五', '六', '日'],
      myMonDays: {
        rowNumber: [],
        columnNumber: [],
        days: []
      },
      selectDateObj: null,
      nowDateObj: null,
      nowDayNumber: null
    }, _this.methods = {
      lastMonth: function lastMonth() {
        console.log('切换到上一个月');
        this.__exchangeMonth('left');
      },
      nextMonth: function nextMonth() {
        console.log('切换到下一个月');
        this.__exchangeMonth('right');
      },
      clickToEditDiary: function clickToEditDiary() {
        console.log('点击编辑日记');
        wx.navigateTo({
          url: '../pages/EditDiary'
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FQcalendar, [{
    key: 'onLoad',
    value: function onLoad() {
      // this.__getdays()
      this.__start();
    }
  }, {
    key: '__start',
    value: function __start() {
      /* 初始化和保存今天的时间 */
      var nowDate = this.__getNowDateObj();
      this.nowDateObj = nowDate;
      this.nowDayNumber = this.nowDateObj.getDate();
      console.log('今天的日期是 ==> ' + this.nowDayNumber);
      this.selectDateObj = nowDate;

      this.__todo(this.selectDateObj);
    }
  }, {
    key: '__getNowDateObj',
    value: function __getNowDateObj() {
      var dateObj = this.selectDateObj;
      if (dateObj) {
        return dateObj;
      } else {
        var tmp = new Date();
        return this.__getFormateDateObj(tmp.getFullYear(), tmp.getMonth(), tmp.getDate());
      }
    }
  }, {
    key: '__getFormateDateObj',
    value: function __getFormateDateObj(y, m, d) {
      return new Date(y, m, d);

      // let datestr = y + '/' + m + '/' + d
      // let datestr = 2018 + '/' + (3 + 1) + '/' + 1
      // return new Date(datestr)
    }
  }, {
    key: '__exchangeMonth',
    value: function __exchangeMonth(key) {
      var selectDateObj = this.selectDateObj;
      var y = selectDateObj.getFullYear();
      var m = selectDateObj.getMonth();
      var d = selectDateObj.getDate();

      // let dateStr = ''
      var goDateObj = null;
      if (key === 'left') {
        var lastMon = m - 1;
        if (lastMon < 0) {
          // dateStr = (y - 1) + '/' + 12 + '/' + d
          goDateObj = this.__getFormateDateObj(y - 1, 11, d);
        } else {
          // dateStr = y + '/' + m + '/' + d
          goDateObj = this.__getFormateDateObj(y, lastMon, d);
        }
      } else {
        var nextMon = m + 1;
        if (nextMon > 11) {
          // dateStr = (y + 1) + '/' + 1 + '/' + d
          goDateObj = this.__getFormateDateObj(y + 1, 0, d);
        } else {
          // dateStr = y + '/' + next + '/' + d
          goDateObj = this.__getFormateDateObj(y, nextMon, d);
        }
      }
      // let goDateObj = new Date(dateStr)
      this.selectDateObj = goDateObj;
      this.__todo(this.selectDateObj);
    }
  }, {
    key: '__getdays',
    value: function __getdays() {
      var arr = [];
      for (var i = 1; i < 31; i++) {
        var msg = [];

        if (i === 25) {
          msg = ['fml生日', '春节'];
        }

        var obj = {
          newday: i,
          oldday: '初'.concat(i.toString()),
          customMsg: msg
        };
        arr.push(obj);
      }
      this.myMonDays.days = arr;
      this.myMonDays.rowNumber = [1, 2, 3, 4, 5];
      this.myMonDays.columnNumber = this.weeks;
    }
  }, {
    key: '__todo',
    value: function __todo(dateObj) {
      var y = dateObj.getFullYear();
      var m = dateObj.getMonth(); /* 因为月份是0开始 */
      var d = dateObj.getDate(); /* 获取今天是这个月的第几号从1开始 */

      /* 返回该星期中的某一天 ，该值是 0（星期天） ~ 6（星期六） 中的一个值。 */
      /* 星期几从0开始，注意别写成getUTCDate() */
      // let nowWeekDayNum = dateObj.getUTCDay() + 1
      var weekNumInWeek = dateObj.getDay();

      /* 通过今天是第几号和星期几推算1号是星期几，有可能出现负数 */
      var __weekNumOf1 = weekNumInWeek - (d % 7 - 1);
      /* 把负数换为正数 */
      var weekNumOf1 = __weekNumOf1 <= 0 ? __weekNumOf1 + 7 : __weekNumOf1;

      /* 在上面的代码中，我们初始化d为三月份的第0天，由于JavaScript中day的范围为1~31中的值，所以当设为0时，会向前 一天，也即表示上个月的最后一天 */
      var dayNumInMon = new Date(y, m + 1, 0).getDate(); /* 获取上一个月有多少天 */

      var nowMonDaysList = [];
      var t = 0;
      var numOfNull = weekNumOf1 - 1;

      for (var i = 0; i < dayNumInMon + numOfNull; i++) {
        if (i < numOfNull) {
          nowMonDaysList[i] = '';
        } else {
          var n = t + 1;
          var obj = {
            newday: n.toString(),
            oldday: '初'.concat(n.toString()),
            customMsg: []
          };
          nowMonDaysList.push(obj);
          t = n;
        }
      }

      this.headerText = y + '年' + (m + 1) + '月' + d + '日';
      this.myMonDays.days = nowMonDaysList;
      this.myMonDays.columnNumber = this.weeks;
      this.myMonDays.rowNumber = nowMonDaysList.length / this.myMonDays.columnNumber.length;

      /* 警示：不可以使用 this.selectDateObj == this.nowDateObj 比较日期 */
      // if (this.selectDateObj > this.nowDateObj || this.selectDateObj < this.nowDateObj) {
      //   console.log('选择的日期和当前不相等')
      //   console.log('selectDateObj ' + this.selectDateObj)
      //   console.log('nowDateObj ' + this.nowDateObj)
      // } else {
      //   console.log('选择的日期和当前相等')
      // }
    }
  }]);

  return FQcalendar;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(FQcalendar , 'pages/Calendar'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNhbGVuZGFyLmpzIl0sIm5hbWVzIjpbIkZRY2FsZW5kYXIiLCJkYXRhIiwiaGVhZGVyVGV4dCIsIndlZWtzIiwibXlNb25EYXlzIiwicm93TnVtYmVyIiwiY29sdW1uTnVtYmVyIiwiZGF5cyIsInNlbGVjdERhdGVPYmoiLCJub3dEYXRlT2JqIiwibm93RGF5TnVtYmVyIiwibWV0aG9kcyIsImxhc3RNb250aCIsImNvbnNvbGUiLCJsb2ciLCJfX2V4Y2hhbmdlTW9udGgiLCJuZXh0TW9udGgiLCJjbGlja1RvRWRpdERpYXJ5Iiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiX19zdGFydCIsIm5vd0RhdGUiLCJfX2dldE5vd0RhdGVPYmoiLCJnZXREYXRlIiwiX190b2RvIiwiZGF0ZU9iaiIsInRtcCIsIkRhdGUiLCJfX2dldEZvcm1hdGVEYXRlT2JqIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsInkiLCJtIiwiZCIsImtleSIsImdvRGF0ZU9iaiIsImxhc3RNb24iLCJuZXh0TW9uIiwiYXJyIiwiaSIsIm1zZyIsIm9iaiIsIm5ld2RheSIsIm9sZGRheSIsImNvbmNhdCIsInRvU3RyaW5nIiwiY3VzdG9tTXNnIiwicHVzaCIsIndlZWtOdW1JbldlZWsiLCJnZXREYXkiLCJfX3dlZWtOdW1PZjEiLCJ3ZWVrTnVtT2YxIiwiZGF5TnVtSW5Nb24iLCJub3dNb25EYXlzTGlzdCIsInQiLCJudW1PZk51bGwiLCJuIiwibGVuZ3RoIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs7Ozs7OExBQ25CQyxJLEdBQU87QUFDTEMsa0JBQVksRUFEUDtBQUVMQyxhQUFPLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLEVBQStCLEdBQS9CLENBRkY7QUFHTEMsaUJBQVc7QUFDVEMsbUJBQVcsRUFERjtBQUVUQyxzQkFBYyxFQUZMO0FB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QUFJLENBQVI7QUFDQSxVQUFJQyxZQUFZSixhQUFhLENBQTdCOztBQUVBLFdBQUssSUFBSVosSUFBSSxDQUFiLEVBQWdCQSxJQUFLYSxjQUFjRyxTQUFuQyxFQUErQ2hCLEdBQS9DLEVBQW9EO0FBQ2xELFlBQUlBLElBQUlnQixTQUFSLEVBQW1CO0FBQ2pCRix5QkFBZWQsQ0FBZixJQUFvQixFQUFwQjtBQUNELFNBRkQsTUFFTztBQUNMLGNBQUlpQixJQUFJRixJQUFJLENBQVo7QUFDQSxjQUFJYixNQUFNO0FBQ1JDLG9CQUFRYyxFQUFFWCxRQUFGLEVBREE7QUFFUkYsb0JBQVEsSUFBSUMsTUFBSixDQUFXWSxFQUFFWCxRQUFGLEVBQVgsQ0FGQTtBQUdSQyx1QkFBVztBQUhILFdBQVY7QUFLQU8seUJBQWVOLElBQWYsQ0FBb0JOLEdBQXBCO0FBQ0FhLGNBQUlFLENBQUo7QUFDRDtBQUNGOztBQUVELFdBQUt2RCxVQUFMLEdBQWtCOEIsSUFBSSxHQUFKLElBQVdDLElBQUksQ0FBZixJQUFvQixHQUFwQixHQUEwQkMsQ0FBMUIsR0FBOEIsR0FBaEQ7QUFDQSxXQUFLOUIsU0FBTCxDQUFlRyxJQUFmLEdBQXNCK0MsY0FBdEI7QUFDQSxXQUFLbEQsU0FBTCxDQUFlRSxZQUFmLEdBQThCLEtBQUtILEtBQW5DO0FBQ0EsV0FBS0MsU0FBTCxDQUFlQyxTQUFmLEdBQTJCaUQsZUFBZUksTUFBZixHQUF3QixLQUFLdEQsU0FBTCxDQUFlRSxZQUFmLENBQTRCb0QsTUFBL0U7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNEOzs7O0VBMUtxQyxlQUFLQyxJOztrQkFBeEIzRCxVIiwiZmlsZSI6IkNhbGVuZGFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgRlFjYWxlbmRhciBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBoZWFkZXJUZXh0OiAnJyxcclxuICAgICAgd2Vla3M6IFsn5LiAJywgJ+S6jCcsICfkuIknLCAn5ZubJywgJ+S6lCcsICflha0nLCAn5pelJ10sXHJcbiAgICAgIG15TW9uRGF5czoge1xyXG4gICAgICAgIHJvd051bWJlcjogW10sXHJcbiAgICAgICAgY29sdW1uTnVtYmVyOiBbXSxcclxuICAgICAgICBkYXlzOiBbXVxyXG4gICAgICB9LFxyXG4gICAgICBzZWxlY3REYXRlT2JqOiBudWxsLFxyXG4gICAgICBub3dEYXRlT2JqOiBudWxsLFxyXG4gICAgICBub3dEYXlOdW1iZXI6bnVsbFxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIGxhc3RNb250aCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygn5YiH5o2i5Yiw5LiK5LiA5Liq5pyIJylcclxuICAgICAgICB0aGlzLl9fZXhjaGFuZ2VNb250aCgnbGVmdCcpXHJcbiAgICAgIH0sXHJcbiAgICAgIG5leHRNb250aCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygn5YiH5o2i5Yiw5LiL5LiA5Liq5pyIJylcclxuICAgICAgICB0aGlzLl9fZXhjaGFuZ2VNb250aCgncmlnaHQnKVxyXG4gICAgICB9LFxyXG4gICAgICBjbGlja1RvRWRpdERpYXJ5KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfngrnlh7vnvJbovpHml6XorrAnKVxyXG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xyXG4gICAgICAgICAgdXJsOiAnLi4vcGFnZXMvRWRpdERpYXJ5J1xyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIC8vIHRoaXMuX19nZXRkYXlzKClcclxuICAgICAgdGhpcy5fX3N0YXJ0KClcclxuICAgIH1cclxuXHJcbiAgICBfX3N0YXJ0KCkge1xyXG4gICAgICAvKiDliJ3lp4vljJblkozkv53lrZjku4rlpKnnmoTml7bpl7QgKi9cclxuICAgICAgbGV0IG5vd0RhdGUgPSB0aGlzLl9fZ2V0Tm93RGF0ZU9iaigpXHJcbiAgICAgIHRoaXMubm93RGF0ZU9iaiA9IG5vd0RhdGVcclxuICAgICAgdGhpcy5ub3dEYXlOdW1iZXIgPSB0aGlzLm5vd0RhdGVPYmouZ2V0RGF0ZSgpXHJcbiAgICAgIGNvbnNvbGUubG9nKCfku4rlpKnnmoTml6XmnJ/mmK8gPT0+ICcgKyB0aGlzLm5vd0RheU51bWJlcilcclxuICAgICAgdGhpcy5zZWxlY3REYXRlT2JqID0gbm93RGF0ZVxyXG5cclxuICAgICAgdGhpcy5fX3RvZG8odGhpcy5zZWxlY3REYXRlT2JqKVxyXG4gICAgfVxyXG5cclxuICAgIF9fZ2V0Tm93RGF0ZU9iaigpIHtcclxuICAgICAgbGV0IGRhdGVPYmogPSB0aGlzLnNlbGVjdERhdGVPYmpcclxuICAgICAgaWYgKGRhdGVPYmopIHtcclxuICAgICAgICByZXR1cm4gZGF0ZU9ialxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCB0bXAgPSBuZXcgRGF0ZSgpXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX19nZXRGb3JtYXRlRGF0ZU9iaih0bXAuZ2V0RnVsbFllYXIoKSwgdG1wLmdldE1vbnRoKCksIHRtcC5nZXREYXRlKCkpXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfX2dldEZvcm1hdGVEYXRlT2JqKHksIG0sIGQpIHtcclxuICAgICAgcmV0dXJuIG5ldyBEYXRlKHksIG0sIGQpXHJcblxyXG4gICAgICAvLyBsZXQgZGF0ZXN0ciA9IHkgKyAnLycgKyBtICsgJy8nICsgZFxyXG4gICAgICAvLyBsZXQgZGF0ZXN0ciA9IDIwMTggKyAnLycgKyAoMyArIDEpICsgJy8nICsgMVxyXG4gICAgICAvLyByZXR1cm4gbmV3IERhdGUoZGF0ZXN0cilcclxuICAgIH1cclxuXHJcbiAgICBfX2V4Y2hhbmdlTW9udGgoa2V5KSB7XHJcbiAgICAgIGxldCBzZWxlY3REYXRlT2JqID0gdGhpcy5zZWxlY3REYXRlT2JqXHJcbiAgICAgIGxldCB5ID0gc2VsZWN0RGF0ZU9iai5nZXRGdWxsWWVhcigpXHJcbiAgICAgIGxldCBtID0gc2VsZWN0RGF0ZU9iai5nZXRNb250aCgpXHJcbiAgICAgIGxldCBkID0gc2VsZWN0RGF0ZU9iai5nZXREYXRlKClcclxuXHJcbiAgICAgIC8vIGxldCBkYXRlU3RyID0gJydcclxuICAgICAgbGV0IGdvRGF0ZU9iaiA9IG51bGxcclxuICAgICAgaWYgKGtleSA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgbGV0IGxhc3RNb24gPSBtIC0gMVxyXG4gICAgICAgIGlmIChsYXN0TW9uIDwgMCkge1xyXG4gICAgICAgICAgLy8gZGF0ZVN0ciA9ICh5IC0gMSkgKyAnLycgKyAxMiArICcvJyArIGRcclxuICAgICAgICAgIGdvRGF0ZU9iaiA9IHRoaXMuX19nZXRGb3JtYXRlRGF0ZU9iaigoeSAtIDEpLCAxMSwgZClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gZGF0ZVN0ciA9IHkgKyAnLycgKyBtICsgJy8nICsgZFxyXG4gICAgICAgICAgZ29EYXRlT2JqID0gdGhpcy5fX2dldEZvcm1hdGVEYXRlT2JqKHksIGxhc3RNb24sIGQpXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBuZXh0TW9uID0gbSArIDFcclxuICAgICAgICBpZiAobmV4dE1vbiA+IDExKSB7XHJcbiAgICAgICAgICAvLyBkYXRlU3RyID0gKHkgKyAxKSArICcvJyArIDEgKyAnLycgKyBkXHJcbiAgICAgICAgICBnb0RhdGVPYmogPSB0aGlzLl9fZ2V0Rm9ybWF0ZURhdGVPYmooKHkgKyAxKSwgMCwgZClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gZGF0ZVN0ciA9IHkgKyAnLycgKyBuZXh0ICsgJy8nICsgZFxyXG4gICAgICAgICAgZ29EYXRlT2JqID0gdGhpcy5fX2dldEZvcm1hdGVEYXRlT2JqKHksIG5leHRNb24sIGQpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIC8vIGxldCBnb0RhdGVPYmogPSBuZXcgRGF0ZShkYXRlU3RyKVxyXG4gICAgICB0aGlzLnNlbGVjdERhdGVPYmogPSBnb0RhdGVPYmpcclxuICAgICAgdGhpcy5fX3RvZG8odGhpcy5zZWxlY3REYXRlT2JqKVxyXG4gICAgfVxyXG5cclxuICAgIF9fZ2V0ZGF5cygpIHtcclxuICAgICAgbGV0IGFyciA9IFtdXHJcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMzE7IGkrKykge1xyXG4gICAgICAgIGxldCBtc2cgPSBbXVxyXG5cclxuICAgICAgICBpZiAoaSA9PT0gMjUpIHtcclxuICAgICAgICAgIG1zZyA9IFsnZm1s55Sf5pelJywgJ+aYpeiKgiddXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgb2JqID0ge1xyXG4gICAgICAgICAgbmV3ZGF5OiBpLFxyXG4gICAgICAgICAgb2xkZGF5OiAn5YidJy5jb25jYXQoaS50b1N0cmluZygpKSxcclxuICAgICAgICAgIGN1c3RvbU1zZzogbXNnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFyci5wdXNoKG9iailcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm15TW9uRGF5cy5kYXlzID0gYXJyXHJcbiAgICAgIHRoaXMubXlNb25EYXlzLnJvd051bWJlciA9IFsxLCAyLCAzLCA0LCA1XVxyXG4gICAgICB0aGlzLm15TW9uRGF5cy5jb2x1bW5OdW1iZXIgPSB0aGlzLndlZWtzXHJcbiAgICB9XHJcblxyXG4gICAgX190b2RvKGRhdGVPYmopIHtcclxuICAgICAgbGV0IHkgPSBkYXRlT2JqLmdldEZ1bGxZZWFyKClcclxuICAgICAgbGV0IG0gPSBkYXRlT2JqLmdldE1vbnRoKCkgLyog5Zug5Li65pyI5Lu95pivMOW8gOWniyAqL1xyXG4gICAgICBsZXQgZCA9IGRhdGVPYmouZ2V0RGF0ZSgpIC8qIOiOt+WPluS7iuWkqeaYr+i/meS4quaciOeahOesrOWHoOWPt+S7jjHlvIDlp4sgKi9cclxuXHJcblxyXG4gICAgICAvKiDov5Tlm57or6XmmJ/mnJ/kuK3nmoTmn5DkuIDlpKkg77yM6K+l5YC85pivIDDvvIjmmJ/mnJ/lpKnvvIkgfiA277yI5pif5pyf5YWt77yJIOS4reeahOS4gOS4quWAvOOAgiAqL1xyXG4gICAgICAvKiDmmJ/mnJ/lh6Dku44w5byA5aeL77yM5rOo5oSP5Yir5YaZ5oiQZ2V0VVRDRGF0ZSgpICovXHJcbiAgICAgIC8vIGxldCBub3dXZWVrRGF5TnVtID0gZGF0ZU9iai5nZXRVVENEYXkoKSArIDFcclxuICAgICAgbGV0IHdlZWtOdW1JbldlZWsgPSBkYXRlT2JqLmdldERheSgpXHJcblxyXG5cclxuICAgICAgLyog6YCa6L+H5LuK5aSp5piv56ys5Yeg5Y+35ZKM5pif5pyf5Yeg5o6o566XMeWPt+aYr+aYn+acn+WHoO+8jOacieWPr+iDveWHuueOsOi0n+aVsCAqL1xyXG4gICAgICBsZXQgX193ZWVrTnVtT2YxID0gd2Vla051bUluV2VlayAtIChkICUgNyAtIDEpXHJcbiAgICAgIC8qIOaKiui0n+aVsOaNouS4uuato+aVsCAqL1xyXG4gICAgICBsZXQgd2Vla051bU9mMSA9IF9fd2Vla051bU9mMSA8PSAwID8gX193ZWVrTnVtT2YxICsgNyA6IF9fd2Vla051bU9mMVxyXG5cclxuICAgICAgLyog5Zyo5LiK6Z2i55qE5Luj56CB5Lit77yM5oiR5Lus5Yid5aeL5YyWZOS4uuS4ieaciOS7veeahOesrDDlpKnvvIznlLHkuo5KYXZhU2NyaXB05LitZGF555qE6IyD5Zu05Li6MX4zMeS4reeahOWAvO+8jOaJgOS7peW9k+iuvuS4ujDml7bvvIzkvJrlkJHliY0g5LiA5aSp77yM5Lmf5Y2z6KGo56S65LiK5Liq5pyI55qE5pyA5ZCO5LiA5aSpICovXHJcbiAgICAgIGxldCBkYXlOdW1Jbk1vbiA9IG5ldyBEYXRlKHksIChtICsgMSksIDApLmdldERhdGUoKSAvKiDojrflj5bkuIrkuIDkuKrmnIjmnInlpJrlsJHlpKkgKi9cclxuXHJcbiAgICAgIGxldCBub3dNb25EYXlzTGlzdCA9IFtdXHJcbiAgICAgIGxldCB0ID0gMFxyXG4gICAgICBsZXQgbnVtT2ZOdWxsID0gd2Vla051bU9mMSAtIDFcclxuXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgKGRheU51bUluTW9uICsgbnVtT2ZOdWxsKTsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGkgPCBudW1PZk51bGwpIHtcclxuICAgICAgICAgIG5vd01vbkRheXNMaXN0W2ldID0gJydcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbGV0IG4gPSB0ICsgMVxyXG4gICAgICAgICAgbGV0IG9iaiA9IHtcclxuICAgICAgICAgICAgbmV3ZGF5OiBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgIG9sZGRheTogJ+WInScuY29uY2F0KG4udG9TdHJpbmcoKSksXHJcbiAgICAgICAgICAgIGN1c3RvbU1zZzogW11cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIG5vd01vbkRheXNMaXN0LnB1c2gob2JqKVxyXG4gICAgICAgICAgdCA9IG5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuaGVhZGVyVGV4dCA9IHkgKyAn5bm0JyArIChtICsgMSkgKyAn5pyIJyArIGQgKyAn5pelJ1xyXG4gICAgICB0aGlzLm15TW9uRGF5cy5kYXlzID0gbm93TW9uRGF5c0xpc3RcclxuICAgICAgdGhpcy5teU1vbkRheXMuY29sdW1uTnVtYmVyID0gdGhpcy53ZWVrc1xyXG4gICAgICB0aGlzLm15TW9uRGF5cy5yb3dOdW1iZXIgPSBub3dNb25EYXlzTGlzdC5sZW5ndGggLyB0aGlzLm15TW9uRGF5cy5jb2x1bW5OdW1iZXIubGVuZ3RoXHJcblxyXG4gICAgICAvKiDorabnpLrvvJrkuI3lj6/ku6Xkvb/nlKggdGhpcy5zZWxlY3REYXRlT2JqID09IHRoaXMubm93RGF0ZU9iaiDmr5TovoPml6XmnJ8gKi9cclxuICAgICAgLy8gaWYgKHRoaXMuc2VsZWN0RGF0ZU9iaiA+IHRoaXMubm93RGF0ZU9iaiB8fCB0aGlzLnNlbGVjdERhdGVPYmogPCB0aGlzLm5vd0RhdGVPYmopIHtcclxuICAgICAgLy8gICBjb25zb2xlLmxvZygn6YCJ5oup55qE5pel5pyf5ZKM5b2T5YmN5LiN55u4562JJylcclxuICAgICAgLy8gICBjb25zb2xlLmxvZygnc2VsZWN0RGF0ZU9iaiAnICsgdGhpcy5zZWxlY3REYXRlT2JqKVxyXG4gICAgICAvLyAgIGNvbnNvbGUubG9nKCdub3dEYXRlT2JqICcgKyB0aGlzLm5vd0RhdGVPYmopXHJcbiAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgIC8vICAgY29uc29sZS5sb2coJ+mAieaLqeeahOaXpeacn+WSjOW9k+WJjeebuOetiScpXHJcbiAgICAgIC8vIH1cclxuICAgIH1cclxuICB9XHJcbiJdfQ==