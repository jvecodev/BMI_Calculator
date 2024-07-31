// Capturar evento de submit do formulário

const form = document.querySelector('#formulario');

//Adicionar um escutar, evento de submit do formulário

form.addEventListener('submit', function (e) {

//Prevenir o comportamento padrão do formulário
  e.preventDefault();
  const inputPeso = e.target.querySelector('#peso');
  const inputAltura = e.target.querySelector('#altura');

  //convertemos o valor do input para número
  const peso = Number(inputPeso.value);
  const altura = Number(inputAltura.value);

    // Se retornar um NaN, o valor é inválido
  if (!peso) {
    //Se o peso for inválido, chama a função setResultado e passa a mensagem de erro
    setResultado('Peso inválido', false);
    return;
  }

  if (!altura) {
    //Se o peso for inválido, chama a função setResultado e passa a mensagem de erro
    setResultado('Altura inválida', false);
    return;
  }

  const imc = getImc(peso, altura);
  const nivelImc = getNivelImc(imc);
//                         f-0      f-1
  const msg = `Seu IMC é ${imc} (${nivelImc}).`;

  setResultado(msg, true);
});

function getNivelImc (imc) {
    //Criamos uma lista para retornar o nível do IMC
  const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso',
    'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];

  if (imc >= 39.9) return nivel[5];
  if (imc >= 34.9) return nivel[4];
  if (imc >= 29.9) return nivel[3];
  if (imc >= 24.9) return nivel[2];
  if (imc >= 18.5) return nivel[1];
  if (imc < 18.5) return nivel[0];
}

function getImc (peso, altura) {
  const imc = peso / altura ** 2;
  return imc.toFixed(2);
}

function criaP () {
  const p = document.createElement('p');
  return p;
}

function setResultado (msg, isValid) {
  const resultado = document.querySelector('#resultado');
  
  resultado.innerHTML = ''; // → Limpa o conteúdo HTML
  const p = criaP(); // → Cria um parágrafo, uma variável que apenas chama a função (criaP)

  if (isValid) {
    p.classList.add('paragrafo-resultado');
  } else {
    p.classList.add('bad');
  }

  p.innerHTML = msg;
  resultado.appendChild(p);
}
