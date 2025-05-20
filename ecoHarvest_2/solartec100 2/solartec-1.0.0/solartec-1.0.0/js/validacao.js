//funcao do boostrap para adiconar mensagem de erro ou de valido
(() => {
  'use strict';
  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();

// validando CEP
const cepInput = document.getElementById('CEP');

cepInput.addEventListener('blur', () => {
  const cep = cepInput.value.replace(/\D/g, '');


  if (cep.length !== 8) {
    marcarCampoInvalido(cepInput);
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(dados => {

      if (dados.erro) {
        marcarCampoInvalido(cepInput);
        return;
      }


      preencherCampo('rua', dados.logradouro);
      preencherCampo('bairro', dados.bairro);
      preencherCampo('cidade', dados.localidade);
      preencherCampo('UF', dados.uf);

      marcarCampoValido(cepInput);
    })
    .catch(err => {
      console.error('Erro ao buscar CEP:', err);
      marcarCampoInvalido(cepInput);
    });
});



function preencherCampo(id, valor) {
  const campo = document.getElementById(id);
  campo.value = valor || '';
  if (valor) {
    marcarCampoValido(campo);
  } else {
    marcarCampoInvalido(campo);
  }
}

function marcarCampoValido(campo) {
  campo.classList.remove('is-invalid');
  campo.classList.add('is-valid');
}

function marcarCampoInvalido(campo) {
  campo.classList.add('is-invalid');
  campo.classList.remove('is-valid');
}


//valida o campo nome quando aperta tab
const nome = document.getElementById('nome');
nome.addEventListener('blur', () => {
  if (nome.value.length < 2) {
    nome.classList.remove('is-valid');
    nome.classList.add('is-invalid');
    valido = false;
    console.log("oi");
  } else {
    nome.classList.remove('is-invalid');
    nome.classList.add('is-valid');
    valido = true;
  }
});

//valida CPF ou CNPJ
const campo = document.getElementById('cpfOuPJ');

campo.addEventListener('blur', () => {
  const valorLimpo = campo.value.replace(/\D/g, '');

  let validoCpfCnpj = false;

  if (valorLimpo.length === 11 || valorLimpo.length === 14) {
    validoCpfCnpj = true;
  }

  if (validoCpfCnpj) {
    campo.classList.add('is-valid');
    campo.classList.remove('is-invalid');
  } else {
    campo.classList.add('is-invalid');
    campo.classList.remove('is-valid');
  }
});


//valida se foi selecionado corretamente o tipo de pessoa
const tipoPessoa = document.getElementById('tipoPessoa');
tipoPessoa.addEventListener('blur', () => {
  if (tipoPessoa.value === "") {
    tipoPessoa.classList.remove('is-valid');
    tipoPessoa.classList.add('is-invalid');
    valido = false;
  } else {
    tipoPessoa.classList.remove('is-invalid');
    tipoPessoa.classList.add('is-valid');
    valido = true;
  }
})

//valida o campo email quando aperta tab
const emailValido = false
const email = document.getElementById('email');
email.addEventListener('blur', () => {

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email.value)) {
    email.classList.remove('is-invalid');
    email.classList.add('is-valid');
    emailValido = true;
  } else {
    email.classList.remove('is-valid');
    email.classList.add('is-invalid');
    emailValido = false;
    console.log("oi");
  }
});

//validando o telefone
const telefoneValido = false
const telefone = document.getElementById('telefone');
telefone.addEventListener('blur', () => {
  const celularRegex = /^\(?\d{2}\)?[\s-]?9\d{4}[-]?\d{4}$/;
  if (celularRegex.test(telefone.value)) {
    telefone.classList.remove('is-invalid');
    telefone.classList.add('is-valid');
    telefoneValido = true;
  } else {
    telefone.classList.remove('is-valid');
    telefone.classList.add('is-invalid');
    telefoneValido = false;
    console.log("oi");
  }
})

//validando o numero da residencia
const nro = document.getElementById('numeroCasa');


nro.addEventListener('input', () => {
  let valor = nro.value.replace(/\D/g, '');


  if (valor.length > 4 || parseInt(valor) > 9999) {
    valor = valor.slice(0, 4);
  }

  nro.value = valor;
});


nro.addEventListener('blur', () => {
  const valor = parseInt(nro.value);

  if (nro.value === '' || isNaN(valor) || valor < 0 || valor > 9999) {
    nro.classList.remove('is-valid');
    nro.classList.add('is-invalid');
    valido = false;
    console.log("oi");
  } else {
    nro.classList.remove('is-invalid');
    nro.classList.add('is-valid');
    valido = true;
  }
});

//
//valida se foi selecionado corretamente o tipo de propriedade
const tipoPropriedade = document.getElementById('propriedade');
tipoPropriedade.addEventListener('blur', () => {
  if (tipoPropriedade.value === "") {
    tipoPropriedade.classList.remove('is-valid');
    tipoPropriedade.classList.add('is-invalid');
    valido = false;
  } else {
    tipoPropriedade.classList.remove('is-invalid');
    tipoPropriedade.classList.add('is-valid');
    valido = true;
  }
})

//valida se foi selecionado corretamente o tipo de produto
const tipoPrduto = document.getElementById('produto');
tipoPrduto.addEventListener('blur', () => {
  if (tipoPrduto.value === "") {
    tipoPrduto.classList.remove('is-valid');
    tipoPrduto.classList.add('is-invalid');
    valido = false;
  } else {
    tipoPrduto.classList.remove('is-invalid');
    tipoPrduto.classList.add('is-valid');
    valido = true;
  }
})




//validando quantidade
const nroQuantidade = document.getElementById('quantidade');


nroQuantidade.addEventListener('input', () => {
  let valorQuant = nroQuantidade.value.replace(/\D/g, '');


  if (valorQuant.length > 4 || parseInt(valorQuant) > 9999) {
    valorQuant = valor.slice(0, 4);
  }

  nroQuantidade.value = valorQuant;
});


nroQuantidade.addEventListener('blur', () => {
  const valorQuant = parseInt(nroQuantidade.value);

  if (nroQuantidade.value === '' || isNaN(valorQuant) || valorQuant < 0 || valorQuant > 9999) {
    nroQuantidade.classList.remove('is-valid');
    nroQuantidade.classList.add('is-invalid');
    valido = false;
    console.log("oi");
  } else {
    nroQuantidade.classList.remove('is-invalid');
    nroQuantidade.classList.add('is-valid');
    valido = true;
  }
});




