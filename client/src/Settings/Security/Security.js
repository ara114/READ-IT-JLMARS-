import React from 'react'
import './Security.css'

export default function Security() {

    

    return (
        <div className='sec-container'>
            <div>
                <h1>Security</h1>
            </div>
            <div className="form-div">
                <form>
                    <div className='input'>
                        <aside className="inp inp-label">
                            <label htmlFor='old-pw'>Old password </label>
                        </aside>
                        <div className="inp inp-inp">
                            <input type='password' id='old-pw' />
                        </div>
                    </div>

                    <div className='input'>
                        <aside className="inp inp-label">
                            <label htmlFor='new-pw'>New password </label>
                        </aside>
                        <div className="inp inp-inp">
                            <input type='password' id='new-pw' />
                        </div>
                    </div>

                    <div className='input'>
                        <aside className="inp inp-label">
                            <label htmlFor='confirm-pw'>Confirm password </label>
                        </aside>
                        <div className="inp inp-inp">
                            <input type='password' id='confirm-pw' />
                        </div>
                    </div>

                    <div>
                        <button className='save-btn'>Save Password</button>
                    </div>
                </form>
            </div>
        </div>
    )
}