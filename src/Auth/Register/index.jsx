import { useState } from 'react'
import cls from './Register.module.css'
import { useHistory } from 'react-router'
import { NavLink } from 'react-router-dom'

const API_KEY = 'AIzaSyCUvwZ6ZYut4Iz7IrUjr3lPo4xDTMF9__Y'
const BASE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`

const Register = () => {
    const [password , setPass] = useState('')
    const [email , setEmail] = useState('')
    const history = useHistory()

    const signUp = e => {
        e.preventDefault()

        if(email !== '' && password !== ''){
            fetch(BASE_URL , {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true
                })
            })
            .then(res => res.json())
            .then(r => {
                console.log(r);
                localStorage.setItem('user' , JSON.stringify(r.localId))
                fetch(`https://market-daa4b-default-rtdb.asia-southeast1.firebasedatabase.app/users/${r.localId}.json` , {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        email,
                    })
                })
                .then(response => response.json())
                .then(() => {
                    setPass('')
                    setEmail('')
                    history.push('/')
                })
            })
              
        }else{  
            alert("Заполните поля ввода!")
        }
    }

    return (
        <section className={cls.root}>
            <div className={cls.login}>
                <div className={cls.login_body}>
                    <h3 className={cls.login_title}>Регистрация</h3>
                    <form action="address">
                        <div>
                            <input value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' type="email" />
                        </div>
                        <div>
                            <input value={password} onChange={e => setPass(e.target.value)} placeholder='Password' type="password" />
                        </div>
                        <div>
                            <button onClick={signUp}>Подтвердить</button>
                        </div>
                    </form>
                    <div className={cls.login_newAccount}>
                        Уже есть аккаунт? <NavLink to='/login'>Авторизация</NavLink>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register