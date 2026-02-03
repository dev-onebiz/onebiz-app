// Ext.define('BNK.util.StoreUtils', {
//     singleton: true,
//     alternateClassName: 'StoreUtils',

//     /**
//      * store 를 복제한다.
//      * records 가 설정되었을 경우, 스토어 앞에서부터 추가한다.
//      */
//     copyStore: function (store, records) {
//         var store2 = new Ext.data.Store({ recordType: store.recordType });
//         store2.add(store.getRange());

//         // 추가할 레코드가 존재하는 경우, 스토어 앞에서부터 추가한다.
//         if (records) {
//             // 배열
//             if (records instanceof Array) {
//                 for (var i = 0; i < records.length; i++) {
//                     store2.insert(i, records[i]);
//                 }
//             }
//             // 단건처리
//             else {
//                 store2.insert(0, records);
//             }
//         }

//         return store2;
//     },

//     /**
//      * records의 데이터를 store에 저장하여 반환한다.
//      */
//     newStore: function (records) {
//         if (records) {
//             var store = new Ext.data.Store();
//             for (var i = 0; i < records.length; i++) {
//                 store.add(records[i]);
//             }
//             return store;
//         }
//     },

//     /**
//      * 스토어의 데이터 중 유효성이 검증된 레코드를 구하는 함수
//      * TODO : validator 함수 대신 그리드 객체 받아서 컬럼 에디터의 allowBlank: true 일 경우 수행하도록 변경할 것
//      * TODO : 위 사항 변경 시 GridUtils.js 로 옮길 것
//      */
//     getValidRecords: function (store, validator) {
//         var me = this,
//             dirtyLength = 0;
//             recordPosition = { hasDirty: false, rowIdx: -1, colIdx: -1 },
//             returnValue = { dirtyLength: 0, validLength: 0, newRecords: [], modifiedRecords: [], removedRecords: [] };

//         if (store instanceof Ext.data.Store && typeof validator === 'function') {
//             store.each(function (record, index, allRecords) {
//                 if (record.dirty) {
//                     dirtyLength++;
//                     recordPosition = validator(record, index);
//                     if (!(recordPosition.rowIdx >= 0 && recordPosition.colIdx >= 0)) {
//                         if (record.crudState == 'C') returnValue.newRecords.push(record.data);
//                         else if (record.crudState == 'U') returnValue.modifiedRecords.push(record.data);
//                     }
//                 }
//             });

//             if (store.removed.length > 0) {
//                 for (var i = 0; i < store.removed.length; i++) {
//                     returnValue.removedRecords.push(store.removed[i].data);
//                 }
//             }

//             returnValue.dirtyLength = dirtyLength;
//             returnValue.validLength = returnValue.newRecords.length + returnValue.modifiedRecords.length + returnValue.removedRecords.length;
//         }

//         return returnValue;
//     },

//     /**
//      * 스토어의 데이터 중 변경이 일어난 여부와 그 레코드의 필수입력 값 중 비어있는 Position 을 반환하는 함수
//      * TODO : validator 함수 대신 그리드 객체 받아서 컬럼 에디터의 allowBlank: true 일 경우 수행하도록 변경할 것
//      * TODO : 위 사항 변경 시 GridUtils.js 로 옮길 것
//      */
//     getInvalidRecord: function (store, validator) {
//         var me = this,
//             returnValue = { hasDirty: false, rowIdx: -1, colIdx: -1 };

//         if (store instanceof Ext.data.Store && typeof validator === 'function') {
//             store.each(function(record, index, allRecords) {
//                 if (record.dirty) {
//                     returnValue = validator(record, index);
//                     if (returnValue.rowIdx >= 0 && returnValue.colIdx >= 0) return false;
//                 }
//             });

//             if (store.removed.length > 0) returnValue.hasDirty = true;
//         }

//         return returnValue;
//     },

//     /** CodeStore 의 code에 해당하는 레코드 데이터를 반환한다. */
//     getCodeStoreRecords: function(code) {
//     	var codeStore = Ext.StoreMgr.get('CodeStore'),
// 	    	items = codeStore.getData().items;

// 	    var cbData = [ ];
// 	    for (var i = 0, l = items.length; i < l; i++) {
// 	      if (code === items[i].data.code) {
// 	        var children = items[i].data.children;
// 	        for (var j = 0, l2 = children.length; j < l2; j++) {
// 	          var item = children[j];
// 	          cbData.push({
// 	            code: item.code,
// 	            text: item.text,
// 	            value: item.value
// 	          });
// 	        }
// 	        break;
// 	      }
// 	    }
// 	    return cbData;
//     },

//     /** Desktop 앱정보를 반환한다. */
//     getDesktopAppInfo: function(moduleId) {
//       var items = Ext.StoreManager.get('DesktopStore').data.items;
//       for (var i in items) {
//          var item = items[i].data;
//          if (item.key === 'app') {
//            var apps = item.value;
//            for (var j in apps) {
//              var app = apps[j];
//              if (app.module === moduleId) {
//                return app;
//              }
//            }
//          }
//       }
//     }

// });