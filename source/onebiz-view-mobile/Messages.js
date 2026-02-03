/**
 * 메시지를 반환하기 위한 클래스
 *
 * 어플리케이션 초기화 처리시, TreeStore 형식으로 CodeStore에 저장된 코드를 Store 형식의 데이터로 반환한다.
 *
 * @author BNK시스템/손승범
 * @since 2017. 3. 2.
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *   수정일      수정자     수정내용
 *  ------------   ---------   --------------------------
 *   2017. 3. 2.   BNK시스템/손승범     최초 생성
 *
 * << 사용방법 >>
 * BNK.app.Messages.getMessage('ISYSCOM00000')
 * BNK.app.Messages.getMessage('ISYSCOM00000', '정상처리되었습니다.')
 * BNK.app.Messages.getMessage('ESYSCOM99999', ['111','222','333'])
 * BNK.app.Messages.getMessage('ESYSCOM99999', ['111','222','333'], '기본메시지')
 */
Ext.define('BNK.Messages', {
  singleton: true,
  alternateClassName: 'Messages',

  /**
   * 코드구분코드에 해당하는 코드 스토어를 반환한다.
   * 두번째 인자 argsOrDefaultMessage 는 아래의 타입에 따라 처리된다.
   * object 타입일경우, 메시지 format 에 사용되고
   * string 타입일경우, defaultMessage 로 반환한다.
   *
   */
  getMessage: function(code, argsOrDefaultMessage, defaultMessage) {
    var messageStore = Ext.StoreMgr.get('MessageStore'),
        message = null;

      for (let i = 0; i < messageStore.getData().items.length; i++) {
        var msg = messageStore.getData().items[i].data;
        if (code === msg.code) {
          message = msg.text;
          break;
        }
    }

    // 메시지가 MessageStore에 존재하지 않는 경우, defaultMessage 반환
    if (!message) {
        // 두번째 인자의 타입이 문자열일 경우, defaultMessage 로 사용
        if (typeof argsOrDefaultMessage == 'string') {
            return argsOrDefaultMessage;
        }
        return defaultMessage;
    }

    // 메시지가 존재하는 경우, format 처리된 문자열로 반환
    if (argsOrDefaultMessage) {
        for (let i = 0; i < argsOrDefaultMessage.length; i++) {
            message = message.replace('{' + i + '}', argsOrDefaultMessage[i]);
        }
    }
    return message;
  }

});