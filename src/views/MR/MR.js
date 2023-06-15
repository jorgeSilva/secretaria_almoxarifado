import React from 'react'
import style from './style.module.css'
import api from '../../services/api'
import isConnected from '../../utils/isConnected'
import {ReactComponent as SvgPrancheta} from  '../../assets/Prancheta.svg'
import {ReactComponent as SVGSearch} from  '../../assets/iconSearch.svg'
import {ReactComponent as SVGRotate} from  '../../assets/IconAround.svg'
import {ReactComponent as SVGIconeOption} from  '../../assets/undraw_check_boxes_re_v40f (1).svg'
import CardModal from '../../components/ModalMR/Modal'
import Card from '../../components/Card/Card'
import CardSolicit from '../../components/CardSolicitMR/CardSolicit'

const MR = () => {

  document.title = 'Merenda Escolar | Merendeira'
  

/* ---------------- ESTADO BANCO DE DADOS -------------------- */

  const url = document.URL.split("/").slice(-1)
  const [data, setData] = React.useState(null)
  const [name, setName] = React.useState('')
  const [lastRequisited, setLastRequisited] = React.useState(false)
  const [ultimoRequisited, setUltimoRequisited] = React.useState(false)
  const [produtos, setProdutos] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  async function getUser(){
    setLoading(true)
    const {data} = await api.get(`/usuario/${url}`)
    try{
      setData(data)

      if(data){
        const firstAndLastName = data.name.split(' ')
        setName(firstAndLastName.shift().concat(` ${firstAndLastName.pop()}`) )
      }
      setLoading(false)
    }catch(error){
      console.log(error);
    }
  }

  async function getRequisited(){
    setLoading(true)
    await api.get(`/rt/${url}`)
      .then(({data}) => {
        setLastRequisited(data)
        setUltimoRequisited(data.at(-1))
        setLoading(false)
      })
        .catch(error => console.log(error))
  }

  async function getSolicitados(){
    setLoading(true)
    const { data } = await api.get(`/rt/gl/aprovados/${url}`)
      try{
        if(data == true || data){
          setProdutos(data)
        }
        setLoading(false)
      }catch(error){
        setError(error)
      }
  }

  /* -----------------ESTADOS FRONT-END ------------------------  */
  const date = new Date()
  const [solicitar, setSolicitar] = React.useState('')
  const [active, setActive] = React.useState(false)
  const [atualizar, setAtualizar] = React.useState('')
  const [valuesolicitar, setValuesolicitar] = React.useState('')
  const [search, setSearch] = React.useState('')
  const [dataSearch, setDataSearch] = React.useState([])

  const ProdutosFiltrados = React.useMemo(() => {
    const lowerCase = search.toLocaleLowerCase()

    if(produtos){
      setDataSearch(produtos)
      setValuesolicitar(produtos.at(-1))
    }

    return dataSearch.filter((item) => item.nome.toLocaleLowerCase().includes(lowerCase))

  }, [produtos, search])

  const handleClicksolicitar = () => {
      setSolicitar('active')
      setAtualizar('')
  }

  const [attRecem, setAttRecem] = React.useState(false)

  const handleClickatualizar= () => {
    setSolicitar('')
    setAtualizar('active')

    if(produtos == false){
      setAttRecem(false)
    }else{
      setAttRecem(produtos)
    }
  }

  React.useEffect(() => {
    if(!isConnected){
      window.location.href = '/'
    }
    getUser()
    getRequisited()
    getSolicitados()
  }, [])

  return (
    <>
      <section className={style.body__login}>
        <div className={style.body_background}>
          <div className={style.body__background_one}></div>
          <div className={style.body__background_two}></div>
          <div className={style.body__background_tree}></div>
        </div>
        {
          loading ? 
            <section className={style.body__loading}>
              <div className={style.body__spinner}>
                <div className={style.spinner}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </section> 
            :
            <section className={style.body__container}>
              <section className={style.body__content}>
                <header className={style.body__header}>
                  <div className={style.body__header__child}>
                    {
                      date.getHours() < 12 ? 
                      <h1> Bom dia {name}.</h1> : ''
                      || 
                      date.getHours() >= 12 && date.getHours() < 18 ? 
                      <h1>Boa tarde {name}.</h1> : ''
                      ||
                      date.getHours() >= 18 ? 
                      <h1>Boa noite {name}.</h1> : ''
                    }

                    <div className={style.body__container_search}>
                      <input 
                        value={search}
                        id='search'
                        onChange={({target}) => setSearch(target.value)}
                        placeholder='Procure um produto pelo nome.' 
                        className={style.body__search}/>
                      
                      <label htmlFor='search'>
                        <SVGSearch/>
                      </label>
                    </div>
                  </div>
                </header>

                {/* ------------ BOTOES PARA EXIBIR FUNÇÕES ABAIXO --------------- */}
                <section className={style.body__options}>
                  {
                    solicitar && !atualizar ? 
                    <div className={style.body__options__content}>
                      <SvgPrancheta className={style.body__options__svg_active}/>
                      <button className={style.body__options__button_active} onClick={handleClicksolicitar}>
                        Solicitar
                      </button> 
                    </div>
                      : 
                    <div className={style.body__options__content}>
                      <SvgPrancheta className={style.body__options__svg}/>
                      <button className={style.body__options__button} onClick={handleClicksolicitar}>
                        Solicitar
                      </button>
                    </div>
                  }

                  {
                    atualizar && !solicitar ? 
                    <div className={style.body__options__content}>
                      <SVGRotate className={style.body__options__svg_active}/>
                      <button className={style.body__options__button_active} onClick={handleClickatualizar}>
                      Atualizar produtos recem chegados
                      </button> 
                    </div>
                      : 
                    <div className={style.body__options__content}>
                      <SVGRotate className={style.body__options__svg}/>
                      <button className={style.body__options__button} onClick={handleClickatualizar}>
                      Atualizar produtos recem chegados
                      </button>
                    </div>
                  }
                </section>

                {/* ---------------- EXIBIÇÃO CONFORME A OPÇÃO SELECIONADA ---------- */}

                {
                  solicitar && 
                  <div className={style.body__container__title_subtitle}>
                    <h2 className={style.body__title}>Solicitar Produtos</h2>
                    <p className={style.body__subtitle}>Clique em "Solicitar Produto" para fazer os pedidos dos produtos requisitados em sua escola.</p>
                  </div>
                    ||
                  atualizar && 
                  <div className={style.body__container__title_subtitle}>
                    <h2 className={style.body__title}>Atualizar Produtos Recém Chegados</h2>
                    <p className={style.body__subtitle}>Confira se foi enviado todos os produtos para sua escola.</p>
                  </div>
                }
                
                {
                  search &&
                  <section className={style.body__show__cards}>
                  {
                    ProdutosFiltrados ?
                      ProdutosFiltrados.map((item) => (
                        <CardModal
                        nome={item.nome} key={item._id}
                        quantidadeProduto={item.quantidadeProduto}
                        unidadeMedida={item.unidadeMedida}
                        />
                      )) 
                      :  
                      <section className={style.body__nobody__list}>
                        <h3>Ainda não existe produtos no almoxarifado.</h3>
                      </section>
                  }
                  </section> 

                  ||

                  solicitar && 
                    <>
                      <section className={style.body__show__cards}>
                        {
                          active &&  
                            <section className={style.body__card__solicit__active}>
                              <CardModal data={data}/>
                            </section>  
                        }

                        <button className={style.body__button_post} 
                          onClick={() => setActive(!active)}>
                          <p>
                            Solicitar Produto

                            <SvgPrancheta className={style.body__options__svg}/>
                          </p>
                        </button>
                        {
                          ultimoRequisited ?
                          <>  
                            <h3 className={style.body__text__card}>
                              Ultimo produto solicitado.
                            </h3>
                          
                            <Card nome={ultimoRequisited.nome} quantidadeProduto={ultimoRequisited.quantidadeProduto} unidadeMedida={ultimoRequisited.unidadeMedida}/>
                          </>
                            :
                          <h3 className={style.body__text__card}>
                            Não foi solicitado nenhum produto
                          </h3>
                        }
                      </section>
                    </>

                  ||

                  atualizar && 
                    <section className={style.body__show__cards}>
                      {
                        attRecem ?
                          attRecem.map((item) => (
                            <CardSolicit 
                            key={item._id}
                            _id={item._id}
                            rt={item.rt}
                            entregue={item.entregue}
                            horario={item.horario} 
                            nome={item.nome} 
                            quantidadeProduto={item.quantidadeProduto} solicitado={item.solicitado} 
                            unidadeMedida={item.unidadeMedida} 
                            merendeira={item.merendeira.name}
                            idEscola={item.merendeira.fkEscola}
                            secretaria={item.secretaria._id}
                            />
                          )) 
                          :  
                          
                          <section className={style.body__nobody__list}>
                            <h3>Nenhum produto foi enviado</h3>
                          </section>
                          
                      }
                    </section>

                  ||

                  <section className={style.body__nobody__option}>
                  <h3>Escolha uma opção</h3>
                  <div className={style.body__icon__option}>
                    <SVGIconeOption />
                  </div>
                </section>
                }
              </section>
            </section>
        }
      </section>
    </>
  )
}

export default MR