import React from 'react';

import Editor from './Editor.jsx';

class Navigation extends React.Component {
	componentDidMount() {
		var _this = this;
		var dragTarget;
		$(".nav-menu").on("dragstart", "li", function(e) {
		    dragTarget = e.target;
		});
		$(".nav-menu").on("drop", "li", function(e) {
		    var target = e.target;
		    if (e.target.tagName.toLowerCase() != 'li') {
		        target = e.target.parentNode;
		    }
		    if (target == dragTarget || !$(".nav-menu")[0].contains(dragTarget) ) {
		        return false;
		    }
		    $($(target).clone()).insertAfter($(dragTarget));
		    $(target).replaceWith($(dragTarget));
		    _this.setStorageMenu();
		});
		$(".nav-menu").on("dragover", "li", function(e) {
		    e.preventDefault();
		});
		$(".nav-menu").on("mouseenter", "li", function(){
		    var top = this.offsetTop;
		    $(".nav-label").css("transform", "translate(0px,"+ top +"px)");
		});
		$(".nav-menu").on("mouseleave", "li", function(){
		    var top = $(".active")[0].offsetTop;
		    $(".nav-label").css("transform", "translate(0px,"+ top +"px)");
		});
	}
	setStorageMenu() {
	    var storage = window.localStorage;
	    var menu = [];
	    $("#nav-menu li").each(function(index, item) {
	        menu[index] = [];
	        menu[index].push(item.id);
	        menu[index].push(item.innerText);
	    });
	    storage.setItem('menu', JSON.stringify(menu));
	}
	handleClick(e) {
		$(e.target).siblings().removeClass('active');
	    $(e.target).addClass("active");
	    var id = e.target.className.split(" ")[0];
	    this.props.changeClass(id);
	}
	edit(image) {
		this.refs.editor.handleEdit(image);
	}
	render() {
		return (
			<div className="col-left">
		        <div className="nav">
		            <h3 className="nav-title">照 片 管 理 器</h3>
		            <div className="newAlbum"><i className="icon-plus-1"></i>新建相册</div>
		            <div className="nav-menu-container">
		                <div className="nav-label"></div>
		                <ul className="nav-menu" onClick={this.handleClick.bind(this)} >
		                    <li className="allimage active" draggable="true">
		                        全部
		                    </li>
		                    <li className="cartoon" draggable="true">
		                        动漫
		                    </li>
		                    <li className="photography" draggable="true">
		                        摄影
		                    </li>
		                    <li className="scenery" draggable="true">
		                        风景
		                    </li>
		                    <li className="importImg" draggable="true">
		                        最新导入
		                    </li>
		                    <li className="show" draggable="true" >
		                        <a href="./">
		                            展示页面
		                            <i className="icon-link"></i>
		                        </a>
		                    </li>
		                </ul>
		            </div>
		        </div>
		        <Editor ref="editor" />
		    </div>
		);
	}
}

export default Navigation;