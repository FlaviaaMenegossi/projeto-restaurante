$(document).ready(function () {
  // Máscara de telefone (aceita celular e fixo)
  $('#telefone').mask('(00) 00000-0000');

  // Adiciona método de validação de telefone brasileiro
  $.validator.addMethod("telefoneValido", function (value, element) {
    const telefone = value.replace(/\D/g, '');

    if (![10, 11].includes(telefone.length)) return false;

    const ddd = telefone.substring(0, 2);
    const numeroSemDDD = telefone.substring(2);

    const dddsValidos = [
      '11','12','13','14','15','16','17','18','19',
      '21','22','24','27','28',
      '31','32','33','34','35','37','38',
      '41','42','43','44','45','46',
      '47','48','49',
      '51','53','54','55',
      '61','62','63','64',
      '65','66','67',
      '68','69',
      '71','73','74','75','77','79',
      '81','82','83','84','85','86','87','88','89',
      '91','92','93','94','95','96','97','98','99'
    ];

    const todosIguais = /^(\d)\1+$/.test(telefone);
    if (todosIguais) return false;

    if (!dddsValidos.includes(ddd)) return false;

    if (telefone.length === 11) {
      return numeroSemDDD.startsWith('9');
    }

    if (telefone.length === 10) {
      return /^[2-5]/.test(numeroSemDDD);
    }

    return false;
  }, "Por favor, insira um número de telefone fixo ou celular válido.");

  // Validação do formulário
  $('#form-contato').validate({
    rules: {
      nome: { required: true },
      email: {
        required: true,
        email: true
      },
      telefone: {
        required: true,
        telefoneValido: true
      },
      mensagem: { required: true }
    },
    messages: {
      nome: { required: "Por favor, insira seu nome" },
      email: {
        required: "Por favor, insira seu e-mail",
        email: "Por favor, insira um e-mail válido"
      },
      telefone: {
        required: "Por favor, insira seu telefone"
      },
      mensagem: { required: "Por favor, insira sua mensagem" }
    },
    errorClass: 'error',
    errorElement: 'label',
    highlight: function (element) {
      $(element).addClass('error');
    },
    unhighlight: function (element) {
      $(element).removeClass('error');
    },
    submitHandler: function (form) {
      // Mostra mensagem de sucesso
      $('#mensagem-sucesso')
        .removeClass('d-none')
        .hide()
        .fadeIn();

      // Limpa o formulário
      form.reset();

      // Remove erros visuais
      $(form).find('.error').removeClass('error');
      $(form).validate().resetForm();

      // Oculta a mensagem depois de 5 segundos
      setTimeout(function () {
        $('#mensagem-sucesso').fadeOut();
      }, 5000);
    }
  });
});