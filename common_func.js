function mouseDownEventHandler(msg) {
    return function (e) {
        if (typeof e == 'undefined') e = event;
        if (e.preventDefault) e.preventDefault();
        wwr_req(msg);
        return false;
    }
}

function mouseUpHandler(event){mouseDown = 0;}
function mouseDownHandler(event, target){mouseDown = 1;}
function mouseLeaveHandler(event){mouseDown = 0;}
function mouseMoveHandler(event){
    if (mouseDown != 1){ return; }
    else
    {
        var volTrackWidth = (this.getBoundingClientRect()["width"]);
        var volThumbWidth = volTrackWidth * 0.14375;
        var volThumbTrackWidth = (volTrackWidth - volThumbWidth);
        var volThumbTrackLEdge = this.getBoundingClientRect()["left"];
        offsetX = (event.pageX - volThumbTrackLEdge - (volThumbWidth / 2));

        if (event.changedTouches != undefined) { //we're doing touch stuff
            offsetX = (event.changedTouches[0].pageX - volThumbTrackLEdge - (volThumbWidth / 2));
            }
        if(offsetX<0){offsetX=0};
        if(offsetX>volThumbTrackWidth){offsetX=volThumbTrackWidth};

        var volThumb = this.firstChild.getElementsByClassName("fader")[0];
        var offsetX320 = offsetX * (320 / volTrackWidth);
        var vteMove320 = "translate(" + offsetX320 + " 0)";
        volThumb.setAttributeNS(null, "transform", vteMove320);
        var volOutput = (offsetX  / volThumbTrackWidth);
        var volOutputdB = Math.pow(volOutput, 4) * 4;
        wwr_req("SET/TRACK/" + this.id + "/VOL/" + volOutputdB)
    }
}

function sendMouseUpHandler(event) {
    wwr_req("SET/TRACK/" + selectChoiceIdx + "/SEND/" + -this.id + "/VOL/" + sendOutputdB + "e");
    mouseDown = 0;
}

function volFaderConect(content, thumb) {
    content.addEventListener("mousemove", mouseMoveHandler, false);
    content.addEventListener("touchmove", mouseMoveHandler, false);
    content.addEventListener("mouseleave", mouseLeaveHandler, false);
    content.addEventListener("mouseup", mouseUpHandler, false);
    content.addEventListener("touchend", mouseUpHandler, false);
    thumb.addEventListener("mousedown", function (event) { mouseDownHandler(event, event.srcElement) }, false);
    thumb.addEventListener('touchstart', function (event) {
        if (event.touches.length > 0) mouseDownHandler(event, event.srcElement);
        event.preventDefault();
    }, false);
}

function sendConect(content, thumb) {
    content.addEventListener("mousemove", sendMouseMoveHandler, false);
    content.addEventListener("touchmove", sendMouseMoveHandler, false);
    content.addEventListener("mouseleave", mouseLeaveHandler, false);
    content.addEventListener("mouseup", sendMouseUpHandler, false);
    content.addEventListener("touchend", sendMouseUpHandler, false);
    thumb.addEventListener("mousedown", function (event) { mouseDownHandler(event, event.srcElement) }, false);
    thumb.addEventListener('touchstart', function (event) {
        if (event.touches.length > 0) mouseDownHandler(event, event.srcElement);
        event.preventDefault();
    }, false);
}
