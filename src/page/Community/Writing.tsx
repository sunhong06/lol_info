import React,{ useState,useEffect } from 'react'
import Header from '../../components/Header';
import { addDoc ,collection } from "firebase/firestore";
import {db} from '../../fbase'
import '../../scss/Community/Writing.scss';
import { useNavigate } from 'react-router-dom';
import Login from '../../components/Login';

const Writing = () => {
    const [titleValue,setTitleValue] = useState("");
    const [detailValue,setDetailValue] = useState("");
    const [optionValue,setOptionValue] = useState("자유");
    const navigate = useNavigate();

    const addBoard = async(e:any) => {
        e.preventDefault()
       await addDoc(collection(db, "Board"), {
            title: titleValue,
            detail:detailValue,
            option:optionValue,
            createAt:Date.now(),
            view:0,
            up:0
          });
          navigate('/Community')
    }
    const HandleChangeOption = (e:React.ChangeEvent<HTMLSelectElement>) =>{
        setOptionValue(e.target.value);
        console.log(e.target.value)
        if(e.target.value == "선택"){
            alert("카테고리를 선택해주세요.")
        }
    }
  return (
        <>
        <Header />
        <div className='writing_main'>
            <form className='writing_form' onSubmit={addBoard}>
                <fieldset>
                    <legend className='blind'>글작성</legend>
                    <div className='title_box'>
                        <select  onChange={HandleChangeOption} required>                          
                            <option  value="자유" >자유</option>
                            <option value="질문,답변">질문,답변</option>
                            <option value="챔피언공략">쳄피언공략</option>
                        </select>
                        <div className='title'>
                            <label htmlFor='title'>제목 : </label>
                            <input type="text" id='title' value={titleValue} onChange={(e)=> setTitleValue(e.target.value)}  autoFocus required />
                            </div>
                    </div>
                    <div className='writing_box'>
                        <textarea value={detailValue} onChange={(e)=> setDetailValue(e.target.value)} cols={150} rows={40} required></textarea>
                    </div>
                    <span className='attach_box'>
                    <label htmlFor="file">이미지 업로드</label>
                    <input className='blind' accept=".jpg, .jpeg, .png" type="file" id="file" multiple />
                    </span>
                   <button type='submit' className='submit_btn'>작성완료</button>
                </fieldset> 
            </form>
        </div>
    </>
  )
}

export default Writing;