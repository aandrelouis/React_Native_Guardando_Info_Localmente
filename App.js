import { SafeAreaView, StatusBar, StyleSheet, FlatList } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import NotaEditor from "./src/componentes/NotaEditor"
import { useEffect, useState } from "react";
import { Nota } from "./src/componentes/Nota";
import { buscaNotas, criaTabela } from "./src/services/Notas";





export default function App() {
  const [notas, setNotas] = useState([])
  const [notaSelecionada, setNotaSelecionada] = useState({})

  useEffect(() => {
    criaTabela();
    mostraNotas();
  },[])


  //salva objeto como string no storage
  async function salvaObjeto(objeto){
    const objetoConvertido = JSON.stringify(objeto);
    await AsyncStorage.setItem(objeto.id, objetoConvertido);
  }

  //pega objeto em formato de string do storage e o converte para objeto
  async function BuscaObjeto(id){
    const obj = await AsyncStorage.getItem(id);
    const objetoConvertido = JSON.parse(obj);
    return objetoConvertido;
  }


  async function mostraNotas(){
    // const todasChaves = await AsyncStorage.getAllKeys();
    // const todasNotas = await AsyncStorage.multiGet(todasChaves);
    // setNotas(todasNotas);
    const todasNotas = await buscaNotas();
    setNotas(todasNotas);
  }
  
  
  return (
    <SafeAreaView style={estilos.container}>
      
      <FlatList 
        data={notas}
        renderItem={(nota) => {
        return (  <>
          <Nota 
          {...nota} 
          setNotaSelecionada={setNotaSelecionada}
          />
        </> )
      }}
        keyExtractor={(nota) => nota.id}  
      />


      <NotaEditor 
        mostraNotas={mostraNotas}
        notaSelecionada={notaSelecionada}  
        setNotaSelecionada={setNotaSelecionada}
      />
      <StatusBar/>
    </SafeAreaView>
  )
}

const estilos = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "stretch",
		justifyContent: "flex-start",
	},
})

