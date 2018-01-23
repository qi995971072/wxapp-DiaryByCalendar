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
            inputViewArr: [{ type: 'text', content: null }, { type: 'add', content: null }],
            insertIndex: Number
        }, _this.methods = {

            showDrawer: function showDrawer() {
                this.insertIndex = this.inputViewArr.length - 1;
                this.__showDrawer();
            },

            hideDrawer: function hideDrawer() {
                this.__hideDrawer();
            },
            doNothing: function doNothing() {
                console.log('do nothing');
            },
            itemClick: function itemClick(e) {
                console.log('点击的类型==> ' + e.currentTarget.dataset.type);
                var type = e.currentTarget.dataset.type;
                this.__insertObjToInputVierArr(this.insertIndex, type);
            },
            clickInsert: function clickInsert(index) {
                console.log('插入==> ' + index);
                this.insertIndex = index + 1;
                this.__showDrawer();
            },
            clickDelete: function clickDelete(index) {
                console.log('删除==> ' + index);
                this.__deleteObjFromInputViewArr(index);
            },
            textareaDone: function textareaDone(e) {
                console.log(e);
                console.log('输入的文字=> ' + e.detail.value + '下标==> ' + e.currentTarget.dataset.index);
                this.inputViewArr[e.currentTarget.dataset.index].content = e.detail.value;
                console.log(this.inputViewArr);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(EditDiary, [{
        key: 'onUnload',
        value: function onUnload() {
            console.log('页面被卸载');
            var arr = getCurrentPages();
            console.log(arr);
            arr[0].setSelectDateDiary(this.inputViewArr);
        }
    }, {
        key: '__insertObjToInputVierArr',
        value: function __insertObjToInputVierArr(index, type) {
            if (type == 0) {
                var obj = {
                    type: 'text',
                    content: null
                };
                this.inputViewArr.splice(index, 0, obj);
            } else if (type == 1) {

                var that = this;
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function success(res) {
                        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                        var tempFilePaths = res.tempFilePaths;
                        // console.log(tempFilePaths)
                        var obj = {
                            type: 'image',
                            content: tempFilePaths[0]
                        };
                        that.inputViewArr.splice(index, 0, obj);
                        that.$apply();
                    }
                });
            }

            this.__hideDrawer();
        }
    }, {
        key: '__deleteObjFromInputViewArr',
        value: function __deleteObjFromInputViewArr(index) {
            this.inputViewArr.splice(index, 1);
        }
    }, {
        key: '__showDrawer',
        value: function __showDrawer() {
            console.log('显示bottom_drawer');

            this.showModalStatus = true;
            setTimeout(function () {

                var animation = wx.createAnimation({
                    duration: dur,
                    timingFunction: "linear",
                    delay: 0
                });

                animation.translateY(0).step();
                this.showModalStatus = true;
                this.animationData = animation.export();
                this.$apply();
            }.bind(this), 30);
        }
    }, {
        key: '__hideDrawer',
        value: function __hideDrawer() {
            var t = this;
            console.log('隐藏bottom_drawer');
            var query = wx.createSelectorQuery();
            query.select('#mjltest').boundingClientRect();
            query.exec(function (res) {
                var height = res[0].height;
                var animation = wx.createAnimation({
                    duration: dur,
                    timingFunction: "linear",
                    delay: 0
                });

                animation.translateY(height).step();

                t.animationData = animation.export();
                t.$apply();

                setTimeout(function () {
                    t.showModalStatus = false;
                    t.animationData = null;
                    t.$apply();

                    console.log('隐藏bottom_drawer计时器到期=> ' + t.showModalStatus);
                }, dur);
            });
        }
    }]);

    return EditDiary;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(EditDiary , 'pages/EditDiary'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkVkaXREaWFyeS5qcyJdLCJuYW1lcyI6WyJkdXIiLCJFZGl0RGlhcnkiLCJkYXRhIiwic2hvd01vZGFsU3RhdHVzIiwiYW5pbWF0aW9uRGF0YSIsImlucHV0Vmlld0FyciIsInR5cGUiLCJjb250ZW50IiwiaW5zZXJ0SW5kZXgiLCJOdW1iZXIiLCJtZXRob2RzIiwic2hvd0RyYXdlciIsImxlbmd0aCIsIl9fc2hvd0RyYXdlciIsImhpZGVEcmF3ZXIiLCJfX2hpZGVEcmF3ZXIiLCJkb05vdGhpbmciLCJjb25zb2xlIiwibG9nIiwiaXRlbUNsaWNrIiwiZSIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiX19pbnNlcnRPYmpUb0lucHV0VmllckFyciIsImNsaWNrSW5zZXJ0IiwiaW5kZXgiLCJjbGlja0RlbGV0ZSIsIl9fZGVsZXRlT2JqRnJvbUlucHV0Vmlld0FyciIsInRleHRhcmVhRG9uZSIsImRldGFpbCIsInZhbHVlIiwiYXJyIiwiZ2V0Q3VycmVudFBhZ2VzIiwic2V0U2VsZWN0RGF0ZURpYXJ5Iiwib2JqIiwic3BsaWNlIiwidGhhdCIsInd4IiwiY2hvb3NlSW1hZ2UiLCJjb3VudCIsInNpemVUeXBlIiwic291cmNlVHlwZSIsInN1Y2Nlc3MiLCJyZXMiLCJ0ZW1wRmlsZVBhdGhzIiwiJGFwcGx5Iiwic2V0VGltZW91dCIsImFuaW1hdGlvbiIsImNyZWF0ZUFuaW1hdGlvbiIsImR1cmF0aW9uIiwidGltaW5nRnVuY3Rpb24iLCJkZWxheSIsInRyYW5zbGF0ZVkiLCJzdGVwIiwiZXhwb3J0IiwiYmluZCIsInQiLCJxdWVyeSIsImNyZWF0ZVNlbGVjdG9yUXVlcnkiLCJzZWxlY3QiLCJib3VuZGluZ0NsaWVudFJlY3QiLCJleGVjIiwiaGVpZ2h0IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztBQUVBLElBQU9BLE1BQU0sR0FBYjs7SUFFcUJDLFM7Ozs7Ozs7Ozs7Ozs7O2dNQUVuQkMsSSxHQUFPO0FBQ0hDLDZC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QUcvQkMsMkJBQU87QUFId0IsaUJBQW5CLENBQWhCOztBQU1BSiwwQkFBVUssVUFBVixDQUFzQlUsTUFBdEIsRUFBK0JULElBQS9COztBQUVBRyxrQkFBRXBELGFBQUYsR0FBaUIyQyxVQUFVTyxNQUFWLEVBQWpCO0FBQ0FFLGtCQUFFWCxNQUFGOztBQUVBQywyQkFBVyxZQUFZO0FBQ25CVSxzQkFBRXJELGVBQUYsR0FBbUIsS0FBbkI7QUFDQXFELHNCQUFFcEQsYUFBRixHQUFpQixJQUFqQjtBQUNBb0Qsc0JBQUVYLE1BQUY7O0FBRUE1Qiw0QkFBUUMsR0FBUixDQUFZLDRCQUE0QnNDLEVBQUVyRCxlQUExQztBQUNILGlCQU5ELEVBTUVILEdBTkY7QUFPSCxhQXBCRDtBQXFCSDs7OztFQS9Jb0MsZUFBSytELEk7O2tCQUF2QjlELFMiLCJmaWxlIjoiRWRpdERpYXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgY29uc3QgIGR1ciA9IDIwMDtcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0RGlhcnkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuXG4gICAgZGF0YSA9IHtcbiAgICAgICAgc2hvd01vZGFsU3RhdHVzOiBmYWxzZSxcbiAgICAgICAgYW5pbWF0aW9uRGF0YTogbnVsbCxcbiAgICAgICAgaW5wdXRWaWV3QXJyOiBbXG4gICAgICAgICAgICB7dHlwZTondGV4dCcsIGNvbnRlbnQ6bnVsbH0sXG4gICAgICAgICAgICB7dHlwZTonYWRkJywgY29udGVudDpudWxsfVxuICAgICAgICBdLFxuICAgICAgICBpbnNlcnRJbmRleDogTnVtYmVyXG4gICAgfVxuXG4gICAgICBvblVubG9hZCgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygn6aG16Z2i6KKr5Y246L29JylcbiAgICAgICAgICBsZXQgYXJyID0gZ2V0Q3VycmVudFBhZ2VzKClcbiAgICAgICAgICBjb25zb2xlLmxvZyhhcnIpXG4gICAgICAgICAgYXJyWzBdLnNldFNlbGVjdERhdGVEaWFyeSh0aGlzLmlucHV0Vmlld0FycilcbiAgICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG5cbiAgICAgICAgc2hvd0RyYXdlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pbnNlcnRJbmRleCA9IHRoaXMuaW5wdXRWaWV3QXJyLmxlbmd0aCAtIDFcbiAgICAgICAgICAgIHRoaXMuX19zaG93RHJhd2VyKClcbiAgICAgICAgfSxcblxuXG4gICAgICAgIGhpZGVEcmF3ZXIoKSB7XG4gICAgICAgICAgICB0aGlzLl9faGlkZURyYXdlcigpXG4gICAgICAgIH0sXG5cblxuXG4gICAgICAgIGRvTm90aGluZygpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkbyBub3RoaW5nJylcbiAgICAgICAgfSxcblxuICAgICAgICBpdGVtQ2xpY2soZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+eCueWHu+eahOexu+Weiz09PiAnICsgZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudHlwZSlcbiAgICAgICAgICAgIGxldCB0eXBlID0gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudHlwZVxuICAgICAgICAgICAgdGhpcy5fX2luc2VydE9ialRvSW5wdXRWaWVyQXJyKHRoaXMuaW5zZXJ0SW5kZXgsIHR5cGUpXG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xpY2tJbnNlcnQoaW5kZXgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmj5LlhaU9PT4gJyArIGluZGV4KVxuICAgICAgICAgICAgdGhpcy5pbnNlcnRJbmRleCA9IGluZGV4ICsgMVxuICAgICAgICAgICAgdGhpcy5fX3Nob3dEcmF3ZXIoKVxuICAgICAgICB9LFxuXG4gICAgICAgIGNsaWNrRGVsZXRlKGluZGV4KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5Yig6ZmkPT0+ICcgKyBpbmRleClcbiAgICAgICAgICAgIHRoaXMuX19kZWxldGVPYmpGcm9tSW5wdXRWaWV3QXJyKGluZGV4KVxuICAgICAgICB9LFxuXG4gICAgICAgIHRleHRhcmVhRG9uZShlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+i+k+WFpeeahOaWh+Wtlz0+ICcgKyBlLmRldGFpbC52YWx1ZSArICfkuIvmoIc9PT4gJyArIGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4KVxuICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdBcnJbZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhdLmNvbnRlbnQgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5pbnB1dFZpZXdBcnIpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfX2luc2VydE9ialRvSW5wdXRWaWVyQXJyKGluZGV4LCB0eXBlKSB7XG4gICAgICAgIGlmICh0eXBlID09IDApIHtcbiAgICAgICAgICAgIGxldCBvYmogPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IG51bGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW5wdXRWaWV3QXJyLnNwbGljZShpbmRleCwgMCwgb2JqKVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gMSkge1xuXG4gICAgICAgICAgICBsZXQgdGhhdCA9IHRoaXNcbiAgICAgICAgICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgICAgICAgICAgICBjb3VudDogMSwgLy8g6buY6K6kOVxuICAgICAgICAgICAgICAgIHNpemVUeXBlOiBbJ29yaWdpbmFsJ10sIC8vIOWPr+S7peaMh+WumuaYr+WOn+Wbvui/mOaYr+WOi+e8qeWbvu+8jOm7mOiupOS6jOiAhemDveaciVxuICAgICAgICAgICAgICAgIHNvdXJjZVR5cGU6IFsnYWxidW0nXSwgLy8g5Y+v5Lul5oyH5a6a5p2l5rqQ5piv55u45YaM6L+Y5piv55u45py677yM6buY6K6k5LqM6ICF6YO95pyJXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAvLyDov5Tlm57pgInlrprnhafniYfnmoTmnKzlnLDmlofku7bot6/lvoTliJfooajvvIx0ZW1wRmlsZVBhdGjlj6/ku6XkvZzkuLppbWfmoIfnrb7nmoRzcmPlsZ7mgKfmmL7npLrlm77niYdcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRlbXBGaWxlUGF0aHMgPSByZXMudGVtcEZpbGVQYXRoc1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZW1wRmlsZVBhdGhzKVxuICAgICAgICAgICAgICAgICAgICBsZXQgb2JqID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2ltYWdlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRlbXBGaWxlUGF0aHNbMF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGF0LmlucHV0Vmlld0Fyci5zcGxpY2UoaW5kZXgsIDAsIG9iailcbiAgICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9faGlkZURyYXdlcigpXG4gICAgfVxuXG4gICAgX19kZWxldGVPYmpGcm9tSW5wdXRWaWV3QXJyKGluZGV4KSB7XG4gICAgICAgIHRoaXMuaW5wdXRWaWV3QXJyLnNwbGljZShpbmRleCwxKTtcbiAgICB9XG5cbiAgICBfX3Nob3dEcmF3ZXIoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfmmL7npLpib3R0b21fZHJhd2VyJylcblxuICAgICAgICB0aGlzLnNob3dNb2RhbFN0YXR1cz0gdHJ1ZVxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIGxldCBhbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oe1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXIsXG4gICAgICAgICAgICAgICAgdGltaW5nRnVuY3Rpb246IFwibGluZWFyXCIsXG4gICAgICAgICAgICAgICAgZGVsYXk6IDBcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGFuaW1hdGlvbi50cmFuc2xhdGVZKDApLnN0ZXAoKVxuICAgICAgICAgICAgdGhpcy5zaG93TW9kYWxTdGF0dXM9IHRydWVcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uRGF0YT0gYW5pbWF0aW9uLmV4cG9ydCgpXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG5cbiAgICAgICAgfS5iaW5kKHRoaXMpLDMwKVxuICAgIH1cblxuICAgIF9faGlkZURyYXdlcigpIHtcbiAgICAgICAgbGV0IHQgPSB0aGlzXG4gICAgICAgIGNvbnNvbGUubG9nKCfpmpDol49ib3R0b21fZHJhd2VyJylcbiAgICAgICAgdmFyIHF1ZXJ5ID0gd3guY3JlYXRlU2VsZWN0b3JRdWVyeSgpO1xuICAgICAgICBxdWVyeS5zZWxlY3QoJyNtamx0ZXN0JykuYm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgcXVlcnkuZXhlYyhmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBsZXQgaGVpZ2h0ID0gcmVzWzBdLmhlaWdodDtcbiAgICAgICAgICAgIGxldCBhbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oe1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXIsXG4gICAgICAgICAgICAgICAgdGltaW5nRnVuY3Rpb246IFwibGluZWFyXCIsXG4gICAgICAgICAgICAgICAgZGVsYXk6IDBcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGFuaW1hdGlvbi50cmFuc2xhdGVZKChoZWlnaHQpKS5zdGVwKClcblxuICAgICAgICAgICAgdC5hbmltYXRpb25EYXRhPSBhbmltYXRpb24uZXhwb3J0KClcbiAgICAgICAgICAgIHQuJGFwcGx5KClcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdC5zaG93TW9kYWxTdGF0dXM9IGZhbHNlXG4gICAgICAgICAgICAgICAgdC5hbmltYXRpb25EYXRhPSBudWxsXG4gICAgICAgICAgICAgICAgdC4kYXBwbHkoKVxuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+makOiXj2JvdHRvbV9kcmF3ZXLorqHml7blmajliLDmnJ89PiAnICsgdC5zaG93TW9kYWxTdGF0dXMpXG4gICAgICAgICAgICB9LGR1cilcbiAgICAgICAgfSlcbiAgICB9XG4gIH1cbiJdfQ==