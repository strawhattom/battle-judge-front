import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React from 'react';
import 'react-tabs/style/react-tabs.css';
import { ChallengeLayoutProps } from '@/types/ChallengeLayoutProps';
import './tabs.css';

const TabComponent: React.FC<ChallengeLayoutProps> = (props) => {
  const DownloadButton = () => {
    fetch('SamplePDF.pdf').then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = 'SamplePDF.pdf';
        alink.click();
      });
    });
  };

  const hiddenFileInput = React.useRef(null);

  const handleChange = (event: { target: { files: any[] } }) => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };

  return (
    <Tabs>
      <TabList>
        <Tab>Challenge</Tab>
        <Tab style={{ color: '#F67300' }}>XYZ résolu</Tab>
      </TabList>

      <div className="content">
        <TabPanel>
          <h1 className="title">{props.title}</h1>
          <p className="category">{props.category}</p>
          <p className="points">{props.points} points</p>
          <p className="description">{props.description}</p>

          <div className="resources">
            <p>Resources</p>
            <button className="download-btn" onClick={DownloadButton}>
              Download
            </button>
          </div>

          <div className="answer-form">
            <form className="form">
              <label>
                <input
                  className="flag"
                  type="text"
                  name="name"
                  placeholder="Flag 1"
                />
              </label>
              <label>
                <input
                  className="flag"
                  type="text"
                  name="name"
                  placeholder="Flag 2"
                />
              </label>

              <label>
                <input
                  type="file"
                  ref={hiddenFileInput}
                  // @ts-ignore
                  onChange={handleChange}
                />
              </label>

              <input className="submit-btn" type="submit" value="Soumettre" />
            </form>
          </div>
        </TabPanel>
        <TabPanel>
          <h1 className="first-blood">First Blood</h1>
          <p>S0pr4 573R14</p>
          <table>
            <tr>
              <th>Team Name</th>
              <th>Date</th>
            </tr>
            <tr>
              <td className="team-name">S0pr4 573R14</td>
              <td>3 days ago</td>
            </tr>
            <tr>
              <td className="team-name">Sopra Junior</td>
              <td>50 minutes ago</td>
            </tr>
            <tr>
              <td className="team-name">ESILV</td>
              <td>37 seconds ago</td>
            </tr>
          </table>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default TabComponent;
