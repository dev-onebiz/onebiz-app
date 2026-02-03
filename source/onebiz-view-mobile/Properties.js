/**
 * 프로퍼티를 반환하기 위한 클래스
 *
 *
 * @author BNK시스템/파트너/박주혁
 * @since 2023. 11. 15.
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *   수정일      수정자     수정내용
 *  ------------   ---------   --------------------------
 *   2023. 11. 15.   BNK시스템/파트너/박주혁     최초 생성
 *
 * << 사용방법 >>
 * Properties.getProperty(프로퍼티 키값)
 */
Ext.define('BNK.app.Properties', {
  singleton: true,
  alternateClassName: 'Properties',

  getProperty: function(property) {
    var propertyStore = Ext.StoreMgr.get('PropertyStore');
    var value = null;

    if(Ext.isEmpty(propertyStore)) return;
    if(Ext.isEmpty(property)) return '';

    for (var i = 0; i < propertyStore.getData().items.length; i++) {
        var val = propertyStore.getData().items[i].data;
        if (property === val.property) {
        	value = val.text;
          break;
        }
    }


    return value;
  }

});