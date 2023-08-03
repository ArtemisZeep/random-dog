
import image from "../images/start-page/body-start-image.jpg"
import { Link } from "react-router-dom";
import MainPage from "./Main"



function StartPage (props){
    
    return(
<div className = "body-start">
    <img className = "body-start__image" src={image}></img>
    <Link className = "body-start__button" to="/generate" type="button">Generate</Link>
</div>
     ) 
}

export default StartPage
