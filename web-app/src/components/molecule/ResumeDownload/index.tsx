import ReactDOMServer from 'react-dom/server';
import JsPDF from 'jspdf';
import { Resume } from 'types';

export const ResumeDownload = (resume: Resume) => {
  const doc = new JsPDF();
  doc.html(ReactDOMServer.renderToStaticMarkup(
    <div style={{ padding: '5px', fontSize: '8px' }}>
      <div><small>{resume.profile?.firstname}</small></div>
      <div><small>{resume.sector?.title}</small></div>
      <div>
        {resume.skillsList?.map((skill) => (
          <div
            key={skill.id}
          >
            <span id={skill.id}>
              {skill.title}
            </span>
          </div>
        ))}
      </div>
    </div>,
  ), {
    callback: () => doc.save(`${resume.profile?.firstname} ${resume.profile?.lastName} resume.pdf`),
  });
  doc.close();
};
