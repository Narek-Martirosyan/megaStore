
import './App.css';
import { MyRoutes } from './myRoutes';
import { useDispatch } from 'react-redux';
import {
  changeCategories,
  changeFavoritesID,
  changeProducts,
  changeFavorites,
  changeCart,
  changeCartID
} from './features/products/productsSlice';
import { useEffect, useState } from 'react';
import { getProducts } from './api/products';
import { getCategories } from './api/categories';
import { useLocation } from 'react-router-dom';
import goTop from "./img/goTop.png";

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();


  const [scrollTop, setScrollTop] = useState(false);

  useEffect(() => {
    dispatch(changeFavoritesID());
    dispatch(changeFavorites());
    dispatch(changeCart());
    dispatch(changeCartID());
    getProducts().then(res => dispatch(changeProducts(res.data.products)));
    getCategories().then(res => dispatch(changeCategories(res.data.categories)));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="App">
      <MyRoutes />
      {scrollTop && <img src={goTop} alt="go top" className='go-top-button' onClick={() => window.scrollTo(0, 0)} />}
    </div>
  );
}

export default App;
