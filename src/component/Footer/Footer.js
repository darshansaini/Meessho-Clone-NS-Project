import React from "react";
import {
Box,
Container,
Row,
Column,
FooterLink,
Heading,
} from "./FooterStyles";
import "../Footer/Footer.css"
import {FaInstagram, FaFacebook, FaYoutube, FaLinkedin, FaTwitter,} from "react-icons/fa";



const Footer = () => {
return (
	<div className="footer-wrapper">

	<div className="footer-part">

	<h4 className="footer-content1">Shop Non-Stop on Meesho</h4>
	<p className="chebx">Trusted by more than 1 Crore Indians
	<br></br>
Cash on Delivery | Free Delivery</p>

	<a href="" className="downloadBtn">
    <img src="https://images.meesho.com/images/pow/playstore-icon-big.webp" />
    </a>
	<a href="" className="downloadBtn">
    <img src="https://images.meesho.com/images/pow/appstore-icon-big.webp" />
    </a>
	</div>

	<div className="footer-part">
	<h6 className="reachout">Reach out to us</h6>
	<span style={{
		fontSize:"35",	
	}}><span><FaFacebook /></span> <span><FaInstagram/></span> <span><FaYoutube/></span> <span><FaLinkedin/></span> <span><FaTwitter/></span>
	</span>

	</div>

	<div className="footer-part">
	<h6 className="reachout">Contact Us</h6>
	<p style={{
		fontSize:13,
		lineHeight:1.5,
	}}>Fashnear Technologies Private Limited,<br></br>
	CIN: U74900KA2015PTC082263<br></br>
	06-105-B, 06-102, (138 Wu) Vaishnavi Signature, No. 78/9,<br></br>
	Outer Ring Road, Bellandur, Varthur Hobli, Bengaluru-<br></br>
	560103, Karnataka, India<br></br>
	E-mail address: query@meesho.com<br></br>
	© 2015-2023 Meesho.com
	</p>
	</div>

	</div>
	
);
};
export default Footer;
