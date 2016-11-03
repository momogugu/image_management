import React from 'react';

class Mask extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			maxImage: ''
		};
	}
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
		this.setState({
			maxImage: target
		})
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
	lookLeft() {
		var maxImage = this.state.maxImage;
		var imageArr = $(".min");
		var minImage;
		for (var i = 0; i < imageArr.length; i++) {
			if(imageArr[i].src == maxImage.src) {
				minImage = imageArr[i];
			}
		}
		if(!(minImage.previousSibling)) {
			if (!(minImage.parentNode.parentNode.previousSibling)) {
				alert("已经是第一张了！");
				return 0;
			}else if (minImage.parentNode.parentNode.previousSibling.firstChild.lastChild) {
				minImage = minImage.parentNode.parentNode.previousSibling.firstChild.lastChild;
			}
		} else {
			minImage = minImage.previousSibling;
		}
	    var tmpImage = this.createImage(minImage);
	    $(".max").attr("src", tmpImage.node.src);
	    $(".max").css({
	        "top": tmpImage.y,
	        "left": tmpImage.x,
	        "height": tmpImage.height
	    });
	}

	lookRight() {
		var maxImage = this.state.maxImage;
		var imageArr = $(".min");
		var minImage;
		for (var i = 0; i < imageArr.length; i++) {
			if(imageArr[i].src == maxImage.src) {
				minImage = imageArr[i];
			}
		}
		if(!(minImage.nextSibling)) {
			if(!(minImage.parentNode.parentNode.nextSibling)) {
				alert("已经是最后一张了！");
				return 0;
			} else if (minImage.parentNode.parentNode.nextSibling.firstChild.firstChild) {
				minImage = minImage.parentNode.parentNode.nextSibling.firstChild.firstChild;
			}
		} else {
			minImage = minImage.nextSibling;
		}
	    var tmpImage = this.createImage(minImage);
	    $(".max").attr("src", tmpImage.node.src);
	    $(".max").css({
	        "top": tmpImage.y,
	        "left": tmpImage.x,
	        "height": tmpImage.height
	    });
	}
	render() {
		// this.showMaxImage(this.props.maxImage);
		return (
			<div className="shadow" >
				<i className="icon-cancel" onClick={this.cancle.bind(this)}></i>
			    <i className="icon-left-open-big" onClick={this.lookLeft.bind(this)}></i>
			    <i className="icon-right-open-big" onClick={this.lookRight.bind(this)} ></i>
			</div>
		);
	}
}

export default Mask;