import { useState, useContext } from "react";
import { EntriesContext } from "../../context";
import { useRouter } from 'next/router';

const NewEntry = () => {
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);
  const [isAddingEntry, setIsAddingEntry] = useState(false);
  const router = useRouter()

  const { addNewEntry } = useContext(EntriesContext);
  const onTextFieldChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };
  const onSave = () => {
    const {id} = router.query
    if (inputValue.length === 0) return;
   /* @ts-ignore */
    addNewEntry(inputValue, id);
    setTouched(false);
    setIsAddingEntry(false);
    setInputValue("");
    window.location.reload()
  };

  return (
    <div className="bg-teal-50 rounded-md p-5">
      <h1 className="font-bold mb-2">Nueva Entrada</h1>
      <textarea
        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 bg-slate-200 border-slate-200 placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={inputValue}
        onChange={onTextFieldChanged}
        placeholder="Escribe tu articulo"
      />
      <button onClick={onSave} className="bg-cyan-900 text-white px-5 py-1 rounded mt-5">Guardar</button>
    </div>
  );
};

export default NewEntry;
