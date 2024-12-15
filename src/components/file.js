import React, { useState } from 'react';
import './file.css';

//הגדרת קומפוננטת React בשם FileUploader שאחראית על העלאת קבצים והצגתם.
function FileUploader() {
  //יצירת מצב fileContent עם ערך התחלתי null עבור התוכן של הקובץ הנבחר.
  const [fileContent, setFileContent] = useState(null);
  //יצירת מצב fileType עם ערך התחלתי null עבור סוג הקובץ הנבחר.
  const [fileType, setFileType] = useState(null);
  
    //הגדרת פונקציה לטיפול בשינוי בקובץ שנבחר
    const handleFileChange = (event) => {
      //קבלת הקובץ הראשון שנבחר מתוך רשימת הקבצים (files[0]).
      const file = event.target.files[0]; 
      //בדיקה אם נבחר קובץ (אם file אינו null).
      if (file) {
        //שמירת סוג הקובץ (לדוגמה, image/png, audio/mp3) במצב fileType.
        setFileType(file.type);
  
        // יצירת URL זמני עבור כל קבצי המדיה (תמונות, וידאו, אודיו)
        const blobUrl = URL.createObjectURL(file);
        //שמירת ה-Blob URL במצב fileContent לשימוש להצגה מאוחר יותר.
        setFileContent(blobUrl);
      } else {
        //עדכון מצב fileContent עם הודעה מתאימה שאין קובץ נבחר.
        setFileContent('לא נבחר קובץ.');
      }
    };
  
    return (
      <div>
        {/*תגית <label> עם קישור ל-input להעלאת קבצים ועיצוב מותאם לפי מחלקת upload-btn.*/}
        <label htmlFor="file-upload" className="upload-btn">
          Upload a file
        </label>
        {/*שדה <input> שמאפשר העלאת קובץ ומשתמש בפונקציה handleFileChange לטיפול בשינוי.*/}
        <input id="file-upload" type="file" onChange={handleFileChange} />
        {/*בדיקה אם יש תוכן קובץ (fileContent) להצגה.*/}
        {fileContent && (
          <div>
            {/*בדיקה אם סוג הקובץ הוא תמונה (מתחיל ב-image/) והצגתו.*/}
            {fileType?.startsWith('image/') && (
              <img src={fileContent} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
            )}
            {fileType?.startsWith('video/') && (
              //תגית <video> להצגת וידאו עם שליטה על ניגון.
              <video controls style={{ maxWidth: '100%' }}>
                {/*מקור הווידאו מתוך הקובץ הנבחר. והצגת טקסט אם הדפדפן אינו תומך בוידאו*/}
                <source src={fileContent} type={fileType} />
                Your browser does not support the video tag.
              </video>
            )}
            {fileType?.startsWith('audio/') && (
              <audio controls style={{ width: '100%' }}>
                {/*מקור האודיו עם הקובץ שנבחר.*/}
                <source src={fileContent} type={fileType || 'audio/mpeg'} />
                Your browser does not support the audio element.
              </audio>
            )}
            {fileType?.startsWith('text/') && (
              <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{fileContent}</pre>
            )}
            {fileType === 'application/pdf' && (
              //הטמעת PDF באמצעות <embed>.
              <embed src={fileContent} type="application/pdf" width="100%" height="500px" />
            )}
            {/*בדיקה אם הקובץ לא תואם לסוגים אחרים ומציג קישור להורדה.*/}
            {!fileType?.startsWith('image/') &&
              !fileType?.startsWith('video/') &&
              !fileType?.startsWith('audio/') &&
              !fileType?.startsWith('text/') &&
              fileType !== 'application/pdf' && (
                <p>
                  <a href={fileContent} download>
                    לחץ להורדת הקובץ
                  </a>
                </p>
              )}
          </div>
        )}
      </div>
    );
  }
  
export default FileUploader;
