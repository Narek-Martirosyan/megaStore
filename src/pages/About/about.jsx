import "./about.scss";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { UsageAgreement } from "../UsageAgreement";

export const About = () => {
    const { pathname } = useLocation();

    return (
        <section className="about">
            <div className="about-us">
                <div className="left">
                    {pathname === "/about" ?
                        <div>
                            <h3 className="title">Մեր մասին</h3>
                            <p>
                                The Mega Stor–ը հիմնադրվել է 2005թ.-ին, մեր հայրենակիցներին առցանց հարթակի միջոցով գնելու և վաճառելու հնարավորություն ընձեռնելու նպատակով: Այսօր այն հանդիսանում է Հայաստանում է ոչ միայն առցանց առևտրի առաջատար հարթակն այլ ամենախոշոր կայքը Հայաստանում:
                            </p>
                            <p>
                                The Mega Stor–ը հնարավորություն կտա ձեզ կապ հաստատել սպառողների լայն լսարանի հետ ինչպես Հայաստանում, այնպես էլ նրա սահմաններից դուրս:
                            </p>
                            <p>
                                The Mega Stor–ի օգնությամբ դուք կարող եք գնել, վարձակալել և վաճառել տարատեսակ ապրանքներ և ցանկացած անշարժ գույք, առաջարկել և գտնել աշխատանք, ինչպես նաև մի շարք այլ ծառայություններ:
                            </p>
                            <p>
                                Բիզնես գործունեություն ծավալող օգտատերերի համար, The Mega Stor-ի հարթակը հնարավորություն է ընձեռում լավագույնս ցուցադրել իրենց ապրանքատեսականին և խթանում է վերջիններիս բիզնեսի զարգացմանը:
                            </p>
                            <p>
                                Մենք մեր առաքելությունն ենք համարում` օգնել մեր հայրենակիցներին գտնել այն ինչ փնտրում են, վաճառել այն ինչ ցանկանում են և այդ ամենը միավորել մեկ հարթակում` բարելավելով Ձեր կենցաղը:
                            </p>
                        </div> : pathname === "/about/1" ?
                        <UsageAgreement /> : null
                    }

                </div>

                <div className="right">
                    <NavLink to="/about" end>Մեր մասին</NavLink>
                    <NavLink to="/about/1" end>Օգտագործման համաձայնագիր</NavLink>
                    <NavLink to="/contact" end>Կապը մեզ հետ</NavLink>
                </div>
            </div>
        </section>
    )
}