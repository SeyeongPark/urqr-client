// import { response } from 'express';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InputData = (props) => {
    let now = new Date();
    now = + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

    // const API_BASE = "http://localhost:3001";
    const API_BASE = "https://sptech-urqr-api.herokuapp.com";
    
    const [card, setCard] = useState([]);
    const [codeText, setCodeText] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birth, setBirth] = useState('');
    const [imageInput, setImageInput]= useState(null);
    const [homePhone, setHomePhone] = useState('');
    const [cellPhone, setCellPhone] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [schoolPhone, setSchoolPhone] = useState('');
    const [addInfo, setAddInfo] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const today = new Date().toISOString().substring(0,10);

    const GenerateCode = () => {
        return new Array(5).join().replace(/(.|$)/g, function(){return ((Math.random()*36)|0).toString(36);}).toUpperCase();
    }
    
    const [resultImageURL, setResultImageURL] = useState('default - useState')
    
    
    const submitImage = async () => {
        
        const { url } = await fetch( API_BASE + "/s3Url")
        .then(res => res.json())
        // get secure url from our server
        
        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            body: imageInput
        })
        // } catch (e) { console.log('e: ',e)
        // post the image directly to the s3 bucket
        //    .then(res => {console.log('hello ==> ', res.json())})
        //    .catch(error => console.error('This is Error message -', error))
        // .then(res => { return res.split('?')[0]})
        
        // .then(console.log('SI 3 | PUT IMAGE TO S3 at', now))
        // .catch(err => {console.error('getting error while uploading image to S3 \n', err, now)})
        
        // return url.split('?')[0];
    }
    
    const submitInfo = async () => {
        // submitImage();
        // console.log('sdfdfskdsfkdsfk=? ', url);
        // submitForm();
        
        setCodeText('');
        setFirstName('');
        setLastName('');
        setBirth('');
        setHomePhone('');
        setCellPhone('');
        setSchoolName('');
        setSchoolPhone('');
        setAddInfo('');
        setPassword('');
        setIsSamePassword('false');
        setTextIsSamePassword('');
        setDisableForm(false);
        setImageInput(null);
        // resultImageURL = ''
        // code = ''
    }
    
    const submitForm = async () => {    
        let code =  GenerateCode();
    
        // submitImage(url)
        // const submitImagePromise = await submitImage(url);
        // const submitImgResult = submitImagePromise;
        
        // console.log('ffff => ', url.split('?')[0]);
        // const urlShape = url.split('?')[0]
        const data = await fetch(API_BASE + "/card/new", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cardCode: code, 
                firstName: firstName,
                lastName: lastName,
                // imageUrl : urlShape,
                birth: birth,
                homePhone: homePhone,
                cellPhone: cellPhone,
                schoolName: schoolName,
                schoolPhone: schoolPhone,
                addInfo: addInfo,
                password : password,
                issueDate: now
            })
        })
        // .catch(err => console.error(err))
        // .then(console.log('SF 3 | ', now , '__ POST DATA'))
        // .then(res => console.log(res.json()))
        .then(navigate(`/result`, { state: { qrText: code }}))
        // .catch(navigate(`/error`))
        // .catch(err => console.error('getting error while posting data, ' , err))

        
        setCard([...card, data]);
        
        setCodeText('');
        setFirstName('');
        setLastName('');
        setBirth('');
        setHomePhone('');
        setCellPhone('');
        setSchoolName('');
        setSchoolPhone('');
        setAddInfo('');
        setPassword('');
        setIsSamePassword('false');
        setTextIsSamePassword('');
        setDisableForm(false);
        setImageInput(null);
        // resultImageURL = ''
        // code = ''

        // console.log('SF 5 | ', now , ' _ finished submitForm()');
    }

    const [isToggleOn, setIsToggleOn] = useState(false);
    const [isHiden, setIsHiden] = useState(true);
    const [isSamePassword, setIsSamePassword] = useState('false');
    const [textIsSamePassword, setTextIsSamePassword] = useState('');
    const [disableForm, setDisableForm] = useState(false);

    const handlePasswordClick = () => {
        if (isToggleOn === false) {
            setIsToggleOn(true);
            setIsHiden(false);
        }
        else {
            setIsToggleOn(false);
            setIsHiden(true);
        }
    }

    const checkPasswordIsSame = (e) => {
        if(password == e.target.value){
            setDisableForm(false);
            setTextIsSamePassword(<i className='bi bi-check'></i>)
            setIsSamePassword('true')
        } else {
            setDisableForm(true);
            setTextIsSamePassword("The password confirmation does not match")
            setIsSamePassword('false')
        }
    }
    

    return (
        <>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />
        <div className="input-container">
            <div className="input-form-container">
                <div className="input-form-title">
                    <h2>Create new information card</h2>
                </div>
                <div className="container">
                    <form className="input-form" onSubmit={submitForm}>
                    <div className="card-item__title">
                        <div className="input_card-item__NameTitle">First Name <em>*</em></div>
                        <div className="input_card_item_col2_NameTitle">Last Name <em>*</em></div>
                    </div>
                    <div>
                        <input id="firstName" type="text" placeholder="First Name" 
                        onChange={e => setFirstName(e.target.value)} required/>
                        <input id="lastName" type="text" placeholder="Last Name"
                        onChange={e => setLastName(e.target.value)} required/>
                    </div>
                    <div className="input_card-item__NameTitle">Birth Date</div>
                    <div>
                        <input id="birth" type="date" placeholder="Date of Birth"
                         max={today} onChange={e => setBirth(e.target.value)} />
                        {/* <input
                            type="file"

                            onChange={(e) => setImageInput(e.target.files[0])}
                        /> */}
                    </div>
                    <div className="card-item__title">
                        <div className="input_card-item__NameTitle">Cell Phone <em>*</em></div>
                        <div className="input_card_item_col2_NameTitle">Home Phone</div>
                    </div>
                    <div>
                        <input id="cellPhone" type="text" placeholder="Cell Phone"
                        onChange={e => setCellPhone(e.target.value)} required/>
                        <input id="homePhone" type="text" placeholder="Home Phone"
                        onChange={e => setHomePhone(e.target.value)} />
                    </div>
                    <div className="card-item__title">
                        <div className="input_card-item__NameTitle">School Name</div>
                        <div className="input_card_item_col2_NameTitle">School Phone</div>
                    </div>
                    <div>
                        <input id="schoolName" type="text" placeholder="School Name"
                        onChange={e => setSchoolName(e.target.value)} />
                        <input id="schoolPhone" type="text" placeholder="School Phone Number"
                        onChange={e => setSchoolPhone(e.target.value)} />
                    </div>
                    <div className="input_card-item__NameTitle">Special Information</div>
                    <div>
                        <textarea id="addInfo" type="text" placeholder="Special needs, medical conditions, allergies, Important information"
                        onChange={e => setAddInfo(e.target.value)} />
                    </div>
                    <div className="card-item__title">
                        <div className="input_card-item__NameTitle">Password <em>*</em></div>
                        <div className="input_card_item_col2_NameTitle">Confirm Password <em>*</em></div>
                    </div>
                    <div>
                        <input type={isHiden ? "password" : "text" }  name="password" placeholder="Password"
                         onChange={e => setPassword(e.target.value)}/>
                         <i className={isToggleOn ? "bi-eye" : "bi bi-eye-slash"} id="togglePassword" onClick={handlePasswordClick}></i>
                         
                         <input type="password" name="confirmPassword" placeholder="Confirm Password"
                         onChange={e => checkPasswordIsSame(e)} required/>
                    </div>
                    <div className='password-confirm' id="password">
                         <span className="confirmSamePassword" id={isSamePassword}>{textIsSamePassword}</span>
                    </div>
                    <div style={{marginLeft:'270px'}}>
                        <button type="submit" className="submit-btn" disabled={disableForm}>Submit</button>
                    </div>
                    </form>
                    <div>
                        <img src={require('../../assets/images/account.svg').default}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default InputData;