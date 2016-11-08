import React from 'react';

import Images from '../Images/Images.jsx';

class Album extends React.Component {
	appendImage(num) {
		var _this = this;
		var offset = 0;
		var imageArr = _this.props.imageArr;
		$(".col-1, .col-2, .col-3").empty();
		if (num) {
	        while (num--) {
	            (function(i) {
	                if (imageArr[offset]) {
	                    var tmpImage = new Image();
	                    tmpImage.src = imageArr[offset];
	                    tmpImage.className = "min";
	                    // console.log(tmpImage)
	                    $(tmpImage).load(function() {
	                        var col = _this.getShortCol();
	                        col.append(tmpImage);
	                    });
	                    offset++;
	                }
	            }(num))
	        }
	    }
	    // var colHeight = (_this.getShortCol()).height() + (_this.getShortCol()).offset().top;
	    // if (colHeight < ($(window).scrollTop() + $(window).height())) {
	    //     _this.appendSingleImage();
	    //     offset++;
	    // }
	}
	getShortCol() {
	    var height1 = $(".col-1").height();
	    var height2 = $(".col-2").height();
	    var height3 = $(".col-3").height();

	    if (height1 <= height2 && height1 <= height3) {
	        return $(".col-1");
	    } else if (height2 <= height1 && height2 <= height3) {
	        return $(".col-2");
	    } else {
	        return $(".col-3");
	    }
	}
	handleClick(e) {
		this.props.showMaxImage(e.target);
	}
	render() {
		this.appendImage(10);
		return (
			<div className="water-fall">
				<div className="col-img">
					<div ref="col1" className="col-1" onClick={this.handleClick.bind(this)}></div>
				</div>
				<div className="col-img">
					<div className="col-2" onClick={this.handleClick.bind(this)}></div>
				</div>
				<div className="col-img">
					<div className="col-3" onClick={this.handleClick.bind(this)}></div>
				</div>
			</div>
		);
	}
}

export default Album;