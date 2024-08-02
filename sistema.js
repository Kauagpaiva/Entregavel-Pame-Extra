var requisicao = require('readline-sync');
input = requisicao.question('escreva a pergunta aqui');

//setando variáveis para definir os IDs de forma que cada instancia possua um ID único
var id_funcionarios = 0
var id_clientes = 0
var id_pedidos = 0

// Para armazenar os dados ao decorrer do uso do sistema
var clientes = []
var produtos = []
var funcionarios = []
var pedidos = []

class Pedido{
    constructor(id_cliente, status, data){
        this.id_pedido = id_pedidos;
        id_pedidos++;
        this.ID_Cliente = ID_Cliente;
        this.status = status;
        this.data = data;
    }
}

class Funcionario{
    constructor(nome, cpf, email, senha){
        this.id_funcionario = id_funcionarios;
        id_funcionarios++;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
}

class Cliente{
    constructor(nome, nascimento, cpf, email, senha){
        this.id_cliente = id_clientes;
        id_clientes++;
        this.nome = nome;
        this.nascimento = nascimento;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
}

class Produtos{
    constructor(validade, preço, estoque, nome, descricao){
        this.validade = validade;
        this.preço = preço;
        this.estoque = estoque;
        this.nome = nome;
        this.descricao = descricao
    }
}

class Sistema{
    constructor(){
        this.logado = false;
    }

    cadastro(){
        //Verifico que tipo de conta a pessoa quer criar
        let tipo = input.question("Para criar uma conta do tipo cliente digite 1, para criar uma conta do tipo funcionário digite 2\n")

        //Caso seja um cliente criando a conta
        if (tipo == "1"){
            let nome = input.question("Digite o seu nome:\n");
            let nascimento = input.question("Digite a sua data de nascimento no formato dd/mm/aaa:\n");
            let cpf = input.question("Digite o seu CPF no formato xxx.xxx.xxx-xx:\n");
            let email = input.question("Digite o seu melhor email:\n");
            let senha = input.question("Crie uma senha:");
            
            let cliente = new Cliente(nome, nascimento, cpf, email, senha);

            clientes.push(cliente);

            return console.log("Usuário cadastrado com sucesso!")
        }

        //Caso seja um funcionário criando a conta
        else if (tipo == "2"){
            let nome = input.question("Digite o seu nome:\n");
            let cpf = input.question("Digite o seu CPF no formato xxx.xxx.xxx-xx:\n");
            let email = input.question("Digite o seu melhor email:\n");
            let senha = input.question("Crie uma senha:");
            
            let funcionario = new Funcionario(nome, cpf, email, senha);

            funcionarios.push(funcionario);

            return console.log("Usuário cadastrado com sucesso!")
        }

        //Caso a pessoa tenha digitado qualquer outra coisa
        else{
            return console.log("Opção não encontrada.")
        }
    }

    login(){
        let email = input.question("Digite o seu email:");
        let senha = input.question("Digite a sua senha:");
        let verificacao_conta = false;
        let verificacao_email = false;

        //percorre todas as instancias de clientes cadastrados e verifica se o email e senha digitados são compativeis com o de alguma conta
        for (i = 0; i < (length(clientes)); i++){
            if (email == clientes[i].email){
                verificacao_email = true;
                if (senha == clientes[i].senha){
                    verificacao_conta = true;
                }
            }
        }

        //percorre todas as instancias de funcionários cadastrados e verifica se o email e senha digitados são compativeis com o de alguma conta
        for (i = 0; i < (length(funcionarios)); i++){
            if (email == funcionarios[i].email){
                verificacao_email = true;
                if (senha == funcionarios[i].senha){
                    verificacao_conta = true;
                }
            }
        }

        // verifica se alguma conta com esse email e senha foi encontrada
        if (verificacao_conta == true){
            this.logado = true
            return console.log("Conta acessada com sucesso!")
        }

        else{
            // informa que o email digitado não foi cadastrado no banco de dados
            if (verificacao_email == false){
                return console.log("Email não encontrado.")
            }

            //informa que a conta existe, mas a senha está incorreta
            else{
                return console.log("Senha incorreta.")
            }
        }
    }

    sair(){
        this.logado = false;
        return console.log("Desconectando do sistema...")
    }
}


ligado = true;
var sistema = new Sistema();
console.log("Bem vindo ao nosso sistema!")

while (ligado){
    console.log("Opções disponíveis:\n 1. Fazer Login\n 2. Cadastrar um novo usuário\n 3. Sair\n")
    let opcao = input.question("Selecione uma opção:");

    switch(opcao){
        case "1":
            sistema.login();
            break

        case "2":
            sistema.cadastro();
            break

        case "3":
            sistema.sair()
            ligado = false
            break
        
        default:
            console.log("Opção não encontrada, tente novamente.");
            break
    }
}

console.log("Sistema encerrado.")