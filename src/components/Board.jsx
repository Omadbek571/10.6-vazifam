import axios from 'axios';
import React, { useRef, useState } from 'react';

function Board() {
    const vazifaRef = useRef();
    const colorRef = useRef();
    const descRef = useRef();
    const [loading, setLoading] = useState(false);

    function handleBoard(event) {
        event.preventDefault();

        const userBoard = {
            "name": vazifaRef.current.value,
            "description": descRef.current.value,
            "color": colorRef.current.value
        };
        
        setLoading(true);
        
        axios.post(`${import.meta.env.VITE_API_URL}/api/boards/create`, userBoard, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            }
        })
        .then((data) => {
            console.log(data.data.board);
        })
        .catch((err) => {
            console.log(err.response);
        })
        .finally(() => {
            setLoading(false);
        });
    }

    return (
        <div>
            <form className='flex flex-col max-w-72 gap-5 mx-auto' onSubmit={handleBoard}>
                <input defaultValue={"test"} className='input input-bordered input-primary w-full max-w-xs text-white' ref={vazifaRef} type="text" placeholder='Enter vazifa...' />
                <input defaultValue={"red"} className='input input-bordered input-primary w-full max-w-xs text-white' ref={colorRef} type="text" placeholder='Enter color...' />
                <textarea defaultValue={"test desc"} className='textarea textarea-accent resize-none text-white' ref={descRef} placeholder='Enter desc...'></textarea>
                <button type="submit" className='btn btn-outline btn-success' disabled={loading}>
                    {loading ? "LOADING..." : "ADD"}
                </button>
            </form>
        </div>
    );
}

export default Board;
