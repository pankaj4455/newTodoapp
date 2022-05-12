
import { useEffect, useState } from 'react';
import './App.css';

const getData=()=>{
  let list=localStorage.getItem('lists')
  if(list){
    return JSON.parse(localStorage.getItem('lists'))
  }
  else{
    return []
  }
}

function App() {
  const [text,setText]=useState('');
  const [data,setData]=useState(getData());
  const[toggle,setToggle]=useState(true);
  const[isEdit,setIsEdit]=useState(null);
  const change=(e)=>{
    setText(e.target.value);
    //console.log(e.target.value)
  }

const addItem=(id)=>{
  if(!data){
   
}else if(text && !toggle){
  setData(data.map((elem)=>{
      if(elem.id===isEdit){
        return {...elem,name:text}
      }
      return elem;
  }))
  setToggle(true);
  setText('');
  setIsEdit(null);

    }
else{
    const alldata={id:new Date().getTime().toString(),name:text}
      setData([...data,alldata]);
     // setData('');
  
  
  }
     
     setText('');
}
const deleteItem=(id)=>{
  //console.log(id);
  setData((item)=>{
    return item.filter((elems)=>{
      return elems.id!==id;
    })
  })
}
useEffect(()=>{
  localStorage.setItem('lists',JSON.stringify(data))
},[data])

const editItem=(id)=>{
 
  let newEdit=data.find((elem)=>{
      return elem.id===id;
      })
     // console.log(newEdit);
      setToggle(false);
      setText(newEdit.name);
      setIsEdit(id);
    }

  return (
    <>
  <div className='parent'>
    <div className='child'>
      <h2>Todo App.....</h2>
      <input type="text" placeholder='enetr name' value={text} onChange={change}/>
      {toggle ? <i id="item" className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i>:    
        <i id="item" className="fa fa-edit add-btn" title="Add Item" onClick={addItem}></i>}

      </div>
     
    </div>
    {data.map((elem)=>{
      return(

    <div className='eachItem' key={elem.id}>
    {elem.name}
    <i id='edit' className="fa  fa-edit add-btn" title="Edit Item" onClick={()=>editItem(elem.id)}></i>
      <i id='del' className="fa  fa-trash add-btn" title="Delete Item" onClick={()=>deleteItem(elem.id)}></i>
    </div>
  
      )
      
    })}
   
    
    </>
  );
}

export default App;
