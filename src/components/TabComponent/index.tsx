import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import React from 'react';
import ReactMd from 'react-markdown';
import 'react-tabs/style/react-tabs.css';
import {
  ChallengeLayoutProps,
  ChallengeDocument
} from '@/types/ChallengeProps';
import { Input, Button, InputFile } from '@/components';

// points={props.points}
//           isCompleted={props.isCompleted}
//           title={props.title}
//           category={props.category}
//           description={props.description}

type TabComponentProps = {
  points: number;
  isCompleted: boolean;
  title: string;
  category: string;
  description: string;
  resources?: ChallengeDocument[];
};

const TabComponent: React.FC<TabComponentProps> = (props) => {
  const onSubmit = () => {
    console.log('submit');
  };

  const onDownload = () => {
    fetch('SamplePDF.pdf').then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob);
        const alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = 'SamplePDF.pdf';
        alink.click();
      });
    });
  };

  // const hiddenFileInput = React.useRef(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files?.length) {
      return;
    }
    const fileUploaded = event.target.files[0];
    // props.handleFile(fileUploaded);
  };

  const onChange = () => {
    console.log('change');
  };

  return (
    <Tabs>
      <TabList>
        <Tab>Challenge</Tab>
        <Tab style={{ color: '#F67300' }}>3 résolues</Tab>
      </TabList>

      <div>
        <TabPanel>
          <div className="pl-8">
            <h1 className="text-4xl mt-8 mb-5 font-bold">{props.title}</h1>
            <p className="text-gray-400">{props.category}</p>
            <p>{props.points} points</p>
            <ReactMd className="mt-4">{props.description}</ReactMd>

            {props.resources && (
              <div className="fixed bottom-24">
                <div>
                  <p>Resources</p>
                  <Button onClick={onDownload} color="blue">
                    {'Télécharger'}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="fixed bottom-0">
            <div className="pl-6">
              <form>
                <div className="flex flex-row items-center pb-7 pt-2">
                  <Input
                    type="text"
                    name="flag"
                    label=""
                    onChange={onChange}
                    placeholder="Flag"
                  />

                  <InputFile
                    // ref={hiddenFileInput}
                    name="file"
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="fixed bottom-9">
              <Button onClick={onSubmit}>{'Soumettre'}</Button>
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
