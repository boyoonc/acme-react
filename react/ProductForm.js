import React, {Component} from 'react';
export default class ProductForm extends Component{
	constructor(){
		super();
		this.state = {
			name: ''
		};
		this.onSave = this.onSave.bind(this)
		console.log(this.state)
	}

	onSave(event){
		console.log('inhere')
		this.setState({name:event.target.value})
	}

	render(){
		return(

			<form onSubmit= {this.onSave}>
				<div className='form-group'>
					<label>Product Name</label>
					<input className='form-control' name='key' value=''></input>
					<button className='btn btn-primary'>Save</button>
				</div>
			</form>

			)
	}
}