<?php
    //permissão de acesso de controle
    header('Access-Control-Allow-Origin: *');
    //permissão de uso de arquivo do tipo json
    header('Content-Type: application/json');
    //tipos de métodos autorizados nesta aplicação
    header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE');
    //compilado com as permissões de acesso
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    //(servidor / usuário / senha / banco de dados)
    $con = new mysqli('localhost','root', '','bdionic');

    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        // Pegando as informações do banco de dados
        if(isset($_GET['id'])){
            // Este If é usado, caso de passagem de ID
            $id = $_GET['id'];
            $sql = $con->query("select * from cadastro where id='$id'");
            $data = $sql->fetch_assoc();
        }else{
            // Entra nesse, caso não tenha passagem de ID via "get"
            $data = array();
            $sql = $con->query("select * from cadastro");
            while($d = $sql->fetch_assoc()){
                $data[] = $d;
            }
        }
        exit(json_encode($data));
    }
    
    if($_SERVER['REQUEST_METHOD'] === 'PUT'){
        // alterar informações
        if(isset($_GET['id'])){
            $id = $_GET['id'];
            $data = json_decode(file_get_contents("php://input"));
            $sql = $con->query("update cadastro set 
                nome = '".$data->nome."', 
                cpf = '".$data->cpf."',
                endereco = '".$data->endereco."',
                bairro = '".$data->bairro."',
                cidade = '".$data->cidade."',
                estado = '".$data->estado."',
                cep = '".$data->cep."',
                email = '".$data->email."',
                telefone = '".$data->telefone."',
                profissao = '".$data->profissao."' 
                where id = '$id'");
            if($sql){
                exit(json_encode(array('status' => 'Sucesso')));
            }else{
                exit(json_encode(array('status' => 'Não Funcionou')));
            }
        }

    } 
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        // gravar informações
        $data = json_decode(file_get_contents("php://input"));
        $sql = $con->query("insert into cadastro(nome, cpf, endereco, bairro, cidade, estado, cep, email, telefone, profissao) 
        values ('".$data->nome."','".$data->cpf."','".$data->endereco."','".$data->bairro."','".$data->cidade."','".$data->estado."','".$data->cep."','".$data->email."','".$data->telefone."','".$data->profissao."')");
        if($sql){
            $data->id = $con->insert_id;
            exit(json_encode($data));
        }else{
            exit(json_encode(array('status' => 'Não Funcionou')));
        }
    }
    
    if($_SERVER['REQUEST_METHOD'] === 'DELETE'){
        // apagar informações do banco
        if(isset($_GET['id'])){
            $id = $_GET['id'];
            $sql = $con->query("delete from cadastro where id='$id'");
            if($sql){
                exit(json_encode(array('status' => 'Sucesso')));
            }else{
                exit(json_encode(array('status' => 'Não funcinou')));
            }
        }
    }

?>