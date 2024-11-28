// 6.1.4
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
