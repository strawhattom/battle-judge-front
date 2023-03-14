import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';

type TeamMember = {
  name: string;
  score: number;
};

type TeamMembersResponse = {
  teammates: TeamMember[];
};

const TeamMembers = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);

  const { teamId } = useParams<{ teamId: string }>();

  useEffect(() => {
    // const fetchMembers = async () => {
    //   try {
    //     const response = await fetch(`/api/teams/${teamId}/members`);
    //     const data: TeamMembersResponse = await response.json();
    //     setMembers(data.teammates);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    // fetchMembers();
    const responseMeanwhile: TeamMembersResponse = {
      teammates: [
        { name: 'John', score: 1000 },
        { name: 'Alice', score: 800 },
        { name: 'Bob', score: 1200 },
        { name: 'Eve', score: 1500 },
        { name: 'Charlie', score: 900 }
      ]
    };

    const membersList = responseMeanwhile.teammates.map((member) => ({
      name: member.name,
      score: member.score
    }));

    setMembers(membersList);
  }, [teamId]);

  return (
    <div className="team-members-container">
      <h1 className="team-members-title">{teamId} members</h1>
      <table className="team-members-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={index}>
              <td>{member.name}</td>
              <td>{member.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamMembers;
