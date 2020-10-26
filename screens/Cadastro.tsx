import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

let varnome = "";
let varemail = ""

export default function Cadastro(){
    
    const[txtnome,setTxtNome] = React.useState("");
    const[txtemail,setTxtEmail] = React.useState("");

return(
    <View>
        <TextInput placeholder="nome" onChangeText={(value) => setTxtNome(value)} value={txtnome}/>

        <TextInput placeholder="email" keyboardType="email-address" onChangeText={(value)=>setTxtEmail(value)} value={txtemail}/>

        <TouchableOpacity onPress={()=>{
            varnome = txtnome;
            varemail = txtemail;
            realizarCadastro();
        }}>
            <Text>Cadastrar</Text>
        </TouchableOpacity>

    </View>
)

}


function realizarCadastro(){
    fetch("http://192.168.0.7/apicliente/service/cliente/cadastro.php",{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            nome:varnome,
            email:varemail
        })
    })
    .then((response) => response.json())
    .then((resultado) => {
        if(resultado.mensagem=="campo vazio"){
            alert("Você precisa preencher os dados")
        }
        else{
            alert(resultado.mensagem);
        }
    })
    .catch((error) => console.log(`Erro ao cadastrar ${error}`))
}
