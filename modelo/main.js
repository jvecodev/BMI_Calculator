// Função para substituir vírgula por ponto
function converterParaDecimal(valor) {
  return valor.replace(',', '.');
}

// Capturar evento de submit do formulário
const form = document.querySelector('#formulario');

// Adicionar um escutador para o evento de submit do formulário
form.addEventListener('submit', function (e) {
  // Prevenir o comportamento padrão do formulário
  e.preventDefault();
  const inputPeso = e.target.querySelector('#peso');
  const inputAltura = e.target.querySelector('#altura');

  // Converter o valor do input para número
  const peso = Number(converterParaDecimal(inputPeso.value));
  const altura = Number(converterParaDecimal(inputAltura.value));

  // Se retornar um NaN, o valor é inválido
  if (isNaN(peso) || peso <= 0) {
    // Se o peso for inválido, chama a função setResultado e passa a mensagem de erro
    setResultado('Peso inválido', false);
    return;
  }

  if (isNaN(altura) || altura <= 0) {
    // Se a altura for inválida, chama a função setResultado e passa a mensagem de erro
    setResultado('Altura inválida', false);
    return;
  }

  const imc = getImc(peso, altura);
  const nivelImc = getNivelImc(imc);
  const msg = `Seu IMC é ${imc} (${nivelImc}).`;

  setResultado(msg, true);
});

function getNivelImc(imc) {
  // Criamos uma lista para retornar o nível do IMC
  const nivel = ['Abaixo do peso', 'Peso normal', 'Sobrepeso',
    'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];

  if (imc >= 39.9) return nivel[5];
  if (imc >= 34.9) return nivel[4];
  if (imc >= 29.9) return nivel[3];
  if (imc >= 24.9) return nivel[2];
  if (imc >= 18.5) return nivel[1];
  if (imc < 18.5) return nivel[0];
}

function getImc(peso, altura) {
  const imc = peso / altura ** 2;
  return imc.toFixed(2);
}

function criaP() {
  const p = document.createElement('p');
  return p;
}

function setResultado(msg, isValid) {
  const resultado = document.querySelector('#resultado');

  resultado.innerHTML = ''; // Limpa o conteúdo HTML
  const p = criaP(); // Cria um parágrafo

  if (isValid) {
    p.classList.add('paragrafo-resultado');
  } else {
    p.classList.add('bad');
  }

  p.innerHTML = msg;
  resultado.appendChild(p);
}
