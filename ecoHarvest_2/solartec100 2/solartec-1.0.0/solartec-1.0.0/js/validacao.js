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


let valido = true;
let CEP = document.getElementById('CEP');
//valida o cep, e preenche o campo rua, bairro, nro, cidade, uf
CEP.addEventListener('blur', function () {
  const campoCEP = this;
  const CEP = campoCEP.value.replace(/\D/g, ''); // Remove não números

  if (CEP.length === 8) {
    fetch(`https://viacep.com.br/ws/${CEP}/json/`)
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

        // Preenche campos
        document.getElementById('rua').value = dados.logradouro || '';
        document.getElementById('bairro').value = dados.bairro || '';
        document.getElementById('cidade').value = dados.localidade || '';
        document.getElementById('UF').value = dados.uf || '';

        // Marca como válido
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
let tipoPessoa = document.getElementById('tipoPessoa');
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







