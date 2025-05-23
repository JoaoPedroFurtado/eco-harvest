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


  const campo = document.getElementById('cpfOuPJ');
  const tipoPessoa = document.getElementById('tipoPessoa');

  // Ajusta máscara e maxlength conforme tipo de pessoa
  tipoPessoa.addEventListener('change', () => {
    campo.value = '';
    campo.classList.remove('is-valid', 'is-invalid');
    
    if (tipoPessoa.value === 'Pessoa Fisica') {
      campo.maxLength = 14;  // 000.000.000-00
      campo.placeholder = 'ex: 432.123.111-30';
    } else if (tipoPessoa.value === 'Pessoa Juridica') {
      campo.maxLength = 18;  // 00.000.000/0000-00
      campo.placeholder = 'ex: 45.123.321/0001-10';
    } else {
      campo.maxLength = 18;
      campo.placeholder = 'Selecione o tipo de pessoa';
    }
  });

  // Aplica máscara enquanto digita
  campo.addEventListener('input', () => {
    let value = campo.value.replace(/\D/g, '');
    
    if (tipoPessoa.value === 'Pessoa Fisica') {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else if (tipoPessoa.value === 'Pessoa Juridica') {
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }
    
    campo.value = value;
  });

  // Valida CPF ou CNPJ ao sair do campo
  campo.addEventListener('blur', () => {
    const valorLimpo = campo.value.replace(/\D/g, '');
    let valido = false;

    if (tipoPessoa.value === 'Pessoa Fisica') {
      valido = validarCPF(valorLimpo);
    } else if (tipoPessoa.value === 'Pessoa Juridica') {
      valido = validarCNPJ(valorLimpo);
    }

    if (valido) {
      campo.classList.add('is-valid');
      campo.classList.remove('is-invalid');
    } else {
      campo.classList.add('is-invalid');
      campo.classList.remove('is-valid');
    }
  });

  // Valida seleção de tipo de pessoa
  tipoPessoa.addEventListener('blur', () => {
    if (tipoPessoa.value === "") {
      tipoPessoa.classList.remove('is-valid');
      tipoPessoa.classList.add('is-invalid');
    } else {
      tipoPessoa.classList.remove('is-invalid');
      tipoPessoa.classList.add('is-valid');
    }
  });

  // Função de validação de CPF
  function validarCPF(cpf) {
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += Number(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== Number(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += Number(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === Number(cpf.charAt(10));
  }

  // Função de validação de CNPJ
  function validarCNPJ(cnpj) {
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
    let t = cnpj.length - 2;
    let d = cnpj.substring(t);
    let d1 = parseInt(d.charAt(0));
    let d2 = parseInt(d.charAt(1));

    let calc = x => {
      let n = 0;
      let pos = x - 7;
      for (let i = x; i >= 1; i--) {
        n += cnpj.charAt(x - i) * pos--;
        if (pos < 2) pos = 9;
      }
      return n;
    };

    let n1 = calc(t);
    let r1 = n1 % 11 < 2 ? 0 : 11 - n1 % 11;
    if (r1 !== d1) return false;

    let n2 = calc(t + 1);
    let r2 = n2 % 11 < 2 ? 0 : 11 - n2 % 11;
    return r2 === d2;
  }



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


let telefoneValido = false;  // Corrigido: precisa ser let

const telefone = document.getElementById('telefone');

// Máscara dinâmica ao digitar
telefone.addEventListener('input', () => {
  let value = telefone.value.replace(/\D/g, '');

  if (value.length > 11) value = value.slice(0, 11);  // Máximo 11 dígitos

  if (value.length <= 10) {
    // Fixo: (00) 0000-0000
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    // Celular: (00) 00000-0000
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d{5})(\d)/, '$1-$2');
  }

  telefone.value = value;
});

// Validação ao perder foco
telefone.addEventListener('blur', () => {
  // Aceita fixo (10 dígitos) e celular (11 dígitos)
  const telefoneRegex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;

  if (telefoneRegex.test(telefone.value)) {
    telefone.classList.remove('is-invalid');
    telefone.classList.add('is-valid');
    telefoneValido = true;
  } else {
    telefone.classList.remove('is-valid');
    telefone.classList.add('is-invalid');
    telefoneValido = false;
    console.log("oi");
  }
});

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


//data


const prazo = document.getElementById('prazo');

prazo.addEventListener('blur', () => {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);  // Zera horas para comparar só datas

  const dataSelecionada = new Date(prazo.value);

  if (prazo.value === "" || dataSelecionada < hoje) {
    // Data inválida: vazia ou anterior a hoje
    prazo.classList.add('is-invalid');
    prazo.classList.remove('is-valid');
  } else {
    // Data válida: hoje ou futura
    prazo.classList.remove('is-invalid');
    prazo.classList.add('is-valid');
  }
});


// Valida Forma de Pagamento
const pagamento = document.getElementById('pagamento');
pagamento.addEventListener('blur', () => {
  if (pagamento.value === "") {
    pagamento.classList.add('is-invalid');
    pagamento.classList.remove('is-valid');
  } else {
    pagamento.classList.remove('is-invalid');
    pagamento.classList.add('is-valid');
  }
});

// Valida Já é Cliente
const jcliente = document.getElementById('jcliente');
jcliente.addEventListener('blur', () => {
  if (jcliente.value === "") {
    jcliente.classList.add('is-invalid');
    jcliente.classList.remove('is-valid');
  } else {
    jcliente.classList.remove('is-invalid');
    jcliente.classList.add('is-valid');
  }
});

// Valida Deseja receber ofertas
const recebePropaganda = document.getElementById('recebePropaganda');
recebePropaganda.addEventListener('blur', () => {
  if (recebePropaganda.value === "") {
    recebePropaganda.classList.add('is-invalid');
    recebePropaganda.classList.remove('is-valid');
  } else {
    recebePropaganda.classList.remove('is-invalid');
    recebePropaganda.classList.add('is-valid');
  }
});

// Valida Deseja falar com consultor
const falarVendedor = document.getElementById('falarVendedor');
falarVendedor.addEventListener('blur', () => {
  if (falarVendedor.value === "") {
    falarVendedor.classList.add('is-invalid');
    falarVendedor.classList.remove('is-valid');
  } else {
    falarVendedor.classList.remove('is-invalid');
    falarVendedor.classList.add('is-valid');
  }
});





