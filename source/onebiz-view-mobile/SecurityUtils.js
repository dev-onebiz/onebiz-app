/**
 * Security 유틸
 */
Ext.define('BNK.SecurityUtils', {
  singleton : true,
  alternateClassName : 'SecurityUtils',

  /** JWT값을 반환한다. */
  getJwt : function () {
    try {
      /*
      var jwtToken = WebUtils.getCookie(Property.JWT_TOKEN_NAME);
      if (!jwtToken) {
          jwtToken = localStorage.getItem(Property.JWT_TOKEN_NAME);
      }
      */
      var jwtToken = localStorage.getItem(Property.JWT_TOKEN_NAME);
      return JSON.parse(decodeURIComponent(escape(window.atob(jwtToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')))));
    }
    catch(error) {
      return null;
    }
  },

  /** PRINCIPAL 정보를 반환한다 */
  getPrincipal : function() {
    var jwt = this.getJwt();
    if (!jwt) {
      return null;
    }
    return JSON.parse(jwt.sub);
  }, 
    
  /** 사용자가 나열된 권한 중 한가지라도 해당할 경우, true 를 반환한다. */
  hasRole : function(roles) {
    var result = false;
    var me = this;
    var ssnRoles = me.getPrincipal().roles;

    // 단건 권한 설정인 경우
    if (typeof roles === 'string') {
      for ( var j in ssnRoles) {
        if (ssnRoles[j] === roles) {
          result = true;
          break;
        }
      }
    }
    // 다건 권한 설정인 경우
    else {
      for ( var i in roles) {
        var role = roles[i];
        for ( var j in ssnRoles) {
          var ssnRole = ssnRoles[j];
          if (role === ssnRole) {
            result = true;
            break;
          }
        }
        if (result) {
          break;
        }
      }
    }

    return result;
  },
    
  /** 
      공개키 받급 후 암호화 
		
      1. String일 경우 암호화 하여 바로 반환
      2. Object일 경우 암호화 하여 객체로 반환 (key, value)
  */
  encrypt: function(scope, obj) {
	return new Ext.Promise(function(resolve, reject) {
        Ext.Ajax.request({
            headers: {
                serviceId: 'COMAPP0002R04', 
                viewId: scope.getViewId(), 
                scope: scope, 
                isDirectFailure: true 
            },
            data: {},
            method: 'POST',
            success: function(response) {
                res = Ext.JSON.decode(response.responseText);
                
                let encrypt = new JSEncrypt();
                encrypt.setPublicKey(res.rsaPublicKey);

                let result;
                if(typeof obj == 'string') {
                    result = encrypt.encrypt(obj);
                }
                else if(obj instanceof Object) {
                    result = {};
                    let keys = Object.keys(obj);

                    for(let i = 0; i < keys.length; i++){
                        let key = keys[i];
                        result[key] = encrypt.encrypt(obj[key]);
                    }
                }

                resolve(result);
            },
            failure: function(res) {
                reject(res);
            }
        });
    });
  }
});