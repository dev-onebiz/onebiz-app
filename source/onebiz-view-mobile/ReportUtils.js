/**
 * 공통 :: 레포트 공통 유틸
 *
 * @author BNK시스템/기타/이지현
 * @since 2019.
 * @version 1.0
 * @see
 *
 * << 개정이력(Modification Information) >>
 *
 *   수정일        수정자                     수정내용
 *  ------------   ---------                 --------------------------
 *   2019.02.06    BNK시스템/기 타/이지현   최초 생성
 *   2019.03.08    BNK시스템/대 리/하동훈   IE 로딩화면에서 넘어가지 않는 문제 수정
 *   2019.10.11    BNK시스템/대 리/하동훈   레포트 출력시 rowId(Seq) 값이 최초 0인 경우 필수값 누락으로 처리되어 임시 대응
 *   2021.03.12    BNK시스템/매니저/김태환   KTH2021031201 viewer_mode : 레포팅 모드 주석추가
 */

Ext.define('BNK.util.ReportUtils', {
  singleton : true,
  alternateClassName : 'ReportUtils',

  /**
   * 레포트 연결시 주의,참고할 것 !!
   * 1. 다건레포트를 출력할때는 총 두가지 방법이 있다.(현재,출력용만 가능)
   *    레포트의 성향에 따라서 선택하면 된다.
   *
   * 2. 이미지파일을 전달하고 싶을때는 URL 형식으로 넘겨주며, PNG,GIF 형식만 가능하다.
   *    ex) imgURL:'http://localhost:8080/UBIFORM/UView5/img.png' 파라미터 전달
   *
   * 3. 파라미터의 종류에는 2가지가 있다.
   *    가.루트파라미터
   *       -쿼리에 필요한 파라미터 , 레포트에직접파라미터를 넘겨줄때
   *    나.데이터셋파라미터
   *       -데이터셋 안으로 파라미터를 넘겨줄때
   */



  /** 레포트를 출력하는 함수.  //단건은 인사서류 참고, 다건은 연봉일괄출력 참고
   *
   * 파라미터 설명
   * projectName : 서식폴더이름 (필수)
   * formName : 서식이름 (필수)
   * rowId : 키 값 (필수)
   * rootParam : 최상위 파라미터 (파라미터 안에 키값 필수) (필수)
   * dataSetParam : 데이터셋 파라미터 (전처리 필요) (필수)
   * viewer_mode : 레포팅 모드 [ON : ReadOnly(수정불가), OFF : Read, Write(수정가능)] - KTH2020031201
   * windowoption : 팝업윈도우옵션 설정 (디폴트:아래참고)
   * */
  goReport : function(projectName,formName,rowId,rootParam,dataSetParam,viewer_mode,windowoption){
//          viewer_mode="ON",windowoption='location=0, directories=0,resizable=1,status=0,toolbar=0,menubar=0, width=1280px,height=650px,left=0, top=0,scrollbars=0' IE : 디폴트 파라미터 문법 사용불가.
    try{
        //디폴트값 넣어주기
      if(!viewer_mode) viewer_mode="OFF";
      if(!windowoption) windowoption='location=0, directories=0,resizable=1,status=0,toolbar=0,menubar=0, width=1280px,height=650px,left=0, top=0,scrollbars=0';

      var ubformPath = Property.REPORT_URL;
        
      //필수 파라미터
      if(!projectName || !formName || (!rowId && rowId !== 0) || !dataSetParam){
        console.log("파라미터를 확인하여주세요.");
        return false;
      }
      /** 부모 파라미터*/
      var _params = {
        projectName : projectName,
        formName : formName,
        publisher : "user",
        CLIENT_VIEWER_MODE : viewer_mode,
//         UB_MENUCODE : 't_000,r_000'
      };
      for (var rootParamData in rootParam){
        _params[rootParamData] = rootParam[rootParamData];
      }

      //데이터셋 List에 생성된 DataSet 추가 (context : 필수값 )
      var datasetList = dataSetParam;
      var principal = SecurityUtils.getPrincipal();
      datasetList.context = JSON.stringify([ {
        COM_CMM_CMGRP_ID : principal.cmgrpCd ,
        COM_CMM_SYSTEM_ID : principal.sysId ,
        PJT_NM : projectName,
        FRM_ID : formName,
        USER_ID : principal.hrHrpmEmpId,
        ROW_ID : rowId
      } ]);

      for ( var datasetValue in datasetList) {
        _params[datasetValue] = encodeURIComponent(datasetList[datasetValue]);
      }
      //context 는 레포트 저정하는 로직에서 필요한 값들을 모아놓은 파라미터인다. (필수)
      //레포팅 연결
      var name = "UBF_" + new Date().getTime();
      var form = document.createElement("form");
      form.setAttribute("method", "post");
      form.setAttribute("action", ubformPath);
      form.setAttribute("target", name);
      for ( var i in _params) {
        if (_params.hasOwnProperty(i)) {
          var input = document.createElement('input');
          input.type = "hidden";
          input.name = i;
          input.value = encodeURI(_params[i]);
          form.appendChild(input);
        }
      }
      document.body.appendChild(form);
//       var popup = window.open("", name, windowoption);
//       form.submit();
//       document.body.removeChild(form);

//       return popup; //팝업창 꺼진 후 처리를 할수있도록 팝업객체리턴
        return form;


    }catch(e){
      console.log('레포트공통 에러발생:'+e);
      return false;
    }

  },

  /** 다건 레포트를 출력하는 함수 2 (출력만 가능)    = 개발중
  *
  * 파라미터 설명
  * projectName : 서식폴더이름 (필수)
  * formName : 서식이름 (필수)
  * rootParam : 최상위 파라미터 (파라미터 안에 키값 필수) (필수)
  * dataSetParam : 데이터셋 파라미터 (전처리 필요) (필수)
  * viewer_mode : 레포팅 모드(수정가능,수정불가) (디폴트:수정불가)
  * windowoption : 팝업윈도우옵션 설정 (디폴트:아래참고)
  * */
//  goReportList : function (projectName,formName,rowIds,rootParam,dataSetParam,viewer_mode="ON",
//      windowoption ='location=0, directories=0,resizable=1,status=0,toolbar=0,menubar=0, width=1280px,height=650px,left=0, top=0,scrollbars=0'
//        ){
//    try{
//
//      for(var i=0; i < chk; i++ )
//      {
//        //레포팅이 없으면 출력되지 않는다.
//        if(!gridSelection[i].get('comFrmDatasetId')) {
//          continue;
//        }
//        jobj = new Object();
//
//        jobj.projectName = "BNK";
//        jobj.formName = "Salaryagreement02";
//        var _parameterValue = gridSelection[i].id+'';
//        jobj.parameter = {"hrHromSalCtrId": _parameterValue};
//        jobj.CLIENT_VIEWER_MODE="ON";
//        jArray.push(jobj);
//      }
//      var _params ={};
//      _params.UB_FORMLIST_INFO = encodeURIComponent( JSON.stringify(jArray)  ); // URI Encode처리
//
//        var _url = 'http://ubiform.bnksys.co.kr:8080/UBIFORM/UView5/index.jsp'; //ip주소 사용시
//        var d = new Date();
//        var n = d.getTime();
//
//        var form = document.createElement("form");
//
//        form.setAttribute("method", "post");
//        form.setAttribute("action", _url);
//        form.setAttribute("target","_blank");
//
//        for (var i in _params)
//        {
//            if (_params.hasOwnProperty(i))
//            {
//              var param = document.createElement('input');
//              param.type = 'hidden';
//              param.name = i;
//              param.value = encodeURI( _params[i] );
//              form.appendChild(param);
//            }
//        }
//
//        document.body.appendChild(form);
//        form.submit();
//        document.body.removeChild(form);
//
//        return popup;
//
//    }catch (e) {
//      console.log('레포트공통 에러발생:'+e);
//      return false;
//    }
//
//
//
//  },
   //데이터셋 파라미터를 넘겨주기전 전처리
   convertDataSetParmeter :function (parameter){
     try {
      if(!parameter){
        console.log('파라미터를 넘겨주세요');
      }

      var dataList = parameter;

      for ( var datasetValue in dataList) {
        //JSON.stringify 함수사용
        dataList[datasetValue] = JSON.stringify([dataList[datasetValue]]);
      }
      return dataList;

    } catch (e) {
      console.log('레포트공통 에러발생:'+e);
      return false;
    }

  },

  //데이터셋 파라미터를 넘겨주기전 전처리 [리스트형식]
  convertListDataSetParmeter :function (parameter){
    try {
     if(!parameter){
       console.log('파라미터를 넘겨주세요');
     }

     var dataList = parameter;

     for ( var datasetValue in dataList) {
       //JSON.stringify 함수사용
       dataList[datasetValue] = JSON.stringify(dataList[datasetValue]);
     }
     return dataList;

   } catch (e) {
     console.log('레포트공통 에러발생:'+e);
     return false;
   }

 }

});