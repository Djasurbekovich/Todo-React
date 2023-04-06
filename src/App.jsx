import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';



const getLocalStorage = () => {
  return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : []
}

function App() {

  const [list, setList] = useState(getLocalStorage());
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      console.log('inputga yoz');
    } else if (name && isEditing) {
      console.log('ozgardi');
    } else {
      const newItem = { id: new Date().getTime().toString(), value: name };
      setList([...list, newItem])
      setName('')
    }
  }

  const removeItem = (id) => {
    const newItem = list.filter((item) => item.id !== id)
    setList(newItem)
  }

  

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list]);


  
  return (
    <div>
      <section className='section-center'>
        <h1 className='grocery-title'>Todo-React</h1>
        <form action="" className='grocery-form' onSubmit={handleSubmit}>
          <input
            type="text"
            className='grocery'
            placeholder='todo'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className='grocery-btn'>add</button>
        </form>
      </section>
      <div>
        {list.map((todo) => {
          return (
            <div className='grocery-box' key={todo.id}>
              <p className='grocery-text'>{todo.value}</p>
              <button className='grocery-del' onClick={() => removeItem(todo.id)}>delete</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App



// import createGlobe from "cobe";
// import { useEffect, useRef } from "react";

// // https://github.com/shuding/cobe

// export default function App() {
//   const canvasRef = useRef();

//   useEffect(() => {
//     let phi = 0;

//     const globe = createGlobe(canvasRef.current, {
//       devicePixelRatio: 2,
//       width: 600 * 2,
//       height: 600 * 2,
//       phi: 0,
//       theta: 0,
//       dark: 1,
//       diffuse: 1.2,
//       mapSamples: 16000,
//       mapBrightness: 6,
//       baseColor: [0.3, 0.3, 0.3],
//       markerColor: [0.1, 0.8, 1],
//       glowColor: [1, 1, 1],
//       markers: [
//         // longitude latitude
//         { location: [37.7595, -122.4367], size: 0.03 },
//         { location: [40.7128, -74.006], size: 0.1 }
//       ],
//       onRender: (state) => {
//         // Called on every animation frame.
//         // `state` will be an empty object, return updated params.
//         state.phi = phi;
//         phi += 0.01;
//       }
//     });

//     return () => {
//       globe.destroy();
//     };
//   }, []);

//   return (
//     <div className="App">
//       {/* <h1>COBE</h1>
//       <p>
//         A lightweight (5kB) WebGL globe lib:{" "}
//         <a href="https://github.com/shuding/cobe" target="_blank">
//           GitHub
//         </a>
//       </p> */}
//       <canvas
//         ref={canvasRef}
//         style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
//       />
//     </div>
//   );
// }