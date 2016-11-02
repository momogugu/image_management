import React from 'react';

import Navigation from '../Navigation/Navigation.jsx';
import Album from '../Album/Album.jsx';
import Mask from '../Mask/Mask.jsx';
import Footer from '../Footer/Footer.jsx';

class Manager extends React.Component {
	constructor(props) {
			super(props);
			this.state = {
				image: {},
				imageArr: []
			};
		}
	componentWillMount() {
		var _this = this;
		$.ajax({
			type:'GET',
			url: 'http://husterxsp.sinaapp.com/ria/getfile.php',
			dataType: 'json',
			success: function(response) {
				_this.setState({
					image: response,
					imageArr: response.allimage
				});
            	 _this.appendImage(6);
			}
		});
	}
	appendImage(num) {
		var _this = this;
		var offset = 0;
		var imageArr = _this.state.imageArr;
		if (num) {
	        while (num--) {
	            (function(i) {
	                if (imageArr[offset]) {
	                    var tmpImage = new Image();
	                    tmpImage.src = imageArr[offset];
	                    tmpImage.className = "min";
	                    console.log(tmpImage);
	                    $(tmpImage).load(function() {
	                        var col = _this.getShortCol();
	                        col.append(tmpImage);
	                    });
	                    offset++;
	                }
	            }(num))
	        }
	    }
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
	changeClass(className) {
		this.setState({
			imageArr: this.state.image[className]
		});
		var imageArr = this.state.imageArr;
		this.appendImage(6);
	}
	render() {
		return (
			<div>
				<Navigation changeClass={this.changeClass.bind(this)} />
				<Album imageArr={this.state.imageArr} />
				<Mask />
				<Footer />
			</div>
		);
		// console.log(this.state.image);
	}
}

export default Manager;