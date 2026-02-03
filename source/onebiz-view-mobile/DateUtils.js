Ext.define('BNK.DateUtils', {
    singleton : true,
    alternateClassName : 'DateUtils',

    /**
   * date 를 format 형식으로 변환함
   * Date 객체일 경우, data 값을 그대로 반환한다.
   */
    getFormatValue : function(date, format) {
        var result = date;
        var format = format || 'Ymd';

        if (typeof date !== 'string') {
            //result = Ext.Date.format(date, format);
            result = this.encodeDate(date, format);
        }
        return result;
    },

    parseDate : function(value) {
        var result = value;
        if (typeof value === 'string') {
            result = value.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
        } else {
            //result = Ext.Date.format(value, 'Y-m-d');
            result = this.encodeDate(value, 'Y-m-d');
        }
        return result;
    },

    /** 날짜를 Ymd형식으로 반환한다. */
    getDate : function(date) {
        var result = date;

        if (typeof date !== 'string') {
            //result = Ext.Date.format(date, 'Ymd');
            result = this.encodeDate(date, 'Ymd');
        } else if (typeof date === 'string') {
            result = date.replace(/-/g, "");
        }
        return result;
    },
    // "yyyyMMdd"  -> new Date();
    changeYMDtoDate : function(value) {
        try {

            var value = value.split('-').join('');
            var year = value.substr(0, 4);
            var month = value.substr(4, 2);
            var date = value.substr(6, 2);
            return new Date(year, month - 1, date);

        } catch (exception) {
            return null;
        }
    },

    /** 시간을 재계산하여 His 형식으로 반환한다.
   * param
   *  -type     :시간(H), 분(I), 초(S)을 증가/감소 시킬지 정의
   *  -orgDate  :계산할 원래값의 일자(DateType)
   *  -interval :증가/감소시킬 시간/분/초
   * */
    reassignTime : function(type, orgDate, interval) {

        var resultDt = orgDate;
        var h = resultDt.getHours();
        var i = resultDt.getMinutes();
        var s = resultDt.getSeconds();
        switch (type) {
            case 'H': //시간 증가
                resultDt.setHours(h + interval);
                resultDt = new Date(resultDt);
                break;
            case 'I': //분 증가
                resultDt.setMinutes(i + interval);
                resultDt = new Date(resultDt);
                break;
            case 'S': //초 증가
                resultDt.setSeconds(s + interval);
                resultDt = new Date(resultDt);
                break;
            default:
                break;
        }
        result = this.encodeDate(resultDt, 'His');
        return result;
    },

    /** 날짜를 재계산하여 Ymd 형식으로 반환한다.
   * param
   *  -type     :연도(Y), 달(M), 일(D)을 증가/감소 시킬지 정의
   *  -orgDate  :계산할 원래값의 일자(DateType)
   *  -interval :증가/감소시킬 연도/달/일 수
   * */
    reassignDate : function(type, orgDate, interval) {

        var resultDt = orgDate;

        var yy = resultDt.getFullYear();
        var mm = resultDt.getMonth();
        var dd = resultDt.getDate();
        switch (type) {
            case 'Y': //연도 증가
                resultDt.setYear(yy + interval);
                resultDt = new Date(DateUtils.parseDate(resultDt));
                break;
            case 'M': //달수 증가
                resultDt.setMonth(mm + interval);
                resultDt = new Date(DateUtils.parseDate(resultDt));
                break;
            case 'D': //일수 증가
                resultDt.setDate(dd + interval);
                resultDt = new Date(DateUtils.parseDate(resultDt));
                break;
            default:
                break;
        }
        result = this.encodeDate(resultDt, 'Ymd');
        return result;
    },

    // 2018-12-11 손승범 라이선스 업그레이드 이후 timezone 오류가 발생하여, 아래와 같은 방어코드 추가함
    /** 날짜인코딩 */
    encodeDate : function(date, format) {
        if (!date) {
            return null;
        }

        var pad = function(n) {
            return n < 10 ? "0" + n : n;
        };

        if (!format) {
            return '' + date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()) + "T" + pad(date.getHours()) + ":" + pad(date.getMinutes()) + ":" + pad(date.getSeconds()) + '';
        } else if (format === 'Ymd') {
            return '' + date.getFullYear() + pad(date.getMonth() + 1) + pad(date.getDate());
        } else if (format === 'Y-m-d') {
            return '' + date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate());
        } else if (format === 'Y-m-d H:i') {
            return '' + date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()) + " " + pad(date.getHours()) + ":" + pad(date.getMinutes());
        } else if (format === 'Y-m-d H:i:s') {
            return '' + date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()) + " " + pad(date.getHours()) + ":" + pad(date.getMinutes()) + ":" + pad(date.getSeconds());;
        }
        else {
            // 추후 새롭게 사용될 날짜 인코딩을 위해 추가
            var datetmp = '';

            if (format.indexOf('Y') < 0 && format.indexOf('m') < 0 && format.indexOf('d') < 0 && format.indexOf('H') < 0 && format.indexOf('i') < 0 && format.indexOf('s') < 0) {
                return 'error';
            } else {
                for (var i = 0; i < format.length; i++) {
                    switch (format.charAt(i)) {
                        case 'Y':
                            datetmp += date.getFullYear();
                            break;
                        case 'm':
                            datetmp += pad(date.getMonth() + 1);
                            break;
                        case 'd':
                            datetmp += datetmp += pad(date.getDate());
                            break;
                        case 'H':
                            datetmp += pad(date.getHours());
                            break;
                        case 'i':
                            datetmp += pad(date.getMinutes());
                            break;
                        case 's':
                            datetmp += pad(date.getSeconds());
                            break;
                            //delemeter의 경우, 그 값으로 자동으로 붙는다.
                        default:
                            datetmp += format.charAt(i);
                            break;
                    }
                }
                return datetmp;
            }
        }
        return 'error';
    },

    //2019-02-08 천현아: 날짜 형태를 받아, 해당 날만큼 더하거나 뺀 후, js Date object 형식으로 반환한다.
    /** 날짜 더하기
   * date: 더할 대상 날짜(js Date 형태로 넣어줘야 한다.)
   * days: 더할 날 수.
   *  */
    addDate : function(targetDate, date) {
        var orgDate = new Date(targetDate);
        var addDate = orgDate.getDate() + date;
        var result = new Date(orgDate.setDate(addDate));
        return result;
    },

    /** timefield 위한 시각 포매팅
   * arg1: 대상시간
   * arg2: delemeter
   * sencha에서 제공하는 timefield는 getValue()를 하면 날짜값으로 변환해서 오므로,
   * 이 포매팅 함수를 통해 임의로 바꿔준다.
   * */
    getTimeFormat : function(value, format) {
        var target = value;
        var result = '';
        if (!target) {
            return '';
        }

        try {
            target = this.getTimeToDate(value);
            result = this.encodeDate(target, format);
        } catch(e) {
            console.log(e);
        }
        return result;
    },

    /** time을 date화 시켜줌.
   * arg1: 대상시간(date type)
   * */
    getTimeToDate : function(value) {
        var result = value;
        if (!result) {
            return '';
        }

        //날짜데이터로 변환
        var H = '00';
        var i = '00';
        var s = '00';

        if (Ext.isDate(result)) {
            H = result.getHours();
            i = result.getMinutes();
            s = result.getSeconds();
        } else {
            switch (String(value).length) {
                case 6:
                    H = result.substring(0, 2);
                    i = result.substring(2, 4);
                    s = result.substring(4, 6);
                    break;
                case 4:
                    H = result.substring(0, 2);
                    i = result.substring(2, 4);
                    break;
                default:
                    return 'not exist length His.';
                    break;
            }
        }
        result = new Date(0, 0, 0, H, i, s);

        return result;
    },

    /** 달의 첫날을 구한다.
   * arg1: 대상월(date type)
   * */
    getFirstDateOfMonth : function(value) {
        var orgDate = new Date(value);
        var result = new Date(orgDate.getFullYear(), orgDate.getMonth(), 1);

        return result;
    },

    /** 달의 마지막날을 구한다.
   * arg1: 대상월(date type)
   * */
    getLastDateOfMonth : function(value) {
        var orgDate = new Date(value);
        var result = new Date(orgDate.getFullYear(), Number(orgDate.getMonth()) + 1, 0);

        return result;
    },

    /** 년도의 첫날을 구한다.
   * arg1: 대상년도 (string)
   * */
    getFirstDateOfYear : function(value) {
        var result = new Date(Number(value) , 0 , 1 );

        return result ;
    },

    /** 년도의 첫날을 구한다.
   * arg1: 대상년도 (string)
   * */
    getLastDateOfYear : function(value) {
        var result = new Date(Number(value) , 12 , 0 );

        return result ;
    },

    /** 해당일자의 요일을 구한다
   *  이때 value는 Date 타입*/
    getDayFormat : function(value) {
        //월 ~ 일
        var week = new Array('일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일');
        var day = week[value.getDay()]; //요일
        var date = DateUtils.getDate(value);

        return date.substr(0, 4) + '년 ' + date.substr(4, 2) + '월 ' + date.substr(6, 8) + '일 ' + day;
    },
    /** 두날짜 사이의 일자를 계산한다
   * */
    getCalcDate : function(value1, value2) {
        var date1 = DateUtils.parseDate(value1);
        var date2 = DateUtils.parseDate(value2);

        var diffDate = ((new Date(date1) - new Date(date2)) / (24*60*60*1000)); // H * M * S * MSs

        return diffDate;
    },

    /** 두날짜 사이의 시차를 계산한다.
   * @param edttm js의 Date type, 종료일자(더 큰 일자)
   * @param strdttm js의 Date type, 시작일자(더 작은 일자)
   * */
    getDateTimeDiff : function(edttm, strdttm) {
        var dateTimeDiff = (edttm - strdttm) / (24*60*60*1000); // H * m * s * ms

        return dateTimeDiff;
    },

    /**
   * 20191211154141044 > js Date형으로.
   */
    parseTimestampToDate : function(timestamp){
        var year = timestamp.substr(0, 4); //년도
        var month = parseInt(timestamp.substr(4, 2)) - 1; //월
        var day = timestamp.substr(6, 2); //일
        var hour = timestamp.substr(8, 2); //시간
        var minute = timestamp.substr(10, 2); //분
        var second = timestamp.substr(12, 2); //초
        var millisec = timestamp.substr(14, 3); //밀리초

        var date = new Date(year, month, day, hour, minute, second, millisec);
        return date;
    },

    /** 두 날짜간의 개월수를 계산한다. */
    getMonthDiff : function(date1 , date2){
        return date2.getMonth() - date1.getMonth() + (12 * (date2.getFullYear() - date1.getFullYear()));
    },

    /** 해당 일자의 분기를 가져온다. */
    getQuarter : function(date){
        var tmpDate = date || new Date();
        return Math.floor(tmpDate.getMonth()/3) + 1;
    },

    /** 분기의 특정월을 가져온다. */
    getNthMnthByQuarter : function(quater, nth){
        if(!quater || !nth) return;

        var quaterMnth = {
            1 : ['01','02','03'],
            2 : ['04','05','06'],
            3 : ['07','08','09'],
            4 : ['10','11','12'],
        };
        var selectedQuarter = quaterMnth[quater];
        return selectedQuarter[(nth-1)];

    },

    /** str -> time format (H:i) */
    parseTime : function(value) {
        var result = value;
        if (typeof value === 'string') {
            result = value.replace(/(\d{2})(\d{2})/, '$1:$2');
        } else {
            result = this.encodeDate(value, 'H:i');
        }
        return result;
    },
});

