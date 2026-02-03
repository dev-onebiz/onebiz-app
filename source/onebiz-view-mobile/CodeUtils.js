/**
 * 코드유틸
 */
Ext.define('BNK.CodeUtils', {
  singleton : true,
  alternateClassName : 'CodeUtils',

  /**
   * Code 에 해당하는 value 의 text를 반환한다.
   */
  getText : function(code, value) {
    
    if (!value) {
        return value;
    }
    
    var codeStore = Ext.StoreMgr.get('CodeStore'),
        items = codeStore.getData().items,
        cbData = [],
        isFound = false,
        result = '';

    for (var i = 0, l = items.length; i < l; i++) {
      if (code === items[i].data.code) {
        var children = items[i].data.children;
        for (var j = 0, l2 = children.length; j < l2; j++) {
          var item = children[j];
          if (value == item.value) {
            result = item.text;
            isFound = true;
            break;
          }
        }
        if (isFound) {
          break;
        }
      }
    }
    return result;
  },

  /**
   * Combo박스에서 선택된 값을 반환한다.
   */
  getSelectionValue : function(comboObj) {
    var result = '';

    if(comboObj instanceof Object){  //여러 개의 코드가 등록된 경우, comboObj가 Object형태(배열)로 넘어올 경우엔, selection 된 value를 return..
      result = comboObj.selection ? comboObj.selection.data.value : null;
    }else{                           //코드가 하나뿐인 경우, comboObj는 object 형태가 아니라 var 형태로 넘어오므로 그대로 return.
      result = comboObj;
    }
    return result;
  },
    
    
    /** 코드 구분 코드에 해당하는 코드 스토어 반환*/
    getStore: function(codeDvcd, records, opts) {
        var store = Ext.create('Ext.data.Store');

        // 코드리스트의 코드가 사용된 경우, 어플리케이션 초기에 로딩한 코드리스트를 사용한다. 
        if ( 'string' === typeof codeDvcd ) {
            var codeStore = Ext.StoreMgr.get('CodeStore'),
                findNodeFieldName = (opts && opts.hasOwnProperty('findNodeFieldName')) ? opts.findNodeFieldName : 'code',
                labelFieldName = (opts && opts.hasOwnProperty('labelFieldName')) ? opts.labelFieldName : 'name',
                valueFileName = (opts && opts.hasOwnProperty('valueFileName')) ? opts.valueFileName : 'code';

            // 2017-04-21 findNode 처리가 안되 구현변경함
            var items = codeStore.getData().items;
            for (var i = 0; i < items.length; i++) {
                if (codeDvcd === items[i].data.code) {
                    var children = items[i].data.children;
                    for (var j = 0; j < children.length; j++) {
                        store.add(children[j]);        
                    }
                    break;
                }
            }
        }
        // 그 외의 경우, 서버에서 조회한 key,value 값으로 store를 생성한다.
        // displayField: 'label' 
        // valueField  : 'value'
        else {
            for (var i in codeDvcd) {
                store.insert(i, codeDvcd[i]);
            }
        }

        // 추가할 레코드가 존재하는 경우, 스토어 앞에서부터 추가한다.
        if (records) {
            // 배열
            if (records instanceof Array) {
                for (var i = 0; i < records.length; i++) {
                    store.insert(i, records[i]);
                }
            } 
            // 단건처리
            else {
                store.insert(0, records);
            }
        }

        return store;
    }
});



