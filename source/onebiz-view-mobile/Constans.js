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
    WITHDRAWAL_BOX : '99',
      

      
      
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

    ROLE_HR_OFCR : 'ROLE_HR_OFCR', //인사임원권한

    ROLE_HR_USER : 'ROLE_HR_USER', //인사사용자권한

    ROLE_HR_NEW : 'ROLE_HR_NEW',//인사신규입사자

    ROLE_ANONYMOUS : 'ROLE_ANONYMOUS' //익명사용자권한

  },

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
    LEVEL1 : 'LEVEL1',//Level1 권한레벨이 부서별 조회(서무담당,부서장) 일 경우  (예:근무경력)
    LEVEL2 : 'LEVEL2',//Level2 권한레벨이 본인만 조회 일 경우  (예: 가족정보,연봉정보)
    LEVEL3 : 'LEVEL3',//Level3 권한레벨이 전체   조회 일 경우  (예: 조직조회)
    LEVEL4 : 'LEVEL4',//Level4 권한레벨이 부서별 조회(부서장) 조회 일 경우  (예: 학력정보,포상징게)
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
      //HR- 근태관리 area -----
  /** 근태_일자구분코드 */
  dateDvcd : {
    THE_DAY : '10', //당일
    PREV_DAY : '20', //전날
    PPREV_DAY : '21', //전전날
    NEXT_DAY : '30', //다음날
    NNEXT_DAY : '31' //다다음날
  },

  /** 근태_근태기준구분코드  */
  criDvcd : {
    NORMAL_WRK: '10',  //일반근로
    NORMAL_WRK_OP: '20',  //일반근로(O.P)
    SELECTION_WRK: '30',  //선택근로
    FLEXIBLE_WRK: '40',  //탄력근로
  },

  /** 근태_보정구분코드  */
  crrDvcd : {
    USER_CRR  : '10',  //사용자신청
    ADMIN_CRR : '20', //관리자
  },

  /** 근태_신청구분코드  */
  wrkAplDvcd : {
    APPLY  : '01',  //신청
    CANCEL : '02', //취소신청
  }
});