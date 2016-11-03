import React from 'react';

class Mask extends React.Component {
	showMaxImage(image) {
	    //立即显示shadow,防止多次点击
	    $(".shadow").css("visibility", "visible");
	    $(".shadow").animate({
	        opacity: .8
	    }, 500);

	    var tmpImage = this.createImage(image);

	    $(tmpImage.node).addClass('max');
	    $("body").append(tmpImage.node);

	    $(tmpImage.node).css({
	            "top": image.clientY,
	            "left": image.clientX,
	        })
	        .animate({
	            height: tmpImage.height,
	            top: tmpImage.y,
	            left: tmpImage.x
	        }, 500);

	    $(".max").on("mousedown", this.startMove);
	}
	createImage(target) {
		var tmpImage = new Image();
	    tmpImage.src = target.src;

	    var imageWidth = tmpImage.width;
	    var imageHeight = tmpImage.height;

	    if (imageWidth > $(window).width() * 0.85) {
	        imageWidth = $(window).width() * 0.85;
	    }
	    imageHeight = imageHeight * (imageWidth / tmpImage.width);
	    var x = ($(window).width() - imageWidth) / 2;
	    var y = ($(window).height() - imageHeight) / 2;
	    return {
	        "node": tmpImage,
	        "x": x,
	        "y": y,
	        "height": imageHeight
	    };
	}
	startMove(e) {
	    e.preventDefault(); //图片会有拖拽的默认事件
	    e.stopPropagation();

	    var deltaX = e.clientX - $(".max")[0].offsetLeft;
	    var deltaY = e.clientY - $(".max")[0].offsetTop;

	    $(document).on('mousemove', moving);
	    $(document).on('mouseup', endMoving);

	    function moving(e) {
	        $(".max").css({
	            "top": e.clientY - deltaY,
	            "left": e.clientX - deltaX
	        });
	    }

	    function endMoving() {
	        $(document).off('mousemove', moving);
	        $(document).off('mouseup', endMoving);
	    }
	}
	cancle() {
	    $(".shadow").css({
	        "visibility": "hidden",
	        "opacity": 0
	    });
	    $(".max").remove();
	}
	// lookLeft() {
	//     if (!$(minImage).prev()[0]) {
	//         if ($(minImage).parent().parent().prev()[0]) {
	//             minImage = $(minImage).parent().parent().prev().children(0).children().last()[0];
	//         } else {
	//             alert("已经是第一张了！");
	//             return 0;
	//         }
	//     } else {
	//         minImage = $(minImage).prev()[0];
	//     }
	//     var tmpImage = createImage(minImage);
	//     $(".max").attr("src", tmpImage.node.src);
	//     $(".max").css({
	//         "top": tmpImage.y,
	//         "left": tmpImage.x,
	//         "height": tmpImage.height
	//     });
	// }

	// lookRight() {

	//     if (!$(minImage).next()[0]) {
	//         if ($(minImage).parent().parent().next(".col-img")[0]) {
	//             minImage = $(minImage).parent().parent().next().children(0).children(0)[0];
	//         } else {
	//             alert("已经是最后一张了！");
	//             return 0;
	//         }
	//     } else {
	//         minImage = $(minImage).next()[0];
	//     }
	//     var tmpImage = createImage(minImage);
	//     $(".max").attr("src", tmpImage.node.src);
	//     $(".max").css({
	//         "top": tmpImage.y,
	//         "left": tmpImage.x,
	//         "height": tmpImage.height
	//     });
	// }
	render() {
		// this.showMaxImage(this.props.maxImage);
		return (
			<div className="shadow" >
				<i className="icon-cancel" onClick={this.cancle.bind(this)}></i>
			    <i className="icon-left-open-big" onClick={this.lookLeft}></i>
			    <i className="icon-right-open-big" onClick={this.lookRight} ></i>
			</div>
		);
	}
}

export default Mask;