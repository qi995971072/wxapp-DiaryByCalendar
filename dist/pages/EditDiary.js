'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


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
            inputViewArr: [0, 1, 0, 0, 2]
        }, _this.methods = {
            hideDrawer: function hideDrawer() {

                var t = this;

                console.log('隐藏bottom_drawer');
                var query = wx.createSelectorQuery(); //选择id
                query.select('#mjltest').boundingClientRect();
                query.exec(function (res) {

                    //res就是 所有标签为mjltest的元素的信息 的数组
                    //console.log(res);

                    //取高度
                    //console.log(res[0].height);


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

                        // t.setData({
                        //     showModalStatus: false,
                        //     animationData: null
                        // })


                        t.showModalStatus = false;
                        t.animationData = null;
                        t.$apply();

                        console.log('隐藏bottom_drawer计时器到期=> ' + t.showModalStatus);
                    }, dur);
                });
            },


            showDrawer: function showDrawer() {
                console.log('显示bottom_drawer');

                this.showModalStatus = true;
                // this.setData({
                //     showModalStatus: true
                // })

                setTimeout(function () {

                    var animation = wx.createAnimation({
                        duration: dur,
                        timingFunction: "linear",
                        delay: 0
                    });

                    animation.translateY(0).step();
                    // this.setData({
                    //     showModalStatus: true,
                    //     animationData: animation.export()
                    // })

                    this.showModalStatus = true;
                    this.animationData = animation.export();
                    this.$apply();
                }.bind(this), 30);
            },

            doNothing: function doNothing() {
                console.log('do nothing');
            },
            itemClick: function itemClick(e) {

                console.log('点击的下标==> ' + e.currentTarget.dataset.index);
                var index = e.currentTarget.dataset.index;
                if (index == 0) {
                    console.log('点击了文字');
                    var arr = this.data.inputViewArr;
                    arr.splice(arr.length - 1, 0, 0);
                    // this.setData({
                    //     inputViewArr: arr
                    // })
                    this.inputViewArr = arr;
                } else if (index == 1) {
                    console.log('点击了图片');
                    var _arr = this.data.inputViewArr;
                    _arr.splice(_arr.length - 1, 0, 1);
                    // this.setData({
                    //     inputViewArr: arr
                    // })
                    this.inputViewArr = _arr;
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return EditDiary;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(EditDiary , 'pages/EditDiary'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkVkaXREaWFyeS5qcyJdLCJuYW1lcyI6WyJkdXIiLCJFZGl0RGlhcnkiLCJkYXRhIiwic2hvd01vZGFsU3RhdHVzIiwiYW5pbWF0aW9uRGF0YSIsImlucHV0Vmlld0FyciIsIm1ldGhvZHMiLCJoaWRlRHJhd2VyIiwidCIsImNvbnNvbGUiLCJsb2ciLCJxdWVyeSIsInd4IiwiY3JlYXRlU2VsZWN0b3JRdWVyeSIsInNlbGVjdCIsImJvdW5kaW5nQ2xpZW50UmVjdCIsImV4ZWMiLCJyZXMiLCJoZWlnaHQiLCJhbmltYXRpb24iLCJjcmVhdGVBbmltYXRpb24iLCJkdXJhdGlvbiIsInRpbWluZ0Z1bmN0aW9uIiwiZGVsYXkiLCJ0cmFuc2xhdGVZIiwic3RlcCIsImV4cG9ydCIsIiRhcHBseSIsInNldFRpbWVvdXQiLCJzaG93RHJhd2VyIiwiYmluZCIsImRvTm90aGluZyIsIml0ZW1DbGljayIsImUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImluZGV4IiwiYXJyIiwic3BsaWNlIiwibGVuZ3RoIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFPQSxNQUFNLEdBQWI7O0lBRXFCQyxTOzs7Ozs7Ozs7Ozs7OztnTUFFbkJDLEksR0FBTztBQUNIQyw2QkFBaUIsS0FEZDtBQUVIQywyQkFBZSxJQUZaO0FBR0hDLDBCQUFjLENBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWI7QUFIWCxTLFFBTVBDLE8sR0FBVTtBQUNOQyxzQkFETSx3QkFDTzs7QUFFVCxvQkFBSUMsSUFBSSxJQUFSOztBQUdBQyx3QkFBUUMsR0FBUixDQUFZLGlCQUFaO0FBQ0Esb0JBQUlDLFFBQVFDLEdBQUdDLG1CQUFILEVBQVosQ0FOUyxDQU00QjtBQUNyQ0Ysc0JBQU1HLE1BQU4sQ0FBYSxVQUFiLEVBQXlCQyxrQkFBekI7QUFDQUosc0JBQU1LLElBQU4sQ0FBVyxVQUFVQyxHQUFWLEVBQWU7O0FBRXRCO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0Esd0JBQUlDLFNBQVNELElBQUksQ0FBSixFQUFPQyxNQUFwQjs7QUFFQSx3QkFBSUMsWUFBWVAsR0FBR1EsZUFBSCxDQUFtQjtBQUMvQkMsa0NBQVVyQixHQURxQjtBQUUvQnNCLHdDQUFnQixRQUZlO0FBRy9CQywrQkFBTztBQUh3QixxQkFBbkIsQ0FBaEI7O0FBTUFKLDhCQUFVSyxVQUFWLENBQXNCTixNQUF0QixFQUErQk8sSUFBL0I7O0FBRUFqQixzQkFBRUosYUFBRixHQUFpQmUsVUFBVU8sTUFBVixFQUFqQjtBQUNBbEIsc0JBQUVtQixNQUFGOztBQUdBQywrQkFBVyxZQUFZOztBQUVuQjtBQUNBO0FBQ0E7QUFDQTs7O0FBR0FwQiwwQkFBRUwsZUFBRixHQUFtQixLQUFuQjtBQUNBSywwQkFBRUosYUFBRixHQUFpQixJQUFqQjtBQUNBSSwwQkFBRW1CLE1BQUY7O0FBRUFsQixnQ0FBUUMsR0FBUixDQUFZLDRCQUE0QkYsRUFBRUwsZUFBMUM7QUFDSCxxQkFiRCxFQWFFSCxHQWJGO0FBZUgsaUJBdENEO0FBd0NILGFBakRLOzs7QUFtRE42Qix3QkFBWSxzQkFBWTtBQUNwQnBCLHdCQUFRQyxHQUFSLENBQVksaUJBQVo7O0FBRUEscUJBQUtQLGVBQUwsR0FBc0IsSUFBdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUF5QiwyQkFBVyxZQUFVOztBQUVqQix3QkFBSVQsWUFBWVAsR0FBR1EsZUFBSCxDQUFtQjtBQUMvQkMsa0NBQVVyQixHQURxQjtBQUUvQnNCLHdDQUFnQixRQUZlO0FBRy9CQywrQkFBTztBQUh3QixxQkFBbkIsQ0FBaEI7O0FBTUFKLDhCQUFVSyxVQUFWLENBQXFCLENBQXJCLEVBQXdCQyxJQUF4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlCQUFLdEIsZUFBTCxHQUFzQixJQUF0QjtBQUNBLHlCQUFLQyxhQUFMLEdBQW9CZSxVQUFVTyxNQUFWLEVBQXBCO0FBQ0EseUJBQUtDLE1BQUw7QUFFSCxpQkFsQlUsQ0FrQlRHLElBbEJTLENBa0JKLElBbEJJLENBQVgsRUFrQmEsRUFsQmI7QUFtQkgsYUE5RUs7O0FBZ0ZOQyxxQkFoRk0sdUJBZ0ZNO0FBQ1J0Qix3QkFBUUMsR0FBUixDQUFZLFlBQVo7QUFDSCxhQWxGSztBQW9GTnNCLHFCQXBGTSxxQkFvRklDLENBcEZKLEVBb0ZPOztBQUVUeEIsd0JBQVFDLEdBQVIsQ0FBWSxjQUFjdUIsRUFBRUMsYUFBRixDQUFnQkMsT0FBaEIsQ0FBd0JDLEtBQWxEO0FBQ0Esb0JBQUlBLFFBQVFILEVBQUVDLGFBQUYsQ0FBZ0JDLE9BQWhCLENBQXdCQyxLQUFwQztBQUNBLG9CQUFJQSxTQUFTLENBQWIsRUFBZ0I7QUFDWjNCLDRCQUFRQyxHQUFSLENBQVksT0FBWjtBQUNBLHdCQUFJMkIsTUFBTSxLQUFLbkMsSUFBTCxDQUFVRyxZQUFwQjtBQUNBZ0Msd0JBQUlDLE1BQUosQ0FBV0QsSUFBSUUsTUFBSixHQUFXLENBQXRCLEVBQXdCLENBQXhCLEVBQTBCLENBQTFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQUtsQyxZQUFMLEdBQW9CZ0MsR0FBcEI7QUFDSCxpQkFSRCxNQVFPLElBQUlELFNBQVMsQ0FBYixFQUFnQjtBQUNuQjNCLDRCQUFRQyxHQUFSLENBQVksT0FBWjtBQUNBLHdCQUFJMkIsT0FBTSxLQUFLbkMsSUFBTCxDQUFVRyxZQUFwQjtBQUNBZ0MseUJBQUlDLE1BQUosQ0FBV0QsS0FBSUUsTUFBSixHQUFhLENBQXhCLEVBQTJCLENBQTNCLEVBQThCLENBQTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQUtsQyxZQUFMLEdBQW9CZ0MsSUFBcEI7QUFDSDtBQUNKO0FBekdLLFM7Ozs7RUFSMkIsZUFBS0csSTs7a0JBQXZCdkMsUyIsImZpbGUiOiJFZGl0RGlhcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuICBjb25zdCAgZHVyID0gNTAwO1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEVkaXREaWFyeSBleHRlbmRzIHdlcHkucGFnZSB7XG5cbiAgICBkYXRhID0ge1xuICAgICAgICBzaG93TW9kYWxTdGF0dXM6IGZhbHNlLFxuICAgICAgICBhbmltYXRpb25EYXRhOiBudWxsLFxuICAgICAgICBpbnB1dFZpZXdBcnI6IFswLCAxLCAwLCAwLCAyXVxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAgIGhpZGVEcmF3ZXIoKSB7XG5cbiAgICAgICAgICAgIGxldCB0ID0gdGhpc1xuXG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfpmpDol49ib3R0b21fZHJhd2VyJylcbiAgICAgICAgICAgIHZhciBxdWVyeSA9IHd4LmNyZWF0ZVNlbGVjdG9yUXVlcnkoKTsvL+mAieaLqWlkXG4gICAgICAgICAgICBxdWVyeS5zZWxlY3QoJyNtamx0ZXN0JykuYm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgIHF1ZXJ5LmV4ZWMoZnVuY3Rpb24gKHJlcykge1xuXG4gICAgICAgICAgICAgICAgLy9yZXPlsLHmmK8g5omA5pyJ5qCH562+5Li6bWpsdGVzdOeahOWFg+e0oOeahOS/oeaBryDnmoTmlbDnu4RcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlcyk7XG5cbiAgICAgICAgICAgICAgICAvL+WPlumrmOW6plxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzWzBdLmhlaWdodCk7XG5cblxuICAgICAgICAgICAgICAgIGxldCBoZWlnaHQgPSByZXNbMF0uaGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgbGV0IGFuaW1hdGlvbiA9IHd4LmNyZWF0ZUFuaW1hdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBkdXIsXG4gICAgICAgICAgICAgICAgICAgIHRpbWluZ0Z1bmN0aW9uOiBcImxpbmVhclwiLFxuICAgICAgICAgICAgICAgICAgICBkZWxheTogMFxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBhbmltYXRpb24udHJhbnNsYXRlWSgoaGVpZ2h0KSkuc3RlcCgpXG5cbiAgICAgICAgICAgICAgICB0LmFuaW1hdGlvbkRhdGE9IGFuaW1hdGlvbi5leHBvcnQoKVxuICAgICAgICAgICAgICAgIHQuJGFwcGx5KClcblxuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gdC5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHNob3dNb2RhbFN0YXR1czogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBhbmltYXRpb25EYXRhOiBudWxsXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pXG5cblxuICAgICAgICAgICAgICAgICAgICB0LnNob3dNb2RhbFN0YXR1cz0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgdC5hbmltYXRpb25EYXRhPSBudWxsXG4gICAgICAgICAgICAgICAgICAgIHQuJGFwcGx5KClcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn6ZqQ6JePYm90dG9tX2RyYXdlcuiuoeaXtuWZqOWIsOacnz0+ICcgKyB0LnNob3dNb2RhbFN0YXR1cylcbiAgICAgICAgICAgICAgICB9LGR1cilcblxuICAgICAgICAgICAgfSlcblxuICAgICAgICB9LFxuXG4gICAgICAgIHNob3dEcmF3ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmmL7npLpib3R0b21fZHJhd2VyJylcblxuICAgICAgICAgICAgdGhpcy5zaG93TW9kYWxTdGF0dXM9IHRydWVcbiAgICAgICAgICAgIC8vIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAvLyAgICAgc2hvd01vZGFsU3RhdHVzOiB0cnVlXG4gICAgICAgICAgICAvLyB9KVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgICAgICBsZXQgYW5pbWF0aW9uID0gd3guY3JlYXRlQW5pbWF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IGR1cixcbiAgICAgICAgICAgICAgICAgICAgdGltaW5nRnVuY3Rpb246IFwibGluZWFyXCIsXG4gICAgICAgICAgICAgICAgICAgIGRlbGF5OiAwXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbi50cmFuc2xhdGVZKDApLnN0ZXAoKVxuICAgICAgICAgICAgICAgIC8vIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgLy8gICAgIHNob3dNb2RhbFN0YXR1czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAvLyAgICAgYW5pbWF0aW9uRGF0YTogYW5pbWF0aW9uLmV4cG9ydCgpXG4gICAgICAgICAgICAgICAgLy8gfSlcblxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd01vZGFsU3RhdHVzPSB0cnVlXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25EYXRhPSBhbmltYXRpb24uZXhwb3J0KClcbiAgICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG5cbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSwzMClcbiAgICAgICAgfSxcblxuICAgICAgICBkb05vdGhpbmcoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZG8gbm90aGluZycpXG4gICAgICAgIH0sXG5cbiAgICAgICAgaXRlbUNsaWNrKGUpIHtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+eCueWHu+eahOS4i+aghz09PiAnICsgZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXgpXG4gICAgICAgICAgICBsZXQgaW5kZXggPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleFxuICAgICAgICAgICAgaWYgKGluZGV4ID09IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn54K55Ye75LqG5paH5a2XJylcbiAgICAgICAgICAgICAgICBsZXQgYXJyID0gdGhpcy5kYXRhLmlucHV0Vmlld0FyclxuICAgICAgICAgICAgICAgIGFyci5zcGxpY2UoYXJyLmxlbmd0aC0xLDAsMClcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIC8vICAgICBpbnB1dFZpZXdBcnI6IGFyclxuICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdBcnIgPSBhcnJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT0gMSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfngrnlh7vkuoblm77niYcnKVxuICAgICAgICAgICAgICAgIGxldCBhcnIgPSB0aGlzLmRhdGEuaW5wdXRWaWV3QXJyXG4gICAgICAgICAgICAgICAgYXJyLnNwbGljZShhcnIubGVuZ3RoIC0gMSwgMCwgMSlcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIC8vICAgICBpbnB1dFZpZXdBcnI6IGFyclxuICAgICAgICAgICAgICAgIC8vIH0pXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dFZpZXdBcnIgPSBhcnJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9XG4gIH1cbiJdfQ==