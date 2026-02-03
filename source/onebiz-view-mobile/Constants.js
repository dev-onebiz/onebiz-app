/**
 * 상수클래스
 * */
Ext.define('BNK.Constants', {
  singleton : true, 
  alternateClassName : 'Constants',

  /** 결재 */
  sanction : {
    /** 결재코드 */
    // 기안
    DRAFT : '01',
    // 대기
    WAIT : '02',
    // 예고
    NOTICE : '03',
    // 결재
    SANCTION : '04',
    // 반송
    SEND_BACK : '05',
    // 회수
    WITHDRAWAL : '06',
    // 담당자접수
    RECEIPT : '07',
    // 담당자회수
    CGP_WITHDRAWAL : '08',

    /** 결재함코드 */
    // 예고함(91)
    NOTICE_BOX : '91',
    // 미결함(92)
    PENDING_BOX : '92',
    // 진행함(93)
    PROGRESS_BOX : '93',
    // 완료함(94)
    COMPLETED_BOX : '94',
    // 반송함(95)
    RETURN_BOX : '95',
    // 담당자접수함(96)
    RECEIPT_BOX : '96',
    // 부서문서함(97)
    DEPT_COMPLETED_BOX : '97',
    // 담당자완료함(98)
    CGP_COMPLETED_BOX : '98',
    // 회수함(99)
    WITHDRAWAL_BOX : '99'
  },

  /** 상태코드  / 2018.11.21. added by ha.cheon */
  stcd : {
    //정상
    NORMAL : '01',
    //결재
    OUTSTANDING : '71',
    //미확인
    NEED_CHECK : '98',
    //삭제
    DELETE : '99'
  },

  /** 연수 상태코드  / 2019.01.30. added by ha.cheon */
  sttnAplStcd : {
     //신청
     APPLY : '01',
     //진행
     PROCEEDING : '02',
     //완료
     COMPLETED : '03',
     //취소
     CANCELED : '99'
  },

  /** 권한정보 */
  roles : {
    ROLE_SUPER : 'ROLE_SUPER',//슈퍼관리자권한

    ROLE_HR_ADMIN : 'ROLE_HR_ADMIN', //인사관리자권한

    ROLE_HR_CGP : 'ROLE_HR_CGP', //인사담당자권한

    ROLE_HR_DLDR : 'ROLE_HR_DLDR', //인사일반부서장권한

    ROLE_HR_GAFR : 'ROLE_HR_GAFR', //인사서무담당자권한

    ROLE_HR_OFCR : 'ROLE_HR_OFCR', //인사임원권한(대표, 경영기획본부장, IT사업본부장, 감사)

    ROLE_HR_OFCR2 : 'ROLE_HR_OFCR2', //인사임원권한(대표, 경영기획본부장)

    ROLE_HR_USER : 'ROLE_HR_USER', //인사사용자권한
    
    ROLE_HR_DVLP : 'ROLE_HR_DVLP', //인사개발자

    ROLE_HR_NEW : 'ROLE_HR_NEW',//인사신규입사자
      
    /* 예산 */
    ROLE_BG_ADMIN : 'ROLE_BG_ADMIN', //예산관리자 권한

    ROLE_ANONYMOUS : 'ROLE_ANONYMOUS' //익명사용자권한

  },
    
  /** 책임자 직책코드 */
  managerEmpeRsbCds : [
                      "001", //부장
                      "002", //팀장
                      "005", //대표
                      "006", //본부장
                      "007", //감사
                      "008", //부장직무대행
                      "009", //팀장직무대행
                      "010", //부장대우
                      "011", //단장
                      "012", //실장
                      ],

  /** 여부코드  / 2018.11.29. added by ha.cheon */
  yesNo : {
    //부
    NO : '0',
    //여
    YES : '1'
  },

  /** exgrid 데이터 스타일 / 2018.12.10. added by ha.cheon*/
  dataStyle : {
    //데이터 타입별
    LETTER : {//문자, 기타
      align : 'left'
    },
    CODE : { //코드성 데이터
      align : 'center',
      width : 100
    },
    NUMBER : {//숫자
      align : 'right'
    },
    DATE : { //날짜
      align : 'center',
      width : 100
    },
    // 데이터별
    ROW_NUMBER : {//자동 rownumb
      text : '순번',
      align : 'center',
      width : 50
    },
    EMPE_NO : {// 사번
      text : '사번',
      align : 'center',
      width : 80
    },
    EMPE_NM : {//이름
      text : '이름',
      align : 'center',
      width : 100
    },
    STNM : { //상태코드명
      text : '상태',
      align : 'center',
      width : 80
    },
    CTPL : { //전화번호
      text : '전화번호',
      align : 'center',
      width : 150
    },
    DPNM : { //부서명
      text : '부서명',
      align : 'left',
      width : 110
    },
    ERP_CD : {//ERP 코드
      text : 'ERP코드',
      align : 'right',
      width : 100
    },
    PSIT_NM : { //직위명
      text : '직위',
      align : 'center',
      width : 100
    },
    JGD_NM : { //직급명
      text : '직급',
      align : 'center',
      width : 100
    },
    RSB_NM : { //직책명
      text : '직책',
      align : 'center',
      width : 100
    },
    BSI_ZON_NO : {//우편번호
      text : '우편번호',
      align : 'center',
      width : 80
    },
    RN_JUSO : { //주소
      text : '주소',
      align : 'left',
      width : 300
    },
    RMRK_CNTN : {
      text : '비고',
      align : 'left',
      minWidth : 300
    }
  },

  /** 사원이름 / 2018.12.20. added by ha.cheon */
  empeNm : {
    NO_DATA : '결과없음',
  },

  /** 화면권한옵션 / 2018.01.07. added by han */
  level : {
    LEVEL1 : 'LEVEL1',//Level1 권한레벨 : 부서별 조회(서무담당,부서장)
    LEVEL2 : 'LEVEL2',//Level2 권한레벨 : 본인 조회
    LEVEL3 : 'LEVEL3',//Level3 권한레벨 : 전체 조회
    LEVEL4 : 'LEVEL4',//Level4 권한레벨 : 부서별 조회 : 부서장
    LEVEL5 : 'LEVEL5',//Level5 권한레벨 : 전체 조회 : 인사경영임원(대표,경영기획본부장)
    LEVEL6 : 'LEVEL6',//Level6 권한레벨 : 전체 조회 : 인사책임자/인사담당자/임원전체
    LEVEL7 : 'LEVEL7',//Level7 권한레벨 : 전체 조회 : 예산관리자
  },

  /** 발령구분코드 / 2018.12.26. added by ha.cheon */
  appDvcd : {
    HIRE : '01', //채용발령
    DISMISSION : '02', //면직발령
    PROMOTION : '04', //승진발령
    TRANSFERENCE : '05',//전보발령
    CONCURRENT : '06',//겸직발령
    LEAVE : '07',//휴직발령
    REINSTATEMENT : '08'//복직발령
  },

  /** 발령상세구분코드 / 2018.12.26. added by ha.cheon */
  appDtlDvcd : {
    HIRE : {
      PERIODICALLY_RECRT : '01',//정기채용
      ANYTIME_RECRT : '02', //수시채용
      PERMANENT_RECRT : '03', //정규직채용
      CONTRACT_RECRT : '04', //계약직채용
      CONTRACT_EXTENSION : '05' //계약연장 
    },
    DISMISSION : {

    },
    PROMOTION : {
      POST_POSITION : '01',//직위승진
      RESPONSIBILITY : '02',//직책승진
      PROMOTION_AS_POSSIBLE : '03',//가급
      SPECIAL : '04',//추서승진
      NEW : '99', //신규
    },
    TRANSFERENCE : {
      RESPONSIBILITY_RELEASE : '04'//직책해제
    },
    CONCURRENT : {
      CONCURRENT : '01',//겸직발령
      DISPATCH : '02'//파견근무
    },
    LEAVE : {
      PETITION : '01',//청원휴직
      INJURY : '02',//인병휴직
      ORDERED : '03',//명령휴직
      PARENTAL : '04'//육아휴직
    },
    REINSTATEMENT : {
      DISPATCH : '01',//파견복직
      CONCURRENT : '02',//겸직복직
      LEAVE : '03'//휴직복직
    }
  },

  /** 재직상태구분코드 / 2018.12.26. added by ha.cheon */
  wkingDvcd : {
    WORK_NORMAL : '10', //재직
    WORK_CONCURRENT : '11', //재직(겸직)
    WORK_DISPATCH : '12', //재직(파견)
    LEAVE_PETITION : '20', //휴직(청원)
    LEAVE_INJURY : '21', //휴직(인병)
    LEAVE_ORDERD : '22', //휴직(명령)
    LEAVE_PARENTAL : '23', //휴직(육아)
    SUSPENSION : '30', //정직
    RETIREMENT : '40' //퇴직
  },

  /** 회사이름 / 2018.01.23. added by han */
  compNm : {
    COMP_NM : '(주)BNK시스템'
  },
    
  /*신청구분코드*/
  wrkAplDvcd :{
    APPLY : '01',
    CANCEL : '02'
  },
    
  /** 신청상세상태 구분코드 INB025*/
  aplStcd : {
    PROGRESS : '10',
    /** 진행: 결재가 진행중인 상태 */
    PROGRESS_APPLY : '11',
    /** 진행(신청) */
    SEND_BACK : '20',
    /** 반려: 결재를 반려한 상태 */
    SEND_BACK_CGP : '21',
    /** 반려(담당): 담당자가 결재를 반려한 상태 */
    SEND_BACK_DEPT : '22',
    /** 반려(부서): 부서가 결재를 반려한 상태 */
    WITHDRAWAL : '30',
    /** 회수: 결재 중 회수한 상태. */
    WITHDRAWAL_SELF : '31',
    /** 회수(본인) */
    TEMP_SAVE : '80',
    /** 임시저장: 잠시 데이터를 저장하는 상태. */
    COMPLETED : '90',
    /** 완료: 결재 완료 상태. */
    COMPLETED_APPLY : '91'
  /** 완료(신청): 신청에 대한 결재가 완료된 상태 */
  },
       
  /** 근태_근무지기본_근무지기본ID */
  wkplcId: {
    EMPTY_WKPLC : '0' //근무지없음
  },
    
  /** 근태_근무지기본_근무지구분코드 */
  wkplcDvcd: {
    MAIN_WKPLC : '10', //근무지
    EXTRA_WKPLC : '11' //근무지2(추가근무지)
  },
    
  /** 근태_근무지변경_근무지변경신청구분 HWM019*/
  wplcAplDvcd : {
    WK_PLC : '01', //근무지변경
    WK_DT : '02'  //근무일정변경
  },
  
  /* 근태_근무체크_유형구분 **/
  workCheckDvcdNm : {
    ATTENDENCE : 'ATTENDENCE', //출근
    OVT_CHECK : 'CHECK'		   //근무확인
  },
    
  /** 예산:집행:신청구분코드 */
  aplKndcd : {
    CARD : '01', //법인카드
    CSH_RCT : '02', //현금영수증
    TXINV : '03', //세금계산서
    ETC_RCT : '04', //기타영수증
    XPNS : '05', //여비
  },
    
  /** 예산:집행:지출증빙종류코드 */
  nfcmEvidKndcd : {
    CARD : '01', //법인카드
    CSH_RCT : '02', //현금영수증
    TXINV : '03', //세금계산서
    ETC_RCT : '04', //기타영수증
    FXAMT : '05', //정액지급
    TAXFREE_TXINV : '06', //계산서(면세)
  },
    
  /** 스크래핑 처리 여부 */
  /** select는 무조건 '부' */
  /** save할때는 - 취소신청서 : '부'/ 신청서 : '여'로 세팅함. */
  YesNoType : {
    Y : '1',
    N : '0'
  },
    
  /** 마감일자 체크여부 */
  fndcYn : {
    Y : 'Y',
    N : 'N'
  },  
  
  /** 계정과목 */
  xpnitKeyCd : {
    CONFERENCE : '040', //회의비
    BUSI_PROMOTION : '030', //업무추진비
    SUPPLIES_EXPENSES : '038'	// 소모품비
  },
    
  /** 예산-경비노트_내부직원 외부직원 구분*/
  stfDvcd : {
    IN : '01', //내부
    OUT : '02', //외부
  },
    
  /** 신청 구분코드 */
  aplDvcd : {
      APPLY : '01',
      CANCLE : '02'
  },
    
  /** 예산: 예산거래처상세구분코드 ( BGM006 ) */
  bcncDvcd : {
    COMP : '10', //회사
    GROUP_COMP : '12', //그룹계열사
    PRBZ : '30', //개인사업자
    INNER_EMPE : '45', //사내직원
    ETC : '40', //기타
    FN_COMP : '50', //금융
  },
    
  /** 집행신청대상자 선택 기준콤보박스 */
  nfcmAplyTrgtSttCbx : {
    BSNS : 'bgBudcBsnsId',
    XPNIT: 'xpnitKeyCd'
  },
    
  /** 배정거래구분코드 */
  asnTrnsDvcd : {
    ASSIGN_CANCEL : '998', //배정취소
    TOTAL_AMOUNT : '999' //배정총액
  },
    
  /** 예산_경비/자본예산 구분*/
  bgDvcd1 : {
    EXPN : '1', //경비예산
    CPTL : '2', //자본예산
  },
    
  /** combobox 관련 */
  comboBoxText : {
    defaultText : '전  체',//기본 text
    editableDefaultText : '- 선   택 -' //editable일때 기본 text
  },
    
  /** 개인화 메시지 구분코드 */
  msgDvcd : {
    REPT_MSG : "1",  // 보고 (연장근무,휴일근무,출장보고 등)
    BRDY_MSG : "2",  // 부서생일
    ETCO_MSG : "3",  // 입사일 기준 n주년 축하말
    TIME_MSG : "4"   // 시간대별 인삿말      
  },
    
  /** 푸시 수신 상태코드 */
  rvStcdType : {
      RV_BEFORE : "01",			// 발송전
      RV_COMPLETE : "02"		// 발송완료
  },
    
  /** 알림구분코드  */
  tasTrsDvcd : {
      PUSH : '60'		// push
  },
    
  /** 액션구분코드 (TAS006)  */
  msgChkActDvcd : {
      NORMAL : '01',		// 일반
      APPROVAL : '02'		// 결재
  },
    
  /** 포맷구분코드 (TAS005)  */
  pushFmtDvcd : {
      TXT : '01',		// text
      IMG : '02',		// image
      OUTER_URL : '03',	// outerUrl
      INNER_URL : '04'	//innerUrl
  },
    
  /** 확장여부코드  / 2019.03.04. added by ha.cheon */
  exYesNo : {
    NO : {
      LETTER : 'N'
    },
    YES : {
      LETTER : 'Y'
    }
  },
  
  /** 근태_보정구분코드  */
  crrDvcd : {
    USER_CRR : '10', //사용자신청
    ADMIN_CRR : '20', //관리자
  },
    
  /** 레코드 상태 */
  crudState : {
    CREATE : 'C',
    READ : 'R',
    UPDATE : 'U',
    DELETE : 'D',
  },
    
  // BIZ DEFAULT AREA *****
  /** tabPanel 관련 */
  tabPanel : {
    TAB_MAX_COUNT : 10
  },

  /** 기본 데이터 */
  defaultData : {
    EDT : '29991231'
  },

  /** 응답데이터 키 */
  respKey : {
    FAIL_REASON : 'failRsn',
    RESULT_DATA : 'resultData'
  },
  // END BIZ DEFAULT AREA *****

  /* START 회의실 예약 AREA*/

  /* 예약 상태 */
  booStcd : {
    BOO : '10', //예약
    BOO_CANCLE : '19', //예약취소
  },

  /* END 회의실 예약 AREA*/

});