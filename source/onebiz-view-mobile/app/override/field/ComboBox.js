Ext.define('Override.form.field.ComboBox', {
    override: 'Ext.form.field.ComboBox',

    displayField: 'text',
    valueField: 'value',
    defaultValue : null,
    store: {},
    labelSeparator : '', // label 필드구분자 제거

    // 2018-03-05 화면초기화시 동적으로 store 에 데이터 설정시 추가가 안되어 queryMode 를 추가함
    queryMode: 'local',

    initialize: function() {
        var me = this;
        // code 값에 따라 codeStore 의 데이터를 조회하여 표시
        if (me.code) {
            var code = me.code,
                codeStore = Ext.StoreMgr.get('CodeStore'),
                items = codeStore.getData().items;

            if (!me.defaultText) {
                me.defaultText = '- 선   택 -';
            }

            var cbData = [{ text: me.defaultText, value: null }];
            for (var i = 0, l = items.length; i < l; i++) {
                if (code === items[i].data.code) {
                    var children = items[i].data.children;
                    for (var j = 0, l2 = children.length; j < l2; j++) {
                        var item = children[j];
                        cbData.push({
                            code: item.code,
                            text: item.text,
                            value: item.value
                        });
                    }
                    break;
                }
            }

            var store = Ext.create('Ext.data.Store', {
                fields: ['text','value'],
                data: cbData
            });

            me.setStore(store);
            if (!me.value && items.length > 0) {
                //suspendChangeEventWhenInit :: 초기값 세팅 시, change 이벤트 적용여부에 대한 값
                if(me.suspendChangeEventWhenInit){
                    me.suspendEvent('change');
                    me.setValue(store.getAt(0).get('value')); 
                    me.resumeEvent('change');
                }
                else{
                    me.setValue(store.getAt(0).get('value')); // 기본값적용이 안되네 ㅡㅡ;
                }
            }
        }

        // message 설정시 서버의 message 기능과 연계하여 i18n 적용을 위한 처리
        if (me.message) {
            let messageStore = Ext.StoreMgr.get('MessageStore'),
                items = messageStore.data.items;
            for (let i in items) {
                let item = items[i].data;
                if (item.code === me.message && item.text) {
                    me.fieldLabel = item.text;
                    break;
                }
            }
        }

        me.callParent();
    }
});