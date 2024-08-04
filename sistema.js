const input = require('readline-sync');

//Definindo as classes
class Pedido{
    constructor(id_pedido, id_cliente, id_produto, status, data, quantidade){
        this.id_pedido = id_pedido;
        this.id_cliente = id_cliente;
        this.id_produto = id_produto;
        this.status = status;
        this.data = data;
        this.avaliacao = null;
        this.quantidade = quantidade;
    }
}

class Funcionario{
    constructor(id_funcionario, nome, cpf, email, senha){
        this.id_funcionario = id_funcionario;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
        this.tipo = "Funcionario"
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
        this.logado = false;
        this.clientes = [];
        this.produtos = [];
        this.funcionarios = [];
        this.pedidos = [];

        //Setando variáveis para definir os IDs de forma que cada instancia possua um ID único
        this.id_funcionarios = 0;
        this.id_clientes = 0;
        this.id_pedidos = 0;
        this.id_produtos = 0;
    }

    iniciar(){
        //Loop para manter o usuário retornando ao menu inicial
        while (true){
            console.log("-------------------------------------Menu Inicial: Selecione uma opcao abaixo-------------------------------------")
            console.log("1. Fazer Login\n2. Cadastrar um novo usuario\n3. Encerrar o sistema\n")
            var opcao = input.question("Selecione uma opcao: ");
        
            switch(opcao){
                case "1":
                    //realiza o login no sistema e acessa a página de cliente ou funcionario dependendo da conta que acessou
                    var usuario = sistema.login();
                    if (usuario != null){
                        sistema.abrir_pagina_usuario(usuario);
                        break
                    }
                    else{
                        break
                    }
        
                case "2":
                    //abre a aba para cadastrar um novo usuário no sistema
                    sistema.cadastro();
                    break
        
                case "3":
                    //Encerra o loop, terminando o sistema
                    return console.log("Desligando o sistema.")
                
                default:
                    //Repete o loop até inserir uma opção válida
                    console.log("Opcao nao encontrada, tente novamente.\n");
                    break
            }
        }
    }

    cadastro(){
        //Verifico que tipo de conta a pessoa quer criar
        console.log("-------------------------------------Area de Cadastro-------------------------------------")

        while (true){
            console.log("1. Criar uma conta Cliente\n2. Criar uma conta Funcionario\n3. Voltar para a aba anterior\n")
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
                    senha = input.question("Crie uma senha com pelo menos 8 digitos: ");

                    if (this.validar_data(nascimento) == false){ //impede datas de nascimento no formato incorreto
                        return console.log("\nErro ao realizar cadastro, digite uma data valida no formato exigido.")
                    }

                    if (this.validar_CPF(cpf) == false){ // impede CPFs no formato incorreto
                        return console.log("\nErro ao realizar cadastro. Digite um CPF valido.")
                    }

                    if (this.validar_email(email) == false){ //Impede emails no formato incorreto
                        return console.log("\nErro ao realizar cadastro. Digite um email valido.")
                    }

                    if (this.validar_senha(senha) == false){ //impede senhas com menos de 8 dígitos
                        return console.log("\nErro ao realizar cadastro. Digite uma senha valida. ")
                    }
                    
                    // Cria a conta e adiciona ao banco de dados local e volátil
                    this.clientes.push(new Cliente(this.id_clientes, nome, nascimento, cpf, email, senha));
                    // mantem o banco de dados com a conta dos clientes em ordem alfabética
                    this.clientes.sort((a, b) => a.nome.localeCompare(b.nome));
                    // aumenta o número de ids utilizados para eles não se repetirem
                    this.id_clientes++;

                    return console.log("\nUsuario cadastrado com sucesso!")

                case "2":
                    //criando a conta para um funcionário
                    console.log("-------------------------------------Cadastrando um funcionario-------------------------------------")
                    nome = input.question("Digite o seu nome: ");
                    cpf = input.question("Digite o seu CPF no formato xxx.xxx.xxx-xx: ");
                    email = input.question("Digite o seu melhor email: ");
                    senha = input.question("Crie uma senha com no minimo 8 digitos: ");

                    if (this.validar_CPF(cpf) == false){ // impede um cpf em formato invalido
                        return console.log("Erro ao realizar cadastro. Digite um CPF valido. \n")
                    }

                    if (this.validar_email(email) == false){ // impede emails em formato invalido
                        return console.log("Erro ao realizar cadastro. Digite um email valido. \n")
                    }

                    if (this.validar_senha(senha) == false){ // impede senhas com menos de 8 digitos
                        return console.log("Erro ao realizar cadastro. Digite uma senha valida. \n")
                    }

                    // adiciona ao banco de dados locais que registra as contas de funcionarios
                    this.funcionarios.push(new Funcionario(this.id_funcionarios, nome, cpf, email, senha));
                    // mantem o banco de dados em ordem alfabetica
                    this.funcionarios.sort((a, b) => a.nome.localeCompare(b.nome)); 
                    // registra que um id ja foi utilizado
                    this.id_funcionarios++;

                    return console.log("\nUsuario cadastrado com sucesso!")

                case "3":
                    // volta ao menu inicial
                    return console.log("\nRetornando para o menu principal.")

                default:
                    console.log('\nOpcao nao encontrada, tente novamente..\n') // permanece no while até digitar uma opcao válida
                    break
            }
        }
        
    }

    login(){
        console.log("-------------------------------------Area de login-------------------------------------")
        let email = input.question("Digite o seu email: ");
        let senha = input.question("Digite a sua senha: ");
        let verificacao_email = false;

        //percorre todas as instancias de clientes cadastrados e verifica se o email e senha digitados são compativeis com o de alguma conta
        for (let i = 0; i < (this.clientes.length); i++){
            if (email == this.clientes[i].email){
                verificacao_email = true;
                if (senha == this.clientes[i].senha){
                    console.log("\nConta acessada com sucesso!")
                    this.logado = true;
                    //retorna a conta para ser utilizada no sistema
                    return this.clientes[i];
                }
            }
        }

        //percorre todas as instancias de funcionarios cadastrados e verifica se o email e senha digitados são compativeis com o de alguma conta
        for (let i = 0; i < (this.funcionarios.length); i++){
            if (email == this.funcionarios[i].email){
                verificacao_email = true;
                if (senha == this.funcionarios[i].senha){
                    console.log("\nConta acessada com sucesso!")
                    this.logado = true;
                    //retorna a conta para ser utilizada no sistema
                    return this.funcionarios[i];
                }
            }
        }

        // informa que o email digitado nao foi cadastrado no banco de dados
        if (verificacao_email == false){
            console.log("\nEmail nao encontrado.");
            return null;
        }

        //informa que a conta existe, mas a senha está incorreta
        else{
            console.log("\nSenha incorreta.");
            return null;
        }
    }
    
    abrir_pagina_usuario(usuario){
        let opcao;
        switch(usuario.tipo){
            case "Cliente": // caso o login tenha sido feito em uma conta cliente
                while (this.logado){
                    console.log("-------------------------------------Cliente: Selecione uma opcao abaixo-------------------------------------")
                    console.log("1. Ver meus dados\n2. Modificar meus dados\n3. Ver lista de produtos (Ordem alfabetica)\n4. Fazer pedido\n5. Cancelar pedido\n6. Ver meus pedidos (Ordem cronologica)\n7. Avaliar pedido\n8. Visualizar avaliacoes\n9. Sair da conta\n")
                    opcao = input.question("Selecione uma opcao: ");
                    console.log(opcao)

                    switch(opcao){
                        case "1": // Lendo os dados
                            this.exibir_dados_usuario(usuario);
                            break

                        case "2": //Modificando os dados
                            this.modificar_dados(usuario);
                            break

                        case "3": //exibindo os produtos disponiveis na loja
                            this.exibir_produtos();
                            break

                        case "4": //permite que o cliente compre algum produto
                            this.fazer_pedido(usuario);
                            break

                        case "5": //permite que o cliente cancele a compra de algum produto que ele fez
                            this.cancelar_pedido(usuario);
                            break

                        case "6": // exibe todos os pedidos que o cliente fez
                            this.exibir_pedidos_cliente(usuario);
                            break

                        case "7": //permite que o cliente avalie algum pedido que ele fez
                            this.avaliar_pedido(usuario);
                            break

                        case "8": // permite que o cliente veja as avaliações que ele já fez
                            this.exibir_avaliacoes(usuario);
                            break

                        case "9": // sai da conta
                            this.logado = false;
                            console.log("Desconectando da conta..")
                            break

                        default: // retorna ao loop até inserir uma opção válida
                            console.log("Opcao nao encontrada tente novamente.")
                            break
                    }
                }
                break

            case "Funcionario": // caso o login tenha sido feito em uma conta funcionario
                while(this.logado){
                    console.log("-------------------------------------Funcionario: Selecione uma opcao abaixo-------------------------------------");
                    console.log("1. Ver meus dados\n2. Modificar meus dados\n3. Ver lista de pedidos (Ordem cronologica)\n4. Ver lista de produtos (Ordem alfabetica)\n5.Ver lista de clientes (Ordem Alfabetica)\n6. Mudar status do pedido (Pedido pendente, adiado, realizado, cancelado)\n7. Adicionar produto\n8.Editar Produto\n9. Excluir produto\n10. Sair da conta\n");
                    opcao = input.question("Selecione uma opcao: ");

                    switch(opcao){
                        case "1": // ver os dados
                            this.exibir_dados_usuario(usuario);
                            break

                        case "2": // modificar os dados
                            this.modificar_dados(usuario);
                            break

                        case "3": // exibe todos os pedidos realizados na loja
                            this.exibir_pedidos();
                            break

                        case "4": // exibe todos os produtos da loja
                            this.exibir_produtos();
                            break

                        case "5": // exibe todos os clientes da loja
                            this.exibir_clientes();
                            break

                        case "6": // modifica o status do pedido de algum cliente
                            this.modificar_status_pedido();
                            break

                        case "7": // adiciona algum produto na loja
                            this.adicionar_produto();
                            break

                        case "8": // edita algum produto da loja
                            this.editar_produto();
                            break

                        case "9": // exclui algum produto da loja
                            this.excluir_produto();
                            break

                        case "10": // sai da conta
                            this.logado = false;
                            console.log("Desconectando da conta...")
                            break

                        default: // retorna ao loop até digitar alguma opção valida
                            console.log("Opcao nao encontrada tente novamente.")
                            break

                    }
                }

            default: //caso o login nao tenha sido um sucesso
                console.log("Erro ao logar na conta..")
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
                    case "1": //atualizando o nome do cliente
                        novo_dado = input.question("Digite o novo nome: ")
                        usuario.nome = novo_dado; //atualiza na conta
                        this.atualizar_no_sistema(usuario) //atualiza no banco de dados
                        this.clientes.sort((a, b) => a.nome.localeCompare(b.nome)); //deixa o banco de dados em ordem alfabetica
                        break

                    case "2": //atualizando a data de nascimento do cliente
                        novo_dado = input.question("Digite a nova data de nascimento (dd/mm/aaa): ")
                        if (this.validar_data(novo_dado) == false){ //impede datas fora do formato permitido
                            return console.log("Erro ao ataulizar cadastro. Digite uma data valida no formato exigido.\n")
                        }
                        else{
                            usuario.nascimento = novo_dado;
                            this.atualizar_no_sistema(usuario)
                            break
                        }

                    case "3": //atualizando o cpf do cliente
                        novo_dado = input.question("Digite o novo CPF: ")

                        if (this.validar_CPF(novo_dado) == false){
                            return console.log("Erro ao atualizar cadastro. Digite um CPF valido. \n")
                        }
                        usuario.cpf = novo_dado;
                        this.atualizar_no_sistema(usuario)
                        break

                    case "4": //atualizando o email do cliente
                        novo_dado = input.question("Digite o novo email: ")
                        if (this.validar_email(novo_dado) == false){
                            return console.log("Erro ao atualizar cadastro. Digite um email valido. \n")
                        }
                        usuario.email = novo_dado;
                        this.atualizar_no_sistema(usuario)
                        break

                    case "5": //atualizando a senha do cliente
                        novo_dado = input.question("Digite o nova senha com no minimo 8 digitos: \n")
                        if (this.validar_senha(novo_dado) == false){
                            return console.log("Erro ao atualizar cadastro. Digite uma senha valida")
                        }
                        usuario.senha = novo_dado;
                        this.atualizar_no_sistema(usuario)
                        break

                    default: //caso a pessoa tenha digitado uma opcao incorreta volta para a aba anterior
                        console.log("Opcao nao encontrada. Voltando para o menu principal.\n");
                        break
                }
                break

            case "Funcionario":
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

                        if (this.validar_CPF(novo_dado) == false){
                            return console.log("Erro ao realizar cadastro. Digite um CPF valido. \n")
                        }

                        usuario.cpf = novo_dado;
                        this.atualizar_no_sistema(usuario)
                        break

                    case "3": //atualizando o email
                        novo_dado = input.question("Digite o novo email: ")
                        if (this.validar_email(novo_dado) == false){
                            return console.log("Erro ao atualizar cadastro. Digite um email valido. \n")
                        }
                        usuario.email = novo_dado;
                        this.atualizar_no_sistema(usuario)
                        break

                    case "4": //atualizando a senha
                        novo_dado = input.question("Digite o nova senha com no minimo 8 digitos: ")
                        if (this.validar_senha(novo_dado) == false){
                            return console.log("Erro ao atualizar cadastro. Digite uma senha valida")
                        }
                        usuario.senha = novo_dado;
                        this.atualizar_no_sistema(usuario)
                        break

                    default: //voltando pro menu principal
                        console.log("Opcao nao encontrada. Voltando para o menu principal.\n");
                        break
                }
                break

            default:
                console.log("Falha ao modificar os dados")
                break
        }
    }

    
    atualizar_no_sistema(usuario){ //método para atualizar os usuarios no banco de dados local
        switch(usuario.tipo){
            case "Cliente":
                for (let i = 0; i < this.clientes.length; i++){
                    if (this.clientes[i].id_cliente == usuario.id_cliente){
                        this.clientes[i] = usuario;
                        console.log("Usuario atualizado com sucesso.")
                    }
                }  
                break

            case "Funcionario":
                for (let i = 0; i < this.funcionarios.length; i++){
                    if (this.funcionarios[i].id_funcionario == usuario.id_funcionario){
                        this.funcionarios[i] = usuario;
                        console.log("Usuario atualizado com sucesso.")
                    }
                } 
                break
            
            default:
                console.log("Erro ao atualizar usuario.")
                break
        }
    }

    exibir_produtos(){
        console.log("-------------------------------------Lista de Produtos-------------------------------------");
        if (this.produtos.length == 0){
            console.log("Nenhum produto encontrado.")
        }
        else{
            for (let produto of this.produtos){
                console.log(`Nome: ${produto.nome}\nc: ${produto.preco}\nValidade: ${produto.validade}\nEstoque: ${produto.estoque}\nDescricao: ${produto.descricao}\nID do produto: ${produto.id_produto}\n\n`)
            }
        }
    }

    adicionar_produto(){
        console.log("-------------------------------------Adicionar um novo produto a loja-------------------------------------");
        let nome = input.question("Digite o nome do produto: ");
        let preco = input.question("Digite o preco do produto (somente numeros): ");
        let validade = input.question("Digite a validade do produto (dd/mm/aaaa): ");
        let estoque = input.question("Digite a quantidade em estoque: ");
        let descricao = input.question("Digite a descricao do produto: ");

        if (this.validar_data(validade) == false){ //impede que coloquem letras ou datas fora do padrão em validade
            return console.log("\nErro ao cadastrar produto. Insira uma validade valida.\n")
        }

        if (isNaN(preco)){ //impede que coloquem letras no preço
            return console.log("\nErro ao cadastrar produto. Insira um preco valido. \n")
        }

        if (isNaN(estoque)){ //impede que coloquem letras no estoque
            return console.log("\nErro ao cadastrar produto. Insira um preco valido")
        }

        if (estoque <= 0){ // impede que cadastrem produtos com estoque negativo ou sem estoque
            return console.log("\nErro ao cadastrar produto. Nao e possivel cadastrar produtos sem estoque")
        }

        // adiciona ao banco de dados
        this.produtos.push(new Produto(validade, preco, estoque, nome, descricao, this.id_produtos));
        this.id_produtos++;

        this.produtos.sort((a, b) => a.nome.localeCompare(b.nome)); //deixando a lista sempre em ordem alfabetica

        console.log("\nProduto adicionado com sucesso.\n")
    }

    editar_produto(){
        console.log("-------------------------------------Editar produto-------------------------------------");
        if (this.produtos.length == 0){
            console.log("Nenhum produto encontrado.")
        }

        else{
            for (let produto of this.produtos){
                console.log(`ID: ${produto.id_produto}\nNome: ${produto.nome}\nPreco: ${produto.preco}\nValidade: ${produto.validade}\nEstoque: ${produto.estoque}\nDescricao: ${produto.descricao}\n\n`)
            }

            let id = input.question("Digite o ID do produto que voce deseja editar: ")
            let nome = input.question("Digite o novo nome do produto: ");
            let preco = input.question("Digite o novo preco do produto (somente numeros): ");
            let validade = input.question("Digite a nova validade do produto (dd/mm/aaaa): ");
            let estoque = input.question("Digite a nova quantidade em estoque: ");
            let descricao = input.question("Digite a nova descricao do produto: ");

            if(this.validar_data(validade) == false){ //impede que coloquem datas fora do padrão
                return console.log("n\Erro ao editar produto. Insira uma data de validade valida.")
            }
    
            if (isNaN(preco)){ //impede que coloquem letras no preço
                return console.log("\nErro ao cadastrar produto. Insira um preco valido. \n")
            }
    
            if (isNaN(estoque)){ //impede que coloquem letras no estoque
                return console.log("\nErro ao cadastrar produto. Insira um preco valido")
            }
    
            if (estoque <= 0){ // impede que cadastrem produtos com estoque negativo ou sem estoque
                return console.log("\nErro ao cadastrar produto. Nao e possivel cadastrar produtos sem estoque")
            }

            for (let i = 0; i<this.produtos.length; i++){
                if (this.produtos[i].id_produto == id){
                    this.produtos[i].nome = nome;
                    this.produtos[i].preco = preco;
                    this.produtos[i].validade = validade;
                    this.produtos[i].estoque = estoque;
                    this.produtos[i].descricao = descricao;
                }
            }

            this.produtos.sort((a, b) => a.nome.localeCompare(b.nome)); //deixando a lista sempre em ordem alfabetica
            console.log("\nProduto editado com sucesso!\n")
        }
    }

    excluir_produto(){
        console.log("-------------------------------------Excluir produto-------------------------------------");
        if (this.produtos.length == 0){
            console.log("Nenhum produto encontrado.")
        }

        else{
            for (let produto of this.produtos){
                console.log(`ID: ${produto.id_produto}\nNome: ${produto.nome}\nc: ${produto.preco}\nValidade: ${produto.validade}\nEstoque: ${produto.estoque}\nDescricao: ${produto.descricao}\n\n`)
            }

            let id = input.question("Digite o ID do produto que voce deseja excluir: ")

            for (let i = 0; i<this.produtos.length; i++){
                if (this.produtos[i].id_produto == id){
                    this.produtos.splice(i,1) //remove o produto da lista produtos
                    return console.log("\nProduto excluido com sucesso!\n")
                }
            }
             return console.log("\nID nao encontrado\n")

            
        }
    }

    exibir_dados_usuario(usuario){
        console.log("-------------------------------------Seus dados-------------------------------------");

        if (usuario.tipo == "Cliente"){
            console.log(`Nome: ${usuario.nome} \nData de Nascimento: ${usuario.nascimento} \nCPF: ${usuario.cpf} \nEmail: ${usuario.email} \nID: ${usuario.id_cliente}`)
        }
        else{
            console.log(`Nome: ${usuario.nome} \nCPF: ${usuario.cpf} \nEmail: ${usuario.email} \nID: ${usuario.id_funcionario}`);
        }
    }

    exibir_clientes(){
        console.log("-------------------------------------Lista de clientes cadastrados no sistema-------------------------------------");
        if (this.clientes.length == 0){
            console.log("Nenhum cliente encontrado.")
        }

        else{
            for (let cliente of this.clientes){
                console.log(`Nome: ${cliente.nome} \nData de Nascimento: ${cliente.nascimento}\nEmail: ${cliente.email} \nID: ${cliente.id_cliente}\n\n`)
            }
        }
    }

    exibir_pedidos(){
        console.log("-------------------------------------Lista pedidos-------------------------------------");
        if (this.pedidos.length == 0){
            console.log("Nenhum pedido encontrado.")
        }

        else{
            for (let pedido of this.pedidos){
                console.log(`ID do pedido: ${pedido.id_pedido}\nID do cliente: ${pedido.id_cliente}\nID do produto: ${pedido.id_produto}Status: ${pedido.status}\nData: ${pedido.data}\nQuantidade: ${pedido.quantidade}`)
            }
        }
    }

    modificar_status_pedido(){
        console.log("-------------------------------------Modificar o status de um pedido-------------------------------------");
        if (this.pedidos.length == 0){
            console.log("Nenhum pedido encontrado. Voltando ao menu inicial")
        }

        else{ //exibe todos os pedidos
            for (let pedido of this.pedidos){
                console.log(`ID do pedido: ${pedido.id_pedido}\nID do cliente: ${pedido.id_cliente}\nID do produto: ${pedido.id_produto}\nStatus: ${pedido.status}\nData: ${pedido.data}\n`)
            }

            let id = input.question("Digite o ID do pedido que voce deseja alterar o status: ");
            console.log("\nVoce deseja alterar o status do pedido para:\n1. Adiado \n2. Cancelado \n3. Pendente \n 4. Realizado \n");
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
                    console.log("Opcao nao encontrada.")
                    break
            }
            if(novo_status != null){
                for (let i = 0; i<this.pedidos.length; i++){
                    if (this.pedidos[i].id_pedido == id){
                        //altera o status do pedido com o id informado
                        this.pedidos[i].status = novo_status;
                        return console.log("\nStatus alterado com sucesso!\n")
                    }
                    else{
                        return console.log("ID nao encontrado. Retornando ao menu inicial\n")
                    }
                }
            }
            else{
                return console.log("Voltando para o menu inicial.\n")
            }
        }
    }

    cancelar_pedido(cliente){
        console.log("-------------------------------------Cancelar um pedido-------------------------------------");
        if (this.pedidos.length == 0){
            console.log("Nenhum pedido encontrado. Voltando ao menu inicial.")
        }

        else{ //exibe todos os pedidos feitos pelo cliente
            for (let pedido of this.pedidos){
                if (pedido.id_cliente == cliente.id_cliente && pedido.id_pedido != "Realizado"){ //impede que cancele pedidos que já foram concluidos
                    console.log(`ID do pedido: ${pedido.id_pedido}\nID do cliente: ${pedido.id_cliente}\nID do produto: ${pedido.id_produto}\nStatus: ${pedido.status}\nData: ${pedido.data}\n`)
                }
            }

            let id = input.question("Digite o ID do pedido que voce deseja cancelar: ");
            let confirmacao = input.question("Tem certeza que deseja cancelar este pedido? (s/n) ");

            // confirma o cancelamento
            if (confirmacao == "s"){
                for (let i = 0; i<this.pedidos.length; i++){
                    if (this.pedidos[i].id_pedido == id && this.pedidos[i].id_cliente == cliente.id_cliente){
                        this.pedidos[i].status = "Cancelado";
                        return console.log("\nPedido cancelado com sucesso\n")
                    }
                }
                return console.log("\nID nao encontrado. Voltando ao menu inicial\n")
            }

            return console.log("\nPedido nao cancelado. Voltando ao menu inicial.\n")
        }
    }

    fazer_pedido(cliente){
        console.log("-------------------------------------Fazer pedido-------------------------------------\n");
        while(true){
            //exibe todos os produtos da loja
            this.exibir_produtos()
            let id = input.question("Digite o ID do produto que voce deseja comprar: ")
            let quantidade = input.question("Digite a quantidade de produto que  deseja comprar: ")

            // Cria um novo objeto Date com a data e hora atuais
            let hoje = new Date();

            // Obtém o dia, mês e ano
            let dia = hoje.getDate();
            let mes = hoje.getMonth() + 1; // Janeiro é 0, então adiciono 1
            let ano = hoje.getFullYear();

            // Formata a data como string "DD/MM/YYYY"
            let data_formatada = `${dia}/${mes}/${ano}`;

            for (let produto of this.produtos){
                if (produto.id_produto == id){
                    if (produto.estoque >= quantidade){ // verifica se tem quantidade suficiente para ser comprada
                        let confirmacao = input.question(`O produto que voce deseja comprar é ${produto.nome}? (s/n)`)
                        if (confirmacao == "s"){
                            this.pedidos.push(new Pedido(id_pedidos, cliente.id_cliente, produto.id_produto, "Pendente", data_formatada, quantidade))
                            this.id_pedidos++;

                            console.log("\nPedido realizado com sucesso")
                            let comprar_mais = input.question("\nDeseja comprar outro produto? (s/n)")

                            if (comprar_mais != "s"){
                                return console.log("\nVoltando ao menu inicial.")
                            }
                            else{
                                continue //continua no loop
                            }
                        }
                    }
                    else{
                        console.log("Ha menos produtos no estoque do que a quantidade que voce deseja comprar. Compra nao realizada.")
                        continue //continua no loop
                    }
                }
                else{
                    console.log("\nID nao encontrado.\n")
                    comprar_mais = input.question("Deseja tentar novamente? (s/n)");
                    if (comprar_mais != "s"){
                        return console.log("Voltando ao menu inicial.")
                    }
                    else{
                        continue //continua no loop
                    }
                }
            }
        }

    }

    exibir_pedidos_cliente(cliente){ //exibe os pedidos feitos pelo cliente
        console.log(`-------------------------------------${cliente.nome}: Lista de pedidos-------------------------------------`);
        for (let pedido of this.pedidos){
            if (pedido.id_cliente == cliente.id_cliente){
                console.log(`ID do pedido: ${pedido.id_pedido}\nID do cliente: ${pedido.id_cliente}\nID do produto: ${pedido.id_produto}\nStatus: ${pedido.status}\nData: ${pedido.data}\nQuantidade: ${pedido.quantidade}--------`)
            }
        }

    }

    avaliar_pedido(cliente){
        console.log("-------------------------------------Avaliar um pedido-------------------------------------");
        // exibe os pedidos feitos pelo cliente
        this.exibir_pedidos_cliente(cliente);

        let id = input.question("Digite o ID do pedido que voce deseja avaliar:  ");
        let avaliacao = input.question("Digite a avaliacao que voce deseja dar ao seu pedido:\n1. Otimo \n2. Bom \n 3. Ruim \n")

        switch(avaliacao){
            case "1":
                avaliacao = "Otimo"
                break

            case "2":
                avaliacao = "Bom"
                break

            case "3":
                avaliacao = "Ruim"
                break

            default:
                return console.log("\nOpcao nao encontrada. Voltando ao menu inicial.\n")
        }

        // altera a avaliação do pedido
        for (let i = 0; i < this.pedidos.length; i++){
            if (this.pedidos[i].id_pedido == id && this.pedidos[i].id_cliente == cliente.id_cliente){
                this.pedidos[i].avaliacao = avaliacao;
                return console.log("Avaliacao enviada com sucesso\n")
            }
        }
        return console.log("ID nao encontrado. Voltando ao menu inicialW\n")

    }

    exibir_avaliacoes(cliente){
        console.log("-------------------------------------Avaliacoes de pedidos-------------------------------------");
        for (let pedido of this.pedidos){
            if (pedido.id_cliente == cliente.id_cliente){
                console.log(`ID do pedido: ${pedido.id_pedido} \nAvaliacao: ${pedido.avaliacao}\n--------`)
            }
        }

    }

    validar_data(data){
        // Expressão regular para verificar o formato "dd/mm/aaaa"
        const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

        // Verifica se a data corresponde ao padrão
        if (!regex.test(data)) {
            return false;
        }

        // Separa os componentes da data
        const [dia, mes, ano] = data.split('/').map(Number);

        // Verifica se o dia é válido para o mês
        const diasNoMes = [31, (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        
        if (dia > diasNoMes[mes - 1]) {
            return false;
        }

        // A data é válida
        return true;
    }

    validar_CPF(cpf){
        // Expressão regular para verificar o formato "xxx.xxx.xxx-xx"
        const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

        // Verifica se o CPF corresponde ao padrão
        if (!regex.test(cpf)) {
            return false;
        }
        return true;
    }

    validar_email(email){
        // Expressão regular para verificar se há um "@" no e-mail
        const regex = /^[^@]+@[^@]+$/;

        // Verifica se o e-mail corresponde ao padrão
        return regex.test(email);
    }

    validar_senha(senha){
        if (senha.length < 8){
            return false;
        }
        else{
            return true
        }
    }
}

var sistema = new Sistema();

console.log("Iniciando o sistema...\n")
sistema.iniciar();