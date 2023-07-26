import React, {useCallback, useRef, useState} from "react";
import style from "../../styles/interviewForm.module.css";


function InputForm({placeholder, item, index, onChange}){
  return (
    <input
      className={`${style.input_form_textbox}`}
      type="text"
      placeholder={placeholder}
      onChange={e => onChange(e, index)}
      value={item}
    />
  );
}

function InputComponent({title, placeholder, item, onChange}){
  return (
   <div className={`${style.input_form_box}`}>
    <div className={`${style.input_title}`}>{title}</div>
     <InputForm placeholder={placeholder} item={item} index={null} onChange={onChange} />
   </div>
  )
}

function TextareaForm({placeholder, item, index, onChange, styles={}}){
  const textRef = useRef();

  // Textarea height auto resize
  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);

  return (
    <textarea
      ref={textRef}
      className={`${style.input_form_textbox}`}
      placeholder={placeholder}
      onInput={handleResizeHeight}
      onChange={e => onChange(e, index)}
      style={styles}
      value={item}
    />
  );
}

function TextareaComponent({title, placeholder, item, onChange}){
  return (
    <div className={`${style.input_form_box}`}>
      <div className={`${style.input_title}`}>{title}</div>
      <TextareaForm placeholder={placeholder} item={item} index={null} onChange={onChange}/>
    </div>
  );
}

function CoverLetterForm({index, length, item, onQuestionChange, onContentChange, addCoverletter, deleteCoverletter}){
  return (
    <div className={`${style.input_coverletter_box}`}>
      {
        length-1 === index ?
        <button
          className={`${style.input_coverletter_button} ${style.coverletter_plus_button} ${length === 1 ? style.coverletter_plus_button_first : null}`}
          onClick={() => addCoverletter()}
        >+</button>:null
      }
      {length > 1 ?
        <button
          className={`${style.input_coverletter_button} ${style.coverletter_minus_button}`}
          onClick={() => deleteCoverletter(item.id)}
        >-</button>:null
      }
      <div className={`${style.input_form_box}`}>
        <InputForm
          placeholder={"자소서 문항을 입력하세요. (ex. 회사에 지원하게 된 계기는?)"}
          item={item.question}
          index={index}
          onChange={onQuestionChange}
        />
        <TextareaForm
          placeholder={"자소서 문항에 대한 답변을 작성하세요."}
          item={item.content}
          index={index}
          onChange={onContentChange}
          styles={{marginTop:"20px", height:"100px"}}
        />
      </div>
    </div>
  );
}

function CoverLetterComponent({coverLetters, setCoverLetters}){
  const nextID = useRef(1);

  function addCoverletter() {
    const input = {
      id: nextID.current,
      question: '',
      content: ''
    };
    setCoverLetters([...coverLetters, input]);
    nextID.current += 1;
  }

  function deleteCoverletter(index) {
    setCoverLetters(coverLetters.filter(item => item.id !== index));
  }

  function handleQuestionChange(e, index) {
    if (index > coverLetters.length) return;

    const coverLettersCopy = JSON.parse(JSON.stringify(coverLetters));
    coverLettersCopy[index].question = e.target.value;
    setCoverLetters(coverLettersCopy);
  }

  function handleContentChange(e, index) {
    if (index > coverLetters.length) return;

    const coverLettersCopy = JSON.parse(JSON.stringify(coverLetters));
    coverLettersCopy[index].content = e.target.value;
    setCoverLetters(coverLettersCopy);
  }

  return (
    <div>
      {coverLetters.map((item, index) => (
        <CoverLetterForm
          key={index}
          length={coverLetters.length}
          index={index}
          item={item}
          onQuestionChange={handleQuestionChange}
          onContentChange={handleContentChange}
          addCoverletter={addCoverletter}
          deleteCoverletter={deleteCoverletter}
        />
      ))}
      </div>
  );
}

function InterviewInput(){
  // 사용자에게서 입력받는 데이터들
  const [interviewCompany, setInterviewCompany] = useState("");
  const [interviewPosition, setInterviewPosition] = useState("");
  const [interviewRecruitment, setInterviewRecruitment] = useState("");
  const [coverLetters, setCoverLetters] = useState([{"id":0, "question":"", "content":""}]);

  function handleInterviewCompanyChange(e, index) {
    setInterviewCompany(e.target.value);
  }

  function handleInterviewPositionChange(e, index) {
    setInterviewPosition(e.target.value);
  }

  function handleInterviewRecruitmentChange(e, index) {
    setInterviewRecruitment(e.target.value);
  }

  return (
    <section style={{backgroundColor:"#f4f7fb"}}>
      <div className={`container`} style={{flexDirection:"column"}}>
        <div className={`${style.header}`}>면접 정보</div>
        <div className={`layout-flex-grid-2 fadeInUpEffect`}>
          <InputComponent
            title={"회사"}
            placeholder={"지원하고자 하는 회사를 입력하세요."}
            item={interviewCompany}
            onChange={handleInterviewCompanyChange}
          />
          <InputComponent
            title={"직군"}
            placeholder={"지원하고자 하는 직군을 입력하세요."}
            item={interviewPosition}
            onChange={handleInterviewPositionChange}
          />
        </div>
        <div className={`fadeInUpEffect animation-delay-1`}>
          <TextareaComponent
            title={"모집공고"}
            placeholder={"회사의 모집공고를 작성하세요."}
            item={interviewRecruitment}
            onChange={handleInterviewRecruitmentChange}
          />
        </div>
        <div className={`fadeInUpEffect animation-delay-2`} style={{margin:"10px"}}>
          <div className={`${style.input_title}`}>자소서 입력</div>
          <CoverLetterComponent coverLetters={coverLetters} setCoverLetters={setCoverLetters}/>
        </div>
        <div className={`fadeInUpEffect animation-delay-2`} style={{display:"flex", justifyContent:"center"}}>
          <button className={`blueButton`} style={{borderRadius:"10px", width:"10%"}}>다음으로</button>
        </div>
      </div>
    </section>
  );
}

export default InterviewInput;