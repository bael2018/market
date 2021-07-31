import { useEffect, useState } from 'react'
import {deleteClothe, getClothes } from '../../api'
import {clothedId} from '../ArrayFunc'
import Loader from '../Loader/Loader'
import cls from './Heart.module.css'

const HeartsList = () => {
    const userId = JSON.parse(localStorage.getItem('user'))
    const [base , setBase] = useState([])
    const [loading , setLoading] = useState(false)
    const [cards , setCards] = useState(false)

    const removeBusket = card_id => {
        deleteClothe('users' , `${userId}` , 'cards/' , `${card_id}.json` , '')
        .then(() => setCards(!cards))
    }   

    useEffect(() => {
        getClothes('users/' , `${userId}/` , 'cards.json')
        .then(res => res.json() , setLoading(true))
        .then(r => {
            setLoading(false)
            if(r !== null){
                const heartsList = clothedId(r)
                setBase(heartsList)
            }
        })
    }, [userId , cards])

    return (
        <section className={cls.heartList}>
            <h1 className={cls.heartListTitle}>Корзина</h1>
            {
                base.length === 0 ? null : (
                    <h3 className={cls.clotheCounter}>Сумма всех товаров: <span>{
                        base.reduce((total , prev) => {
                            return +total + +prev.price
                        }, '')
                        }$</span></h3>
                )
            }
            {
                loading ? (
                    <Loader/>
                ) : (
                    base.length === 0 || base === null ? (
                        <h3 className={cls.empty}>Корзина пуста</h3>
                    )  :(
                        base.map(({content , name , price , img , size , accept , state} , index) => {
                            return (
                                <div key={index + 1} className={cls.heartListInner}>
                                <h2 className={cls.heartListWrapperTitle}>{name}</h2>
                                <div className={cls.heartListInnerWrapper}>
                                    <img src={img} alt="logo" />
                                    <div className={cls.heartListInnerWrapperChild}>
                                        <h2>Цена: <span>{price} $</span></h2>
                                        <h2>Размер: <span>{size}</span></h2>
                                        <h2>Состояние: <span>{state}</span></h2>
                                    </div>

                                    <div>
                                        <h3>Параметры</h3>
                                        <p>{content}</p>
                                    </div>

                                    <div className={cls.heartListInnerWrapperChild}>
                                        <button onClick={() => removeBusket(accept)}>
                                            Убрать из корзины
                                        </button>
                                    </div>
                                </div>
                            </div>  
                            )
                        })
                    )
                )
            }
        </section>
    )
}

export default HeartsList