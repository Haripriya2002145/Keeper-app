import React, {useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Zoom, Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
//import SearchIcon from '@material-ui/icons/Search';

function Note(props) {

    const [editedNote, setEditedNote] = useState({
        currentTitle: props.title,
        currentContent: props.content
    })

    const [isEdit, setIsEdit]=useState(false);

    function handleClickToDelete() {
        console.log(props.id);
        props.onDelete(props.id);
    }

    function handleEdit() {
        setIsEdit(true);
    }

    function handleDone(){
        setIsEdit(false);
        setEditedNote({
            currentTitle: editedNote.currentTitle,
            currentContent: editedNote.currentContent
        })
        props.onEdit(props.id, editedNote);
    }

    function handleEditOnChange(event){
        const {name, value}=event.target;
        setEditedNote((prevValue)=>{
            return({
                ...prevValue,
                [name]: value
            })
        })
    }

    return (
        <div className='note'>

            {isEdit ? <input 
                name="currentTitle"
                className='noteTitle' 
                value={editedNote.currentTitle} 
                onChange={handleEditOnChange}
            /> : <h1>{props.title}</h1>}

            {isEdit? <textarea 
                rows="5"
                name="currentContent"
                className='noteContent' 
                value={editedNote.currentContent} 
                onChange={handleEditOnChange}
            /> : <p>{props.content}</p> }

            <button onClick={handleClickToDelete}>
                <DeleteIcon />
            </button>

            <button onClick={handleEdit}>
                <EditIcon />
            </button>

            {isEdit && (<Zoom in={true}><Fab onClick={handleDone} className='editButton'>
                <DoneIcon />
            </Fab></Zoom>)}

        </div>
    )
}

export default Note;
