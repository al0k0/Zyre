import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Review from './Review'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider1 from "../Images/slider1.png"
import Slider2P1 from "../Images/slider2-1.png"
import Slider2P2 from "../Images/slider2-2.png"
import Slider3 from "../Images/slider3.png"
import Products from "./Products"
import Show from "../Images/show.jpg"
import Banner from "../Images/banner.jpg"
import Brand1 from "../Images/brand1.png"
import Brand2 from "../Images/brand2.png"
import Brand3 from "../Images/brand3.png"
import Brand4 from "../Images/brand4.png"
import Brand5 from "../Images/brand5.png"

import { Facebook, Twitter, Youtube, Instagram, Github  } from 'lucide-react';


function Categories() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [categories, setCategories] = useState([ ]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
const navigate = useNavigate()
  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);
  const handleCategoryClick = (categoryId)=>{
    setSelectedCategoryId(categoryId)
  }


  // const [bestSellingProducts, setBestSellingProducts] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:5000/api/products/best-sellers")
  //     .then(response => {
  //       console.log("Best Selling Products Data:", response.data); // ✅ Console log API response
  //       setBestSellingProducts(response.data);
  //     })
  //     .catch(error => console.error("Error fetching best sellers:", error));
  // }, []);
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    beforeChange: (current, next) => setCurrentSlide(next),
    customPaging: i => (
      <div
        style={{
          width: i === currentSlide ? '10px' : '8px',
          height: i === currentSlide ? '10px' : '8px',
          backgroundColor: i === currentSlide ? 'black' : 'gray',
          borderRadius: '50%',
          cursor: 'pointer'
        }}
      ></div>
    ),
    appendDots: dots => (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '10px',
      }}>
        <ul style={{ margin: '15px', display: 'flex', gap: '8px' }}>{dots}</ul>
      </div>
    )
  };
  

  const setting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };
  
  
  return (
    <div className="mt-16 ">
      <div className="relative ">
        <Slider {...settings}>
          {/* SLIDER 1  */}

          <div className="relative border-r-2 shadow-md ">
            <img
              src={Slider1}
              alt="slider1"
              className=" relative h-96 "
            />
            <div className="absolute inset-0 bg-black opacity-25"></div>

            <div className={`  absolute inset-0 flex flex-col items-center justify-center text-center  gap-10 ${currentSlide === 0 ? 'animate-fade-in' : 'opacity-0'}`}>
              <h1 className="font-serif text-6xl  font-bold ">New Collections</h1>
              <p className="max-w-[60rem] text-white font-body  tracking-wider text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe voluptas ut dolorum consequuntur, adipisci repellat! Eveniet commodi voluptate</p>
              <div className="space-x-10">
                <button
                  className="inline-block border border-gray-400 cursor-pointer relative overflow-hidden text-white bg-transparent font-bold py-2 px-4 rounded-md transition-all duration-500 ease-in-out group  ">
                  <span className="relative z-10 text-sm lg:text-base">
                    SHOP NOW <i className="fa-solid fa-arrow-right"></i>
                  </span>
                  <span className="absolute top-0 left-0 w-full lg:w-12 h-full bg-black transform transition-all duration-500 group-hover:w-full ease-in-out lg:group-hover:bg-black"></span></button>

                <button
                  className="inline-block border border-gray-400 cursor-pointer relative overflow-hidden text-white bg-transparent font-bold py-2 px-7 rounded-md transition-all duration-500 ease-in-out group  ">
                  <span className="relative z-10 text-sm lg:text-base ">
                    EXPLORE   <i className="fa-solid fa-arrow-right"></i>
                  </span>
                  <span className="absolute top-0 left-0 w-full lg:w-12   h-full bg-black transform transition-all duration-500 group-hover:w-full ease-in-out  lg:group-hover:bg-black"></span></button>

              </div>
            </div>
          </div>

          {/* SLIDER 2 */}

          <div className="relative border-r-2 shadow-md">
            <div className="flex justify-between">
              <img
                src={Slider2P1}
                alt="slider"
                className=" relative h-96"
              />
              <img
                src={Slider2P2}
                alt="slider"
                className=" relative h-96"
              />

            </div>
            <div className="absolute inset-0 bg-black opacity-25"></div>

            <div className={`  absolute inset-0 flex flex-col items-center justify-center text-center  gap-10 ${currentSlide === 1 ? 'animate-fade-in' : 'opacity-0'}`} >
              <h1 className="font-serif text-4xl font-bold leading-normal tracking-wide ">Style Beyond Limits, Confidence Without Boundaries.</h1>
              <p className=" max-w-[50rem] font-body  tracking-wider text-lg">Redefining fashion with elegance and confidence. Discover timeless styles for men and women that blend sophistication with modern trends.</p>
              <div className="space-x-10">
                <button className="bg-black font-body text-white px-6 py-2 rounded font-semibold hover:bg-gray-800 transition" >
                  Shop Men
                </button>

                <button className="bg-white font-body text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition">
                  Shop Women
                </button>
              </div>
            </div>
          </div>

          {/* SLIDER 3 */}
          <div className="relative border border-r-2 shadow-md ">
<div className="flex items-end justify-end">
<img
  src={Slider3}
  alt="slider1"
  className=" relative h-96 "/>
</div>
<div className="absolute inset-0 bg-black opacity-25"></div>

<div className={` absolute inset-0 flex flex-col items-center justify-center text-center mx-40 gap-10 ${currentSlide === 2 ? 'animate-fade-in' : 'opacity-0'}`} >
  <h1 className="font-serif text-4xl font-bold  tracking-wider ">Discover the Latest Trends</h1>
  <p className=" text-lg tracking-wider font-body">Get up to <span className="font-bold font-body">50% OFF</span> on our latest collection.</p>
  <button className=" bg-white text-black font-body px-4 py-2 rounded font-semibold uppercase tracking-wider">
    Grab the Deal
  </button>
</div>
</div>
         
        </Slider>
          
      </div>
  
      <div className="space-y-24 ">
      
        {/* Section 1 */}
       <div className="bg-gray-100">
          <h1 className=" text-5xl font-serif text-center font-bold  py-20">Shop by <span className="text-gray-500">category</span> </h1>
        <div className="grid grid-cols-3 ">
        {categories.map(category => (
          <div key={category._id} className="flex flex-col items-center my-5 " onClick={()=> handleCategoryClick(category._id)}>

  <div onClick={()=>navigate(`/products/${category._id}`)} className="text-center cursor-pointer shadow-2xl rounded-xl">
  <img
  className=" w-52  h-64 object-cover bg-gray-100 rounded-md shadow-2xl "
  src={category.img} alt="ethenic" />

  <h1 className="font-serif font-bold mt-2 ">{category.name}</h1>
  <h1 className="font-body text-2xl font-bold">{category.desc}</h1>
  <button className="pb-2 font-body text-lg">{category.btn}</button>
  </div>
</div>
          
        ))}
        </div>
        {selectedCategoryId && <Products selectedCategoryId={selectedCategoryId} />}
      </div>

{/* Section2  */}
      <div className="flex justify-center gap-16 items-center ">
        <div className=" flex flex-col items-center space-y-2 text-center  ">
        <i class="fa-regular fa-calendar  text-gray-400 text-4xl "></i>
        <h1 className="text-3xl font-serif tracking-wide leading-relaxed">Free Global Returns</h1>
        <p className="text-lg  text-gray-400  font-body w-72 ">At imperdiet dui accumsan sit amet nulla risus est ultricies quis.</p>
        </div>

        <div className=" flex flex-col items-center space-y-2 text-center   ">
        <i class="fa-solid fa-bag-shopping  text-gray-400 text-4xl "></i>
        <h1 className="text-3xl font-serif tracking-wide leading-relaxed">Pick up in store</h1>
        <p className="text-lg  text-gray-400  font-body w-72 ">At imperdiet dui accumsan sit amet nulla risus est ultricies quis.</p>
        </div>

        <div className=" flex flex-col items-center space-y-2 text-center  ">
        <i class="fa-solid fa-gift  text-gray-400 text-4xl "></i>
        <h1 className="text-3xl font-serif tracking-wide leading-relaxed">Special packaging</h1>
        <p className="text-lg  text-gray-400  font-body w-72 ">At imperdiet dui accumsan sit amet nulla risus est ultricies quis.</p>
        </div>
      </div>

{/* Section 3 */}
      <div className="h-screen bg-gray-100 flex">
  <div className="flex bg-white m-16 mx-36 gap-24">
  {/* Left Side - Image with White BG */}
  <div className="w-[55%]  flex justify-center items-center">
    <img src={Show} className="w-full h-full object-cover" />
  </div>

  {/* Right Side - Text with Gray BG */}
  <div className="w-[45%]   flex flex-col justify-center items-start mr-24">
    <h1 className="font-serif text-5xl leading-tight">
      Classic Winter Collection
    </h1>
    <p className="text-lg font-body text-gray-400 tracking-wider mt-5 leading-relaxed">
      Dignissim lacus, turpis ut suspendisse vel tellus. Turpis purus, gravida orci, fringilla a. 
      Ac sed eu fringilla odio mi. Consequat pharetra at magna imperdiet cursus ac faucibus sit libero.Ultricies quam nunc, lorem sit lorem urna, pretium aliquam ut. In vel, quis donec dolor id in. Pulvinar commodo mollis diam sed facilisis at cursus imperdiet cursus ac faucibus sit faucibus sit libero.
    </p>
    <button className="uppercase mt-5 bg-black  text-white py-2 px-3 hover:opacity-75 duration-300">Shop Collection</button>
  </div>
  </div>
</div>

{/* Section 4 */}
<div className="bg-white h-screen px-3">
  <div className="relative h-screen">
<img src={Banner} alt="" />
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">


    <div className="relative flex items-center justify-center w-64 h-64">
      {/* SVG Circle with Rotating Text */}
      <svg className="w-full h-full animate-spin-slow" viewBox="0 0 200 200">
        <defs>
          <path
            id="circlePath"
            d="M 100, 100
              m -75, 0
              a 75,75 0 1,1 150,0
              a 75,75 0 1,1 -150,0"
          ></path>
        </defs>
        <text className="text-[14.4px]  uppercase tracking-widest fill-white font-serif">
          <textPath href="#circlePath" startOffset="0%">
            Classic Collection 2022 • Classic Collection 2022 •
          </textPath>
        </text>
      </svg>

      {/* Center Button */}
      <button className="absolute px-4 py-2 bg-black text-white rounded-full text-lg font-semibold">
        Shop Now
      </button>
    </div>
    </div>
  </div>
</div>

{/* Section 5 */}
<div >
<Review/>
<div>

  {/* Section 6 */}
  <div className="flex justify-center items-center py-20 gap-32">
    <div>
      <img src={Brand1} className="h-14 w-36" />
    </div>
     <div>
      <img src={Brand2} className="h-14 w-36" />
    </div>
     <div>
      <img src={Brand3} className="h-14 w-36" />
    </div> 
    <div>
      <img src={Brand4} className="h-14 w-36"  />
    </div> 
    <div>
      <img src={Brand5} className="h-14 w-36"  />
    </div>
  </div>

{/* Section-7  */}
<div className="relative py-32 bg-gray-200 overflow-hidden flex items-center justify-center">
  {/* Background Watermark Text */}
  <div className="absolute inset-0 text-gray-500 opacity-5 text-6xl font-body tracking-wider  whitespace-nowrap">
    <div className="absolute w-full h-full flex flex-wrap">
      {Array(20).fill("").map((_, i) => (
        <span key={i} className="m-10">
          NEWSLETTER &nbsp; NEWSLETTER &nbsp; NEWSLETTER
        </span>
      ))}
    </div>
  </div>

  {/* Signup Content */}
  <div className="relative space-y-5 z-10 text-center">
    <h2 className="text-5xl font-serif tracking-wider leading-relaxed uppercase text-gray-900" >Sign Up for our newsletter</h2>
    <input type="text" className="w-full rounded-md p-2 text-gray-500 text-xl font-body border border-black  focus:shadow-lg focus:shadow-gray-500 focus:outline-none transition-all duration-300" placeholder="Your E-mail Address"/>
  <button className="uppercase bg-black text-white w-full p-2 hover:opacity-75 duration-300">Sign Up</button>
  </div>
</div>

{/* Section-9  */}
<div className=" flex justify-center py-20 ">
  <div className=" w-[21%] ">
    <h1 className="font-serif text-4xl uppercase mb-2 tracking-wider">ZYRE</h1>
    <p className="text-lg  font-body text-gray-500 tracking-wide">Gravida massa volutpat aenean odio. Amet, turpis erat nullam fringilla elementum diam in. Nisi, purus vitae, ultrices nunc. Sit ac sit suscipit hendrerit.</p>
    <div className="flex  gap-5 py-5 left-0 ">
 <a href="">
 <Facebook className="text-gray-500 "/>
 </a>
  <a href="">
 <Twitter className="text-gray-500"/>
 </a>
 <a href="">
 <Youtube className="text-gray-500"/>
 </a>
 <a href="">
 <Instagram className="text-gray-500"/>
 </a>
 <a href="">
 <Github className="text-gray-500"/>
 </a>
 </div>
  </div>

  <div className="uppercase w-[21%] tracking-wider">
  <h1 className="text-2xl font-serif mb-4">Quick links</h1>
  <ul className="font-body list-none">
    {["Home", "About", "Services", "Single Item", "Contact"].map((item, index) => (
      <li 
        key={index} 
        className="relative cursor-pointer w-fit overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[0.5px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
      >
        {item}
      </li>
    ))}
  </ul>
</div>

<div className="uppercase w-[21%] tracking-wider">
  <h1 className="text-2xl font-serif mb-4"> Help & info</h1>
  <ul className="font-body list-none">
    {["Track your order", "Return + exchange", "Shipping + Delivery", "Contact Us", "Find us easy", "Faqs"].map((item, index) => (
      <li 
        key={index} 
        className="relative cursor-pointer w-fit  overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[0.5px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
      >
        {item}
      </li>
    ))}
  </ul>
</div>

<div className=" w-[21%] tracking-wider">
  <h1 className="text-2xl font-serif mb-4 uppercase"> Contact us</h1>
   <p className="text-gray-500 font-body tracking-wider text-lg ">Do you have any questions or suggestions?</p>
   
   <a href="mailto:example@email.com"
        className=" tracking-wider relative cursor-pointer w-fit  overflow-hidden after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full"
      >
        contact@yourcompany.com </a>
        <p className="text-gray-500 font-body tracking-wider text-lg mt-4">Do you need support? Give us a call.</p>
        <a href="tel:+911234567890"
        className="relative text-lg cursor-pointer w-fit after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-black after:transition-all after:duration-300 hover:after:w-full "
        > +91 1234567890</a>
 
</div>


  
</div>



</div>



</div>
      </div>

      
    </div>
  );
}

export default Categories;
 