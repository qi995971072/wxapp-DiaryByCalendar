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
      DairyDataArr: [],
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
    key: 'setSelectDateDiary',
    value: function setSelectDateDiary(diaryDataArr) {
      console.log(diaryDataArr);
      this.DairyDataArr = diaryDataArr;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNhbGVuZGFyLmpzIl0sIm5hbWVzIjpbIkZRY2FsZW5kYXIiLCJkYXRhIiwiRGFpcnlEYXRhQXJyIiwiaGVhZGVyVGV4dCIsIndlZWtzIiwibXlNb25EYXlzIiwicm93TnVtYmVyIiwiY29sdW1uTnVtYmVyIiwiZGF5cyIsInNlbGVjdERhdGVPYmoiLCJub3dEYXRlT2JqIiwibm93RGF5TnVtYmVyIiwibWV0aG9kcyIsImxhc3RNb250aCIsImNvbnNvbGUiLCJsb2ciLCJfX2V4Y2hhbmdlTW9udGgiLCJuZXh0TW9udGgiLCJjbGlja1RvRWRpdERpYXJ5Iiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiX19zdGFydCIsImRpYXJ5RGF0YUFyciIsIm5vd0RhdGUiLCJfX2dldE5vd0RhdGVPYmoiLCJnZXREYXRlIiwiX190b2RvIiwiZGF0ZU9iaiIsInRtcCIsIkRhdGUiLCJfX2dldEZvcm1hdGVEYXRlT2JqIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsInkiLCJtIiwiZCIsImtleSIsImdvRGF0ZU9iaiIsImxhc3RNb24iLCJuZXh0TW9uIiwiYXJyIiwiaSIsIm1zZyIsIm9iaiIsIm5ld2RheSIsIm9sZGRheSIsImNvbmNhdCIsInRvU3RyaW5nIiwiY3VzdG9tTXNnIiwicHVzaCIsIndlZWtOdW1JbldlZWsiLCJnZXREYXkiLCJfX3dlZWtOdW1PZjEiLCJ3ZWVrTnVtT2YxIiwiZGF5TnVtSW5Nb24iLCJub3dNb25EYXlzTGlzdCIsInQiLCJudW1PZk51bGwiLCJuIiwibGVuZ3RoIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs7Ozs7OExBQ25CQyxJLEdBQU87QUFDSEMsb0JBQWMsRUFEWDtBQUVMQyxrQkFBWSxFQUZQO0FBR0xDLGFBQU8sQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBcUIsR0FBckIsRUFBMEIsR0FBMUIsRUFBK0IsR0FBL0IsQ0FIRjtB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OlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgRlFjYWxlbmRhciBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgZGF0YSA9IHtcbiAgICAgICAgRGFpcnlEYXRhQXJyOiBbXSxcbiAgICAgIGhlYWRlclRleHQ6ICcnLFxuICAgICAgd2Vla3M6IFsn5LiAJywgJ+S6jCcsICfkuIknLCAn5ZubJywgJ+S6lCcsICflha0nLCAn5pelJ10sXG4gICAgICBteU1vbkRheXM6IHtcbiAgICAgICAgcm93TnVtYmVyOiBbXSxcbiAgICAgICAgY29sdW1uTnVtYmVyOiBbXSxcbiAgICAgICAgZGF5czogW11cbiAgICAgIH0sXG4gICAgICBzZWxlY3REYXRlT2JqOiBudWxsLFxuICAgICAgbm93RGF0ZU9iajogbnVsbCxcbiAgICAgIG5vd0RheU51bWJlcjogbnVsbFxuICAgIH1cblxuICAgICAgb25Mb2FkKCkge1xuICAgICAgICAgIC8vIHRoaXMuX19nZXRkYXlzKClcbiAgICAgICAgICB0aGlzLl9fc3RhcnQoKVxuICAgICAgfVxuXG4gICAgICBzZXRTZWxlY3REYXRlRGlhcnkoZGlhcnlEYXRhQXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGRpYXJ5RGF0YUFycilcbiAgICAgICAgICB0aGlzLkRhaXJ5RGF0YUFyciA9IGRpYXJ5RGF0YUFyclxuICAgICAgfVxuXG5cbiAgICAgIG1ldGhvZHMgPSB7XG4gICAgICBsYXN0TW9udGgoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfliIfmjaLliLDkuIrkuIDkuKrmnIgnKVxuICAgICAgICB0aGlzLl9fZXhjaGFuZ2VNb250aCgnbGVmdCcpXG4gICAgICB9LFxuXG4gICAgICBuZXh0TW9udGgoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfliIfmjaLliLDkuIvkuIDkuKrmnIgnKVxuICAgICAgICB0aGlzLl9fZXhjaGFuZ2VNb250aCgncmlnaHQnKVxuICAgICAgfSxcblxuICAgICAgY2xpY2tUb0VkaXREaWFyeSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ+eCueWHu+e8lui+keaXpeiusCcpXG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4uL3BhZ2VzL0VkaXREaWFyeSdcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIF9fc3RhcnQoKSB7XG4gICAgICAvKiDliJ3lp4vljJblkozkv53lrZjku4rlpKnnmoTml7bpl7QgKi9cbiAgICAgIGxldCBub3dEYXRlID0gdGhpcy5fX2dldE5vd0RhdGVPYmooKVxuICAgICAgdGhpcy5ub3dEYXRlT2JqID0gbm93RGF0ZVxuICAgICAgdGhpcy5ub3dEYXlOdW1iZXIgPSB0aGlzLm5vd0RhdGVPYmouZ2V0RGF0ZSgpXG4gICAgICBjb25zb2xlLmxvZygn5LuK5aSp55qE5pel5pyf5pivID09PiAnICsgdGhpcy5ub3dEYXlOdW1iZXIpXG4gICAgICB0aGlzLnNlbGVjdERhdGVPYmogPSBub3dEYXRlXG5cbiAgICAgIHRoaXMuX190b2RvKHRoaXMuc2VsZWN0RGF0ZU9iailcbiAgICB9XG5cbiAgICBfX2dldE5vd0RhdGVPYmooKSB7XG4gICAgICBsZXQgZGF0ZU9iaiA9IHRoaXMuc2VsZWN0RGF0ZU9ialxuICAgICAgaWYgKGRhdGVPYmopIHtcbiAgICAgICAgcmV0dXJuIGRhdGVPYmpcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB0bXAgPSBuZXcgRGF0ZSgpXG4gICAgICAgIHJldHVybiB0aGlzLl9fZ2V0Rm9ybWF0ZURhdGVPYmoodG1wLmdldEZ1bGxZZWFyKCksIHRtcC5nZXRNb250aCgpLCB0bXAuZ2V0RGF0ZSgpKVxuICAgICAgfVxuICAgIH1cblxuICAgIF9fZ2V0Rm9ybWF0ZURhdGVPYmooeSwgbSwgZCkge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKHksIG0sIGQpXG5cbiAgICAgIC8vIGxldCBkYXRlc3RyID0geSArICcvJyArIG0gKyAnLycgKyBkXG4gICAgICAvLyBsZXQgZGF0ZXN0ciA9IDIwMTggKyAnLycgKyAoMyArIDEpICsgJy8nICsgMVxuICAgICAgLy8gcmV0dXJuIG5ldyBEYXRlKGRhdGVzdHIpXG4gICAgfVxuXG4gICAgX19leGNoYW5nZU1vbnRoKGtleSkge1xuICAgICAgbGV0IHNlbGVjdERhdGVPYmogPSB0aGlzLnNlbGVjdERhdGVPYmpcbiAgICAgIGxldCB5ID0gc2VsZWN0RGF0ZU9iai5nZXRGdWxsWWVhcigpXG4gICAgICBsZXQgbSA9IHNlbGVjdERhdGVPYmouZ2V0TW9udGgoKVxuICAgICAgbGV0IGQgPSBzZWxlY3REYXRlT2JqLmdldERhdGUoKVxuXG4gICAgICAvLyBsZXQgZGF0ZVN0ciA9ICcnXG4gICAgICBsZXQgZ29EYXRlT2JqID0gbnVsbFxuICAgICAgaWYgKGtleSA9PT0gJ2xlZnQnKSB7XG4gICAgICAgIGxldCBsYXN0TW9uID0gbSAtIDFcbiAgICAgICAgaWYgKGxhc3RNb24gPCAwKSB7XG4gICAgICAgICAgLy8gZGF0ZVN0ciA9ICh5IC0gMSkgKyAnLycgKyAxMiArICcvJyArIGRcbiAgICAgICAgICBnb0RhdGVPYmogPSB0aGlzLl9fZ2V0Rm9ybWF0ZURhdGVPYmooKHkgLSAxKSwgMTEsIGQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZGF0ZVN0ciA9IHkgKyAnLycgKyBtICsgJy8nICsgZFxuICAgICAgICAgIGdvRGF0ZU9iaiA9IHRoaXMuX19nZXRGb3JtYXRlRGF0ZU9iaih5LCBsYXN0TW9uLCBkKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgbmV4dE1vbiA9IG0gKyAxXG4gICAgICAgIGlmIChuZXh0TW9uID4gMTEpIHtcbiAgICAgICAgICAvLyBkYXRlU3RyID0gKHkgKyAxKSArICcvJyArIDEgKyAnLycgKyBkXG4gICAgICAgICAgZ29EYXRlT2JqID0gdGhpcy5fX2dldEZvcm1hdGVEYXRlT2JqKCh5ICsgMSksIDAsIGQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZGF0ZVN0ciA9IHkgKyAnLycgKyBuZXh0ICsgJy8nICsgZFxuICAgICAgICAgIGdvRGF0ZU9iaiA9IHRoaXMuX19nZXRGb3JtYXRlRGF0ZU9iaih5LCBuZXh0TW9uLCBkKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBsZXQgZ29EYXRlT2JqID0gbmV3IERhdGUoZGF0ZVN0cilcbiAgICAgIHRoaXMuc2VsZWN0RGF0ZU9iaiA9IGdvRGF0ZU9ialxuICAgICAgdGhpcy5fX3RvZG8odGhpcy5zZWxlY3REYXRlT2JqKVxuICAgIH1cblxuICAgIF9fZ2V0ZGF5cygpIHtcbiAgICAgIGxldCBhcnIgPSBbXVxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAzMTsgaSsrKSB7XG4gICAgICAgIGxldCBtc2cgPSBbXVxuXG4gICAgICAgIGlmIChpID09PSAyNSkge1xuICAgICAgICAgIG1zZyA9IFsnZm1s55Sf5pelJywgJ+aYpeiKgiddXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgb2JqID0ge1xuICAgICAgICAgIG5ld2RheTogaSxcbiAgICAgICAgICBvbGRkYXk6ICfliJ0nLmNvbmNhdChpLnRvU3RyaW5nKCkpLFxuICAgICAgICAgIGN1c3RvbU1zZzogbXNnXG4gICAgICAgIH1cbiAgICAgICAgYXJyLnB1c2gob2JqKVxuICAgICAgfVxuICAgICAgdGhpcy5teU1vbkRheXMuZGF5cyA9IGFyclxuICAgICAgdGhpcy5teU1vbkRheXMucm93TnVtYmVyID0gWzEsIDIsIDMsIDQsIDVdXG4gICAgICB0aGlzLm15TW9uRGF5cy5jb2x1bW5OdW1iZXIgPSB0aGlzLndlZWtzXG4gICAgfVxuXG4gICAgX190b2RvKGRhdGVPYmopIHtcbiAgICAgIGxldCB5ID0gZGF0ZU9iai5nZXRGdWxsWWVhcigpXG4gICAgICBsZXQgbSA9IGRhdGVPYmouZ2V0TW9udGgoKSAvKiDlm6DkuLrmnIjku73mmK8w5byA5aeLICovXG4gICAgICBsZXQgZCA9IGRhdGVPYmouZ2V0RGF0ZSgpIC8qIOiOt+WPluS7iuWkqeaYr+i/meS4quaciOeahOesrOWHoOWPt+S7jjHlvIDlp4sgKi9cblxuXG4gICAgICAvKiDov5Tlm57or6XmmJ/mnJ/kuK3nmoTmn5DkuIDlpKkg77yM6K+l5YC85pivIDDvvIjmmJ/mnJ/lpKnvvIkgfiA277yI5pif5pyf5YWt77yJIOS4reeahOS4gOS4quWAvOOAgiAqL1xuICAgICAgLyog5pif5pyf5Yeg5LuOMOW8gOWni++8jOazqOaEj+WIq+WGmeaIkGdldFVUQ0RhdGUoKSAqL1xuICAgICAgLy8gbGV0IG5vd1dlZWtEYXlOdW0gPSBkYXRlT2JqLmdldFVUQ0RheSgpICsgMVxuICAgICAgbGV0IHdlZWtOdW1JbldlZWsgPSBkYXRlT2JqLmdldERheSgpXG5cblxuICAgICAgLyog6YCa6L+H5LuK5aSp5piv56ys5Yeg5Y+35ZKM5pif5pyf5Yeg5o6o566XMeWPt+aYr+aYn+acn+WHoO+8jOacieWPr+iDveWHuueOsOi0n+aVsCAqL1xuICAgICAgbGV0IF9fd2Vla051bU9mMSA9IHdlZWtOdW1JbldlZWsgLSAoZCAlIDcgLSAxKVxuICAgICAgLyog5oqK6LSf5pWw5o2i5Li65q2j5pWwICovXG4gICAgICBsZXQgd2Vla051bU9mMSA9IF9fd2Vla051bU9mMSA8PSAwID8gX193ZWVrTnVtT2YxICsgNyA6IF9fd2Vla051bU9mMVxuXG4gICAgICAvKiDlnKjkuIrpnaLnmoTku6PnoIHkuK3vvIzmiJHku6zliJ3lp4vljJZk5Li65LiJ5pyI5Lu955qE56ysMOWkqe+8jOeUseS6jkphdmFTY3JpcHTkuK1kYXnnmoTojIPlm7TkuLoxfjMx5Lit55qE5YC877yM5omA5Lul5b2T6K6+5Li6MOaXtu+8jOS8muWQkeWJjSDkuIDlpKnvvIzkuZ/ljbPooajnpLrkuIrkuKrmnIjnmoTmnIDlkI7kuIDlpKkgKi9cbiAgICAgIGxldCBkYXlOdW1Jbk1vbiA9IG5ldyBEYXRlKHksIChtICsgMSksIDApLmdldERhdGUoKSAvKiDojrflj5bkuIrkuIDkuKrmnIjmnInlpJrlsJHlpKkgKi9cblxuICAgICAgbGV0IG5vd01vbkRheXNMaXN0ID0gW11cbiAgICAgIGxldCB0ID0gMFxuICAgICAgbGV0IG51bU9mTnVsbCA9IHdlZWtOdW1PZjEgLSAxXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgKGRheU51bUluTW9uICsgbnVtT2ZOdWxsKTsgaSsrKSB7XG4gICAgICAgIGlmIChpIDwgbnVtT2ZOdWxsKSB7XG4gICAgICAgICAgbm93TW9uRGF5c0xpc3RbaV0gPSAnJ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBuID0gdCArIDFcbiAgICAgICAgICBsZXQgb2JqID0ge1xuICAgICAgICAgICAgbmV3ZGF5OiBuLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBvbGRkYXk6ICfliJ0nLmNvbmNhdChuLnRvU3RyaW5nKCkpLFxuICAgICAgICAgICAgY3VzdG9tTXNnOiBbXVxuICAgICAgICAgIH1cbiAgICAgICAgICBub3dNb25EYXlzTGlzdC5wdXNoKG9iailcbiAgICAgICAgICB0ID0gblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaGVhZGVyVGV4dCA9IHkgKyAn5bm0JyArIChtICsgMSkgKyAn5pyIJyArIGQgKyAn5pelJ1xuICAgICAgdGhpcy5teU1vbkRheXMuZGF5cyA9IG5vd01vbkRheXNMaXN0XG4gICAgICB0aGlzLm15TW9uRGF5cy5jb2x1bW5OdW1iZXIgPSB0aGlzLndlZWtzXG4gICAgICB0aGlzLm15TW9uRGF5cy5yb3dOdW1iZXIgPSBub3dNb25EYXlzTGlzdC5sZW5ndGggLyB0aGlzLm15TW9uRGF5cy5jb2x1bW5OdW1iZXIubGVuZ3RoXG5cbiAgICAgIC8qIOitpuekuu+8muS4jeWPr+S7peS9v+eUqCB0aGlzLnNlbGVjdERhdGVPYmogPT0gdGhpcy5ub3dEYXRlT2JqIOavlOi+g+aXpeacnyAqL1xuICAgICAgLy8gaWYgKHRoaXMuc2VsZWN0RGF0ZU9iaiA+IHRoaXMubm93RGF0ZU9iaiB8fCB0aGlzLnNlbGVjdERhdGVPYmogPCB0aGlzLm5vd0RhdGVPYmopIHtcbiAgICAgIC8vICAgY29uc29sZS5sb2coJ+mAieaLqeeahOaXpeacn+WSjOW9k+WJjeS4jeebuOetiScpXG4gICAgICAvLyAgIGNvbnNvbGUubG9nKCdzZWxlY3REYXRlT2JqICcgKyB0aGlzLnNlbGVjdERhdGVPYmopXG4gICAgICAvLyAgIGNvbnNvbGUubG9nKCdub3dEYXRlT2JqICcgKyB0aGlzLm5vd0RhdGVPYmopXG4gICAgICAvLyB9IGVsc2Uge1xuICAgICAgLy8gICBjb25zb2xlLmxvZygn6YCJ5oup55qE5pel5pyf5ZKM5b2T5YmN55u4562JJylcbiAgICAgIC8vIH1cbiAgICB9XG4gIH1cbiJdfQ==