import Header from './Header';
import Content from './Content'
import Footer from './Footer';
import { useState,useEffect } from "react";
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';



function App() {
  const API_URL='http://localhost:3500/items'

const [items, setitems] = useState([]);
const [newItem,setNewItem]=useState('')
const [search,setSearch]=useState('')
const [fetchError,setFetchError]=useState(null)
const [isLoading,setIsLoading]=useState(true)


useEffect(()=>{
  const fetchItems = async() => {
    try {
      const response= await fetch(API_URL)
      if(!response.ok)
        throw Error('Did not reieved')
      const listItems=await response.json() 
      setitems(listItems)
      setFetchError(null)
    } catch(err) {
      setFetchError(err.message)
    } finally {
      setIsLoading(false)
    }
  }
  setTimeout(()=>{
    (async () => await fetchItems())()
  },2000)
},[])



const setAndSaveItems=(newItem) => {
  setitems(newItem)
  
}
const addItem = async (item)=> {
  const id=items.length ? items[items.length-1].id+1 :1;
  const mynewitem={id,checked:false,item}
  const listItems=[...items,mynewitem]
  setitems(listItems)
  const postOptions = {
     method : 'POST',
     headers : {
      'Content-Type' : 'application/json'
     },
     body : JSON.stringify(mynewitem)
  }
  const result=await apiRequest(API_URL,postOptions)
  if(result) setFetchError(result)
}


  
  
const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setitems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  }

const handleDelete = async (id) => {
  const listItems = items.filter((item) => item.id !== id)
  setitems(listItems)
  const deleteOption = {
    method : 'DELETE'
  }
  const reqUrl= `${API_URL}/${id}`
  const result=await apiRequest(reqUrl,deleteOption)
  if(result) setFetchError(result)
}
const handleSubmit = (e)=> {
  e.preventDefault();
  if(!newItem) return;
  // additem
  addItem(newItem)
  setNewItem('')
}
  return (
    <div className="App">
      <Header title="Grocerices List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{color:"red"}}>{`error : ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content 
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          setitems={setitems}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
        </main>
      <Footer length={items.length}/>
    </div>
  );
}

export default App;