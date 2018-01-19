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

var dur = 500;

var EditDiary = function (_wepy$page) {
  _inherits(EditDiary, _wepy$page);

  function EditDiary() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EditDiary);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EditDiary.__proto__ || Object.getPrototypeOf(EditDiary)).call.apply(_ref, [this].concat(args))), _this), _this.data = {
      showModalStatus: false,
      animationData: null,
      manimation: null,
      viewBottom: null
    }, _this.methods = {
      hideDrawer: function hideDrawer() {

        console.log('隐藏bottom_drawer');

        this.manimation.translateY(0).step();

        // 导出动画数据到animationData
        this.animationData = this.manimation.export();

        setTimeout(function () {
          console.log('隐藏bottom_drawer计时器到期');
          this.setData({ //不是本类调用的方法，将不能直接使用this.showModalStatus = false
            showModalStatus: false
          });
        }.bind(this), dur);
      },
      showDrawer: function showDrawer() {
        console.log('显示bottom_drawer');

        var query = wx.createSelectorQuery(); //选择id
        query.select('#mjltest').boundingClientRect();
        query.exec(function (res) {

          //res就是 所有标签为mjltest的元素的信息 的数组
          console.log(res);

          //取高度
          console.log(res[0].height);

          var height = res[0].height;

          this.manimation.translateY(-height).step();

          this.setData({ //不是本类调用的方法，将不能直接使用this.showModalStatus = false
            showModalStatus: true,
            // 导出动画数据到animationData
            animationData: this.manimation.export()
          });
        }.bind(this));
      },
      doNothing: function doNothing() {
        console.log('do nothing');
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EditDiary, [{
    key: 'onLoad',
    value: function onLoad() {
      console.log('EditDiary on load');

      // 创建动画对象
      this.manimation = wx.createAnimation({
        duration: dur,
        timingFunction: "linear",
        delay: 0
      });
    }
  }, {
    key: 'onReady',
    value: function onReady() {}
  }]);

  return EditDiary;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(EditDiary , 'pages/EditDiary'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkVkaXREaWFyeS5qcyJdLCJuYW1lcyI6WyJkdXIiLCJFZGl0RGlhcnkiLCJkYXRhIiwic2hvd01vZGFsU3RhdHVzIiwiYW5pbWF0aW9uRGF0YSIsIm1hbmltYXRpb24iLCJ2aWV3Qm90dG9tIiwibWV0aG9kcyIsImhpZGVEcmF3ZXIiLCJjb25zb2xlIiwibG9nIiwidHJhbnNsYXRlWSIsInN0ZXAiLCJleHBvcnQiLCJzZXRUaW1lb3V0Iiwic2V0RGF0YSIsImJpbmQiLCJzaG93RHJhd2VyIiwicXVlcnkiLCJ3eCIsImNyZWF0ZVNlbGVjdG9yUXVlcnkiLCJzZWxlY3QiLCJib3VuZGluZ0NsaWVudFJlY3QiLCJleGVjIiwicmVzIiwiaGVpZ2h0IiwiZG9Ob3RoaW5nIiwiY3JlYXRlQW5pbWF0aW9uIiwiZHVyYXRpb24iLCJ0aW1pbmdGdW5jdGlvbiIsImRlbGF5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztBQUVBLElBQU9BLE1BQU0sR0FBYjs7SUFFc0JDLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUVwQkMsSSxHQUFPO0FBQ0xDLHVCQUFnQixLQURYO0FBRUxDLHFCQUFjLElBRlQ7QUFHTEMsa0JBQVcsSUFITjtBQUlMQyxrQkFBVztBQUpOLEssUUFPUEMsTyxHQUFVO0FBRVJDLGdCQUZRLHdCQUVLOztBQUVYQyxnQkFBUUMsR0FBUixDQUFZLGlCQUFaOztBQUVBLGFBQUtMLFVBQUwsQ0FBZ0JNLFVBQWhCLENBQTJCLENBQTNCLEVBQThCQyxJQUE5Qjs7QUFFQTtBQUNBLGFBQUtSLGFBQUwsR0FBcUIsS0FBS0MsVUFBTCxDQUFnQlEsTUFBaEIsRUFBckI7O0FBRUFDLG1CQUFXLFlBQVk7QUFDckJMLGtCQUFRQyxHQUFSLENBQVksc0JBQVo7QUFDQSxlQUFLSyxPQUFMLENBQWEsRUFBQztBQUNaWiw2QkFBaUI7QUFETixXQUFiO0FBR0QsU0FMVSxDQUtUYSxJQUxTLENBS0osSUFMSSxDQUFYLEVBS2FoQixHQUxiO0FBTUQsT0FqQk87QUFtQlJpQixnQkFuQlEsd0JBbUJLO0FBQ1hSLGdCQUFRQyxHQUFSLENBQVksaUJBQVo7O0FBRUEsWUFBSVEsUUFBUUMsR0FBR0MsbUJBQUgsRUFBWixDQUhXLENBRzBCO0FBQ3JDRixjQUFNRyxNQUFOLENBQWEsVUFBYixFQUF5QkMsa0JBQXpCO0FBQ0FKLGNBQU1LLElBQU4sQ0FBVyxVQUFVQyxHQUFWLEVBQWU7O0FBRXhCO0FBQ0FmLGtCQUFRQyxHQUFSLENBQVljLEdBQVo7O0FBRUE7QUFDQWYsa0JBQVFDLEdBQVIsQ0FBWWMsSUFBSSxDQUFKLEVBQU9DLE1BQW5COztBQUdBLGNBQUlBLFNBQVNELElBQUksQ0FBSixFQUFPQyxNQUFwQjs7QUFFQSxlQUFLcEIsVUFBTCxDQUFnQk0sVUFBaEIsQ0FBNEIsQ0FBQ2MsTUFBN0IsRUFBc0NiLElBQXRDOztBQUdBLGVBQUtHLE9BQUwsQ0FBYSxFQUFDO0FBQ1paLDZCQUFpQixJQUROO0FBRVg7QUFDQUMsMkJBQWUsS0FBS0MsVUFBTCxDQUFnQlEsTUFBaEI7QUFISixXQUFiO0FBS0QsU0FuQlUsQ0FtQlRHLElBbkJTLENBbUJKLElBbkJJLENBQVg7QUFvQkQsT0E1Q087QUE4Q1JVLGVBOUNRLHVCQThDSTtBQUNWakIsZ0JBQVFDLEdBQVIsQ0FBWSxZQUFaO0FBQ0Q7QUFoRE8sSzs7Ozs7NkJBbUREO0FBQ1BELGNBQVFDLEdBQVIsQ0FBWSxtQkFBWjs7QUFFQTtBQUNBLFdBQUtMLFVBQUwsR0FBa0JjLEdBQUdRLGVBQUgsQ0FBbUI7QUFDbkNDLGtCQUFVNUIsR0FEeUI7QUFFbkM2Qix3QkFBZ0IsUUFGbUI7QUFHbkNDLGVBQU87QUFINEIsT0FBbkIsQ0FBbEI7QUFLRDs7OzhCQUVTLENBRVQ7Ozs7RUF6RXFDLGVBQUtDLEk7O2tCQUF2QjlCLFMiLCJmaWxlIjoiRWRpdERpYXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgY29uc3QgIGR1ciA9IDUwMDtcblxuICBleHBvcnQgZGVmYXVsdCAgY2xhc3MgRWRpdERpYXJ5IGV4dGVuZHMgd2VweS5wYWdlIHtcblxuICAgIGRhdGEgPSB7XG4gICAgICBzaG93TW9kYWxTdGF0dXM6ZmFsc2UsXG4gICAgICBhbmltYXRpb25EYXRhOm51bGwsXG4gICAgICBtYW5pbWF0aW9uOm51bGwsXG4gICAgICB2aWV3Qm90dG9tOm51bGxcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuXG4gICAgICBoaWRlRHJhd2VyKCkge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCfpmpDol49ib3R0b21fZHJhd2VyJylcblxuICAgICAgICB0aGlzLm1hbmltYXRpb24udHJhbnNsYXRlWSgwKS5zdGVwKClcblxuICAgICAgICAvLyDlr7zlh7rliqjnlLvmlbDmja7liLBhbmltYXRpb25EYXRhXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uRGF0YSA9IHRoaXMubWFuaW1hdGlvbi5leHBvcnQoKVxuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCfpmpDol49ib3R0b21fZHJhd2Vy6K6h5pe25Zmo5Yiw5pyfJylcbiAgICAgICAgICB0aGlzLnNldERhdGEoey8v5LiN5piv5pys57G76LCD55So55qE5pa55rOV77yM5bCG5LiN6IO955u05o6l5L2/55SodGhpcy5zaG93TW9kYWxTdGF0dXMgPSBmYWxzZVxuICAgICAgICAgICAgc2hvd01vZGFsU3RhdHVzOiBmYWxzZVxuICAgICAgICAgIH0pXG4gICAgICAgIH0uYmluZCh0aGlzKSxkdXIpXG4gICAgICB9LFxuXG4gICAgICBzaG93RHJhd2VyKCkge1xuICAgICAgICBjb25zb2xlLmxvZygn5pi+56S6Ym90dG9tX2RyYXdlcicpXG5cbiAgICAgICAgdmFyIHF1ZXJ5ID0gd3guY3JlYXRlU2VsZWN0b3JRdWVyeSgpOy8v6YCJ5oupaWRcbiAgICAgICAgcXVlcnkuc2VsZWN0KCcjbWpsdGVzdCcpLmJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgIHF1ZXJ5LmV4ZWMoZnVuY3Rpb24gKHJlcykge1xuXG4gICAgICAgICAgLy9yZXPlsLHmmK8g5omA5pyJ5qCH562+5Li6bWpsdGVzdOeahOWFg+e0oOeahOS/oeaBryDnmoTmlbDnu4RcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuXG4gICAgICAgICAgLy/lj5bpq5jluqZcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXNbMF0uaGVpZ2h0KTtcblxuXG4gICAgICAgICAgbGV0IGhlaWdodCA9IHJlc1swXS5oZWlnaHQ7XG5cbiAgICAgICAgICB0aGlzLm1hbmltYXRpb24udHJhbnNsYXRlWSgoLWhlaWdodCkpLnN0ZXAoKVxuXG5cbiAgICAgICAgICB0aGlzLnNldERhdGEoey8v5LiN5piv5pys57G76LCD55So55qE5pa55rOV77yM5bCG5LiN6IO955u05o6l5L2/55SodGhpcy5zaG93TW9kYWxTdGF0dXMgPSBmYWxzZVxuICAgICAgICAgICAgc2hvd01vZGFsU3RhdHVzOiB0cnVlLFxuICAgICAgICAgICAgLy8g5a+85Ye65Yqo55S75pWw5o2u5YiwYW5pbWF0aW9uRGF0YVxuICAgICAgICAgICAgYW5pbWF0aW9uRGF0YTogdGhpcy5tYW5pbWF0aW9uLmV4cG9ydCgpXG4gICAgICAgICAgfSlcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgfSxcblxuICAgICAgZG9Ob3RoaW5nKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnZG8gbm90aGluZycpXG4gICAgICB9XG4gICAgfVxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgY29uc29sZS5sb2coJ0VkaXREaWFyeSBvbiBsb2FkJylcblxuICAgICAgLy8g5Yib5bu65Yqo55S75a+56LGhXG4gICAgICB0aGlzLm1hbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oe1xuICAgICAgICBkdXJhdGlvbjogZHVyLFxuICAgICAgICB0aW1pbmdGdW5jdGlvbjogXCJsaW5lYXJcIixcbiAgICAgICAgZGVsYXk6IDBcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgb25SZWFkeSgpIHtcblxuICAgIH1cbiAgfVxuIl19