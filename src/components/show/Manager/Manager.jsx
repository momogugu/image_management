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
				imageArr: [],
				maxImage: ''
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
            	 // _this.appendImage(6);
			}
		});
	}
	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll.bind(this));
	}
	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll.bind(this));
	}
	handleScroll() {
		var offset = 10;
		var colHeight = (this.refs.album.getShortCol()).height() + (this.refs.album.getShortCol()).offset().top;
	    if (colHeight < ($(window).scrollTop() + $(window).height())) {
	        this.refs.album.appendSingleImage();
	        offset++;
	    }
	    if ($(document).scrollTop() > 500) {
	        $(".icon-up-open-big").fadeIn();
	    } else {
	        $(".icon-up-open-big").fadeOut();
	    }
	}
	changeClass(className) {
		this.setState({
			imageArr: this.state.image[className]
		});
	}
	showMaxImage(image) {
		this.setState({
			maxImage: image
		})
		this.refs.mask.showMaxImage(image);
	}
	handleClick(e) {
		var target = e.target;
		if (target.className == "icon-up-open-big") {
	        $("body").animate({
	            scrollTop: 0
	        }, 500);
	    }
	}
	render() {
		return (
			<div onClick={this.handleClick.bind(this)}>
				<Navigation changeClass={this.changeClass.bind(this)} />
				<Album ref="album" imageArr={this.state.imageArr} showMaxImage={this.showMaxImage.bind(this)} />
				<Mask ref="mask" />
				<Footer />
			</div>
		);
		// console.log(this.state.image);
	}
}

export default Manager;