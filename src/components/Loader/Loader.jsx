import cls from './Loader.module.css'

const Loader = () => {
    return (
        <div className={cls.loading}>
              <div className={cls.lds_dual_ring}></div>
        </div>
    )
}

export default Loader