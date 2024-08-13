import React from 'react'
import style from './style.module.css'
import api from '../../services/api'
import isConnected from '../../utils/isConnected'
import {ReactComponent as SVGChecked} from  '../../assets/iconOk.svg'
import {ReactComponent as SVGSearch} from  '../../assets/iconSearch.svg'
import {ReactComponent as SVGBox} from  '../../assets/IconBox.svg'
import {ReactComponent as SVGEstatistica} from  '../../assets/iconEstatisticas.svg'
import {ReactComponent as SVGIconeOption} from  '../../assets/undraw_check_boxes_re_v40f (1).svg'
import {ReactComponent as SVGExit} from  '../../assets/box-arrow-left.svg'
import Card from '../../components/Card/Card'
import CardSolicit from '../../components/CardSolicitGL/CardSolicit'
import CardSolicitShow from '../../components/CardSolicitRT/CardSolicitShow'
import {ReactComponent as SvgPrancheta} from  '../../assets/Prancheta.svg'
import ModalGL from '../../components/ModalGL/Modal'
import { Context } from '../../context/authContext'

const GL = () => {
  document.title = 'Merenda Escolar | Gerente Logistica'

  const url = document.URL.split("/").slice(-1)
  const [data, setData] = React.useState(null)
  const [produtos, setProdutos] = React.useState(null)
  const [solicitados, setSolicitados] = React.useState(false)
  const [dataShowSolicitados, setDataShowSolicitados] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const getSecretariaProdutos = React.useCallback(async (id) => {
    try{
      const {data} = await api.get(`/secretaria/produtos/${id}`)

      setProdutos(data)
      setValueCadPr(data.at(-1))
    }catch(e){
      setLoading(false)
    }
  }, [])

  const getSecretariaSolicitados = React.useCallback(async (id) => {
    try{
      const {data} = await api.get(`/gl/secretaria/${id}`)

      setSolicitados(data)
    }catch(e){
      setLoading(false)
    }
  }, [])

  const getDataShowSolicitado = React.useCallback(async (id) => {
    try{
      const {data} = await api.get(`/rt/secretaria/${id}`)

      setDataShowSolicitados(data)
    }catch(e){
      setLoading(false)
    }
  }, [])

  const getUser = React.useCallback(async () => {
    setLoading(true)
    const {data} = await api.get(`/usuario/${url}`)

    try{
      setData(data)

      if(data){
        const firstAndLastName = data.name.split(' ')
        setName(firstAndLastName.shift().concat(` ${firstAndLastName.pop()}`) )
        getSecretariaProdutos(data.secretaria)
        getSecretariaSolicitados(data.secretaria)
        getDataShowSolicitado(data.secretaria)
      }
      setLoading(false)
    }catch(error){
      setLoading(false)
    }
  }, [getDataShowSolicitado, getSecretariaProdutos, getSecretariaSolicitados])

  const {
    handleLogout
  } = React.useContext(Context)

/* -----------------ESTADOS FRONT-END ------------------------  */

  const [name, setName] = React.useState('')
  const [cadPr, setCadPr] = React.useState('')
  const [valueCadPr, setValueCadPr] = React.useState('')
  const [prodLict, setProdLict] = React.useState('')
  const [prodLictEsc, setProdLictEsc] = React.useState('')
  const [histoLicit, setHistoLicit] = React.useState('')
  const [exit, setExit] = React.useState('')
  const date = new Date()
  const [search, setSearch] = React.useState('')
  const [dataSearch, setDataSearch] = React.useState([])
  const [envioEsc, setEnvioEsc] = React.useState(false)
  const [produtosTrue, setProdutosTrue] = React.useState(false)
  const [existShowSl, setExistShowSl] = React.useState(false)
  const [modal, setModal] = React.useState(false)

  const ProdutosFiltrados = React.useMemo(() => {
      const lowerCase = search.toLocaleLowerCase()
      return dataSearch.filter((item) => item.nome.toLocaleLowerCase().includes(lowerCase))
  }, [search, dataSearch])

  React.useEffect(() => {

    if(produtos){
      setDataSearch(produtos)
    }
  }, [produtos])

  const handleClickCadPr = () => {
    setCadPr('active')
    setProdLict('')
    setProdLictEsc('')
    setHistoLicit('')
  }

  const handleClickProdLict= () => {
    setCadPr('')
    setProdLict('active')
    setProdLictEsc('')
    setHistoLicit('')

    if(produtos === false){
      setProdutosTrue(false)
    }else{
      setProdutosTrue(produtos)
      for(let i = 0 ; i < produtos.length; i++){
        if(produtos[i].quantidadeProduto <= (produtos[i].quantidadeProduto * 0.10) ){
          alert(`O produto: ${produtos[i].nome} está com menos de 100 ${produtos[i].unidadeMedida}`)
        }
      }
    }
  }

  const handleClickProdLictEsc = () => {
    setCadPr('')
    setProdLict('')
    setProdLictEsc('active')
    setHistoLicit('')

    if(solicitados === false){
      setEnvioEsc(false)
    }else{
      setEnvioEsc(solicitados)
    }
  }

  const handleClickhistoLicit = () => {
    setCadPr('')
    setProdLict('')
    setProdLictEsc('')
    setHistoLicit('active')

    if(dataShowSolicitados === false){
      setExistShowSl(false)
    }else{
      setExistShowSl(dataShowSolicitados)
    }
  }

  const handleExit = () => {
    setCadPr('')
    setProdLict('')
    setProdLictEsc('')
    setHistoLicit('')
    setExit('active')
  }

  const handleModal = () => {
    setModal(!modal)
  }

  React.useEffect(() => {
    if(!isConnected){
      window.location.href = '/'
    }
    getUser()
  }, [getUser])

  return (
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
                      (
                        date.getHours() < 12 ? 
                        <h1> Bom dia {name}.</h1> : ''
                      )
                      || 
                      (
                        date.getHours() >= 12 && date.getHours() < 18 ? 
                        <h1>Boa tarde {name}.</h1> : ''
                      )
                      ||
                      (
                        date.getHours() >= 18 ? 
                        <h1>Boa noite {name}.</h1> : ''
                      )
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
                  cadPr && !prodLict && !prodLictEsc && !histoLicit ? 
                  <div className={style.body__options__content}>
                    <SvgPrancheta className={style.body__options__svg_active}/>
                    <button className={style.body__options__button_active} onClick={handleClickCadPr}>
                      Cadastrar produtos no almoxarifado
                    </button> 
                  </div>
                    : 
                  <div className={style.body__options__content}>
                    <SvgPrancheta className={style.body__options__svg}/>
                    <button className={style.body__options__button} onClick={handleClickCadPr}>
                      Cadastrar produtos no almoxarifado
                    </button>
                  </div>
                }
                {
                  prodLict &&  !cadPr && !prodLictEsc && !histoLicit? 
                  <div className={style.body__options__content}>
                    <SVGBox className={style.body__options__svg_active}/>
                    <button className={style.body__options__button_active} onClick={handleClickProdLict}>
                      Produtos no almoxarifado
                    </button> 
                  </div>
                    : 
                  <div className={style.body__options__content}>
                    <SVGBox className={style.body__options__svg}/>
                    <button className={style.body__options__button} onClick={handleClickProdLict}>
                      Produtos no almoxarifado
                    </button>
                  </div>
                }

                {
                  prodLictEsc && !cadPr && !prodLict && !histoLicit ? 
                  <div className={style.body__options__content}>
                    <SVGChecked className={style.body__options__svg_active}/>
                    <button className={style.body__options__button_active} onClick={handleClickProdLictEsc}>
                      Enviar para escolas
                    </button> 
                  </div>
                    : 
                  <div className={style.body__options__content}>
                    <SVGChecked className={style.body__options__svg}/>
                    <button className={style.body__options__button} onClick={handleClickProdLictEsc}>
                    Enviar para escolas
                    </button>
                  </div>
                }

                {
                  histoLicit  && !cadPr && !prodLict && !prodLictEsc ? 
                  <div className={style.body__options__content}>
                    <SVGEstatistica className={style.body__options__svg_active}/>
                    <button className={style.body__options__button_active} onClick={handleClickhistoLicit}>
                      Historico de solicitação
                    </button> 
                  </div>
                    : 
                  <div className={style.body__options__content}>
                    <SVGEstatistica className={style.body__options__svg}/>
                    <button className={style.body__options__button} onClick={handleClickhistoLicit}>
                      Historico de solicitação
                    </button>
                  </div>
                }

                {
                  exit && !cadPr && !prodLict && !prodLictEsc && !histoLicit ? 
                  <div className={style.body__options__content}>
                    <SVGExit className={style.body__options__svg_active}/>
                    <button className={style.body__options__button_active} onClick={handleExit}>
                      Sair
                    </button> 
                  </div>
                    : 
                  <div className={style.body__options__content}>
                    <SVGExit className={style.body__options__svg}/>
                    <button className={style.body__options__button} onClick={handleExit}>
                      Sair
                    </button>
                  </div>
                }
                </section>

                {/* ---------------- EXIBIÇÃO CONFORME A OPÇÃO SELECIONADA ---------- */}

                {
                  (
                    cadPr && 
                    <div className={style.body__container__title_subtitle}>
                      <h2 className={style.body__title}>Cadastrar produtos no almoxarifado</h2>
                      <p className={style.body__subtitle}>Cadastre os produtos que fazem parte da licitação deste ano.</p>
                    </div>
                  )
                  ||
                  (
                    prodLict && 
                    <div className={style.body__container__title_subtitle}>
                      <h2 className={style.body__title}>Produtos no almoxarifado</h2>
                      <p className={style.body__subtitle}>Role a página para ver os produtos no almoxarifado, ou pesquise no campo de busca acima.</p>
                    </div>
                  )
                  ||
                  (
                    prodLictEsc && 
                    <div className={style.body__container__title_subtitle}>
                      <h2 className={style.body__title}>Enviar às escolas</h2>
                      <p className={style.body__subtitle}>Clique em um card para selecionar e aperte em "Enviar para escola".</p>
                    </div>
                  )
                  ||
                  (
                    histoLicit && 
                    <div className={style.body__container__title_subtitle}>
                      <h2 className={style.body__title}>Solicitações feitas por escolas</h2>
                      <p className={style.body__subtitle}>Visualize todos os produtos solicitados.</p>
                    </div>
                  )
                  ||
                  (
                    exit && 
                    <div className={style.body__container__title_subtitle}>
                      <h2 className={style.body__title}>Troque de conta</h2>
                      <p className={style.body__subtitle}>Aperte no botão "Deixar esta conta" para que volte a tela de login.</p>
                    </div>
                  )
                  ||
                  (
                    search && 
                    <div className={style.body__container__title_subtitle}>
                      <h2 className={style.body__title}>Digite o nome e faça a busca</h2>
                      <p className={style.body__subtitle}>Visualize todos os produtos que possuem cada letra informada.</p>
                    </div>
                  )
                }
              

                {
                  (
                    search &&
                    <section className={style.body__show__cards}>
                    {
                      ProdutosFiltrados ?
                        ProdutosFiltrados.map((item) => (
                          <Card 
                          nome={item.nome} key={item._id}
                          quantidadeProduto={item.quantidadeProduto}
                          unidadeMedida={item.unidadeMedida}
                          />
                        )) 
                        :  
                        <section className={style.body__nobody__list}>
                          <h3>Selecione o botão</h3>
                          <p>"Produtos no almoxarifado"</p>
                          <h3> Para a listagem dos produtos.</h3>
                        </section>
                    }
                    </section> 
                  )
                  ||
                  (
                    cadPr && 
                    <>
                      {
                        modal 
                          && 
                        <div className={style.body__modal__post} >
                          <div className={style.body__modal__container}>
                            <ModalGL data={data.secretaria} modal={modal} setModal={setModal}/>
                          </div>
                        </div>
                      }
                      
                      <section className={style.body__show__cards}>
                        <button className={style.body__button_post} 
                          onClick={handleModal}>
                            <p>
                              Adicionar produto

                              <SvgPrancheta className={style.body__options__svg}/>
                            </p>
                        </button>

                        {
                          valueCadPr ?
                          <>
                            <h3 className={style.body__text__card}>
                              Ultimo produto cadastrado.
                            </h3>

                            <Card 
                            nome={valueCadPr.nome} key={valueCadPr._id}
                            quantidadeProduto={valueCadPr.quantidadeProduto}
                            unidadeMedida={valueCadPr.unidadeMedida}
                            />
                          </>
                          :
                          <section className={style.body__nobody__list}>
                            <h3>
                              Nenhum produto cadastrado
                            </h3>
                          </section>
                        }
                      </section>
                    </>
                  )
                  ||
                  (
                    prodLict && 
                    <section className={style.body__show__cards}>
                      {
                        produtosTrue ?
                          produtosTrue.map((item) => (
                            <Card 
                            _id={item._id}
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
                  )
                  ||
                  (
                    prodLictEsc && 
                    <section className={style.body__show__cards}>
                      {
                        envioEsc ?
                        envioEsc.map((item, index) => (
                            <>
                              <div key={index + item} className={style.body__show__checkbox} >
                              {
                                  item.solicitado || 
                                    <CardSolicit 
                                      _id={item._id}
                                      rt={item.rt}
                                      horario={item.horario} 
                                      nome={item.nome} 
                                      quantidadeProduto={item.quantidadeProduto} solicitado={item.solicitado} 
                                      unidadeMedida={item.unidadeMedida} merendeira={item.merendeira.name}
                                      idEscola={item.merendeira.fkEscola}/>
                                }
                              </div>
                            </>
                          ))
                          :
                          <section className={style.body__nobody__list}>
                            <h3>Nenhuma solicitação pendente.</h3>
                          </section>
                      }
                    </section> 
                  )
                  ||
                  (
                    histoLicit && 
                    <section className={style.body__show__cards}> 
                      {
                        existShowSl !== false ? 
                        existShowSl.map((item) => (
                          <CardSolicitShow 
                          key={item._id+item.nome}
                          _id={item._id}
                          rt={item.rt}
                          horario={item.horario} 
                          nome={item.nome} 
                          quantidadeProduto={item.quantidadeProduto} 
                          solicitado={item.solicitado} 
                          unidadeMedida={item.unidadeMedida} 
                          merendeira={item.merendeira.name}
                          idEscola={item.merendeira.fkEscola}
                          entregue={item.entregue}
                          totalProduto={item.produto != null ? item.produto.quantidadeProduto : 'Não mais existente no almoxarifado'}
                          />                      
                        ))
                        :
                        <section className={style.body__nobody__list}>
                          <h3>Nenhum produto solicitado</h3>
                        </section>  
                      }
                    </section>  
                  )
                  ||
                  (
                    exit && 
                    <>
                      <section className={style.body__show__cards}>
                        <button className={style.body__button_post} 
                          onClick={handleLogout}>
                            <p>
                              Deixar esta conta
                              <SVGExit className={style.body__options__svg}/>
                            </p>
                        </button>
                      </section>
                    </>
                  )
                  ||
                  (
                    <section className={style.body__nobody__option}>
                      <h3>Escolha uma opção</h3>
                      <div className={style.body__icon__option}>
                        <SVGIconeOption />
                      </div>
                    </section>
                  )
                }
              </section>
          </section>
      }
    </section>
  )

}

export default GL