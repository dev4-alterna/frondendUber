import React from 'react';
import { Link } from 'react-router-dom'
import payload from '../utils/payload';

const styles = { width: '400px', height: '250px' }

function ProductPreview({ _id, name, description, price, profile_picture }) {
	return (
		<>
			<div class="col-md-4">
				<div class="card rounded">
					<div class="card-image">
						<span class="card-notify-badge">{name}</span>
						<img class="img-fluid" style={styles} src={profile_picture} alt={name} />

					</div>
					<div class="card-image-overlay m-auto">
						<span class="card-detail-badge">$ {price}</span>
					</div>
					<div class="card-body text-center">
						<div class="ad-title m-auto">
							<h5>{description}</h5>
						</div>
						{payload().isAuthenticated ?
							payload().user.typeUser === 'P' ? (<Link to={`/products_upd/${_id}`}>Editar</Link>) :
								(<Link to={`/sales/${_id}`}>Comprar</Link>) : ("")
						}

					</div>
				</div>
			</div>
		
		</>
	)

}

export default ProductPreview;