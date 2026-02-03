/**
 * JSON유틸
 */
Ext.define('BNK.JsonUtils', {
  singleton : true,
  alternateClassName : 'JsonUtils',

  /**
   * json 문자열 여부를 반환한다.
   */
  isJson : function(string) {
    string = typeof string !== 'string' ? JSON.stringify(string) : string;
    try {
      string = JSON.parse(string);
    } catch (e) {
      return false;
    }

    return typeof string === 'object' && !!string;
  }
});