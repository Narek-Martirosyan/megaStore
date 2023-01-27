import "./cart.scss";
import { useSelector } from "react-redux";
import { cartProvider } from "../../features/products/productsSlice";
import { onCartClick } from "../../addToLocalStorage";

export const Cart = () => {
  const cart = useSelector(cartProvider);

  const removeAll = () => {
    cart.forEach(p => onCartClick(p));
  }

  return (
    <section className="cart-page">
      <div className="cart-container">
        <div className="header">
          <h3 className="heading">Զամբյուղ</h3>
          <h5 className="action" onClick={() => removeAll()}>Ջնջել ամբողջը</h5>
        </div >

        {!!cart.length ? cart?.map(product => (
          <div className="container" key={product?.id}>
            <div className="cart-Items">
              <div className="row justify-content-between">
                <div className="col-lg-3 col-md-6">
                  <div className="image-box">
                    <img src={product?.main_image} alt={product?.title} />
                  </div>
                </div>

                <div className="col-lg-9 col-md-6">
                  <div className="row">
                    <div className="col-lg-9">
                      <div className="about">
                        <h1 className="title">{product?.title}</h1>
                      </div >
                    </div>

                    <div className="col-lg-3">
                      <div className="prices">
                        <div className="amount">${product?.price}.00</div>
                        <div className="remove" onClick={() => onCartClick(product)}><u>Ջնջել</u></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )): 
        <h4 style={{textAlign: "center"}}>Ձեր զամբյուղը դատարկ է</h4>} 
      </div >
    </section >
  )
}