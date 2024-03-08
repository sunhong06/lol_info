import useWriting from "../../../../hook/community/useWriting";
import { useUsers } from "../../../../hook/users/useUsers";
import { userType } from "../../../../type/user";

const WritingForm = () => {
  const { userObj } = useUsers();
  const {
    addBoard,
    HandleChangeOption,
    titleValue,
    detailValue,
    onChangeDetail,
    onChangeTitle,
  } = useWriting({ userObj });

  return (
    <>
      <form className="writing_form" onSubmit={addBoard}>
        <fieldset>
          <legend className="blind">글작성</legend>
          <div className="title_box">
            <select onChange={HandleChangeOption} required>
              <option value="자유">자유</option>
              <option value="질문,답변">질문,답변</option>
              <option value="챔피언공략">쳄피언공략</option>
            </select>
            <div className="title">
              <label htmlFor="title">제목 : </label>
              <input
                type="text"
                id="title"
                value={titleValue}
                onChange={onChangeTitle}
                autoFocus
                required
              />
            </div>
          </div>
          <div className="writing_box">
            <textarea
              value={detailValue}
              onChange={onChangeDetail}
              cols={150}
              rows={40}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit_btn">
            작성완료
          </button>
        </fieldset>
      </form>
    </>
  );
};

export default WritingForm;
