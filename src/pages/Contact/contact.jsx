import "./contact.scss";

export const Contact = () => {
    return (
        <section className="contact">
            <div className="about">
                <h3>Հետադարձ կապ</h3>
                <p>
                    Ունեք դիտողություններ` գրե՛ք մեզ: Մենք սիրո՛ւմ ենք հետադարձ կապը: Սա Ձեր կայքն է, և Ձեր առաջարկները կօգնեն մեզ բարելավել այն:
                </p>

                <p>
                    Խնդրում ենք նկարագրել Ձեր հարցի բուն իմաստը հնարավորինս մանրամասն: Եթե Ձեր հարցը կապված է արդեն գոյություն ունեցող հայտարարության հետ, խնդրում ենք նշել նրա համարը:
                </p>

                <div className="message-us">
                    <form>
                        <div>
                            <label htmlFor="email">
                                Ձեր էլ․ փոստի հասցեն
                            </label>
                            <input type="email" id="email" placeholder="Էլ․ փոստ" />
                        </div>

                        <div>
                            <label htmlFor="sms">
                                Ձեր հաղորդագրությունը
                            </label>
                            <input type="text" id="sms" className="last-inp" placeholder="Հաղորդագրություն" />
                        </div>

                        <button className="btn btn-primary" onClick={(e) => {
                            e.preventDefault();
                            alert("Ձեր հաղորդագրությունը հաջողությամբ ուղարկվել է։")
                        }}>Ուղարկել</button>
                    </form>
                </div>
            </div>
        </section>
    )
}