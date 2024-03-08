import React from "react";
import "../../../../scss/Community/Category.scss";

function Category({ catagorys }: any) {
  const HandleClickCategory = (e: any) => {
    const name = e.currentTarget.value;

    catagorys(name);
  };

  return (
    <div className="category">
      <select onChange={HandleClickCategory} name="categoty">
        <option value={"전체"}>전체</option>
        <option value={"자유"}>자유</option>
        <option value={"질문,답변"}>질문,답변</option>
        <option value={"챔피언공략"}>챔피언공략</option>
      </select>
    </div>
  );
}

export default Category;
