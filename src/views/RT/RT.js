import React from 'react'
import style from './style.module.css'
import api from '../../services/api'
import isConnected from '../../utils/isConnected'
import {ReactComponent as SvgPrancheta} from  '../../assets/Prancheta.svg'
import {ReactComponent as SVGSearch} from  '../../assets/iconSearch.svg'
import {ReactComponent as SVGAround} from  '../../assets/IconAround.svg'
import {ReactComponent as SVGBox} from  '../../assets/IconBox.svg'
import {ReactComponent as SVGEstatistica} from  '../../assets/iconEstatisticas.svg'
import {ReactComponent as SVGIconeOption} from  '../../assets/undraw_check_boxes_re_v40f (1).svg'
import Card from '../../components/Card/Card'
import CardRT from '../../components/CardRT/Card'
import ModalRT from '../../components/ModalRT/Modal'
import CardSolicit from '../../components/CardSolicitSchool/CardSolicit'
import CardSolicitShow from '../../components/CardSolicitRT/CardSolicitShow'

const RT = () => {
  document.title = 'Merenda Escolar | Nutricionista'

/* ---------------- ESTADO BANCO DE DADOS -------------------- */
  const url = document.URL.split("/").slice(-1)
  const [data, setData] = React.useState(null)
  const [produtos, setProdutos] = React.useState(null)
  const [solicitados, setSolicitados] = React.useState(false)
  const [error, setError] = React.useState(false)
  const [dataShowSolicitados, setDataShowSolicitados] = React.useState(false)
  const [produtosLicitacao, setProdutosLicitacao] = React.useState(false)
  const [produtosLicitacaoTrue, setProdutosLicitacaoTrue] = React.useState(false)
  
  async function getUser(){
    setLoading(true)
    const {data} = await api.get(`/usuario/${url}`)

    try{
      setData(data)

      if(data){
        const firstAndLastName = data.name.split(' ')
        setName(firstAndLastName.shift().concat(` ${firstAndLastName.pop()}`) )
        
        await api.get(`/secretaria/produtos/${data.secretaria}`)
          .then(({data}) => setProdutos(data))
            .catch(e => console.log(e))

        await api.get(`/rtFalse/${data.secretaria}`)
          .then(({data}) => setSolicitados(data))
            .catch(e => console.log(e))
        
        await api.get(`/rt/secretaria/${data.secretaria}`)
          .then(({data}) => setDataShowSolicitados(data))
            .catch(e => console.log(e))
        
        await api.get(`/licitacao/produtos/${data.secretaria}`)
          .then(({data}) => {
            setProdutosLicitacao(data)
            setValueCadPr(data.at(-1))
          })
            .catch(e => console.log(e))

        setLoading(false)
        
      }
    }catch(error){
      setError(error);
    }
  }

/* -----------------ESTADOS FRONT-END ------------------------  */

  const [name, setName] = React.useState('')
  const [cadPr, setCadPr] = React.useState('')
  const [valueCadPr, setValueCadPr] = React.useState('')
  const [prodLict, setProdLict] = React.useState('')
  const [produtosLicitados, setProdutosLicitados] = React.useState('')
  const [prodLictEsc, setProdLictEsc] = React.useState('')
  const [histoLicit, setHistoLicit] = React.useState('')
  const [modal, setModal] = React.useState(false)
  const date = new Date()
  const [search, setSearch] = React.useState('')
  const [dataSearch, setDataSearch] = React.useState([])
  const [escTrue, setEscTrue] = React.useState(false)
  const [produtosTrue, setProdutosTrue] = React.useState(false)
  const [existShowSl, setExistShowSl] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const ProdutosFiltrados = React.useMemo(() => {
    // const lowerCase = search.toLocaleLowerCase()
    //   if(produtos && produtosLicitacao){
    //     setDataSearch(produtos.concat(produtosLicitacao))
    //     return dataSearch.filter((item) => item.nome.toLocaleLowerCase().includes(lowerCase))
    //   }

    if(prodLict){

      const lowerCase = search.toLocaleLowerCase()
      if(produtos){
        setDataSearch(produtos)
        return dataSearch.filter((item) => item.nome.toLocaleLowerCase().includes(lowerCase))
      }
    }

    if(produtosLicitados){

      const lowerCase = search.toLocaleLowerCase()
      if(produtosLicitacao){
        setDataSearch(produtosLicitacao)
        return dataSearch.filter((item) => item.nome.toLocaleLowerCase().includes(lowerCase))
      }
    }

    if(histoLicit){
      const lowerCase = search.toLocaleLowerCase()
      if(existShowSl){
        setDataSearch(existShowSl)
        return dataSearch.filter((item) => item.nome.toLocaleLowerCase().includes(lowerCase))
      }
    }
  }, [produtos, produtosLicitacao, existShowSl, search])

  const handleClickCadPr = () => {
    setCadPr('active')
    setProdLict('')
    setProdutosLicitados('')
    setProdLictEsc('')
    setHistoLicit('')
  }

  const handleClickProdLict =  () => {
    setCadPr('')
    setProdLict('active')
    setProdutosLicitados('')
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

  const handleClickProdutosLicit = () => {
    setCadPr('')
    setProdLict('')
    setProdutosLicitados('active')
    setProdLictEsc('')
    setHistoLicit('')

    if(produtosLicitacao == false){
      setProdutosLicitacaoTrue(false)
    }else{
      setProdutosLicitacaoTrue(produtosLicitacao)
      // for(let i = 0 ; i < produtosLicitacao.length; i++){
      //   if(produtosLicitacao[i].quantidadeProduto <= 100){
      //     alert(`O produto: ${produtosLicitacao[i].nome} está com menos de 100 ${produtosLicitacao[i].unidadeMedida} de saldo `)
      //   }
      // }
    }
  }

  const handleClickProdLictEsc = () => {
    setCadPr('')
    setProdLict('')
    setProdutosLicitados('')
    setProdLictEsc('active')
    setHistoLicit('')

    if(solicitados == false){
      setEscTrue(false)
    }else{
      setEscTrue(solicitados)
    }
  }

  const handleClickhistoLicit = () => {
    setCadPr('')
    setProdLict('')
    setProdutosLicitados('')
    setProdLictEsc('')
    setHistoLicit('active')

    if(dataShowSolicitados == false){
      setExistShowSl(false)
    }else{
      setExistShowSl(dataShowSolicitados)
    }
  }

  const handleModal = () => {
    setModal(!modal)
  }

  React.useEffect(() => {
    if(!isConnected){
      window.location.href = '/'
    }
    getUser()
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
            loading ? <p className={style.body__loading}>Carregando...</p> :
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
                cadPr && !prodLict && !produtosLicitados && !prodLictEsc && !histoLicit ? 
                <div className={style.body__options__content}>
                  <SvgPrancheta className={style.body__options__svg_active}/>
                  <button className={style.body__options__button_active} onClick={handleClickCadPr}>
                    Cadastrar produtos da licitação
                  </button> 
                </div>
                  : 
                <div className={style.body__options__content}>
                  <SvgPrancheta className={style.body__options__svg}/>
                  <button className={style.body__options__button} onClick={handleClickCadPr}>
                    Cadastrar produtos da licitação
                  </button>
                </div>
              }

              {
                produtosLicitados &&  !prodLict && !cadPr && !prodLictEsc && !histoLicit? 
                <div className={style.body__options__content}>
                  <SVGBox className={style.body__options__svg_active}/>
                  <button className={style.body__options__button_active} onClick={handleClickProdutosLicit}>
                    Produtos da Licitação
                  </button> 
                </div>
                  : 
                <div className={style.body__options__content}>
                  <SVGBox className={style.body__options__svg}/>
                  <button className={style.body__options__button} onClick={handleClickProdutosLicit}>
                    Produtos da Licitação
                  </button>
                </div>
              }

              {
                prodLict && !cadPr && !produtosLicitados && !prodLictEsc && !histoLicit? 
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
                prodLictEsc && !cadPr && !prodLict && !produtosLicitados && !histoLicit ? 
                <div className={style.body__options__content}>
                  <SVGAround className={style.body__options__svg_active}/>
                  <button className={style.body__options__button_active} onClick={handleClickProdLictEsc}>
                    Produtos solicitados por escolas
                  </button> 
                </div>
                  : 
                <div className={style.body__options__content}>
                  <SVGAround className={style.body__options__svg}/>
                  <button className={style.body__options__button} onClick={handleClickProdLictEsc}>
                    Produtos solicitados por escolas
                  </button>
                </div>
              }

              {
                histoLicit && !cadPr && !prodLict && !produtosLicitados && !prodLictEsc ? 
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
                cadPr && 
                <div className={style.body__container__title_subtitle}>
                  <h2 className={style.body__title}>Cadastrar Produtos</h2>
                  <p className={style.body__subtitle}>Cadastre os produtos que façam parte da licitação deste ano.</p>
                </div>
                ||
                prodLict && 
                <div className={style.body__container__title_subtitle}>
                  <h2 className={style.body__title}>Produtos no Almoxarifado</h2>
                  <p className={style.body__subtitle}>
                    Se deseja editar ou excluir um produto do almoxarifado, aperte no card e selecione "Editar" ou "Exlcuir".
                  </p>
                </div>
                || 
                produtosLicitados && 
                <div className={style.body__container__title_subtitle}>
                  <h2 className={style.body__title}>Produtos da Licitação</h2>
                  <p className={style.body__subtitle}>
                    Visualize os produtos da licitação que foram cadastrados.
                  </p>
                </div>
                || 
                prodLictEsc && 
                <div className={style.body__container__title_subtitle}>
                  <h2 className={style.body__title}>Produtos Solicitados por Escolas</h2>
                  <p className={style.body__subtitle}>Clique em um card para selecionar e aperte em "Acionar Gerente de Logistica".</p>
                </div>
                || 
                histoLicit && 
                <div className={style.body__container__title_subtitle}>
                  <h2 className={style.body__title}>Solicitações feitas por escolas</h2>
                  <p className={style.body__subtitle}>Visualize todos os produtos solicitados.</p>
                </div>
                || 
                search && 
                <div className={style.body__container__title_subtitle}>
                  <h2 className={style.body__title}>Digite o nome e faça a busca</h2>
                  <p className={style.body__subtitle}>Visualize todos os produtos que possuem cada letra informada.</p>
                </div>
              }
            

              {
                search &&
                <section className={style.body__show__cards}>
                {
                  ProdutosFiltrados ?
                    ProdutosFiltrados.map((item) => (
                      <Card 
                      key={item._id+item.nome}
                      nome={item.nome}
                      quantidadeProduto={item.quantidadeProduto}
                      unidadeMedida={item.unidadeMedida}
                      />
                    )) 
                    :  
                    <section className={style.body__nobody__list}>
                      <h3>Selecione o botão</h3>
                      <p>"Produtos no Almoxarifado"</p>
                      <p>"Produtos da Licitação"</p> 
                      {/* <p>"Produtos Solicitados"</p> 
                      <p>"Historico de Solicitações" </p> */}
                      <h3> Para a listagem dos produtos.</h3>
                    </section>
                }
                </section> 

                ||

                cadPr && 
                  <>
                    {
                      modal 
                        && 
                      <div className={style.body__modal__post} >
                        <div className={style.body__modal__container}>
                          <ModalRT modal={modal} setModal={setModal}/>
                        </div>
                      </div>
                    }
                    
                    <section className={style.body__show__cards}>
                      <button className={style.body__button_post} 
                        onClick={handleModal}>
                          <p>
                            Adicionar Produto

                            <SvgPrancheta className={style.body__options__svg}/>
                          </p>
                      </button>

                      {
                        valueCadPr ?
                        <>
                          <h3 className={style.body__text__card}>
                            Ultimo produto cadastrado.
                          </h3>

                          <CardRT
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

                ||

                prodLict && 
                  <section className={style.body__show__cards}>
                    {
                      produtosTrue ?
                        produtosTrue.map((item) => (
                          <Card 
                          _id={item._id ? item._id : 0}
                          key={item._id+item.nome}
                          nome={item.nome}
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

                produtosLicitados && 
                  <section className={style.body__show__cards}>
                    {
                      produtosLicitacaoTrue ?
                      produtosLicitacaoTrue.map((item) => (
                          <CardRT
                          _id={item._id ? item._id : 0}
                          key={item._id+item.nome}
                          nome={item.nome}
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
                      escTrue ?
                      escTrue.map(item => (  
                        <CardSolicit 
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
                        
                        />
                      ))
                      :  
                      <section className={style.body__nobody__list}>
                        <h3>Ainda não tem nenhuma solicitação de produto</h3>
                      </section>                   
                    }
                  </section>  

                ||

                histoLicit && 
                  <section className={style.body__show__cards}> 
                    {
                      existShowSl ? 
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
          }
      </section>
    </>
  )
}

export default RT