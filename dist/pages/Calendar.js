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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNhbGVuZGFyLmpzIl0sIm5hbWVzIjpbIkZRY2FsZW5kYXIiLCJkYXRhIiwiaGVhZGVyVGV4dCIsIndlZWtzIiwibXlNb25EYXlzIiwicm93TnVtYmVyIiwiY29sdW1uTnVtYmVyIiwiZGF5cyIsInNlbGVjdERhdGVPYmoiLCJub3dEYXRlT2JqIiwibm93RGF5TnVtYmVyIiwibWV0aG9kcyIsImxhc3RNb250aCIsImNvbnNvbGUiLCJsb2ciLCJfX2V4Y2hhbmdlTW9udGgiLCJuZXh0TW9udGgiLCJjbGlja1RvRWRpdERpYXJ5Iiwid3giLCJuYXZpZ2F0ZVRvIiwidXJsIiwiX19zdGFydCIsIm5vd0RhdGUiLCJfX2dldE5vd0RhdGVPYmoiLCJnZXREYXRlIiwiX190b2RvIiwiZGF0ZU9iaiIsInRtcCIsIkRhdGUiLCJfX2dldEZvcm1hdGVEYXRlT2JqIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsInkiLCJtIiwiZCIsImtleSIsImdvRGF0ZU9iaiIsImxhc3RNb24iLCJuZXh0TW9uIiwiYXJyIiwiaSIsIm1zZyIsIm9iaiIsIm5ld2RheSIsIm9sZGRheSIsImNvbmNhdCIsInRvU3RyaW5nIiwiY3VzdG9tTXNnIiwicHVzaCIsIndlZWtOdW1JbldlZWsiLCJnZXREYXkiLCJfX3dlZWtOdW1PZjEiLCJ3ZWVrTnVtT2YxIiwiZGF5TnVtSW5Nb24iLCJub3dNb25EYXlzTGlzdCIsInQiLCJudW1PZk51bGwiLCJuIiwibGVuZ3RoIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs7Ozs7OExBQ25CQyxJLEdBQU87QUFDTEMsa0JBQVksRUFEUDtBQUVMQyxhQUFPLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLEVBQStCLEdBQS9CLENBRkY7QUFHTEMsaUJBQVc7QUFDVEMsbUJBQVcsRUFERjtBQUVUQyxzQkFBYyxFQUZMO0FB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QUFJLENBQVI7QUFDQSxVQUFJQyxZQUFZSixhQUFhLENBQTdCOztBQUVBLFdBQUssSUFBSVosSUFBSSxDQUFiLEVBQWdCQSxJQUFLYSxjQUFjRyxTQUFuQyxFQUErQ2hCLEdBQS9DLEVBQW9EO0FBQ2xELFlBQUlBLElBQUlnQixTQUFSLEVBQW1CO0FBQ2pCRix5QkFBZWQsQ0FBZixJQUFvQixFQUFwQjtBQUNELFNBRkQsTUFFTztBQUNMLGNBQUlpQixJQUFJRixJQUFJLENBQVo7QUFDQSxjQUFJYixNQUFNO0FBQ1JDLG9CQUFRYyxFQUFFWCxRQUFGLEVBREE7QUFFUkYsb0JBQVEsSUFBSUMsTUFBSixDQUFXWSxFQUFFWCxRQUFGLEVBQVgsQ0FGQTtBQUdSQyx1QkFBVztBQUhILFdBQVY7QUFLQU8seUJBQWVOLElBQWYsQ0FBb0JOLEdBQXBCO0FBQ0FhLGNBQUlFLENBQUo7QUFDRDtBQUNGOztBQUVELFdBQUt2RCxVQUFMLEdBQWtCOEIsSUFBSSxHQUFKLElBQVdDLElBQUksQ0FBZixJQUFvQixHQUFwQixHQUEwQkMsQ0FBMUIsR0FBOEIsR0FBaEQ7QUFDQSxXQUFLOUIsU0FBTCxDQUFlRyxJQUFmLEdBQXNCK0MsY0FBdEI7QUFDQSxXQUFLbEQsU0FBTCxDQUFlRSxZQUFmLEdBQThCLEtBQUtILEtBQW5DO0FBQ0EsV0FBS0MsU0FBTCxDQUFlQyxTQUFmLEdBQTJCaUQsZUFBZUksTUFBZixHQUF3QixLQUFLdEQsU0FBTCxDQUFlRSxZQUFmLENBQTRCb0QsTUFBL0U7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNEOzs7O0VBMUtxQyxlQUFLQyxJOztrQkFBeEIzRCxVIiwiZmlsZSI6IkNhbGVuZGFyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgRlFjYWxlbmRhciBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgZGF0YSA9IHtcbiAgICAgIGhlYWRlclRleHQ6ICcnLFxuICAgICAgd2Vla3M6IFsn5LiAJywgJ+S6jCcsICfkuIknLCAn5ZubJywgJ+S6lCcsICflha0nLCAn5pelJ10sXG4gICAgICBteU1vbkRheXM6IHtcbiAgICAgICAgcm93TnVtYmVyOiBbXSxcbiAgICAgICAgY29sdW1uTnVtYmVyOiBbXSxcbiAgICAgICAgZGF5czogW11cbiAgICAgIH0sXG4gICAgICBzZWxlY3REYXRlT2JqOiBudWxsLFxuICAgICAgbm93RGF0ZU9iajogbnVsbCxcbiAgICAgIG5vd0RheU51bWJlcjpudWxsXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGxhc3RNb250aCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ+WIh+aNouWIsOS4iuS4gOS4quaciCcpXG4gICAgICAgIHRoaXMuX19leGNoYW5nZU1vbnRoKCdsZWZ0JylcbiAgICAgIH0sXG4gICAgICBuZXh0TW9udGgoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfliIfmjaLliLDkuIvkuIDkuKrmnIgnKVxuICAgICAgICB0aGlzLl9fZXhjaGFuZ2VNb250aCgncmlnaHQnKVxuICAgICAgfSxcbiAgICAgIGNsaWNrVG9FZGl0RGlhcnkoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfngrnlh7vnvJbovpHml6XorrAnKVxuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuLi9wYWdlcy9FZGl0RGlhcnknXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgLy8gdGhpcy5fX2dldGRheXMoKVxuICAgICAgdGhpcy5fX3N0YXJ0KClcbiAgICB9XG5cbiAgICBfX3N0YXJ0KCkge1xuICAgICAgLyog5Yid5aeL5YyW5ZKM5L+d5a2Y5LuK5aSp55qE5pe26Ze0ICovXG4gICAgICBsZXQgbm93RGF0ZSA9IHRoaXMuX19nZXROb3dEYXRlT2JqKClcbiAgICAgIHRoaXMubm93RGF0ZU9iaiA9IG5vd0RhdGVcbiAgICAgIHRoaXMubm93RGF5TnVtYmVyID0gdGhpcy5ub3dEYXRlT2JqLmdldERhdGUoKVxuICAgICAgY29uc29sZS5sb2coJ+S7iuWkqeeahOaXpeacn+aYryA9PT4gJyArIHRoaXMubm93RGF5TnVtYmVyKVxuICAgICAgdGhpcy5zZWxlY3REYXRlT2JqID0gbm93RGF0ZVxuXG4gICAgICB0aGlzLl9fdG9kbyh0aGlzLnNlbGVjdERhdGVPYmopXG4gICAgfVxuXG4gICAgX19nZXROb3dEYXRlT2JqKCkge1xuICAgICAgbGV0IGRhdGVPYmogPSB0aGlzLnNlbGVjdERhdGVPYmpcbiAgICAgIGlmIChkYXRlT2JqKSB7XG4gICAgICAgIHJldHVybiBkYXRlT2JqXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdG1wID0gbmV3IERhdGUoKVxuICAgICAgICByZXR1cm4gdGhpcy5fX2dldEZvcm1hdGVEYXRlT2JqKHRtcC5nZXRGdWxsWWVhcigpLCB0bXAuZ2V0TW9udGgoKSwgdG1wLmdldERhdGUoKSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfX2dldEZvcm1hdGVEYXRlT2JqKHksIG0sIGQpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZSh5LCBtLCBkKVxuXG4gICAgICAvLyBsZXQgZGF0ZXN0ciA9IHkgKyAnLycgKyBtICsgJy8nICsgZFxuICAgICAgLy8gbGV0IGRhdGVzdHIgPSAyMDE4ICsgJy8nICsgKDMgKyAxKSArICcvJyArIDFcbiAgICAgIC8vIHJldHVybiBuZXcgRGF0ZShkYXRlc3RyKVxuICAgIH1cblxuICAgIF9fZXhjaGFuZ2VNb250aChrZXkpIHtcbiAgICAgIGxldCBzZWxlY3REYXRlT2JqID0gdGhpcy5zZWxlY3REYXRlT2JqXG4gICAgICBsZXQgeSA9IHNlbGVjdERhdGVPYmouZ2V0RnVsbFllYXIoKVxuICAgICAgbGV0IG0gPSBzZWxlY3REYXRlT2JqLmdldE1vbnRoKClcbiAgICAgIGxldCBkID0gc2VsZWN0RGF0ZU9iai5nZXREYXRlKClcblxuICAgICAgLy8gbGV0IGRhdGVTdHIgPSAnJ1xuICAgICAgbGV0IGdvRGF0ZU9iaiA9IG51bGxcbiAgICAgIGlmIChrZXkgPT09ICdsZWZ0Jykge1xuICAgICAgICBsZXQgbGFzdE1vbiA9IG0gLSAxXG4gICAgICAgIGlmIChsYXN0TW9uIDwgMCkge1xuICAgICAgICAgIC8vIGRhdGVTdHIgPSAoeSAtIDEpICsgJy8nICsgMTIgKyAnLycgKyBkXG4gICAgICAgICAgZ29EYXRlT2JqID0gdGhpcy5fX2dldEZvcm1hdGVEYXRlT2JqKCh5IC0gMSksIDExLCBkKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGRhdGVTdHIgPSB5ICsgJy8nICsgbSArICcvJyArIGRcbiAgICAgICAgICBnb0RhdGVPYmogPSB0aGlzLl9fZ2V0Rm9ybWF0ZURhdGVPYmooeSwgbGFzdE1vbiwgZClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IG5leHRNb24gPSBtICsgMVxuICAgICAgICBpZiAobmV4dE1vbiA+IDExKSB7XG4gICAgICAgICAgLy8gZGF0ZVN0ciA9ICh5ICsgMSkgKyAnLycgKyAxICsgJy8nICsgZFxuICAgICAgICAgIGdvRGF0ZU9iaiA9IHRoaXMuX19nZXRGb3JtYXRlRGF0ZU9iaigoeSArIDEpLCAwLCBkKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGRhdGVTdHIgPSB5ICsgJy8nICsgbmV4dCArICcvJyArIGRcbiAgICAgICAgICBnb0RhdGVPYmogPSB0aGlzLl9fZ2V0Rm9ybWF0ZURhdGVPYmooeSwgbmV4dE1vbiwgZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gbGV0IGdvRGF0ZU9iaiA9IG5ldyBEYXRlKGRhdGVTdHIpXG4gICAgICB0aGlzLnNlbGVjdERhdGVPYmogPSBnb0RhdGVPYmpcbiAgICAgIHRoaXMuX190b2RvKHRoaXMuc2VsZWN0RGF0ZU9iailcbiAgICB9XG5cbiAgICBfX2dldGRheXMoKSB7XG4gICAgICBsZXQgYXJyID0gW11cbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMzE7IGkrKykge1xuICAgICAgICBsZXQgbXNnID0gW11cblxuICAgICAgICBpZiAoaSA9PT0gMjUpIHtcbiAgICAgICAgICBtc2cgPSBbJ2ZtbOeUn+aXpScsICfmmKXoioInXVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG9iaiA9IHtcbiAgICAgICAgICBuZXdkYXk6IGksXG4gICAgICAgICAgb2xkZGF5OiAn5YidJy5jb25jYXQoaS50b1N0cmluZygpKSxcbiAgICAgICAgICBjdXN0b21Nc2c6IG1zZ1xuICAgICAgICB9XG4gICAgICAgIGFyci5wdXNoKG9iailcbiAgICAgIH1cbiAgICAgIHRoaXMubXlNb25EYXlzLmRheXMgPSBhcnJcbiAgICAgIHRoaXMubXlNb25EYXlzLnJvd051bWJlciA9IFsxLCAyLCAzLCA0LCA1XVxuICAgICAgdGhpcy5teU1vbkRheXMuY29sdW1uTnVtYmVyID0gdGhpcy53ZWVrc1xuICAgIH1cblxuICAgIF9fdG9kbyhkYXRlT2JqKSB7XG4gICAgICBsZXQgeSA9IGRhdGVPYmouZ2V0RnVsbFllYXIoKVxuICAgICAgbGV0IG0gPSBkYXRlT2JqLmdldE1vbnRoKCkgLyog5Zug5Li65pyI5Lu95pivMOW8gOWniyAqL1xuICAgICAgbGV0IGQgPSBkYXRlT2JqLmdldERhdGUoKSAvKiDojrflj5bku4rlpKnmmK/ov5nkuKrmnIjnmoTnrKzlh6Dlj7fku44x5byA5aeLICovXG5cblxuICAgICAgLyog6L+U5Zue6K+l5pif5pyf5Lit55qE5p+Q5LiA5aSpIO+8jOivpeWAvOaYryAw77yI5pif5pyf5aSp77yJIH4gNu+8iOaYn+acn+WFre+8iSDkuK3nmoTkuIDkuKrlgLzjgIIgKi9cbiAgICAgIC8qIOaYn+acn+WHoOS7jjDlvIDlp4vvvIzms6jmhI/liKvlhpnmiJBnZXRVVENEYXRlKCkgKi9cbiAgICAgIC8vIGxldCBub3dXZWVrRGF5TnVtID0gZGF0ZU9iai5nZXRVVENEYXkoKSArIDFcbiAgICAgIGxldCB3ZWVrTnVtSW5XZWVrID0gZGF0ZU9iai5nZXREYXkoKVxuXG5cbiAgICAgIC8qIOmAmui/h+S7iuWkqeaYr+esrOWHoOWPt+WSjOaYn+acn+WHoOaOqOeulzHlj7fmmK/mmJ/mnJ/lh6DvvIzmnInlj6/og73lh7rnjrDotJ/mlbAgKi9cbiAgICAgIGxldCBfX3dlZWtOdW1PZjEgPSB3ZWVrTnVtSW5XZWVrIC0gKGQgJSA3IC0gMSlcbiAgICAgIC8qIOaKiui0n+aVsOaNouS4uuato+aVsCAqL1xuICAgICAgbGV0IHdlZWtOdW1PZjEgPSBfX3dlZWtOdW1PZjEgPD0gMCA/IF9fd2Vla051bU9mMSArIDcgOiBfX3dlZWtOdW1PZjFcblxuICAgICAgLyog5Zyo5LiK6Z2i55qE5Luj56CB5Lit77yM5oiR5Lus5Yid5aeL5YyWZOS4uuS4ieaciOS7veeahOesrDDlpKnvvIznlLHkuo5KYXZhU2NyaXB05LitZGF555qE6IyD5Zu05Li6MX4zMeS4reeahOWAvO+8jOaJgOS7peW9k+iuvuS4ujDml7bvvIzkvJrlkJHliY0g5LiA5aSp77yM5Lmf5Y2z6KGo56S65LiK5Liq5pyI55qE5pyA5ZCO5LiA5aSpICovXG4gICAgICBsZXQgZGF5TnVtSW5Nb24gPSBuZXcgRGF0ZSh5LCAobSArIDEpLCAwKS5nZXREYXRlKCkgLyog6I635Y+W5LiK5LiA5Liq5pyI5pyJ5aSa5bCR5aSpICovXG5cbiAgICAgIGxldCBub3dNb25EYXlzTGlzdCA9IFtdXG4gICAgICBsZXQgdCA9IDBcbiAgICAgIGxldCBudW1PZk51bGwgPSB3ZWVrTnVtT2YxIC0gMVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IChkYXlOdW1Jbk1vbiArIG51bU9mTnVsbCk7IGkrKykge1xuICAgICAgICBpZiAoaSA8IG51bU9mTnVsbCkge1xuICAgICAgICAgIG5vd01vbkRheXNMaXN0W2ldID0gJydcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgbiA9IHQgKyAxXG4gICAgICAgICAgbGV0IG9iaiA9IHtcbiAgICAgICAgICAgIG5ld2RheTogbi50b1N0cmluZygpLFxuICAgICAgICAgICAgb2xkZGF5OiAn5YidJy5jb25jYXQobi50b1N0cmluZygpKSxcbiAgICAgICAgICAgIGN1c3RvbU1zZzogW11cbiAgICAgICAgICB9XG4gICAgICAgICAgbm93TW9uRGF5c0xpc3QucHVzaChvYmopXG4gICAgICAgICAgdCA9IG5cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmhlYWRlclRleHQgPSB5ICsgJ+W5tCcgKyAobSArIDEpICsgJ+aciCcgKyBkICsgJ+aXpSdcbiAgICAgIHRoaXMubXlNb25EYXlzLmRheXMgPSBub3dNb25EYXlzTGlzdFxuICAgICAgdGhpcy5teU1vbkRheXMuY29sdW1uTnVtYmVyID0gdGhpcy53ZWVrc1xuICAgICAgdGhpcy5teU1vbkRheXMucm93TnVtYmVyID0gbm93TW9uRGF5c0xpc3QubGVuZ3RoIC8gdGhpcy5teU1vbkRheXMuY29sdW1uTnVtYmVyLmxlbmd0aFxuXG4gICAgICAvKiDorabnpLrvvJrkuI3lj6/ku6Xkvb/nlKggdGhpcy5zZWxlY3REYXRlT2JqID09IHRoaXMubm93RGF0ZU9iaiDmr5TovoPml6XmnJ8gKi9cbiAgICAgIC8vIGlmICh0aGlzLnNlbGVjdERhdGVPYmogPiB0aGlzLm5vd0RhdGVPYmogfHwgdGhpcy5zZWxlY3REYXRlT2JqIDwgdGhpcy5ub3dEYXRlT2JqKSB7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKCfpgInmi6nnmoTml6XmnJ/lkozlvZPliY3kuI3nm7jnrYknKVxuICAgICAgLy8gICBjb25zb2xlLmxvZygnc2VsZWN0RGF0ZU9iaiAnICsgdGhpcy5zZWxlY3REYXRlT2JqKVxuICAgICAgLy8gICBjb25zb2xlLmxvZygnbm93RGF0ZU9iaiAnICsgdGhpcy5ub3dEYXRlT2JqKVxuICAgICAgLy8gfSBlbHNlIHtcbiAgICAgIC8vICAgY29uc29sZS5sb2coJ+mAieaLqeeahOaXpeacn+WSjOW9k+WJjeebuOetiScpXG4gICAgICAvLyB9XG4gICAgfVxuICB9XG4iXX0=