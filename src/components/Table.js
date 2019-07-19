import React from 'react';
import { Link } from 'react-router-dom'
import payload from '../utils/payload';

const styles = { width: '400px', height: '250px' }

function Table({ _id,totals,createdAt,charge, status, payment_method, commentary, Subtotals,address,sales_detail }) {
	return (
        
		<>
			<tr className="trTable">
				<td>{_id}</td>
				<td>{createdAt}</td>
                <td>{Subtotals}</td>
                <td>{totals}</td>
                <td>{status}</td>
                <td>{payment_method}</td>
                <td>{commentary}</td>
                <td>{address}</td>
            </tr>
            <tr>
                <td colSpan="8">
                    <div class="container">   
                        <div class="row widget stacked widget-table action-table">
                            <div class="widget-content col-12">
                                <table class="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        sales_detail.map(detail=>(
                                            <tr className="trTable">
                                                <td>{detail.product.name}</td>
                                                <td>{detail.amount}</td>
                                                <td>{detail.quantity}</td>
                                                
                                            </tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
		</>
	)

}

export default Table;