import Product from "./Product"
import './home.css'

const Home = () => {
    return (
        <div className="home">
            <div className="home__container">
                <img 
                    className="home__image"
                    alt="Join prime now"
                    src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2021/X-site/SingleTitle/TFM2/Launch/1500x600_Hero-Tall_JPN._CB667281378_.jpg"
                />

                <div className="home__row">
                    <Product 
                        id={1}
                        title="Zebronics Wired Keyboard and Mouse Combo with 104 Keys and a USB Mouse with 1200 DPI - JUDWAA 750"
                        image="https://images-na.ssl-images-amazon.com/images/I/71XlOI9x%2BvL._SX569_.jpg"
                        price={355.00}
                        rating={5}
                    />
                    <Product
                        id={2}
                        title="OnePlus Buds Z (White)"
                        image="https://images-na.ssl-images-amazon.com/images/I/51vwQzwM%2BZL._SX425_.jpg"
                        price={2699.00}
                        rating={5}
                    />
                </div>

                <div className="home__row">
                    <Product
                        id={3}
                        title="Enerzal Energy Drink Powder Orange Flavour 50 GM (Pack of 10)"
                        image="https://images-na.ssl-images-amazon.com/images/I/61QKaYH7zfL._SY450_.jpg"
                        price={400}
                        rating={5}
                    />
                    <Product
                        id={4}
                        title="HealthSense Chef-Mate KS 40 Digital Kitchen Weighing Scale & Food Weight Machine for Health, Fitness, Home Baking & Cooking, 1 Year Warranty & Battery Included (Milk Grey)"
                        image="https://images-na.ssl-images-amazon.com/images/I/61bF0NmGOVL._SY450_.jpg"
                        price={799}
                        rating={3}
                    />
                    <Product
                        id={5}
                        title="Chamois Butt'r Her' 8oz tube"
                        image="https://images-na.ssl-images-amazon.com/images/I/51O%2B8qAP33L._SX679_.jpg"
                        price={3000}
                        rating={5}
                    />
                </div>

                <div className="home__row">
                    <Product
                        id={6}
                        title="CARE VIEW Non-Woven Fabric Reuseable N95 Mask (White, Without Valve, Pack of 10) for Unisex"
                        image="https://images-na.ssl-images-amazon.com/images/I/61yM%2BGQ8jPL._SY355_.jpg"
                        price={699}
                        rating={4}
                    />
                </div>

            </div>
        </div>
    )
}

export default Home
