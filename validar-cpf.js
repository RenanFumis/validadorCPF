export default class ValidarCpf{

  constructor(element){
    this.element = element
    if (performance === 1) {
      history.replaceState({}, document.title, window.location.pathname);
    } 
  }
  limpar(cpf){
   return cpf.replace(/\D/g, '')
  }
  padronizar(cpf){
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')
  }
  padraoCPFbr(cpf){
    const cpfLimpo = this.limpar(cpf)
    return this.padronizar(cpfLimpo)
  }

  validar(cpf){
    const matchCPF = cpf.match(/(?:\d{3}[-.\s]?){3}\d{2}/g)

    return (matchCPF && matchCPF[0] === cpf) /*Se matchCPF e matchCPF[0] não forem verdadeiros ele retorna falso*/
  }

  validaNaMudanca(cpfElement){
    const cpfDigitado = cpfElement.value
    const cpfLimpo = this.limpar(cpfDigitado)

    if(cpfLimpo.length === 11 && this.validar(cpfLimpo)){
      cpfElement.value = this.padronizar(cpfLimpo)
      cpfElement.classList.add('valido')
      cpfElement.classList.remove('erro')
      cpfElement.nextElementSibling.classList.remove('ativar')
    }else{
      cpfElement.classList.add('erro')
      cpfElement.classList.remove('valido')
      cpfElement.nextElementSibling.classList.add('ativar')
    }
  }

  adicionarEvento(){
    this.element.addEventListener('input', () => {
        this.validaNaMudanca(this.element)
    })
  }

  adicionarErroSpan(){
    const erroElement = document.createElement('span')
    erroElement.classList.add('erro-text');
    erroElement.innerText = 'CPF Inválido';
    this.element.parentElement.insertBefore(erroElement, this.element.nextElementSibling)
  }

  init(){
    this.adicionarEvento();
    this.adicionarErroSpan();
    return this
  }
}
