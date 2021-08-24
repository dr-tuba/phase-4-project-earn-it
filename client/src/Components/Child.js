import React, {useState, useEffect} from 'react'
import Chore from './Chore'
import ChildChoreError from './ChildChoreError'
import { ChildInfoWrapper } from './StyledComponentElements'
import styled from 'styled-components'

const ShowInfoButton = styled.button`
    border-radius: 20px;
    font-size: 1em;
    margin-right: 1em;
`

const Child = ({user, chores}) => {
    console.log(user.id)
    const [showChildInfo, setShowChildInfo] = useState(false)
    const [allChildChores, setAllChildChores] = useState([])
    const [childChoreErrors, setChildChoreErrors] = useState([])
    const [childChore, setChildChore] = useState({
        reward: "",
        time_to_complete: "",
        is_completed: Boolean(false),
        user_id: user.id,
        chore_id: ""
    })

    useEffect(() => {
        fetch(`/child_chores/${user.id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setAllChildChores(data)
        })
    }, [])

    function handleChoreChange(event){
        setChildChore({...childChore,
            [event.target.name] : event.target.value
        })
    }

    function onChoreAssign(event){
        event.preventDefault()
        fetch(`/child_chores`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(childChore)
        })
        .then((response) => {
            if (response.ok) {
                response.json().then((data) => setAllChildChores([...allChildChores, data]));
            } else {
                response.json().then((err) => setChildChoreErrors(err.errors));
            }
        })
    }


    function handleMember(){
        setShowChildInfo(!showChildInfo)
    }

    return (
        <ChildInfoWrapper>
            <h3><span><ShowInfoButton onClick={handleMember}>{showChildInfo ? "-" : "+"}</ShowInfoButton></span>{user.first_name}</h3>
            {showChildInfo && 
                <>
                    <h5>{user.username}</h5>
                    <h5>{user.email}</h5>
                    {allChildChores && allChildChores.map(child_chore => {
                        return(
                            <Chore key={child_chore.id} child_chore={child_chore}/>
                            )
                    })}
                    <h5>Assign Chore</h5>
                    <form onSubmit={onChoreAssign}>
                        <select name="chore_id" onChange={handleChoreChange}>
                            <option defaultValue>Pick Chore</option>
                            {chores ? 
                            chores.map(chore => {
                                return(
                                <option value={chore.id}>{chore.chore_name}</option>
                            )})
                            :
                            <option>Make a chore</option>}
                        </select>
                        <select name="time_to_complete" onChange={handleChoreChange}>
                            <option defaultValue>How Long?</option>
                            <option value='15'>15 minutes</option>
                            <option value='30'>30 minutes</option>
                            <option value='45'>45 minutes</option>
                            <option value='60'>60 minutes</option>
                        </select>
                        <select name="reward" onChange={handleChoreChange}>
                            <option defaultValue>Reward</option>
                            <option value='1'>$1</option>
                            <option value='5'>$5</option>
                            <option value='10'>$10</option>
                            <option value='15'>$15</option>
                            <option value='20'>$20</option>
                        </select>
                        <button>Assign</button>
                    </form>
                    {childChoreErrors.map((err) => (
                        <ChildChoreError key={err}>{err}</ChildChoreError>
                    ))}
                </>
            }
        </ChildInfoWrapper>
    )
}

export default Child