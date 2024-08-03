const input = require('readline-sync');
const fs = require('fs');

// function ler_dados(arquivo){

// }

// function publicar_dados(dados, arquivo){
//     fs.writeFileSync(arquivo, JSON.stringify(dados, null, 2));
// }


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

class Produto{
    constructor(validade, preco, estoque, nome, descricao, id_produto){
        this.id_produto = id_produto;
        this.validade = validade;
        this.preco = preco;
        this.estoque = estoque;
        this.nome = nome;
        this.descricao = descricao
    }
}

class Sistema{
    constructor(){
        // Para armazenar os dados ao decorrer do uso do sistema
        this.acessado = false
        this.clientes = [];
        this.produtos = [];
        this.funcionarios = [];
        this.pedidos = [];

        //setando variáveis para definir os IDs de forma que cada instancia possua um ID único
        this.id_funcionarios = 0;
        this.id_clientes = 0;
        this.id_pedidos = 0;
        this.id_clientes = 0;
    }

    iniciar(){
        while (this.acessado == false){
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
    }

    ler_dados_clientes(){

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
                this.clientes.sort((a, b) => a.nome.localeCompare(b.nome));
                this.id_clientes++;

                return console.log("\nUsuário cadastrado com sucesso!")

            case "2":
                console.log("-------------------------------------Cadastrando um funcionário-------------------------------------")
                nome = input.question("Digite o seu nome: ");
                cpf = input.question("Digite o seu CPF no formato xxx.xxx.xxx-xx: ");
                email = input.question("Digite o seu melhor email: ");
                senha = input.question("Crie uma senha: ");

                this.funcionarios.push(new Funcionario(this.id_funcionarios, nome, cpf, email, senha));
                this.funcionarios.sort((a, b) => a.nome.localeCompare(b.nome)); 
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
                    this.acessado = true;
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
                    this.acessado = true;
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
                    case "1": // Lendo os dados
                        this.exibir_dados_usuario(usuario);
                        break
                        

                    case "2": //Modificando os dados
                        this.modificar_dados(usuario);
                        break

                    case "3":
                        this.ver_produtos();
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
                    case "1": // ver os dados
                        this.exibir_dados_usuario(usuario);
                        break

                    case "2":
                        this.modificar_dados(usuario);
                        break

                    case "3":
                        this.exibir_pedidos();
                        break

                    case "4":
                        this.ver_produtos();
                        break

                    case "5":
                        this.exibir_clientes();
                        break

                    case "6":
                        this.modificar_status_pedido();
                        break

                    case "7":
                        this.adicionar_produto();
                        break

                    case "8":
                        this.editar_produto();
                        break

                    case "9":
                        this.excluir_produto();
                        break

                    case "10":

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
                    case "1":
                        novo_dado = input.question("Digite o novo nome: ")
                        usuario.nome = novo_dado;
                        this.atualizar_no_sistema(usuario)
                        this.clientes.sort((a, b) => a.nome.localeCompare(b.nome)); //deixa a lista em ordem alfabética
                        break

                    case "2":
                        novo_dado = input.question("Digite a nova data de nascimento: ")
                        usuario.nascimento = novo_dado;
                        this.atualizar_no_sistema(usuario)
                        break

                    case "3":
                        novo_dado = input.question("Digite o novo CPF: ")
                        usuario.cpf = novo_dado;
                        this.atualizar_no_sistema(usuario)
                        break

                    case "4":
                        novo_dado = input.question("Digite o novo email: ")
                        usuario.email = novo_dado;
                        this.atualizar_no_sistema(usuario)
                        break

                    case "5":
                        novo_dado = input.question("Digite o nova senha: ")
                        usuario.senha = novo_dado;
                        this.atualizar_no_sistema(usuario)
                        break

                    default:
                        console.log("Opcao não encontrada.");
                        break
                }
                break

            case "Funcionário":
                console.log("1. Nome\n2. CPF\n3. Email\n4. Senha");
                opcao = input.question("Selecione uma opcao: ");

                switch(opcao){
                    case "1": //atualizando o nome
                        novo_dado = input.question("Digite o novo nome: ")
                        usuario.nome = novo_dado;
                        this.atualizar_no_sistema(usuario)
                        break

                    case "2": //atualizando o cpf
                        novo_dado = input.question("Digite o novo CPF: ")
                        usuario.cpf = novo_dado;
                        this.atualizar_no_sistema(usuario)
                        break

                    case "3": //atualizando o email
                        novo_dado = input.question("Digite o novo email: ")
                        usuario.email = novo_dado;
                        this.atualizar_no_sistema(usuario)
                        break

                    case "4": //atualizando a senha
                    novo_dado = input.question("Digite o nova senha: ")
                        usuario.senha = novo_dado;
                        this.atualizar_no_sistema(usuario)
                        break

                    default:
                        console.log("Opcao não encontrada.");
                        break
                }
                break

            default:
                break
        }
    }

    
    atualizar_no_sistema(usuario){ //método para atualizar os usuários no banco de dados local
        switch(usuario.tipo){
            case "Cliente":
                for (let i = 0; i < this.clientes.length; i++){
                    if (this.clientes[i].id_cliente == usuario.id_cliente){
                        this.clientes[i] = usuario;
                        console.log("Usuário atualizado com sucesso.")
                    }
                }  
                break

            case "Funcionário":
                for (let i = 0; i < this.funcionarios.length; i++){
                    if (this.funcionarios[i].id_funcionario == usuario.id_funcionario){
                        this.funcionarios[i] = usuario;
                        console.log("Usuário atualizado com sucesso.")
                    }
                } 
                break
            
            default:
                console.log("Erro ao atualizar usuário.")
                break
        }
    }

    ver_produtos(){
        console.log("-------------------------------------Lista de Produtos-------------------------------------");
        if (this.produtos.length == 0){
            console.log("Nenhum produto encontrado.")
        }
        else{
            for (let produto of this.produtos){
                console.log(`Nome: ${produto.nome}\nPreço: ${produto.preco}\nValidade: ${produto.validade}\nEstoque: ${produto.estoque}\nDescricao: ${produto.descricao}\n\n`)
            }
        }
    }

    adicionar_produto(){
        console.log("-------------------------------------Adicionar um novo produto à loja-------------------------------------");
        let nome = input.question("Digite o nome do produto: ");
        let preco = input.question("Digite o preco do produto: ");
        let validade = input.question("Digite a validade do produto: ");
        let estoque = input.question("Digite a quantidade em estoque: ");
        let descricao = input.question("Digite a descricao do produto: ");

        this.produtos.push(Produto(validade, preco, estoque, nome, descricao, id_produtos));
        id_produtos++;

        this.produtos.sort((a, b) => a.nome.localeCompare(b.nome)); //deixando a lista sempre em ordem alfabética

        console.log("\nProduto adicionado com sucesso.\n")
    }

    editar_produto(){
        console.log("-------------------------------------Editar produto-------------------------------------");
        if (this.produtos.length == 0){
            console.log("Nenhum produto encontrado.\n")
        }

        else{
            for (let produto of this.produtos){
                console.log(`ID: ${produto.id_produto}\nNome: ${produto.nome}\nPreço: ${produto.preco}\nValidade: ${produto.validade}\nEstoque: ${produto.estoque}\nDescricao: ${produto.descricao}\n\n`)
            }

            let id = input.question("Digite o ID do produto que você deseja editar: ")
            let nome = input.question("Digite o novo nome do produto: ");
            let preco = input.question("Digite o novo preco do produto: ");
            let validade = input.question("Digite a nova validade do produto: ");
            let estoque = input.question("Digite a nova quantidade em estoque: ");
            let descricao = input.question("Digite a nova descricao do produto: ");

            for (let i = 0; i<this.produtos.length; i++){
                if (this.produtos[i].id_produto == id){
                    this.produtos[i].nome = nome;
                    this.produtos[i].preco = preco;
                    this.produtos[i].validade = validade;
                    this.produtos[i].estoque = estoque;
                    this.produtos[i].descricao = descricao;
                }
            }

            this.produtos.sort((a, b) => a.nome.localeCompare(b.nome)); //deixando a lista sempre em ordem alfabética
            console.log("\nProduto editado com sucesso!\n")
        }
    }

    excluir_produto(){
        console.log("-------------------------------------Excluir produto-------------------------------------");
        if (this.produtos.length == 0){
            console.log("Nenhum produto encontrado.\n")
        }

        else{
            for (let produto of this.produtos){
                console.log(`ID: ${produto.id_produto}\nNome: ${produto.nome}\nPreço: ${produto.preco}\nValidade: ${produto.validade}\nEstoque: ${produto.estoque}\nDescricao: ${produto.descricao}\n\n`)
            }

            let id = input.question("Digite o ID do produto que você deseja excluir: ")

            for (let i = 0; i<this.produtos.length; i++){
                if (this.produtos[i].id_produto == id){
                    this.produtos.splice(i,1) //remove o produto da lista produtos
                }
            }

            console.log("\nProduto excluido com sucesso!\n")
        }
    }

    exibir_dados_usuario(usuario){
        console.log("-------------------------------------Seus dados-------------------------------------");

        if (usuario.tipo == "Cliente"){
            console.log(`Nome: ${usuario.nome} \nData de Nascimento: ${usuario.nascimento} \nCPF: ${usuario.cpf} \nEmail: ${usuario.email} \nSenha: ${usuario.senha} \nID: ${usuario.id_cliente}`)
        }
        else{
            console.log(`Nome: ${usuario.nome} \nCPF: ${usuario.cpf} \nEmail: ${usuario.email} \nSenha: ${usuario.senha} \nID: ${usuario.id_funcionario}`);
        }
    }

    exibir_clientes(){
        console.log("-------------------------------------Lista de clientes cadastrados no sistema-------------------------------------");
        if (this.clientes.length == 0){
            console.log("Nenhum cliente encontrado.\n")
        }

        else{
            for (let cliente of this.clientes){
                console.log(`\n--------\nNome: ${cliente.nome} \nData de Nascimento: ${cliente.nascimento} \nCPF: ${cliente.cpf} \nEmail: ${cliente.email} \nID: ${cliente.id_cliente}\n--------\n`)
            }
        }
    }

    exibir_pedidos(){
        console.log("-------------------------------------Lista pedidos-------------------------------------");
        if (this.pedidos.length == 0){
            console.log("Nenhum pedido encontrado.\n")
        }

        else{
            for (let pedido of this.pedidos){
                console.log(`ID do pedido: ${pedido.id_pedido}\nID do cliente: ${pedido.id_cliente}\nStatus: ${pedido.status}\nData: ${pedido.data}\n`)
            }
        }
    }

    modificar_status_pedido(){
        console.log("-------------------------------------Modificar o status de um pedido-------------------------------------");
        if (this.pedidos.length == 0){
            console.log("Nenhum pedido encontrado.\n")
        }

        else{
            for (let pedido of this.pedidos){
                console.log(`ID do pedido: ${pedido.id_pedido}\nID do cliente: ${pedido.id_cliente}\nStatus: ${pedido.status}\nData: ${pedido.data}\n`)
            }

            let id = input.question("Digite o ID do pedido que você deseja alterar o status: ");
            console.log("\nVocê deseja alterar o status do pedido para:\n1. Adiado \n2. Cancelado \n3. Pendente \n 4. Realizado \n");
            let opcao = input.question("Selecione uma opcao: ");
            let novo_status = null;

            switch(opcao){
                case "1":
                    novo_status = "Adiado";
                    break

                case "2":
                    novo_status = "Cancelado";
                    break
                    
                case "3":
                    novo_status = "Pendente";
                    break

                case "4":
                    novo_status = "Realizado";
                    break

                default:
                    console.log("Opcao não encontrada")
                    break
            }
            if(novo_status != null){
                for (let i = 0; i<this.pedidos.length; i++){
                    if (this.pedidos[i].id_pedido == id){
                        this.pedidos[i].status = novo_status;
                    }
                }
                console.log("\nStatus alterado com sucesso!\n")
            }
            console.log("\nErro ao alterar o status do pedido\n")
        }
    }
}



var sistema = new Sistema();

// console.log("Carregando o banco de dados...\n")
// sistema.ler_dados_clientes();
// sistema.ler_dados_funcionarios();
// sistema.ler_dados_pedidos();

console.log("Iniciando o sistema...\n")
sistema.iniciar();


console.log("Sistema encerrado.")