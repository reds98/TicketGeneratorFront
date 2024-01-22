import React, { useState } from 'react';
import axios from 'axios';
import "./App.css"

function App() {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [pdfUrl, setPdfUrl] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://ticketgeneratoronline.onrender.com/generate-pdf', { nombre, fecha,hora }, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'pdfModificado.pdf');
      document.body.appendChild(link);
      link.click();
      // setPdfUrl(url);
      // const response = await axios.post('http://localhost:3000/generate-pdf', { nombre, fecha }, { responseType: 'blob' });
      // const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      // const pdfUrl = URL.createObjectURL(pdfBlob);
      // setPdfUrl(pdfUrl);

    } catch (error) {
      console.error('Hubo un error al generar el PDF', error);
  
  };}

  return (
    <div className="App">
      <h3 className='text-light '>Generador de Tiquetes</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: "column" }}>
        <div class="mb-3 ">
          <label for="exampleInputEmail1" class="form-label text-light">Nombre del Tiqute</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label text-light">Fecha del Tiquete</label>
          <input type="text" value={fecha} onChange={(e) => setFecha(e.target.value)} class="form-control" id="exampleInputPassword1" />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label text-light">Hora del Tiquete</label>
          <input type="text" value={hora} onChange={(e) => setHora(e.target.value)} class="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" class="btn btn-primary">Crear tiquete</button>
      </form>
    </div>
  );
}


export default App;
