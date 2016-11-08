import React from 'react';

class Navigation extends React.Component {
	handleClick(e) {
	    $(e.target).siblings().removeClass('active');
	    $(e.target).addClass("active");
	    var id = e.target.className.split(" ")[0];
	    this.props.changeClass(id);
	}
	render() {
		return (
			<div className="nav-hold">
				<div className="nav">
					<ul onClick={this.handleClick.bind(this)}>
						<li className="allimage active">全部</li>
						<li className="cartoon">动漫</li>
			            <li className="photography">摄影</li>
			            <li className="scenery">风景</li>
			            <li className="importImg">最新导入</li>
			            <li className="manage"><a href="./manage.html">管理图片<i className="icon-link"></i></a></li>
					</ul>
				</div>
			</div>
		);
	}
}

export default Navigation;