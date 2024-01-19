import React from 'react';
import '../assets/texts.css'
import '../assets/pixel.css'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PixelBoard = () => {
    const navigate = useNavigate();
    const rows = 50;
    const columns = 100;
    const [grid, setGrid] = useState([]);
    const [rgbValues, setRgbValues] = useState({ r: 0, g: 0, b: 0 });
    const location = useLocation();
    const username = location.state?.userData?.username ?? "non-user";

    //if someone tries direct access o page
    if(username === "non-user"){
        const navigate = useNavigate();
        useEffect(() => {
            navigate('/');
        });

        return (<div>go back simon</div>);
    }

    //basic page content
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:443/pixelboard'); 
                const pixelData = response.data;

                const updatedGrid = Array.from({ length: rows }, () => Array(columns));

                updatedGrid.forEach(row => {
                    row.fill('rgb(0, 0, 0)');
                });

                pixelData.forEach(({ row, col, r, g, b }) => {
                    const rgb = `rgb(${r}, ${g}, ${b})`;
                    updatedGrid[row][col] = rgb;
                });

                setGrid(updatedGrid);
            } catch (error) {
                console.error('Error fetching pixel data:', error);
            }
        };

        const interval = setInterval(fetchData, 1000); // Fetch data every 5 seconds

        return () => {
            clearInterval(interval); // Clear the interval when the component unmounts
        };
    }, []);

    //change pixel colors
    const handleColorChange = (row, col) => {
        const { r, g, b } = rgbValues;

        axios.post('http://localhost:443/pixelboard', { row, col, r, g, b })
            .then(response => {
            })
            .catch(error => {
                console.error('Error sending data:', error);
            });
    };

    //navigate to home
    const handlePixelBoardClick = () => {
        navigate('/home', { state: { userData: { username } } });
    };

    
    return (
        <div id="pixelboard">
            <div className='navBar'>
                <button className='tabButton' onClick={handlePixelBoardClick}>Global Chat</button>
                <button className='currentTabButton'>PixelBoard</button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                {grid.map((row, rowIndex) =>
                    row.map((col, columnIndex) => (
                        <button
                            key={`${rowIndex}-${columnIndex}`}
                            style={{
                                width: '8px',
                                height: '8px',
                                border: rowIndex === 0 || rowIndex === rows - 1 || columnIndex === 0 || columnIndex === columns - 1 ? 'black' : '0.1px solid white',
                                cursor: 'pointer',
                                boxSizing: 'border-box',
                                backgroundColor: rowIndex === 0 || rowIndex === rows - 1 || columnIndex === 0 || columnIndex === columns - 1 ? 'black' : grid[rowIndex][columnIndex],
                            }}
                            onClick={() => handleColorChange(rowIndex, columnIndex)}
                        />
                    ))
                )}
            </div>
            
            <div id="rgbbar">
                <input
                    type="number"
                    value={rgbValues.r}
                    onChange={(e) => setRgbValues({ ...rgbValues, r: e.target.value })}
                    placeholder="r.value"
                    id="rgb"
                />
                <input
                    type="number"
                    value={rgbValues.g}
                    onChange={(e) => setRgbValues({ ...rgbValues, g: e.target.value })}
                    placeholder="g.value"
                    id="rgb"
                />
                <input
                    type="number"
                    value={rgbValues.b}
                    onChange={(e) => setRgbValues({ ...rgbValues, b: e.target.value })}
                    placeholder="b.value"
                    id="rgb"
                />

                <div id="colorPreview" style={{ 
                    backgroundColor: `rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})`,
                    borderRadius: '5px',
                    borderColor: 'black',
                    borderWidth: '2px',
                    width: '55px',
                    height: '50px',
                    paddingTop: '10px',
                    paddingLeft: '2px',
                    alignContent: 'center',
                }}>Colour</div>

            </div>
            <div id='infobox'> This is Simple. Enter the R G B values in the box above (non-zero) and select a pixel to change its colour.
            <br/>
            But others can update too.
            </div>
        </div>
    );
};

export default PixelBoard;
