import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ProductAdd = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const history = useHistory();

    const saveProduct = async(e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/products',{
            title: title,
            price: price
        });
        history.push("/product");
    }

    return (
        <div>
            <form onSubmit={ saveProduct }>
                <div className="field">
                <label className="label">Title</label>
                <div className="control">
                    <input 
                        className="input" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        type="text" 
                        placeholder="Title" />
                </div>
                </div>

                <div className="field">
                <label className="label">Price</label>
                <div className="control">
                    <input className="input" value={price} onChange={(e) => setPrice(e.target.value)} type="text" placeholder="Price" />
                </div>
                </div>
        
                <div className="field">
                <div className="control">
                    <button className="button is-primary">Save</button>
                </div>
                </div>
            </form>
        </div>
    )
}

export default ProductAdd
