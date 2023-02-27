import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import ChallengeLayout from '@/components/ChallengeLayout';
import type { ChallengeProps } from '@/types/ChallengeProps';

// const tempChallenges: ChallengeProps[] = [
//   {
//     name: 'Facile',
//     challenges: [
//       {
//         name: 'Exercice 1',
//         points: 10,
//         isCompleted: false,
//         title: 'Titre 1',
//         category: 'web',
//         description:
//           'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         handleFile: null
//       },
//       {
//         name: 'Exercice 2',
//         points: 15,
//         isCompleted: true,
//         title: 'Titre 2',
//         category: 'crypto',
//         description:
//           'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         handleFile: null
//       }
//     ]
//   },
//   {
//     name: 'Moyen',
//     challenges: [
//       {
//         name: 'Exercice 3',
//         points: 20,
//         isCompleted: true,
//         title: 'Titre 3',
//         category: 'web',
//         description:
//           'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         handleFile: null
//       },
//       {
//         name: 'Exercice 4',
//         points: 25,
//         isCompleted: false,
//         title: 'Titre 4',
//         category: 'crypto',
//         description:
//           'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         handleFile: null
//       },
//       {
//         name: 'Exercice 5',
//         points: 35,
//         isCompleted: false,
//         title: 'Titre 5',
//         category: 'web',
//         description:
//           'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         handleFile: null
//       },
//       {
//         name: 'Exercice 6',
//         points: 40,
//         isCompleted: true,
//         title: 'Titre 6',
//         category: 'forensic',
//         description:
//           'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         handleFile: null
//       }
//     ]
//   },
//   {
//     name: 'Difficile',
//     challenges: [
//       {
//         name: 'Exercice 7',
//         points: 55,
//         isCompleted: true,
//         title: 'Titre 7',
//         category: 'crypto',
//         description:
//           'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         handleFile: null
//       },
//       {
//         name: 'Exercice 8',
//         points: 65,
//         isCompleted: true,
//         title: 'Titre 8',
//         category: 'forensic',
//         description:
//           'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         handleFile: null
//       },
//       {
//         name: 'Exercice 9',
//         points: 80,
//         isCompleted: false,
//         title: 'Titre 9',
//         category: 'web',
//         description:
//           'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         handleFile: null
//       }
//     ]
//   }
// ];

const Challenge: React.FC = () => {
  const data = useLoaderData();
  const [challenges, setChallenges] = useState<ChallengeProps[]>([]);

  useEffect(() => {
    setChallenges(tempChallenges);
  }, []);

  return (
    <>
      <h1 className="text-4xl text-center mt-8 mb-8 font-bold">Battle</h1>
      {challenges.map((challenge, index) => (
        <ChallengeLayout
          key={index}
          name={challenge.name}
          challenges={challenge.challenges}
        />
      ))}
    </>
  );
};

export default Challenge;
