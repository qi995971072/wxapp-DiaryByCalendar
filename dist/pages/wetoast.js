'use strict';

/**
 * WeToast by kiinlam
 * WeApp Toast add-ons
 * 微信小程序toast增强插件
 * Github: https://github.com/kiinlam/wetoast
 * LICENSE: MIT
 */

function WeToastClass() {

    //构造函数
    function WeToast() {
        var pages = getCurrentPages();
        var curPage = pages[pages.length - 1];
        this.__page = curPage;
        this.__timeout = null;

        //附加到page上，方便访问
        curPage.wetoast = this;

        return this;
    }

    //切换显示/隐藏
    WeToast.prototype.toast = function (data) {
        try {
            if (!data) {
                this.hide();
            } else {
                this.show(data);
            }
        } catch (err) {
            console.error(err);

            // fail callback
            data && typeof data.fail === 'function' && data.fail(data);
        } finally {
            // complete callback
            data && typeof data.complete === 'function' && data.complete(data);
        }
    };

    //显示
    WeToast.prototype.show = function (data) {
        var _this = this;

        var page = this.__page;

        clearTimeout(this.__timeout);

        //display需要先设置为block之后，才能执行动画
        page.setData({
            '__wetoast__.reveal': true
        });

        setTimeout(function () {
            var animation = wx.createAnimation();
            animation.opacity(1).step();
            data.animationData = animation.export();
            data.reveal = true;
            page.setData({
                __wetoast__: data
            });
        }, 30);

        if (data.duration === 0) {
            // success callback after toast showed
            setTimeout(function () {
                typeof data.success === 'function' && data.success(data);
            }, 430);
        } else {
            this.__timeout = setTimeout(function () {
                _this.toast();

                // success callback
                typeof data.success === 'function' && data.success(data);
            }, (data.duration || 1500) + 400);
        }
    };

    //隐藏
    WeToast.prototype.hide = function () {
        var page = this.__page;

        clearTimeout(this.__timeout);

        if (!page.data.__wetoast__.reveal) {
            return;
        }

        var animation = wx.createAnimation();
        animation.opacity(0).step();
        page.setData({
            '__wetoast__.animationData': animation.export()
        });

        setTimeout(function () {
            page.setData({
                __wetoast__: { 'reveal': false }
            });
        }, 400);
    };

    return new WeToast();
}

module.exports = {
    WeToast: WeToastClass
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndldG9hc3QuanMiXSwibmFtZXMiOlsiV2VUb2FzdENsYXNzIiwiV2VUb2FzdCIsInBhZ2VzIiwiZ2V0Q3VycmVudFBhZ2VzIiwiY3VyUGFnZSIsImxlbmd0aCIsIl9fcGFnZSIsIl9fdGltZW91dCIsIndldG9hc3QiLCJwcm90b3R5cGUiLCJ0b2FzdCIsImRhdGEiLCJoaWRlIiwic2hvdyIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsImZhaWwiLCJjb21wbGV0ZSIsInBhZ2UiLCJjbGVhclRpbWVvdXQiLCJzZXREYXRhIiwic2V0VGltZW91dCIsImFuaW1hdGlvbiIsInd4IiwiY3JlYXRlQW5pbWF0aW9uIiwib3BhY2l0eSIsInN0ZXAiLCJhbmltYXRpb25EYXRhIiwiZXhwb3J0IiwicmV2ZWFsIiwiX193ZXRvYXN0X18iLCJkdXJhdGlvbiIsInN1Y2Nlc3MiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7OztBQVFBLFNBQVNBLFlBQVQsR0FBeUI7O0FBRXJCO0FBQ0EsYUFBU0MsT0FBVCxHQUFvQjtBQUNoQixZQUFJQyxRQUFRQyxpQkFBWjtBQUNBLFlBQUlDLFVBQVVGLE1BQU1BLE1BQU1HLE1BQU4sR0FBZSxDQUFyQixDQUFkO0FBQ0EsYUFBS0MsTUFBTCxHQUFjRixPQUFkO0FBQ0EsYUFBS0csU0FBTCxHQUFpQixJQUFqQjs7QUFFQTtBQUNBSCxnQkFBUUksT0FBUixHQUFrQixJQUFsQjs7QUFFQSxlQUFPLElBQVA7QUFDSDs7QUFFRDtBQUNBUCxZQUFRUSxTQUFSLENBQWtCQyxLQUFsQixHQUEwQixVQUFTQyxJQUFULEVBQWU7QUFDckMsWUFBSTtBQUNBLGdCQUFJLENBQUNBLElBQUwsRUFBVztBQUNQLHFCQUFLQyxJQUFMO0FBQ0gsYUFGRCxNQUVPO0FBQ0gscUJBQUtDLElBQUwsQ0FBVUYsSUFBVjtBQUNIO0FBQ0osU0FORCxDQU1FLE9BQU9HLEdBQVAsRUFBWTtBQUNWQyxvQkFBUUMsS0FBUixDQUFjRixHQUFkOztBQUVBO0FBQ0FILG9CQUFRLE9BQU9BLEtBQUtNLElBQVosS0FBcUIsVUFBN0IsSUFBMkNOLEtBQUtNLElBQUwsQ0FBVU4sSUFBVixDQUEzQztBQUNILFNBWEQsU0FXVTtBQUNOO0FBQ0FBLG9CQUFRLE9BQU9BLEtBQUtPLFFBQVosS0FBeUIsVUFBakMsSUFBK0NQLEtBQUtPLFFBQUwsQ0FBY1AsSUFBZCxDQUEvQztBQUNIO0FBQ0osS0FoQkQ7O0FBa0JBO0FBQ0FWLFlBQVFRLFNBQVIsQ0FBa0JJLElBQWxCLEdBQXlCLFVBQVNGLElBQVQsRUFBZTtBQUFBOztBQUNwQyxZQUFJUSxPQUFPLEtBQUtiLE1BQWhCOztBQUVBYyxxQkFBYSxLQUFLYixTQUFsQjs7QUFFQTtBQUNBWSxhQUFLRSxPQUFMLENBQWE7QUFDVCxrQ0FBc0I7QUFEYixTQUFiOztBQUlBQyxtQkFBVyxZQUFJO0FBQ1gsZ0JBQUlDLFlBQVlDLEdBQUdDLGVBQUgsRUFBaEI7QUFDQUYsc0JBQVVHLE9BQVYsQ0FBa0IsQ0FBbEIsRUFBcUJDLElBQXJCO0FBQ0FoQixpQkFBS2lCLGFBQUwsR0FBcUJMLFVBQVVNLE1BQVYsRUFBckI7QUFDQWxCLGlCQUFLbUIsTUFBTCxHQUFjLElBQWQ7QUFDQVgsaUJBQUtFLE9BQUwsQ0FBYTtBQUNUVSw2QkFBYXBCO0FBREosYUFBYjtBQUdILFNBUkQsRUFRRSxFQVJGOztBQVVBLFlBQUlBLEtBQUtxQixRQUFMLEtBQWtCLENBQXRCLEVBQXlCO0FBQ3JCO0FBQ0FWLHVCQUFZLFlBQU07QUFDZCx1QkFBT1gsS0FBS3NCLE9BQVosS0FBd0IsVUFBeEIsSUFBc0N0QixLQUFLc0IsT0FBTCxDQUFhdEIsSUFBYixDQUF0QztBQUNILGFBRkQsRUFFRyxHQUZIO0FBR0gsU0FMRCxNQUtPO0FBQ0gsaUJBQUtKLFNBQUwsR0FBaUJlLFdBQVcsWUFBTTtBQUM5QixzQkFBS1osS0FBTDs7QUFFQTtBQUNBLHVCQUFPQyxLQUFLc0IsT0FBWixLQUF3QixVQUF4QixJQUFzQ3RCLEtBQUtzQixPQUFMLENBQWF0QixJQUFiLENBQXRDO0FBQ0gsYUFMZ0IsRUFLZCxDQUFDQSxLQUFLcUIsUUFBTCxJQUFpQixJQUFsQixJQUEwQixHQUxaLENBQWpCO0FBTUg7QUFFSixLQWxDRDs7QUFvQ0E7QUFDQS9CLFlBQVFRLFNBQVIsQ0FBa0JHLElBQWxCLEdBQXlCLFlBQVc7QUFDaEMsWUFBSU8sT0FBTyxLQUFLYixNQUFoQjs7QUFFQWMscUJBQWEsS0FBS2IsU0FBbEI7O0FBRUEsWUFBSSxDQUFDWSxLQUFLUixJQUFMLENBQVVvQixXQUFWLENBQXNCRCxNQUEzQixFQUFtQztBQUMvQjtBQUNIOztBQUVELFlBQUlQLFlBQVlDLEdBQUdDLGVBQUgsRUFBaEI7QUFDQUYsa0JBQVVHLE9BQVYsQ0FBa0IsQ0FBbEIsRUFBcUJDLElBQXJCO0FBQ0FSLGFBQUtFLE9BQUwsQ0FBYTtBQUNULHlDQUE2QkUsVUFBVU0sTUFBVjtBQURwQixTQUFiOztBQUlBUCxtQkFBVyxZQUFNO0FBQ2JILGlCQUFLRSxPQUFMLENBQWE7QUFDVFUsNkJBQWEsRUFBQyxVQUFVLEtBQVg7QUFESixhQUFiO0FBR0gsU0FKRCxFQUlHLEdBSkg7QUFLSCxLQXBCRDs7QUFzQkEsV0FBTyxJQUFJOUIsT0FBSixFQUFQO0FBQ0g7O0FBRURpQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2JsQyxhQUFTRDtBQURJLENBQWpCIiwiZmlsZSI6IndldG9hc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFdlVG9hc3QgYnkga2lpbmxhbVxuICogV2VBcHAgVG9hc3QgYWRkLW9uc1xuICog5b6u5L+h5bCP56iL5bqPdG9hc3Tlop7lvLrmj5Lku7ZcbiAqIEdpdGh1YjogaHR0cHM6Ly9naXRodWIuY29tL2tpaW5sYW0vd2V0b2FzdFxuICogTElDRU5TRTogTUlUXG4gKi9cblxuZnVuY3Rpb24gV2VUb2FzdENsYXNzICgpIHtcblxuICAgIC8v5p6E6YCg5Ye95pWwXG4gICAgZnVuY3Rpb24gV2VUb2FzdCAoKSB7XG4gICAgICAgIGxldCBwYWdlcyA9IGdldEN1cnJlbnRQYWdlcygpXG4gICAgICAgIGxldCBjdXJQYWdlID0gcGFnZXNbcGFnZXMubGVuZ3RoIC0gMV1cbiAgICAgICAgdGhpcy5fX3BhZ2UgPSBjdXJQYWdlXG4gICAgICAgIHRoaXMuX190aW1lb3V0ID0gbnVsbFxuXG4gICAgICAgIC8v6ZmE5Yqg5YiwcGFnZeS4iu+8jOaWueS+v+iuv+mXrlxuICAgICAgICBjdXJQYWdlLndldG9hc3QgPSB0aGlzXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIC8v5YiH5o2i5pi+56S6L+makOiXj1xuICAgIFdlVG9hc3QucHJvdG90eXBlLnRvYXN0ID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlKClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KGRhdGEpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGZhaWwgY2FsbGJhY2tcbiAgICAgICAgICAgIGRhdGEgJiYgdHlwZW9mIGRhdGEuZmFpbCA9PT0gJ2Z1bmN0aW9uJyAmJiBkYXRhLmZhaWwoZGF0YSlcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIC8vIGNvbXBsZXRlIGNhbGxiYWNrXG4gICAgICAgICAgICBkYXRhICYmIHR5cGVvZiBkYXRhLmNvbXBsZXRlID09PSAnZnVuY3Rpb24nICYmIGRhdGEuY29tcGxldGUoZGF0YSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v5pi+56S6XG4gICAgV2VUb2FzdC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgbGV0IHBhZ2UgPSB0aGlzLl9fcGFnZVxuXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9fdGltZW91dClcblxuICAgICAgICAvL2Rpc3BsYXnpnIDopoHlhYjorr7nva7kuLpibG9ja+S5i+WQju+8jOaJjeiDveaJp+ihjOWKqOeUu1xuICAgICAgICBwYWdlLnNldERhdGEoe1xuICAgICAgICAgICAgJ19fd2V0b2FzdF9fLnJldmVhbCc6IHRydWVcbiAgICAgICAgfSlcblxuICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICBsZXQgYW5pbWF0aW9uID0gd3guY3JlYXRlQW5pbWF0aW9uKClcbiAgICAgICAgICAgIGFuaW1hdGlvbi5vcGFjaXR5KDEpLnN0ZXAoKVxuICAgICAgICAgICAgZGF0YS5hbmltYXRpb25EYXRhID0gYW5pbWF0aW9uLmV4cG9ydCgpXG4gICAgICAgICAgICBkYXRhLnJldmVhbCA9IHRydWVcbiAgICAgICAgICAgIHBhZ2Uuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgX193ZXRvYXN0X186IGRhdGFcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sMzApXG5cbiAgICAgICAgaWYgKGRhdGEuZHVyYXRpb24gPT09IDApIHtcbiAgICAgICAgICAgIC8vIHN1Y2Nlc3MgY2FsbGJhY2sgYWZ0ZXIgdG9hc3Qgc2hvd2VkXG4gICAgICAgICAgICBzZXRUaW1lb3V0ICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdHlwZW9mIGRhdGEuc3VjY2VzcyA9PT0gJ2Z1bmN0aW9uJyAmJiBkYXRhLnN1Y2Nlc3MoZGF0YSlcbiAgICAgICAgICAgIH0sIDQzMClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX190aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdCgpXG5cbiAgICAgICAgICAgICAgICAvLyBzdWNjZXNzIGNhbGxiYWNrXG4gICAgICAgICAgICAgICAgdHlwZW9mIGRhdGEuc3VjY2VzcyA9PT0gJ2Z1bmN0aW9uJyAmJiBkYXRhLnN1Y2Nlc3MoZGF0YSlcbiAgICAgICAgICAgIH0sIChkYXRhLmR1cmF0aW9uIHx8IDE1MDApICsgNDAwKVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICAvL+makOiXj1xuICAgIFdlVG9hc3QucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IHBhZ2UgPSB0aGlzLl9fcGFnZVxuICAgICAgICBcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX190aW1lb3V0KVxuXG4gICAgICAgIGlmICghcGFnZS5kYXRhLl9fd2V0b2FzdF9fLnJldmVhbCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGxldCBhbmltYXRpb24gPSB3eC5jcmVhdGVBbmltYXRpb24oKVxuICAgICAgICBhbmltYXRpb24ub3BhY2l0eSgwKS5zdGVwKClcbiAgICAgICAgcGFnZS5zZXREYXRhKHtcbiAgICAgICAgICAgICdfX3dldG9hc3RfXy5hbmltYXRpb25EYXRhJzogYW5pbWF0aW9uLmV4cG9ydCgpXG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHBhZ2Uuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgX193ZXRvYXN0X186IHsncmV2ZWFsJzogZmFsc2V9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCA0MDApXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBXZVRvYXN0KClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgV2VUb2FzdDogV2VUb2FzdENsYXNzXG59Il19