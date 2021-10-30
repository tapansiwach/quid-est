import { React } from 'react'; 

import './DictionaryEntry.css';

function DictionaryEntry(props) {

  const { deleteThis } = props;
  const languageIcons = {
    en: '🇬🇧',
    es: '🇪🇸',
    fr: '🇫🇷',
    hi: '🇮🇳',
    pt: '🇵🇹',
    zh: '🇨🇳'
  };
  
  return (
    <div className="col">
      <div className="card dictionary-card">
        <img src={props.downloadURL || "placeholder.jpg"} className="card-img-top img-fluid entry-image" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.sourceWord}</h5>
          <h5 className="card-text">{props.translatedWord}</h5>
        </div>
        <div className="card-footer">
          <p className="card-text">
             {languageIcons.en} to {languageIcons[props.languageTo]} 
          </p>
          <p className="card-text">
            <button type="button"
              className="btn btn-danger btn-sm"
              onClick={deleteThis}
            ><i className="fas fa-trash-alt"></i></button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default DictionaryEntry;
