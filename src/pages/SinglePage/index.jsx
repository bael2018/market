import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createNewClothes, getClothes } from '../../api'
import Loader from '../../components/Loader/Loader'
import cls from './SinglePage.module.css'
import { arrayFunc , clothedId} from '../../components/ArrayFunc'

const SinglePage = () => {
    const {gen , cat , id } = useParams()
    const [base , setBase] = useState([])
    const [loading , setLoading] = useState(false)

    useEffect(() => {
        getClothes('products.json' , '' , '' )
        .then(res => res.json() , setLoading(true))
        .then(r => {
            setLoading(false)
            const data = arrayFunc(r)
            const newBase = data.filter(item => item.category === gen && item.subCategory === cat && item.id === id)
            setBase(newBase)
        })
    }, [id , gen , cat])

    const [heart , setHeart] = useState([])
    const elems = JSON.parse(localStorage.getItem('user'))
    getClothes('users/' , `${elems}/` , 'cards.json')
        .then(res => res.json())
        .then(r => {
        if(r !== null){
            const dataBase = clothedId(r)
            setHeart(dataBase)
        }
    })

    const [warningAlert , setWarningAlert] = useState(false)

    const heartbtn = product => {
        if(!localStorage.getItem('user')){
            setWarningAlert(!warningAlert)
            setTimeout(() => {
                setWarningAlert(false)
            }, 3000);
        }else{
            const userId = JSON.parse(localStorage.getItem('user'))
            createNewClothes(product, 'users/' , `${userId}/` , 'cards.json')
        }
    }

    return (
        <section className={cls.root}>
            <div className={warningAlert ? `${cls.alert} , ${cls.activeAlert}` : `${cls.alert}` }>Пройдите авторизацию</div>
            {
                loading ? (
                    <Loader/>
                ) : (
                    base.map((item , index) => {
                        return <div key={index + 1} className={cls.card}>
                            <div className={cls.card_content}>
                                <h1>{item.name}</h1>
                                <h3>Цена: <span>{item.price} $</span></h3>
                                <h3>Размер: <span>{item.size}</span></h3>
                                <h3>Состояние: <span>{item.state}</span></h3>
                                <h4>Описание:</h4>
                                <p>{item.content}</p>
                                <div>
                                    <button
                                        onClick={() => heartbtn(item)} 
                                        className={
                                            heart.map(item => {
                                                return `
                                                    ${item.id === id ? cls.activeButton : null}
                                                `
                                            })
                                        }>
                                        <span>Добавить в корзину</span>
                                    </button>
                                </div>
                            </div>
                            <div className={cls.card_image}>
                                <div>
                                    <img src={item.img} alt="logo" />
                                </div>  
                            </div>  
                        </div>
                    })
                )
            }
        </section>
    )
}

export default SinglePage