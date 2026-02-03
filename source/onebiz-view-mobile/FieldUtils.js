/**
 * 공통 :: fieldUtils
 *
 * @author BNK시스템
 * @since 2018.
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *   수정일        수정자                     수정내용
 *  ------------  ---------                 --------------------------
 *  2018.                                    최초 생성
 *  2019.02.25.   BNK시스템/계장/천현아         addSearchFormEnterListener, enableKeys: true를 선언해 주어야 동작하는 component들이 있음.
 *  2019.08.19.   BNK시스템/계장/천현아         setCodeList 주석 정리(손팀장님 지원)
 */
Ext.define('BNK.util.FieldUtils', {
  singleton: true,
  alternateClassName: 'FieldUtils',

  /**
   * 콤보박스 필드에 code에 해당하는 코드스토어를 설정한다.
   * [천현아] Deprecate로 마킹돼 있었으나, 기존에 combobox code를 선언하기 전 쓰였던 func라 쓸 필요 없다는 선언이었음.
   *         허나 동적으로 만들어지는 애들이 있으므로, 사용해도 무방하다고 함.
   */
  setCodeList: function (comboboxObj, code, records, defaultCode) {
    comboboxObj.setStore(CodeUtils.getStore(code, records));
    // 기본값이 존재하는 경우, 코드 설정
    if (defaultCode) {
      comboboxObj.setValue(defaultCode);
    }
    // 레코드가 존재하는 경우, '전체' 를 선택하기 위한 처리
    else if (records) {
      comboboxObj.setValue('');
    }
  },

  /**
   * combobox 컴포넌트에 레코드 형식의 데이터를 스토어에 적재후 첫행을 설정한다.
   */
  setStore: function (comboboxObj, records, field) {
    if (records && records.length > 0) {
      var store = BNK.util.StoreUtils.newStore(records);
      field = field || 'value';
      comboboxObj.bindStore(store);
      // 첫행선택
      comboboxObj.setValue(store.getAt(0).get(field));
    }
    else{
      comboboxObj.onStoreUpdate();
    }
  },

  /**
   * 필드에 포커스를 설정한다.
   */
  setFocus: function (component) {
    component.focus(false, 200);
  },

  /** 검색폼에서 엔터키 입력시 조회처리를 한다. */
  addSearchFormEnterListener: function(ctrl, searchForm, func) {
    let items = searchForm.getForm().getFields().items;
    for ( let i in items) {
      if(!items[i].enableKeyEvents){ //2019.02.25. added by ha.cheon
        items[i].enableKeyEvents = true;
      }
      items[i].addListener('keydown', func, ctrl);
    }
  }
});