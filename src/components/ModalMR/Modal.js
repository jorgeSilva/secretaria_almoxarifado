import React from 'react'
import style from './style.module.css'
import { SolictContext } from '../../context/mrSolictContext'
import api from '../../services/api'

const Modal = ({data}) => {
  const {
    nome, 
    QTDP,
    unidade,
    error,
    handleNome,
    handleQTDP,
    handleUnidade,
    handleSubmit,
    produtos,

  } = React.useContext(SolictContext)

  const [filterProdutos, setFilterProdutos] = React.useState([])
  const [produto, setProduto] = React.useState(false)

 /*  async function getProdutos(){
    await api.get(`/secretaria/produtos/${data.secretaria}`)
        .then(({data}) => setProduto(data))
          .catch(e => console.log(e))
  }
  
  console.log(produto);

  const handleFilter = () => {
    const search = nome
    const newFilter = produto.filter((item) => {
      return item.nome.includes(search)
    })

    setFilterProdutos(newFilter)
  } */

  React.useEffect(() => {
    if(data){
      // getProdutos()
    }
  }, [])
  
  return (
    <>
    <section className={style.modal__container}>
      <section className={style.modal__content}>
        <>
        <div className={style.card__container}>
          <div className={style.card__content}>
            <div className={`${style.card__textbox} ${style.card__password}`}>
              <input
                value={nome}
                onChange={handleNome}
                id={nome}
                required
              />

              <label htmlFor={nome}>Nome Produto</label>
              {
                filterProdutos.lenght &&
                <div className={style.card__modal__list__content}>
                  {
                    produtos &&
                    filterProdutos.map((item) => {
                      <p className={style.card__modal__list}>
                        {item.nome}
                      </p>
                    })
                  }
                </div>
              }
            </div>

            <div className={`${style.card__textbox} ${style.card__password}`}>
              <input
                value={QTDP}
                onChange={handleQTDP}
                id={QTDP}
                required
              />

              <label htmlFor={QTDP}>Quantidade Produto</label>
            </div>

            <div className={`${style.card__textbox} ${style.card__password}`}>
              <input
                value={unidade}
                onChange={handleUnidade}
                id={unidade}
                required
              />

              <label htmlFor={unidade}>Unidade de Medida</label>
            </div>

            <button onClick={handleSubmit} className={style.modal__button__save}>
              SOLICITAR
            </button>

            {
              error && <p className={style.modal__p__error}>{error}</p>
            }
          </div>
        </div>
      </>
      </section>
    </section>

    </>
  )
}

export default Modal