import * as React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

export default function ListarCliente(){

//carregamento de dados enquanto o usuário espera
const[carregamento,setCarregamento] = React.useState(true);

//dados que virão da api e serão exibidos na tela app
const[dados,setDados] = React.useState([]);



//useEffect é executando quando esta tela carrega
React.useEffect(()=>{
    //busca os dados dos clientes na api
    fetch("http://192.168.0.7/apicliente/service/cliente/listar.php")
    .then((response)=>response.json())
    .then((clientes)=>{
        setDados(clientes.exibir);
        console.log(clientes)
    })
    .catch((error)=>console.error(`Erro ao ler a api ${error}`))
    .finally(()=>setCarregamento(false));
},[]);

    return(
        <View>
            <ScrollView>
                {carregamento ? (
                    <ActivityIndicator />
                ) : (
                    <FlatList 
                    data = {dados} renderItem={({item}) => (
                        <View>
                            <Text>Nome: {item.nome} </Text>
                            <Text>Email: {item.email}</Text>
                        </View>
                    )}
                    keyExtractor={({idcliente},index)=>idcliente}
                    />
                )}
            </ScrollView>
        </View>
    )
}

