/* var consultaCep = fetch('https://viacep.com.br/ws/01001000/json')
.then(resposta => resposta.json())
.then(r => {
    if (r.erro) {
        throw Error('Esse Cep não existe.')
    } else {
        console.log(r)
    }
})
.catch(erro => console.log(erro))
.finally(mensagem => console.log('Processo terminado'))
console.log(consultaCep) */

//json: é um formato de dados baseado em texto seguindo a sintaxe do objeto JavaScript.
//then: O método then() retorna uma Promise. Possui dois argumentos, ambos são "call back functions", sendo uma para o sucesso e outra para o fracasso da promessa.
//catch: O método catch() retorna uma Promise e lida apenas com casos rejeitados.

//Uso de asycn await para reescrever o código - syntax sugar.

let cep = document.getElementById('cep');
cep.addEventListener('focusout', () => buscaEndereco(cep.value));

async function buscaEndereco(cep) {
		const mensagemErro = document.getElementById('erro');
		mensagemErro.innerHTML = "";

    try {
        const consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json`);
        const consultaCepConvertida = await consultaCep.json();
			
				if (consultaCepConvertida.erro) {
					throw Error('CEP não existente');
				}

				const cidade = document.getElementById('cidade');
				const logradouro = document.getElementById('endereco');
				const estado = document.getElementById('estado');

				cidade.value = consultaCepConvertida.localidade;
				logradouro.value = consultaCepConvertida.logradouro;
				estado.value = consultaCepConvertida.uf;

        console.log(consultaCepConvertida);
				return consultaCepConvertida;

    } catch (erro) {
			console.log(erro);
			mensagemErro.innerHTML = "CEP inválido, tente novamente."
		}
    
}

/*let ceps = ['01001000', '01001001'];
let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
Promise.all(conjuntoCeps).then(respostas => console.log(respostas));*/
//promise.all permite fazer várias requisições ao mesmo tempo.

