/* eslint-disable react/prop-types */
import ReactStars from 'react-stars'
import { Badge, Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function ProductItem({data}) {
    const {imageApi} = useSelector((state)=> state)
    return (
        <>
            {
                Array.from(data).map((item,ind)=>{
                    const {_id,name,thumb,category,price,stock,sku,rating} = item
                    return <div className="body-row d-flex align-items-center" key={ind}>
                <div className="product-column width-32 d-flex align-items-center justify-content-between">
                    <div className="product_name">
                        <div className="product_thumb">
                            <img src={`${imageApi}/${thumb}`} />
                        </div>
                        <strong title={name}>
                            <Link to={`/product-detail/${_id}`} className=''>{name}</Link>
                        </strong>
                    </div>
                </div>
                <div className="sku-column width-12">{sku}</div>
                <div className="stock-column width-10">{stock}</div>
                <div className="price-column width-10">{price}</div>
                <div className="rating-column width-10 showing">
                    <ReactStars value={rating} count={5} size={18} color1={'#bdbbbb'} color2={'#ffd700'} edit={false} />
                </div>
                <div className="category-column width-16"><Badge bg="info">{category}</Badge></div>
                <div className="action-column width-10">
                    <Dropdown>
                        <Dropdown.Toggle id="btnddAction" className='btn-action text-black'>
                            Actions <i className="fa fa-angle-down"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='action-dd-menu'>
                            <Dropdown.Item href={`/edit-product/${_id}`}>Edit</Dropdown.Item>
                            <Dropdown.Item href="#">Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
                })
            }
        </>
    )
}
