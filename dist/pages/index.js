'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _list = require('./../components/list.js');

var _list2 = _interopRequireDefault(_list);

var _panel = require('./../components/panel.js');

var _panel2 = _interopRequireDefault(_panel);

var _counter = require('./../components/counter.js');

var _counter2 = _interopRequireDefault(_counter);

var _group = require('./../components/group.js');

var _group2 = _interopRequireDefault(_group);

var _wepyComToast = require('./../npm/wepy-com-toast/toast.js');

var _wepyComToast2 = _interopRequireDefault(_wepyComToast);

var _test = require('./../mixins/test.js');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // alias example
// alias example


var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {
      var self = this;
      this.$parent.getUserInfo(function (userInfo) {
        if (userInfo) {
          self.userInfo = userInfo;
        }
        self.normalTitle = '标题已被修改';

        self.setTimeoutTitle = '标题三秒后会被修改';
        setTimeout(function () {
          self.setTimeoutTitle = '到三秒了';
          self.$apply();
        }, 3000);

        self.$apply();
      });
    }
  }]);

  return Index;
}(_wepy2.default.page);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.config = {};
  this.$repeat = { "groupList": { "com": "group", "props": "grouplist" } };
  this.$props = { "group": { "v-bind:grouplist.once": { "value": "item", "type": "item", "for": "groupList", "item": "item", "index": "index", "key": "key" }, "v-bind:indexa.once": { "value": "index", "type": "index", "for": "groupList", "item": "item", "index": "index", "key": "key" } }, "counter1": { "xmlns:v-on": "" }, "counter2": { "xmlns:v-bind": "", "v-bind:num.sync": "mynum" } };
  this.$events = { "counter1": { "v-on:index-emit": "counterEmit" } };
  this.components = {
    panel: _panel2.default,
    counter1: _counter2.default,
    counter2: _counter2.default,
    list: _list2.default,
    group: _group2.default,
    toast: _wepyComToast2.default
  };
  this.mixins = [_test2.default];
  this.data = {
    mynum: 20,
    userInfo: {
      nickName: '加载中...'
    },
    normalTitle: '原始标题',
    setTimeoutTitle: '标题三秒后会被修改',
    count: 0,
    netrst: '',
    groupList: [{
      id: 1,
      name: '点击改变',
      list: [{
        childid: '1.1',
        childname: '子项，点我改变'
      }, {
        childid: '1.2',
        childname: '子项，点我改变'
      }, {
        childid: '1.3',
        childname: '子项，点我改变'
      }]
    }, {
      id: 2,
      name: '点击改变',
      list: [{
        childid: '2.1',
        childname: '子项，点我改变'
      }, {
        childid: '2.2',
        childname: '子项，点我改变'
      }, {
        childid: '2.3',
        childname: '子项，点我改变'
      }]
    }, {
      id: 3,
      name: '点击改变',
      list: [{
        childid: '3.1',
        childname: '子项，点我改变'
      }]
    }]
  };
  this.computed = {
    now: function now() {
      return +new Date();
    }
  };
  this.methods = {
    plus: function plus() {
      this.mynum++;
    },
    toast: function toast() {
      var promise = this.$invoke('toast', 'show', {
        title: '自定义标题',
        img: 'https://raw.githubusercontent.com/kiinlam/wetoast/master/images/star.png'
      });

      promise.then(function (d) {
        console.log('toast done');
      });
    },
    tap: function tap() {
      console.log('do noting from ' + this.$name);
    },
    communicate: function communicate() {
      console.log(this.$name + ' tap');

      this.$invoke('counter2', 'minus', 45, 6);
      this.$invoke('counter1', 'plus', 45, 6);

      this.$broadcast('index-broadcast', 1, 3, 4);
    },
    request: function request() {
      var self = this;
      var i = 10;
      var map = ['MA==', 'MQo=', 'Mg==', 'Mw==', 'NA==', 'NQ==', 'Ng==', 'Nw==', 'OA==', 'OQ=='];
      while (i--) {
        _wepy2.default.request({
          url: 'https://www.madcoder.cn/tests/sleep.php?time=1&t=css&c=' + map[i] + '&i=' + i,
          success: function success(d) {
            self.netrst += d.data + '.';
            self.$apply();
          }
        });
      }
    },
    counterEmit: function counterEmit() {
      var _ref2;

      var $event = (_ref2 = arguments.length - 1, arguments.length <= _ref2 ? undefined : arguments[_ref2]);
      console.log(this.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    }
  };
  this.events = {
    'index-emit': function indexEmit() {
      var _ref3;

      var $event = (_ref3 = arguments.length - 1, arguments.length <= _ref3 ? undefined : arguments[_ref3]);
      console.log(_this2.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    }
  };
};


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4Iiwic2VsZiIsIiRwYXJlbnQiLCJnZXRVc2VySW5mbyIsInVzZXJJbmZvIiwibm9ybWFsVGl0bGUiLCJzZXRUaW1lb3V0VGl0bGUiLCJzZXRUaW1lb3V0IiwiJGFwcGx5IiwicGFnZSIsImNvbmZpZyIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsInBhbmVsIiwiY291bnRlcjEiLCJjb3VudGVyMiIsImxpc3QiLCJncm91cCIsInRvYXN0IiwibWl4aW5zIiwiZGF0YSIsIm15bnVtIiwibmlja05hbWUiLCJjb3VudCIsIm5ldHJzdCIsImdyb3VwTGlzdCIsImlkIiwibmFtZSIsImNoaWxkaWQiLCJjaGlsZG5hbWUiLCJjb21wdXRlZCIsIm5vdyIsIkRhdGUiLCJtZXRob2RzIiwicGx1cyIsInByb21pc2UiLCIkaW52b2tlIiwidGl0bGUiLCJpbWciLCJ0aGVuIiwiZCIsImNvbnNvbGUiLCJsb2ciLCJ0YXAiLCIkbmFtZSIsImNvbW11bmljYXRlIiwiJGJyb2FkY2FzdCIsInJlcXVlc3QiLCJpIiwibWFwIiwidXJsIiwic3VjY2VzcyIsImNvdW50ZXJFbWl0IiwiJGV2ZW50IiwibGVuZ3RoIiwic291cmNlIiwiZXZlbnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OzsrZUFKdUM7QUFDVDs7O0lBS1RBLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBa0lWO0FBQ1AsVUFBSUMsT0FBTyxJQUFYO0FBQ0EsV0FBS0MsT0FBTCxDQUFhQyxXQUFiLENBQXlCLFVBQVVDLFFBQVYsRUFBb0I7QUFDM0MsWUFBSUEsUUFBSixFQUFjO0FBQ1pILGVBQUtHLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0Q7QUFDREgsYUFBS0ksV0FBTCxHQUFtQixRQUFuQjs7QUFFQUosYUFBS0ssZUFBTCxHQUF1QixX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TUFBTCxHQUFjLENBQTVCLDJEQUFKO0FBQ0FiLGNBQVFDLEdBQVIsQ0FBZSxPQUFLRSxLQUFwQixpQkFBcUNTLE9BQU8xQixJQUE1QyxjQUF5RDBCLE9BQU9FLE1BQVAsQ0FBY1gsS0FBdkU7QUFDRDtBQUpNLEc7OztrQkEzSFU5QyxLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCBMaXN0IGZyb20gJy4uL2NvbXBvbmVudHMvbGlzdCdcbiAgaW1wb3J0IFBhbmVsIGZyb20gJ0AvY29tcG9uZW50cy9wYW5lbCcgLy8gYWxpYXMgZXhhbXBsZVxuICBpbXBvcnQgQ291bnRlciBmcm9tICdjb3VudGVyJyAvLyBhbGlhcyBleGFtcGxlXG4gIGltcG9ydCBHcm91cCBmcm9tICcuLi9jb21wb25lbnRzL2dyb3VwJ1xuICBpbXBvcnQgVG9hc3QgZnJvbSAnd2VweS1jb20tdG9hc3QnXG4gIGltcG9ydCB0ZXN0TWl4aW4gZnJvbSAnLi4vbWl4aW5zL3Rlc3QnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICB9XG4gICAkcmVwZWF0ID0ge1wiZ3JvdXBMaXN0XCI6e1wiY29tXCI6XCJncm91cFwiLFwicHJvcHNcIjpcImdyb3VwbGlzdFwifX07XHJcbiRwcm9wcyA9IHtcImdyb3VwXCI6e1widi1iaW5kOmdyb3VwbGlzdC5vbmNlXCI6e1widmFsdWVcIjpcIml0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwiZ3JvdXBMaXN0XCIsXCJpdGVtXCI6XCJpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9LFwidi1iaW5kOmluZGV4YS5vbmNlXCI6e1widmFsdWVcIjpcImluZGV4XCIsXCJ0eXBlXCI6XCJpbmRleFwiLFwiZm9yXCI6XCJncm91cExpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19LFwiY291bnRlcjFcIjp7XCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJjb3VudGVyMlwiOntcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6bnVtLnN5bmNcIjpcIm15bnVtXCJ9fTtcclxuJGV2ZW50cyA9IHtcImNvdW50ZXIxXCI6e1widi1vbjppbmRleC1lbWl0XCI6XCJjb3VudGVyRW1pdFwifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgcGFuZWw6IFBhbmVsLFxuICAgICAgY291bnRlcjE6IENvdW50ZXIsXG4gICAgICBjb3VudGVyMjogQ291bnRlcixcbiAgICAgIGxpc3Q6IExpc3QsXG4gICAgICBncm91cDogR3JvdXAsXG4gICAgICB0b2FzdDogVG9hc3RcbiAgICB9XG5cbiAgICBtaXhpbnMgPSBbdGVzdE1peGluXVxuXG4gICAgZGF0YSA9IHtcbiAgICAgIG15bnVtOiAyMCxcbiAgICAgIHVzZXJJbmZvOiB7XG4gICAgICAgIG5pY2tOYW1lOiAn5Yqg6L295LitLi4uJ1xuICAgICAgfSxcbiAgICAgIG5vcm1hbFRpdGxlOiAn5Y6f5aeL5qCH6aKYJyxcbiAgICAgIHNldFRpbWVvdXRUaXRsZTogJ+agh+mimOS4ieenkuWQjuS8muiiq+S/ruaUuScsXG4gICAgICBjb3VudDogMCxcbiAgICAgIG5ldHJzdDogJycsXG4gICAgICBncm91cExpc3Q6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgIG5hbWU6ICfngrnlh7vmlLnlj5gnLFxuICAgICAgICAgIGxpc3Q6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY2hpbGRpZDogJzEuMScsXG4gICAgICAgICAgICAgIGNoaWxkbmFtZTogJ+WtkOmhue+8jOeCueaIkeaUueWPmCdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgY2hpbGRpZDogJzEuMicsXG4gICAgICAgICAgICAgIGNoaWxkbmFtZTogJ+WtkOmhue+8jOeCueaIkeaUueWPmCdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgY2hpbGRpZDogJzEuMycsXG4gICAgICAgICAgICAgIGNoaWxkbmFtZTogJ+WtkOmhue+8jOeCueaIkeaUueWPmCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogMixcbiAgICAgICAgICBuYW1lOiAn54K55Ye75pS55Y+YJyxcbiAgICAgICAgICBsaXN0OiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNoaWxkaWQ6ICcyLjEnLFxuICAgICAgICAgICAgICBjaGlsZG5hbWU6ICflrZDpobnvvIzngrnmiJHmlLnlj5gnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIGNoaWxkaWQ6ICcyLjInLFxuICAgICAgICAgICAgICBjaGlsZG5hbWU6ICflrZDpobnvvIzngrnmiJHmlLnlj5gnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIGNoaWxkaWQ6ICcyLjMnLFxuICAgICAgICAgICAgICBjaGlsZG5hbWU6ICflrZDpobnvvIzngrnmiJHmlLnlj5gnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWQ6IDMsXG4gICAgICAgICAgbmFtZTogJ+eCueWHu+aUueWPmCcsXG4gICAgICAgICAgbGlzdDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjaGlsZGlkOiAnMy4xJyxcbiAgICAgICAgICAgICAgY2hpbGRuYW1lOiAn5a2Q6aG577yM54K55oiR5pS55Y+YJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgbm93ICgpIHtcbiAgICAgICAgcmV0dXJuICtuZXcgRGF0ZSgpXG4gICAgICB9XG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHBsdXMgKCkge1xuICAgICAgICB0aGlzLm15bnVtKytcbiAgICAgIH0sXG4gICAgICB0b2FzdCAoKSB7XG4gICAgICAgIGxldCBwcm9taXNlID0gdGhpcy4kaW52b2tlKCd0b2FzdCcsICdzaG93Jywge1xuICAgICAgICAgIHRpdGxlOiAn6Ieq5a6a5LmJ5qCH6aKYJyxcbiAgICAgICAgICBpbWc6ICdodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20va2lpbmxhbS93ZXRvYXN0L21hc3Rlci9pbWFnZXMvc3Rhci5wbmcnXG4gICAgICAgIH0pXG5cbiAgICAgICAgcHJvbWlzZS50aGVuKChkKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ3RvYXN0IGRvbmUnKVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHRhcCAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkbyBub3RpbmcgZnJvbSAnICsgdGhpcy4kbmFtZSlcbiAgICAgIH0sXG4gICAgICBjb21tdW5pY2F0ZSAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuJG5hbWUgKyAnIHRhcCcpXG5cbiAgICAgICAgdGhpcy4kaW52b2tlKCdjb3VudGVyMicsICdtaW51cycsIDQ1LCA2KVxuICAgICAgICB0aGlzLiRpbnZva2UoJ2NvdW50ZXIxJywgJ3BsdXMnLCA0NSwgNilcblxuICAgICAgICB0aGlzLiRicm9hZGNhc3QoJ2luZGV4LWJyb2FkY2FzdCcsIDEsIDMsIDQpXG4gICAgICB9LFxuICAgICAgcmVxdWVzdCAoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpc1xuICAgICAgICBsZXQgaSA9IDEwXG4gICAgICAgIGxldCBtYXAgPSBbJ01BPT0nLCAnTVFvPScsICdNZz09JywgJ013PT0nLCAnTkE9PScsICdOUT09JywgJ05nPT0nLCAnTnc9PScsICdPQT09JywgJ09RPT0nXVxuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgd2VweS5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybDogJ2h0dHBzOi8vd3d3Lm1hZGNvZGVyLmNuL3Rlc3RzL3NsZWVwLnBocD90aW1lPTEmdD1jc3MmYz0nICsgbWFwW2ldICsgJyZpPScgKyBpLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgc2VsZi5uZXRyc3QgKz0gZC5kYXRhICsgJy4nXG4gICAgICAgICAgICAgIHNlbGYuJGFwcGx5KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY291bnRlckVtaXQgKC4uLmFyZ3MpIHtcbiAgICAgICAgbGV0ICRldmVudCA9IGFyZ3NbYXJncy5sZW5ndGggLSAxXVxuICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLiRuYW1lfSByZWNlaXZlICR7JGV2ZW50Lm5hbWV9IGZyb20gJHskZXZlbnQuc291cmNlLiRuYW1lfWApXG4gICAgICB9XG4gICAgfVxuXG4gICAgZXZlbnRzID0ge1xuICAgICAgJ2luZGV4LWVtaXQnOiAoLi4uYXJncykgPT4ge1xuICAgICAgICBsZXQgJGV2ZW50ID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdXG4gICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuJG5hbWV9IHJlY2VpdmUgJHskZXZlbnQubmFtZX0gZnJvbSAkeyRldmVudC5zb3VyY2UuJG5hbWV9YClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICBsZXQgc2VsZiA9IHRoaXNcbiAgICAgIHRoaXMuJHBhcmVudC5nZXRVc2VySW5mbyhmdW5jdGlvbiAodXNlckluZm8pIHtcbiAgICAgICAgaWYgKHVzZXJJbmZvKSB7XG4gICAgICAgICAgc2VsZi51c2VySW5mbyA9IHVzZXJJbmZvXG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5ub3JtYWxUaXRsZSA9ICfmoIfpopjlt7Looqvkv67mlLknXG5cbiAgICAgICAgc2VsZi5zZXRUaW1lb3V0VGl0bGUgPSAn5qCH6aKY5LiJ56eS5ZCO5Lya6KKr5L+u5pS5J1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBzZWxmLnNldFRpbWVvdXRUaXRsZSA9ICfliLDkuInnp5LkuoYnXG4gICAgICAgICAgc2VsZi4kYXBwbHkoKVxuICAgICAgICB9LCAzMDAwKVxuXG4gICAgICAgIHNlbGYuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICB9XG4iXX0=