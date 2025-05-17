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

//CEP
let CEP = document.getElementById('CEP');
CEP.addEventListener('blur', function () {
  const campoCEP = this;
  const cepLimpo = campoCEP.value.replace(/\D/g, '');

  if (cepLimpo.length === 8) {
    fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
      .then(resposta => {
        if (!resposta.ok) throw new Error('Erro na requisição');
        return resposta.json();
      })
      .then(dados => {
        if (dados.erro) {
          campoCEP.classList.add('is-invalid');
          campoCEP.classList.remove('is-valid');
          return;
        }

        const camposAuto = [
          { id: 'rua', valor: dados.logradouro },
          { id: 'bairro', valor: dados.bairro },
          { id: 'cidade', valor: dados.localidade },
          { id: 'UF', valor: dados.uf }
        ];

        camposAuto.forEach(campo => {
          const input = document.getElementById(campo.id);
          input.value = campo.valor || '';
          if (campo.valor) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
          }
        });

        campoCEP.classList.remove('is-invalid');
        campoCEP.classList.add('is-valid');
      })
      .catch(erro => {
        console.error('Erro na requisição:', erro);
        campoCEP.classList.add('is-invalid');
        campoCEP.classList.remove('is-valid');
      });
  } else {
    campoCEP.classList.add('is-invalid');
    campoCEP.classList.remove('is-valid');
  }
});


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
telefone.addEventListener('blur', ()=>{
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







