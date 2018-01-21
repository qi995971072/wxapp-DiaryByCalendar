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

var dur = 200;

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
      viewBottom: null,
      inputViewArr: []
    }, _this.methods = {
      hideDrawer: function hideDrawer() {

        console.log('隐藏bottom_drawer');

        var query = wx.createSelectorQuery(); //选择id
        query.select('#mjltest').boundingClientRect();
        query.exec(function (res) {

          //res就是 所有标签为mjltest的元素的信息 的数组
          console.log(res);

          //取高度
          console.log(res[0].height);

          var height = res[0].height;

          this.manimation.translateY(height).step();

          this.setData({ //不是本类调用的方法，将不能直接使用this.showModalStatus = false
            showModalStatus: true,
            // 导出动画数据到animationData
            animationData: this.manimation.export()
          });

          setTimeout(function () {
            console.log('隐藏bottom_drawer计时器到期');
            this.setData({ //不是本类调用的方法，将不能直接使用this.showModalStatus = false
              showModalStatus: false
            });
          }.bind(this), dur);
        }.bind(this));
      },
      showDrawer: function showDrawer() {
        console.log('显示bottom_drawer');
        this.manimation.translateY(0).step();
        this.showModalStatus = true;
        this.animationData = this.manimation.export();
      },
      doNothing: function doNothing() {
        console.log('do nothing');
      },
      itemClick: function itemClick(e) {

        console.log('点击的下标==> ' + e.currentTarget.dataset.index);
        var index = e.currentTarget.dataset.index;
        if (index == 0) {
          console.log('点击了文字');
          this.inputViewArr.push(0);
        } else if (index == 1) {
          console.log('点击了图片');
          this.inputViewArr.push(1);
        }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkVkaXREaWFyeS5qcyJdLCJuYW1lcyI6WyJkdXIiLCJFZGl0RGlhcnkiLCJkYXRhIiwic2hvd01vZGFsU3RhdHVzIiwiYW5pbWF0aW9uRGF0YSIsIm1hbmltYXRpb24iLCJ2aWV3Qm90dG9tIiwiaW5wdXRWaWV3QXJyIiwibWV0aG9kcyIsImhpZGVEcmF3ZXIiLCJjb25zb2xlIiwibG9nIiwicXVlcnkiLCJ3eCIsImNyZWF0ZVNlbGVjdG9yUXVlcnkiLCJzZWxlY3QiLCJib3VuZGluZ0NsaWVudFJlY3QiLCJleGVjIiwicmVzIiwiaGVpZ2h0IiwidHJhbnNsYXRlWSIsInN0ZXAiLCJzZXREYXRhIiwiZXhwb3J0Iiwic2V0VGltZW91dCIsImJpbmQiLCJzaG93RHJhd2VyIiwiZG9Ob3RoaW5nIiwiaXRlbUNsaWNrIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiaW5kZXgiLCJwdXNoIiwiY3JlYXRlQW5pbWF0aW9uIiwiZHVyYXRpb24iLCJ0aW1pbmdGdW5jdGlvbiIsImRlbGF5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztBQUVBLElBQU9BLE1BQU0sR0FBYjs7SUFFc0JDLFM7Ozs7Ozs7Ozs7Ozs7OzRMQUVwQkMsSSxHQUFPO0FBQ0xDLHVCQUFnQixLQURYO0FBRUxDLHFCQUFjLElBRlQ7QUFHTEMsa0JBQVcsSUFITjtBQUlMQyxrQkFBVyxJQUpOO0FBS0hDLG9CQUFhO0FBTFYsSyxRQVFQQyxPLEdBQVU7QUFFUkMsZ0JBRlEsd0JBRUs7O0FBRVhDLGdCQUFRQyxHQUFSLENBQVksaUJBQVo7O0FBRUUsWUFBSUMsUUFBUUMsR0FBR0MsbUJBQUgsRUFBWixDQUpTLENBSTRCO0FBQ3JDRixjQUFNRyxNQUFOLENBQWEsVUFBYixFQUF5QkMsa0JBQXpCO0FBQ0FKLGNBQU1LLElBQU4sQ0FBVyxVQUFVQyxHQUFWLEVBQWU7O0FBRXhCO0FBQ0FSLGtCQUFRQyxHQUFSLENBQVlPLEdBQVo7O0FBRUE7QUFDQVIsa0JBQVFDLEdBQVIsQ0FBWU8sSUFBSSxDQUFKLEVBQU9DLE1BQW5COztBQUdBLGNBQUlBLFNBQVNELElBQUksQ0FBSixFQUFPQyxNQUFwQjs7QUFFQSxlQUFLZCxVQUFMLENBQWdCZSxVQUFoQixDQUE0QkQsTUFBNUIsRUFBcUNFLElBQXJDOztBQUdBLGVBQUtDLE9BQUwsQ0FBYSxFQUFDO0FBQ1puQiw2QkFBaUIsSUFETjtBQUVYO0FBQ0FDLDJCQUFlLEtBQUtDLFVBQUwsQ0FBZ0JrQixNQUFoQjtBQUhKLFdBQWI7O0FBTUVDLHFCQUFXLFlBQVk7QUFDbkJkLG9CQUFRQyxHQUFSLENBQVksc0JBQVo7QUFDQSxpQkFBS1csT0FBTCxDQUFhLEVBQUM7QUFDVm5CLCtCQUFpQjtBQURSLGFBQWI7QUFHSCxXQUxVLENBS1RzQixJQUxTLENBS0osSUFMSSxDQUFYLEVBS2F6QixHQUxiO0FBT0gsU0EzQlUsQ0EyQlR5QixJQTNCUyxDQTJCSixJQTNCSSxDQUFYO0FBNEJILE9BcENPO0FBc0NSQyxnQkF0Q1Esd0JBc0NLO0FBQ1RoQixnQkFBUUMsR0FBUixDQUFZLGlCQUFaO0FBQ0EsYUFBS04sVUFBTCxDQUFnQmUsVUFBaEIsQ0FBNEIsQ0FBNUIsRUFBZ0NDLElBQWhDO0FBQ0EsYUFBS2xCLGVBQUwsR0FBdUIsSUFBdkI7QUFDQSxhQUFLQyxhQUFMLEdBQXFCLEtBQUtDLFVBQUwsQ0FBZ0JrQixNQUFoQixFQUFyQjtBQUNILE9BM0NPO0FBNkNSSSxlQTdDUSx1QkE2Q0k7QUFDVmpCLGdCQUFRQyxHQUFSLENBQVksWUFBWjtBQUNELE9BL0NPO0FBaUROaUIsZUFqRE0scUJBaURJQyxDQWpESixFQWlETzs7QUFFWG5CLGdCQUFRQyxHQUFSLENBQVksY0FBY2tCLEVBQUVDLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCQyxLQUFsRDtBQUNFLFlBQUlBLFFBQVFILEVBQUVDLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCQyxLQUFwQztBQUNBLFlBQUlBLFNBQVMsQ0FBYixFQUFnQjtBQUNkdEIsa0JBQVFDLEdBQVIsQ0FBWSxPQUFaO0FBQ0UsZUFBS0osWUFBTCxDQUFrQjBCLElBQWxCLENBQXVCLENBQXZCO0FBQ0gsU0FIRCxNQUdPLElBQUlELFNBQVMsQ0FBYixFQUFnQjtBQUNyQnRCLGtCQUFRQyxHQUFSLENBQVksT0FBWjtBQUNFLGVBQUtKLFlBQUwsQ0FBa0IwQixJQUFsQixDQUF1QixDQUF2QjtBQUNIO0FBQ0o7QUE1REssSzs7Ozs7NkJBK0REO0FBQ1B2QixjQUFRQyxHQUFSLENBQVksbUJBQVo7O0FBRUE7QUFDQSxXQUFLTixVQUFMLEdBQWtCUSxHQUFHcUIsZUFBSCxDQUFtQjtBQUNuQ0Msa0JBQVVuQyxHQUR5QjtBQUVuQ29DLHdCQUFnQixRQUZtQjtBQUduQ0MsZUFBTztBQUg0QixPQUFuQixDQUFsQjtBQUtEOzs7OEJBRVMsQ0FFVDs7OztFQXRGcUMsZUFBS0MsSTs7a0JBQXZCckMsUyIsImZpbGUiOiJFZGl0RGlhcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuICBjb25zdCAgZHVyID0gMjAwO1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCAgY2xhc3MgRWRpdERpYXJ5IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBzaG93TW9kYWxTdGF0dXM6ZmFsc2UsXHJcbiAgICAgIGFuaW1hdGlvbkRhdGE6bnVsbCxcclxuICAgICAgbWFuaW1hdGlvbjpudWxsLFxyXG4gICAgICB2aWV3Qm90dG9tOm51bGwsXHJcbiAgICAgICAgaW5wdXRWaWV3QXJyOltdXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuXHJcbiAgICAgIGhpZGVEcmF3ZXIoKSB7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCfpmpDol49ib3R0b21fZHJhd2VyJylcclxuXHJcbiAgICAgICAgICB2YXIgcXVlcnkgPSB3eC5jcmVhdGVTZWxlY3RvclF1ZXJ5KCk7Ly/pgInmi6lpZFxyXG4gICAgICAgICAgcXVlcnkuc2VsZWN0KCcjbWpsdGVzdCcpLmJvdW5kaW5nQ2xpZW50UmVjdCgpXHJcbiAgICAgICAgICBxdWVyeS5leGVjKGZ1bmN0aW9uIChyZXMpIHtcclxuXHJcbiAgICAgICAgICAgIC8vcmVz5bCx5pivIOaJgOacieagh+etvuS4um1qbHRlc3TnmoTlhYPntKDnmoTkv6Hmga8g55qE5pWw57uEXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcblxyXG4gICAgICAgICAgICAvL+WPlumrmOW6plxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNbMF0uaGVpZ2h0KTtcclxuXHJcblxyXG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gcmVzWzBdLmhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubWFuaW1hdGlvbi50cmFuc2xhdGVZKChoZWlnaHQpKS5zdGVwKClcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoey8v5LiN5piv5pys57G76LCD55So55qE5pa55rOV77yM5bCG5LiN6IO955u05o6l5L2/55SodGhpcy5zaG93TW9kYWxTdGF0dXMgPSBmYWxzZVxyXG4gICAgICAgICAgICAgIHNob3dNb2RhbFN0YXR1czogdHJ1ZSxcclxuICAgICAgICAgICAgICAvLyDlr7zlh7rliqjnlLvmlbDmja7liLBhbmltYXRpb25EYXRhXHJcbiAgICAgICAgICAgICAgYW5pbWF0aW9uRGF0YTogdGhpcy5tYW5pbWF0aW9uLmV4cG9ydCgpXHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6ZqQ6JePYm90dG9tX2RyYXdlcuiuoeaXtuWZqOWIsOacnycpXHJcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7Ly/kuI3mmK/mnKznsbvosIPnlKjnmoTmlrnms5XvvIzlsIbkuI3og73nm7TmjqXkvb/nlKh0aGlzLnNob3dNb2RhbFN0YXR1cyA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICBzaG93TW9kYWxTdGF0dXM6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLGR1cilcclxuXHJcbiAgICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBzaG93RHJhd2VyKCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ+aYvuekumJvdHRvbV9kcmF3ZXInKVxyXG4gICAgICAgICAgdGhpcy5tYW5pbWF0aW9uLnRyYW5zbGF0ZVkoKDApKS5zdGVwKClcclxuICAgICAgICAgIHRoaXMuc2hvd01vZGFsU3RhdHVzID0gdHJ1ZVxyXG4gICAgICAgICAgdGhpcy5hbmltYXRpb25EYXRhID0gdGhpcy5tYW5pbWF0aW9uLmV4cG9ydCgpXHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBkb05vdGhpbmcoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2RvIG5vdGhpbmcnKVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgICBpdGVtQ2xpY2soZSkge1xyXG5cclxuICAgICAgICAgIGNvbnNvbGUubG9nKCfngrnlh7vnmoTkuIvmoIc9PT4gJyArIGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4KVxyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleFxyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT0gMCkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfngrnlh7vkuobmloflrZcnKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdBcnIucHVzaCgwKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+eCueWHu+S6huWbvueJhycpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0Vmlld0Fyci5wdXNoKDEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnRWRpdERpYXJ5IG9uIGxvYWQnKVxyXG5cclxuICAgICAgLy8g5Yib5bu65Yqo55S75a+56LGhXHJcbiAgICAgIHRoaXMubWFuaW1hdGlvbiA9IHd4LmNyZWF0ZUFuaW1hdGlvbih7XHJcbiAgICAgICAgZHVyYXRpb246IGR1cixcclxuICAgICAgICB0aW1pbmdGdW5jdGlvbjogXCJsaW5lYXJcIixcclxuICAgICAgICBkZWxheTogMFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIG9uUmVhZHkoKSB7XHJcblxyXG4gICAgfVxyXG4gIH1cclxuIl19