/**
 * 네이티브 관련 기능을 정의한다.
 * 
 * 카메라, GPS, 안드로이드 뒤로가기 등...
 */


if (Ext.os.is.Android) {
    // 안드로이드 back키 이벤트 발생처리 이벤트처리
    document.addEventListener('backbutton', onBackKeyDown, false);

    /**
     * 안드로이드 뒤로가기 이벤트 처리
     * - 로그인화면 : 앱종료
     * - 메인화면 : 로그아웃
     * - 업무화면 : 뒤로가기
     */
    function onBackKeyDown(event) {

        event.preventDefault();

        var me = this;
        var homes = Ext.ComponentQuery.query(Property.ROUTE_HOME); // 로그인화면인경우, home 이 undefined 가 됨
        var windows = Ext.ComponentQuery.query('window');
        var actionSheet = Ext.ComponentQuery.query('actionsheet');

        var obj = Ext.Element.getActiveElement();
        if (obj.className.indexOf('x-hidden-clip') > -1) {

            try {

                try {

                    if(!Ext.isEmpty(Ext.get(obj).up().component._picker) && !Ext.get(obj).up().component._picker.getHidden()) {

                        // focusLeave 처리를 하면 hidden 값 체크가 되지 않아,
                        // 해당 구문을 조건문에 안에 넣어줌.
                        Ext.get(obj).up().component.onFocusLeave();
                        document.activeElement.blur();

                        return;
                    }
                    else {
                        Ext.get(obj).up().component.onFocusLeave();
                        document.activeElement.blur();
                    }
                }
                catch(e) {
                    console.log("obj does not have picker.");
                }
            }
            catch(e) {
                console.log("obj does not have function that name is onFocusLeave.");
            }

        }

        // 팝업창 및 메시지창이 활성화 되어 있는 경우, 창닫기
        for (var i = windows.length - 1; i >= 0; i--) {
            obj = windows[i];
            if (!obj.getHidden()) {
                obj.close();
                return;
            }
        }

        // 액션시트 숨기기
        for (var i = actionSheet.length - 1; i >= 0; i--) {
            obj = actionSheet[i];
            if (!obj.getHidden()) {
                obj.hide();
                return;
            }
        }

        // home 화면이 아닌경우, 로그인화면으로 판단
        if (homes.length === 0) {

            if (!Ext.Object.isEmpty(Ext.ComponentQuery.query('LoginV1'))) { //로그인 화면
                // 앱종료하기
                Ext.Msg.confirm('안내', '종료하시겠습니까?', function(buttonId) {
                    if ('yes' === buttonId) {
                        navigator.app.exitApp();
                    }
                }, me);
            }
            else { //그외 (ex-비밀번호초기화)
                Ext.ComponentQuery.query('viewport')[0].items.items[0].getController().REDIRECT('LoginV1');
            }
        }
        else {
            var home = homes[0];
            var naviView = home.lookup('NaviView'),
                backButton = naviView.getNavigationBar().getBackButton();

            //메뉴바의 경우, 메뉴바를 닫도록 처리해 줌.
            if (home.getActiveItemIndex() !== 0) {
                home.controller.toggleMenu(0);
                return;
            }

            // 업무화면인 경우 뒤로가기
            if (naviView.innerItems.length > 1) {

                naviView.pop();

                // 화면을 빠르게 이동 시, 화면이 제대로 그려지지 않아 hidden 설정으로 다시 그려주도록 함.
                naviView.getActiveItem().setHidden(true);
                naviView.getActiveItem().setHidden(false);
            }
            // 메인화면인 경우, 로그아웃
            else {
                // 로그아웃
                Ext.Msg.confirm('안내', '로그아웃하시겠습니까?', function(buttonId) {
                    if ('yes' === buttonId) {
                        // 토큰삭제
                        sessionStorage.removeItem(Property.JWT_TOKEN_NAME);
                        WebUtils.setCookie(Property.JWT_TOKEN_NAME, null, -1);

                        // 서버로그아웃
                        Ext.Ajax.request({
                            headers: {
                                viewId: 'NewMain',
                                serviceId: 'COMAPP0002R02M'
                            },
                            scope : me,
                            success : function(res) {
                                if (Property.IS_DEBUG) console.log('로그아웃 성공');
                            },
                            failure: function(response, opts) {
                                if (Property.IS_DEBUG) console.log('로그아웃 실패');
                            }
                        });

                        // 메인화면제거 및 로그인화면 표시
                        Ext.create(Property.ROUTE_LOGIN, { fullscreen: true });
                        for(var i in homes){
                            homes[i].destroy();
                        }
                    }
                }, me);
            }
        }
    }
}

Ext.define('BNK.Native', {
    singleton: true,
    alternateClassName: 'Native',

    googleMapPanel: null,	// GoogleMap 을 그려줄 Panel Id
    currentPos: null,		// GoogleMap 처음 보여줄 좌표

    /** 플러그인 초기화여부 확인 */
    onPluginReady: function(plugin) {

        // Ext.os.deviceType : Desktop, Tablet, Phone
        if ('Desktop' === Ext.os.deviceType) {
            Ext.Msg.alert('안내', plugin + ' 기능을 지원하지 않습니다.'); 
            return false;
        }

        if (plugin == 'DEVICE') { 
            if (device && device.cordova) {
                return true;
            }
            Ext.Msg.alert('안내', 'Device 기능을 지원하지 않습니다.'); 
        }
        if (plugin == 'CAMERA') { 
            if (navigator.camera) {
                return true;
            }
            Ext.Msg.alert('안내', '카메라 기능을 지원하지 않습니다.');
        }
        if (plugin == 'GPS') {
            if (navigator.geolocation) {
                return true;
            }
            Ext.Msg.alert('안내', 'GPS 기능을 지원하지 않습니다.'); 
        }    
        return false;
    },

    ////////////////////////////////////////////////////////////////////
    // 
    // CORDOVA CAMERA PLUGIN
    // 
    ////////////////////////////////////////////////////////////////////

    /** 
     * 사진촬영 
     *
     * Native.takePicture(function success(imgUrl) { imgPhoto.setSrc(imgUrl); } );
     */
    takePicture: function(successcb, failcb, opts) {
        var me = this;
        if (!me.onPluginReady('CAMERA')) {	// 플러그인기능지 준비가 안되었을 경우, 진행하지 않음
            return;
        }
        me._getPicture(Camera.PictureSourceType.CAMERA, successcb, failcb, opts);
    },

    /**
     * 갤러리 사진불러오기
     *
     * Native.loadPicture(function success(imgUrl) { imgPhoto.setSrc(imgUrl); } );
     */
    loadPicture: function(successcb, failcb, opts) {
        var me = this;
        if (!me.onPluginReady('CAMERA')) {	// 플러그인기능지 준비가 안되었을 경우, 진행하지 않음
            return;
        }
        me._getPicture(Camera.PictureSourceType.SAVEDPHOTOALBUM, successcb, failcb, opts);
    },

    /**
     * Cordova Camera Plugin API
     */
    _getPicture: function(srcType, successcb, failcb, opts) {
        var me = this;

        // 플러그인기능지 준비가 안되었을 경우, 진행하지 않음
        if (!me.onPluginReady('CAMERA')) return;

        if (!opts) opts = me.setCameraOptions(srcType);

        navigator.camera.getPicture(function cameraSuccess(imgUrl) {
            if (successcb && typeof successcb == 'function') {
                successcb('data:image/jpeg;base64,' + imgUrl);
            }
        }, function cameraError() {
            if (failcb && typeof failcb == 'function') {
                failcb();
            }
        }, opts);
    },

    /**
     * CAMERA 옵션
     */
    setCameraOptions: function(srcType) {
        var options = {
            quality: 30, // 이미지품질
            destinationType: Camera.DestinationType.DATA_URL, // base64 로 이미지설정
            sourceType: srcType,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: false,
            correctOrientation: true
        };

        // 사진촬영일 경우, 갤러리 저장
        if (srcType === Camera.PictureSourceType.CAMERA) {
            options.saveToPhotoAlbum = true;
        }

        return options;
    },


    ////////////////////////////////////////////////////////////////////
    // 
    // CORDOVA GPS PLUGIN
    // 
    ////////////////////////////////////////////////////////////////////

    /**
     * GPS정보 조회
     * 
     * var gps = Native.getGps(function success(opsition) { });
     */ 
    getGps: function(params, successcb, failcb, opts) {
        var me = this;

        // 플러그인기능지 준비가 안되었을 경우, 진행하지 않음
        if (!me.onPluginReady('GPS')) return;

        //         기본옵션설정
        //         if (opts) opts = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
        if(!Ext.isEmpty(opts)){
            if(Ext.isEmpty(opts.maximumAge)) opts.maximumAge = 3000;
            if(Ext.isEmpty(opts.timeout)) opts.timeout = 5000;
            if(Ext.isEmpty(opts.enableHighAccuracy)) opts.enableHighAccuracy = true;
        }

        navigator.geolocation.getCurrentPosition(function(position) {
            if (successcb && typeof successcb == 'function') {
                successcb({
                    gps: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        altitude: position.coords.altitude,
                        accuracy: position.coords.accuracy,
                        altitudeAccuracy: position.coords.altitudeAccuracy,
                        heading: position.coords.heading,
                        speed: position.coords.speed,
                        timestamp: position.timestamp
                    },
                    params: params
                });
            }
        },
        function(error) {
            if (failcb && typeof failcb == 'function') {
                failcb(error, params);
            }
            else {
                Ext.Msg.alert('안내', 'GPS수신이 원활하지 않습니다.');
            }
        }, opts);
    },


    ////////////////////////////////////////////////////////////////////
    // 
    // CORDOVA Inappbrowser PLUGIN
    // 
    ////////////////////////////////////////////////////////////////////
    /*
    openBrowser : function(url) {
        if (Ext.os.deviceType == 'Phone') {
            cordova.InAppBrowser.open(url, '_blank', 'location=yes');
        }
        else if (Ext.os.deviceType == 'Desktop') {
            window.open(url, '_blank', 'location=yes');
        }
    },
    */

    ////////////////////////////////////////////////////////////////////
    // 
    // GOOGLE MAP API
    // 
    ////////////////////////////////////////////////////////////////////
    /**
     * Google Map 설정한 좌표 표시
     * 
     * new google.maps.Marker({});
     * params:
     *	googleMapPanelId: GoogleMap 담을 Panel ID
     *	title:			  지도에 보여질 문자열
     *	lat:			  위도
     *	lng:			  경도
     *  zoom:			  지도 확대/축소
     *	animation:		  Marker 표시 동작
     */ 
    addMapMarker : function(googleMapPanelId, title, lat, lng) {
        Native.addMapMarkerWithDTL(googleMapPanelId, title, lat, lng, 16, google.maps.Animation.DROP);
    },
    addMapMarkerWithDTL : function(googleMapPanelId, title, lat, lng, zoom, animation) {
        var pos = Native.getPosition2JSON(lat, lng);

        var map = new google.maps.Map(
            document.getElementById(googleMapPanelId), {
                center: pos,
                zoom: zoom
            }
        );

        new google.maps.Marker({
            map: map,
            position: pos,
            animation: animation,
            title: title,
            label: title
        });
    },

    /**
     * Google Map 설정한 좌표에 원표시
     * 
     * new google.maps.Circle({});
     * params:
     *	googleMapPanelId:	GoogleMap 담을 Panel ID
     *	lat:				위도
     *	lng:				경도
     *	zoom:				지도 확대/축소
     *	color:				색상
     *	radius:				크기
     */ 
    addMapCircle : function(googleMapPanelId, lat, lng) {
        Native.addMapCircleWithDTL(googleMapPanelId, lat, lng, 16, '#FF0000', 300);
    },
    addMapCircleWithDTL : function(googleMapPanelId, lat, lng, zoom, color, radius) {
        var pos = Native.getPosition2JSON(lat, lng);

        var map = new google.maps.Map(
            document.getElementById(googleMapPanelId), {
                center: pos,
                zoom: zoom
            }
        );
        new google.maps.Circle({
            strokeColor: color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: color,
            fillOpacity: 0.35,
            map: map,
            center: pos,
            radius: radius,
            title: '',
            label: ''
        });
    },
    /**
     * 위도/경로 정보를 JSON 형태로 변환
     *	default: BNK금융그룹 IT센터
     * 
     * params:
     *	lat:	위도
     *	lng:	경도
     *
     * return:	JSON
     */
    getPosition2JSON : function(lat, lng) {
        var pos = {lat: 35.137561, lng: 128.857282};	// Default: BNK금융그룹 IT센터 위도/경도
        if(lat && lng){// 위도/경도 데이터가 있을 경우
            pos = {lat: lat, lng: lng};
        }

        return pos;
    },
    /**
     * Google Map 추가 Callback 처리
     *	- API 호출후 Panel에 등록
     */
    callbackMap : function() {
        new google.maps.Map(
            Native.googleMapPanel, {
                center: Native.currentPos,
                zoom: 16
            }
        );
    },
    /**
     * Google Map 추가
     *	- 현재 위치 지정 (실패시 BNK금융그룹 IT센터 위치 지정)
     *
     * params:
     *	googleMapPanelId:	Google Map 을 담을 Panel ID
     *	callback:			Google Map API 호출후 Callback 함수명
     */
    initMap : function(googleMapPanelId) {
        Native.googleMapPanel = document.getElementById(googleMapPanelId);

        var onSuccess = function(position){// API 호출 성공시
            Native.currentPos = {lat: position.latitude, lng: position.longitude};

            Native.includeMap();
        };

        var onError = function(error){// API 호출 실패시
            Native.currentPos = {lat: 35.137561, lng: 128.857282};	// default : BNK금융그룹 IT센터 위도/경도

            Native.includeMap();
        };

        // 현재 좌표 가져오기
        Native.getGps(onSuccess, onError);
    },
    
    /**
     * Google Map 추가
     *	- 현재 위치 지정 (실패시 BNK금융그룹 IT센터 위치 지정)
     *	- 지도세팅만 진행하고 위치 조회는 하지 않음.
     *
     * params:
     *	googleMapPanelId:	Google Map 을 담을 Panel ID
     *	callback:			Google Map API 호출후 Callback 함수명
     */
    newInitMap : function(googleMapPanelId) {
        Native.googleMapPanel = document.getElementById(googleMapPanelId);

        Native.includeMap();
    },
    /**
     * Google Map API 추가
     *	- 최초 처음에만 script 추가
     *	- 두번째부턴 callback 함수만 호출
     *
     * params:
     *	callback:	API 호출 후 Callback 받을 함수명
     */
    includeMap : function() {
        if(!document.querySelector('script[data-name="googleMapScript"]')) {// 최초 접속할 경우
            var scriptTag = document.createElement('script');
            scriptTag.async = true;
            scriptTag.defer = true;
            scriptTag.setAttribute("data-name", "googleMapScript");
            scriptTag.src = 'https://maps.googleapis.com/maps/api/js?key=' + Property.GOOGLE_MAP_KEY + '&callback=Native.callbackMap';
            document.body.appendChild(scriptTag);
        }
        else {
            Native.callbackMap();
        }
    },

    /**
     * Google Map API 삭제
     *
     * params:
     * 없음
     */
    removeMap : function() {
        var googleMapScript = document.querySelector('script[data-name="googleMapScript"]');
        if(googleMapScript) {
            googleMapScript.parentNode.removeChild(googleMapScript);
        }
    },

    /* Get the Geolocation API's error message */
    getErrMsg : function(code) {

        var msg = '';

        if(code == '1') {
            msg = "위치 권한 확인 필요";
        }
        else if(code == '2') {
            msg = "위치 정보 조회 실패";
        }
        else if(code == '3') {
            msg = "시간 초과";
        }
        else {
            msg = "원인 확인 필요";
        }

        return msg;
    }




});