import cls from './General.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css'
import SwiperCore , {Autoplay,  Navigation}  from 'swiper'
import {getClothes} from '../../api/index'
import { arrayFunc } from "../../components/ArrayFunc"
import { useEffect, useState } from 'react';
import Loader from "../../components/Loader/Loader"
import { Link } from 'react-router-dom';

SwiperCore.use([Autoplay, Navigation])

const General = () => {
    const [loading , setLoading] = useState(false)

    const [clotheBase , setClotheBase] = useState([])
    const [newClothe , setNewClothe] = useState([])
    useEffect(() => {
        getClothes('products.json' , '' , '')
        .then(res => res.json() , setLoading(true))
        .then(r => {
            setLoading(false)
            const base = arrayFunc(r)
            const newBase = base.filter(({state}) => state === 'Популярное')
            const newData = base.filter(({state}) => state === 'Новая')
            setClotheBase(newBase)
            setNewClothe(newData)
        })
    }, [])

    return (
        <section className={cls.root}>
            <div className={cls.main_carousel_container}>
                <Swiper speed={1000} navigation className={cls.main_carousel_one}
                    spaceBetween={10}>
                    <SwiperSlide className={cls.carousel_inner}>
                        <img alt='carousel_image' src="https://i.pinimg.com/originals/48/59/9c/48599c5031a271d65514d416603a6937.jpg"/>
                    </SwiperSlide>
                    <SwiperSlide className={cls.carousel_inner}>
                        <img alt='carousel_image' src="https://i.pinimg.com/originals/f7/25/b1/f725b1367840cdca3854ec21c103ceb9.jpg"/>
                    </SwiperSlide>
                    <SwiperSlide className={cls.carousel_inner}>
                        <img alt='carousel_image' src="https://www.dress-for-less.com/on/demandware.static/-/Library-Sites-ContentSharedLibrary/default/dwd78fe39b/images/teaser/2021_KW30/20210729/p_3_4_5/tommy.jpg"/>
                    </SwiperSlide>
                </Swiper>

                <Swiper speed={1000} autoplay={{delay: 2500}} className={cls.main_carousel_two}
                    spaceBetween={10}>
                    <SwiperSlide className={cls.carousel_inner}>
                        <img alt='carousel_image' src="https://previews.123rf.com/images/dipressionist/dipressionist1612/dipressionist161200071/68703466-clothe-store.jpg"/>
                    </SwiperSlide>
                    <SwiperSlide className={cls.carousel_inner}>
                        <img alt='carousel_image' src="https://www.ecotextile.com/images/stories/2021/March/clothes_rail_4.jpg"/>
                    </SwiperSlide>
                    <SwiperSlide className={cls.carousel_inner}>
                        <img alt='carousel_image' src="https://www.thoughtco.com/thmb/C7RiS4QG5TXcBG2d_Sh9i4hFpg0=/3620x2036/smart/filters:no_upscale()/close-up-of-clothes-hanging-in-row-739240657-5a78b11f8e1b6e003715c0ec.jpg"/>
                    </SwiperSlide>
                </Swiper>
            </div>

            <div className={cls.main_container}>
                <div className={cls.main_container_title}>
                    <span>ПОПУЛЯРНОЕ</span>
                    <div></div>
                </div>
                <div className={cls.main_container_wrapper}>
                    {
                        loading ? (
                            <Loader/>
                        ) : (
                            clotheBase.map(({img , category , subCategory , id , state , name , price } , index) => {
                                return (
                                <div key={index} className={cls.main_container_wrapper_child}>
                                    <div className={cls.main_container_wrapper_child_header}>
                                        <img alt='clothe_image' src={img}/>
                                    </div>
                                    <div className={cls.main_container_wrapper_child_body}>
                                        <div className={cls.main_container_wrapper_child_body_inner_one}>
                                            <p><span>{price} $</span></p>
                                            <h4>{name}</h4>
                                            <h4><span>{state}</span></h4>
                                        </div>
                                        <Link to={`/${category}/${subCategory}/${id}`}>подробнее</Link>
                                    </div>
                                </div>
                                )
                            })
                        )
                    }
                </div>

                <div className={`${cls.main_container_title} ${cls.main_container_title_alt}`}>
                    <span>НОВИНКИ МЕСЯЦА</span>
                    <div></div>
                </div>
                <div className={cls.main_container_wrapper}>
                    {
                        loading ? (
                            <Loader/>
                        ) : (
                            newClothe.map(({img , category , subCategory , id , state , name , price } , index) => {
                                return (
                                <div key={index} className={cls.main_container_wrapper_child}>
                                    <div className={cls.main_container_wrapper_child_header}>
                                        <img alt='clothe_image' src={img}/>
                                    </div>
                                    <div className={cls.main_container_wrapper_child_body}>
                                        <div className={cls.main_container_wrapper_child_body_inner_one}>
                                            <p><span>{price}$</span></p>
                                            <h4>{name}</h4>
                                            <h4><span>{state}</span></h4>
                                        </div>
                                        <Link to={`/${category}/${subCategory}/${id}`}>подробнее</Link>
                                    </div>
                                </div>
                                )
                            })
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default General