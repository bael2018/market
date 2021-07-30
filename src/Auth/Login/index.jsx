import { useState } from 'react'
import cls from './Login.module.css'
import {fire , provider} from '../../services/firebase'
import { useHistory } from 'react-router'
import { NavLink } from 'react-router-dom'
import { getClothes } from '../../api'
import { arrayFunc } from '../../components/ArrayFunc'

const API_KEY = 'AIzaSyCUvwZ6ZYut4Iz7IrUjr3lPo4xDTMF9__Y'
const BASE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`

const Login = () => {
    const history = useHistory()
    const signInGoogle = e => {
        e.preventDefault();
        fire.auth().signInWithPopup(provider)
        .then(r => {
            localStorage.setItem('user' , JSON.stringify(r.user.uid))
            fetch(`https://market-daa4b-default-rtdb.asia-southeast1.firebasedatabase.app/users/${r.user.uid}.json` , {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                })
            })
            .then(() => history.push('/'))
        })
        .catch(err => console.log(err))
    }
    
    const [password , setNewPass] = useState('')
    const [email , setNewEmail] = useState('')
    const signIn = e => {
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
            .then(userId => {
                userId.localId ? (
                    getClothes('users.json' , '' , '')
                    .then(result => result.json())
                    .then(el => {
                        const usersData = arrayFunc(el)
                        usersData.forEach(item => {
                            if(item.id === userId.localId){
                                localStorage.setItem('user' , JSON.stringify(item.id))
                                history.push('/')
                            }
                        })
                    })
                ) : (
                    alert('Не правильно ввели данные')
                )
                setNewEmail('')
                setNewPass('')
            })
        }else{  
            alert("Заполните поля ввода!")
        }
    }

    return (
        <section className={cls.root}>
            <div className={cls.login}>
                <div className={cls.login_body}>
                    <h3 className={cls.login_title}>Авторизация</h3>
                    <form action="address">
                    <div>
                            <input value={email} onChange={e => setNewEmail(e.target.value)} placeholder='Email' type="email" />
                        </div>
                        <div>
                            <input value={password} onChange={e => setNewPass(e.target.value)} placeholder='Password' type="password" />
                        </div>
                        <div>
                            <button onClick={signIn}>Подтвердить</button>
                        </div>
                    </form>

                    <div className={cls.login_quik}>
                        <h3>Быстрый вход</h3>
                        <img onClick={signInGoogle} src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="logo" />
                    </div>
                    <div className={cls.login_newAccount}>
                        Еще нет аккаунта? <NavLink to='/register'>Регистрация</NavLink>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login


// const products = [
//     {
//         id: 1,
//         title: '',
//         img: '',
//         category: 'male || female',
//         subCategory: 'clothes',
//         price: '12312312',
//         size: '',
//     }
// ]