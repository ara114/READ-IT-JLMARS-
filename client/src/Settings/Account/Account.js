import React, { useRef } from 'react'
import './Account.css'

export default function Account() {
    const nameInput = useRef()
    const userNameInput = useRef()
    const emailInput = useRef()
    const dobInput = useRef()
    const bioInput = useRef()
    
    function handleSubmit(event) {
        event.preventDefault()
    }

    return (
        <div className='acc-container'>
            <div className='heading'>
                <h1>Account</h1>
            </div>
            <div className="form-div">
                <form onSubmit={handleSubmit}>
                    
                    <div className='input'>
                        <aside className="inp inp-label">
                            <label htmlFor='name'>Name </label>
                        </aside>
                        <div className="inp inp-inp">
                            <input type='text' id='name' ref={nameInput} />
                        </div>
                    </div>

                    <div className='input'>
                        <aside className="inp inp-label">
                            <label htmlFor='user-name'>Username </label>
                        </aside>
                        <div className="inp inp-inp">
                            <input type='text' id='user-name' ref={userNameInput} />
                        </div>
                    </div>
                    
                    <div className="input">
                        <aside className="inp inp-label">
                            <label htmlFor='email'>Email Address</label>
                        </aside>
                        <div className="inp inp-inp">
                            <input type='email' id='email' ref={emailInput} />
                        </div>
                    </div>
                    
                    <div className="input">
                        <aside className="inp inp-label">
                            <label htmlFor='dob'>Date Of Birth </label>
                        </aside>
                        <div className="inp inp-inp">
                            <input type='date' id='dob' ref={dobInput} />
                        </div>
                    </div>
                    
                    <div className="input">
                        <aside className="inp inp-label">
                            <label htmlFor='bio'>Bio </label>
                        </aside>
                        <div className="inp inp-inp">
                            <textarea id='bio' rows='5' ref={bioInput} ></textarea>
                        </div>
                    </div>
                    
                    <div>
                        <button className='save-btn'>Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    )
}