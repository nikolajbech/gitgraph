import React, { Component } from 'react';
import '../styles/Topbar.css';

const logo = 'https://firebasestorage.googleapis.com/v0/b/gitgraphpro.appspot.com/o/logoHigh.png?alt=media&token=e9a1bcc9-819e-43c3-9435-b3c9770c912d'

export default class Topbar extends Component{

	render(){
		const str = this.props.breadcrumbs
		const rest = str.substring(0, str.lastIndexOf("/") + 1);
		const splitRest = rest.split('/')
		console.log(splitRest)
		let restA = null
		let restB = null
		if(splitRest.length > 2){
			restA = splitRest[0]
			restB = splitRest[1]
		}
		const last = str.substring(str.lastIndexOf("/") + 1, str.length);
	   return (
			<div style={{backgroundColor: '#EFEFEF'}}>
				 <div className='rows'>
					<div className='row'>
						<a onClick={()=> this.props.navigateTo('home')}>
							<img
								src={logo}
								style={{width: 300, height: 80, marginTop: 30, marginBottom: -28}}/>
						</a>
						</div>
					{restA == null ? (
					<div className='row'>
						<a onClick={()=> this.props.navigateTo('home')}>
							<p style={{fontSize: 30, fontWeight: 'bold', color: '#C8C8C8', letterSpacing: 1, marginBottom: 10}}>{rest}</p>
						</a>
					</div>
					) : (
					<div className='row'>
						<div className='row'>
							<a onClick={()=> this.props.navigateTo('home')}>
								<p style={{fontSize: 30, fontWeight: 'bold', color: '#C8C8C8', letterSpacing: 1, marginBottom: 10}}>{restA}/</p>
							</a>
						</div>
						<div className='row'>
							<a onClick={()=> this.props.navigateTo('repos')}>
								<p style={{fontSize: 30, fontWeight: 'bold', color: '#C8C8C8', letterSpacing: 1, marginBottom: 10}}>{restB}/</p>
							</a>
						</div>
					</div>)}
					<div className='row'>
						<p style={{fontSize: 30, fontWeight: 'bold', color: '#3482B9', letterSpacing: 1, marginBottom: 10}}>{last}</p>
					</div>
				</div>
			</div>
	   )
	}
}