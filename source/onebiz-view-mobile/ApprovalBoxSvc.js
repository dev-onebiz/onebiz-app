/**
 * 결재선처리 서비스
 */
Ext.define('BNK.ApprovalBoxSvc', {
    singleton : true,
    alternateClassName : 'ApprovalBoxSvc',

    /** 결재선설정 */
    setApprovalLine : function(options) {
        var scope         = options.scope,
            command       = options.command,					// 결재선구분자
            approvalLineGrid  = options.approvalLineGrid,				// 결재선 객체
            beforeRecords = approvalLineGrid.getJsonAllRecords(),	// 변경전결재선 데이터
            records       = options.approvalLineRecords,		// 결재선선택 데이터
            newRecords    = [];

        // 기안(01)
        if (Constants.sanction.DRAFT === command) {
          // 결재부서(02) 를 최상위결재선에 설정하기 위한 처리
          var aprCgpDept = null;
          for ( var i in beforeRecords) {
            var record = beforeRecords[i];
            if (record.hasOwnProperty('aprCgpCd') && '02' === record.aprCgpCd) {
              aprCgpDept = record;
              break;
            }
          }
          if(aprCgpDept !== null){
            aprCgpDept.sno = records.length + 1;
            newRecords.push(aprCgpDept);
          }
          for (i in records) {
            newRecords.push(records[i]);
          }
        }
        // 담당자접수함(96)
        else if (Constants.sanction.RECEIPT_BOX === command) {
          // 기설정된 담당자결재선정보 삭제
          var tempBeforeRecords = []; // 임시그리드
          for (var i in beforeRecords) {
            var record = beforeRecords[i];
            if (!(record.hasOwnProperty('aprCgpCd') && '02' === record.aprCgpCd && !record.dlvDtti)) {
              tempBeforeRecords.push(record);
            }
          }
          beforeRecords = tempBeforeRecords;

          var maxSno = beforeRecords.length + records.length - 1;
          var edocCgpRecord = {}; // 담당자작성자정보

          // 담당자결재선 설정
          for (var i in records) {
            var record = records[i];
            record.aprCgpCd = '02'; // 담당부서코드
            // 마지막건이 아닌경우, 순번설정
            if (i == records.length - 1) {
              edocCgpRecord = record;
            } else {
              record.sno = maxSno--;
              newRecords.push(record);
            }
          }

          // 기안 결재선 설정
          for (i in beforeRecords) {
            record = beforeRecords[i];
            // 최초결재선은 결재부서로 판단
            if (i === 0) {
              record.aprvrNm    = edocCgpRecord.aprvrNm; 	// 결재자명
              record.aprvrPsinm = edocCgpRecord.aprvrPsinm; // 직위명
              record.aprvrDpnm  = edocCgpRecord.aprvrDpnm;
            }
            newRecords.push(record);
          }
        }

        // 데이터보정
        for (var i in newRecords) {
            var record = newRecords[i],
                aprvr = null;

            if (!record.aprvrId) {
                aprvr = record.aprvrNm;
            }
            else {
                aprvr = Ext.String.format('{0} {1} ({2})', record.aprvrNm, record.aprvrPsinm, record.aprvrDpnm);
            }
            record.aprvr = aprvr;
            record.aprStcdNm = CodeUtils.getText('INB016', record.aprStcd); // 결재상태명
            record.aprKndcdNm = CodeUtils.getText('INB015', record.aprKndcd); // 결재종류명
        }

        approvalLineGrid.setData(newRecords);
    },

    /** 기안 */
    draft : function(options){
        options.command = Constants.sanction.DRAFT;
        this._comment(options);
    },

    /** 결재 */
    sanction : function(options){
        options.command = Constants.sanction.SANCTION;
        this._comment(options);
    },

    /** 반송 */
    sendBack : function(options){
        options.command = Constants.sanction.SEND_BACK;
        this._comment(options);
    },

    /** 회수 */
    withdrawal : function(options){
        options.command = Constants.sanction.WITHDRAWAL;

        // 담당자 회수와 일반회수를 구분한다.
        var me = this,
            records = options.approvalLineRecords,
            userId = SecurityUtils.getPrincipal().hrHrpmEmpId;

        // 2019.05.16. [ha.cheon] / 실수 방지 위해 확인창을 한 번 띄워준다.
        this._confirm(options).then(function(){
            for (var i = 0, l = records.length; i < l; i++) {
                var record = records[i];
                // 담당자(03)의 결재일자가 존재할 경우 담당자 회수로 판단
                if ('03' === record.aprKndcd && record.aprvrId == userId && record.aprDtti) {
                    options.command = Constants.sanction.CGP_WITHDRAWAL;
                }
            }
            me._updateApprovalHistory(options);
        });
    },

    /** 결재문서초기화처리 */
    setup : function(options) {
        var me 		  = this,
            command	  = options.command,
            vm		  = options.viewModel,
            edocCd    = options.edocCd,
            aprHistId = options.aprHistId,
            scope     = options.scope,
            principal = SecurityUtils.getPrincipal();

        vm.set('aprHistId', aprHistId);
        vm.set('command', command);

        if (Constants.sanction.DRAFT === command) { // 기안(01) 시 설정
    	      vm.set('fieldValues.rqpr',  Ext.String.format('{0}/{1}/{2}', principal.userNm, principal.dpnm, principal.empePsitNm)); // 기안자
            vm.set('fieldValues.rgdt',  Ext.Date.format(new Date(), 'Y-m-d H:i:s')); // 기안일시
            vm.set('edocEplHidden',     false); // 결재선설명 필드 표시
        }

        // 결재이력 데이터 조회
        me._selectApprovalLineGrid({
            vm        : vm,
            command   : command,
            edocCd    : edocCd,
            userId	  : SecurityUtils.getPrincipal().hrHrpmEmpId,
            aprHistId : aprHistId
        }).then(function(approvalLineRecords) {
            var approvalLineGrid = scope.lookup('approvalLineGrid');
            if (approvalLineGrid) {
                approvalLineGrid.setData(approvalLineRecords);

                //의견이 존재하는 로우일경우 rowexpander를 열어준다
//                 for(var i = 0, l = approvalLineRecords.length; i < l; i++){
//                     var record = approvalLineRecords[i];
//                     if(record.aprComment){
//                         approvalLineGrid.getPlugin('rowexpander').toggleRow(i, record); // 적용안되네...
//                     }
//                 }
                //scope.getView().center(); // 팝업창 중앙정렬
            }
            
            vm.set('viewOptions', me._getViewOptions(command));	// 화면옵션
            
            // 2019-07-10 손승범 진행함에서 타인기안-본인결재건 일 경우, '회수'버튼 비활성화를 위한 코드 추가
            if (Constants.sanction.PROGRESS_BOX === command) {
              var aprvrId = approvalLineRecords[approvalLineRecords.length - 1].aprvrId;
              if (SecurityUtils.getPrincipal().userId != aprvrId) {
                vm.set('viewOptions', {});
              }
            }
        });
    },


    // PRIVATE METHOD

  /**
   * 확인 처리
   *
   * 버튼을 눌렀을 때, 해당동작을 진행할 것인지 아닌지.
   * */
   _confirm : function(options){
      var D = new Ext.Deferred();

      var commandText = '';
      switch (options.command) {
          case Constants.sanction.DRAFT:
              commandText = '기안을';
              break;
          case Constants.sanction.SANCTION:
              commandText = '결재를';
              break;
          case Constants.sanction.SEND_BACK:
              commandText = '반송을';
              break;
          case Constants.sanction.WITHDRAWAL:
          case Constants.sanction.CGP_WITHDRAWAL:
              commandText = '회수를';
              break;
          default:
              break;
      }

//       Ext.Msg.confirm('확인', commandText +' 진행 하시겠습니까?', function(btn){ // LABEL0016 : {0} 됩니다. 계속 하시겠습니까?
//           switch (btn) {
//               case 'yes':
//                   D.resolve();
//                   break;
//               default:
//                   D.reject();
//                   break;
//           }
//       });
       
       Ext.Msg.show({
           alwaysOnTop : true,
           title : '확인',
           message : commandText + ' 진행 하시겠습니까?',
           buttons : {
               yes : {itemId : Ext.MessageBox.YES, text : '확인'},
               no : {itemId : Ext.MessageBox.NO, text : '취소'}
           },
           fn : function(btn) {
               switch(btn) {
                       case 'yes':
                          D.resolve();
                          break;
                      default:
                          D.reject();
                          break;
               }
           }
       });

      return D.promise;
    },


    /**
     * 코멘트 처리
     *
     * 결재를 처리하기전 코멘트를 남기는 창을 연다
     */
     _comment : function(options){
         var me = this,
             command = options.command,
             view    = options.scope.getView();
         
         var title = '';
         switch (command) {
             case Constants.sanction.DRAFT : 
                 title = '기안 의견';
                 break;
             case Constants.sanction.SEND_BACK : 
                 title = '반송 의견';
                 break;
             case Constants.sanction.SANCTION : 
                 title = '결재 의견';
                 break;
         }
         var win = Ext.create('BNK.view.common.ApprovalCommentPopUp', {title : title});

        view.mon(win, 'ok', function(aprComment, commentPopup) {
            commentPopup.close(); // 팝업창 닫기
            // 결재[SANCTION]처리일 경우에는 서버에서 결재선을 재 조회하여 설정하여주기때문에 의견을 파라미터로 따로 담아서 넘겨준다
            options.aprComment = aprComment;

            var records = options.approvalLineRecords,
                hrHrpmEmpId = SecurityUtils.getPrincipal().hrHrpmEmpId, //사용자 사번
                aprHistId = options.aprHistId;

                /*
                   의견을 작성자의 그리드데이터에 담아준다
                   조건
                   1. 결재일자가 없다 (aprDtti)
                   2. 받은일자는 있다 (dlvDtti)
                   3. 사용자 사번과 그리드 사번이 같다
                 */
            for(var i = records.length-1; i >= 0; i--){
                var record = records[i];
                if(!record.aprDtti && record.dlvDtti && record.aprvrId == hrHrpmEmpId){
                    record.aprComment = aprComment;
                    break;
                }
            }

            switch(command){
                case Constants.sanction.DRAFT : //기안
                    //결재이력ID에 따라 기안/담당자기안 분기처리
                    if (!aprHistId) {
                        me._draftRqpr(options); // 기안자 기안
                    }
                    else {
                        me._draftCgp(options); 	// 문서담당자 기안
                    }

                    break;
                case Constants.sanction.SANCTION :   //결재
                case Constants.sanction.SEND_BACK :  //반송
                    me._updateApprovalHistory(options);
                    break;
                default :
                    break;
            }
        }, options);

        win.show();
    },

    /** 기안자기안 */
    _draftRqpr : function(options) {
        var scope				= options.scope,
            edocCd				= options.edocCd,
            successCallback		= options.success;

        Ext.Ajax.request({
            headers : {
                serviceId : 'COMAPR0001C01M',
                viewId    : edocCd
            },
            scope  : scope,
            jsonData : {
                edocCd            	: edocCd, 						// 문서코드
                docNm             	: options.docNm, 				// 문서명
//                 bizDvcd          	: options.bizDvcd, 				// 업무구분코드
                bizServiceId 	 	: options.bizServiceId, 		// 결재업무서비스ID
                approvalLineRecords : options.approvalLineRecords,	// 결재선데이터
                docData				: options.docData
            },
            success : function(res) {
                scope.getView().fireEvent('complete', scope.getView());
            }
        });
      },

    /** 문서담당자기안 */
    _draftCgp : function(options) {
        var scope 			= options.scope,
            vm 				= scope.getViewModel(),
            edocCd			= options.edocCd,
            aprHistId 		= options.aprHistId,
            approvalLineRecords = options.approvalLineRecords,
            record 			= options.record;

        //결재선 리스트중에 직급이나 부서가 존재하지 않을 경우 결재선이 선택되지 않은것으로 판단
        for(var i in approvalLineRecords){
            var rec = approvalLineRecords[i];
          if(!rec.hasOwnProperty("aprvrPsinm") || !rec.hasOwnProperty("aprvrDpnm")){
            Ext.Msg.alert("알림", "담당자 결재선을 선택해주세요.");
            return false;
          }
        }

        Ext.Ajax.request({
            headers : {
                serviceId : 'COMAPR0001U03M',
                viewId : edocCd
            },
            scope : scope,
            jsonData : {
                aprHistId 		 : aprHistId, // 결재이력ID
                approvalLineRecords : approvalLineRecords,
                record 			 : vm.get('record') // 동시성 제어를 하기 위해 사용
            },
            success : function(res) {
                scope.getView().fireEvent('complete', scope.getView()); //기안을 올리면 발생하는 이벤트
            }
        });
    },

    /** 결재이력수정 */
    _updateApprovalHistory : function(options) {

        var scope 				= options.scope,
            aprHistId 			= options.aprHistId,
            command 			= options.command,
            record				= options.record,
            aprComment 			= options.aprComment,
            approvalLineRecords = options.approvalLineRecords,
            edocCd				= scope.getView().xtype;

        Ext.Ajax.request({
            headers: {
                viewId: edocCd,
                serviceId: 'COMAPR0001U02M'
            },
            jsonData : {
                command 			: command,
                aprHistId			: aprHistId,
                record 				: record,
                aprComment 			: aprComment,
                approvalLineRecords : approvalLineRecords
            },
            scope : scope,
            success : function(res) {
                scope.getView().fireEvent('complete', scope.getView());
            }
        });
    },

    /** 결재문서 화면옵션을 반환한다. */
    _getViewOptions : function(command) {
        switch(command) {
            case Constants.sanction.DRAFT:			// 기안(01)
                return {
                    showDraft         : true,		// [결재선], [기안] 버튼활성화
                    edocEplHidden     : false,		// 결재선설명 필드 표시
                    auditYnReadOnly   : false,		// 감사여부 수정가능상태로 설정
                    auditYearReadOnly : false		// 감사년수 수정가능상태로 설정
                };
            case Constants.sanction.PENDING_BOX: 	// 미결함(92)
                return {
                    showSanction : true,			// [결재] 버튼활성화
                    showSendBack : true				// [반송] 버튼활성화
                };
            case Constants.sanction.PROGRESS_BOX: 	// 진행함(93)
                return {
                    showWithdrawal : true			// [회수] 버튼활성화
                };
            case Constants.sanction.RECEIPT_BOX: 	// 담당자접수함(96)
                return {
                    showDraft 	 : true,			// [결재선], [기안] 버튼활성화
                    showSendBack : true,			// [반송] 버튼활성화
                    draftBtnName : '결재'			   // 기안버튼명 : 결재
                };
        }
        return null;
    },

    /** 결재그리드 데이터 조회 */
    _selectApprovalLineGrid : function(options) {
        var vm = options.vm,
            command = options.command,
            edocCd = options.edocCd,
            userId = SecurityUtils.getPrincipal().hrHrpmEmpId,
            aprHistId = options.aprHistId,
            serviceId = 'COMAPR0001R05M',	// 결재이력항목조회
            requestData = {
                aprHistId : aprHistId,
                command : command
            };

        // 기안시 결재문서 담당부서 조회 및 기작성된문서의 최신결재선목록을 조회하여 초기값으로 설정한다.
        if (Constants.sanction.DRAFT === command) {
            serviceId = 'COMAPR0001R06M';
            requestData = {
                edocCd : edocCd, // 결재문서코드
                userId : userId
            };
        }

        var D = new Ext.Deferred();

        Ext.Ajax.request({
            headers: {
                viewId: edocCd,
                serviceId: serviceId
            },
            jsonData : requestData,
            success : function(res) {
                var responseJson = Ext.JSON.decode(res.responseText);

                if (Constants.sanction.DRAFT === command){
                  vm.set('fieldValues.edocEpl',   responseJson.edocInfo.edocEpl);   //결재선설명
                  vm.set('fieldValues.auditYn',   responseJson.edocInfo.auditYn);   //보존년한
                  vm.set('fieldValues.auditYear', responseJson.edocInfo.auditYear); //감사유무
                  vm.set('fieldValues.docNm',     responseJson.edocInfo.edocNm);    //문서제목
                }

                D.resolve(responseJson.result);
            },
            failure: function(response, opts) {
                D.reject();
            }
        });

        return D.promise;
    }

});