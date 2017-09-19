import React, {Component} from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';

export default class Main extends Component {
	constructor(){
		super();
		this.state = {
			products: [],
			categories: []
		}
	}

	componentDidMount(){
		Promise.all([ 
			axios.get('/products'),
			axios.get('/categories')
			])
			.then(([products, categories]) => [products.data, categories.data])
			.then(([productsData, categoriesData]) => this.setState({products: productsData, categories: categoriesData}))
	}

	render(){
		const {products, categories} = this.state
		return (
			<div>
				<h2> list of products </h2>
					{products.map(product => <li key={product.id} >{product.name}</li>)}
				<h2> list of categories </h2>
					{categories.map(user => <li key={user.id}> {user.name}</li>)}
				
				<hr />

				<ProductForm />
			</div>
			)
		
	}
}