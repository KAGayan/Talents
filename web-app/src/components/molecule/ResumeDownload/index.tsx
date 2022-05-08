import ReactDOMServer from 'react-dom/server';
import JsPDF from 'jspdf';
import { Resume } from 'types';

export const ResumeDownload = (name: string, resume: Resume) => {
  const doc = new JsPDF();
  doc.html(ReactDOMServer.renderToStaticMarkup(
    <div style={{ padding: '5px', fontSize: '8px' }}>
      <div><small>{name}</small></div>
      <div><small>{resume.sector?.title}</small></div>
      <div>
        {resume.skillsList?.map((skill) => (
          <div
            key={skill}
          >
            <span id={skill}>
              {skill}
            </span>
          </div>
        ))}
      </div>
    </div>,
  ), {
    callback: () => doc.save(`${name}-cv.pdf`),
  });
  doc.close();
};
