// import React, { useContext } from "react";
import "../Product/Product.css";
import { FaRegStar } from "react-icons/fa";
// import { CartCoontext } from "../Context/Context";
import { Link } from "react-router-dom";



const Product = (props) => {

  const { item } = props;
  var qty = "quantity";
  var val = 1;
  item[qty] = val;



  return (
    <div>

      <Link style={{ textDecoration: 'none' }} to={`/productpage/${item.id}`}>
        <div className="each-item">
          <div className="img-wrapper">
            <img src={item.image} alt="product-img" />
          </div>
          <div className="content-wrapper">
            <h3 className="brand-name">{item.title}</h3>
            <p className="price_rate">
              <span className="b-d-price">₹{item.price}</span>
              <div className="bg">
                <span className="b-rating" style={{ backgroundColor: item.rating.rate >= 3.5 ? " #23bb75" : "rgb(244, 182, 25)",gap:"5px", }}>
                  {item.rating.rate} <FaRegStar className="star" size={15} />
                </span>
              </div>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
