
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



document.getElementById('CEP').addEventListener('blur', function () {
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
