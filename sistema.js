var input = require('readline-sync');

class Pedido{
    constructor(id_pedido, id_cliente, status, data){
        this.id_pedido = id_pedido;
        this.id_cliente = id_cliente;
        this.status = status;
        this.data = data;
    }
}

class Funcionario{
    constructor(id_funcionario, nome, cpf, email, senha){
        this.id_funcionario = id_funcionario;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
    }
}

class Cliente{
    constructor(id_cliente, nome, nascimento, cpf, email, senha){
        this.id_cliente = id_cliente;
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
        // Para armazenar os dados ao decorrer do uso do sistema
        this.logado = false;

        this.clientes = [];
        this.produtos = [];
        this.funcionarios = [];
        this.pedidos = [];

        //setando variáveis para definir os IDs de forma que cada instancia possua um ID único
        this.id_funcionarios = 0
        this.id_clientes = 0
        this.id_pedidos = 0
    }

    cadastro(){
        //Verifico que tipo de conta a pessoa quer criar
        console.log("-------------------------------------Àrea de Cadastro-------------------------------------")
        console.log("1. Criar uma conta Cliente\n2. Criar uma conta Funcionário\n3. Voltar para a aba anterior\n")
        let tipo = input.question("Selecione uma opcao: ")

        let nome;
        let nascimento;
        let cpf;
        let email;
        let senha;

        //Caso seja um cliente criando a conta
        switch(tipo){
            case "1":
                console.log("-------------------------------------Cadastrando um Cliente-------------------------------------")
                nome = input.question("Digite o seu nome: ");
                nascimento = input.question("Digite a sua data de nascimento (dd/mm/aaa): ");
                cpf = input.question("Digite o seu CPF (xxx.xxx.xxx-xx): ");
                email = input.question("Digite o seu melhor email: ");
                senha = input.question("Crie uma senha: ");

                this.clientes.push(new Cliente(this.id_clientes, nome, nascimento, cpf, email, senha));
                this.id_clientes++;

                return console.log("\nUsuário cadastrado com sucesso!")

            case "2":
                console.log("-------------------------------------Cadastrando um funcionário-------------------------------------")
                nome = input.question("Digite o seu nome: ");
                cpf = input.question("Digite o seu CPF no formato xxx.xxx.xxx-xx: ");
                email = input.question("Digite o seu melhor email: ");
                senha = input.question("Crie uma senha: ");

                this.funcionarios.push(new Funcionario(this.id_funcionarios, nome, cpf, email, senha));
                this.id_funcionarios++;

                return console.log("\nUsuário cadastrado com sucesso!")

            case "3":
                break

            default:
                console.log('Opção não encontrada, retornando ao menu inicial..')
        }
    }

    login(){
        console.log("-------------------------------------Àrea de login!-------------------------------------")
        let email = input.question("Digite o seu email: ");
        let senha = input.question("Digite a sua senha: ");
        let verificacao_conta = false;
        let verificacao_email = false;

        //percorre todas as instancias de clientes cadastrados e verifica se o email e senha digitados são compativeis com o de alguma conta
        for (let i = 0; i < (this.clientes.length); i++){
            if (email == this.clientes[i].email){
                verificacao_email = true;
                if (senha == this.clientes[i].senha){
                    verificacao_conta = true;
                }
            }
        }

        //percorre todas as instancias de funcionários cadastrados e verifica se o email e senha digitados são compativeis com o de alguma conta
        for (let i = 0; i < (this.funcionarios.length); i++){
            if (email == this.funcionarios[i].email){
                verificacao_email = true;
                if (senha == this.funcionarios[i].senha){
                    verificacao_conta = true;
                }
            }
        }

        // verifica se alguma conta com esse email e senha foi encontrada
        if (verificacao_conta == true){
            this.logado = true
            return console.log("\nConta acessada com sucesso!")
        }

        else{
            // informa que o email digitado não foi cadastrado no banco de dados
            if (verificacao_email == false){
                return console.log("\nEmail não encontrado.")
            }

            //informa que a conta existe, mas a senha está incorreta
            else{
                return console.log("\nSenha incorreta.")
            }
        }
    }

    sair(){
        this.logado = false;
        return console.log("Desconectando do sistema...")
    }
}


console.log("Iniciando o sistema...\n")
ligado = true;
var sistema = new Sistema();

while (ligado){
    console.log("-------------------------------------Selecione uma opção abaixo-------------------------------------")
    console.log("1. Fazer Login\n2. Cadastrar um novo usuário\n3. Encerrar o sistema\n")
    let opcao = input.question("Selecione uma opcao: ");

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
            console.log("Opção não encontrada, tente novamente.\n");
            break
    }
}

console.log("Sistema encerrado.")