/**
 * WEB 처리를 위한 유틸클래스
 */
Ext.define('BNK.WebUtils', {
    singleton : true,
    alternateClassName: 'WebUtils',

    /**
	 * location 정보를 받아 contextPath 를 반환한다.
	 */
    getContextPath : function() {
        var l = '' + location;
        return l.split('/')[0] + '//' + l.split('/')[2];
    },

    /** 요청파라메터를 JSON객체로 반환한다. */
    getParameters: function() {
        var l = '' + location;
        // Params 가 존재하는 경우, JSON 객체로 생성하여 반환한다.
        if (l.indexOf('?') > 0) {
            var params = {},
                keyValueParams = l.split('?')[1].split('&');
            for (var i in keyValueParams) {
                var key   = keyValueParams[i].split('=')[0];
                var value = keyValueParams[i].split('=')[1];
                params[key] = value;
            }
            return params;
        }
        else {
            return {};
        }
    },

    /** pname에 해당하는 파라메타값을 반환한다. */
    getParameter: function(pname) {
        var params = this.getParameters();
        return params[pname];
    },

    /** 요청파라메타명을 반환한다. */
    getParameterNames: function() {
        return this.getParameters().keys();
    },

    setCookie: function( cname, cvalue, exdays ) {
        var d = new Date();
        exdays = exdays || 1;
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    },

    /** cname에 해당하는 Cookie값을 반환한다. */
    getCookie : function(cname) {
        var name = cname + '=';
        // 특정유저에서 '디코딩될 uri가 유효한 인코딩이 아닙니다.' 가 발생하여 디코딩처리를 제거함
        // BSIB_MAIN_CUST_PDT 에서 한글인코딩된 데이터사용으로 판단됨
        //var decodeCookie = decodeURIComponent(document.cookie);
        //var ca = decodeCookie.split(';');
        if (document.cookie) {
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (' ' == c.charAt(0)) {
                    c = c.substring(1);
                }
                if (0 === c.indexOf(name)) {
                    return c.substring(name.length, c.length);
                }
            }
        }
        return '';
    }
});