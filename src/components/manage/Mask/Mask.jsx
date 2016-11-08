import React from 'react';

class Mask extends React.Component {
	componentDidMount() {
		$(".icon-cancel").on("click", this.exit.bind(this));
		$(".overlay").on('mousedown', '.resize-handle', this.resizeOverlay.bind(this));
	}
	exit() {
		$(".overlay").css("display", "none");
        $(".shadow").css("display", "none");
        $(".nav-edit").css("zIndex", 0);
        $(".tmp-image").remove();
	}
	showImage(tmpImage) {

        var imageWidth = tmpImage.width;
        var imageHeight = tmpImage.height;

        if (imageWidth > $(window).width() * 0.65) {
            imageWidth = $(window).width() * 0.65;
        }
        imageHeight = imageHeight * (imageWidth / tmpImage.width);

        var x = ($(".col-right").width() - imageWidth) / 2 + $(".col-right").offset().left;
        var y = ($(window).height() - imageHeight) / 2;
        $(".col-right").append(tmpImage);
        tmpImage.width = imageWidth;
        $(tmpImage).addClass("tmp-image");
        $(tmpImage).css({
            "top": y,
            "left": x,
        });

        $(".scale-range").val(50);
        $(".size").html($(".tmp-image").width() + "×" + $(".tmp-image").height());
        $(".tmp-image").on("mousedown", this.startMove.bind(this, tmpImage));
	}
	startMove(tmpImage, e) {
		e.preventDefault(); //图片会有拖拽的默认事件
        e.stopPropagation();

        var deltaX = e.clientX - tmpImage.offsetLeft;
        var deltaY = e.clientY - tmpImage.offsetTop;

        $("body").on('mousemove', moving);
        $("body").on('mouseup', endMoving);

        function moving(e) {
            $(tmpImage).css({
                "top": e.clientY - deltaY,
                "left": e.clientX - deltaX
            });
        }

        function endMoving() {
            $("body").off('mousemove', moving);
            $("body").off('mouseup', endMoving);
        }
	}
	resizeOverlay(e) {
        e.stopPropagation();

        $("body").on('mousemove', resizingLay);
        $("body").on('mouseup', endResizeLay);
        var $target = $(e.target);
        var width, height, top, left;
        var oriWidth = $(".overlay").width();
        var oriHeight = $(".overlay").height();
        var oriTop = parseInt($(".overlay").css("top"));
        var oriLeft = parseInt($(".overlay").css("left"));

        function resizingLay(e) {
            if ($target.hasClass("resize-handle-nw")) {
                width = oriWidth - (e.clientX - oriLeft);
                height = oriHeight - (e.clientY - oriTop);
                left = e.clientX;
                top = e.clientY;
            } else if ($target.hasClass("resize-handle-ne")) {
                width = e.clientX - oriLeft;
                height = oriHeight - (e.clientY - oriTop);
                left = oriLeft;
                top = e.clientY;
            } else if ($target.hasClass("resize-handle-sw")) {
                width = oriWidth - (e.clientX - oriLeft);
                height = e.clientY - oriTop;
                left = e.clientX;
                top = oriTop;
            } else if ($target.hasClass("resize-handle-se")) {
                width = e.clientX - oriLeft;
                height = e.clientY - oriTop;
                left = oriLeft;
                top = oriTop;
            }
            $(".overlay").css({
                "width": width,
                "height": height,
                "top": top,
                "left": left
            });

            $(".text-height").val(height);
            $(".text-width").val(width);
        }

        function endResizeLay(e) {
            $("body").off('mousemove', resizingLay);
            $("body").off('mouseup', endResizeLay);
        }
    }
	render() {
		return (
			<div>
				<div className="shadow">
                <i className="icon-cancel"></i>
	            </div>
	            <div className="overlay">
	                <span className="resize-handle resize-handle-nw"></span>
	                <span className="resize-handle resize-handle-ne"></span>                
	                <span className="resize-handle resize-handle-se"></span>
	                <span className="resize-handle resize-handle-sw"></span>         
	            </div>
			</div>
		);
	}
}

export default Mask;