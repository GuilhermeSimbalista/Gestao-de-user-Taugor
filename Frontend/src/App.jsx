import React, { useState } from 'react';
import Header from './components/Header/index'; 
import Form from './components/Form';
import UsersList from './components/UserList';
import { firebase } from './firebase/config'
import 'firebase/compat/storage';
import axios from 'axios';

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUploadProfilePicture = async (file) => {
    if (!file) {
      return null;
    }
      const storageRef = firebase.storage().ref(`profile_pictures/${file.name}`);
  
    // Fazer o upload do arquivo
    await storageRef.put(file);
  
    // Obter a URL pública do arquivo carregado
    const downloadURL = await storageRef.getDownloadURL();
    return downloadURL;
  }

  const handleSaveUser = async (userData, userId) => {
    try {
      const response = await axios.post('http://localhost:3000/generate-pdf', userData);
      console.log('PDF Generated: ', response.data.downloadURL);
      const firestore = firebase.firestore();
      let downloadURL = null;
      if (userData.fotoPerfil instanceof FileList && userData.fotoPerfil.length > 0) {
        downloadURL = await handleUploadProfilePicture(userData.fotoPerfil[0]);
      }
      const userDataToSave = { ...userData, fotoPerfil: downloadURL };

      if (userId) {
        await firestore.collection('users').doc(userId).update(userDataToSave);
        console.log("Usuário atualizado com sucesso!");
      } else {
        await firestore.collection('users').add(userDataToSave);
        console.log("Novo usuário cadastrado com sucesso!");
      }
      setSelectedUser(null);
    } catch (error) {
      console.error("Erro ao salvar o usuário: ", error);
    }
  };

  return (
    <div>
      <Header />
      <Form user={selectedUser} onSave={handleSaveUser} />
      <UsersList onEditUser={setSelectedUser} />
    </div>
  );
}

export default App;