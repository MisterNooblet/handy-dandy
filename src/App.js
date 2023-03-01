import { useEffect, useState } from "react";

import { db } from "./firebase"

import { query, collection, onSnapshot, updateDoc, doc } from "firebase/firestore";


let tempCount = 0
function App() {
  const [counter, setCounter] = useState(10)
  useEffect(() => {
    const q = query(collection(db, 'counter'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setCounter(doc.data().value);
      })
    })
    return () => unsubscribe
  }, [])

  const toggleComplete = async () => {
    tempCount += 1
    await updateDoc(doc(db, 'counter', 'Shzydboy7y5X9xEOTrup'), {
      value: tempCount,
    });
  };

  return (
    <div>
      <h2>{counter}</h2>
      <button onClick={toggleComplete}>inrease</button>
    </div>
  );
}

export default App;




// function App() {


//   return (

//     <div>

//     </div>

//   );
// }

// export default App;
