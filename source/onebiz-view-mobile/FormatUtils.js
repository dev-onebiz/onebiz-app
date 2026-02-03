/**
 * 공통 :: FormatUtils
 *
 * @author BNK시스템
 * @since 2019.
 * @version 1.0
 * @see
 *
 * 포멧팅을 위한 유틸입니다.
 *
 * << 개정이력(Modification Information) >>
 *
 *   수정일        수정자                     수정내용
 *  ------------  ---------                 --------------------------
 *  2020.05.22    지민영                    최초 생성
 */
Ext.define('BNK.FormatUtils', {
  singleton: true,
  alternateClassName: 'FormatUtils',

  /** 전화번호에 '-' 중간바 삽입 */
  phoneNumFormat:function(value){
    var result=value;
    if(value){
        if (value.length == 11)
          result = value.substring(0, 3) + '-' + value.substring(3, 7) + '-' + value.substring(7, value.length);
        else if (value.length == 10)
          result = value.substring(0, 3) + '-' + value.substring(3, 6) + '-' + value.substring(6, value.length);
        else if (value.length == 9)
          result = value.substring(0, 2) + '-' + value.substring(2, 5) + '-' + value.substring(5, value.length);
        else {
          result = value;
        }
      }
      return result;
  },

  /** 돈 포멧팅 */
  moneyFormat : function(money){
    if(money === null || money === undefined) return '';

    var str = String(money);
    result = str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    return result;
  },

  /** 카드번호 포멧팅 */
  cardNoFormat : function(cdno, masking){
    var formatCdno = '';

    if(!cdno) return ''; // cdno의 값이 없더라도 에러나지 않도록 유효성 추가.

    if(cdno.length == 16){
        
      if(masking){//마스킹 처리된 카드번호
          formatCdno = cdno.replace(/([0-9\*]{4})([0-9\*]{4})([0-9\*]{4})([0-9\*]{4})/, '$1-****-$3-$4');
      }
      else{
          formatCdno = cdno.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
      }
    }
    else {
      formatCdno = cdno;
    }

    return formatCdno;
  },

  /** 사업자번호 포멧팅 */
  bizNoFormat : function(num, type) {
    var formatNum = '';
    try{
         if (num.length == 10) {
           if (type == 0) {
                formatNum = num.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-*****');
           } else {
                formatNum = num.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
           }
         }
         else if(num.length == 13){
           if (type == 0) {
                formatNum = num.replace(/(\d{6})(\d{7})/, '$1-*******');
           } else {
                formatNum = num.replace(/(\d{6})(\d{7})/, '$1-$2');
           }
         }
         else{
           formatNum = num;
         }
    } catch(e) {
         formatNum = num;
         console.log(e);
    }
    return formatNum;
  },

  /** 주민등록번호 포매팅 */
  juminNoFormat: function(value){
    var juminLenMax = 13;
    var juminFirstLen = 6;

    if(!value || value.length != juminLenMax){
      return value;
    }
    var result =  value.substring(0, juminFirstLen) + '-' + value.substring(juminFirstLen, value.length);
    return result;
  },

  /** 계좌번호 포매팅
   * arg1: 은행코드
   * arg2: 계좌번호(순수숫자)
   * */
  accountNoFormat : function(bankCd, value){
    var me = this;
    var result = String(value);
    var format = '';
    var bankDefineType = '';

    //validation area -----
    if(!bankCd || !value){
      return '';
    }
    //end validation area -----

    //은행별 포매팅 SETTING AREA -----
    if (bankCd == '032') //부산은행
    {
      switch (result.length) {
      case 8:
        format =  "@@@@-@@@@";
        break;
      case 9:
        format =  "@@@@-@@@@-@";
        break;
      case 10:
        format =  "@@@-@@@-@@@@";
        break;
      case 11:
        format =  "@@@-@@@@-@@@@";
        break;
      case 12:
        format =  "@@@-@@-@@@@@@-@";
        break;
      case 13:
        format =  "@@@-@@@@-@@@@-@@";
        break;
      case 15:
        format =  "@@@-@@-@@@@@@-@@@@";
        break;
      default:
        break;
      }
    }

    else if (bankCd == '039') //경남은행
    {
      switch (result.length) {
      case 12:
        bankDefineType = result.substr(4, 2);
        if (isNaN(parseInt(bankDefineType)) == false){//숫자라면
          format =  "@@@-@@-@@@@@@@";
        } else{
          format =  "@@@-@@@-@@@@@@";
        }
        break;
      default:
        break;
      }
    } else if (bankCd == '088') //신한은행
    {
      switch (result.length) {
      case 10:
        format =  "@@@-@-@@@@@@";
        break;
      case 11:
        format =  "@@@-@@-@@@@@@";
        break;
      case 12:
        format =  "@@@-@@@-@@@@@@";
        break;
      default:
        break;
      }
    } else if (bankCd == '004') //국민은행
    {
      switch (result.length) {
      case 12:
        bankDefineType = result.substr(5, 2);
        if (bankDefineType == "18"){
          format =  "@@@@@@-@@-@@@@";
        }else{
          format =  "@@@-@@-@@@@-@@@";
        }
        break;
      case 14:
        format =  "@@@@@@-@@-@@@@@@";
        break;
      default:
        break;
      }
    } else if (bankCd == '081') //KEB하나은행
    {
      switch (result.length) {
      case 14:
        format =  "@@@-@@@@@@-@@@@@";
        break;
      default:
        break;
      }
    } else if (bankCd == '011') //농협은행
    {
      switch (result.length) {
      case 11:
        format =  "@@@-@@-@@@@@@";
        break;
      case 12:
        format =  "@@@@-@@-@@@@@@";
        break;
      case 13:
        format =  "@@@-@@@@-@@@@-@@";
        break;
      case 14:
        format =  "@@@@@@-@@-@@@@@@";
        break;
      case 15:
        format =  "@@@@@@-@@@-@@@@@@";
        break;
      default:
        break;
      }
    } else if (bankCd == '020') //우리은행
    {
      switch (result.length) {
      case 11:
        format =  "@@@-@@-@@@@@@";
        break;
      case 12:
        format =  "@@@-@@-@@@@-@@@";
        break;
      case 13:
        format =  "@@@@-@@@-@@@@@@";
        break;
      case 14:
        format =  "@@@-@@@@@@-@@-@@@";
        break;
      case 15:
        format =  "@@@-@@-@@@@@@-@@@@";
        break;
      default:
        break;
      }
    } else if (bankCd == '005') //외환은행
    {
      switch (result.length) {
      case 11:
        format =  "@@@-@@-@@@@@-@";
        break;
      case 12:
        bankDefineType = result.substr(4, 2);
        switch (bankDefineType) {
        case "11":
        case "13":
        case "15":
        case "16":
        case "18":
        case "19":
        case "22":
        case "23":
        case "24":
        case "26":
        case "29":
        case "33":
        case "38":
        case "39":
        case "42":
        case "47":
        case "70":
        case "73":
        case "74":
        case "75":
        case "77":
          format =  "@@@-@@-@@@@@-@@";
          break;
        default:
          format =  "@@@-@@@@@@-@@@";
          break;
        }
        break;
      case 13:
        format =  "@@@-@@@-@@@@@@-@";
        break;
      default:
        break;
      }
    } else if (bankCd == '003') //기업은행
    {
      switch (result.length) {
      case 11:
        format =  "@@@-@@-@@@-@@@";
        break;
      case 12:
        format =  "@@@-@@-@@@@-@@@";
        break;
      case 14:
        format =  "@@@-@@@@@@-@@-@@@";
        break;
      case 16:
        format =  "@@@-@@@@@@-@@-@@@@@";
        break;
      default:
        break;
      }
    } else if (bankCd == '002') //산업은행
    {
      switch (result.length) {
      case 14:
        format =  "@@@-@@@@-@@@@-@@@";
        break;
      case 15:
        format =  "@@@@@@@@@-@@-@@-@@";
        break;
      default:
        break;
      }
    } else if (bankCd == '027') //씨티은행
    {
      switch (result.length) {
      case 11:
        format =  "@@@-@@@@@-@@@";
        break;
      case 13:
        format =  "@@@-@@@@@-@@@-@@";
        break;
      default:
        break;
      }
    } else if (bankCd == '023') //SC제일은행
    {
      switch (result.length) {
      case 11:
        format =  "@@@-@@-@@@@@@";
        break;
      default:
        break;
      }
    } else if (bankCd == '031') //대구은행
    {
      switch (result.length) {
      case 11:
        format =  "@@@-@@-@@@@@@";
        break;
      case 12:
        format =  "@@@-@@-@@@@@@-@";
        break;
      case 13:
        format =  "@@@-@@-@@-@@@@@-@";
        break;
      case 14:
        format =  "@@@-@@-@@@@@@-@@@";
        break;
      default:
        break;
      }
    } else if (bankCd == '037') //전북은행
    {
      switch (result.length) {
      case 10:
        format =  "@@-@@-@@@@@@";
        break;
      case 12:
        format =  "@@@-@@-@@@@@@";
        break;
      case 13:
        format =  "@@@-@@-@@@@@@@";
        break;
      case 16:
        format =  "@@@-@@-@@@@@@@-@@@@";
        break;
      default:
        break;
      }
    } else if (bankCd == '034') //광주은행
    {
      switch (result.length) {
      case 10:
        format =  "@@-@@-@@@@@-@";
        break;
      case 11:
        format =  "@@@-@@-@@@@@-@";
        break;
      case 12:
        format =  "@@@-@@@-@@@@@@";
        break;
      default:
        break;
      }
    } else if (bankCd == '035') //제주은행
    {
      switch (result.length) {
      case 10:
        format =  "@@-@@-@@@@@@";
        break;
      case 14:
        format =  "@@@-@@-@@-@@@@-@@@";
        break;
      default:
        break;
      }
    } else if (bankCd == '071') //우체국
    {
      switch (result.length) {
      case 14:
        format =  "@@@@@@-@@-@@@@@@";
        break;
      default:
        break;
      }
    } else if (bankCd == '045') //새마을금고
    {
      switch (result.length) {
      case 13:
        format =  "@@@@-@@-@@@@@@-@";
        break;
      case 14:
        format =  "@@@@-@@@-@@@@@@-@";
        break;
      default:
        break;
      }
    } else if (bankCd == '007') //수협
    {
      switch (result.length) {
      case 11:
        format =  "@@@-@@-@@@@@@";
        break;
      default:
        break;
      }
    } else if (bankCd == '048') //신협
    {
      switch (result.length) {
      case 13:
        format =  "@@@@@-@@-@@@@@@";
        break;
      default:
        break;
      }
    }
    //END 은행별 포매팅


    //포맷이 있을 경우 변환.
    if(format){
      var tmpResult = format;
      for (var i = 0; i < result.length; i++) {
        tmpResult = tmpResult.replace("@", result[i]); //하나씩 바꾸어준다.
      }
        result = tmpResult;
    }

    return result;
  },
});