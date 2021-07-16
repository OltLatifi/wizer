import React from 'react'
import Homework from './Homework'

import CardActions from '@material-ui/core/CardActions';
import DeleteIcon from '@material-ui/icons/Delete';

import Button from '@material-ui/core/Button';


function ListOfHomework({menuItems, updateHomework, deleteHomework}) {
    return (
        <div>
            {menuItems.map((h, key)=>{
                return(
                    <Homework
                    title={h.title}
                    due_date={h.due_date.split("T")[0]} // cuts off the hour and timezone rubbish
                    finished={
                        h.finished? '✅': 
                        <input
                            type="checkbox"
                            onChange={(e) => updateHomework(
                                h.title,
                                e.target.checked,
                                h.subject.id,
                                h.id,)}>
                        </input>
                            }
                    description={h.description}
                    subject={h.subject.name}
                    id={h.id}
                    deleteButton={
                        <CardActions>
                            <Button size="small" onClick={()=>deleteHomework(h.id)}><DeleteIcon/></Button>
                        </CardActions>
                    }
                    />
                    )
                })}
        </div>
    )
}

export default ListOfHomework
