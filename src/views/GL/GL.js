import React from 'react'
import style from './style.module.css'
import api from '../../services/api'
import isConnected from '../../utils/isConnected'
import {ReactComponent as SVGChecked} from  '../../assets/iconOk.svg'
import {ReactComponent as SVGSearch} from  '../../assets/iconSearch.svg'
import {ReactComponent as SVGBox} from  '../../assets/IconBox.svg'
import {ReactComponent as SVGEstatistica} from  '../../assets/iconEstatisticas.svg'
import {ReactComponent as SVGIconeOption} from  '../../assets/undraw_check_boxes_re_v40f (1).svg'
import Card from '../../components/Card/Card'
import CardSolicit from '../../components/CardSolicitGL/CardSolicit'
import CardSolicitShow from '../../components/CardSolicitRT/CardSolicitShow'


const GL = () => {
  document.title = 'Merenda Escolar | Gerente Logistica'

  const url = document.URL.split("/").slice(-1)
  const [data, setData] = React.useState(null)
  const [produtos, setProdutos] = React.useState(null)
  const [solicitados, setSolicitados] = React.useState(false)
  const [dataShowSolicitados, setDataShowSolicitados] = React.useState(false)

  async function getUser(){
    const {data} = await api.get(`/usuario/${url}`)

    try{
      setData(data)

      if(data){
        const firstAndLastName = data.name.split(' ')
        setName(firstAndLastName.shift().concat(` ${firstAndLastName.pop()}`) )

        await api.get(`/secretaria/produtos/${data.secretaria}`)
        .then(({data}) => setProdutos(data))
          .catch(e => console.log(e))

        await api.get(`/gl/secretaria/${data.secretaria}`)
        .then(({data}) => setSolicitados(data))
          .catch(error => console.log(error))

        await api.get(`/rt/secretaria/${data.secretaria}`)
        .then(({data}) => setDataShowSolicitados(data))
          .catch(e => console.log(e))
      }
    }catch(error){
      console.log(error);
    }
  }

/* -----------------ESTADOS FRONT-END ------------------------  */

  const [name, setName] = React.useState('')
  const [valueCadPr, setValueCadPr] = React.useState('')
  const [prodLict, setProdLict] = React.useState('')
  const [prodLictEsc, setProdLictEsc] = React.useState('')
  const [histoLicit, setHistoLicit] = React.useState('')
  const date = new Date()
  const [search, setSearch] = React.useState('')
  const [dataSearch, setDataSearch] = React.useState([])
  const [envioEsc, setEnvioEsc] = React.useState(false)
  const [produtosTrue, setProdutosTrue] = React.useState(false)
  const [existShowSl, setExistShowSl] = React.useState(false)

  const ProdutosFiltrados = React.useMemo(() => {
    const lowerCase = search.toLocaleLowerCase()

    if(produtos){
      setDataSearch(produtos)
      setValueCadPr(produtos.at(-1))
    }

    return dataSearch.filter((item) => item.nome.toLocaleLowerCase().includes(lowerCase))

  }, [produtos, search])

  const handleClickProdLict= () => {
    setProdLict('active')
    setProdLictEsc('')
    setHistoLicit('')

    if(produtos == false){
      setProdutosTrue(false)
    }else{
      setProdutosTrue(produtos)
      for(let i = 0 ; i < produtos.length; i++){
        if(produtos[i].quantidadeProduto <= 100){
          alert(`O produto: ${produtos[i].nome} está com menos de 100 ${produtos[i].unidadeMedida}`)
        }
      }
    }
  }

  const handleClickProdLictEsc = () => {
    setProdLict('')
    setProdLictEsc('active')
    setHistoLicit('')

    if(solicitados == false){
      setEnvioEsc(false)
    }else{
      setEnvioEsc(solicitados)
    }
  }

  const handleClickhistoLicit = () => {
    setProdLict('')
    setProdLictEsc('')
    setHistoLicit('active')

    if(dataShowSolicitados == false){
      setExistShowSl(false)
    }else{
      setExistShowSl(dataShowSolicitados)
    }
  }

  React.useEffect(() => {
    if(!isConnected){
      window.location.href = '/'
    }
    getUser()
  }, [])

  React.useEffect(() => {
    if(!isConnected){
      window.location.href = '/'
    }
  }, )

  return (
    <>
      <section className={style.body__login}>
        <div className={style.body_background}>
          <div className={style.body__background_one}></div>
          <div className={style.body__background_two}></div>
          <div className={style.body__background_tree}></div>
        </div>

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
                prodLict && !prodLictEsc && !histoLicit? 
                <div className={style.body__options__content}>
                  <SVGBox className={style.body__options__svg_active}/>
                  <button className={style.body__options__button_active} onClick={handleClickProdLict}>
                    Produtos no Almoxarifado
                  </button> 
                </div>
                  : 
                <div className={style.body__options__content}>
                  <SVGBox className={style.body__options__svg}/>
                  <button className={style.body__options__button} onClick={handleClickProdLict}>
                    Produtos no Almoxarifado
                  </button>
                </div>
              }

              {
                prodLictEsc && !prodLict && !histoLicit ? 
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
                histoLicit  && !prodLict && !prodLictEsc ? 
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
              </section>

              {/* ---------------- EXIBIÇÃO CONFORME A OPÇÃO SELECIONADA ---------- */}

              {
                prodLict && 
                <div className={style.body__container__title_subtitle}>
                  <h2 className={style.body__title}>Produtos no Almoxarifado</h2>
                  <p className={style.body__subtitle}>Role a página para ver os produtos no almoxarifado, ou pesquise no campo de busca acima.</p>
                </div>
                || 
                prodLictEsc && 
                <div className={style.body__container__title_subtitle}>
                  <h2 className={style.body__title}>Enviar às escolas</h2>
                  <p className={style.body__subtitle}>Clique em um card para selecionar e aperte em "Enviar para escola".</p>
                </div>
                || 
                histoLicit && 
                <div className={style.body__container__title_subtitle}>
                  <h2 className={style.body__title}>Solicitações feitas por escolas</h2>
                  <p className={style.body__subtitle}>Visualize todos os produtos solicitados.</p>
                </div>
              }
            

              {
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
                      <h3>Ainda não existe produtos no almoxarifado.</h3>
                    </section>
                }
                </section> 

                ||

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

                ||

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
                        <h3>Não tem nenhuma solicitação pendente.</h3>
                      </section>
                  }
                </section> 

              ||

                histoLicit && 
                  <section className={style.body__show__cards}> 
                    {
                      existShowSl != false ? 
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
      </section>
    </>
  )

}

export default GL