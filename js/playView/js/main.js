 /*****实时预览******/
    function StartPlayView()
    {
        var OCXobj = document.getElementById("PlayViewOCX");
		var previewXml = document.getElementById("config").value;
		var ret = OCXobj.StartTask_Preview_InWnd(previewXml,0);
    }
    
    /*****指定窗口实时预览******/
    function StartPlayView_InWnd()
    {
       var OCXobj = document.getElementById("PlayViewOCX");
	   var previewXml = document.getElementById("config").value;
	   var wndNum = document.getElementById("SelectWnd").value;
	   OCXobj.SelWindow(parseInt(wndNum))
	   var ret = OCXobj.StartTask_Preview_InWnd(previewXml,0);
    }
    /*****空闲窗口实时预览******/
    function StartPlayView_Free()
    {
        var OCXobj = document.getElementById("PlayViewOCX");
        var previewXml = document.getElementById("config").value;
        OCXobj.StartTask_Preview_FreeWnd(previewXml);
    }
    /*****停止所有预览******/
    function StopPlayView()
    {
        var OCXobj = document.getElementById("PlayViewOCX");
        OCXobj.StopAllPreview();
    }
    /*****设置抓图格式为JPG******/
    function CatchPicJPG()
    {
        var OCXobj = document.getElementById("PlayViewOCX");
        OCXobj.SetCapturParam("C:\\pic",0);
    }
    /*****设置抓图格式为BMP******/
    function CatchPicBMP()
    {
        var OCXobj = document.getElementById("PlayViewOCX");
        OCXobj.SetCapturParam("C:\\pic",1);
    }
    /*****云台：左上******/
    function PTZLeftUp()
    {
        var OCXobj = document.getElementById("PlayViewOCX");
        OCXobj.StartTask_PTZ(25,3);
    }
    /*****云台：上******/
    function PTZUp()
    {
        var OCXobj = document.getElementById("PlayViewOCX");
        OCXobj.StartTask_PTZ(21,3);
    }
    /*****云台：右上******/
    function PTZRightUp()
    {
        var OCXobj = document.getElementById("PlayViewOCX");
        OCXobj.StartTask_PTZ(26,3);
    }
    /*****云台：左******/
    function PTZLeft()
    {
        var OCXobj = document.getElementById("PlayViewOCX");
        OCXobj.StartTask_PTZ(23,3);
    }
    /*****云台：自转******/
    function PTZAuto()
    {
        var OCXobj = document.getElementById("PlayViewOCX");
        OCXobj.StartTask_PTZ(29,3);
    }
    /*****云台：右******/
    function PTZRight()
    {
        var OCXobj = document.getElementById("PlayViewOCX");
        OCXobj.StartTask_PTZ(24,3);
    }
    /*****云台：左下******/
    function PTZLeftDown()
    {
        var OCXobj = document.getElementById("PlayViewOCX");
        OCXobj.StartTask_PTZ(27,3);
    }
    /*****云台：下******/
    function PTZDown()
    {
        var OCXobj = document.getElementById("PlayViewOCX");
        OCXobj.StartTask_PTZ(22,3);
    }
    /*****云台：右下******/
    function PTZRightDown()
    {
        var OCXobj = document.getElementById("PlayViewOCX");
        OCXobj.StartTask_PTZ(28,3);
    }
    /*****云台：停止******/
    function PTZStop()
    {
        var OCXobj = document.getElementById("PlayViewOCX");
        OCXobj.StartTask_PTZ(-21,3);
    }
    /*****云台：焦距+******/
    function PTZAddTimes()
    {
        var OCXobj = document.getElementById("PlayViewOCX");
        OCXobj.StartTask_PTZ(11,3);
    }
    /*****云台：焦距-******/
    function PTZMinusTimes()
    {
        var OCXobj = document.getElementById("PlayViewOCX");
        OCXobj.StartTask_PTZ(12,3);
    }
    /*****云台：焦点+******/
    function PTZFarFocus()
    {
        var OCXobj = document.getElementById("PlayViewOCX");
        OCXobj.StartTask_PTZ(13,3);
    }
    /*****云台：焦点-******/
    function PTZNearFocus()
    {
        var OCXobj = document.getElementById("PlayViewOCX");
        OCXobj.StartTask_PTZ(14,3);
    }
    /*****云台：光圈+******/
    function PTZLargeAperture()
    {
        var OCXobj = document.getElementById("PlayViewOCX");
        OCXobj.StartTask_PTZ(15,3);
    }
    /*****云台：光圈-******/
    function PTZSmallAperture()
    {
        var OCXobj = document.getElementById("PlayViewOCX");
        OCXobj.StartTask_PTZ(16,3);
    }
    /*****云台：调用预置点******/
    function GetPt()
    {
        var OCXobj = document.getElementById("PlayViewOCX");
        ptNum = document.getElementById("SelectGetpt").value;
        var ret = OCXobj.PTZCtrlGotoPreset(ptNum); 
             
    }
    /*****云台：设置预置点******/
    function SetPt()
    {
        var OCXobj = document.getElementById("PlayViewOCX");
        ptNum = document.getElementById("SelectSetpt").value;
       
        var ret = OCXobj.PTZCtrlSetPreset(parseInt(ptNum));
            
    }

    function init(){
	var OCXobj = document.getElementById("PlayViewOCX");
	OCXobj.SetOcxMode(0);
    }    