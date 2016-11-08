import React from 'react';

import Footer from '../Footer/Footer.jsx';
import Mask from '../Mask/Mask.jsx';

class Album extends React.Component {
	componentDidMount() {
		var _this = this;
		var dragTarget;
		$(".img-list").on("click", ".icon-dot-3", function(e) {
		    $(e.target).next().css("visibility", "visible");
		});
		$(".img-list").on("click", ".img-edit", function(e) {
		    var img = $(e.target).parent().prevAll(".img").children(0);
		    $(e.target).parent().css("visibility", "hidden");
		    _this.editImage(img);
		});
		$(".img-list").on("click", ".img-delete", function(e) {
		    $(e.target).parent().css("visibility", "hidden");
		    $(e.target).parent().parent().remove();
		});
		$(".img-list").on("dragstart", "li", function(e) {
		    dragTarget = e.target;
		});

		$(".img-list").on("drop", "li", function(e) {
		    var $target = $(e.target).parents(".img-box");

		    if (dragTarget == $target[0] || !$(dragTarget).hasClass("img-box")) {
		        return false;
		    }
		    $($target.clone()).insertAfter($(dragTarget));
		    $($target).replaceWith($(dragTarget));

		});
		$(".img-list").on("dragover", ".img-box", function(e) {
		    e.preventDefault();
		});
	}
	appendImage() {
	    $(".img-list").empty();
	    var imageArr = this.props.imageArr;
	    var appendhtml = "";
	    for (var i = 0; i < imageArr.length; i++) {
	        appendhtml += '<li class="img-box"  draggable="true">' +
	            '<div class="img"><img class="" src="" draggable="false"></div>' +
	            '<div class="img-title">hello</div>' +
	            '<i class="icon-dot-3"></i>' +
	            '<ul class="img-edit-menu">' +
	            '<li class="img-edit"><i class="icon-pencil"></i>编辑</li>' +
	            '<li class="img-delete"><i class="icon-trash-empty"></i>删除</li>' +
	            '</ul>' +
	            '</li>';
	    }
	    $(".img-list").append(appendhtml);
	    $(".img-edit-menu").mouseleave(function() {
	        $(this).css("visibility", "hidden");
	    });

	    var than = $(".img").width() / $(".img").height();
	    $(".img-title").each(function(index) {
	        $(this).html(imageArr[index]);
	    });
	    $(".img-list img").each(function(index) {
	        $(this).attr("src", imageArr[index]);

	        $(this).load(function() {
	            if ($(this).width() / $(this).height() >= than) {
	                $(this).addClass("layout-h");
	            } else {
	                $(this).addClass("layout-w");
	            }
	            $(this).css("visibility", "visible");
	        });

	    });
	}
	editImage(srcImageTarget) {
		var tmpImage = new Image();
		$(".shadow").css("display", "block");
		var srcImageTarget = $(srcImageTarget).get(0);

		var y = ($(window).height() - 200) / 2;
        var x = ($(".col-right").width() - 200) / 2 + $(".col-right").offset().left;
        $(".overlay").css({
            "display": "block",
            "top": y,
            "left": x,
            "width": 200,
            "height": 200
        });

		tmpImage.src = srcImageTarget.src;
        $(tmpImage).load(this.refs.mask.showImage(tmpImage));
		this.props.edit(tmpImage);
	}
	render() {
		this.appendImage();
		return (
			<div className="right-container">
		        <div className="col-right">
		            <a href="./image-upload/index.html" className="import"><i className="icon-upload-cloud"></i>导入图片</a>
		            <ul className="img-list"></ul>
		            <Footer />
		            <Mask ref="mask" />
		        </div>
		    </div>
		);
	}
}

export default Album;