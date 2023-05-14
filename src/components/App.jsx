import React, {useState} from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import CreateArea from './CreateArea';

function App(){

    const [notes, setNotes]=useState([]);
    
    function createNote(newNote){
        setNotes(prevNotes=>{
            return(
                [...prevNotes, newNote]
            )
        })
    }

    function editNote(id, editedNote){
        setNotes(prevNotes=>{
            return(
                prevNotes.map((noteItem, index)=>{
                    if(index===id){
                        noteItem.title=editedNote.currentTitle;
                        noteItem.content=editedNote.currentContent;
                    }
                    return noteItem;
                })
            )
        });
        console.log(notes);
    }

    function deleteNote(id){
        setNotes(prevNotes=>{
            return(
                prevNotes.filter((note, index)=>{
                    console.log("inside deleteNote="+id+" and index is="+index);
                    console.log(prevNotes[id])
                    return index!==id
                })
            )
        })
        console.log(notes);
    }
    
    return(
        <div>
            <Header />
            <CreateArea onAdd={createNote} />
            {notes.map((noteItem, index)=>{
                return(
                <Note 
                    id={index}
                    key={index}
                    title={noteItem.title} 
                    content={noteItem.content} 
                    onDelete={deleteNote}
                    onEdit={editNote}
                />)
            })}
            <Footer />
        </div>
    );
}

export default App;