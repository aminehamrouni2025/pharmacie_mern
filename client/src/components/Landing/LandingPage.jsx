import React, { useState, useEffect } from "react";
 
import { AiFillInstagram } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { GiShoppingCart } from "react-icons/gi";
import { NavLink, Link } from "react-router";
import axios from "axios";
import Logo from "../../assets/pharmalogo.png";
import "./LandingPage.css";
import Carousel from "./carousel/Carousel";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

 

function LandingPage() {
  const [products, setProducts] = useState([]);
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/visitors/products"
      );
      console.log(response.data.data);
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="landing-all">
      {/* Navbar section */}
      <nav className="navbar">
        <p>Welcome to PharmaConnect</p>
        <div className="links">
          <p>Follow us on :</p>
          <p>
            {" "}
            <FaFacebook />
          </p>
          <p>
            <AiFillInstagram />
          </p>
        </div>
      </nav>
      {/* second navbar */}
      <section className="second-nav">
        <div>
          <img className="logo" src={Logo} alt="logo" />
        </div>
        <div className="search-landing">
          <input type="text" placeholder="Search for a product" />
          <h4>
            <CiSearch />
          </h4>
        </div>
        <div className="nav-connect">
          <h3>
            <CiLock />
          </h3>
          <h3 className="link-title">
            <Link to="/login">Sign Up</Link>{" "}
          </h3>
        </div>
        <div className="panier">
          <h3>
            <GiShoppingCart />
          </h3>
          <h3>Card(0)</h3>
        </div>
      </section>
      {/* categories */}
      <section className="categories">
        <div className="category-list">
          <ul className="link-categorie">
            <li>
              <Link>Medicines</Link>{" "}
            </li>
            <li>
              <Link>Dermatology</Link>{" "}
            </li>
            <li>
              <Link>Nutrition compliments</Link>{" "}
            </li>
            <li>
              {" "}
              <Link>Beauty</Link>
            </li>
            <li>
              <Link>Baby/Mother</Link>{" "}
            </li>
            <li>
              <Link>Bio</Link>{" "}
            </li>
            <li>
              <Link>Medical Equipments</Link>{" "}
            </li>
            <li>
              {" "}
              <Link>Vet</Link>
            </li>
          </ul>
        </div>
      </section>
      {/* title & swipe part */}
      <section className="swipe">
        <div className="title-swipe">
          <h1>The best online pharmacy in tunisia</h1>
        </div>
        <Carousel />
      </section>
      <section className="section-product">
        <h1>Good Deals</h1>
        <p>
          Explore our online pharmacy in Tunisia, where you'll discover a
          selection of medicines and parapharmaceutical products, including your
          favorite items for skin, hair and body care. You'll also find a range
          of phytotherapy products as well as a variety of items dedicated to
          the well-being of the whole family, all accompanied by the best offers
          and promotions.
        </p>
        <div>
          <h1> Take a glince on our products</h1>
          <div className="section-product-item">
            {products.slice(0, 4).map((product) => (
              <div className="product-item" key={product._id}>
                <h4>{product.name} </h4>
                <img src={product.image} />
                <h4>price : {product.price}DT</h4>
                <p>{product.description}</p>
                <button>Order</button>
              </div>
            ))}
          </div>
        </div>
        <h1>Pharma Connect : Best online pharmacy in Tunisia</h1>
        <p>
          Welcome to Pharmaconnect, your online pharmacy reference in Tunisia.
          Discover a rich and varied catalog, with products available all year
          round at competitive prices.
        </p>
        <p>
          At Parmaconnect, quality is at the heart of our concerns. That's why
          we're committed to offering you only top-of-the-range products.
        </p>
        <p>
          Discover our skin care products from renowned brands such as Avéne,
          Bioherbs, CeraVe, Cetaphil, Chicco, Filorga, La Roche Posay, Nuxe,
          Sesderma and Vichy. We work closely with these prestigious brands to
          ensure quality and effectiveness.
        </p>
        <p>
          Each product is rigorously tested and validated to guarantee its
          safety and compliance with the strictest standards. Whether you're
          looking for tanning sprays, facial oils, moisturizers or sunscreens,
          we've got you covered.
        </p>
        <p>
          Whatever your skin type - dry, oily or combination - we have the right
          solution for you, with natural, eco-responsible products designed for
          even the most sensitive skin.
        </p>
        <h1>
          Buying guide: Finding the right products and treatments for your needs
        </h1>
        <p>
          Start your shopping experience by exploring the various categories we
          have to offer. Whether you're looking for skin care, dietary
          supplements or hygiene products, we've got what you need.
        </p>
        <p>
          If you already have a clear idea, use our search bar to quickly access
          your product of choice.
        </p>
        <p>
          When you come across a product that interests you, take the time to
          read its description. This will tell you about its ingredients,
          properties and benefits. If you still have questions, our customer
          service team will be happy to help.
        </p>
        <p>
          Before adding an item to your shopping cart, please select the desired
          quantity and, if necessary, the size or color. If your shopping list
          includes several items, add them one by one to your basket.
        </p>
        <p>
          When you're ready to finalize your order, click on “Checkout”. For
          your convenience, we offer a range of secure payment methods, from
          credit cards to bank transfers, not forgetting cash on delivery.
        </p>
        <p>
          And don't forget, if you have any doubts or technical difficulties,
          our customer service team is always on hand to guide and advise you,
          ensuring a smooth and informed shopping experience.
        </p>
      </section>
      {/* *******************footer **************** */}
      <footer class="footer">
        <div class="newsletter">
          <h2>Newsletter</h2>
          <p>Sign up to receive all the latest news!</p>
          <div class="newsletter-input">
            <input type="email" placeholder="Adresse email ..." />
            <button>Sign Up</button>
          </div>
          <div class="social-icons">
            <span class="icon">
              <FaFacebook />
            </span>
            <span class="icon">
              <FaInstagram />
            </span>
          </div>
        </div>

        <div class="footer-content">
          <div class="footer-box">
            <p>
              Parmaconnect is an online pharmacy based in Tunisia. You find
              all your  pharmaceutical products at unbeatable
              prices.
            </p>
          </div>
          <div class="footer-box">
            <h4>My account</h4>
            <ul>
              <li>My Orders</li>
              <li>My favourites</li>
              <li>My personal infos</li>
            </ul>
          </div>
          <div class="footer-box">
            <h4>Informations</h4>
            <ul>
              <li>About</li>
              <li>Conditions </li>
              <li>Legal</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div class="footer-box">
            <h4>Contact</h4>
            <ul>
              <li>📧 contact@pharmaconnect.tn</li>
              <li>📞 +216 78 000 000</li>
              <li>📍 Beja 9000 Tunisia</li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>Copyright © 2023 - Pharmaconnect</p>
          <div class="payments">
            <img src="visa.png" alt="Visa" />
            <img src="cash.png" alt="Cash à la livraison" />
            <img src="cib.png" alt="CIB" />
            <img src="mastercard.png" alt="Mastercard" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
