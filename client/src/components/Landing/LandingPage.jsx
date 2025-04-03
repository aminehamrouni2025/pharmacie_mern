import React from "react";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import { GiShoppingCart } from "react-icons/gi";
import { NavLink, Link } from "react-router";

import Logo from "../../assets/pharmalogo.png";
import "./LandingPage.css";
import Carousel from "./carousel/Carousel";
function LandingPage() {
  return (
    <div>
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
    </div>
  );
}

export default LandingPage;
