import "./index.scss";

const ModalAdd = (isOpen, onClose, createBook) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    createBook()
    
    onClose()
  };
  console.log("a")

  if(!isOpen) return null;

  return (
    <div className="container_modal">
     <button onClick={handleSubmit}>OK</button>
    </div>
  );
};

export default ModalAdd;