import React, { useState } from "react"
import { Title, Subtitle, Wrapper, Input, Label, LoginButton, Button, Wrapper2, SignUpForm} from './StyledComponentElements'



function SignUp({ setUser, handleShowLoginClearErrors, setErrors }){
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        first_name: "",
        is_parent: "",
        email: "",
        last_name: ""
    })

    console.log(userData)

    function handleCreateUser(event) {
        setUserData({...userData, 
            [event.target.name] : event.target.value})
    }

    function handleRadioButton(event) {
        setUserData({...userData,
            [event.target.name] : Boolean(event.target.value)})
    }

    function userSubmit(event) {
    event.preventDefault()
    fetch("/signup", {
        method: "POST",
        headers: {
        "Content-Type": "Application/json"
        },
        body: JSON.stringify(userData)
    }).then((resp) => {
        if (resp.ok) {
            resp.json().then((user) => setUser(user));
        } else {
            resp.json().then((err) => setErrors(err.errors));
        }
    })
}
 
    return (
        <Wrapper>
            <SignUpForm onSubmit={userSubmit}>
                <Title>Create New User</Title>
                <Label htmlFor='first_name'>First Name:</Label>
                <Input name='first_name' placeholder='First Name' value={userData.first_name} onChange={handleCreateUser}></Input>
                <Label htmlFor='last_name'>Last Name:</Label>
                <Input name='last_name' placeholder='Last Name' value={userData.last_name} onChange={handleCreateUser}></Input>
                <Label htmlFor='email'>Email:</Label>
                <Input name='email' placeholder='Email' value={userData.email} onChange={handleCreateUser}></Input>
                <Label htmlFor='username'>Username:</Label>
                <Input name='username' placeholder='Username' value={userData.username} onChange={handleCreateUser}></Input>
                <Label htmlFor='password'>Password:</Label>
                <Input name='password' placeholder='Password' type='password' value={userData.password} onChange={handleCreateUser}></Input>
                <Wrapper2>
                    <Subtitle>Is this Account for a Parent or Child?</Subtitle>
                    <Label htmlFor='is_parent'>Parent</Label>
                    <Input type='radio' name='is_parent' value='true' onChange={handleRadioButton}></Input>
                    <Label htmlFor='is_child'>Child</Label>
                    <Input type='radio' name='is_parent' value='' onChange={handleRadioButton}></Input>
                    <LoginButton>Sign Up</LoginButton>
                    <Button onClick={handleShowLoginClearErrors}>Already Have an Account?</Button>
                </Wrapper2>
            </SignUpForm>
        </Wrapper>
    )
}

export default SignUp
