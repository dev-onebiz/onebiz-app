Ext.define('BNK.Property', {
    singleton: true,
    alternateClassName: 'Property',

    PROFILE              : 'P',                           // F:파일, L:로컬, T:개발, V:검증, P:운영
    MOBILE_VERSION       : '1.4.31',   					  // 모바일버전

    SYSTEM_NAME          : '안내',
    DEVICE               : 'MB',                          // PC:컴퓨터, TB: 태블릿, MB: 모바일
    CMGRP_CD             : '09',                          // 그룹사구분코드 01:부산은행
    SYS_CD               : 'INBIZ',                       // 시스템코드
    JWT_TOKEN_NAME       : 'INBIZ_JWT_TOKEN',             // JWT 토큰명
    DEFAULT_PAGE_SIZE    : 10,	                          // ExGrid의 pageSize 에 설정됨
    ROUTE_LOGIN          : 'BNK.view.common.LoginV1',       // 로그인화면 경로
    ROUTE_HOME           : 'MainV1',                     // 홈화면 경로
    PROTOCOL             : 'HTTP',
    HTTP_HEADERS_PREFIX  : '{0}',
    DATA_TYPE            : 'JSON',
    FILE_URL             : '/file',
    DOWN_URL             : '/down/',
    API_URL              : null,                          // 서버API URL
    IS_DEBUG             : false,                          // 디버그모드
    UPDATE_URL           : 'https://bnktoms.bnksys.co.kr/mobile/app/onebiz ', // 앱업데이트 URL
    MOBILE_SERVER_VERSION: false,                           // 서버에 설정된 앱버전정보
    GOOGLE_MAP_KEY : 'AIzaSyBJ2_DlqL0HI2e0EJpbdabR95KImbvvXTg'
});

// 환경별 override 설정을 위한 처리
switch(BNK.Property.PROFILE) {
    case 'P':
        Property.BASE_URL = 'https://onebiz-m.bnksys.co.kr:10446';
        Property.API_URL = Property.BASE_URL + '/api';
        Property.REPORT_URL = 'https://onebiz.bnksys.co.kr:446' + '/UBIFORM/UView5/index.jsp';
        break;
    case 'T':
        Property.BASE_URL = 'http://192.168.141.132:8090';
        Property.API_URL = Property.BASE_URL + '/api';
        Property.REPORT_URL = 'http://tonebiz.bnksys.co.kr:8080' + '/UBIFORM/UView5/index.jsp';
        break;
    case 'L':
        Property.BASE_URL = 'http://localhost:8090';
        //         Property.BASE_URL = 'http://10.0.2.2:8090';
        Property.API_URL = Property.BASE_URL + '/api';
        Property.REPORT_URL = 'http://tonebiz.bnksys.co.kr:8080' + '/UBIFORM/UView5/index.jsp';
        //Property.REPORT_URL = 'https://onebiz.bnksys.co.kr:446' + '/UBIFORM/UView5/index.jsp';
        break;
    default:
        break;
}
