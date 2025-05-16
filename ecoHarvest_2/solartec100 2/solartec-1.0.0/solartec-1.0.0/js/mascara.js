function mCpfOuCnpj(input) {
    let valor = input.value.replace(/\D/g, '');

    if (valor.length <= 11) {
        // Máscara CPF: 000.000.000-00
        valor = valor
            .replace(/^(\d{3})(\d)/, "$1.$2")
            .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    } else {
        // Limita para no máximo 14 dígitos
        valor = valor.substring(0, 14);

        // Máscara CNPJ: 00.000.000/0000-00
        valor = valor
            .replace(/^(\d{2})(\d)/, "$1.$2")
            .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/\.(\d{3})(\d)/, ".$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2");
    }

    input.value = valor;
}
