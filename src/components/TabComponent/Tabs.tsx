import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React from 'react';
import 'react-tabs/style/react-tabs.css';
import { ChallengeLayoutProps } from '@/types/ChallengeLayoutProps';
import Input from '@/components/Input';

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

  const onChange = () => {
    console.log('change');
  };

  return (
    <Tabs>
      <TabList>
        <Tab>Challenge</Tab>
        <Tab style={{ color: '#F67300' }}>XYZ résolu</Tab>
      </TabList>

      <div>
        <TabPanel>
          <div className="pl-8">
            <h1 className="text-4xl mt-8 mb-5 font-bold">{props.title}</h1>
            <p className="text-gray-400">{props.category}</p>
            <p>{props.points} points</p>
            <p className="pt-5 leading-normal overflow-scroll max-h-52">
              {props.description}
            </p>

            <div className="fixed bottom-24">
              <div>
                <p>Resources</p>
                <button
                  type="button"
                  onClick={DownloadButton}
                  className="bg-blue-300 hover:bg-blue-400 text-black  py-2 px-4 mt-2 rounded"
                >
                  {'Télécharger'}
                </button>
              </div>
            </div>
          </div>

          <div className="fixed bottom-0">
            <div className="pl-6">
              <form>
                <div className="flex flex-row pb-7 pt-2">
                  <div>
                    <label>
                      <Input
                        type="text"
                        name="flag1"
                        label=""
                        onChange={onChange}
                        placeholder="Flag 1"
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      <Input
                        type="text"
                        name="flag2"
                        label=""
                        onChange={onChange}
                        placeholder="Flag 2"
                      />
                    </label>
                  </div>
                  <div className="mt-4">
                    <label>
                      <input
                        type="file"
                        ref={hiddenFileInput}
                        // @ts-ignore
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="fixed bottom-9">
              <button
                type="button"
                className="bg-orange-500 hover:bg-orange-600 text-black  py-3 px-4 rounded"
              >
                {'Soumettre'}
              </button>
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="pl-8">
            <h1 className="text-red-700 text-left text-4xl font-bold mt-8">
              First Blood
            </h1>
            <p>S0pr4 573R14</p>
            <table className="ml-auto mr-auto w-4/5 text-center">
              <tr className="h-12 border-b">
                <th>Team Name</th>
                <th>Date</th>
              </tr>
              <tr className="h-12 border-b">
                <td className="text-orange-600">S0pr4 573R14</td>
                <td>3 days ago</td>
              </tr>
              <tr className="h-12 border-b">
                <td className="text-orange-600">Sopra Junior</td>
                <td>50 minutes ago</td>
              </tr>
              <tr className="h-12">
                <td className="text-orange-600">ESILV</td>
                <td>37 seconds ago</td>
              </tr>
            </table>
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default TabComponent;
