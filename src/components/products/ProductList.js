import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');

    useEffect(() => {
        getProducts();
    }, );

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setExpire(decoded.exp);
        }
        return config;
    }, (error)=>{
        return Promise.reject(error);
    });

    const getProducts = async() => {
        const response = await axiosJWT.get('http://localhost:5000/products', {
            headers:{
              Authorization: `Bearer ${token}`
            }
          });        
        setProducts(response.data);
    }

    const deleteProduct = async(id) => {
        await axios.delete(`http://localhost:5000/products/${id}`);
        getProducts();
    }

    return (
        <div>
            <Link to="/products/add" className="button is-primary mt-2">Add New</Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{ index + 1 }</td>
                            <td>{ product.title }</td>
                            <td>{ product.price }</td>
                            <td>
                                <Link to={`/products/edit/${product.id}`} className="button is-small is-info">Edit</Link>
                                <button onClick={() => deleteProduct(product.id)} className="button is-small is-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                    

                </tbody>
            </table>
        </div>
    )
}

export default ProductList
