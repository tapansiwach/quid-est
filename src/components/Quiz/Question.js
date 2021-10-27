export default function Question(props) {
  const {
    question,
    answer,
    userAnswer,
    callback,
    questionNumber,
    totalQuestions,
    imageURL
  } = props;

  return (
    <div>
      <p>
        Question: {questionNumber} / {totalQuestions}
      </p>
      <img src={imageURL}/>
      <p>{question}</p>
      <p>Your answer: </p>
      <input onChange={callback} value={answer}></input>
    </div>
  );
}
