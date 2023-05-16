import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,ScrollView,SafeAreaView, TouchableOpacity,Modal,TextInput } from 'react-native';


const API_URL = 'http://127.0.0.1:8000/api/v1/visiteurs';


// Fonction pour mettre à jour les données d'un visiteur
const hanldeEdit = async (id, nom, NumVisiteur, NbJours, TarifJournalier) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id,nom, NumVisiteur, NbJours, TarifJournalier })
    });
    const visiteur = await response.json();
    return visiteur;
  } catch (error) {
    console.error(error);
  }

};




const handelSave = async (nom, NumVisiteur, NbJours, TarifJournalier) => {
 
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ nom, NumVisiteur, NbJours, TarifJournalier })
      
    });
    const visiteur = await response.json();
    console.log(visiteur);
    return visiteur;  
   

  } catch (error) {
    console.error(error);
  }
};



// Fonction pour récupérer tous les visiteurs
const getVisiteurs = async () => {
  try {
    const response = await fetch(API_URL);
    const visiteurs = await response.json();
    return visiteurs;
  } catch (error) {
    console.error(error);
  }
};



// Fonction pour supprimer un visiteur spécifique
const hadleremove = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    const message = await response.text();
    return message;
  } catch (error) {
    console.error(error);
  }
};

//Fonction pour liste des visiteurs
const VisiteursList = () => {
  const [visiteurs, setVisiteurs] = useState([]);

  //modal visiteur
  const [modalVisiteur,setModalVisiteur]= useState(false);
  const [modalEditVisiteur,setModalEditVisiteur]= useState(false);
// prendre les valeurs dans l'imput
  const [name,setName]= useState("");
  const [numVisit,setNumVisit]= useState("");
  const [nbjrs,setNbjrs]= useState("");
  const [tarif,setTarif]= useState("")
  const [id,setid]= useState(""); 

  const fetchVisiteurs = async () => {
    const visiteurs = await getVisiteurs();
    setVisiteurs(visiteurs);
  };

  useEffect(() => {
    fetchVisiteurs();
  }, []);

  const renderVisiteurs = () => {
    return visiteurs.map((visiteur) => (
      
    <View style={styles.rowBetween}>
      <View style={styles.item} key={visiteur.id}>
        <Text style={styles.txNom} >{visiteur.nom}</Text>
        <Text style={styles.txNormal} >{visiteur.NumVisiteur}</Text>
        <Text style={styles.txNormal}>{visiteur.NbJours}</Text>
        <Text style={styles.txNormal}>{visiteur.TarifJournalier}</Text>
      </View>

      <View> 
        <TouchableOpacity onPress={()=>hadleremove(visiteur.id)}>
           <Text style={styles.texDelete}>DELETE</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>handleEddit(visiteur.id)}>
           <Text style={styles.texEdit}>EDIT</Text>
        </TouchableOpacity>


      </View>
    </View>
    ));
  };



  const handlecreate=()=>{
    hanldeEdit()
    setModalVisiteur(true)
  
  }

  const handleUpdate = async (id,nom, NumVisiteur, NbJours, TarifJournalier) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ id,nom, NumVisiteur, NbJours, TarifJournalier })
        
      });
      const visiteur = await response.json();
      console.log(visiteur)
      
      return visiteur;  
     
  
    } catch (error) {
      console.error(error);
    }
  };
  const handleEddit=async (id)=>{
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'GET' });
      const visiteur = await response.json();
      setName(visiteur.nom)
      setNumVisit(visiteur.NumVisiteur)
      setNbjrs(visiteur.NbJours)
        setTarif(visiteur.TarifJournalier)
      setModalEditVisiteur(true)
      console.log(visiteur);
    return visiteur;
     
    } catch (error) {
      console.error(error);
    }
  
  }

  const handelCloseModal=()=>{

    setModalVisiteur(false)
    setModalEditVisiteur(false)
  
  }

  // const clearFrom=()=>{
  //   setName("")
  //   setNumVisit("")
  //   setNbjrs("")
  //   setTarif("")
  // }

  
  // const hanldeEdit=(visiteur)=>{
  //   setid(visiteur.id)
  //   setName(visiteur.nom)
  //   setNumVisit(visiteur.NumVisiteur)
  //   setNbjrs(visiteur.NbJours)
  //   setTarif(visiteur.TarifJournalier)
  //   setModalVisiteur(true)
  // }
 


  
  
  return (
   
    <SafeAreaView>

< Modal
        visible={modalEditVisiteur}

        > 
        <View style={[styles.rowBetween,{paddingHorizontal:10}]}>
             <Text style={styles.txclose}> Edit Visiteur</Text>

             <TouchableOpacity onPress={handelCloseModal}>

             <Text style={styles.txclose}>fermer</Text>

             </TouchableOpacity> 
        </View> 

        <View style={{paddingHorizontal:10,marginTop:20}}> 

                   <Text>NOM VISITEUR</Text>
               <TextInput
                   placeholder={"Nom"}
                   style={styles.txtImput}
                   value={name}
                   onChangeText={(text)=>{
                    setName(text)
                  }}

                />

                  <Text>NUMERO VISITEUR</Text>
               <TextInput
               placeholder={"Num visiteur"}
               style={styles.txtImput}
               value={numVisit}
               onChangeText={(text)=>{
                setNumVisit(text)
                 }}
                />

                  <Text>NOMBRE DES JOURS</Text>
               <TextInput
                   placeholder={"Nombre de jours"}
                   style={styles.txtImput}
                   value={nbjrs}
                   onChangeText={(text)=>{
                    setNbjrs(text)
                  }}
                />

                  <Text>TARIF JOURNALIER</Text>
               <TextInput
                   placeholder={"Tarif Journalier"}
                   style={styles.txtImput}
                   value={tarif}
                   onChangeText={(text)=>{
                    setTarif(text)
                  }}
                 
                />

             <TouchableOpacity onPress={handleUpdate(id,name,numVisit,nbjrs,tarif)} style={styles.btnContainer}>

                 <Text style={styles.txclose}>Update</Text>

             </TouchableOpacity> 

{             
             }


          </View> 
       </Modal>

        < Modal
        visible={modalVisiteur}

        > 
        <View style={[styles.rowBetween,{paddingHorizontal:10}]}>
             <Text style={styles.txclose}> New Visiteur</Text>

             <TouchableOpacity onPress={handelCloseModal}>

             <Text style={styles.txclose}>fermer</Text>

             </TouchableOpacity> 
        </View> 

        <View style={{paddingHorizontal:10,marginTop:20}}> 

                   <Text>NOM VISITEUR</Text>
               <TextInput
                   placeholder={"Nom"}
                   style={styles.txtImput}
                   value={name}
                   onChangeText={(text)=>{
                    setName(text)
                  }}

                />

                  <Text>NUMERO VISITEUR</Text>
               <TextInput
               placeholder={"Num visiteur"}
               style={styles.txtImput}
               value={numVisit}
               onChangeText={(text)=>{
                setNumVisit(text)
                 }}
                />

                  <Text>NOMBRE DES JOURS</Text>
               <TextInput
                   placeholder={"Nombre de jours"}
                   style={styles.txtImput}
                   value={nbjrs}
                   onChangeText={(text)=>{
                    setNbjrs(text)
                  }}
                />

                  <Text>TARIF JOURNALIER</Text>
               <TextInput
                   placeholder={"Tarif Journalier"}
                   style={styles.txtImput}
                   value={tarif}
                   onChangeText={(text)=>{
                    setTarif(text)
                  }}
                 
                />

             <TouchableOpacity onPress={handelSave(name,numVisit,nbjrs,tarif)} style={styles.btnContainer}>

                 <Text style={styles.txclose}>Save</Text>

             </TouchableOpacity> 

{             
              }


          </View> 
       </Modal>

      <Text style={styles.txMain}>Liste des visiteur</Text>
         
       <View style={styles.rowBetween}>
           
         <TouchableOpacity style={{padding:8}} onPress={handlecreate}>
        
          <Text style={{ color:"blue",fontWeight: "bold" }}> New+</Text>

         </TouchableOpacity>
     
       </View>



    <ScrollView
    contentContainerStyle={{
      paddingHorizontal: 15
    }}
   >
      {renderVisiteurs()}

     </ScrollView>
    </SafeAreaView>

    
  );
};

export default VisiteursList;

const styles= StyleSheet.create({
  txMain:{
fontSize:16,
fontWeight:"bold",
padding:10
  },
  item:{
 

  },

  txNom:{
   fontSize:16,
   fontWeight:"bold"

  },

  txNormal:{
    fontSize:14,
    color:"#444"

  },
  texDelete:{
    color:"red"

  },

  rowBetween:{
    flexDirection:"row",
    justifyContent:"space-between",
    paddingVertical:10,
    borderBottomWidth:2,
    borderBottomColor:"#888"

  },

  txclose:{
     color:"gray",
     fontSize:16,
     fontWeight:"bold"



  },

  txtImput:{
    padding:10,
    borderWidth:1,
    borderColor:"#888",
    marginBottom:10
  },
    btnContainer:{
      textShadowColor:"black",
    borderWidth:1,
    borderColor:"gray",
    padding:10,
    borderRadius:20,
    textAlign:'center',
    backgroundColor:'green',
    

  },
  
  texEdit:{
    color:"green",
    paddingVertical:20

  }

});