
import Buttons from "../logInComponents/Buttons";
import Logo from "../commonComponents/logo"


function UserHeader(){
    return(
       <div className= "button-sec">
        <Logo/>
        <ul className="button-list">
            <li>
                <Buttons>MEN</Buttons>
            </li>
            <li>
                <Buttons>WOMEN</Buttons>
            </li>
        </ul>
       </div>
  );
    
}

export default UserHeader;