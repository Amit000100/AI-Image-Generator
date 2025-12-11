import React, { useRef, useState } from 'react'
import './ImgGenerator.css'
import default_image from '../Assets/default_image.jpg'
const ImgGenerator = () => {
    const [image_url, setImage_url] = useState('/')
    let inputRef = useRef(null);
    const[loading,setLoading]=useState(false);

    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return 0;
        }
        setLoading(true);
        try {
            // Using Pollinations.ai - Free API, no key required
            const prompt = encodeURIComponent(inputRef.current.value);
            const imageUrl = `https://image.pollinations.ai/prompt/${prompt}?width=512&height=512&nologo=true`;
            
            // Preload the image to ensure it's loaded before displaying
            const img = new Image();
            img.onload = () => {
                setImage_url(imageUrl);
                setLoading(false);
            };
            img.onerror = () => {
                alert("Failed to generate image. Please try again.");
                setLoading(false);
            };
            img.src = imageUrl;
            
        } catch (error) {
            console.error("Error generating image:", error);
            alert("An error occurred. Please try again.");
            setLoading(false);
        }
    }
    return (
        <div className="ai-image-generator">
            <div className="header">Ai image <span>generator</span></div>
            <div className="img-loading">
                <div className="image">
                    <img src={image_url === "/" ? default_image : image_url} alt="" />
                </div>
                <div className="loading">
                    <div className={loading?"loading-bar-full":"loading-bar"}></div>
                    <div className={loading?"loading-text":"display-none"}>Loading....</div>
                </div>
            </div>
            <div className="search-box">
                <input type="text" ref={inputRef} className='search-input' placeholder='Describe the content you want to see' />
                <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
            </div>
        </div>
    )
}

export default ImgGenerator