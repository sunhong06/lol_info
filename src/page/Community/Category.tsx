import React from 'react'
import '../../scss/Community/Category.scss'

function Category({catagorys}:any) {
  const HandleClickCategory = (e:React.MouseEvent<HTMLButtonElement>) =>{
    const name = e.currentTarget.name
    catagorys(name)
  }
  


  return (
    <div className='category'>
      <ul>
        <li><button name='전체' onClick={HandleClickCategory}>전체</button></li>
        <li><button name="자유" onClick={HandleClickCategory}>자유</button></li>
        <li><button name='질문,답변' onClick={HandleClickCategory}>질문,답변</button></li>
        <li><button name="챔피언공략" onClick={HandleClickCategory}>챔피언공략</button></li>
      </ul>
    </div>
  )
}

export default Category
