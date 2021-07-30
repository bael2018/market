import cls from './Footer.module.css'

const Footer = () => {
    return (
        <section className={cls.footer_container}> 
            <div className={cls.footer_inside}>
                <h3>Наши соцсети</h3>
                <ul>
                    <li>
                        <a rel='noreferrer' target="_blank" href="https://www.instagram.com/?hl=ru">
                            Instagram
                        </a>
                    </li>
                    <li>
                        <a rel='noreferrer' target="_blank" href="https://www.facebook.com/">
                            Facebook
                        </a>
                    </li>
                    <li>
                        <a rel='noreferrer' target="_blank" href="https://vk.com/">
                            Vkontakte
                        </a>
                    </li>
                    <li>
                        <a rel='noreferrer' target="_blank" href="https://ok.ru/dk?st.cmd=anonymMain">
                            Odnoklassniki
                        </a>
                    </li>
                    <li>
                        <a rel='noreferrer' target="_blank" href="https://xn--80affa3aj0al.xn--80asehdb/#/login">
                            Telegram
                        </a>
                    </li>
                    <li>
                        <a rel='noreferrer' target="_blank" href="https://twitter.com/home">
                            Twitter
                        </a>
                    </li>
                </ul>
            </div> 
        </section>
    )
}

export default Footer