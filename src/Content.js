import "./Content.css";
import ItemList from "./ItemList";

const Content = ({items,setitems,handleCheck,handleDelete}) => {
    return (
        <>
            {items.length ? (
                <ItemList
                    items={items}
                    setitems={setitems}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                    />
            ) : (
                <p style={{ marginTop: '2rem' }}>Your list is Empty</p>
            )}
        </>
    );
};

export default Content;
