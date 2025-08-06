import { useState } from 'react'

const Home = () => {

    //images
    const rightSideV = '/assets/images/books-side.png';
    const leftSideV = `/assets/images/prize-side.png`;

    const [showForm, setShowForm] = useState(false);
    const [scratched, setScratched] = useState(false);

    return (
        <div className='home'>
            <div className="container">
                <div className={`main ${showForm ? 'fade-out' : ''}`}>
                    <h1>Everybody can achieve <br /> the best results now</h1>
                    <button className='btn tritery' onClick={() => setShowForm(true)}>Enroll Course</button>
                    <div
                        className={`scratch-card${scratched ? ' scratched' : ''}`}
                        onClick={() => setScratched(true)}
                        tabIndex={0}
                        style={{ margin: '2rem auto 0', cursor: 'pointer', outline: 'none' }}
                        title="Click to reveal your free trial!"
                    >
                        {scratched ? (
                            <span className="scratch-reveal">🎉 You’ve unlocked a free trial! 🎉</span>
                        ) : (
                            <span className="scratch-cover">Scratch to Try Now For Free</span>
                        )}
                    </div>
                </div>
                {showForm && (
                    <div className="enroll-form fade-in">
                        <h2>Book Now for the Difference</h2>
                        <select>
                            <option>Select Class</option>
                            <option>Class 6</option>
                            <option>Class 7</option>
                            <option>Class 8</option>
                        </select>
                        <select>
                            <option>Select Subject</option>
                            <option>Math</option>
                            <option>Science</option>
                            <option>English</option>
                        </select>
                        <select>
                            <option>Select Topic</option>
                            <option>Algebra</option>
                            <option>Geometry</option>
                            <option>Grammar</option>
                        </select>
                        <div className='form-actions'>
                            <button className="btn primary" style={{ marginRight: '1rem' }}>Join Now</button>
                            <button className="btn secondary">Schedule</button>
                        </div>
                    </div>
                )}
            </div>
            <img src={rightSideV} className="right-side-v" />
            <img src={leftSideV} className="left-side-v" />
        </div>
    )
}

export default Home