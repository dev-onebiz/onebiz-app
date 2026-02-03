/**
 * 콤보박스 유틸
 * [REVISION]
 * DATE         AUTHOR              REMARK
 * -----        -------------       ------------------------
 * 2019.07.02.  BNK시스템/계장/천현아   최초 생성.
 * 2019.07.10.  BNK시스템/계장/천현아   makeCustomCbx, 기본 텍스트 설정여부 설정값 추가.
 * 2020.05.28.  BNK시스템/계장/천현아   makeCustomCbx, noNeedAutoFirstSelect/autoSetValueSuspendEvent 설정값 추가.
 * 2020.06.22.  BNK시스템/계장/천현아   setSelectFirstItem, 동작방식 수정
 * 2020.08.14.  BNK시스템/파트너/천현아  makeTmpStore 추가.
 * 2021.02.22.  BNK시스템/파트너/한　준  setFirstDefault 추가
 * 2021.04.14.  BNK시스템/파트너/서무성  setValueWithSuspendFlag 추가
 *
 */
Ext.define('BNK.ComboboxUtils', {
  singleton : true,
  alternateClassName : 'ComboboxUtils',

  /**
   * Combo박스에서 선택된 값을 반환한다.
   *
   * param1: object - 콤보박스 object(기본정보 들고오기 위함)
   * param2: arrayList - store구성이 될 item을 넘긴다.
   * param3: (option)arrayList  -cbData를 구성할 key를 던져준다.
   */
  makeCustomCbx : function(obj, items, cbDataKeys) {
    var me = this;

    //[start] default text setting
    if (obj.up('exsearchform') || (me.reference && (String(me.reference).toLowerCase().indexOf('search') > -1 || String(me.reference).toLowerCase().indexOf('sch')) > -1)) {
      me.defaultText = Constants.comboBoxText.defaultText;
    } else {
      if (me.hasOwnProperty('readOnly') && me.readOnly == true) {
        me.defaultText = '';
        me.emptyText = '';
      } else {
        me.defaultText = Constants.comboBoxText.editableDefaultText;
      }

    }
    //[end] default text setting

    //[start] make codeStore
    var cbData = [];
    if(!obj.noNeedDefault){
      cbData = [ {
        text : me.defaultText,
        value : ''
      } ];
    }

    if (items) {
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var tmpCbData = {};

        if (cbDataKeys) {
          for ( var j in cbDataKeys) {
            var key = cbDataKeys[j];
            tmpCbData[key] = item[key];
          }
        } else {
          tmpCbData = {
            text : item.text,
            value : item.value
          };
        }

        cbData.push(tmpCbData);
      }
    }

    var tmpFields = cbDataKeys ? cbDataKeys : [ 'text', 'value' ];
    var store = Ext.create('Ext.data.Store', {
      fields : tmpFields,
      data : cbData
    });
    //[end] make codeStore

    //[start] bind store
    obj.setStore(store);
    //[end] bind store

    //set default value
    var defaultVal = '';
    if(obj.noNeedDefault && !obj.noNeedAutoFirstSelect){
      me.setSelectFirstItem(obj);
    }
    else{
      me.setValueWithSuspendFlag(obj, defaultVal);
    }

  },

  /** 콤보박스 안의 첫번째 선택. */
  setSelectFirstItem : function(obj) {
    var me = this;

    var firstRec = obj.getStore().getAt(0);
    if(firstRec){
      defaultVal = firstRec.data.value;
    } else {
      defaultVal = '';
    }

    me.setValueWithSuspendFlag(obj, defaultVal);
  },

  /**
   * suspendEvent 관련 Flag를 확인 후, setValue를 해준다.
   * setValue 시, flag값을 확인하여 이벤트 동작 여부 설정가능 (suspend)
   *
   * param1 : obj - 콤보박스 object(기본정보 들고오기 위함)
   * param2 : value - 설정해줄 값(value)
   */
  setValueWithSuspendFlag : function(obj, value){

    if(obj.autoSetValueSuspendEvent === true){
      obj.suspendEvents();
      obj.setValue(value);
      obj.resumeEvents();
    }
    else {
      obj.setValue(value);
    }
  },

  /**
   * Combobox에 해당 값만을 스토어에 넣는다.
   * (복수 값은 tagfield를 위해 구현해둠.)
   *
   * param1: object - 콤보박스 object(기본정보 들고오기 위함)
   * param2: vals - store구성이 될 item을 넘긴다.
   * param3: (option)isAccum  - store에 현재까지 입력된 누적시킬 것인지, 아니면 입력된 값만 스토어에 넣을지 선택.
   */
  makeTmpStore : function(obj, vals, isAccum){
    var me = this;

    var item = obj;
    if(!isAccum){ // 누적안 되도 되면 스토어 다 닦고 시작함.
      item.getStore().clearData();
    }
    //TODO: 현재 구현은 누적 안 된다는 가정하에임. 누적= true일 때는 원래있는 store에 더 데이터를 더해야 함. (refs.cgpList.getStore().data.items 안에서 for문 돌아야 할 듯).
    var cbData = [];
    if((typeof vals).toLowerCase() == 'object'){ //array 형식으로 넘어왔을 때.
      for ( var i in vals) {
        tmpCbData = {
            text : vals[i],
            value : vals[i]
        };
        cbData.push(tmpCbData);
      }
    } else {
      tmpCbData = {
          text : vals,
          value : vals
      };
      cbData.push(tmpCbData);
    }

    me.makeCustomCbx(item, cbData);
    item.setValue(vals);//단건이든 다건이든 알아서 해줌.
  },


  /**
   * Combobox 첫번째 값에 default 값을 설정한다
   *
   * param1: object - 콤보박스 object(기본정보 들고오기 위함)
   * param2: defaultVal - default value값 없으면 ''
   * param3: defaultTxt - default txt값   없으면 '전체'
   */
  setFirstDefault : function(obj, defaultVal, defaultTxt ) {
    var store = obj.getStore();

    var comboboxStore = [];
    if(Ext.isEmpty(defaultVal)){
      defaultVal = ''; //빈값
    }
    if(Ext.isEmpty(defaultTxt)){
      defaultTxt = Constants.comboBoxText.defaultText; //전체
    }
    comboboxStore[0] = { value : defaultVal, text :defaultTxt };
    for ( var i in store.data.items) {
      comboboxStore.push(store.data.items[i]);
    }
    obj.setStore(comboboxStore);
  },

});
