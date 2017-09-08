module.exports = {
    /**
     * 日期比较
     * @param  {[type]} date1 [日期1]
     * @param  {[type]} date2 [日期2]
     * @return {[type]}       [string]
     */
    compare(date1, date2)  {
        date1 = this._getDate(date1);
        date2 = this._getDate(date2);
        var time1 = date1.getTime(),
            time2 = date2.getTime();
        if (time1 > time2) {
            return '1';
        } else if (time1 < time2) {
            return '-1';
        } else {
            return '0';
        }
    },

    /**
     * 日期格式化
     * @example this.dateFormat(new Date(), 'yyyy-MM-dd hh:mm')
     * @param  {[type]} date [日期对象]
     * @param  {[type]} fmt  [格式]
     * @return {[type]}      [日期字符串]
     */
    dateFormat: function(date, fmt) {
        date = this._getDate(date);
        var o = {
            "M+": date.getMonth() + 1, // 月份
            "d+": date.getDate(), // 日
            "H+": date.getHours(), // 小时
            "h+": date.getHours(), // 小时
            "m+": date.getMinutes(), // 分
            "s+": date.getSeconds(), // 秒
            "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
            "S": date.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (
            date.getFullYear() +
            "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt =
                fmt.replace(
                    RegExp.$1, (RegExp.$1.length == 1) ? (o[
                        k]) : ((
                        "00" + o[k]).substr(("" + o[k])
                        .length)));
        return fmt;
    },

    /**
     * [内部方法] 返回日期对象
     * @return {[type]} [日期对象]
     */
    _getDate: function(date) {
        if (typeof date == 'string') {
            return this.getDate(date);
        }
        if (typeof date == 'number') {
            return new Date(date);
        }
        return date;
    },

    /**
     * 把日期字符串转成日期对象
     * @example this.getDate('2011-09-09 12:12:12')
     * @param {String} dateStr 时期字符串，只支持国内日期格式
     * @example 如2011-6-12 12:15:20【必选】
     * @return {Date} 转化后时间对象
     */
    getDate: function(input) {
        var str,
            date,
            time;
        str = input.split(' ');
        date = str[0].split(/[\-\/]/);
        time = str[1] ? str[1].split(':') : [0, 0, 0];
        return new Date(date[0], date[1] - 1, date[2], time[
            0], time[1], time[2] ? time[2] : 0);
    },

    /**
     * 距离date日期的day的日期
     * 返回日期对象 默认返回 2015-01-01
     * @return {[type]} [日期对象]
     */
    getDisDate: function(date, day, fmt) {
        var current = this._getDate(date);
        var disDate = current.getTime() + day * 24 * 60 *
            60 * 1000;
        var resultDate = fmt ? this.dateFormat(new Date(disDate),
            fmt) : this.dateFormat(new Date(disDate),
            "yyyy-MM-dd");
        return resultDate;
    }

}
