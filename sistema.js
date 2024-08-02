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
        this.tipo = "Funcionário"
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
        this.tipo = "Cliente"
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
        console.log("-------------------------------------Àrea de login-------------------------------------")
        let email = input.question("Digite o seu email: ");
        let senha = input.question("Digite a sua senha: ");
        let verificacao_email = false;
        //let verificacao_tipo_de_conta = null;

        //percorre todas as instancias de clientes cadastrados e verifica se o email e senha digitados são compativeis com o de alguma conta
        for (let i = 0; i < (this.clientes.length); i++){
            if (email == this.clientes[i].email){
                verificacao_email = true;
                if (senha == this.clientes[i].senha){
                    console.log("\nConta acessada com sucesso!")
                    return this.clientes[i];
                }
            }
        }

        //percorre todas as instancias de funcionários cadastrados e verifica se o email e senha digitados são compativeis com o de alguma conta
        for (let i = 0; i < (this.funcionarios.length); i++){
            if (email == this.funcionarios[i].email){
                verificacao_email = true;
                if (senha == this.funcionarios[i].senha){
                    console.log("\nConta acessada com sucesso!")
                    return this.funcionarios[i];
                }
            }
        }

        // informa que o email digitado não foi cadastrado no banco de dados
        if (verificacao_email == false){
            console.log("\nEmail não encontrado.");
            return null;
        }

        //informa que a conta existe, mas a senha está incorreta
        else{
            console.log("\nSenha incorreta.");
            return null;
        }
    }

    sair(){
        this.logado = false;
        return console.log("Desconectando do sistema...")
    }

    abrir_pagina_usuario(usuario){
        let opcao;
        switch(usuario.tipo){
            case "Cliente": // caso o login tenha sido feito em uma conta cliente
                console.log("-------------------------------------Cliente: Selecione uma opção abaixo-------------------------------------")
                console.log("1. Ver meus dados\n2. Modificar meus dados\n3. Ver lista de produtos (Ordem alfabética)\n4. Fazer pedido\n5. Cancelar pedido\n6. Ver meus pedidos (Ordem cronológica)\n7. Avaliar pedido\n8. Visualizar avaliações\n9. Sair da conta\n")
                opcao = input.question("Selecione uma opcao: ");
                console.log(opcao)

                switch(opcao){
                    case "1":
                        console.log("-------------------------------------Seus dados-------------------------------------")
                        console.log(`Nome: ${usuario.nome} \nData de Nascimento: ${usuario.nascimento} \nCPF: ${usuario.cpf} \nEmail: ${usuario.email} \nSenha: ${usuario.senha} \nID: ${usuario.id_cliente}`)
                        break
                        

                    case "2":
                        break

                    case "3":
                        break
                    case "4":
                        break

                    case "5":
                        break

                    case "6":
                        break

                    case "7":
                        break

                    case "8":
                        break

                    case "9":
                        break

                    default:
                        break

                }
                break

            case "Funcionário": // caso o login tenha sido feito em uma conta funcionário
                console.log("-------------------------------------Funcionário: Selecione uma opção abaixo-------------------------------------");
                console.log("1. Ver meus dados\n2. Modificar meus dados\n3. Ver lista de pedidos (Ordem cronológica)\n4. Ver lista de produtos (Ordem alfabética)\n5.Ver lista de clientes (Ordem Alfabética)\n6. Mudar status do pedido (Pedido pendente, adiado, realizado, cancelado)\n7. Adicionar produto\n8.Editar Produto\n9. Excluir produto\n10. Sair da conta\n");
                opcao = input.question("Selecione uma opcao: ");

                switch(opcao){
                    case 1: // ver os dados
                        console.log("-------------------------------------Seus dados-------------------------------------");
                        console.log(`Nome: ${usuario.nome} \nCPF: ${usuario.cpf} \nEmail: ${usuario.email} \nSenha: ${usuario.senha} \nID: ${usuario.id_funcionario}`);
                        break

                    case 2:
                        this.modificar_dados(usuario);
                        break

                    case 3:

                    case 4:

                    case 5:

                    case 6:

                    case 7:

                    case 8:

                    case 9:

                    case 10:

                    default:

                }

            default: //caso o login não tenha sido um sucesso
                break
        }
    }

    modificar_dados(usuario){
        console.log("-------------------------------------Modificar dados-------------------------------------");
        switch(usuario.tipo){
            case "Cliente":
                console.log("1. Nome\n2. Data de Nascimento\n3. CPF\n4. Email\n5. Senha");
                opcao = input.question("Selecione uma opcao: ");

                switch(opcao){
                    case 1:
                        break
                    case 2:
                        break
                    case 3:
                        break
                    case 4:
                        break
                    case 5:
                        break
                    default:
                        console.log("Opcao não encontrada.");
                        break
                }

            case "Funcionário":
                console.log("1. Nome\n2. CPF\n3. Email\n4. Senha");
                opcao = input.question("Selecione uma opcao: ");

                switch(opcao){
                    case 1:
                        break
                    case 2:
                        break
                    case 3:
                        break
                    case 4:
                        break
                    default:
                        console.log("Opcao não encontrada.");
                        break
                }

            default:
                break
        }
    }
}


console.log("Iniciando o sistema...\n")
ligado = true;
var sistema = new Sistema();

while (ligado){
    console.log("-------------------------------------Selecione uma opção abaixo-------------------------------------")
    console.log("1. Fazer Login\n2. Cadastrar um novo usuário\n3. Encerrar o sistema\n")
    var opcao = input.question("Selecione uma opcao: ");

    switch(opcao){
        case "1":
            var usuario = sistema.login();
            sistema.abrir_pagina_usuario(usuario);
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