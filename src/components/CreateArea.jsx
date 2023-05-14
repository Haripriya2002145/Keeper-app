import React, { useState } from 'react';
import { Zoom, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function CreateArea(props) {

    const [noteItem, setNoteItem] = useState({
        title: "",
        content: ""
    })

    const [isExpanded, setExpanded] = useState(false)

    const [isEmpty, setIsEmpty]=useState(false)

    function expand() {
        setExpanded(true);
    }

    function handleChange(event) {
        const { value, name } = event.target;
        setNoteItem(prevValue => {
            return (
                {
                    ...prevValue,
                    [name]: value
                }
            )
        })
    }

    function submitNote(event) {
        if (noteItem.title !== "" || noteItem.content !== "") {
            setIsEmpty(false);
            props.onAdd(noteItem);
        }
        if(noteItem.title === "" && noteItem.content === ""){
            setIsEmpty(true);
            setTimeout(()=>{setIsEmpty(false)}, 4000);
        }
        setNoteItem({
            title: "",
            content: ""
        })   
        event.preventDefault();
    }

    return (
        <div>
            
            <form className='create-note'>
                {isExpanded && (<input
                    name="title"
                    value={noteItem.title}
                    onChange={handleChange}
                    placeholder='Title'
                />)}
                <textarea
                    name="content"
                    value={noteItem.content}
                    onClick={expand}
                    onChange={handleChange}
                    rows={isExpanded ? 3 : 1}
                    placeholder='Take a note...'
                />
                <Zoom in={isExpanded}>
                    <Fab onClick={submitNote}>
                        <AddIcon />
                    </Fab>
                </Zoom>
            </form>

            {isEmpty && <div className='warning'>Provide content</div>}
            
        </div>
    )
}

export default CreateArea;

