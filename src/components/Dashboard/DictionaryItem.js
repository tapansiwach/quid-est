export default function DictionaryItem(props) {
  const { imageURL, sourceWord, translatedWord, language } = props;
  return (
    <div className="col-xl-3 col-lg-4 col-md-6 mb-4">
      <div className="bg-white rounded shadow-sm">
        <img
          src={imageURL}
          alt=""
          className="img-fluid card-img-top"
        />
        <div className="p-3">
          <h5 className="text-dark">{translatedWord}</h5>
          <p className="small text-muted mb-0">
            {sourceWord}
          </p> 
          <hr/>
          <p>en to {language}</p>
        </div>
      </div>
    </div>
  );
}