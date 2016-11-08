import React from 'react';

class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tmpImage: ""
		};
	}
	componentDidMount() {
		$(".rotate").on("click", ".icon-ccw-1, .icon-cw, .icon-resize-horizontal, .icon-resize-vertical", this.rotate.bind(this));
        $(".crop").on("click", this.crop.bind(this));
        $(".filter").on("click", ".gray, .reverse, .old, .cold", this.filterImage.bind(this));
        $(".saveImage").on("click", this.saveImage.bind(this));
        $(".text-height, .text-width").on("input propertychange", this.changeCrop.bind(this));
        $(".icon-minus, .icon-plus").on("click", this.changeSlider.bind(this));
        $("input[type='range']").on("change input propertychange", this.resizeImage.bind(this));
	}
	rotate(e) {
		e.stopPropagation();
        e.preventDefault();

        var tmpImage = this.state.tmpImage;

        if (/[-\d]+/.exec(tmpImage.style.transform)) {
            var deg = parseInt(/[-\d]+/.exec(tmpImage.style.transform)[0]);
        } else {
            deg = 0;
        }

        var classname = e.target.className;
        if (classname == "icon-cw") {
            deg += 90;
        } else if (classname == "icon-ccw-1") {
            deg -= 90;
        } else if (classname == "icon-resize-horizontal") {
            deg += 180;
        } else {
            deg -= 180;
        }
        var rotate = "rotate(" + deg + "deg)";
        $(tmpImage).css("transform", rotate);
	}
	crop(e) {
		e.stopPropagation();

		var tmpImage = this.state.tmpImage;

        var left = $('.overlay')[0].offsetLeft - tmpImage.offsetLeft;
        var top = $('.overlay')[0].offsetTop - tmpImage.offsetTop;

        var width = $('.overlay').width();
        var height = $('.overlay').height();

        var cropCanvas = document.createElement('canvas');
        cropCanvas.width = width;
        cropCanvas.height = height;

        var imageCanvas = document.createElement('canvas');
        imageCanvas.width = tmpImage.width;
        imageCanvas.height = tmpImage.height;
        imageCanvas.getContext('2d').drawImage(tmpImage, 0, 0, imageCanvas.width, imageCanvas.height);

        cropCanvas.getContext('2d').drawImage(imageCanvas, left, top, width, height, 0, 0, width, height);

        tmpImage.src = cropCanvas.toDataURL("image/png");

        $(".tmp-image").attr("width", width);

        $(".overlay").css({
            "top": ($(window).height() - height) / 2,
            "left": ($(".col-right").width() - width) / 2 + $(".col-right").offset().left
        });
	}
	filterImage(e) {
        e.stopPropagation();

        var tmpImage = this.state.tmpImage;

        var imageCanvas = document.createElement('canvas');
        var context = imageCanvas.getContext('2d');

        imageCanvas.width = $(".tmp-image").width();
        imageCanvas.height = $(".tmp-image").height();

        context.drawImage(tmpImage, 0, 0, imageCanvas.width, imageCanvas.height);
        var imageData = context.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
        var pixels = imageData.data;

        if (e.target == $(".reverse")[0]) {
            for (var i = 0; i < pixels.length / 4; i++) {
                pixels[i * 4] = 255 - pixels[i * 4];
                pixels[i * 4 + 1] = 255 - pixels[i * 4 + 1];
                pixels[i * 4 + 2] = 255 - pixels[i * 4 + 2];
            }
        } else if (e.target == $(".gray")[0]) {
            for (var i = 0; i < pixels.length / 4; i++) {
                var average = (pixels[i * 4] + pixels[i * 4 + 1] + pixels[i * 4 + 2]) / 3;
                pixels[i * 4] = average;
                pixels[i * 4 + 1] = average;
                pixels[i * 4 + 2] = average;
            }
        } else if (e.target == $(".old")[0]) {
            for (var i = 0; i < pixels.length / 4; i++) {
                var r = 0.393 * pixels[i * 4] + 0.769 * pixels[i * 4 + 1] + 0.189 * pixels[i * 4 + 2];
                var g = 0.349 * pixels[i * 4] + 0.686 * pixels[i * 4 + 1] + 0.168 * pixels[i * 4 + 2];
                var b = 0.272 * pixels[i * 4] + 0.534 * pixels[i * 4 + 1] + 0.131 * pixels[i * 4 + 2];

                pixels[i * 4] = r;
                pixels[i * 4 + 1] = g;
                pixels[i * 4 + 2] = b;
            }
        } else if (e.target == $(".cold")[0]) {
            for (var i = 0; i < pixels.length / 4; i++) {
                var r = (pixels[i * 4] - pixels[i * 4 + 1] - pixels[i * 4 + 2]) * 3 / 2;
                var g = (pixels[i * 4 + 1] - pixels[i * 4] - pixels[i * 4 + 2]) * 3 / 2;
                var b = (pixels[i * 4 + 2] - pixels[i * 4 + 1] - pixels[i * 4]) * 3 / 2;

                if (r < 0) {
                    r = -r;
                } else if (r > 255) {
                    r = 255;
                }
                if (g < 0) {
                    g = -g;
                } else if (g > 255) {
                    g = 255;
                }
                if (b < 0) {
                    b = -b;
                } else if (b > 255) {
                    b = 255;
                }

                pixels[i * 4] = r;
                pixels[i * 4 + 1] = g;
                pixels[i * 4 + 2] = b;
            }
        }

        context.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
        context.putImageData(imageData, 0, 0);
        $(".tmp-image").attr("src", imageCanvas.toDataURL("image/png"));
        $("input[type='range']").change();
	}
	saveImage(e) {
		e.stopPropagation();

		var tmpImage = this.state.tmpImage;
        var imgData = tmpImage.src;
        var type = imgData.match(/png|jpg|bmp|gif/)[0];
        var filename = 'image' + (new Date()).getTime() + '.' + type;
        var link = document.createElement('a');

        link.href = imgData;
        link.download = filename;

        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        link.dispatchEvent(event);
	}
	changeCrop(e) {
        e.stopPropagation();

        var value = e.target.value;
        if (value <= 0) {
            return;
        }
        if (e.target == $(".text-height")[0]) {
            $(".overlay").css("height", value);
            $(".overlay").css("top", ($(window).height() - value) / 2);
        } else {
            $(".overlay").css("width", value);
            $(".overlay").css("left", ($(".col-right").width() - value) / 2 + $(".col-right").offset().left);
        }

    }
    changeSlider(e) {
        e.stopPropagation();

        var value = +$(".scale-range").val();
        if (e.target == $(".icon-minus")[0]) {
            value -= 1;
        } else {
            value += 1;
        }
        $("input[type='range']").val(value).change();

    }
	resizeImage(e) {
        e.stopPropagation();

        var tmpImage = this.state.tmpImage;
        var imageWidth = this.state.imageWidth;

        var value = +$(".scale-range").val();
        var ratio = (value + 50) / 100;
        tmpImage.width = imageWidth * ratio;
        $(tmpImage).css({
            "top": ($(window).height() - $(tmpImage).height()) / 2,
            "left": ($(".col-right").width() - $(tmpImage).width()) / 2 + $(".col-right").offset().left
        });
        $(".percent").html(value + 50 + "%");
        $(".size").html($(tmpImage).width() + "×" + $(tmpImage).height());

    }
	handleEdit(image) {
		$(".nav-edit").css("zIndex", 2);
		this.setState({
			tmpImage: image,
			imageWidth: image.width
		});
	}
	render() {
		return (
			<div className="nav-edit">
	            <h3 className="nav-title">照 片 管 理 器</h3>
	            <div className="saveImage"><i className="icon-download-cloud"></i>保存图片</div>
	            <div className="title">旋转</div>
	            <div className="rotate">
	                <i className="icon-ccw-1"></i>
	                <i className="icon-cw"></i>
	                <i className="icon-resize-horizontal"></i>
	                <i className="icon-resize-vertical"></i>
	            </div>
	            <div className="title">裁剪</div>
	            <div className="cut">
	                <div className="cut-title">高度</div>
	                <div className="cut-title">宽度</div>
	                <input className="text-height" min="100" type="number" value="200" />
	                <i className="icon-cancel-1"></i>
	                <input className="text-width" min="100" type="number" value="200" />
	                <div className="crop">裁剪<i className="icon-crop"></i></div>
	            </div>
	            <div className="title">滤镜</div>
	            <ul className="filter">
	                <li className="reverse"> 反色 </li>
	                <li className="gray"> 灰度 </li>
	                <li className="old"> 怀旧 </li>
	                <li className="cold"> 冰冻 </li>
	            </ul>
	            <div className="title">缩放</div>
	            <div className="scale">
	                <span className="percent">100%</span>
	                <span className="size"></span>
	                <div className="range">
	                    <i className="icon-minus"></i>
	                    <input type="range" className="scale-range" value="50" />
	                    <i className="icon-plus"></i>  
	                </div>
	            </div>
	        </div>
		);
	}
}

export default Editor;