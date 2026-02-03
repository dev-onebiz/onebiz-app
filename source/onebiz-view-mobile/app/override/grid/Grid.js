Ext.define('BNK.override.grid.Grid', {
    override: 'Ext.grid.Grid',

    /** 스토어의 데이터를 JSON형식으로 반환한다. */
    getJsonAllRecords: function() {
          var me = this,
              jsonArray = [],
              store = me.getStore(),
              items = null;

        if (!store) return [];

        items = store.data.items;
        for (var i = 0, l = items.length; i < l; i++) {
            jsonArray.push(items[i].data);
        }
        return jsonArray;
    },

    /** 그리드 스토어에 데이터 설정 */
    /*
    setData : function(records) {
        var me = this,
            store = me.getStore() || Ext.create('Ext.data.Store');

        store.removeAll();

        // JSON 배열일 경우
        if (records instanceof Array) {
          store.loadData(records);
        }
        // JSON 객체일 경우
        else {
          var arr = [];
          arr.push(records);
          store.loadData(arr);
        }
        store.commitChanges();
    }
    */

});